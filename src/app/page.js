'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Just update loading state, let middleware handle redirects
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">BITians</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">Loading...</p>
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="text-center max-w-md w-full px-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to BITians</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Connect with fellow BIT Mesra students, share updates, and stay in touch with your campus community.
        </p>

        <div className="space-y-4">
          {status === 'authenticated' ? (
            <Link
              href="/feed"
              className="block w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-center"
            >
              Go to Feed
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="block w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-center"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
