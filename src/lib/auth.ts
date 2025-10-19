import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import pool from './db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);

export interface User {
  id: string;
  name: string;
  email: string;
  api_key: string;
  created_at: Date;
  last_login?: Date;
}

export interface SessionPayload {
  userId: string;
  email: string;
  exp: number;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate API key
export function generateApiKey(): string {
  return `sk_live_${uuidv4().replace(/-/g, '')}`;
}

// Create JWT token
export async function createToken(userId: string, email: string): Promise<string> {
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Token expires in 7 days
    .sign(JWT_SECRET);

  return token;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    const payload = verified.payload as unknown as SessionPayload;
    if (payload.userId && payload.email) {
      return payload;
    }
    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Create user
export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<User | null> {
  const client = await pool.connect();
  try {
    // Check if user already exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await hashPassword(password);
    const apiKey = generateApiKey();

    const result = await client.query(
      `INSERT INTO users (name, email, password_hash, api_key) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, api_key, created_at`,
      [name, email.toLowerCase(), passwordHash, apiKey]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Authenticate user
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ user: User; token: string } | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name, email, password_hash, api_key, created_at, last_login FROM users WHERE email = $1 AND is_active = true',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];
    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      return null;
    }

    // Update last login
    await client.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );

    // Create session token
    const token = await createToken(user.id, user.email);

    // Store session in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    await client.query(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, token, expiresAt]
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        api_key: user.api_key,
        created_at: user.created_at,
        last_login: user.last_login,
      },
      token,
    };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  } finally {
    client.release();
  }
}

// Get user by token
export async function getUserByToken(token: string): Promise<User | null> {
  const payload = await verifyToken(token);
  if (!payload) {
    return null;
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT u.id, u.name, u.email, u.api_key, u.created_at, u.last_login 
       FROM users u
       INNER JOIN sessions s ON u.id = s.user_id
       WHERE s.token = $1 AND s.expires_at > CURRENT_TIMESTAMP AND u.is_active = true`,
      [token]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error getting user by token:', error);
    return null;
  } finally {
    client.release();
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name, email, api_key, created_at, last_login FROM users WHERE id = $1 AND is_active = true',
      [userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  } finally {
    client.release();
  }
}

// Logout user (invalidate session)
export async function logoutUser(token: string): Promise<boolean> {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM sessions WHERE token = $1', [token]);
    return true;
  } catch (error) {
    console.error('Error logging out user:', error);
    return false;
  } finally {
    client.release();
  }
}

// Clean up expired sessions (can be run periodically)
export async function cleanupExpiredSessions(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM sessions WHERE expires_at < CURRENT_TIMESTAMP');
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error);
  } finally {
    client.release();
  }
}
