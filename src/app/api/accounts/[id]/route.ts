import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/server-auth';
import { accountRepository, UpdateAccountData } from '@/repositories/AccountRepository';

// GET /api/accounts/[id] - Get an account by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id: accountId } = await context.params;

    // Get account
    const account = await accountRepository.findById(accountId);
    
    if (!account) {
      return NextResponse.json(
        { success: false, message: 'Account not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      account
    });
  } catch (error) {
    console.error('Error getting account:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/accounts/[id] - Update an account
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id: accountId } = await context.params;

    // Verify that the account exists
    const existingAccount = await accountRepository.findById(accountId);
    if (!existingAccount) {
      return NextResponse.json(
        { success: false, message: 'Account not found' },
        { status: 404 }
      );
    }

    // Get body data
    const body = await request.json();
    const { 
      platform, 
      username, 
      displayName, 
      followers, 
      following, 
      posts, 
      verified, 
      category, 
      connectedDate, 
      isActive 
    } = body;

    // Check if username exists in another account on the same platform
    if (username && platform) {
      const usernameExists = await accountRepository.isUsernameExists(username, platform, accountId);
      if (usernameExists) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'An account with this username already exists on this platform',
            errors: [{ field: 'username', message: 'This username is already registered' }]
          },
          { status: 409 }
        );
      }
    }

    // Prepare data for update
    const updateData: UpdateAccountData = {};
    if (platform) updateData.platform = platform;
    if (username) updateData.username = username;
    if (displayName) updateData.displayName = displayName;
    if (followers !== undefined) updateData.followers = parseInt(followers) || 0;
    if (following !== undefined) updateData.following = parseInt(following) || 0;
    if (posts !== undefined) updateData.posts = parseInt(posts) || 0;
    if (verified !== undefined) updateData.verified = verified === true || verified === 'true';
    if (category) updateData.category = category;
    if (connectedDate) updateData.connectedDate = new Date(connectedDate);
    if (isActive !== undefined) updateData.isActive = isActive === true || isActive === 'true';

    // Update account
    const updatedAccount = await accountRepository.update(accountId, updateData);

    if (!updatedAccount) {
      return NextResponse.json(
        { success: false, message: 'Error updating account' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Account updated successfully',
      account: updatedAccount
    });
  } catch (error) {
    console.error('Error updating account:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/accounts/[id] - Delete an account
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id: accountId } = await context.params;

    // Delete account
    const deleted = await accountRepository.delete(accountId);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Account not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 