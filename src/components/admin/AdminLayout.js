'use client';

import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children, activePage, title, subtitle }) {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <AdminSidebar activePage={activePage} />
      
      <div className="ml-[240px] min-h-screen flex flex-col">
        <AdminHeader title={title} subtitle={subtitle} />
        
        <main className="flex-1 p-6">
          {children}
        </main>
        
        <footer className="py-4 px-6 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500 dark:text-neutral-400">
          &copy; 2023 BITians Admin Panel. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
