'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminSidebar({ activePage }) {
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/admin-cp' },
    { id: 'users', label: 'User Management', icon: 'group', href: '/admin-cp/users' },
    { id: 'content', label: 'Content Moderation', icon: 'content_paste', href: '/admin-cp/content' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'monitoring', href: '/admin-cp/reports' },
    { id: 'circles', label: 'Circles Management', icon: 'groups', href: '/admin-cp/circles' },
    { id: 'hubs', label: 'Hubs Management', icon: 'hub', href: '/admin-cp/hubs' },
    { id: 'events', label: 'Event Management', icon: 'event', href: '/admin-cp/events' },
    { id: 'settings', label: 'System Settings', icon: 'settings', href: '/admin-cp/settings' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full bg-neutral-900 text-white z-20 transition-all duration-300 ${
      collapsed ? 'w-[72px]' : 'w-[240px]'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center">
              <span className="material-symbols-rounded text-primary-500 mr-2">admin_panel_settings</span>
              <h1 className="font-bold text-lg">Admin Panel</h1>
            </div>
          )}
          {collapsed && (
            <span className="material-symbols-rounded text-primary-500 mx-auto">admin_panel_settings</span>
          )}
          <button 
            className="p-1 rounded-full hover:bg-neutral-800 transition-colors"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="material-symbols-rounded">
              {collapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map(item => (
              <li key={item.id}>
                <Link 
                  href={item.href}
                  className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
                    activePage === item.id 
                      ? 'bg-primary-900/50 text-primary-400' 
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-rounded text-xl">
                    {item.icon}
                  </span>
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-neutral-800">
          <Link 
            href="/feed"
            className="flex items-center py-2 px-3 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <span className="material-symbols-rounded text-xl">exit_to_app</span>
            {!collapsed && <span className="ml-3">Exit Admin Panel</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}
