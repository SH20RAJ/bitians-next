'use client';

import Link from 'next/link';

export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Check Your Email</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                A sign in link has been sent to your email address.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  If you don't see the email in your inbox, check your spam folder.
                </p>
              </div>

              <div className="flex justify-center">
                <Link
                  href="/auth/signin"
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
