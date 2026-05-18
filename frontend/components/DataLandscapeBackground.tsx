'use client';

import React, { useEffect, useRef } from 'react';

interface DataNode {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  targetX: number;
  targetY: number;
  speed: number;
  pulse: number;
  size: number;
}

interface HudLine {
  y: number;
  width: number;
  speed: number;
  opacity: number;
}

export default function DataLandscapeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let nodes: DataNode[] = [];
    let hudLines: HudLine[] = [];

    // System Design Tokens matching the uploaded image asset
    const NODE_COUNT = 120;
    const FOCAL_LENGTH = 400;
    const COPPER_ORANGE = '255, 90, 0';
    const SLATE_BLUE = '148, 163, 184';
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSystem();
    };

    const initSystem = () => {
      nodes = [];
      // Generate structured clusters rather than pure random spreads to match the image terrain
      for (let i = 0; i < NODE_COUNT; i++) {
        const isCluster = Math.random() > 0.3;
        // Centralized clusters vs outlying trace nodes
        const rangeX = isCluster ? 250 : canvas.width * 0.8;
        const rangeY = isCluster ? 200 : canvas.height * 0.8;
        const offsetX = isCluster ? canvas.width * 0.55 : 0;
        const offsetY = isCluster ? canvas.height * 0.45 : 0;

        const x = (Math.random() - 0.5) * rangeX + offsetX;
        const y = (Math.random() - 0.5) * rangeY + offsetY;
        const z = Math.random() * 300 - 150; // Depth coordinate layer

        nodes.push({
          x, y, z,
          baseX: x,
          baseY: y,
          targetX: x + (Math.random() - 0.5) * 20,
          targetY: y + (Math.random() - 0.5) * 20,
          speed: Math.random() * 0.01 + 0.005,
          pulse: Math.random() * Math.PI,
          size: Math.random() * 2.5 + 1
        });
      }

      // Initialize background tracking metrics lines (HUD overlay on the left)
      hudLines = Array.from({ length: 8 }, () => ({
        y: Math.random() * canvas.height,
        width: Math.random() * 80 + 20,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.15 + 0.05
      }));
    };

    const draw = () => {
      // Clear with deep terminal black backdrop
      ctx.fillStyle = '#06080C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Draw Digital Background Grid System (Tilted Angle)
      ctx.strokeStyle = 'rgba(255, 90, 0, 0.02)';
      ctx.lineWidth = 1;
      for (let i = -canvas.width; i < canvas.width; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i + centerX, 0);
        ctx.lineTo(i * 0.5 + centerX, canvas.height);
        ctx.stroke();
      }

      // 2. Compute Node Positions and Render Connections
      const projected: { sx: number; sy: number; sz: number; original: DataNode }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        
        // Organic wandering loop animation
        n.pulse += n.speed;
        const currentX = n.baseX + Math.sin(n.pulse) * (n.targetX - n.baseX);
        const currentY = n.baseY + Math.cos(n.pulse) * (n.targetY - n.baseY);

        // Slow rotation around the vertical Y axis to simulate 3D depth movement
        const rotationAngle = 0.0003;
        const cosAngle = Math.cos(rotationAngle);
        const sinAngle = Math.sin(rotationAngle);
        
        n.baseX = currentX * cosAngle - n.z * sinAngle;
        n.z = n.z * cosAngle + currentX * sinAngle;
        n.baseY = currentY;

        // Apply true 3D Perspective Projection Matrix
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + n.z);
        const sx = centerX + n.baseX * scale;
        const sy = centerY + n.baseY * scale;

        if (sx >= 0 && sx <= canvas.width && sy >= 0 && sy <= canvas.height) {
          projected.push({ sx, sy, sz: n.z, original: n });
        }
      }

      // Draw Connection Circuit Traces based on distance calculations
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Proximity threshold rules for creating the grid lines
          if (distance < 90) {
            const alpha = (1 - distance / 90) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = `rgba(${COPPER_ORANGE}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Render Individual Projected Active Core Nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + p.sz);
        const currentSize = p.original.size * scale;

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, currentSize, 0, Math.PI * 2);
        
        // Emphasize nodes matching your image's distinct glowing center points
        if (p.original.size > 2.8) {
          ctx.fillStyle = `rgba(${COPPER_ORANGE}, 1)`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${COPPER_ORANGE}, 0.8)`;
        } else {
          ctx.fillStyle = `rgba(${SLATE_BLUE}, ${0.3 * scale})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0; // Guard rule: prevent canvas shadow bleeding

      // 3. Render Metric Graphic Sidebars (Left HUD Details)
      for (let i = 0; i < hudLines.length; i++) {
        const line = hudLines[i];
        line.y += line.speed;
        if (line.y > canvas.height) {
          line.y = -10;
          line.width = Math.random() * 80 + 20;
        }

        ctx.fillStyle = `rgba(${SLATE_BLUE}, ${line.opacity})`;
        ctx.fillRect(40, line.y, line.width, 1.5);
        ctx.fillRect(40, line.y + 4, line.width * 0.4, 1);
      }

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 bg-[#06080C] block pointer-events-none"
    />
  );
}
