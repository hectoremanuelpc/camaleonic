import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { User } from './validations/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-jwt-key';
const COOKIE_NAME = 'auth-token';

// Interfaz para el payload del JWT
export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

// Generar token JWT
export function generateToken(user: { id: string; name: string; email: string; createdAt: Date }): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Token válido por 7 días
  });
}

// Verificar token JWT
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

// Hash de contraseña
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verificar contraseña
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Esta función se movió a server-auth.ts para evitar conflictos

// Simulación de base de datos de usuarios (en producción usarías una BD real)
const users: Array<User & { password: string }> = [];

// Buscar usuario por email
export function findUserByEmail(email: string): (User & { password: string }) | null {
  return users.find(user => user.email === email) || null;
}

// Crear nuevo usuario
export async function createUser(name: string, email: string, password: string): Promise<User> {
  const hashedPassword = await hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };
  
  users.push(user);
  
  // Retornar usuario sin contraseña
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Constantes
export { COOKIE_NAME }; 