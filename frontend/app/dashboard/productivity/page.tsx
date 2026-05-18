import { BentoCard } from "@/components/BentoCard";
import { productivityData } from "@/lib/mock-data";

const data = productivityData;

export default function ProductivityPage() {
  return (
    <div className="p-[var(--spacing-margin-mobile)] md:p-[var(--spacing-margin-desktop)]">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-label-mono text-primary uppercase tracking-wider font-semibold">AI/SmartSolution</span>
          </div>
          <h1 className="font-headline-xl text-on-surface">Productivity Dynamics</h1>
        </div>
        <div className="flex bg-surface-container-low border border-stroke-glass rounded-full p-1 backdrop-blur-sm">
          <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-mono transition-colors">Day</button>
          <button className="px-4 py-1.5 rounded-full bg-glow-emerald text-primary font-label-mono font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">Week</button>
          <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-mono transition-colors">Month</button>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-[var(--spacing-bento-gap)]">
        {/* Main Chart */}
        <BentoCard className="col-span-4 md:col-span-8 flex flex-col h-[400px]" glow="emerald">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-headline-md text-on-surface">Efficiency Output</h3>
              <p className="font-body-sm text-on-surface-variant mt-1">Real-time throughput vs historical baseline.</p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-highest border border-stroke-glass rounded-lg px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-mono text-primary">LIVE SYNC</span>
            </div>
          </div>
          <div className="flex-1 relative w-full mt-4">
            <div className="absolute inset-0 bg-gradient-to-t from-glow-emerald to-transparent opacity-30 pointer-events-none rounded-b-lg" />
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,180 C150,150 250,190 400,120 C550,50 650,140 800,80 C900,40 950,20 1000,60 L1000,200 L0,200 Z" fill="url(#lineGlow)" className="opacity-40" />
              <path d="M0,180 C150,150 250,190 400,120 C550,50 650,140 800,80 C900,40 950,20 1000,60" fill="none" stroke="#4edea3" strokeWidth="3" strokeLinecap="round" className="neon-glow" />
              <circle cx="400" cy="120" r="4" fill="#101319" stroke="#4edea3" strokeWidth="2" className="neon-glow" />
              <circle cx="800" cy="80" r="4" fill="#101319" stroke="#4edea3" strokeWidth="2" className="neon-glow" />
              <circle cx="1000" cy="60" r="4" fill="#4edea3" stroke="#fff" strokeWidth="1" />
            </svg>
            <div className="absolute -bottom-6 left-0 w-full flex justify-between font-label-caps text-on-surface-variant/70 px-2">
              {["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d=><span key={d}>{d}</span>)}
            </div>
          </div>
        </BentoCard>

        {/* Side Widgets */}
        <div className="col-span-4 md:col-span-4 flex flex-col gap-[var(--spacing-bento-gap)]">
          <BentoCard className="flex-1 flex flex-col justify-between !p-6" glow="emerald" glowPosition="bottom-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-xl">center_focus_strong</span>
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider">Focus Score</span>
            </div>
            <div>
              <div className="flex items-end gap-2">
                <span className="font-headline-xl font-bold text-on-surface text-glow">{data.focusScore}</span>
                <span className="font-body-md text-primary mb-2">{data.focusDelta}</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full mt-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full bg-primary rounded-full neon-glow" style={{width:`${data.focusScore}%`}} />
              </div>
              <p className="font-label-caps text-on-surface-variant mt-3">Optimum state maintained for {data.focusDuration}.</p>
            </div>
          </BentoCard>

          <BentoCard className="flex-1 flex flex-col justify-between !p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider">Task Completion</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-body-md text-on-surface">Critical Nodes</span>
                <span className="font-label-mono text-primary">{data.tasksCompleted}/{data.tasksTotal}</span>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({length:data.tasksTotal}).map((_,i)=>(
                  <div key={i} className={`h-2 flex-1 rounded-sm ${i<data.tasksCompleted?"bg-primary neon-glow":"bg-surface-container-highest"}`} />
                ))}
              </div>
              <button className="w-full mt-2 py-2 bg-inverse-on-surface hover:bg-surface-variant/80 border border-stroke-glass rounded-lg font-label-mono text-on-surface transition-all flex items-center justify-center gap-2">
                View Sequence log
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </BentoCard>
        </div>

        {/* System Status */}
        <div className="col-span-4 md:col-span-12 bento-card flex items-center justify-between !p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-glow-emerald flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary">memory</span>
            </div>
            <div>
              <h4 className="font-body-md text-on-surface font-medium">System Core {data.systemStatus}</h4>
              <p className="font-body-sm text-on-surface-variant">All predictive algorithms operating within expected parameters.</p>
            </div>
          </div>
          <span className="font-label-mono bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">SYSTEM OK</span>
        </div>
      </div>
    </div>
  );
}
