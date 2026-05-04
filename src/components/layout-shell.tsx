'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarNavbar } from './sidebar-navbar';
import { MobileBottomNav } from './mobile-bottom-nav';

const AUTH_ROUTES = ['/login', '/register'];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <SidebarNavbar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <MobileBottomNav />
      <div
        className={`flex flex-col min-h-screen transition-[margin] duration-200 pb-16 md:pb-0 ${
          collapsed ? 'md:ml-16' : 'md:ml-50'
        }`}
      >
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
