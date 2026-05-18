export function SyncBadge({ status, lastSynced }: { status: 'syncing' | 'synced' | 'stale' | 'failed', lastSynced?: string }) {
  if (status === 'syncing') {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-stroke-glass">
        <div className="w-2 h-2 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <span className="font-label-mono text-xs text-emerald-400">SYNCING...</span>
      </div>
    );
  }
  
  if (status === 'failed') {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/20 border border-red-500/30">
        <span className="material-symbols-outlined text-[14px] text-red-400">error</span>
        <span className="font-label-mono text-xs text-red-400">SYNC FAILED</span>
      </div>
    );
  }

  if (status === 'stale') {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-stroke-glass cursor-pointer hover:bg-surface-variant transition-colors group">
        <span className="material-symbols-outlined text-[14px] text-amber-400 group-hover:rotate-180 transition-transform duration-500">refresh</span>
        <span className="font-label-mono text-xs text-amber-400">STALE - UPDATE</span>
      </div>
    );
  }

  // default to synced
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-stroke-glass">
      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      <span className="font-label-mono text-xs text-primary">LIVE SYNC</span>
    </div>
  );
}
