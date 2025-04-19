'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Notification count - would come from API in real app
  const notificationCount = 7;
  
  const menuItems = [
    { id: 'home', label: 'Home', icon: 'home', href: '/feed' },
    { id: 'search', label: 'Search', icon: 'search', href: '/search' },
    { id: 'explore', label: 'Explore', icon: 'explore', href: '/explore' },
    { id: 'reels', label: 'Reels', icon: 'movie', href: '/reels' },
    { id: 'messages', label: 'Messages', icon: 'chat', notificationCount: 3, href: '/messages' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', notificationCount: notificationCount, href: '/notifications' },
    { id: 'create', label: 'Create', icon: 'add_box', href: '/create' },
    { id: 'profile', label: 'Profile', icon: 'person', href: '/profile' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[72px] xl:w-[244px] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 z-10 flex flex-col py-8">
      <div className="px-3 xl:px-6 mb-8">
        <Link href="/feed" className="flex items-center">
          <div className="hidden xl:block">
            <Image src="/logo.svg" alt="BITians" width={110} height={40} />
          </div>
          <div className="block xl:hidden">
            <Image src="/logo.svg" alt="BITians" width={30} height={30} />
          </div>
        </Link>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link 
                href={item.href}
                className={`flex items-center py-3 px-3 xl:px-4 rounded-full transition-colors relative
                  ${activeTab === item.id 
                    ? 'font-bold' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="material-symbols-rounded text-2xl">{item.icon}</span>
                <span className="hidden xl:block ml-4">{item.label}</span>
                
                {item.notificationCount > 0 && (
                  <span className="absolute top-1 right-1 xl:right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.notificationCount > 9 ? '9+' : item.notificationCount}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto">
        <button 
          className="flex items-center py-3 px-3 xl:px-4 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 w-full transition-colors"
        >
          <span className="material-symbols-rounded text-2xl">menu</span>
          <span className="hidden xl:block ml-4">More</span>
        </button>
      </div>
    </aside>
  );
}
