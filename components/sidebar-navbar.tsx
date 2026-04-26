'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Car,
  FileText,
  Heart,
  Clock,
  Bell,
  MessageCircle,
  FileKey,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const mainNav = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/vehicles', label: 'Vehicles', icon: Car },
  { href: '/notes', label: 'Notes', icon: FileText },
  { href: '/favourites', label: 'Favourites', icon: Heart },
  { href: '/recents', label: 'Recents', icon: Clock },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
];

const bottomNav = [
  { href: '/license', label: 'License', icon: FileKey },
  { href: '/support', label: 'Support', icon: LifeBuoy },
  { href: '/logout', label: 'Logout', icon: LogOut },
];

interface SidebarNavbarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function SidebarNavbar({ collapsed = false, onToggle }: SidebarNavbarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const renderItem = (item: (typeof mainNav)[number]) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={`flex items-center gap-3 rounded-lg text-sm transition-colors ${
          collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
        } ${
          active
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon
          size={18}
          className={`${active ? 'text-white' : 'text-gray-600'} shrink-0`}
        />
        {!collapsed && <span className="font-medium">{item.label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 bottom-0 h-screen z-30 transition-[width] duration-200 ${
        collapsed ? 'w-16' : 'w-50'
      }`}
    >
      {/* Floating toggle button */}
      <button
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-white border border-gray-200 hover:border-gray-300 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 z-40 transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Logo */}
      <div
        className={`py-5 flex items-center gap-2 ${
          collapsed ? 'justify-center px-2' : 'px-5'
        }`}
      >
        <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12L9 16L19 6"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {!collapsed && (
          <span className="text-[13px] font-bold tracking-wider text-gray-900 whitespace-nowrap">
            AUTO ULTIMATE
          </span>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5">
        {mainNav.map(renderItem)}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-3 border-t border-gray-100 flex flex-col gap-0.5">
        {bottomNav.map(renderItem)}
      </div>
    </aside>
  );
}
