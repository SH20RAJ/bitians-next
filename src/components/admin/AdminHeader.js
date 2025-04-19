'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminHeader({ title, subtitle }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'report',
      message: 'New content reported for review',
      time: '5 minutes ago',
      isRead: false,
    },
    {
      id: 2,
      type: 'user',
      message: 'New user registration spike detected',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: 3,
      type: 'system',
      message: 'System update completed successfully',
      time: '3 hours ago',
      isRead: true,
    },
  ];
  
  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'report':
        return <span className="material-symbols-rounded text-red-500">flag</span>;
      case 'user':
        return <span className="material-symbols-rounded text-blue-500">person</span>;
      case 'system':
        return <span className="material-symbols-rounded text-green-500">system_update</span>;
      default:
        return <span className="material-symbols-rounded">notifications</span>;
    }
  };

  return (
    <header className="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700 py-4 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-neutral-600 dark:text-neutral-400 mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search..." 
              className="py-2 px-4 pr-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-sm border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 material-symbols-rounded text-neutral-500">search</span>
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="material-symbols-rounded">notifications</span>
              {notifications.some(n => !n.isRead) && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>
            
            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-10 overflow-hidden">
                <div className="p-3 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  <button className="text-xs text-primary-600 dark:text-primary-400">Mark all as read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors ${
                            !notification.isRead ? 'bg-primary-50 dark:bg-primary-900/10' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="mr-3">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-neutral-500 dark:text-neutral-400">
                      <p>No notifications</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 text-center">
                  <Link 
                    href="/admin-cp/notifications"
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    onClick={() => setShowNotifications(false)}
                  >
                    View All Notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* User menu */}
          <div className="relative">
            <button 
              className="flex items-center hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src="https://i.pravatar.cc/150?img=1"
                  alt="Admin"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </button>
            
            {/* User menu dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-10 overflow-hidden">
                <div className="p-3 border-b border-neutral-200 dark:border-neutral-700">
                  <p className="font-medium">Admin User</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">admin@bitians.com</p>
                </div>
                <div className="py-1">
                  <Link 
                    href="/admin-cp/profile"
                    className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    href="/admin-cp/settings"
                    className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Settings
                  </Link>
                  <div className="border-t border-neutral-200 dark:border-neutral-700 my-1"></div>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
