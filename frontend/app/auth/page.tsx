"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { motion } from "framer-motion";

export default function AuthPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleOAuthLogin = async (provider: string) => {
    setLoading(provider);
    try {
      // Simulate OAuth Popup Handshake & Callback
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const formData = new URLSearchParams();
      formData.append("username", "oauth_user");
      formData.append("password", "oauth_secret");

      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Authentication failed");
      }

      const data = await res.json();
      login(data.is_new_user);
    } catch (error) {
      console.error("OAuth error:", error);
      alert(`${provider} Authentication failed.`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glow overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-glow-emerald rounded-full opacity-20 blur-[80px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bento-card bg-surface/80 border border-stroke-glass p-8 flex flex-col items-center shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mb-6 shadow-glow-blue border border-stroke-glass">
            <span className="material-symbols-outlined text-white text-3xl">all_inclusive</span>
          </div>
          
          <h1 className="font-headline-lg text-primary mb-2 text-center">
            Welcome to NexusBoard
          </h1>
          <p className="font-body-md text-secondary text-center mb-8 max-w-xs">
            Connect your identity to begin tracking your cross-platform metrics.
          </p>

          <div className="w-full flex flex-col gap-3">
            <button 
              onClick={() => handleOAuthLogin("Google")}
              disabled={loading !== null}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-surface-container hover:bg-surface border border-stroke-glass rounded-xl font-label-lg text-primary transition-all active:scale-[0.98]"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
              {loading === "Google" ? "Connecting..." : "Continue with Google"}
            </button>

            <button 
              onClick={() => handleOAuthLogin("X")}
              disabled={loading !== null}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-surface-container hover:bg-surface border border-stroke-glass rounded-xl font-label-lg text-primary transition-all active:scale-[0.98]"
            >
              <span className="text-xl font-bold text-white">𝕏</span>
              {loading === "X" ? "Connecting..." : "Continue with X"}
            </button>

            <button 
              onClick={() => handleOAuthLogin("GitHub")}
              disabled={loading !== null}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-surface-container hover:bg-surface border border-stroke-glass rounded-xl font-label-lg text-primary transition-all active:scale-[0.98]"
            >
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-5 h-5 filter invert" />
              {loading === "GitHub" ? "Connecting..." : "Continue with GitHub"}
            </button>
          </div>
          
          <p className="font-label-sm text-secondary text-center mt-6">
            We only request public, read-only permissions.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
