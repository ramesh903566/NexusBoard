import React, { Suspense } from "react";
import { SkeletonCard } from "@/components/SkeletonCard";
import { SyncBadge } from "@/components/SyncBadge";
import { CareerChart } from "@/components/charts/CareerChart";

async function fetchCareerMetrics() {
  const res = await fetch("http://127.0.0.1:8000/api/v1/career/pipeline", {
    cache: "no-store",
    headers: { "Content-Type": "application/json" }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch career metrics: ${res.status}`);
  }
  return res.json();
}

async function CareerPipeline() {
  const data = await fetchCareerMetrics();
  
  return (
    <div className="bento-card col-span-12 xl:col-span-8 flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-glow-blue rounded-full opacity-10 blur-[100px] pointer-events-none" />
      
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-blue-400 text-2xl">work</span>
            <h2 className="font-headline-md text-blue-400">Application Pipeline</h2>
          </div>
          <p className="font-body-md text-on-surface-variant max-w-md">
            Outbound velocity versus inbound recruiter engagement.
          </p>
        </div>
        <SyncBadge status="synced" />
      </div>

      <div className="flex items-baseline gap-4 mt-2">
        <span className="font-headline-xl text-on-surface">198</span>
        <span className="font-label-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
          Total Profile Views (7d)
        </span>
      </div>

      <div className="h-72 mt-4 relative w-full">
        <CareerChart data={data} />
      </div>
    </div>
  );
}

export default function CareerPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="mb-4">
        <h1 className="font-headline-lg text-on-surface mb-2">
          Career Hub
        </h1>
        <p className="font-body-lg text-on-surface-variant">
          Professional distribution, application velocity, and profile strength.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-[var(--spacing-bento-gap)]">
        <Suspense fallback={<SkeletonCard className="col-span-12 xl:col-span-8 min-h-[400px]" />}>
          <CareerPipeline />
        </Suspense>

        <div className="bento-card col-span-12 xl:col-span-4 flex flex-col gap-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-glow-amber rounded-full opacity-20 blur-[60px]" />
          <h3 className="font-headline-md text-amber-400 relative z-10">
            Active Processes
          </h3>
          <ul className="flex flex-col gap-4 relative z-10">
            <li className="flex flex-col gap-2 p-4 bg-surface-container rounded-xl border border-stroke-glass">
              <div className="flex justify-between items-center">
                <span className="font-label-mono text-on-surface-variant">GOOGLE (SWE III)</span>
                <span className="font-label-mono text-blue-400">ON-SITE</span>
              </div>
              <p className="font-body-sm text-on-surface line-clamp-2">
                "System Design round scheduled for next Thursday."
              </p>
            </li>
            <li className="flex flex-col gap-2 p-4 bg-surface-container rounded-xl border border-stroke-glass">
              <div className="flex justify-between items-center">
                <span className="font-label-mono text-on-surface-variant">STRIPE (BACKEND)</span>
                <span className="font-label-mono text-amber-400">PHONE SCREEN</span>
              </div>
              <p className="font-body-sm text-on-surface line-clamp-2">
                "Waiting on recruiter outreach for availability."
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
