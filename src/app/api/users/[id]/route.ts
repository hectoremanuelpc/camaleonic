import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/server-auth';
import { userRepository } from '@/repositories/UserRepository';

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

// GET /api/users/[id] - Get a user by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const currentUser = await getServerUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id: userId } = await context.params;

    // In production, verify that the user has permissions to view this user
    // (only the user themselves or an admin)
    if (currentUser.userId !== userId) {
      // Verify if admin (implement in production)
    }

    // Get user
    const user = await userRepository.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Return data without sensitive information
    return NextResponse.json({
      success: true,
      user: {
        id: user._id?.toString() || '',
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/users/[id] - Update a user
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const currentUser = await getServerUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id: userId } = await context.params;

    // In production, verify that the user has permissions to update this user
    // (only the user themselves or an admin)
    if (currentUser.userId !== userId) {
      // Verify if admin (implement in production)
    }

    // Get body data
    const body = await request.json();
    const { name, email, password } = body;

    // Verify that there is at least one field to update
    if (!name && !email && !password) {
      return NextResponse.json(
        { success: false, message: 'No data to update' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Prepare data for update
    const updateData: UpdateUserData = {};
    if (name) updateData.name = name;
    if (email && email !== existingUser.email) {
      // Check if the new email is already registered
      const emailExists = await userRepository.findOne({ email, _id: { $ne: userId } });
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
      updateData.email = email;
    }
    if (password) updateData.password = password;

    // Update user
    const updatedUser = await userRepository.updateById(userId, updateData);
    
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'Error updating user' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: {
        id: updatedUser._id?.toString() || '',
        name: updatedUser.name,
        email: updatedUser.email,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const currentUser = await getServerUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id: userId } = await context.params;

    // In production, verify that the user has permissions to delete this user
    // (only the user themselves or an admin)
    if (currentUser.userId !== userId) {
      // Verify if admin (implement in production)
    }

    // Delete user
    const deleted = await userRepository.deleteById(userId);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 