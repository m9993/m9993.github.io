"use client";

import React, { useEffect, useRef } from "react";

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
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: ParticleType[] = [];
    let mouseX: number | null = null;
    let mouseY: number | null = null;

    // Resize canvas
    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Check dark mode
    const isDarkMode = (): boolean => {
      return document.documentElement.classList.contains("dark");
    };

    // Get colors based on theme
    const getColors = () => {
      const isDark = isDarkMode();
      return {
        primary: isDark ? "147, 197, 253" : "99, 102, 241", // Blue to indigo
        secondary: isDark ? "167, 139, 250" : "139, 92, 246", // Purple
        glow: isDark ? "147, 197, 253" : "99, 102, 241",
        particle: isDark ? "147, 197, 253" : "99, 102, 241",
      };
    };

    // Particle class
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

      update(): void {
        // Move in direction with wobble
        this.direction +=
          Math.sin(Date.now() * this.wobbleSpeed + this.wobbleOffset) * this.wobble;
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        // Wrap around screen
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
      }

      draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        const colors = getColors();
        const isDark = isDarkMode();

        // Main particle line with gradient
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x + Math.cos(this.direction) * this.length,
          this.y + Math.sin(this.direction) * this.length
        );

        gradient.addColorStop(0, `rgba(${colors.primary}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${colors.primary}, 0)`);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x + Math.cos(this.direction) * this.length,
          this.y + Math.sin(this.direction) * this.length
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.random() * 1.5 + 0.5;
        ctx.stroke();

        // Glow effect - more subtle in light mode
        ctx.shadowColor = isDark
          ? `rgba(${colors.glow}, 0.15)`
          : `rgba(${colors.glow}, 0.08)`;
        ctx.shadowBlur = isDark ? 15 : 8;

        // Draw glowing dot at the start of each particle
        const dotGradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          4
        );

        dotGradient.addColorStop(
          0,
          `rgba(${colors.primary}, ${isDark ? this.opacity * 1.5 : this.opacity * 0.8})`
        );
        dotGradient.addColorStop(1, `rgba(${colors.primary}, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = dotGradient;
        ctx.fill();

        ctx.shadowBlur = 0;
      }
    }

    // Create particles - fewer in light mode for cleaner look
    const particleCount = Math.min(
      isDarkMode() ? 80 : 50,
      Math.floor(window.innerWidth / (isDarkMode() ? 15 : 20))
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create ripple effect
      particles.forEach((p) => {
        if (mouseX === null || mouseY === null) return;
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = ((200 - dist) / 200) * 0.5;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }
      });
    };

    const handleMouseLeave = (): void => {
      mouseX = null;
      mouseY = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Draw connecting lines
    const drawConnections = (): void => {
      const colors = getColors();
      const isDark = isDarkMode();

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isDark ? 150 : 120;
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
    };

    // Animation loop
    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background gradient
      const isDark = isDarkMode();
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.6
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
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawConnections();

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx, canvas);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
};

export default AnimatedBackground;