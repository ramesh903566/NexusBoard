'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // For faux-3D depth and parallax
  vx: number;
  vy: number;
  radius: number;
  isNode: boolean;
}

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Core Configuration Tokens matching the image palette
    const PARTICLE_COUNT = 150; // Increased for density
    const MAX_DISTANCE = 150; 
    const NODE_COLOR = 'rgba(255, 90, 0, 0.8)'; // Intense Neon Copper
    const LINE_COLOR = '255, 122, 0'; // Burning Amber for webs

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Bias spawning to the right side of the screen for the "Safe Zone" text layout
        const isRightBiased = Math.random() > 0.3;
        const xPos = isRightBiased 
          ? canvas.width * 0.5 + Math.random() * (canvas.width * 0.5) 
          : Math.random() * canvas.width;
          
        particles.push({
          x: xPos,
          y: Math.random() * canvas.height,
          z: Math.random() * 0.8 + 0.2, // Depth from 0.2 (far, blurry) to 1.0 (near, sharp)
          vx: (Math.random() - 0.5) * 0.15, // Ultra-slow horizontal drift
          vy: -(Math.random() * 0.4 + 0.1), // Antigravity vertical drift (upwards)
          radius: (Math.random() * 2 + 0.5),
          isNode: Math.random() > 0.8, // 20% are core crystal nodes
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and Draw Data Nodes & Fragments
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Parallax physics based on Z-depth (closer objects drift faster)
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;

        // Wrap around vertically to create infinite upward float
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;

        ctx.beginPath();
        // Depth of field blurring (smaller z = farther = blurrier and darker)
        const blurAmount = p.z > 0.7 ? 0 : (1 - p.z) * 5;
        const opacity = p.z * (p.isNode ? 1 : 0.4);
        
        ctx.fillStyle = `rgba(255, 90, 0, ${opacity})`;
        
        if (p.isNode) {
          // Draw a sharper, glowing crystal node
          ctx.arc(p.x, p.y, p.radius * 1.5 * p.z, 0, Math.PI * 2);
          ctx.shadowBlur = 15 * p.z;
          ctx.shadowColor = 'rgba(255, 90, 0, 0.8)';
        } else {
          // Draw standard ambient motes/fragments
          ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
          ctx.shadowBlur = blurAmount;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Subtle occlusion shadow
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
      }

      // 2. Vector Relationship Processing (Drawing the Antigravity Plexus Webs)
      for (let i = 0; i < particles.length; i++) {
        // Optimization: Only draw webs from core nodes to save performance
        if (!particles[i].isNode) continue;
        
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          // Only connect elements roughly on the same Z-plane
          if (Math.abs(p1.z - p2.z) > 0.3) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Draw connection line if particles are closer than the distance threshold
          if (distance < MAX_DISTANCE * p1.z) {
            // Linear alpha scaling: closer particles create brighter lines
            const alpha = (1 - distance / (MAX_DISTANCE * p1.z)) * 0.25 * p1.z;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            
            // Add a subtle circuit-board stepping effect randomly
            if (Math.random() > 0.95) {
              ctx.lineTo(p1.x, p2.y);
            }
            
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
            ctx.lineWidth = 1 * p1.z;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initialize environment listeners
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    // Clean execution contexts on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 bg-[#04060A] block pointer-events-none"
    />
  );
}
