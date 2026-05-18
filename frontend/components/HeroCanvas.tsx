import React from 'react';
import Link from 'next/link';

export default function HeroCanvas() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 z-20 relative my-auto flex flex-col justify-center min-h-[70vh]">
      <div className="max-w-2xl space-y-8 text-left">
        
        {/* Dynamic Upper Pill-Badge Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full hud-border">
          <span className="ticker-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-white/90">AI-POWERED PERSONAL ANALYTICS</span>
        </div>

        {/* Scaled Futuristic Header Typography Block */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black font-sans text-white tracking-tight leading-[0.95] uppercase">
          All your progress.<br />
          One <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-orange via-orange-500 to-amber-500 drop-shadow-[0_0_35px_rgba(255,76,0,0.4)] font-bold">unified</span><br />
          dashboard.
        </h1>

        {/* Multi-Domain Explainer Subtext copy */}
        <p className="text-terminal-slate text-xs sm:text-sm leading-relaxed max-w-lg font-sans">
          Connect your developer tools, social platforms, and productivity apps to get automated insights and track your growth across <span className="text-terminal-orange font-mono">coding</span>, <span className="text-terminal-orange font-mono">content</span>, <span className="text-terminal-orange font-mono">career</span>, and more.
        </p>

        {/* Dual Control Action Buttons Stack */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Main Angular Tech-Cut Button */}
          <Link href="/auth" className="tech-button-cut px-8 py-4 bg-terminal-orange hover:bg-white text-terminal-void hover:text-terminal-void font-bold text-xs font-mono tracking-widest transition-all duration-300 shadow-orange-glow hover:shadow-none flex items-center gap-2 group">
            EXPLORE NEXUSBOARD 
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>

          {/* Secondary Capsule Button */}
          <button className="px-6 py-4 rounded-full border border-terminal-stroke bg-terminal-glass text-white font-bold text-xs font-mono tracking-widest hover:border-white/40 transition-colors flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-terminal-orange">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            VIEW LIVE DEMO
          </button>
        </div>

      </div>
    </div>
  );
}
