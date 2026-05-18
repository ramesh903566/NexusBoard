import React, { Suspense } from "react";
import { SkeletonCard } from "@/components/SkeletonCard";
import { SyncBadge } from "@/components/SyncBadge";
import { NetworkGrowthChart } from "@/components/charts/NetworkGrowthChart";

// Simulate network delay for the server component fetch
async function fetchNetworkMetrics() {
  const res = await fetch("http://127.0.0.1:8000/api/v1/dashboard/network", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch network metrics: ${res.status}`);
  }
  
  return res.json();
}

async function NetworkMetrics() {
  const data = await fetchNetworkMetrics();
  
  return (
    <div className="bento-card col-span-12 xl:col-span-8 flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-glow-violet rounded-full opacity-10 blur-[100px] pointer-events-none" />
      
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-secondary text-2xl">account_tree</span>
            <h2 className="font-headline-md text-secondary">Audience Growth</h2>
          </div>
          <p className="font-body-md text-on-surface-variant max-w-md">
            Cross-platform follower expansion vs daily impressions.
          </p>
        </div>
        <SyncBadge status="syncing" />
      </div>

      <div className="flex items-baseline gap-4 mt-2">
        <span className="font-headline-xl text-on-surface">5,212</span>
        <span className="font-label-mono text-violet-400 bg-violet-500/10 px-2 py-1 rounded">
          +92 followers this week
        </span>
      </div>

      <div className="h-64 mt-4 relative w-full">
        <NetworkGrowthChart data={data} />
      </div>
    </div>
  );
}

export default function NetworkPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="mb-4">
        <h1 className="font-headline-lg text-on-surface mb-2">
          Network Hub
        </h1>
        <p className="font-body-lg text-on-surface-variant">
          Social distribution and audience capture metrics.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-[var(--spacing-bento-gap)]">
        <Suspense fallback={<SkeletonCard className="col-span-12 xl:col-span-8 min-h-[400px]" />}>
          <NetworkMetrics />
        </Suspense>

        <div className="bento-card col-span-12 xl:col-span-4 flex flex-col gap-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-glow-emerald rounded-full opacity-20 blur-[60px]" />
          <h3 className="font-headline-md text-primary relative z-10">
            Top Performing Nodes
          </h3>
          <ul className="flex flex-col gap-4 relative z-10">
            <li className="flex flex-col gap-2 p-4 bg-surface-container rounded-xl border border-stroke-glass">
              <div className="flex justify-between items-center">
                <span className="font-label-mono text-on-surface-variant">LINKEDIN_POST</span>
                <span className="font-label-mono text-primary">14.2k VWS</span>
              </div>
              <p className="font-body-sm text-on-surface line-clamp-2">
                "System architecture isn't just drawing boxes. It's understanding state..."
              </p>
            </li>
            <li className="flex flex-col gap-2 p-4 bg-surface-container rounded-xl border border-stroke-glass">
              <div className="flex justify-between items-center">
                <span className="font-label-mono text-on-surface-variant">TWITTER_THREAD</span>
                <span className="font-label-mono text-primary">8.1k IMP</span>
              </div>
              <p className="font-body-sm text-on-surface line-clamp-2">
                "Here's exactly how I set up my Next.js environments for production..."
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
