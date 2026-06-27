"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";

// Types
interface ParticleType {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  direction: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleOffset: number;
  update: (canvas: HTMLCanvasElement) => void;
  draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, colors: Colors) => void;
}

interface Colors {
  primary: string;
  secondary: string;
  glow: string;
  particle: string;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const particlesRef = useRef<ParticleType[]>([]);
  const mousePosition = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const isDarkModeRef = useRef<boolean>(false);
  const canvasSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  const throttleTimerRef = useRef<number | null>(null);

  // Memoize colors based on theme
  const getColors = useCallback((isDark: boolean): Colors => {
    return {
      primary: isDark ? "147, 197, 253" : "99, 102, 241",
      secondary: isDark ? "167, 139, 250" : "139, 92, 246",
      glow: isDark ? "147, 197, 253" : "99, 102, 241",
      particle: isDark ? "147, 197, 253" : "99, 102, 241",
    };
  }, []);

  // Check dark mode efficiently with MutationObserver
  useEffect(() => {
    const checkDarkMode = () => {
      isDarkModeRef.current = document.documentElement.classList.contains("dark");
    };

    checkDarkMode();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Particle class with optimized methods
  class Particle implements ParticleType {
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
    direction: number;
    wobble: number;
    wobbleSpeed: number;
    wobbleOffset: number;
    private updateCounter: number = 0;

    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.length = Math.random() * 60 + 20;
      this.speed = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.3 + 0.1;
      this.direction = Math.random() * Math.PI * 2;
      this.wobble = Math.random() * 0.02;
      this.wobbleSpeed = Math.random() * 0.02;
      this.wobbleOffset = Math.random() * Math.PI * 2;
    }

    update(canvas: HTMLCanvasElement): void {
      this.updateCounter++;

      // Only update direction every few frames for performance
      if (this.updateCounter % 3 === 0) {
        this.direction += Math.sin(Date.now() * this.wobbleSpeed + this.wobbleOffset) * this.wobble;
      }

      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;

      // Wrap around screen with buffer
      const buffer = 100;
      if (this.x < -buffer) this.x = canvas.width + buffer;
      if (this.x > canvas.width + buffer) this.x = -buffer;
      if (this.y < -buffer) this.y = canvas.height + buffer;
      if (this.y > canvas.height + buffer) this.y = -buffer;
    }

    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, colors: Colors): void {
      const isDark = isDarkModeRef.current;

      // Main particle line with gradient
      const endX = this.x + Math.cos(this.direction) * this.length;
      const endY = this.y + Math.sin(this.direction) * this.length;

      const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
      gradient.addColorStop(0, `rgba(${colors.primary}, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(${colors.primary}, 0)`);

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.random() * 1.5 + 0.5;
      ctx.stroke();

      // Glow effect - more subtle in light mode
      if (isDark) {
        ctx.shadowColor = `rgba(${colors.glow}, 0.15)`;
        ctx.shadowBlur = 15;
      } else {
        ctx.shadowColor = `rgba(${colors.glow}, 0.08)`;
        ctx.shadowBlur = 8;
      }

      // Draw glowing dot at the start of each particle
      const dotGradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        4
      );

      const dotOpacity = isDark ? this.opacity * 1.5 : this.opacity * 0.8;
      dotGradient.addColorStop(0, `rgba(${colors.primary}, ${dotOpacity})`);
      dotGradient.addColorStop(1, `rgba(${colors.primary}, 0)`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = dotGradient;
      ctx.fill();

      ctx.shadowBlur = 0;
    }
  }

  // Resize canvas with debouncing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Only resize if dimensions actually changed
    if (
      canvas.width === rect.width * dpr &&
      canvas.height === rect.height * dpr
    ) {
      return;
    }

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvasSizeRef.current = { width: canvas.width, height: canvas.height };

    // Scale context for DPR
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // Initialize particles with adaptive count
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const isDark = isDarkModeRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // Adaptive particle count based on device and screen size
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const baseCount = isDark ? 80 : 50;
    const multiplier = isMobile ? 0.4 : isTablet ? 0.7 : 1;
    const count = Math.min(
      Math.floor(baseCount * multiplier),
      Math.floor((width * height) / (isDark ? 15000 : 20000))
    );

    const newParticles: ParticleType[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push(new Particle(canvas));
    }
    particlesRef.current = newParticles;
  }, []);

  // Optimized connection drawing with spatial hash (simplified)
  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: ParticleType[]) => {
    const colors = getColors(isDarkModeRef.current);
    const isDark = isDarkModeRef.current;
    const maxDist = isDark ? 150 : 120;
    const particleCount = particles.length;

    // Only check connections every other frame for performance
    if (Math.random() > 0.5 && particleCount > 30) {
      return;
    }

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * (isDark ? 0.15 : 0.08);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${colors.primary}, ${opacity})`;
          ctx.lineWidth = isDark ? 0.5 : 0.3;
          ctx.stroke();
        }
      }
    }
  }, [getColors]);

  // Mouse interaction with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (throttleTimerRef.current) return;

    throttleTimerRef.current = window.setTimeout(() => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      throttleTimerRef.current = null;
    }, 16); // ~60fps throttle
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePosition.current = { x: null, y: null };
    if (throttleTimerRef.current) {
      clearTimeout(throttleTimerRef.current);
      throttleTimerRef.current = null;
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { width, height } = canvasSizeRef.current;
    const particles = particlesRef.current;
    const colors = getColors(isDarkModeRef.current);
    const isDark = isDarkModeRef.current;

    ctx.clearRect(0, 0, width, height);

    // Draw subtle background gradient (optimized)
    const bgGradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      width * 0.6
    );

    if (isDark) {
      bgGradient.addColorStop(0, "rgba(30, 58, 138, 0.03)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    } else {
      bgGradient.addColorStop(0, "rgba(238, 242, 255, 0.4)");
      bgGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
      bgGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    }

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw connections
    drawConnections(ctx, particles);

    // Update and draw particles
    const mouseX = mousePosition.current.x;
    const mouseY = mousePosition.current.y;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse interaction effect (spread across frames)
      if (mouseX !== null && mouseY !== null) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = ((200 - dist) / 200) * 0.5;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }
      }

      p.update(canvas);
      p.draw(ctx, canvas, colors);
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [drawConnections, getColors]);

  // Setup effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial setup
    resizeCanvas();
    initParticles(canvas);

    // Start animation
    animate();

    // Event listeners
    const handleResize = () => {
      resizeCanvas();
      const canvas = canvasRef.current;
      if (canvas) {
        initParticles(canvas);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
      }
    };
  }, [animate, resizeCanvas, initParticles, handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: "transparent",
        width: "100vw",
        height: "100vh"
      }}
    />
  );
};

export default AnimatedBackground;