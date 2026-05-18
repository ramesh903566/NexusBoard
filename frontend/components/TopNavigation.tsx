import React from 'react';

export default function TopNavigation() {
  const navItems = ["FEATURES", "INTEGRATIONS", "INSIGHTS", "PRICING", "ABOUT", "DOCS"];

  return (
    <header className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-6 flex justify-between items-center relative z-20">
      {/* Brand Identity */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:scale-105 transition-transform">
          <path d="M4 4L11 12L4 20" stroke="#FF4C00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 4L13 12L20 20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm font-bold font-sans tracking-widest text-white">
          NEXUS<span className="text-terminal-orange">BOARD</span>
        </span>
      </div>

      {/* Center Navigation Array with Dot Dividers */}
      <nav className="hidden lg:flex items-center gap-6 text-[10px] font-mono tracking-widest text-terminal-slate">
        {navItems.map((item, index) => (
          <React.Fragment key={item}>
            <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-200">
              {item}
            </a>
            {index < navItems.length - 1 && <span className="w-1 h-1 rounded-full bg-terminal-orange/60" />}
          </React.Fragment>
        ))}
      </nav>

      {/* Action CTA Capsule Button */}
      <button className="px-5 py-2.5 rounded-full border border-terminal-orange/40 text-[10px] font-mono tracking-widest text-white hover:bg-terminal-orange hover:text-terminal-void shadow-soft-glow transition-all duration-300 group">
        GET STARTED <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </button>
    </header>
  );
}
