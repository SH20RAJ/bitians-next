'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = session?.user;

  const login = async (provider = 'google') => {
    await signIn(provider, { callbackUrl: '/feed' });
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  const navigateToProfile = () => {
    if (user?.username) {
      router.push(`/profile/${user.username}`);
    } else if (user?.id) {
      router.push(`/profile/${user.id}`);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    navigateToProfile,
  };
}
