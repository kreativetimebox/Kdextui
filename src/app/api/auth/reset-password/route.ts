import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // Find valid token
      const tokenResult = await client.query(
        `SELECT user_id, expires_at, used 
         FROM password_reset_tokens 
         WHERE token = $1`,
        [token]
      );

      if (tokenResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Invalid or expired reset token' },
          { status: 400 }
        );
      }

      const resetToken = tokenResult.rows[0];

      // Check if token is expired
      if (new Date() > new Date(resetToken.expires_at)) {
        return NextResponse.json(
          { error: 'Reset token has expired' },
          { status: 400 }
        );
      }

      // Check if token was already used
      if (resetToken.used) {
        return NextResponse.json(
          { error: 'Reset token has already been used' },
          { status: 400 }
        );
      }

      // Hash new password
      const passwordHash = await hashPassword(password);

      // Update user password
      await client.query(
        'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [passwordHash, resetToken.user_id]
      );

      // Mark token as used
      await client.query(
        'UPDATE password_reset_tokens SET used = true WHERE token = $1',
        [token]
      );

      return NextResponse.json({
        success: true,
        message: 'Password has been reset successfully'
      });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while resetting your password' },
      { status: 500 }
    );
  }
}
