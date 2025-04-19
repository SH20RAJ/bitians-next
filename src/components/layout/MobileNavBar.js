'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileNavBar() {
  const [activeTab, setActiveTab] = useState('home');
  
  const navItems = [
    { id: 'home', icon: 'home', href: '/feed' },
    { id: 'search', icon: 'search', href: '/search' },
    { id: 'create', icon: 'add_box', href: '/create' },
    { id: 'reels', icon: 'movie', href: '/reels' },
    { id: 'profile', icon: 'person', href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 z-10 md:hidden">
      <div className="flex justify-between items-center px-2">
        {navItems.map((item) => (
          <Link 
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center justify-center py-3 px-3 flex-1 transition-colors
              ${activeTab === item.id 
                ? 'text-black dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="material-symbols-rounded text-2xl">{item.icon}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
