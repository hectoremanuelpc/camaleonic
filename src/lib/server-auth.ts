import { cookies } from 'next/headers';
import { verifyToken, COOKIE_NAME, type JWTPayload } from './auth';

// Obtener usuario desde las cookies (servidor)
export async function getServerUser(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) {
      return null;
    }

    const user = verifyToken(token);
    return user;
  } catch (error) {
    return null;
  }
} 