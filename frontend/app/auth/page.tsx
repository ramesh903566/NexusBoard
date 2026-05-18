"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";

export default function AuthPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulatedLogin = async (isNewUser: boolean) => {
    setIsLoading(true);
    try {
      // Create x-www-form-urlencoded payload as required by OAuth2PasswordRequestForm
      const formData = new URLSearchParams();
      formData.append('username', isNewUser ? 'newuser' : 'existinguser');
      formData.append('password', 'dummy_password'); // Simulated

      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString()
      });

      if (!res.ok) {
        throw new Error(`Login failed: ${res.status}`);
      }

      const data = await res.json();
      login(data.access_token, data.is_new_user);
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="bento-card max-w-md w-full relative overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-glow-emerald rounded-full opacity-20 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface/80 border border-stroke-glass flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <span className="material-symbols-outlined text-4xl text-primary neon-glow">emergency</span>
          </div>
          
          <h1 className="font-headline-xl text-primary mb-2">NexusBoard</h1>
          <p className="font-body text-secondary mb-8">Unified Personal Analytics Engine</p>
          
          <div className="w-full space-y-4">
            <button 
              onClick={() => handleSimulatedLogin(false)}
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-surface/50 border border-stroke-glass text-primary font-label-mono hover:bg-surface transition-colors flex items-center justify-center gap-3 group"
            >
              <span className="material-symbols-outlined text-emerald-400 group-hover:text-emerald-300">login</span>
              {isLoading ? "Authenticating..." : "Login as Existing User"}
            </button>
            
            <button 
              onClick={() => handleSimulatedLogin(true)}
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-surface/50 border border-stroke-glass text-primary font-label-mono hover:bg-surface transition-colors flex items-center justify-center gap-3 group"
            >
              <span className="material-symbols-outlined text-violet-400 group-hover:text-violet-300">person_add</span>
              {isLoading ? "Provisioning..." : "Simulate New User Signup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
