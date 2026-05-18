import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  glow?: "emerald" | "violet" | "none";
  glowPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function BentoCard({
  children,
  className = "",
  glow = "none",
  glowPosition = "top-right",
}: BentoCardProps) {
  const glowColorMap = {
    emerald: "bg-glow-emerald",
    violet: "bg-glow-violet",
    none: "",
  };

  const glowPositionMap = {
    "top-left": "-top-32 -left-32",
    "top-right": "-top-32 -right-32",
    "bottom-left": "-bottom-16 -left-16",
    "bottom-right": "-bottom-16 -right-16",
  };

  return (
    <div
      className={`bento-card group transition-all duration-300 hover:border-on-surface-variant/10 ${className}`}
    >
      {glow !== "none" && (
        <div
          className={`absolute ${glowPositionMap[glowPosition]} w-96 h-96 ${glowColorMap[glow]} rounded-full blur-[80px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
