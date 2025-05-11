import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { cookies, headers } from 'next/headers';

export async function getSession() {
  try {
    // Pass the request headers and cookies to getServerSession for Edge compatibility
    return await getServerSession(
      authOptions,
      {
        headers: Object.fromEntries(headers()),
        cookies: Object.fromEntries(
          cookies().getAll().map(c => [c.name, c.value])
        ),
      }
    );
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}
