import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import profileImg from '../assets/vinay.jpg';

interface ThreeDExhibitionProps {
  avatarUrl?: string;
}

export function ThreeDExhibition({ avatarUrl = profileImg }: ThreeDExhibitionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: -12, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = -(y / (rect.height / 2)) * 30 - 12;
    const tiltY = (x / (rect.width / 2)) * 30;

    setRotation({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: -12, y: 0 });
  };

  const cubeStyle = isHovered
    ? {
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }
    : {
        transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
      };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cube-viewport cursor-grab active:cursor-grabbing"
      >
        <div className={`cube-wrapper ${!isHovered ? 'animate-cube-spin' : ''}`} style={cubeStyle}>
          <div className="relative sculpture-stage w-full max-w-[360px] aspect-[4/5]" style={{ perspective: 1200 }}>
            <div
              className="portrait-layer bg-glow-layer absolute inset-0 rounded-[28px] pointer-events-none"
              style={{
                transform: `translate3d(${rotation.y * 0.35}px, ${-rotation.x * 0.18}px, -30px) scale(1.04)`,
                transition: 'transform 0.12s linear',
              }}
            />

            <div
              className="portrait-layer portrait-mid relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/95 shadow-[0_40px_120px_-30px_rgba(15,23,42,0.9)]"
              style={{
                transform: `translate3d(${rotation.y * 0.7}px, ${-rotation.x * 0.35}px, 0px)`,
                transition: 'transform 0.12s linear',
              }}
            >
              <img src={avatarUrl} alt="Vinay Barrenkula standing portrait" className="w-full h-full object-cover select-none pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"></div>
              <div className="absolute inset-x-12 bottom-24 h-24 rounded-full bg-white/8 blur-2xl mix-blend-screen pointer-events-none" />
              <div className="absolute inset-x-0 top-14 h-24 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col items-center bg-black/60 backdrop-blur-md py-3 px-4 rounded-3xl border border-white/10">
                <span className="text-[11px] font-semibold text-white tracking-widest uppercase">Vinay Barrenkula</span>
                <span className="text-[9px] text-indigo-300 font-medium tracking-wide mt-0.5">CREATOR / DEVELOPER</span>
              </div>
            </div>

            <div
              className="portrait-layer portrait-fore absolute inset-0 pointer-events-none flex items-center justify-center"
              style={{
                transform: `translate3d(${rotation.y * 1.4}px, ${-rotation.x * 0.7}px, 40px)`,
                transition: 'transform 0.12s linear',
              }}
            >
              <svg className="portrait-silhouette w-2/3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <g fill="url(#g)" opacity="0.12">
                  <path d="M60 110c-6-10-8-24 2-34 8-8 20-6 28 2s18 12 28 8c10-4 26-10 36-2 8 6 6 20-2 28-10 10-28 18-48 18-18 0-36-8-52-18z" />
                  <path d="M90 130c6-6 24-8 34-2 8 4 14 12 10 20-4 8-14 10-22 8s-20-6-22-12c-2-6-2-10 0-14z" />
                </g>
              </svg>
            </div>

            <div className="sculpture-pedestal" />
            <div className="sculpture-base" />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 w-48 h-3 bg-indigo-500/10 blur-[8px] rounded-full transform -rotate-x-12 scale-y-[0.3] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute -bottom-8 w-60 h-4 bg-black/40 blur-[12px] rounded-full transform -rotate-x-12 scale-y-[0.2] pointer-events-none -z-10"></div>
    </div>
  );
}
