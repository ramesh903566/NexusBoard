import { BentoCard } from "@/components/BentoCard";
import { networkData } from "@/lib/mock-data";

const data = networkData;

const statusColors: Record<string, { dot: string; text: string }> = {
  syncing: { dot: "bg-secondary-fixed shadow-[0_0_8px_rgba(208,188,255,0.6)]", text: "text-secondary-fixed" },
  stable: { dot: "bg-primary shadow-[0_0_8px_rgba(78,222,163,0.6)]", text: "text-primary" },
  offline: { dot: "bg-outline", text: "text-on-surface-variant" },
};

export default function NetworkPage() {
  return (
    <div className="p-[var(--spacing-margin-mobile)] md:p-[var(--spacing-margin-desktop)]">
      <div className="mb-8">
        <h1 className="font-headline-xl text-on-surface mb-2">Team Workspace</h1>
        <p className="font-body-md text-on-surface-variant max-w-2xl">Manage collaborative nodes, track real-time connections, and oversee network topography across deployed modules.</p>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-[var(--spacing-bento-gap)]">
        {/* Hero Network Visualizer */}
        <BentoCard className="col-span-4 md:col-span-8 lg:col-span-9 flex flex-col min-h-[400px]" glow="violet">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="font-label-mono text-secondary tracking-widest uppercase mb-1 block opacity-80">Live Topography</span>
              <h3 className="font-headline-md text-on-surface">Active Cluster</h3>
            </div>
            <span className="px-3 py-1 bg-secondary-container/20 text-secondary-fixed border border-secondary-container/30 rounded-full font-label-caps flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(208,188,255,0.8)] animate-pulse" />
              Syncing
            </span>
          </div>
          <div className="flex-1 relative w-full rounded-xl border border-stroke-glass bg-background/50 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <line x1="200" y1="150" x2="80" y2="70" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="200" y1="150" x2="320" y2="60" stroke="rgba(139,92,246,0.4)" strokeWidth="2" />
              <line x1="200" y1="150" x2="300" y2="230" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
              <line x1="200" y1="150" x2="100" y2="240" stroke="rgba(139,92,246,0.5)" strokeWidth="2" />
              {/* Center node */}
              <circle cx="200" cy="150" r="20" fill="#101319" stroke="#8b5cf6" strokeWidth="2.5" />
              <text x="200" y="155" textAnchor="middle" fill="#d0bcff" fontSize="10" fontFamily="JetBrains Mono">HUB</text>
              {/* Satellites */}
              <circle cx="80" cy="70" r="12" fill="#101319" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />
              <circle cx="320" cy="60" r="14" fill="#101319" stroke="rgba(139,92,246,0.8)" strokeWidth="2" />
              <circle cx="300" cy="230" r="8" fill="rgba(139,92,246,0.4)" />
              <circle cx="100" cy="240" r="16" fill="#101319" stroke="#8b5cf6" strokeWidth="2" />
            </svg>
          </div>
        </BentoCard>

        {/* Project Nodes + CTA */}
        <div className="col-span-4 md:col-span-4 lg:col-span-3 flex flex-col gap-[var(--spacing-bento-gap)]">
          <BentoCard className="flex-1">
            <span className="font-label-mono text-on-surface-variant tracking-widest uppercase mb-4 block">Project Nodes</span>
            <div className="space-y-4">
              {data.clusters.map((cluster) => {
                const colors = statusColors[cluster.status] || statusColors.offline;
                return (
                  <div key={cluster.name} className={`flex items-center justify-between p-3 rounded-xl bg-background/40 border border-stroke-glass hover:bg-background/80 transition-colors cursor-pointer group ${cluster.status === "offline" ? "opacity-60" : ""}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      <div>
                        <h4 className="font-body-md text-on-surface">{cluster.name}</h4>
                        <p className="font-label-caps text-on-surface-variant capitalize">
                          {cluster.status === "syncing" ? `${cluster.links} Active Links` : cluster.status}
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">chevron_right</span>
                  </div>
                );
              })}
            </div>
          </BentoCard>

          <button className="w-full p-4 rounded-xl bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container font-body-md font-semibold transition-all shadow-[0_4px_16px_rgba(87,27,193,0.3)] flex items-center justify-center gap-2 border border-secondary/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <span className="material-symbols-outlined">add_link</span>
            Initialize Node
          </button>
        </div>
      </div>
    </div>
  );
}
