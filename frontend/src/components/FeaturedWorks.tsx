import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiLayers, FiLock, FiEdit2, FiCpu } from 'react-icons/fi';
import studyvaultImg from '../assets/projects/studyvault.jpg';
import blogappImg from '../assets/projects/blogapp.jpg';
import aistudentImg from '../assets/projects/aistudent.jpg';

interface FeaturedWork {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
  icon: React.ReactNode;
}

const featuredWorks: FeaturedWork[] = [
  {
    title: "StudyVault",
    description: "Full-stack educational platform with secure JWT auth, dynamic document sharing, and a highly responsive React UI for seamless learning.",
    image: studyvaultImg,
    tags: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "#",
    githubUrl: "https://github.com/vinaybarrenkula-maker/studyvault",
    gradient: "from-indigo-600/20 via-violet-600/10 to-purple-600/20",
    icon: <FiLock size={20} className="text-indigo-400" />,
  },
  {
    title: "Blog App",
    description: "Dynamic blogging platform with real-time content management, markdown editor, and optimized MongoDB queries for lightning-fast performance.",
    image: blogappImg,
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveUrl: "#",
    githubUrl: "https://github.com/vinaybarrenkula-maker/BLOG-APP",
    gradient: "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
    icon: <FiEdit2 size={20} className="text-emerald-400" />,
  },
  {
    title: "AI Student Predictor",
    description: "ML-powered prediction engine analyzing academic progress with interactive data charts and AI-backed insights via Java + React integration.",
    image: aistudentImg,
    tags: ["React", "Java", "MySQL", "scikit-learn"],
    liveUrl: "#",
    githubUrl: "https://github.com/vinaybarrenkula-maker",
    gradient: "from-amber-600/20 via-orange-600/10 to-rose-600/20",
    icon: <FiCpu size={20} className="text-amber-400" />,
  },
];



export function FeaturedWorks() {
  return (
    <section id="featured-works" className="max-w-6xl mx-auto px-4 py-20 relative">
      {/* Background glow */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-indigo-500/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 text-indigo-400 text-[11px] bg-indigo-500/5 mb-6 font-semibold uppercase tracking-wider">
          <FiLayers size={14} />
          <span>Deployed & Live</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Featured <span className="text-gradient-indigo">Works</span>
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Real-world applications I've designed, developed, and deployed. Each project reflects my commitment to clean architecture and exceptional user experience.
        </p>
      </motion.div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredWorks.map((work, idx) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group glass rounded-2xl overflow-hidden border border-white/5 bg-black/10 hover:border-indigo-500/30 hover:glow-accent transition-all duration-500 flex flex-col"
          >
            {/* Screenshot Area */}
            <div className={`relative h-56 bg-gradient-to-br ${work.gradient} p-4 sm:p-5 flex items-center justify-center overflow-hidden`}>
              
              {/* Refined Rounded Container for the Realistic UI Preview */}
              <div className="relative w-full h-full rounded-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-700">
                <img
                  src={work.image}
                  alt={`${work.title} realistic UI preview`}
                  className="w-full h-full object-cover"
                />
                
                {/* Soft ambient inner glow overlay to blend with the container */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none"></div>
              </div>

              {/* Floating Project Icon */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-500 z-20">
                {work.icon}
              </div>

              {/* Hover overlay with links */}
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                {work.liveUrl && (
                  <a
                    href={work.liveUrl}
                    className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-sm z-10"
                    title="Live Demo"
                  >
                    <FiExternalLink size={18} />
                  </a>
                )}
                {work.githubUrl && (
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-sm z-10"
                    title="Source Code"
                  >
                    <FiGithub size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {work.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-grow">
                {work.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-indigo-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
