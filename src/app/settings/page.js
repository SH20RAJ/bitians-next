'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'account', label: 'Account', icon: 'manage_accounts' },
    { id: 'privacy', label: 'Privacy', icon: 'shield' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' },
    { id: 'help', label: 'Help & Support', icon: 'help' },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center">
                  {session?.user?.image && (
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{session?.user?.name || 'User'}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {session?.user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="material-symbols-rounded mr-3">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card p-6">
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-rounded text-4xl text-neutral-500 dark:text-neutral-400">settings</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">This page is under construction</h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8">
                  We're working hard to bring you a comprehensive settings experience. Check back soon!
                </p>
                <Link
                  href="/feed"
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors inline-block"
                >
                  Return to Feed
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
