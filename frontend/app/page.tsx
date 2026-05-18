import React from 'react';
import ConstellationBackground from '@/components/ConstellationBackground';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#04060A]">
      {/* 1. Hardware-Accelerated Animation Engine Layer */}
      <ConstellationBackground />

      {/* 2. Ambient Occlusion / Vignette Mask Layer */}
      <div className="absolute inset-0 z-5 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(4,6,10,0.2)_0%,rgba(4,6,10,0.95)_90%)]" />

      {/* 3. High-Density Presentation Layer Dashboard Content UI */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col min-h-screen justify-between">
        
        {/* HEADER BRANDING CONTROL BLOCK */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)]" />
            <span className="text-xl font-bold tracking-wider text-white">NEXUS BOARD</span>
          </div>
          {/* Main platform navigation headers can be placed here */}
          <div className="flex gap-4">
             <Link href="/auth" className="px-6 py-2 border border-orange-500/50 rounded-full text-orange-500 hover:bg-orange-500/10 transition-colors font-mono text-sm tracking-widest flex items-center gap-2 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                GET STARTED <span className="material-symbols-outlined text-sm">arrow_forward</span>
             </Link>
          </div>
        </header>

        {/* HERO STRIP TEXT STACK GRID CONTAINER */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 border border-orange-500/30 bg-orange-500/5 rounded-md text-xs font-mono tracking-widest text-orange-500">
              &gt; AI-POWERED PERSONAL ANALYTICS
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
              ALL YOUR PROGRESS.<br />
              ONE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.2)]">UNIFIED</span> DASHBOARD.
            </h1>
            <p className="text-slate-400 max-w-lg text-sm leading-relaxed">
              Connect your developer tools, social platforms, and productivity apps to get automated insights and track your growth across coding, content, career, and more.
            </p>
            {/* Call to Actions rendering block goes here */}
            <div className="flex items-center gap-4 pt-4">
              <Link href="/auth" className="bg-gradient-to-r from-orange-600 to-amber-500 text-white px-8 py-3 rounded-lg font-bold tracking-wider text-sm flex items-center gap-2 hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all">
                GET STARTED FOR FREE <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <button className="flex items-center gap-2 px-8 py-3 border border-slate-700 hover:bg-slate-800 rounded-lg text-white font-bold tracking-wider text-sm transition-all">
                <span className="material-symbols-outlined text-orange-500">play_circle</span>
                WATCH DEMO
              </button>
            </div>
          </div>
          
          {/* WIDGET PANELS AND PLATFORMS METRIC GRID */}
          <div className="lg:col-span-5 space-y-4">
            {/* Glassmorphic metrics tracking components match styling filters here */}
            <div className="p-4 bg-[#0A0D14]/80 backdrop-blur-md border border-slate-800 rounded-xl flex flex-col gap-2 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
               <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  Live Sync
               </div>
               <div className="text-white font-medium text-sm">All systems operational</div>
               {/* Sine wave fake chart */}
               <svg className="w-full h-8 mt-2" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <polyline points="0,10 10,15 20,5 30,18 40,2 50,12 60,8 70,16 80,4 90,14 100,10" fill="none" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="1" />
               </svg>
            </div>

            <div className="p-4 bg-[#0A0D14]/80 backdrop-blur-md border border-slate-800 rounded-xl flex flex-col gap-2 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
               <div className="text-slate-400 text-xs font-mono">Data Points</div>
               <div className="text-3xl font-bold text-white tracking-tight">1.2M+</div>
               {/* Bar fake chart */}
               <div className="flex items-end gap-1 h-8 mt-2">
                 {[40, 70, 30, 80, 50, 90, 60, 100, 40, 85, 30, 60].map((h, i) => (
                    <div key={i} className="flex-1 bg-orange-500/60 rounded-t-sm" style={{ height: `${h}%` }} />
                 ))}
               </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
