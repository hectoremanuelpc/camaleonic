import { fetchSocialMetricsData, fetchContentData } from '../services/api';

// Helper functions for filtering social media data
export const getDataByPlatform = async (platform: string) => {
  const data = await fetchSocialMetricsData();
  return data.filter(item => item.platform === platform);
};

export const getDataByDateRange = async (startDate: string, endDate: string) => {
  const data = await fetchSocialMetricsData();
  return data.filter(item => {
    const itemDate = new Date(item.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return itemDate >= start && itemDate <= end;
  });
};

export const getContentByPlatform = async (platform: string) => {
  const data = await fetchContentData();
  return data.filter(item => item.platform === platform);
};

export const getContentByStatus = async (status: string) => {
  const data = await fetchContentData();
  return data.filter(item => item.status === status);
};

export const getUniquePlatforms = async () => {
  const data = await fetchSocialMetricsData();
  return [...new Set(data.map(item => item.platform))];
};

export const getUniqueContentTypes = async () => {
  const data = await fetchContentData();
  return [...new Set(data.map(item => item.type))];
};

export const getUniqueCategories = async (userId: string): Promise<string[]> => {
  try {
    const response = await fetch('/api/accounts/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error getting unique categories:', error);
    return [];
  }
}; 