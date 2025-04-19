'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileNavBar() {
  const [activeTab, setActiveTab] = useState('home');
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const navItems = [
    { id: 'home', icon: 'home', href: '/feed' },
    { id: 'discover', icon: 'travel_explore', href: '/discover' },
    { id: 'create', icon: 'add_circle', special: true },
    { id: 'circles', icon: 'groups', href: '/circles', badge: 2 },
    { id: 'profile', icon: 'person', href: '/profile' },
  ];

  const createOptions = [
    { id: 'post', label: 'Create Post', icon: 'edit_square', color: 'bg-primary-500' },
    { id: 'photo', label: 'Upload Photo', icon: 'photo_camera', color: 'bg-accent-500' },
    { id: 'video', label: 'Upload Video', icon: 'videocam', color: 'bg-secondary-500' },
    { id: 'event', label: 'Create Event', icon: 'event', color: 'bg-tertiary-500' },
  ];

  const handleCreateClick = () => {
    setShowCreateMenu(!showCreateMenu);
  };

  return (
    <>
      {/* Create menu overlay */}
      {showCreateMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-20 flex items-end justify-center pb-20 animate-fade-in"
          onClick={() => setShowCreateMenu(false)}
        >
          <div
            className="bg-white dark:bg-neutral-900 rounded-2xl w-[90%] max-w-sm overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-medium">Create New</h3>
            </div>
            <div className="p-2">
              {createOptions.map((option) => (
                <Link
                  key={option.id}
                  href={`/create/${option.id}`}
                  className="flex items-center p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setShowCreateMenu(false)}
                >
                  <div className={`${option.color} h-10 w-10 rounded-lg flex items-center justify-center text-white mr-3`}>
                    <span className="material-symbols-rounded">{option.icon}</span>
                  </div>
                  <span>{option.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-10 md:hidden">
        <div className="flex justify-between items-center px-2">
          {navItems.map((item) => (
            <div key={item.id} className="relative flex-1">
              {item.special ? (
                <button
                  className="w-full flex flex-col items-center justify-center py-3 px-3 transition-colors text-primary-500 dark:text-primary-400"
                  onClick={handleCreateClick}
                >
                  <span className="material-symbols-rounded text-3xl fill-icon">{item.icon}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`w-full flex flex-col items-center justify-center py-3 px-3 transition-colors
                    ${activeTab === item.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-600 dark:text-neutral-400'}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className={`material-symbols-rounded text-2xl ${activeTab === item.id ? 'fill-icon' : ''}`}>{item.icon}</span>

                  {item.badge && (
                    <span className="absolute top-2 right-1/4 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
