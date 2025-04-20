import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}
