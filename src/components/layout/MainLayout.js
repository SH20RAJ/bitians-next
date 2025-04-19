'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileNavBar from './MobileNavBar';

export default function MainLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      {!isMobile && <Sidebar />}
      
      <main className={`flex-1 ${!isMobile ? 'ml-[240px] xl:ml-[335px]' : ''}`}>
        {children}
      </main>
      
      {isMobile && <MobileNavBar />}
    </div>
  );
}
