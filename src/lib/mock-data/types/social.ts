export interface SocialMetricsData {
  id: string;
  date: string;
  platform: 'Instagram' | 'Facebook' | 'X' | 'TikTok' | 'LinkedIn' | 'YouTube';
  followers: number;
  engagement: number;
  posts: number;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  impressions: number;
}

export interface ContentData {
  id: string;
  title: string;
  platform: 'Instagram' | 'Facebook' | 'X' | 'TikTok' | 'LinkedIn' | 'YouTube';
  type: 'Image' | 'Video' | 'Carousel' | 'Story' | 'Reel' | 'Tweet' | 'Post';
  publishDate: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagement_rate: number;
  status: 'Published' | 'Scheduled' | 'Draft';
}

export interface AccountData {
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
}

export type Platform = 'Instagram' | 'Facebook' | 'X' | 'TikTok' | 'LinkedIn' | 'YouTube';
export type ContentType = 'Image' | 'Video' | 'Carousel' | 'Story' | 'Reel' | 'Tweet' | 'Post';
export type ContentStatus = 'Published' | 'Scheduled' | 'Draft'; 