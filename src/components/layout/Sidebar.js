'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  // Notification count - would come from API in real app
  const notificationCount = 7;

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'home', href: '/feed' },
    { id: 'discover', label: 'Discover', icon: 'travel_explore', href: '/discover' },
    { id: 'circles', label: 'Circles', icon: 'groups', href: '/circles', notificationCount: 2 },
    { id: 'hubs', label: 'Hubs', icon: 'hub', href: '/hubs' },
    { id: 'spotlights', label: 'Spotlights', icon: 'auto_awesome', href: '/spotlights', isNew: true },
    { id: 'messages', label: 'Messages', icon: 'chat', notificationCount: 3, href: '/messages' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', notificationCount: notificationCount, href: '/notifications' },
    { id: 'collections', label: 'Collections', icon: 'bookmark', href: '/collections' },
    { id: 'profile', label: 'Profile', icon: 'person', href: '/profile' },
  ];

  const circlesItems = [
    { id: 'circle-1', label: 'CS Department', image: 'https://picsum.photos/id/237/200/200', unread: true },
    { id: 'circle-2', label: 'Project Team', image: 'https://picsum.photos/id/238/200/200' },
    { id: 'circle-3', label: 'Study Group', image: 'https://picsum.photos/id/239/200/200', unread: true },
    { id: 'circle-4', label: 'Campus Events', image: 'https://picsum.photos/id/240/200/200' },
  ];

  const hubsItems = [
    { id: 'hub-1', label: 'Tech Discussions', image: 'https://picsum.photos/id/241/200/200', members: 1240 },
    { id: 'hub-2', label: 'Campus Life', image: 'https://picsum.photos/id/242/200/200', members: 3450 },
    { id: 'hub-3', label: 'Career Advice', image: 'https://picsum.photos/id/243/200/200', members: 890 },
    { id: 'hub-4', label: 'Hobby Club', image: 'https://picsum.photos/id/244/200/200', members: 567 },
  ];

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-[72px] xl:w-[280px] bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 z-10 flex flex-col py-6 overflow-y-auto">
      <div className="px-3 xl:px-6 mb-8">
        <Link href="/feed" className="flex items-center">
          <div className="hidden xl:block">
            <Image src="/logo.svg" alt="BITians" width={110} height={40} className="dark:invert" />
          </div>
          <div className="block xl:hidden">
            <Image src="/logo.svg" alt="BITians" width={30} height={30} className="dark:invert" />
          </div>
        </Link>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.id === 'circles' || item.id === 'hubs' ? (
                <div>
                  <button
                    className={`w-full flex items-center justify-between py-3 px-3 xl:px-4 rounded-xl transition-all duration-200 relative
                      ${activeTab === item.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      toggleSection(item.id);
                    }}
                  >
                    <div className="flex items-center">
                      <span className="material-symbols-rounded text-2xl">{item.icon}</span>
                      <span className="hidden xl:block ml-4">{item.label}</span>
                    </div>

                    {item.notificationCount > 0 && (
                      <span className="absolute top-1 right-1 xl:static xl:ml-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.notificationCount > 9 ? '9+' : item.notificationCount}
                      </span>
                    )}

                    <span className="hidden xl:block material-symbols-rounded text-lg ml-auto transform transition-transform duration-200 ease-in-out
                      ${expandedSection === item.id ? 'rotate-180' : 'rotate-0'}">
                      expand_more
                    </span>
                  </button>

                  {expandedSection === item.id && (
                    <div className="mt-1 ml-10 hidden xl:block">
                      <ul className="space-y-1 py-1">
                        {item.id === 'circles' && circlesItems.map(circle => (
                          <li key={circle.id}>
                            <Link
                              href={`/circles/${circle.id}`}
                              className="flex items-center py-2 px-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                              <div className="relative h-6 w-6 rounded-full overflow-hidden mr-3">
                                <Image src={circle.image} alt={circle.label} fill className="object-cover" />
                              </div>
                              <span className="text-sm">{circle.label}</span>
                              {circle.unread && (
                                <span className="ml-auto h-2 w-2 rounded-full bg-primary-500"></span>
                              )}
                            </Link>
                          </li>
                        ))}

                        {item.id === 'hubs' && hubsItems.map(hub => (
                          <li key={hub.id}>
                            <Link
                              href={`/hubs/${hub.id}`}
                              className="flex items-center py-2 px-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                              <div className="relative h-6 w-6 rounded-full overflow-hidden mr-3">
                                <Image src={hub.image} alt={hub.label} fill className="object-cover" />
                              </div>
                              <span className="text-sm">{hub.label}</span>
                              <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">{hub.members.toLocaleString()}</span>
                            </Link>
                          </li>
                        ))}

                        <li>
                          <Link
                            href={item.id === 'circles' ? '/circles/create' : '/hubs/discover'}
                            className="flex items-center py-2 px-3 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <span className="material-symbols-rounded text-lg mr-3">
                              {item.id === 'circles' ? 'add_circle' : 'travel_explore'}
                            </span>
                            <span className="text-sm">
                              {item.id === 'circles' ? 'Create New Circle' : 'Discover Hubs'}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center py-3 px-3 xl:px-4 rounded-xl transition-all duration-200 relative
                    ${activeTab === item.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="material-symbols-rounded text-2xl">{item.icon}</span>
                  <span className="hidden xl:block ml-4">{item.label}</span>

                  {item.notificationCount > 0 && (
                    <span className="absolute top-1 right-1 xl:static xl:ml-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.notificationCount > 9 ? '9+' : item.notificationCount}
                    </span>
                  )}

                  {item.isNew && (
                    <span className="hidden xl:block ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-tertiary-100 dark:bg-tertiary-900 text-tertiary-800 dark:text-tertiary-300">
                      NEW
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto px-2">
        <div className="hidden xl:block px-4 py-3 mb-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
          <h4 className="text-sm font-medium mb-2">Quick Access</h4>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors">
              <span className="material-symbols-rounded text-lg">edit_square</span>
            </button>
            <button className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors">
              <span className="material-symbols-rounded text-lg">photo_camera</span>
            </button>
            <button className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors">
              <span className="material-symbols-rounded text-lg">videocam</span>
            </button>
            <button className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors">
              <span className="material-symbols-rounded text-lg">event</span>
            </button>
          </div>
        </div>

        <button
          className="w-full flex items-center py-3 px-3 xl:px-4 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <span className="material-symbols-rounded text-2xl">settings</span>
          <span className="hidden xl:block ml-4">Settings</span>
        </button>
      </div>
    </aside>
  );
}
