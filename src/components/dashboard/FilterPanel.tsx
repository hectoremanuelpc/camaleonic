'use client';

import { useState, useEffect } from 'react';
import { getUniquePlatforms, getUniqueCategories } from '@/lib/mock-data';
import { useAuthStore } from '@/lib/store';

export interface FilterState {
  platform: string;
  category: string;
  dateRange: {
    start: string;
    end: string;
  };
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const loadData = async () => {
      const uniquePlatforms = await getUniquePlatforms();
      setPlatforms(uniquePlatforms);

      if (user) {
        const uniqueCategories = await getUniqueCategories();
        setCategories(uniqueCategories);
      }
    };
    loadData();
  }, [user]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [type]: value,
      },
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      platform: '',
      category: '',
      dateRange: {
        start: '',
        end: '',
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-neutral/20 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Clear filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Platform Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Platform
          </label>
          <select
            value={filters.platform}
            onChange={(e) => handleFilterChange('platform', e.target.value)}
            className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All platforms</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => handleDateRangeChange('start', e.target.value)}
            className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            End Date
          </label>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => handleDateRangeChange('end', e.target.value)}
            className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Active filter indicators */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.platform && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Platform: {filters.platform}
            <button
              onClick={() => handleFilterChange('platform', '')}
              className="ml-2 text-primary hover:text-primary/80"
            >
              ×
            </button>
          </span>
        )}
        {filters.category && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Category: {filters.category}
            <button
              onClick={() => handleFilterChange('category', '')}
              className="ml-2 text-primary hover:text-primary/80"
            >
              ×
            </button>
          </span>
        )}
        {filters.dateRange.start && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            From: {filters.dateRange.start}
            <button
              onClick={() => handleDateRangeChange('start', '')}
              className="ml-2 text-primary hover:text-primary/80"
            >
              ×
            </button>
          </span>
        )}
        {filters.dateRange.end && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            To: {filters.dateRange.end}
            <button
              onClick={() => handleDateRangeChange('end', '')}
              className="ml-2 text-primary hover:text-primary/80"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
} 