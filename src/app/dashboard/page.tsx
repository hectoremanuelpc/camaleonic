'use client';

import { useAuthStore } from '@/lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FilterPanel from '@/components/dashboard/FilterPanel';
import { useDashboardData } from '@/hooks/useDashboardData';
import { MetricsPanel } from '@/components/dashboard/MetricsPanel';
import { ChartGrid } from '@/components/dashboard/ChartGrid';
import { InfoPanel } from '@/components/dashboard/InfoPanel';

export default function Dashboard() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const { data, filters, setFilters } = useDashboardData();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral/5 my-30">
      <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Dashboard - {user.name}
            </h1>
            <p className="text-xl text-foreground/70">
              Data analysis and interactive visualizations
            </p>
          </div>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Panel de Filtros */}
          <FilterPanel filters={filters} onFiltersChange={setFilters} />

          {/* Métricas Principales */}
          <MetricsPanel data={data} />

          {/* Gráficos */}
          <ChartGrid data={data} />

          {/* Información adicional */}
          <InfoPanel />
        </div>
      </div>
    </div>
  );
} 