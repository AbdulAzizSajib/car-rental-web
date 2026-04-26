'use client';

import { Home, Car, FileText, Heart, Clock, Bell, MessageCircle, FileKey, LifeBuoy, LogOut } from 'lucide-react';

export function SidebarNavbar() {
  return (
    <div className="w-16 bg-gray-50 border-r flex flex-col items-center py-6 gap-6 fixed left-0 top-0 bottom-0 h-screen">
      {/* Logo */}
      <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-white font-bold text-lg">
        A
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-6">
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="Home">
          <Home size={24} className="text-gray-700" />
        </button>
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="Vehicles">
          <Car size={24} className="text-gray-700" />
        </button>
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="Notes">
          <FileText size={24} className="text-gray-700" />
        </button>
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="Favorites">
          <Heart size={24} className="text-gray-700" />
        </button>
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="Recents">
          <Clock size={24} className="text-gray-700" />
        </button>
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="Notifications">
          <Bell size={24} className="text-gray-700" />
        </button>
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="Chat">
          <MessageCircle size={24} className="text-gray-700" />
        </button>
      </nav>

      {/* Bottom Items */}
      <div className="mt-auto flex flex-col gap-6 mb-6">
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="License">
          <FileKey size={24} className="text-gray-700" />
        </button>
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="Support">
          <LifeBuoy size={24} className="text-gray-700" />
        </button>
        <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors" title="Logout">
          <LogOut size={24} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
}
