'use client';

import { useAuthStore } from '@/lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTablesData } from '@/hooks/useTablesData';
import { TableSelector } from '@/components/tables/TableSelector';
import { DataTable } from '@/components/tables/DataTable';
import { AddForm } from '@/components/tables/AddForm';
import { InfoPanel } from '@/components/tables/InfoPanel';

export default function Tables() {
  const { user, isLoading: authLoading } = useAuthStore();
  const router = useRouter();
  const {
    activeTable,
    setActiveTable,
    showAddForm,
    setShowAddForm,
    formData,
    setFormData,
    localMetricsData,
    localContentData,
    localAccountData,
    handleAddRecord,
    deleteRecord,
    updateRecord,
    getCurrentData,
    resetForm,
    isLoading
  } = useTablesData();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting...
  }

  const currentData = getCurrentData();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-background to-neutral/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Social Media Data Management
            </h1>
            <p className="text-xl text-foreground/70">
              Manage metrics, content and accounts of your social networks
            </p>
          </div>

          {/* Table selector */}
          <TableSelector
            activeTable={activeTable}
            setActiveTable={setActiveTable}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            metricsCount={localMetricsData.length}
            contentCount={localContentData.length}
            accountsCount={localAccountData.length}
          />

          {/* Add form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-lg border border-neutral/20 p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Add New {activeTable === 'metrics' ? 'Metrics' : activeTable === 'content' ? 'Content' : 'Account'}
              </h3>
              <AddForm
                activeTable={activeTable}
                formData={formData}
                setFormData={setFormData}
                handleAddRecord={handleAddRecord}
                resetForm={resetForm}
              />
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-lg shadow-lg border border-neutral/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral/20">
              <h3 className="text-lg font-semibold text-foreground">
                {activeTable === 'metrics' ? 'Social Media Metrics' : 
                 activeTable === 'content' ? 'Published Content' : 
                 'Connected Accounts'}
              </h3>
              <p className="text-sm text-foreground/60 mt-1">
                {currentData.length} records found
              </p>
            </div>
            <DataTable
              activeTable={activeTable}
              data={currentData}
              deleteRecord={deleteRecord}
              updateRecord={updateRecord}
            />
          </div>

          {/* Additional information */}
          <InfoPanel />
        </div>
      </div>
    </div>
  );
} 