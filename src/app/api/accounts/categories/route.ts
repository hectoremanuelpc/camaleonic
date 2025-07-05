import { NextResponse } from 'next/server';
import { getServerUser } from '@/lib/server-auth';
import { accountRepository } from '@/repositories/AccountRepository';

// GET /api/accounts/categories - Get unique categories for user accounts
export async function GET() {
  try {
    // Verify authentication
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get unique categories
    const categories = await accountRepository.getUniqueCategories(user.userId);

    return NextResponse.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Error getting categories:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 