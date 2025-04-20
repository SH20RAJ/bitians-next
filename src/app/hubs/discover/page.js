'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';

export default function DiscoverHubsPage() {
  const { data: session, status } = useSession();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link
            href="/hubs"
            className="mr-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <span className="material-symbols-rounded">arrow_back</span>
          </Link>
          <h1 className="text-2xl font-bold">Discover Hubs</h1>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card p-6">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-rounded text-4xl text-neutral-500 dark:text-neutral-400">travel_explore</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">This page is under construction</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8">
              We're working hard to bring you a comprehensive hub discovery experience. Check back soon!
            </p>
            <Link
              href="/hubs"
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors inline-block"
            >
              Return to Hubs
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
