import React from 'react';
import DataLandscapeBackground from '@/components/DataLandscapeBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#06080C]">
      
      {/* Layer 1: Isometric 3D Projection Canvas Component */}
      <DataLandscapeBackground />

      {/* Layer 2: Soft Dark Ambient Masking Inversion Overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none bg-[radial-gradient(circle_at_70%_50%,rgba(6,8,12,0.1)_0%,rgba(6,8,12,0.95)_85%)]" />

      {/* Layer 3: High-Contrast Navigation, Hero Stack, and Platform Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col min-h-screen justify-between">
        
        {/* TOP BRANDING CONTAINER */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-orange-600 to-amber-500 rounded-md shadow-[0_0_15px_rgba(255,90,0,0.4)]" />
            <span className="text-lg font-black tracking-widest text-white">NEXUS BOARD</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
            <a href="#integrations" className="hover:text-white transition-colors">INTEGRATIONS</a>
            <a href="#analytics" className="hover:text-white transition-colors">ANALYTICS</a>
          </nav>
        </header>

        {/* HERO TITLE GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto items-center pt-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 border border-orange-500/20 bg-orange-500/5 rounded text-[10px] font-mono tracking-widest text-orange-500">
              &gt;_ AI-POWERED PERSONAL ANALYTICS
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
              All your progress.<br />
              One <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 drop-shadow-[0_0_30px_rgba(255,90,0,0.3)]">unified</span><br />
              dashboard.
            </h1>
            <p className="text-slate-400 max-w-md text-xs sm:text-sm leading-relaxed font-normal">
              Connect your developer tools, social platforms and productivity apps to get automated insights and track your growth across coding, content, career and more.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs tracking-wider uppercase rounded shadow-[0_4px_20px_rgba(255,90,0,0.25)] transition-all">
                Get Started For Free →
              </button>
            </div>
          </div>
          
          {/* PLACEHOLDER BOUNDARY FOR RIGHT SIDEBAR STAT CARDS */}
          <div className="lg:col-span-5 space-y-4">
            {/* Ambient occlusion stats metrics panels sit here matching the image frames */}
          </div>
        </div>

        {/* BOTTOM METRICS BRAND FOOTER LOGO DECK */}
        <footer className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="text-[10px] font-mono tracking-wider text-slate-500">NEXUSBOARD CORE v2.0.0 // PRODUCTION PLATFORM</span>
        </footer>

      </div>
    </main>
  );
}
