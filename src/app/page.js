'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

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

  if (status === 'authenticated') {
    router.push('/feed');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-black">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">BITians</span>
          </div>
          <div>
            <Link
              href="/auth/signin"
              className="px-4 py-2 bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 rounded-lg shadow-sm hover:shadow-md transition-all border border-primary-200 dark:border-primary-800 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Connect with your <span className="text-primary-600 dark:text-primary-400">BIT Mesra</span> community
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Share updates, join circles, discover hubs, and stay connected with fellow students, alumni, and faculty members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/signin"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-center font-medium shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="px-6 py-3 bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 rounded-lg transition-colors text-center font-medium border border-primary-200 dark:border-primary-800 shadow-sm hover:shadow-md"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://picsum.photos/id/1/800/600"
              alt="BIT Mesra Campus"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Features</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Everything you need to connect, share, and engage with your campus community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-rounded text-primary-600 dark:text-primary-400 text-2xl">forum</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Feed</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Stay updated with posts from your friends, circles, and hubs in a personalized feed.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-rounded text-primary-600 dark:text-primary-400 text-2xl">groups</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Circles</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Create or join private groups for your department, projects, or study groups.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-rounded text-primary-600 dark:text-primary-400 text-2xl">hub</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Hubs</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Discover public communities centered around interests, topics, and campus activities.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-primary-50 dark:bg-neutral-800/30 rounded-2xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">What Students Say</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Hear from students who are already using BITians to connect with their campus community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src="https://i.pravatar.cc/150?img=1"
                  alt="Student"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">Rahul Sharma</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Computer Science, 3rd Year</p>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              "BITians has made it so much easier to connect with my classmates and stay updated on campus events. The circles feature is perfect for our project groups!"
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src="https://i.pravatar.cc/150?img=5"
                  alt="Student"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">Priya Patel</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Electronics, 2nd Year</p>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              "I love how easy it is to discover and join different hubs based on my interests. It's helped me find like-minded people across different departments."
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src="https://i.pravatar.cc/150?img=3"
                  alt="Student"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">Amit Kumar</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Mechanical, 4th Year</p>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              "As a final year student, BITians has been invaluable for networking with alumni and finding internship opportunities through the platform."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">Ready to join your campus community?</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
          Sign up today and start connecting with fellow BIT Mesra students, join circles, discover hubs, and more.
        </p>
        <Link
          href="/auth/signin"
          className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-center font-medium text-lg shadow-lg hover:shadow-xl inline-block"
        >
          Get Started Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">BITians</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">About</a>
            <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">Privacy</a>
            <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">Terms</a>
            <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">Contact</a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-500">
          © {new Date().getFullYear()} BITians. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
