'use client';

import { MapPin, Clock } from 'lucide-react';

export function TopBar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
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
          <button className="flex items-center gap-2 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.39 7.36H22l-6.18 4.49 2.39 7.36L12 16.72l-6.18 4.49 2.39-7.36L2 9.36h7.61L12 2z" />
            </svg>
            PRO features
          </button>
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-300 to-pink-400 ring-2 ring-white shadow-sm" />
        </div>
      </div>
    </header>
  );
}
