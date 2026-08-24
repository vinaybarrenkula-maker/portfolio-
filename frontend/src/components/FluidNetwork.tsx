import { useEffect, useRef } from 'react';

export function FluidNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = Math.min(window.innerWidth / 8, 120);
    
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let lastMouse = { x: -1000, y: -1000 };

    const colors = ['rgba(167, 139, 250, 0.4)', 'rgba(99, 102, 241, 0.4)', 'rgba(255, 255, 255, 0.2)'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      mass: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.mass = this.size;
      }

      update(w: number, h: number) {
        // Base movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges smoothly
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const mouseVelocity = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
        const interactionRadius = 120 + mouseVelocity * 2; // Wave propagation on fast movement

        if (distance < interactionRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          
          // Smooth repulsive force, stronger when close or moving fast
          const force = (interactionRadius - distance) / interactionRadius;
          const repelStrength = force * (mouseVelocity * 0.15 + 1);

          this.x -= forceDirectionX * repelStrength;
          this.y -= forceDirectionY * repelStrength;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      // Adjust canvas for DPI
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(window.innerWidth, window.innerHeight);
        particles[i].draw();

        // Connect particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connecting lines for the mesh
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.12 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Decay mouse velocity (inertia for waves)
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate velocity for ripples
      mouse.vx = e.clientX - lastMouse.x;
      mouse.vy = e.clientY - lastMouse.y;
      
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}
