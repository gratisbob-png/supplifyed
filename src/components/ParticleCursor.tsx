'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const COLORS = ['#00E5C4', '#00C48C', '#00E5C480', '#7FFFD4'];

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [dot, setDot] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function handleMouseMove(e: MouseEvent) {
      setDot({ x: e.clientX, y: e.clientY });
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.random() * 3 - 1.5,
          vy: -(0.5 + Math.random() * 2.5),
          life: 0,
          maxLife: 40 + Math.random() * 40,
          size: 1.5 + Math.random() * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }
    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    function tick() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        if (p.life >= p.maxLife) return false;
        const opacity = 1 - p.life / p.maxLife;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = opacity;
        ctx!.fill();
        ctx!.globalAlpha = 1;
        return true;
      });
      frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 8px var(--accent), 0 0 16px rgba(0, 229, 196, 0.25)',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'transform 80ms ease',
          transform: `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
