import { useState, useEffect } from 'react';
import { 
  fetchSocialMetricsData, 
  fetchContentData, 
  fetchAccountsData,
  createSocialMetric,
  createContent,
  createAccount,
  updateSocialMetric,
  updateContent,
  updateAccount,
  deleteSocialMetric,
  deleteContent,
  deleteAccount,
  SocialMetricsData,
  ContentData,
  AccountData 
} from '@/lib/mock-data';

export type TableType = 'metrics' | 'content' | 'accounts';

export const useTablesData = () => {
  const [activeTable, setActiveTable] = useState<TableType>('metrics');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para los datos locales
  const [localMetricsData, setLocalMetricsData] = useState<SocialMetricsData[]>([]);
  const [localContentData, setLocalContentData] = useState<ContentData[]>([]);
  const [localAccountData, setLocalAccountData] = useState<AccountData[]>([]);

  // Estado para el formulario
  const [formData, setFormData] = useState<any>({});

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [metrics, content, accounts] = await Promise.all([
        fetchSocialMetricsData(),
        fetchContentData(),
        fetchAccountsData()
      ]);
      setLocalMetricsData(metrics);
      setLocalContentData(content);
      setLocalAccountData(accounts);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      switch (activeTable) {
        case 'metrics':
          const newMetricRecord: Omit<SocialMetricsData, 'id'> = {
            date: formData.date || new Date().toISOString().split('T')[0],
            platform: formData.platform || 'Instagram',
            followers: parseInt(formData.followers) || 0,
            engagement: parseFloat(formData.engagement) || 0,
            posts: parseInt(formData.posts) || 0,
            likes: parseInt(formData.likes) || 0,
            comments: parseInt(formData.comments) || 0,
            shares: parseInt(formData.shares) || 0,
            reach: parseInt(formData.reach) || 0,
            impressions: parseInt(formData.impressions) || 0,
          };
          const createdMetric = await createSocialMetric(newMetricRecord);
          if (createdMetric) {
            setLocalMetricsData([...localMetricsData, createdMetric]);
          }
          break;
          
        case 'content':
          const newContentRecord: Omit<ContentData, 'id'> = {
            title: formData.title || '',
            platform: formData.platform || 'Instagram',
            type: formData.type || 'Post',
            publishDate: formData.publishDate || new Date().toISOString().split('T')[0],
            likes: parseInt(formData.likes) || 0,
            comments: parseInt(formData.comments) || 0,
            shares: parseInt(formData.shares) || 0,
            reach: parseInt(formData.reach) || 0,
            engagement_rate: parseFloat(formData.engagement_rate) || 0,
            status: formData.status || 'Borrador',
          };
          const createdContent = await createContent(newContentRecord);
          if (createdContent) {
            setLocalContentData([...localContentData, createdContent]);
          }
          break;
          
        case 'accounts':
          const newAccountRecord: Omit<AccountData, 'id'> = {
            platform: formData.platform || 'Instagram',
            username: formData.username || '',
            displayName: formData.displayName || '',
            followers: parseInt(formData.followers) || 0,
            following: parseInt(formData.following) || 0,
            posts: parseInt(formData.posts) || 0,
            verified: formData.verified === 'true',
            category: formData.category || '',
            connectedDate: formData.connectedDate || new Date().toISOString().split('T')[0],
            isActive: formData.isActive === 'true',
          };
          const createdAccount = await createAccount(newAccountRecord);
          if (createdAccount) {
            setLocalAccountData([...localAccountData, createdAccount]);
          }
          break;
      }
      
      resetForm();
    } catch (error) {
      console.error('Error adding record:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecord = async (id: string) => {
    setIsLoading(true);
    try {
      let success = false;
      
      switch (activeTable) {
        case 'metrics':
          success = await deleteSocialMetric(id);
          if (success) {
            setLocalMetricsData(localMetricsData.filter(item => item.id !== id));
          }
          break;
        case 'content':
          success = await deleteContent(id);
          if (success) {
            setLocalContentData(localContentData.filter(item => item.id !== id));
          }
          break;
        case 'accounts':
          success = await deleteAccount(id);
          if (success) {
            setLocalAccountData(localAccountData.filter(item => item.id !== id));
          }
          break;
      }
      
      if (!success) {
        console.error('Error deleting record');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecord = async (id: string, updatedData: any) => {
    setIsLoading(true);
    try {
      let updatedRecord: SocialMetricsData | ContentData | AccountData | null = null;
      
      switch (activeTable) {
        case 'metrics':
          updatedRecord = await updateSocialMetric(id, updatedData);
          if (updatedRecord) {
            setLocalMetricsData(localMetricsData.map(item => 
              item.id === id ? updatedRecord as SocialMetricsData : item
            ));
          }
          break;
        case 'content':
          updatedRecord = await updateContent(id, updatedData);
          if (updatedRecord) {
            setLocalContentData(localContentData.map(item => 
              item.id === id ? updatedRecord as ContentData : item
            ));
          }
          break;
        case 'accounts':
          updatedRecord = await updateAccount(id, updatedData);
          if (updatedRecord) {
            setLocalAccountData(localAccountData.map(item => 
              item.id === id ? updatedRecord as AccountData : item
            ));
          }
          break;
      }
      
      if (!updatedRecord) {
        console.error('Error updating record');
      }
      
      return updatedRecord;
    } catch (error) {
      console.error('Error updating record:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentData = () => {
    switch (activeTable) {
      case 'metrics':
        return localMetricsData;
      case 'content':
        return localContentData;
      case 'accounts':
        return localAccountData;
      default:
        return [];
    }
  };

  return {
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
    isLoading,
    loadData
  };
}; 