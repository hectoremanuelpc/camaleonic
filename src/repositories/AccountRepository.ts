import { Account, IAccount } from '@/models/Account';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

export interface CreateAccountData {
  platform: 'Instagram' | 'Facebook' | 'X' | 'TikTok' | 'LinkedIn' | 'YouTube';
  username: string;
  displayName: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  category: string;
  connectedDate: Date;
  isActive: boolean;
  userId: string;
}

export interface UpdateAccountData {
  platform?: 'Instagram' | 'Facebook' | 'X' | 'TikTok' | 'LinkedIn' | 'YouTube';
  username?: string;
  displayName?: string;
  followers?: number;
  following?: number;
  posts?: number;
  verified?: boolean;
  category?: string;
  connectedDate?: Date;
  isActive?: boolean;
}

export interface AccountWithId {
  id: string;
  platform: 'Instagram' | 'Facebook' | 'X' | 'TikTok' | 'LinkedIn' | 'YouTube';
  username: string;
  displayName: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  category: string;
  connectedDate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class AccountRepository {
  private async ensureConnection() {
    await connectToDatabase();
  }

  private transformAccount(account: IAccount): AccountWithId {
    return {
      id: account._id.toString(),
      platform: account.platform,
      username: account.username,
      displayName: account.displayName,
      followers: account.followers,
      following: account.following,
      posts: account.posts,
      verified: account.verified,
      category: account.category,
      connectedDate: account.connectedDate.toISOString().split('T')[0],
      isActive: account.isActive,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    };
  }

  async findByUserId(userId: string): Promise<AccountWithId[]> {
    await this.ensureConnection();
    
    const accounts = await Account.find({ 
      userId: new mongoose.Types.ObjectId(userId) 
    }).sort({ createdAt: -1 });
    
    return accounts.map(account => this.transformAccount(account));
  }

  async findById(accountId: string): Promise<AccountWithId | null> {
    await this.ensureConnection();
    
    const account = await Account.findById(accountId);
    if (!account) return null;
    
    return this.transformAccount(account);
  }

  async create(data: CreateAccountData): Promise<AccountWithId> {
    await this.ensureConnection();
    
    const account = new Account({
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId)
    });
    
    await account.save();
    return this.transformAccount(account);
  }

  async update(accountId: string, data: UpdateAccountData): Promise<AccountWithId | null> {
    await this.ensureConnection();
    
    const account = await Account.findByIdAndUpdate(
      accountId,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!account) return null;
    return this.transformAccount(account);
  }

  async delete(accountId: string): Promise<boolean> {
    await this.ensureConnection();
    
    const result = await Account.findByIdAndDelete(accountId);
    return result !== null;
  }

  async deleteByUserId(userId: string): Promise<number> {
    await this.ensureConnection();
    
    const result = await Account.deleteMany({ 
      userId: new mongoose.Types.ObjectId(userId) 
    });
    
    return result.deletedCount || 0;
  }

  async findByPlatform(userId: string, platform: string): Promise<AccountWithId[]> {
    await this.ensureConnection();
    
    const accounts = await Account.find({ 
      userId: new mongoose.Types.ObjectId(userId),
      platform 
    }).sort({ createdAt: -1 });
    
    return accounts.map(account => this.transformAccount(account));
  }

  async count(userId: string): Promise<number> {
    await this.ensureConnection();
    
    return await Account.countDocuments({ 
      userId: new mongoose.Types.ObjectId(userId) 
    });
  }

  async isUsernameExists(username: string, platform: string, excludeId?: string): Promise<boolean> {
    await this.ensureConnection();
    
    const query: { username: string; platform: string; _id?: { $ne: string } } = { username, platform };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const account = await Account.findOne(query);
    return account !== null;
  }

  // Método para inicializar datos de prueba
  async initializeTestData(userId: string): Promise<void> {
    await this.ensureConnection();
    
    // Verificar si ya existen cuentas para este usuario
    const existingCount = await this.count(userId);
    if (existingCount > 0) {
      return;
    }
    const testAccounts: Omit<CreateAccountData, 'userId'>[] = [
      {
        platform: 'Instagram',
        username: '@my_insta_acc' + Math.floor(Math.random() * 1000),
        displayName: 'My Personal Brand',
        followers: 13100,
        following: 890,
        posts: 245,
        verified: true,
        category: 'Education',
        connectedDate: new Date('2024-01-15'),
        isActive: true
      },
      {
        platform: 'Facebook',
        username: 'MyFBPage' + Math.floor(Math.random() * 1000),
        displayName: 'My Facebook Page',
        followers: 8480,
        following: 0,
        posts: 189,
        verified: false,
        category: 'Business',
        connectedDate: new Date('2024-02-20'),
        isActive: true
      },
      {
        platform: 'X',
        username: '@myaccount' + Math.floor(Math.random() * 1000),
        displayName: 'My X Account',
        followers: 5890,
        following: 1250,
        posts: 1456,
        verified: false,
        category: 'Personal',
        connectedDate: new Date('2024-03-10'),
        isActive: true
      },
      {
        platform: 'TikTok',
        username: '@mytiktok' + Math.floor(Math.random() * 1000),
        displayName: 'My TikTok',
        followers: 19800,
        following: 156,
        posts: 78,
        verified: true,
        category: 'Entertainment',
        connectedDate: new Date('2024-04-05'),
        isActive: true
      },
      {
        platform: 'LinkedIn',
        username: 'my-linkedin-profile' + Math.floor(Math.random() * 1000),
        displayName: 'My LinkedIn Profile',
        followers: 3650,
        following: 2100,
        posts: 89,
        verified: true,
        category: 'Professional',
        connectedDate: new Date('2024-05-12'),
        isActive: true
      },
      {
        platform: 'YouTube',
        username: 'MyYTChannel' + Math.floor(Math.random() * 1000),
        displayName: 'My YouTube Channel',
        followers: 8350,
        following: 45,
        posts: 34,
        verified: false,
        category: 'Education',
        connectedDate: new Date('2024-06-18'),
        isActive: false
      }
    ];

    for (const accountData of testAccounts) {
      await this.create({ ...accountData, userId });
    }
  }

  async getUniqueCategories(userId: string): Promise<string[]> {
    await this.ensureConnection();
    
    const categories = await Account.distinct('category', { 
      userId: new mongoose.Types.ObjectId(userId) 
    });
    
    return categories;
  }
}

export const accountRepository = new AccountRepository(); 