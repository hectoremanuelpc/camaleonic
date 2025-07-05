import { SocialMetricsData } from '@/lib/mock-data';

interface MetricsPanelProps {
  data: SocialMetricsData[];
}

export const MetricsPanel = ({ data }: MetricsPanelProps) => {
  const totalFollowers = data.reduce((sum, item) => sum + item.followers, 0);
  const avgEngagement = data.length > 0 
    ? (data.reduce((sum, item) => sum + item.engagement, 0) / data.length).toFixed(1) 
    : '0';
  const totalReach = data.reduce((sum, item) => sum + item.reach, 0);
  const totalImpressions = data.reduce((sum, item) => sum + item.impressions, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral/20">
        <h3 className="text-sm font-medium text-foreground/60 mb-2">Total Followers</h3>
        <p className="text-3xl font-bold text-primary">
          {totalFollowers.toLocaleString()}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral/20">
        <h3 className="text-sm font-medium text-foreground/60 mb-2">Average Engagement</h3>
        <p className="text-3xl font-bold text-green-600">
          {avgEngagement}%
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral/20">
        <h3 className="text-sm font-medium text-foreground/60 mb-2">Total Reach</h3>
        <p className="text-3xl font-bold text-blue-600">
          {totalReach.toLocaleString()}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-neutral/20">
        <h3 className="text-sm font-medium text-foreground/60 mb-2">Impressions</h3>
        <p className="text-3xl font-bold text-purple-600">
          {totalImpressions.toLocaleString()}
        </p>
      </div>
    </div>
  );
}; 