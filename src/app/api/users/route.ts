import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/server-auth';
import { userRepository } from '@/repositories/UserRepository';

// GET /api/users - Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Get users (in production, verify admin permissions)
    const users = await userRepository.find({}, { skip, limit });
    const totalUsers = await userRepository.count();

    // Transform data to not expose sensitive information
    const safeUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    return NextResponse.json({
      success: true,
      users: safeUsers,
      pagination: {
        total: totalUsers,
        page,
        limit,
        pages: Math.ceil(totalUsers / limit)
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const currentUser = await getServerUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // In production, verify admin permissions
    
    // Get body data
    const body = await request.json();
    const { name, email, password } = body;

    // Verify required data
    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Incomplete data',
          errors: [
            { field: 'name', message: 'Name is required' },
            { field: 'email', message: 'Email is required' },
            { field: 'password', message: 'Password is required' }
          ]
        },
        { status: 400 }
      );
    }

    // Check if email is already registered
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

    // Create user
    const user = await userRepository.createUser({
      name,
      email,
      password
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 