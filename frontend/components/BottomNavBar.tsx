"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: "dashboard", href: "/dashboard/overview", label: "Dashboard" },
  { icon: "insights", href: "/dashboard/productivity", label: "Insights" },
  { icon: "hub", href: "/dashboard/network", label: "Hub" },
  { icon: "settings_suggest", href: "/dashboard/settings", label: "Settings" },
];

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 pb-6 pt-3 border-t border-stroke-glass bg-surface-container/90 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-t-lg z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center p-3 transition-all duration-300 ${
              isActive
                ? "text-primary bg-glow-emerald rounded-full scale-90 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                : "text-on-surface-variant hover:bg-surface-variant/50 rounded-lg"
            }`}
            aria-label={item.label}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={
                isActive
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              {item.icon}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
