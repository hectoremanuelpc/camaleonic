import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/server-auth';
import { accountRepository } from '@/repositories/AccountRepository';

// GET /api/accounts - Get all user accounts
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
    const platform = url.searchParams.get('platform');

    // Get user accounts
    let accounts;
    if (platform) {
      accounts = await accountRepository.findByPlatform(user.userId, platform);
    } else {
      accounts = await accountRepository.findByUserId(user.userId);
    }
    // Initialize test data if no accounts exist
    if (accounts.length === 0) {
      await accountRepository.initializeTestData(user.userId);
      accounts = await accountRepository.findByUserId(user.userId);
    }

    return NextResponse.json({
      success: true,
      accounts,
      total: accounts.length
    });
  } catch (error) {
    console.error('Error getting accounts:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/accounts - Create a new account
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
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

    // Validate required data
    if (!platform || !username || !displayName || !category) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Incomplete data',
          errors: [
            { field: 'platform', message: 'Platform is required' },
            { field: 'username', message: 'Username is required' },
            { field: 'displayName', message: 'Display name is required' },
            { field: 'category', message: 'Category is required' }
          ]
        },
        { status: 400 }
      );
    }

    // Check if an account with the same username exists on the same platform
    const usernameExists = await accountRepository.isUsernameExists(username, platform);
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

    // Create account
    const account = await accountRepository.create({
      platform,
      username,
      displayName,
      followers: parseInt(followers) || 0,
      following: parseInt(following) || 0,
      posts: parseInt(posts) || 0,
      verified: verified === true || verified === 'true',
      category,
      connectedDate: connectedDate ? new Date(connectedDate) : new Date(),
      isActive: isActive === true || isActive === 'true',
      userId: user.userId
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      account
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 