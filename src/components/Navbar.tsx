'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { useModal } from '@/components/ClientLayout';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuthStore();
  const { openLoginModal, openRegisterModal } = useModal();
  const pathname = usePathname();

  const handleLogin = () => {
    openLoginModal();
  };

  const handleRegister = () => {
    openRegisterModal();
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout();
    } catch (error) {
      console.error('Error logging out:', error);
      logout(); // Local logout in case of error
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePage = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral/20 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative">
                <Link href="/" className="group">
                  <div className="flex items-center space-x-2 relative z-10">
                    <div className="relative transform transition-transform duration-300 group-hover:scale-110">
                      <Image 
                        src="/logo_camaleonic.png" 
                        alt="Camaleonic" 
                        width={36} 
                        height={36} 
                        className="object-contain transform transition-transform duration-300 group-hover:rotate-12" 
                      />
                    </div>
                    <span className="text-2xl font-bold gradient-text transform transition-all duration-300 group-hover:translate-x-1">
                      Camaleonic
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:translate-y-[-2px] flex items-center group relative ${
                  isActivePage('/dashboard') 
                    ? 'text-primary font-semibold' 
                    : 'text-foreground hover:text-primary'
                }`}>
                  <span>Dashboard</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ${
                    isActivePage('/dashboard') 
                      ? 'scale-x-100' 
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
                <Link href="/tables" className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:translate-y-[-2px] flex items-center group relative ${
                  isActivePage('/tables') 
                    ? 'text-primary font-semibold' 
                    : 'text-foreground hover:text-primary'
                }`}>
                  <span>Tables</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ${
                    isActivePage('/tables') 
                      ? 'scale-x-100' 
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              </div>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="text-foreground/60">Loading...</div>
            ) : user ? (
              <>
                <div className="text-foreground text-sm group">
                  Hello, <span className="font-medium gradient-text">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-foreground hover:text-primary p-2 rounded-md text-sm font-medium transition-all duration-300 hover:translate-y-[-2px] relative hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] group"
                  aria-label="Log Out"
                >
                  <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 cursor-pointer" />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleLogin}
                  className="cursor-pointer text-foreground hover:text-primary px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-sm"
                >
                  Log In
                </button>
                <button 
                  onClick={handleRegister}
                  className="cursor-pointer gradient-primary text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:opacity-90 transform active:scale-95"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary p-2 rounded-md transition-all duration-300 hover:scale-110"
            >
              <div className="relative w-6 h-6">
                <Menu className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in-up h-screen">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white backdrop-blur-xl rounded-lg mt-2 border border-neutral/40 shadow-2xl shadow-black/30 ring-1 ring-black/5">
              {user && (
                <>
                  <Link 
                    href="/dashboard" 
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:translate-x-2 flex items-center justify-between group ${
                      isActivePage('/dashboard') 
                        ? 'text-primary font-semibold bg-primary/10 border-l-4 border-primary' 
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <span>Dashboard</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link 
                    href="/tables" 
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:translate-x-2 flex items-center justify-between group ${
                      isActivePage('/tables') 
                        ? 'text-primary font-semibold bg-primary/10 border-l-4 border-primary' 
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <span>Tables</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </>
              )}
              <div className="pt-4 pb-3 border-t border-neutral/20">
                <div className="flex flex-col space-y-2">
                  {isLoading ? (
                    <div className="text-foreground/60 px-3 py-2">Loading...</div>
                  ) : user ? (
                    <>
                      <div className="text-foreground px-3 py-2 text-base">
                        Hello, <span className="font-medium gradient-text">{user.name}</span>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium text-left transition-all duration-300 hover:translate-x-2 flex items-center justify-between group"
                      >
                        <span>Log Out</span>
                        <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 cursor-pointer" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => {
                          handleLogin();
                          closeMenu();
                        }}
                        className="text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium text-left transition-all duration-300 hover:translate-x-2 flex items-center justify-between group"
                      >
                        <span>Log In</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => {
                          handleRegister();
                          closeMenu();
                        }}
                        className="gradient-primary text-white px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 hover:translate-x-2 hover:opacity-90 active:scale-95 flex items-center justify-between group"
                      >
                        <span>Sign Up</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 