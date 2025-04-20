'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages = {
    default: 'An error occurred during authentication.',
    configuration: 'There is a problem with the server configuration.',
    accessdenied: 'You do not have access to this resource.',
    verification: 'The verification link may have expired or has already been used.',
  };

  const errorMessage = errorMessages[error] || errorMessages.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Authentication Error</h1>
              <p className="text-red-500 dark:text-red-400 mb-4">
                {errorMessage}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                Please try again or contact support if the problem persists.
              </p>
            </div>

            <div className="flex justify-center mt-8">
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
  );
}
