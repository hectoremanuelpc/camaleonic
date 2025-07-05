'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/lib/store';
import type { LoginData } from '@/lib/validations/auth';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>('');
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setServerError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Login exitoso
        login(result.token, result.user);
        onSuccess?.();
      } else {
        // Manejar errores
        if (result.errors) {
          result.errors.forEach((error: { field: string; message: string }) => {
            setError(error.field as keyof LoginData, {
              type: 'server',
              message: error.message,
            });
          });
        } else {
          setServerError(result.message || 'Error al iniciar sesión');
        }
      }
    } catch (error) {
      setServerError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-2xl p-6 border border-neutral/20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold gradient-text">Sign In</h2>
          <p className="text-foreground/60 mt-2">Access your Camaleonic account</p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email',
                },
              })}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="your@email.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
              })}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-primary text-white py-2 px-4 rounded-md font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {onSwitchToRegister && (
          <div className="mt-6 text-center">
            <p className="text-foreground/60">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-primary hover:underline font-medium"
              >
                Register here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 