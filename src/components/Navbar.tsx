'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral/20 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg gradient-primary animate-pulse-glow"></div>
                  <div className="absolute inset-0 w-8 h-8 rounded-lg border-2 border-white/20"></div>
                </div>
                <span className="text-2xl font-bold gradient-text">
                  Camaleonic
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Dashboard
              </a>
              <a href="#" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Analytics
              </a>
              <a href="#" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Reports
              </a>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-foreground hover:text-primary px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Iniciar Sesión
            </button>
            <button className="gradient-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 transform hover:scale-105">
              Registrarse
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary p-2 rounded-md transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 border border-neutral/20">
              <a href="#" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Dashboard
              </a>
              <a href="#" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Analytics
              </a>
              <a href="#" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Reports
              </a>
              <div className="pt-4 pb-3 border-t border-neutral/20">
                <div className="flex flex-col space-y-2">
                  <button className="text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium text-left transition-colors duration-200">
                    Iniciar Sesión
                  </button>
                  <button className="gradient-primary text-white px-3 py-2 rounded-lg text-base font-medium hover:opacity-90 transition-opacity duration-200">
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 