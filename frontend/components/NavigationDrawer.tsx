"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Executive Dashboard",
    icon: "analytics",
    href: "/dashboard/overview",
  },
  {
    label: "Productivity Module",
    icon: "auto_awesome",
    href: "/dashboard/productivity",
  },
  {
    label: "Network Hub",
    icon: "account_tree",
    href: "/dashboard/network",
  },
  {
    label: "Customization",
    icon: "tune",
    href: "/dashboard/settings",
  },
];

export function NavigationDrawer() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-full w-80 rounded-r-lg border-r border-stroke-glass shadow-2xl bg-surface-container-low py-8 gap-[var(--spacing-grid-unit)] z-40 shrink-0 transition-all duration-300">
      {/* Profile Header */}
      <div className="px-6 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-stroke-glass overflow-hidden shrink-0 relative bg-surface-container flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface-variant text-2xl">
            person
          </span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <h2 className="font-body-md font-semibold text-on-surface truncate">
            Nexus Executive
          </h2>
          <p className="font-body-sm text-on-surface-variant truncate">
            Tier 1 Access
          </p>
          <p className="font-label-mono text-primary mt-1">Node: 0x882</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 px-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-body-md ${
                isActive
                  ? "text-primary bg-glow-emerald border-l-2 border-primary translate-x-1 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]"
                  : "text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface group"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-on-surface-variant group-hover:text-primary"
                }`}
                style={
                  isActive
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Brand Footer */}
      <div className="px-6 pt-6 border-t border-stroke-glass/50">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emergency
          </span>
          <span className="font-label-mono text-primary tracking-widest">
            NEXUS_OS v9.4
          </span>
        </div>
      </div>
    </aside>
  );
}
