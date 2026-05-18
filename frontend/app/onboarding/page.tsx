"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function OnboardingPage() {
  const router = useRouter();
  
  const completeOnboarding = () => {
    // Clear new user flag and route to dashboard
    Cookies.remove('is_new_user');
    router.replace('/dashboard/overview');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="bento-card max-w-2xl w-full relative overflow-hidden p-12">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-glow-violet rounded-full opacity-20 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="font-headline-xl text-primary mb-4">Initialization Sequence</h1>
          <p className="font-body text-secondary mb-8 text-lg">
            Welcome to NexusBoard. Before deploying your personalized metrics matrix, we need to calibrate your data streams.
          </p>
          
          <div className="space-y-4 mb-12">
            {[
              { id: 1, text: "Configure GitHub webhook listener", active: true },
              { id: 2, text: "Authenticate LinkedIn OAuth payload", active: false },
              { id: 3, text: "Establish LeetCode GraphQL bridge", active: false }
            ].map(step => (
              <div key={step.id} className="flex items-center gap-4 p-4 rounded-xl border border-stroke-glass bg-surface/30">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-mono ${step.active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-surface/50 text-tertiary'}`}>
                  {step.id}
                </div>
                <span className={`font-body ${step.active ? 'text-primary' : 'text-secondary'}`}>{step.text}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={completeOnboarding}
              className="px-8 py-4 rounded-xl bg-primary text-surface font-label-caps hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Skip & Initialize Matrix
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
