import React from 'react';

export default function HudStatusPanels() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none font-mono text-[9px] tracking-widest text-terminal-slate">
      
      {/* Center-Top: System Diagnostics Console */}
      <div className="absolute top-[18%] left-[53%] flex flex-col gap-1.5 hidden md:flex">
        <div className="flex items-center gap-2">
          <span className="text-terminal-orange text-[11px]">┌ ┐</span>
          <span className="text-[8px] text-terminal-slate">SYSTEM STATUS</span>
        </div>
        <div className="text-terminal-orange font-bold pl-4">ALL SYSTEMS OPERATIONAL</div>
        <div className="flex gap-1 pl-4 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-orange shadow-[0_0_6px_#FF4C00]" />
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-orange shadow-[0_0_6px_#FF4C00]" />
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-orange shadow-[0_0_6px_#FF4C00]" />
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-orange animate-pulse" />
        </div>
      </div>

      {/* Bottom-Center: Live Refresh Ingress Sync Indicator */}
      <div className="absolute bottom-[22%] left-[53%] flex flex-col gap-1 hidden md:flex">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 bg-terminal-orange" />
          <span>SYNC STATUS</span>
        </div>
        <div className="text-terminal-orange font-bold pl-3 animate-pulse">REAL-TIME</div>
      </div>

      {/* Bottom-Right: Cryptographic Perimeter Status */}
      <div className="absolute bottom-[36%] right-[8%] flex flex-col gap-1 text-right hidden lg:flex">
        <div className="text-terminal-slate">DATA FLOW</div>
        <div className="text-terminal-orange font-bold uppercase tracking-wide">ENCRYPTED</div>
        <div className="flex justify-end gap-0.5 pt-0.5">
          <span className="w-2 h-1 bg-terminal-orange" />
          <span className="w-1 h-1 bg-terminal-orange" />
          <span className="w-3 h-1 bg-terminal-orange/40" />
        </div>
      </div>

    </div>
  );
}
