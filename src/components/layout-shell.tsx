'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarNavbar } from './sidebar-navbar';
import { TopBar } from './top-bar';

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
      <div
        className={`flex flex-col min-h-screen transition-[margin] duration-200 ${
          collapsed ? 'ml-16' : 'ml-50'
        }`}
      >
        {/* <TopBar /> */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
