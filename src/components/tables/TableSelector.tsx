import { TableType } from '@/hooks/useTablesData';

interface TableSelectorProps {
  activeTable: TableType;
  setActiveTable: (table: TableType) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  metricsCount: number;
  contentCount: number;
  accountsCount: number;
}

export const TableSelector = ({
  activeTable,
  setActiveTable,
  showAddForm,
  setShowAddForm,
  metricsCount,
  contentCount,
  accountsCount,
}: TableSelectorProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-neutral/20 p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTable('metrics')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTable === 'metrics' 
                ? 'gradient-primary text-white' 
                : 'bg-neutral/20 text-foreground hover:bg-neutral/30'
            }`}
          >
            📊 Metrics ({metricsCount})
          </button>
          <button
            onClick={() => setActiveTable('content')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTable === 'content' 
                ? 'gradient-primary text-white' 
                : 'bg-neutral/20 text-foreground hover:bg-neutral/30'
            }`}
          >
            📝 Content ({contentCount})
          </button>
          <button
            onClick={() => setActiveTable('accounts')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTable === 'accounts' 
                ? 'gradient-primary text-white' 
                : 'bg-neutral/20 text-foreground hover:bg-neutral/30'
            }`}
          >
            👤 Accounts ({accountsCount})
          </button>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="gradient-primary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          {showAddForm ? 'Hide Form' : 'Add Record'}
        </button>
      </div>
    </div>
  );
}; 