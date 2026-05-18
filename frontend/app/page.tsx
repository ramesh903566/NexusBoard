import React from 'react';
import TopNavigation from '@/components/TopNavigation';
import HeroCanvas from '@/components/HeroCanvas';
import HudStatusPanels from '@/components/HudStatusPanels';
import DataLandscapeBackground from '@/components/DataLandscapeBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-terminal-void flex flex-col">
      {/* Layer 1: Asynchronous Isometric 3D Data Mesh Engine */}
      <DataLandscapeBackground />

      {/* Layer 2: Vignette Masking Boundary to Preserve Readability */}
      <div className="absolute inset-0 z-5 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(3,5,8,0.0)_0%,rgba(3,5,8,0.95)_80%)]" />

      {/* Layer 3: System Status HUD Metrics Arrays */}
      <HudStatusPanels />

      {/* Layer 4: Interactive Viewport Layer */}
      <TopNavigation />
      <HeroCanvas />
    </main>
  );
}
