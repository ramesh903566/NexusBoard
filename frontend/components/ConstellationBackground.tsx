'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
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
    const PARTICLE_COUNT = 80;
    const MAX_DISTANCE = 120; // Distance threshold for drawing lines
    const NODE_COLOR = 'rgba(255, 76, 0, 0.8)'; // Vibrant Amber/Orange
    const LINE_COLOR = '255, 76, 0'; // RGB format for dynamic alpha fading

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6, // Subtle, organic horizontal velocity
          vy: (Math.random() - 0.5) * 0.6, // Subtle, organic vertical velocity
          radius: Math.random() * 2 + 1,    // Varied data node sizes
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and Draw Data Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce context handling at viewport boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = NODE_COLOR;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 76, 0, 0.5)';
        ctx.fill();
      }
      ctx.shadowBlur = 0; // Reset shadow blur immediately for line draw performance

      // 2. Vector Relationship Processing (Drawing the Plexus Webs)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Draw connection line if particles are closer than the distance threshold
          if (distance < MAX_DISTANCE) {
            // Linear alpha scaling: closer particles create brighter lines
            const alpha = (1 - distance / MAX_DISTANCE) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
            ctx.lineWidth = 0.8;
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
