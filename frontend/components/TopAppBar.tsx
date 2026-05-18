"use client";

export function TopAppBar() {
  return (
    <header className="flex justify-between items-center w-full px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)] py-4 border-b border-stroke-glass bg-[rgba(20,24,34,0.45)] backdrop-blur-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.5)] sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <span
          className="material-symbols-outlined text-primary text-[28px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          emergency
        </span>
        <span className="font-headline-md font-bold text-on-surface tracking-tight">
          NexusBoard
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="w-10 h-10 rounded-full border border-stroke-glass flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all bg-surface-card shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </header>
  );
}
