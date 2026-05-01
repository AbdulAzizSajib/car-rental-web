"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp, Car } from "lucide-react";

interface NavGroup {
  key: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: { href: string; label: string }[];
}

const groups: NavGroup[] = [
  {
    key: "car",
    label: "Car",
    icon: Car,
    children: [
      { href: "/admin/cars/all", label: "All Cars" },
      { href: "/admin/cars/brands", label: "Brand" },
      { href: "/admin/cars/models", label: "Cars Model" },
      { href: "/admin/cars/body-types", label: "Body Types" },
      { href: "/admin/cars/fuel-types", label: "Fuel Types" },
    ],
  },
];

function SectionHeader({
  label,
  Icon,
  open,
  onToggle,
}: {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-[11px] font-semibold tracking-wider text-gray-500 uppercase"
    >
      <span className="flex items-center gap-2">
        <Icon size={14} className="text-gray-500" />
        {label}
      </span>
      {open ? (
        <ChevronUp size={14} className="text-gray-400" />
      ) : (
        <ChevronDown size={14} className="text-gray-400" />
      )}
    </button>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(groups.map((g) => [g.key, true])),
  );

  const toggle = (key: string) =>
    setOpenGroups((s) => ({ ...s, [key]: !s[key] }));

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <div className="bg-white">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Dashboard</h2>
      </div>

      {groups.map((group) => {
        const open = openGroups[group.key];
        return (
          <div key={group.key} className="px-5 py-4 border-b border-gray-100">
            <SectionHeader
              label={group.label}
              Icon={group.icon}
              open={open}
              onToggle={() => toggle(group.key)}
            />
            {open && (
              <div className="mt-3 flex flex-col gap-0.5">
                {group.children.map((child) => {
                  const active = isActive(child.href);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`px-3 py-2 rounded-md text-sm transition-colors ${
                        active
                          ? "bg-[#c9a84c] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
