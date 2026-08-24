import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaPython, FaJava, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import {
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

/* ── Colour palette that cycles on tap ── */
const PALETTE = [
  { bg: 'rgba(99,102,241,0.25)', border: '#818cf8', glow: 'rgba(99,102,241,0.55)', text: '#a5b4fc' },
  { bg: 'rgba(16,185,129,0.25)', border: '#34d399', glow: 'rgba(16,185,129,0.55)', text: '#6ee7b7' },
  { bg: 'rgba(244,114,182,0.25)', border: '#f472b6', glow: 'rgba(244,114,182,0.55)', text: '#f9a8d4' },
  { bg: 'rgba(251,191,36,0.25)', border: '#fbbf24', glow: 'rgba(251,191,36,0.55)', text: '#fde68a' },
  { bg: 'rgba(56,189,248,0.25)', border: '#38bdf8', glow: 'rgba(56,189,248,0.55)', text: '#7dd3fc' },
  { bg: 'rgba(168,85,247,0.25)', border: '#a855f7', glow: 'rgba(168,85,247,0.55)', text: '#c4b5fd' },
];

/* ── Skill data ── */
interface SkillDef {
  name: string;
  icon: IconType;
  defaultColor: string;
  color: {
    bg: string;
    border: string;
    glow: string;
    text: string;
  };
  /** position as % of container */
  x: number;
  y: number;
  /** SVG branch path (viewBox 800×650) */
  branch: string;
  /** stroke width for this branch */
  sw: number;
  /** animation stagger delay */
  delay: number;
}

/*
 * Tree layout (viewBox 800 × 650):
 *   Trunk: bottom-centre (400,630) → (400,270)
 *   Branches fan out like a real tree canopy.
 *   Each skill node sits at a branch tip.
 *
 *   Positions are given as % of the 800×650 box
 *   so the HTML overlay lines up with the SVG.
 */
const skills: SkillDef[] = [
  /* ── top crown ── */
  {
    name: 'React', icon: FaReact, defaultColor: '#61dafb',
    color: {
      bg: 'rgba(97,218,251,0.18)',
      border: '#61dafb',
      glow: 'rgba(97,218,251,0.55)',
      text: '#61dafb',
    },
    x: 15, y: 6,
    branch: 'M 400 280 C 380 240, 320 170, 240 120 Q 200 80, 160 40',
    sw: 4, delay: 0.2,
  },
  {
    name: 'HTML5', icon: FaHtml5, defaultColor: '#e34f26',
    color: {
      bg: 'rgba(227,79,38,0.18)',
      border: '#e34f26',
      glow: 'rgba(227,79,38,0.55)',
      text: '#e34f26',
    },
    x: 35, y: 3,
    branch: 'M 400 275 C 390 230, 350 165, 300 120 Q 260 80, 220 38',
    sw: 3.2, delay: 0.28,
  },
  {
    name: 'TypeScript', icon: SiTypescript, defaultColor: '#3178c6',
    color: {
      bg: 'rgba(49,120,198,0.16)',
      border: '#3178c6',
      glow: 'rgba(49,120,198,0.55)',
      text: '#3178c6',
    },
    x: 62, y: 3,
    branch: 'M 400 275 C 410 230, 450 170, 490 120 Q 520 75, 540 35',
    sw: 3.2, delay: 0.32,
  },
  {
    name: 'Node.js', icon: FaNodeJs, defaultColor: '#339933',
    color: {
      bg: 'rgba(51,153,51,0.16)',
      border: '#339933',
      glow: 'rgba(51,153,51,0.55)',
      text: '#339933',
    },
    x: 84, y: 6,
    branch: 'M 400 280 C 440 240, 520 175, 600 128 Q 645 92, 700 48',
    sw: 4, delay: 0.24,
  },

  /* ── mid canopy ── */
  {
    name: 'Python', icon: FaPython, defaultColor: '#ffd43b',
    color: {
      bg: 'rgba(255,212,59,0.18)',
      border: '#ffd43b',
      glow: 'rgba(255,212,59,0.55)',
      text: '#ffd43b',
    },
    x: 6, y: 25,
    branch: 'M 398 320 C 360 295, 290 270, 225 230 Q 190 205, 155 185',
    sw: 4.5, delay: 0.36,
  },
  {
    name: 'MongoDB', icon: SiMongodb, defaultColor: '#47a248',
    color: {
      bg: 'rgba(71,162,72,0.18)',
      border: '#47a248',
      glow: 'rgba(71,162,72,0.55)',
      text: '#47a248',
    },
    x: 22, y: 32,
    branch: 'M 396 340 C 360 320, 305 295, 255 270 Q 220 245, 190 215',
    sw: 3.6, delay: 0.4,
  },
  {
    name: 'Express', icon: SiExpress, defaultColor: '#ffffff',
    color: {
      bg: 'rgba(255,255,255,0.18)',
      border: '#d1d5db',
      glow: 'rgba(255,255,255,0.45)',
      text: '#f8fafc',
    },
    x: 76, y: 32,
    branch: 'M 404 340 C 440 320, 495 294, 545 270 Q 580 245, 615 215',
    sw: 3.6, delay: 0.44,
  },
  {
    name: 'JavaScript', icon: SiJavascript, defaultColor: '#f7df1e',
    color: {
      bg: 'rgba(247,223,30,0.18)',
      border: '#f7df1e',
      glow: 'rgba(247,223,30,0.55)',
      text: '#f7df1e',
    },
    x: 93, y: 25,
    branch: 'M 402 320 C 450 300, 545 275, 610 245 Q 670 210, 720 180',
    sw: 4.5, delay: 0.38,
  },

  /* ── lower canopy ── */
  {
    name: 'Tailwind', icon: SiTailwindcss, defaultColor: '#06b6d4',
    color: {
      bg: 'rgba(6,182,212,0.18)',
      border: '#06b6d4',
      glow: 'rgba(6,182,212,0.55)',
      text: '#06b6d4',
    },
    x: 12, y: 52,
    branch: 'M 395 400 C 350 395, 290 380, 240 368 Q 190 356, 145 338',
    sw: 3, delay: 0.5,
  },
  {
    name: 'Git', icon: FaGitAlt, defaultColor: '#f05032',
    color: {
      bg: 'rgba(240,80,50,0.18)',
      border: '#f05032',
      glow: 'rgba(240,80,50,0.55)',
      text: '#f05032',
    },
    x: 27, y: 58,
    branch: 'M 394 420 C 360 415, 310 405, 267 394 Q 235 384, 205 372',
    sw: 2.8, delay: 0.54,
  },
  {
    name: 'CSS3', icon: FaCss3Alt, defaultColor: '#264de4',
    color: {
      bg: 'rgba(38,77,228,0.18)',
      border: '#264de4',
      glow: 'rgba(38,77,228,0.55)',
      text: '#264de4',
    },
    x: 87, y: 52,
    branch: 'M 405 400 C 450 395, 520 382, 590 370 Q 640 360, 690 345',
    sw: 3.1, delay: 0.52,
  },
  {
    name: 'Java', icon: FaJava, defaultColor: '#ed8b00',
    color: {
      bg: 'rgba(237,139,0,0.18)',
      border: '#ed8b00',
      glow: 'rgba(237,139,0,0.55)',
      text: '#ed8b00',
    },
    x: 72, y: 58,
    branch: 'M 406 420 C 440 410, 490 398, 530 388 Q 565 378, 595 368',
    sw: 2.8, delay: 0.56,
  },
];

/* ── Skill node component ── */
function SkillNode({
  skill,
  colorIdx,
  onTap,
}: {
  skill: SkillDef;
  colorIdx: number;
  onTap: () => void;
}) {
  const accent = colorIdx >= 0 ? PALETTE[colorIdx % PALETTE.length] : null;
  const activeColor = skill.color;
  const Icon = skill.icon;

  return (
    <motion.button
      onClick={onTap}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: skill.delay * 0.4 + 0.2,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20 cursor-pointer focus:outline-none group"
      style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
      aria-label={`Skill: ${skill.name}`}
    >
      <motion.div
        animate={{
          x: [0, 2, 0, -2, 0],
          y: [0, -3, 0, 2, 0],
          rotate: [0, 0.5, 0, -0.5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: skill.delay,
        }}
        className="flex flex-col items-center gap-1"
      >
        {/* Glow ring behind */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 2.2, opacity: [0.6, 0] }}
          transition={{ duration: 0.7 }}
          style={{ background: accent?.glow ?? activeColor.glow }}
          key={colorIdx}
        />

        {/* Circle */}
        <div
          className="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 border-2 backdrop-blur-sm"
          style={{
            background: activeColor.bg,
            borderColor: activeColor.border,
            boxShadow: `0 0 20px ${activeColor.glow}, 0 0 42px ${activeColor.glow}, inset 0 0 14px ${activeColor.bg}`,
          }}
        >
          <Icon
            className="text-lg md:text-2xl transition-colors duration-500"
            style={{ color: activeColor.text }}
          />
        </div>

        {/* Label */}
        <span
          className="text-[9px] md:text-[11px] font-bold tracking-wider uppercase transition-colors duration-500 whitespace-nowrap drop-shadow-lg"
          style={{ color: activeColor.text }}
        >
          {skill.name}
        </span>
      </motion.div>
    </motion.button>
  );
}

/* ── Main component ── */
export function SkillsOrbit() {
  const [colorMap, setColorMap] = useState<Record<string, number>>(
    () => Object.fromEntries(skills.map((s) => [s.name, -1]))
  );

  const handleTap = useCallback((name: string) => {
    setColorMap((prev) => ({ ...prev, [name]: (prev[name] ?? -1) + 1 }));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h3 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Technical <span className="text-gradient-indigo">Skill Tree</span>
        </h3>
        <p className="text-xs text-slate-500 tracking-wider uppercase">
          Tap any fruit to light it up ✦
        </p>
      </motion.div>

      {/* Mobile Grid View (Displays as blocks on mobile, hidden on tablet/desktop) */}
      <div className="block md:hidden w-full max-w-sm mx-auto my-6">
        <div className="grid grid-cols-3 gap-3">
          {skills.map((skill, idx) => {
            const colorIdx = colorMap[skill.name];
            const accent = colorIdx >= 0 ? PALETTE[colorIdx % PALETTE.length] : null;
            const activeColor = skill.color;
            const Icon = skill.icon;
            
            return (
              <motion.button
                key={skill.name}
                onClick={() => handleTap(skill.name)}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-300 backdrop-blur-sm select-none focus:outline-none"
                style={{
                  background: activeColor.bg,
                  borderColor: activeColor.border,
                  boxShadow: `0 0 15px ${activeColor.glow}, inset 0 0 8px ${activeColor.bg}`,
                }}
              >
                {/* Glow ring behind on tap */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: [0.5, 0] }}
                  transition={{ duration: 0.6 }}
                  style={{ background: accent?.glow ?? activeColor.glow }}
                  key={colorIdx}
                />
                
                <Icon 
                  className="text-2xl mb-1.5 transition-colors duration-500" 
                  style={{ color: activeColor.text }} 
                />
                
                <span 
                  className="text-[9px] font-bold tracking-wider uppercase transition-colors duration-500 text-center" 
                  style={{ color: activeColor.text }}
                >
                  {skill.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tree container — desktop only (hidden on mobile, block on md/lg/xl) */}
      <div className="hidden md:block relative w-full max-w-4xl" style={{ aspectRatio: '800 / 650' }}>
        {/* ── SVG: trunk + branches ── */}
        <svg
          viewBox="0 0 800 650"
          className="absolute inset-0 w-full h-full z-0"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Trunk gradient (bottom = dark, top = lighter) */}
            <linearGradient id="trunkG" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="rgba(71,42,22,0.9)" />
              <stop offset="40%" stopColor="rgba(100,65,35,0.8)" />
              <stop offset="100%" stopColor="rgba(120,80,45,0.7)" />
            </linearGradient>

            {/* Branch gradient */}
            <linearGradient id="branchG" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="rgba(100,65,35,0.7)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0.4)" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="bGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Roots ── */}
          <motion.path
            d="M 400 630 C 380 640, 340 645, 310 648"
            stroke="rgba(71,42,22,0.6)" strokeWidth="4" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          />
          <motion.path
            d="M 400 630 C 420 642, 460 647, 500 648"
            stroke="rgba(71,42,22,0.6)" strokeWidth="3.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          />
          <motion.path
            d="M 400 635 C 390 645, 370 650, 355 650"
            stroke="rgba(71,42,22,0.4)" strokeWidth="2.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          <motion.path
            d="M 400 635 C 415 645, 440 650, 460 650"
            stroke="rgba(71,42,22,0.4)" strokeWidth="2.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.12 }}
          />

          {/* ── Trunk ── */}
          <motion.path
            d="M 400 630 C 402 580, 396 520, 400 460 C 404 400, 398 340, 400 270"
            stroke="url(#trunkG)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            filter="url(#bGlow)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
          {/* Trunk highlight line */}
          <motion.path
            d="M 403 628 C 404 575, 399 515, 402 458 C 405 398, 400 338, 402 272"
            stroke="rgba(180,140,90,0.2)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeInOut' }}
          />

          {/* ── Branches ── */}
          {skills.map((skill) => (
            <motion.path
              key={skill.name}
              d={skill.branch}
              stroke="url(#branchG)"
              strokeWidth={skill.sw}
              fill="none"
              strokeLinecap="round"
              filter="url(#bGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: skill.delay * 0.4, ease: 'easeOut' }}
            />
          ))}

          {/* ── Small decorative twigs ── */}
          {/* left twig off Python branch */}
          <motion.path d="M 250 260 C 230 240, 210 230, 190 228" stroke="rgba(100,65,35,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.4 }} />
          {/* right twig off JS branch */}
          <motion.path d="M 550 260 C 570 240, 590 230, 610 228" stroke="rgba(100,65,35,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.41 }} />
          {/* small twig top left */}
          <motion.path d="M 280 170 C 260 150, 240 145, 225 150" stroke="rgba(100,65,35,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.43 }} />
          {/* small twig top right */}
          <motion.path d="M 520 170 C 540 150, 560 145, 575 150" stroke="rgba(100,65,35,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.45 }} />
          {/* twig off trunk mid */}
          <motion.path d="M 400 380 C 385 370, 375 368, 365 370" stroke="rgba(100,65,35,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: 0.35 }} />
          <motion.path d="M 400 380 C 415 370, 425 368, 435 370" stroke="rgba(100,65,35,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: 0.37 }} />

          {/* ── Ground grass strokes ── */}
          <motion.path d="M 320 648 C 318 636, 325 630, 322 620" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.5 }} />
          <motion.path d="M 340 650 C 335 638, 338 632, 336 624" stroke="rgba(34,197,94,0.2)" strokeWidth="1.2" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.52 }} />
          <motion.path d="M 470 649 C 472 637, 468 631, 470 622" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.51 }} />
          <motion.path d="M 490 650 C 495 640, 490 634, 492 626" stroke="rgba(34,197,94,0.2)" strokeWidth="1.2" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.54 }} />
        </svg>

        {/* ── Skill nodes (HTML layer on top of SVG) ── */}
        {skills.map((skill) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            colorIdx={colorMap[skill.name]}
            onTap={() => handleTap(skill.name)}
          />
        ))}

        {/* Ground shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-4 bg-emerald-700/10 blur-[14px] rounded-full pointer-events-none z-0" />
      </div>

      {/* Legend */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-[11px] text-slate-600 flex items-center gap-2"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
        Click any skill to watch it glow
      </motion.p>
    </div>
  );
}
