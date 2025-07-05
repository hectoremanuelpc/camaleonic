import { useState, useEffect } from 'react';
import { SocialMetricsData, fetchSocialMetricsData } from '@/lib/mock-data';
import { FilterState } from '@/components/dashboard/FilterPanel';

export const useDashboardData = () => {
  const [data, setData] = useState<SocialMetricsData[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    platform: '',
    dateRange: {
      start: '',
      end: '',
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const initialData = await fetchSocialMetricsData();
      setData(initialData);
    };
    loadData();
  }, []);

  const filteredData = data.filter(item => {
    if (filters.platform && item.platform !== filters.platform) {
      return false;
    }

    if (filters.dateRange.start && filters.dateRange.end) {
      const itemDate = new Date(item.date);
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      return itemDate >= start && itemDate <= end;
    }

    return true;
  });

  return {
    data: filteredData,
    filters,
    setFilters,
  };
}; 