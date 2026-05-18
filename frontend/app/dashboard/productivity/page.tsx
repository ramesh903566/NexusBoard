import React, { Suspense } from "react";
import { SkeletonCard } from "@/components/SkeletonCard";
import { SyncBadge } from "@/components/SyncBadge";
import { ProductivityChart } from "@/components/charts/ProductivityChart";

// Simulate network delay for the server component fetch
async function fetchProductivityMetrics() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return [
    { date: "May 1", hours: 4.5 },
    { date: "May 2", hours: 6.2 },
    { date: "May 3", hours: 5.8 },
    { date: "May 4", hours: 7.1 },
    { date: "May 5", hours: 3.5 },
    { date: "May 6", hours: 8.4 },
    { date: "May 7", hours: 6.9 },
  ];
}

async function ProductivityMetrics() {
  const data = await fetchProductivityMetrics();
  
  return (
    <div className="bento-card col-span-12 xl:col-span-8 flex flex-col gap-6 relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
            <h2 className="font-headline-md text-primary">Deep Work Velocity</h2>
          </div>
          <p className="font-body-md text-on-surface-variant max-w-md">
            Focus blocks normalized across 7 days.
          </p>
        </div>
        <SyncBadge status="synced" />
      </div>

      <div className="flex items-baseline gap-4 mt-2">
        <span className="font-headline-xl text-on-surface">42.4</span>
        <span className="font-label-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
          +12.5% vs last week
        </span>
      </div>

      <div className="h-64 mt-4 relative w-full">
        <ProductivityChart data={data} />
      </div>
    </div>
  );
}

export default function ProductivityPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="mb-4">
        <h1 className="font-headline-lg text-on-surface mb-2">
          Productivity Module
        </h1>
        <p className="font-body-lg text-on-surface-variant">
          Output variables and focus block analytics.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-[var(--spacing-bento-gap)]">
        {/* Suspense boundary for segmented data ingestion */}
        <Suspense fallback={<SkeletonCard className="col-span-12 xl:col-span-8 min-h-[400px]" />}>
          <ProductivityMetrics />
        </Suspense>

        <div className="bento-card col-span-12 xl:col-span-4 flex flex-col gap-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-glow-violet rounded-full opacity-20 blur-[60px]" />
          <h3 className="font-headline-md text-secondary relative z-10">
            Active Habits
          </h3>
          <ul className="flex flex-col gap-4 relative z-10">
            <li className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-stroke-glass">
              <span className="font-body-md text-on-surface">Morning Review</span>
              <span className="material-symbols-outlined text-primary">check_circle</span>
            </li>
            <li className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-stroke-glass">
              <span className="font-body-md text-on-surface">Inbox Zero</span>
              <span className="material-symbols-outlined text-on-surface-variant">radio_button_unchecked</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
