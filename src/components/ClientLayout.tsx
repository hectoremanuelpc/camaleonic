'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/auth/AuthModal";
import { useAuthStore } from "@/lib/store";
import Cookies from 'js-cookie';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

// Tipo para el contexto del modal
interface ModalContextType {
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeAuthModal: () => void;
}

// Crear el contexto
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Hook para usar el contexto
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  // Estado para el modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isMounted, setIsMounted] = useState(false);

  // Acceder al store de autenticación
  const { login, logout, setIsLoading } = useAuthStore();

  // Efecto para manejar la hidratación e inicializar la autenticación
  useEffect(() => {
    setIsMounted(true);

    // Verificar autenticación al cargar
    const checkAuth = async () => {
      try {
        const token = Cookies.get(COOKIE_NAME);
        
        if (token) {
          const payload = verifyToken(token);
          if (payload) {
            login(token, {
              id: payload.userId,
              name: payload.name,
              email: payload.email,
              createdAt: new Date(),
            });
          } else {
            // Token inválido, eliminar cookie
            logout();
          }
        } else {
          // No hay token, simplemente actualizar isLoading
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        logout();
      }
    };

    checkAuth();
  }, [login, logout, setIsLoading]);

  // Funciones para manejar el modal
  const openLoginModal = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Valor del contexto
  const modalContextValue = {
    isAuthModalOpen,
    authModalTab,
    openLoginModal,
    openRegisterModal,
    closeAuthModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
      
      {/* Auth Modal fuera del Navbar para que el backdrop afecte a toda la pantalla */}
      {isMounted && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          defaultTab={authModalTab}
        />
      )}
    </ModalContext.Provider>
  );
} 