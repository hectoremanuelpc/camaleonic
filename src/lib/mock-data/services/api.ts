import axios from 'axios';
import { SOCIAL_METRICS_URL, CONTENT_URL } from '../constants/api';
import { SocialMetricsData, ContentData, AccountData } from '../types/social';

// ============ MÉTRICAS SOCIALES ============

// Función para obtener datos de métricas sociales
export const fetchSocialMetricsData = async (): Promise<SocialMetricsData[]> => {
  try {
    const response = await axios.get<SocialMetricsData[]>(SOCIAL_METRICS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching social metrics data:', error);
    return [];
  }
};

// Función para crear una nueva métrica
export const createSocialMetric = async (metric: Omit<SocialMetricsData, 'id'>): Promise<SocialMetricsData | null> => {
  try {
    const response = await axios.post<SocialMetricsData>(SOCIAL_METRICS_URL, metric);
    return response.data;
  } catch (error) {
    console.error('Error creating social metric:', error);
    return null;
  }
};

// Función para actualizar una métrica
export const updateSocialMetric = async (id: string, metric: Partial<SocialMetricsData>): Promise<SocialMetricsData | null> => {
  try {
    const response = await axios.put<SocialMetricsData>(`${SOCIAL_METRICS_URL}/${id}`, metric);
    return response.data;
  } catch (error) {
    console.error('Error updating social metric:', error);
    return null;
  }
};

// Función para eliminar una métrica
export const deleteSocialMetric = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${SOCIAL_METRICS_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting social metric:', error);
    return false;
  }
};

// ============ CONTENIDO ============

// Función para obtener datos de contenido
export const fetchContentData = async (): Promise<ContentData[]> => {
  try {
    const response = await axios.get<ContentData[]>(CONTENT_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching content data:', error);
    return [];
  }
};

// Función para crear nuevo contenido
export const createContent = async (content: Omit<ContentData, 'id'>): Promise<ContentData | null> => {
  try {
    const response = await axios.post<ContentData>(CONTENT_URL, content);
    return response.data;
  } catch (error) {
    console.error('Error creating content:', error);
    return null;
  }
};

// Función para actualizar contenido
export const updateContent = async (id: string, content: Partial<ContentData>): Promise<ContentData | null> => {
  try {
    const response = await axios.put<ContentData>(`${CONTENT_URL}/${id}`, content);
    return response.data;
  } catch (error) {
    console.error('Error updating content:', error);
    return null;
  }
};

// Función para eliminar contenido
export const deleteContent = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${CONTENT_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting content:', error);
    return false;
  }
};

// ============ CUENTAS (API LOCAL) ============

// Función para obtener datos de cuentas desde la API local
export const fetchAccountsData = async (): Promise<AccountData[]> => {
  try {
    const response = await axios.get('/api/accounts', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.data.success) {
      return response.data.accounts;
    } else {
      console.error('Error en respuesta de cuentas:', response.data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching accounts data:', error);
    return [];
  }
};

// Función para crear nueva cuenta
export const createAccount = async (account: Omit<AccountData, 'id'>): Promise<AccountData | null> => {
  try {
    const response = await axios.post('/api/accounts', account, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.data.success) {
      return response.data.account;
    } else {
      console.error('Error creando cuenta:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('Error creating account:', error);
    return null;
  }
};

// Función para actualizar cuenta
export const updateAccount = async (id: string, account: Partial<AccountData>): Promise<AccountData | null> => {
  try {
    const response = await axios.put(`/api/accounts/${id}`, account, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.data.success) {
      return response.data.account;
    } else {
      console.error('Error actualizando cuenta:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('Error updating account:', error);
    return null;
  }
};

// Función para eliminar cuenta
export const deleteAccount = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`/api/accounts/${id}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return response.data.success;
  } catch (error) {
    console.error('Error deleting account:', error);
    return false;
  }
}; 