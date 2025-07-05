import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Remove cookie
    response.cookies.set(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 