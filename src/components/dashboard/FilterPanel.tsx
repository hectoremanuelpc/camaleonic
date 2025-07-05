'use client';

import { useState, useEffect } from 'react';
import { getUniquePlatforms } from '@/lib/mock-data';
import { useAuthStore } from '@/lib/store';

export interface FilterState {
  platform: string;
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
  const { user } = useAuthStore();

  useEffect(() => {
    const loadData = async () => {
      const uniquePlatforms = await getUniquePlatforms();
      setPlatforms(uniquePlatforms);
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
        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-2">
            Platform
          </label>
          <div className="relative">
            <select
              value={filters.platform}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              <option value="">All platforms</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/70">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Empty column for spacing */}
        <div className="hidden md:block"></div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => handleDateRangeChange('start', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
            className="w-full px-3 py-2 bg-white border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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