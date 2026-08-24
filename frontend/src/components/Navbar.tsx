import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Pull the button towards the cursor, but keep it constrained
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, position: 'relative' }}
    >
      {children}
    </motion.div>
  );
};

const navItems = [
  { id: 'features', label: 'Features' },
  { id: 'technology', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('features');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for triggers

      // Find the current section
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeOrHovered = hoveredTab || activeSection;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        onMouseLeave={() => setHoveredTab(null)}
        className="pointer-events-auto flex items-center gap-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-2.5 py-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative"
      >
        {navItems.map((item) => {
          const isHighlighted = activeOrHovered === item.id;
          return (
            <MagneticWrapper key={item.id}>
              <button
                onClick={() => handleScrollTo(item.id)}
                onMouseEnter={() => setHoveredTab(item.id)}
                className="relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 rounded-full outline-none select-none"
              >
                {/* Sliding Pill Highlight */}
                {isHighlighted && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-white/[0.08] border border-white/10 rounded-full -z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Inner content with subtle hover scaling */}
                <motion.span
                  animate={{ 
                    color: isHighlighted ? '#ffffff' : '#94a3b8',
                    scale: hoveredTab === item.id ? 1.05 : 1
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 block"
                >
                  {item.label}
                </motion.span>
              </button>
            </MagneticWrapper>
          );
        })}
      </nav>
    </div>
  );
}
