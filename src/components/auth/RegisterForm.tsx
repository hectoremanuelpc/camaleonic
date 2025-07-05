'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/lib/store';
import type { RegisterData } from '@/lib/validations/auth';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>('');
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<RegisterData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    setServerError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Registro exitoso
        login(result.token, result.user);
        onSuccess?.();
      } else {
        // Manejar errores
        if (result.errors) {
          result.errors.forEach((error: { field: string; message: string }) => {
            setError(error.field as keyof RegisterData, {
              type: 'server',
              message: error.message,
            });
          });
        } else {
          setServerError(result.message || 'Error al registrar usuario');
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
          <h2 className="text-2xl font-bold gradient-text">Create Account</h2>
          <p className="text-foreground/60 mt-2">Join Camaleonic today</p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Full name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters long',
                },
                maxLength: {
                  value: 50,
                  message: 'Name cannot be longer than 50 characters',
                },
              })}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="Your full name"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

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
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                },
              })}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Password confirmation is required',
                validate: (value) =>
                  value === password || 'Passwords must match',
              })}
              className="w-full px-3 py-2 border border-neutral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-primary text-white py-2 px-4 rounded-md font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {onSwitchToLogin && (
          <div className="mt-6 text-center">
            <p className="text-foreground/60">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 