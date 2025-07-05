import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import DoughnutChart from '@/components/charts/DoughnutChart';
import { prepareChartData } from '@/lib/utils/chart-utils';
import { SocialMetricsData } from '@/lib/mock-data';

interface ChartGridProps {
  data: SocialMetricsData[];
}

export const ChartGrid = ({ data }: ChartGridProps) => {
  const chartData = prepareChartData(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <LineChart 
        data={chartData.lineData} 
        title="Followers Evolution" 
      />
      <BarChart 
        data={chartData.barData} 
        title="Engagement by Period" 
      />
      <PieChart 
        data={chartData.pieData} 
        title="Followers by Platform" 
      />
      <DoughnutChart 
        data={chartData.doughnutData} 
        title="Reach by Platform" 
      />
    </div>
  );
}; 