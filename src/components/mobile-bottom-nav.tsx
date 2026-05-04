"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  Car,
  CalendarCheck,
  Heart,
  CreditCard,
  Bell,
  MessageCircle,
  FileKey,
  LifeBuoy,
  LogOut,
  LogIn,
  LucideLayoutDashboard,
  MoreHorizontal,
  X,
} from "lucide-react";
import { logoutAction } from "@/src/services/auth/logout.action";
import { getAuthStatusAction } from "@/src/services/auth/getAuthStatus.action";

const tabNav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/vehicles", label: "Vehicles", icon: Car },
  { href: "/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/notifications", label: "Alerts", icon: Bell },
];

const moreNav = [
  { href: "/favourites", label: "Favourites", icon: Heart },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/license", label: "License", icon: FileKey },
  { href: "/support", label: "Support", icon: LifeBuoy },
  { href: "/dashboard", label: "Dashboard", icon: LucideLayoutDashboard },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getAuthStatusAction().then(setIsAuthenticated);
  }, [pathname]);

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAction();
    setIsAuthenticated(false);
    router.push("/login");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const isMoreActive = moreNav.some((item) => isActive(item.href));

  return (
    <>
      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#faf8f4] border-t border-gray-200 flex md:hidden">
        {tabNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
            >
              <Icon
                size={20}
                className={active ? "text-[#c9a84c]" : "text-gray-500"}
              />
              <span
                className={`text-[10px] font-medium ${
                  active ? "text-[#c9a84c]" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setSheetOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
        >
          <MoreHorizontal
            size={20}
            className={isMoreActive ? "text-[#c9a84c]" : "text-gray-500"}
          />
          <span
            className={`text-[10px] font-medium ${
              isMoreActive ? "text-[#c9a84c]" : "text-gray-500"
            }`}
          >
            More
          </span>
        </button>
      </nav>

      {/* Sheet overlay */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setSheetOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Sheet */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#faf8f4] rounded-t-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle + header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
              <span className="text-sm font-semibold text-gray-800">Menu</span>
              <button
                onClick={() => setSheetOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X size={14} className="text-gray-600" />
              </button>
            </div>

            {/* Grid of nav items */}
            <div className="grid grid-cols-3 gap-3 px-4 py-3">
              {moreNav.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-xl py-4 transition-colors ${
                      active
                        ? "bg-[#c9a84c] text-white"
                        : "bg-white text-gray-700 border border-gray-100"
                    }`}
                  >
                    <Icon
                      size={22}
                      className={active ? "text-white" : "text-gray-500"}
                    />
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Auth action */}
            <div className="px-4 pb-6 pt-1">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium disabled:opacity-50 transition-colors"
                >
                  <LogOut size={16} />
                  {loggingOut ? "Logging out…" : "Logout"}
                </button>
              ) : (
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#c9a84c] text-white text-sm font-medium"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
