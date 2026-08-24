import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import profileImg from '../assets/vinay.png';
import { FluidNetwork } from './FluidNetwork';

export function Hero() {
  const techTags = ["React", "Node.js", "Express", "MongoDB", "TypeScript", "Python", "Java"];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const textX = useTransform(mouseX, [-1, 1], [-25, 25]);
  const textY = useTransform(mouseY, [-1, 1], [-25, 25]);
  const imageX = useTransform(mouseX, [-1, 1], [15, -15]);
  const imageY = useTransform(mouseY, [-1, 1], [15, -15]);

  const handleScroll = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden bg-transparent"
    >
      <FluidNetwork />
      
      {/* Background Grids & Dots overlay with smooth radial mask for a high-end fade */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_90%)] pointer-events-none -z-10"></div>
      
      {/* Navigation Header - Logo only, main nav is the floating Navbar */}
      <header className="w-full max-w-6xl flex justify-between items-center pt-20 pb-4 z-20">
        <span className="text-xl font-bold tracking-tight text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Vinay <span className="text-indigo-400">/&gt;</span>
        </span>
      </header>

      {/* Hero Content */}
      <div className="flex-grow flex flex-col lg:flex-row-reverse justify-center lg:justify-between items-center gap-4 lg:gap-6 max-w-6xl w-full z-10 py-8">
        {/* Avatar Section (Static Standing Portrait) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ x: imageX, y: imageY }}
          className="relative lg:w-1/2 flex justify-center items-center py-10"
        >
          {/* Glowing lime/emerald oval backdrop matching the style of the original image's green oval */}
          <div className="absolute w-[220px] h-[330px] sm:w-[260px] sm:h-[390px] bg-gradient-to-b from-[#84cc16]/20 via-[#84cc16]/5 to-transparent rounded-[120px] blur-2xl -z-10 animate-pulse" />
          
          <div className="absolute w-[200px] h-[310px] sm:w-[240px] sm:h-[370px] border border-[#84cc16]/30 bg-[#84cc16]/5 rounded-[120px] -z-10 shadow-[0_0_50px_rgba(132,204,22,0.15)]" />

          {/* Floating Standing Image */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative flex justify-center items-center select-none"
          >
            <img 
              src={profileImg} 
              alt="Vinay Barrenkula standing" 
              className="h-[380px] sm:h-[460px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10"
            />
            
            {/* Soft shadow below image */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[180px] h-4 bg-emerald-500/20 blur-[10px] rounded-full scale-y-[0.3] -z-10 animate-pulse" />
            
            {/* Interactive "Open to Work" badge overlaying/floating next to image */}
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 top-1/4 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-emerald-400 transition-colors z-20 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] sm:text-xs font-bold tracking-wider text-emerald-400 uppercase">Open To Work</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Matter Section */}
        <motion.div 
          className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 lg:py-4"
          style={{ x: textX, y: textY }}
        >
          {/* Status Chip */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 text-emerald-400 text-[11px] bg-emerald-500/5 mb-6 font-semibold uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Available for roles</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-2 tracking-tight text-white leading-[1.1]"
          >
            Hi, I'm <span className="text-gradient-indigo">Vinay Barrenkula</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg font-medium text-indigo-300 dark:text-indigo-400 mb-3 tracking-wide"
          >
            Full Stack Developer & Tech Enthusiast
          </motion.h2>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mb-4 font-normal"
          >
            I build highly interactive, responsive web applications and scale backend/database architectures. Specializing in modern JavaScript frameworks and scalable systems.
          </motion.p>

          {/* Tech List (Highlighted Rounded Tags) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-8 max-w-lg"
          >
            {techTags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 dark:text-indigo-400 hover:bg-indigo-500/25 hover:border-indigo-500/40 hover:text-white transition-all duration-300 shadow-[0_2px_15px_rgba(99,102,241,0.08)] cursor-default select-none hover:scale-105 transform"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Primary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={() => handleScroll('#features')}
              className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              View Projects
            </button>
            <button 
              className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Download Resume
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Social / Foot Links */}
      <div className="flex gap-6 z-10 py-4 border-t border-white/5 w-full max-w-6xl justify-center sm:justify-start">
        <a 
          href="https://github.com/vinaybarrenkula-maker" target="_blank" rel="noreferrer" 
          className="text-muted-foreground hover:text-white transition-colors"
        >
          <FiGithub size={20} />
        </a>
        <a 
          href="https://www.linkedin.com/in/vinay-barrenkula-0a0b69354/" target="_blank" rel="noreferrer" 
          className="text-muted-foreground hover:text-white transition-colors"
        >
          <FiLinkedin size={20} />
        </a>
        <a 
          href="mailto:vinaybarrenkula@gmail.com" 
          className="text-muted-foreground hover:text-white transition-colors"
        >
          <FiMail size={20} />
        </a>
      </div>
    </section>
  );
}
