export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bento-card overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-surface-variant/10 to-transparent z-10" />
      <div className="p-8 h-full flex flex-col gap-4">
        <div className="w-1/3 h-6 bg-surface-variant/30 rounded-md" />
        <div className="w-1/2 h-10 bg-surface-variant/30 rounded-md" />
        <div className="flex-1 mt-4 bg-surface-variant/20 rounded-lg" />
      </div>
    </div>
  );
}
