import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations/auth';
import { generateToken, COOKIE_NAME } from '@/lib/auth';
import { userRepository } from '@/repositories/UserRepository';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate data with Joi
    const { error, value } = registerSchema.validate(body);
    
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

    const { name, email, password } = value;

    // Check if user already exists
    const emailExists = await userRepository.isEmailRegistered(email);
    if (emailExists) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'This email is already registered',
          errors: [{ field: 'email', message: 'This email is already registered' }]
        },
        { status: 409 }
      );
    }

    // Create new user
    const user = await userRepository.createUser({
      name,
      email,
      password
    });
    
    // Convert _id to string and add as id
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
    
    // Generate JWT token
    const token = generateToken(userData);

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: userData,
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 