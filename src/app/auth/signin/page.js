'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/feed' });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome to BITians</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Connect with your campus community
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg py-3 px-4 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-colors"
              >
                <Image
                  src="/google-logo.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                    BIT Mesra Students Only
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
              <p>
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
