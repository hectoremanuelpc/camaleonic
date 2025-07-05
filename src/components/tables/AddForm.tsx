'use client';

import { useState, useEffect } from 'react';
import { TableType } from '@/hooks/useTablesData';
import { getUniqueCategories } from '@/lib/mock-data';
import { useAuthStore } from '@/lib/store';

interface FormDataType {
  [key: string]: string | number | undefined;
}

interface AddFormProps {
  activeTable: TableType;
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  handleAddRecord: (e: React.FormEvent) => void;
  resetForm: () => void;
}

export const AddForm = ({
  activeTable,
  formData,
  setFormData,
  handleAddRecord,
  resetForm,
}: AddFormProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const loadCategories = async () => {
      if (user) {
        const uniqueCategories = await getUniqueCategories();
        setCategories(uniqueCategories);
      }
    };
    loadCategories();
  }, [user]);

  if (activeTable === 'metrics') {
    return (
      <form onSubmit={handleAddRecord} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date</label>
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Platform</label>
            <select
              value={formData.platform || ''}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select platform</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="X">X</option>
              <option value="TikTok">TikTok</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Followers</label>
            <input
              type="number"
              value={formData.followers || ''}
              onChange={(e) => setFormData({...formData, followers: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Engagement (%)</label>
            <input
              type="number"
              step="0.1"
              value={formData.engagement || ''}
              onChange={(e) => setFormData({...formData, engagement: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Posts</label>
            <input
              type="number"
              value={formData.posts || ''}
              onChange={(e) => setFormData({...formData, posts: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Reach</label>
            <input
              type="number"
              value={formData.reach || ''}
              onChange={(e) => setFormData({...formData, reach: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="gradient-primary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Add Metric
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-neutral/20 text-foreground px-6 py-2 rounded-lg font-medium hover:bg-neutral/30 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  if (activeTable === 'content') {
    return (
      <form onSubmit={handleAddRecord} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Platform</label>
            <select
              value={formData.platform || ''}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select platform</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="X">X</option>
              <option value="TikTok">TikTok</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Content Type</label>
            <select
              value={formData.type || ''}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select type</option>
              <option value="Post">Post</option>
              <option value="Video">Video</option>
              <option value="Image">Image</option>
              <option value="Carousel">Carousel</option>
              <option value="Story">Story</option>
              <option value="Reel">Reel</option>
              <option value="Tweet">Tweet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={formData.status || ''}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select status</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="gradient-primary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Add Content
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-neutral/20 text-foreground px-6 py-2 rounded-lg font-medium hover:bg-neutral/30 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  if (activeTable === 'accounts') {
    return (
      <form onSubmit={handleAddRecord} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Platform</label>
            <select
              value={formData.platform || ''}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select platform</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="X">X</option>
              <option value="TikTok">TikTok</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Username</label>
            <input
              type="text"
              value={formData.username || ''}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="@username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Display Name</label>
            <input
              type="text"
              value={formData.displayName || ''}
              onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={formData.category || ''}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Followers</label>
            <input
              type="number"
              value={formData.followers || ''}
              onChange={(e) => setFormData({...formData, followers: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Following</label>
            <input
              type="number"
              value={formData.following || ''}
              onChange={(e) => setFormData({...formData, following: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Posts</label>
            <input
              type="number"
              value={formData.posts || ''}
              onChange={(e) => setFormData({...formData, posts: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Connected Date</label>
            <input
              type="date"
              value={formData.connectedDate || ''}
              onChange={(e) => setFormData({...formData, connectedDate: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Verified</label>
            <select
              value={formData.verified || ''}
              onChange={(e) => setFormData({...formData, verified: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select status</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={formData.isActive || ''}
              onChange={(e) => setFormData({...formData, isActive: e.target.value})}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-sm font-medium text-foreground bg-neutral/20 rounded-md hover:bg-neutral/30 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="gradient-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Add Account
          </button>
        </div>
      </form>
    );
  }

  return null;
}; 