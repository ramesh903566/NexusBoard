"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
type SyncState = "unlinked" | "syncing" | "active" | "failed";

interface Platform {
  id: string;
  name: string;
  logoUrl: string | React.ReactNode;
  state: SyncState;
  stat?: string;
  isHandleBased?: boolean; // e.g. LeetCode
  color: string;
}

const INITIAL_PLATFORMS: Platform[] = [
  { id: "github", name: "GitHub", logoUrl: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", state: "unlinked", color: "blue" },
  { id: "linkedin", name: "LinkedIn", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png", state: "unlinked", color: "blue" },
  { id: "x", name: "X (Twitter)", logoUrl: <span className="text-2xl font-bold text-white">𝕏</span>, state: "unlinked", color: "gray" },
  { id: "instagram", name: "Instagram", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg", state: "unlinked", color: "pink" },
  { id: "leetcode", name: "LeetCode", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png", state: "unlinked", isHandleBased: true, color: "amber" },
];

export default function SettingsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>(INITIAL_PLATFORMS);
  const [selectedHandlePlatform, setSelectedHandlePlatform] = useState<Platform | null>(null);
  const [handleInput, setHandleInput] = useState("");

  const handleConnectClick = async (platform: Platform) => {
    if (platform.isHandleBased) {
      setSelectedHandlePlatform(platform);
      return;
    }

    // Path A: The Direct OAuth Pop-Up
    updatePlatformState(platform.id, "syncing");
    
    // Simulate Native Pop-up authorization -> closes -> triggers sync
    await new Promise(r => setTimeout(r, 2000));
    
    // Transition to Active State with fetched public data
    updatePlatformState(platform.id, "active", "1.2k Connected");
  };

  const handleLinkHandle = async () => {
    if (!selectedHandlePlatform || !handleInput) return;
    
    setSelectedHandlePlatform(null);
    updatePlatformState(selectedHandlePlatform.id, "syncing");
    
    // Simulate GraphQL public handle check
    await new Promise(r => setTimeout(r, 1500));
    
    updatePlatformState(selectedHandlePlatform.id, "active", `User: ${handleInput}`);
    setHandleInput("");
  };

  const updatePlatformState = (id: string, newState: SyncState, stat?: string) => {
    setPlatforms(prev => prev.map(p => 
      p.id === id ? { ...p, state: newState, stat: stat || p.stat } : p
    ));
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <header>
        <h1 className="font-headline-lg text-on-surface mb-2">
          Integrations Hub
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          Connect your platforms with one tap. We only request safe, public scopes to build your analytics dashboard.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-bento-gap)]">
        {platforms.map((platform) => (
          <div key={platform.id} className="bento-card border border-stroke-glass p-6 flex flex-col justify-between items-center relative overflow-hidden h-48">
            {platform.state === "active" && (
              <div className={`absolute top-0 right-0 w-32 h-32 bg-glow-${platform.color} rounded-full opacity-20 blur-[60px] pointer-events-none`} />
            )}

            <div className="flex w-full justify-between items-start z-10">
              <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center p-2">
                {typeof platform.logoUrl === "string" ? (
                  <img src={platform.logoUrl} alt={platform.name} className={`w-8 h-8 object-contain ${platform.id === 'github' || platform.id === 'leetcode' ? 'filter invert' : ''}`} />
                ) : (
                  platform.logoUrl
                )}
              </div>
              
              {platform.state === "unlinked" && (
                <span className="w-2 h-2 rounded-full bg-on-surface-variant/30" />
              )}
              {platform.state === "syncing" && (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent"
                />
              )}
              {platform.state === "active" && (
                <span className="material-symbols-outlined text-emerald-400 text-xl">check_circle</span>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 mt-4 z-10 w-full">
              <h3 className="font-headline-sm text-on-surface">{platform.name}</h3>
              
              {platform.state === "unlinked" && (
                <button 
                  onClick={() => handleConnectClick(platform)}
                  className="px-4 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 font-label-md hover:bg-blue-500/20 transition-colors mt-2"
                >
                  + Connect
                </button>
              )}

              {platform.state === "syncing" && (
                <span className="font-label-md text-emerald-400 animate-pulse mt-2">
                  Syncing...
                </span>
              )}

              {platform.state === "active" && (
                <span className={`font-label-lg text-${platform.color}-400 mt-2`}>
                  {platform.stat}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedHandlePlatform && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bento-card border border-stroke-glass w-full max-w-sm p-6 flex flex-col gap-4 shadow-2xl"
            >
              <h2 className="font-headline-md text-on-surface">Link {selectedHandlePlatform.name}</h2>
              <p className="font-body-sm text-on-surface-variant">
                Enter your public handle. No passwords required.
              </p>
              
              <input 
                type="text"
                autoFocus
                placeholder="e.g. dev_bunny"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLinkHandle()}
                className="w-full bg-surface-container border border-stroke-glass rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-amber-500 transition-colors"
              />
              
              <div className="flex gap-3 justify-end mt-2">
                <button 
                  onClick={() => setSelectedHandlePlatform(null)}
                  className="px-4 py-2 font-label-md text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLinkHandle}
                  disabled={!handleInput}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-background rounded-lg font-label-md transition-colors disabled:opacity-50"
                >
                  Link Handle
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
