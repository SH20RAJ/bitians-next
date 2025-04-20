'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignOut() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: '/auth/signin' });
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Sign Out</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Are you sure you want to sign out?
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Signing out...' : 'Sign Out'}
              </button>
              
              <Link
                href="/feed"
                className="w-full py-3 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-center text-neutral-800 dark:text-neutral-200 rounded-lg transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
