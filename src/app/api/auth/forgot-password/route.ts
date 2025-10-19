import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // Check if user exists
      const userResult = await client.query(
        'SELECT id, email FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      // Always return success to prevent email enumeration
      if (userResult.rows.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'If an account exists with this email, a password reset link has been sent.'
        });
      }

      const user = userResult.rows[0];

      // Generate reset token
      const resetToken = uuidv4();
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

      // Store reset token in database
      await client.query(
        'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, resetToken, expiresAt]
      );

      // In production, send email with reset link
      // For now, we'll just return the token in development
      console.log(`Password reset token for ${email}: ${resetToken}`);
      console.log(`Reset link: http://localhost:3007/reset-password?token=${resetToken}`);

      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.',
        // Remove this in production - only for development
        ...(process.env.NODE_ENV === 'development' && { 
          resetToken, 
          resetLink: `http://localhost:3007/reset-password?token=${resetToken}` 
        })
      });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
