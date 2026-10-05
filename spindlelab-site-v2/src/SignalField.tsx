import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
};

/**
 * Fondo "Señal": una red de nodos a la deriva que se enlazan cuando están
 * cerca, con pulsos de luz que viajan entre ellos. Metáfora de señales que se
 * conectan y se convierten en respuestas — el espíritu del Método Señal.
 * Todo nativo (canvas 2D), sin dependencias ni assets externos.
 */
export default function SignalField({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const LINK_DIST = 150;

    type Node = { x: number; y: number; vx: number; vy: number };
    type Pulse = { a: number; b: number; t: number; speed: number };

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      const count = Math.max(26, Math.min(78, Math.round((width * height) / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.14, 0.14),
        vy: rand(-0.14, 0.14),
      }));
      pulses = [];
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const spawnPulse = () => {
      if (nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (b === a) b = (b + 1) % nodes.length;
      pulses.push({ a, b, t: 0, speed: rand(0.004, 0.009) });
    };

    const drawBg = () => {
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.34,
        0,
        width * 0.5,
        height * 0.34,
        Math.max(width, height) * 0.85
      );
      g.addColorStop(0, '#16221C');
      g.addColorStop(1, '#0B120E');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const frame = () => {
      drawBg();

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(133,171,139,${(1 - d / LINK_DIST) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = 'rgba(190,212,194,0.5)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      pulses = pulses.filter((p) => p.t <= 1 && nodes[p.a] && nodes[p.b]);
      for (const p of pulses) {
        p.t += p.speed;
        const A = nodes[p.a];
        const B = nodes[p.b];
        ctx.strokeStyle = 'rgba(133,171,139,0.16)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        ctx.fillStyle = 'rgba(234,241,234,0.9)';
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let running = true;
    let sinceSpawn = 0;

    const loop = () => {
      frame();
      sinceSpawn += 1;
      if (sinceSpawn > 42 && pulses.length < 6) {
        spawnPulse();
        sinceSpawn = 0;
      }
      if (running) raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) {
      frame();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => resize();
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={className ?? 'absolute inset-0 w-full h-full'} />;
}
