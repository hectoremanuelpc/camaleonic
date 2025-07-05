import { SocialMetricsData } from '@/lib/mock-data';

type Platform = 'instagram' | 'facebook' | 'x' | 'tiktok' | 'linkedin' | 'youtube';

export const CHART_COLORS: Record<Platform, { bg: string; border: string }> = {
  instagram: {
    bg: 'rgba(239, 68, 68, 0.8)',
    border: 'rgb(239, 68, 68)',
  },
  facebook: {
    bg: 'rgba(34, 197, 94, 0.8)',
    border: 'rgb(34, 197, 94)',
  },
  x: {
    bg: 'rgba(99, 102, 241, 0.8)',
    border: 'rgb(99, 102, 241)',
  },
  tiktok: {
    bg: 'rgba(245, 158, 11, 0.8)',
    border: 'rgb(245, 158, 11)',
  },
  linkedin: {
    bg: 'rgba(168, 85, 247, 0.8)',
    border: 'rgb(168, 85, 247)',
  },
  youtube: {
    bg: 'rgba(14, 165, 233, 0.8)',
    border: 'rgb(14, 165, 233)',
  },
};

export const prepareChartData = (data: SocialMetricsData[]) => {
  const dates = data.map(item => new Date(item.date).toLocaleDateString());
  const followers = data.map(item => item.followers);
  const engagement = data.map(item => item.engagement);

  // Datos agrupados por plataforma
  const platformData = data.reduce((acc, item) => {
    acc[item.platform] = (acc[item.platform] || 0) + item.followers;
    return acc;
  }, {} as Record<string, number>);

  const reachData = data.reduce((acc, item) => {
    acc[item.platform] = (acc[item.platform] || 0) + item.reach;
    return acc;
  }, {} as Record<string, number>);

  return {
    lineData: {
      labels: dates,
      datasets: [{
        label: 'Followers',
        data: followers,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
      }]
    },
    barData: {
      labels: dates,
      datasets: [{
        label: 'Engagement (%)',
        data: engagement,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      }]
    },
    pieData: {
      labels: Object.keys(platformData),
      datasets: [{
        label: 'Followers by Platform',
        data: Object.values(platformData),
        backgroundColor: Object.keys(platformData).map(platform => CHART_COLORS[platform.toLowerCase() as Platform]?.bg || 'rgba(156, 163, 175, 0.8)'),
        borderColor: Object.keys(platformData).map(platform => CHART_COLORS[platform.toLowerCase() as Platform]?.border || 'rgb(156, 163, 175)'),
        borderWidth: 1,
      }]
    },
    doughnutData: {
      labels: Object.keys(reachData),
      datasets: [{
        label: 'Reach by Platform',
        data: Object.values(reachData),
        backgroundColor: Object.keys(reachData).map(platform => CHART_COLORS[platform.toLowerCase() as Platform]?.bg || 'rgba(156, 163, 175, 0.8)'),
        borderColor: Object.keys(reachData).map(platform => CHART_COLORS[platform.toLowerCase() as Platform]?.border || 'rgb(156, 163, 175)'),
        borderWidth: 1,
      }]
    }
  };
}; 