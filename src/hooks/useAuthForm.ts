import { useState } from 'react';
import { useAuthStore } from '@/lib/store';

interface UseAuthFormOptions {
  onSuccess?: () => void;
  endpoint: '/api/auth/login' | '/api/auth/register';
}

export function useAuthForm({ onSuccess, endpoint }: UseAuthFormOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>('');
  const { login } = useAuthStore();

  const submitForm = async (data: any, setError: (field: string, error: any) => void) => {
    setIsLoading(true);
    setServerError('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        login(result.token, result.user);
        onSuccess?.();
      } else {
        if (result.errors) {
          result.errors.forEach((error: { field: string; message: string }) => {
            setError(error.field, {
              type: 'server',
              message: error.message,
            });
          });
        } else {
          setServerError(result.message || 'Error en la operación');
        }
      }
    } catch (error) {
      setServerError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    serverError,
    submitForm,
  };
} 