
import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let dpr = window.devicePixelRatio || 1;
    
    // Configuration
    const particleCount = Math.min(Math.floor(window.innerWidth / 12), 120);
    const connectionDistance = 180;
    const mouseDistance = 200;
    const triangleOpacityMultiplier = 0.05;
    const lineOpacityMultiplier = 0.2;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      baseColor: string = '255, 255, 255'; // Pure White

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Increased base speed for a "lively" feel
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 1.5 + 1;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number, mouse: { x: number, y: number, active: boolean }) {
        // Basic movement
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.03;

        // Interaction with mouse: Lively Repulsion
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            const angle = Math.atan2(dy, dx);
            // Gently nudge particle away from mouse
            this.vx += Math.cos(angle) * force * 0.5;
            this.vy += Math.sin(angle) * force * 0.5;
          }
        }

        // Friction to keep speeds controlled after mouse interaction
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Minimum speed enforcement
        const minSpeed = 0.4;
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed < minSpeed) {
          this.vx *= 1.1;
          this.vy *= 1.1;
        }

        // Boundary bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        
        // Ensure they don't get stuck outside
        if (this.x < 0) this.x = 0;
        if (this.x > width) this.x = width;
        if (this.y < 0) this.y = 0;
        if (this.y > height) this.y = height;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pSize = this.size * (1 + Math.sin(this.pulse) * 0.2);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, 0.7)`;
        ctx.fill();

        // White Glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, pSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, 0.05)`;
        ctx.fill();
      }
    }

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(width, height, mouseRef.current);
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = connectionDistance * connectionDistance;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / connectionDistance);
            
            // Draw White Filaments
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * lineOpacityMultiplier})`;
            ctx.lineWidth = 0.5 * opacity;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // White Ethereal Triangles
            for (let k = j + 1; k < Math.min(j + 3, particles.length); k++) {
              const p3 = particles[k];
              const d2x = p2.x - p3.x;
              const d2y = p2.y - p3.y;
              const dist2Sq = d2x * d2x + d2y * d2y;

              if (dist2Sq < maxDistSq * 0.5) {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity * triangleOpacityMultiplier})`;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.closePath();
                ctx.fill();
              }
            }
          }
        }

        // Enhanced Mouse Connections
        if (mouseRef.current.active) {
          const mdx = p1.x - mouseRef.current.x;
          const mdy = p1.y - mouseRef.current.y;
          const mdistSq = mdx * mdx + mdy * mdy;
          const mMaxDistSq = mouseDistance * mouseDistance;

          if (mdistSq < mMaxDistSq) {
            const mdist = Math.sqrt(mdistSq);
            const mOpacity = (1 - mdist / mouseDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${mOpacity * 0.35})`;
            ctx.lineWidth = 1 * mOpacity;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        p1.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-60"
      style={{ background: 'transparent' }}
    />
  );
};

export default BackgroundAnimation;
