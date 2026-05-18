import { BentoCard } from "@/components/BentoCard";
import { settingsData } from "@/lib/mock-data";

const data = settingsData;

export default function SettingsPage() {
  return (
    <div className="p-[var(--spacing-margin-mobile)] md:p-[var(--spacing-margin-desktop)]">
      <header className="mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2 py-1 bg-glow-violet rounded text-secondary font-label-caps tracking-widest border border-secondary/20">MODULE CONFIG</span>
          <span className="text-on-surface-variant font-label-mono">SYS.REQ.009</span>
        </div>
        <h1 className="font-headline-xl text-on-surface">Layout Matrix</h1>
        <p className="font-body-lg text-on-surface-variant mt-2 max-w-2xl">Calibrate interface telemetry and structural behavior. Adjust node density and active module streams for optimal cognitive load.</p>
      </header>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-[var(--spacing-bento-gap)]">
        {/* Active Data Streams */}
        <BentoCard className="col-span-4 md:col-span-8" glow="violet">
          <h2 className="font-label-mono text-on-surface-variant uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">category</span>
            Active Data Streams
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.availableStreams.map((stream) => {
              const isActive = data.activeStreams.includes(stream);
              return (
                <button key={stream} className={`px-5 py-3 rounded-full font-label-mono text-[13px] uppercase tracking-wider flex items-center gap-2 transition-all ${isActive ? "bg-glow-violet border border-secondary/40 text-secondary shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:bg-secondary/20" : "bg-surface-container border border-stroke-glass text-on-surface-variant hover:border-on-surface-variant/30 hover:text-on-surface"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-secondary shadow-[0_0_8px_#8b5cf6]" : "bg-surface-variant"}`} />
                  {stream}
                </button>
              );
            })}
          </div>
        </BentoCard>

        {/* Grid Calibration */}
        <BentoCard className="col-span-4 md:col-span-4 flex flex-col justify-between">
          <h2 className="font-label-mono text-on-surface-variant uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">linear_scale</span>
            Grid Calibration
          </h2>
          <div className="space-y-8">
            {Object.entries(data.gridCalibration).map(([key, cfg]) => {
              const pct = (cfg.value / cfg.max) * 100;
              const label = key === "nodeSpacing" ? "Node Spacing" : "Surface Curvature";
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-body-sm text-on-surface">{label}</span>
                    <span className="font-label-mono text-[10px] text-secondary">{cfg.value}{cfg.unit}</span>
                  </div>
                  <div className="h-1.5 w-full bg-background rounded-full relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 h-full bg-secondary/30 rounded-full" style={{width:`${pct}%`}} />
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)] cursor-pointer hover:scale-125 transition-transform border-2 border-background" style={{left:`${pct}%`}} />
                  </div>
                </div>
              );
            })}
          </div>
        </BentoCard>

        {/* Anchor Topology Preview */}
        <BentoCard className="col-span-4 md:col-span-12">
          <h2 className="font-label-mono text-on-surface-variant uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">hub</span>
            Anchor Topology Preview
          </h2>
          <div className="w-full h-[240px] md:h-[320px] bg-[#05070A] rounded-lg border border-stroke-glass/50 shadow-[inset_0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-center justify-center" style={{backgroundImage:"linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize:"24px 24px"}}>
            {/* Center reticle */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-[1px] h-full bg-secondary/20" />
              <div className="h-[1px] w-full bg-secondary/20 absolute" />
              <div className="w-32 h-32 rounded-full border border-secondary/20 absolute" />
            </div>
            {/* Core anchor */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-4 h-4 bg-secondary rounded-full shadow-[0_0_20px_#8b5cf6,0_0_40px_#8b5cf6] border-2 border-background animate-pulse" />
              <span className="font-label-mono text-[9px] text-secondary tracking-widest bg-background/80 px-2 py-0.5 rounded border border-secondary/20">CORE_ANCHOR</span>
            </div>
            {/* Satellite dots */}
            <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-secondary/60 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            <div className="absolute bottom-[30%] right-[25%] w-2.5 h-2.5 bg-secondary/80 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
            <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 bg-secondary/40 rounded-full" />
            <div className="absolute bottom-[20%] left-[30%] w-2 h-2 bg-secondary/50 rounded-full" />
          </div>
        </BentoCard>

        {/* Generate CTA */}
        <div className="col-span-4 md:col-span-12 mt-4">
          <button className="w-full md:w-auto md:min-w-[320px] mx-auto block py-4 px-8 rounded-xl bg-background border border-stroke-glass font-label-mono text-[14px] text-on-surface uppercase tracking-[0.2em] relative overflow-hidden group transition-all duration-300 hover:border-secondary/60 hover:bg-[#111622] hover:text-white shadow-lg">
            <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-[18px]">manufacturing</span>
              Generate Custom
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
