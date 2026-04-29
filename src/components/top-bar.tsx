'use client';

import { MapPin, Clock } from 'lucide-react';

export function TopBar() {
  return (
    <header className="bg-[#faf8f4]  sticky top-0 z-20">
      <div className="px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-5 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-500" />
            <span>01:48 PM (UTC -7)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-500" />
            <span>San Francisco, US</span>
          </div>
        </div>

        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-300 to-pink-400 ring-2 ring-white shadow-sm" />
        </div>
      </div>
    </header>
  );
}
