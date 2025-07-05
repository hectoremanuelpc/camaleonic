import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { COOKIE_NAME } from './auth';
import type { User } from './validations/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      token: null,
      login: (token, user) => {
        // Guardar token en cookie (7 días)
        Cookies.set(COOKIE_NAME, token, { 
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        set({ user, token, isLoading: false });
      },
      logout: () => {
        Cookies.remove(COOKIE_NAME);
        set({ user: null, token: null, isLoading: false });
      },
      updateUser: (user) => {
        set({ user });
      },
      setIsLoading: (isLoading) => {
        set({ isLoading });
      },
    }),
    {
      name: 'auth-storage', // nombre único para el almacenamiento
      // Solo almacenar estos campos en localStorage
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
      }),
    }
  )
);

// Hook para inicializar el estado de autenticación al cargar la aplicación
export function useInitAuth() {
  const { isLoading, login, logout, setIsLoading } = useAuthStore();
  
  return { isLoading, login, logout, setIsLoading };
} 