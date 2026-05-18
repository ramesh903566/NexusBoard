import React, { Suspense } from "react";
import { SkeletonCard } from "@/components/SkeletonCard";
import { SyncBadge } from "@/components/SyncBadge";
import { RadarScoreChart } from "@/components/charts/RadarScoreChart";

async function fetchOverviewData() {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
  
  return {
    score: 84.2,
    chartData: [
      { subject: 'Coding', A: 88, fullMark: 100 },
      { subject: 'Productivity', A: 92, fullMark: 100 },
      { subject: 'Social', A: 65, fullMark: 100 },
      { subject: 'Career', A: 78, fullMark: 100 },
    ],
    status: 'synced' as const
  };
}

async function UnifiedScoreMatrix() {
  const data = await fetchOverviewData();
  
  return (
    <div className="bento-card col-span-12 xl:col-span-8 flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-glow-emerald rounded-full opacity-20 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-primary text-2xl">analytics</span>
              <h2 className="font-headline-md text-primary">Unified Score Matrix</h2>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-md">
              Your overall footprint normalized across 4 pillars.
            </p>
          </div>
          <SyncBadge status={data.status} />
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
          <div className="flex flex-col items-center justify-center shrink-0 w-48 h-48 rounded-full border-4 border-surface-container-highest shadow-[0_0_40px_rgba(16,185,129,0.15)] relative">
            <div className="absolute inset-0 rounded-full border border-primary/30 animate-[spin_10s_linear_infinite]" />
            <span className="font-headline-xl text-primary text-glow tracking-tighter">
              {data.score}
            </span>
            <span className="font-label-mono text-on-surface-variant">
              OUT OF 100
            </span>
          </div>

          <div className="flex-1 w-full h-full min-h-[250px]">
            <RadarScoreChart data={data.chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-on-surface mb-2">
            Executive Dashboard
          </h1>
          <p className="font-body-lg text-on-surface-variant">
            Live telemetry of your digital footprint.
          </p>
        </div>
        <div className="font-label-mono text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg border border-stroke-glass">
          NODE: 0x882_PRIME
        </div>
      </header>

      <div className="grid grid-cols-12 gap-[var(--spacing-bento-gap)]">
        <Suspense fallback={<SkeletonCard className="col-span-12 xl:col-span-8 min-h-[400px]" />}>
          <UnifiedScoreMatrix />
        </Suspense>

        {/* Static Module: System Status */}
        <div className="bento-card col-span-12 xl:col-span-4 flex flex-col gap-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-glow-violet rounded-full opacity-20 blur-[60px]" />
          <h3 className="font-headline-md text-secondary relative z-10 flex items-center gap-2">
            <span className="material-symbols-outlined">dns</span>
            System Status
          </h3>
          <ul className="flex flex-col gap-4 relative z-10 flex-1 justify-center">
            <li className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-stroke-glass">
              <span className="font-label-mono text-on-surface">GH_INTEGRATION</span>
              <span className="font-label-mono text-emerald-400">NOMINAL</span>
            </li>
            <li className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-stroke-glass">
              <span className="font-label-mono text-on-surface">LI_SCRAPER</span>
              <span className="font-label-mono text-emerald-400">NOMINAL</span>
            </li>
            <li className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-stroke-glass">
              <span className="font-label-mono text-on-surface">LC_GRAPHQL</span>
              <span className="font-label-mono text-amber-400">DELAYED</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
