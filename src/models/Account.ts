import mongoose from 'mongoose';

// Ensure this only runs on the server side
const Account = (mongoose.models.Account || mongoose.model('Account', new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['Instagram', 'Facebook', 'X', 'TikTok', 'LinkedIn', 'YouTube']
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  followers: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  following: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  posts: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  connectedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
}))) as mongoose.Model<IAccount>;

// Índices para optimizar consultas
if (process.env.NODE_ENV !== 'production') {
  Account.schema.index({ userId: 1 });
  Account.schema.index({ platform: 1, userId: 1 });
  Account.schema.index({ username: 1, platform: 1 }, { unique: true });
}

export interface IAccount {
  _id: mongoose.Types.ObjectId;
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
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export { Account }; 