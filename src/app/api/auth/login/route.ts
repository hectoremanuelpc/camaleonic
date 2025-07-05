import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { generateToken, COOKIE_NAME } from '@/lib/auth';
import { userRepository } from '@/repositories/UserRepository';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate data with Joi
    const { error, value } = loginSchema.validate(body);
    
    if (error) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid data',
          errors: error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
          }))
        },
        { status: 400 }
      );
    }

    const { email, password } = value;

    // Authenticate user
    const user = await userRepository.authenticate(email, password);
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials',
          errors: [{ field: 'email', message: 'Invalid email or password' }]
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    });

    // Set HTTP-only cookie
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 