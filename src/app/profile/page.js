'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLayout from '../../components/layout/MainLayout';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.username) {
      // Redirect to the dynamic profile page with the user's username
      router.push(`/profile/${session.user.username}`);
    } else if (status === 'unauthenticated') {
      // Redirect to sign in page if not authenticated
      router.push('/auth/signin');
    }
  }, [status, session, router]);

  // Show loading state while checking authentication or redirecting
  return (
    <MainLayout>
      <div className="flex-center h-screen">
        <div className="loading-spinner"></div>
        <p className="ml-3 text-muted">Redirecting to profile...</p>
      </div>
    </MainLayout>
  );
}
