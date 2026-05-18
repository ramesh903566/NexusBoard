import { BentoCard } from "@/components/BentoCard";
import { dashboardOverview } from "@/lib/mock-data";

const data = dashboardOverview;
const pillars = data.metrics.pillars;

const pillarConfig = [
  {
    key: "developer_intelligence" as const,
    label: "DEVELOPER INTELLIGENCE",
    icon: "code",
    accentClass: "text-primary",
    bgGlow: "bg-primary/10",
  },
  {
    key: "productivity" as const,
    label: "PRODUCTIVITY",
    icon: "auto_awesome",
    accentClass: "text-primary",
    bgGlow: "bg-primary/10",
  },
  {
    key: "social_analytics" as const,
    label: "SOCIAL ANALYTICS",
    icon: "trending_up",
    accentClass: "text-secondary",
    bgGlow: "bg-secondary/10",
  },
  {
    key: "career_analytics" as const,
    label: "CAREER ANALYTICS",
    icon: "work",
    accentClass: "text-tertiary",
    bgGlow: "bg-tertiary/10",
  },
];

export default function DashboardOverviewPage() {
  return (
    <div className="p-[var(--spacing-margin-mobile)] md:p-[var(--spacing-margin-desktop)]">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="font-label-mono text-primary uppercase tracking-wider">
            LIVE DIAGNOSTICS
          </span>
        </div>
        <h1 className="font-headline-xl text-on-surface">Command Center</h1>
        <p className="font-body-md text-on-surface-variant mt-1 max-w-2xl">
          Unified analytics engine. Real-time multi-domain performance synthesis
          across all active integration nodes.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-4 md:grid-cols-12 gap-[var(--spacing-bento-gap)]">
        {/* Core Diagnostic — Large hero card */}
        <BentoCard
          className="col-span-4 md:col-span-5 flex flex-col justify-between min-h-[320px]"
          glow="violet"
        >
          <div>
            <span className="font-label-mono text-on-surface-variant uppercase tracking-widest">
              UNIFIED GROWTH INDEX
            </span>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-[72px] font-bold text-on-surface leading-none tracking-tight text-glow">
                {data.metrics.unified_growth_score}
              </span>
              <span className="font-label-mono text-primary mb-3">
                /100
              </span>
            </div>
          </div>
          <div className="flex gap-6 mt-6">
            <div className="flex flex-col">
              <span className="font-label-caps text-on-surface-variant uppercase">
                Weekly
              </span>
              <span className="font-body-md font-semibold text-primary">
                +{data.metrics.historical_trends.weekly_delta}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-on-surface-variant uppercase">
                Monthly
              </span>
              <span className="font-body-md font-semibold text-primary">
                +{data.metrics.historical_trends.monthly_delta}%
              </span>
            </div>
          </div>
        </BentoCard>

        {/* Pillar Score Cards */}
        <div className="col-span-4 md:col-span-7 grid grid-cols-2 gap-[var(--spacing-bento-gap)]">
          {pillarConfig.map((pillar) => {
            const d = pillars[pillar.key];
            return (
              <BentoCard key={pillar.key} className="flex flex-col justify-between min-h-[148px]">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg ${pillar.bgGlow} flex items-center justify-center border border-stroke-glass`}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${pillar.accentClass}`}
                    >
                      {pillar.icon}
                    </span>
                  </div>
                  <span className="font-label-caps text-on-surface-variant uppercase tracking-wider">
                    {pillar.label}
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-[36px] font-bold text-on-surface leading-none">
                    {d.score}
                  </span>
                  <span className="font-label-mono text-on-surface-variant mb-1">
                    pts
                  </span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-2">
                  {d.primary_metric}
                </p>
              </BentoCard>
            );
          })}
        </div>

        {/* Productivity AI Module */}
        <BentoCard
          className="col-span-4 md:col-span-8 flex flex-col min-h-[220px]"
          glow="emerald"
          glowPosition="top-right"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-headline-md text-on-surface">
                AI Productivity Engine
              </h3>
              <p className="font-body-sm text-on-surface-variant mt-1">
                Deep learning pipeline optimizing your execution cadence in
                real-time.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-highest border border-stroke-glass rounded-lg px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-mono text-primary">ACTIVE</span>
            </div>
          </div>
          {/* Mini chart placeholder */}
          <div className="flex-1 relative rounded-lg bg-background/40 border border-stroke-glass/50 mt-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-glow-emerald to-transparent opacity-30 pointer-events-none" />
            <svg
              viewBox="0 0 800 120"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,100 C100,80 200,90 300,60 C400,30 500,70 600,40 C700,20 750,30 800,25 L800,120 L0,120 Z"
                fill="url(#heroFill)"
              />
              <path
                d="M0,100 C100,80 200,90 300,60 C400,30 500,70 600,40 C700,20 750,30 800,25"
                fill="none"
                stroke="#4edea3"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="neon-glow"
              />
            </svg>
          </div>
        </BentoCard>

        {/* Network Hub Preview */}
        <BentoCard
          className="col-span-4 md:col-span-4 flex flex-col min-h-[220px]"
          glow="violet"
          glowPosition="top-left"
        >
          <span className="font-label-mono text-secondary tracking-widest uppercase mb-2 opacity-80">
            NETWORK TOPOLOGY
          </span>
          <h3 className="font-headline-md text-on-surface mb-4">
            Active Cluster
          </h3>
          <div className="flex-1 relative rounded-lg bg-background/40 border border-stroke-glass/50 overflow-hidden flex items-center justify-center">
            {/* SVG Network Preview */}
            <svg
              viewBox="0 0 200 150"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connection Lines */}
              <line
                x1="100" y1="75" x2="40" y2="35"
                stroke="rgba(139,92,246,0.3)" strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="100" y1="75" x2="160" y2="30"
                stroke="rgba(139,92,246,0.4)" strokeWidth="1.5"
              />
              <line
                x1="100" y1="75" x2="150" y2="115"
                stroke="rgba(139,92,246,0.2)" strokeWidth="1"
              />
              <line
                x1="100" y1="75" x2="50" y2="120"
                stroke="rgba(139,92,246,0.5)" strokeWidth="1.5"
              />
              {/* Center node */}
              <circle cx="100" cy="75" r="10" fill="#101319" stroke="#8b5cf6" strokeWidth="2" />
              {/* Satellites */}
              <circle cx="40" cy="35" r="5" fill="#101319" stroke="rgba(139,92,246,0.6)" strokeWidth="1" />
              <circle cx="160" cy="30" r="6" fill="#101319" stroke="rgba(139,92,246,0.8)" strokeWidth="1.5" />
              <circle cx="150" cy="115" r="4" fill="rgba(139,92,246,0.4)" />
              <circle cx="50" cy="120" r="7" fill="#101319" stroke="#8b5cf6" strokeWidth="2" />
            </svg>
          </div>
        </BentoCard>

        {/* Integration Status Bar */}
        <div className="col-span-4 md:col-span-12 bento-card flex items-center justify-between !p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-glow-emerald flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary">
                memory
              </span>
            </div>
            <div>
              <h4 className="font-body-md text-on-surface font-medium">
                System Core Nominal
              </h4>
              <p className="font-body-sm text-on-surface-variant">
                All integration adapters operating within expected parameters.
                6/6 nodes synced.
              </p>
            </div>
          </div>
          <span className="font-label-mono bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
            SYSTEM OK
          </span>
        </div>
      </div>
    </div>
  );
}
