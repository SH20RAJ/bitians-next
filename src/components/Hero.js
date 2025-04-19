import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Connect with</span>{' '}
                <span className="block text-primary-600 dark:text-primary-400 xl:inline">
                  BIT Mesra
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                A dedicated social media platform for BIT Mesra, Ranchi, optimized for college-specific interactions and features. Connect with peers, join groups, and stay updated with campus events.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/signup"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/features"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 dark:text-primary-300 dark:bg-gray-800 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-primary-400 to-secondary-500 opacity-80 dark:opacity-40 rounded-bl-3xl">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 animate-pulse-slow">
              <svg
                className="absolute inset-0 w-full h-full text-white dark:text-gray-200 opacity-20"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
              >
                <path d="M50,0 C77.6142375,0 100,22.3857625 100,50 C100,77.6142375 77.6142375,100 50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,0 50,0 Z M50,10 C27.90861,10 10,27.90861 10,50 C10,72.09139 27.90861,90 50,90 C72.09139,90 90,72.09139 90,50 C90,27.90861 72.09139,10 50,10 Z"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white dark:text-gray-200">
                  BITians
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
