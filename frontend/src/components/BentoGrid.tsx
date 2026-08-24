import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiTerminal, FiAward, FiStar, FiGitBranch, FiLock, FiEdit2, FiCpu } from 'react-icons/fi';
import studyvaultImg from '../assets/projects/studyvault.jpg';
import blogappImg from '../assets/projects/blogapp.jpg';
import aistudentImg from '../assets/projects/aistudent.jpg';

const traits = [
  { label: "MERN Stack Specialist" },
  { label: "Data Structures & Algorithms Enthusiast" },
  { label: "Passionate Problem Solver" },
  { label: "Team Player & Collaborator" },
  { label: "Adaptive Fast Learner" },
  { label: "Always Building & Shipping" }
];

const projects = [
  {
    title: "StudyVault",
    category: "Full Stack",
    description: "Engineered a full-stack educational platform with secure JWT authentication and scalable RESTful APIs. Designed a highly responsive UI with React to enhance student engagement and ensure cross-device compatibility.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    stars: "12",
    forks: "4",
    features: [
      "Secure user authentication with JWT",
      "Dynamic document sharing & search architecture",
      "Responsive MERN front-to-back integration"
    ],
    github: "https://github.com/vinaybarrenkula-maker/studyvault",
    live: "#",
    image: studyvaultImg,
    icon: <FiLock size={16} className="text-indigo-400" />
  },
  {
    title: "Blog-App",
    category: "Full Stack",
    description: "Developed and deployed a dynamic blogging platform featuring real-time content management. Implemented secure user authentication and optimized database queries in MongoDB to ensure fast load times and a seamless user experience.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    stars: "8",
    forks: "2",
    features: [
      "Real-time blog editor & markdown parser",
      "Optimized MongoDB indexing for lightning fast reads",
      "Modern dark-themed glassmorphism interface"
    ],
    github: "https://github.com/vinaybarrenkula-maker/BLOG-APP",
    live: "#",
    image: blogappImg,
    icon: <FiEdit2 size={16} className="text-emerald-400" />
  },
  {
    title: "AI Student Performance Predictor",
    category: "AI/ML",
    description: "Architected a data-driven prediction engine utilizing machine learning to analyze academic progress. Integrated a Java backend with a React frontend via REST APIs, providing students with actionable, AI-backed insights to improve their performance.",
    tags: ["React", "Java", "Apache Tomcat", "MySQL", "scikit-learn"],
    stars: "15",
    forks: "5",
    features: [
      "Five-C credit risk inspired metric parsing engine",
      "Secure MySQL relational database schema layout",
      "Interactive data charts and visual trend insights"
    ],
    github: "https://github.com/vinaybarrenkula-maker",
    live: "#",
    image: aistudentImg,
    icon: <FiCpu size={16} className="text-amber-400" />
  }
];

export function BentoGrid() {
  const [filter, setFilter] = useState<'All' | 'Full Stack' | 'AI/ML'>('All');

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-20 relative">
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-violet-500/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

      {/* About Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {/* Core Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass rounded-3xl p-8 flex flex-col justify-between group hover:glow-accent transition-all duration-300 border border-white/5 bg-black/10"
        >
          <div>
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <FiTerminal size={20} />
              <span className="font-semibold text-xs uppercase tracking-widest">Core Profile</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Crafting Clean Code & Scalable Architectures</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              I focus on the MERN stack ecosystem. By combining client-side rendering speed in React with robust, fast backends in Node and Express, I design web applications that load quickly and scale cleanly. My dedication to mastering Data Structures and Algorithms guarantees that my codebase is optimized at every layer.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-white">9.02</div>
              <div className="text-xs text-muted-foreground mt-1">B.Tech CGPA</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-white">3+</div>
              <div className="text-xs text-muted-foreground mt-1">Major Apps</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-white">9.75</div>
              <div className="text-xs text-muted-foreground mt-1">Intermediate CGPA</div>
            </div>
          </div>
        </motion.div>

        {/* Traits Bento Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 flex flex-col justify-between hover:glow-accent transition-all duration-300 border border-white/5 bg-black/10"
        >
          <div>
            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <FiAward size={20} />
              <span className="font-semibold text-xs uppercase tracking-widest">Key Traits</span>
            </div>
            <h3 className="text-xl font-bold mb-6">Professional Strengths</h3>
            
            <div className="flex flex-col gap-3">
              {traits.map((trait, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span className="text-xs text-muted-foreground font-medium">{trait.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Projects Filters */}
      <div className="flex flex-col items-center mb-12">
        <h3 className="text-3xl font-extrabold mb-8 text-center">
          Featured <span className="text-gradient-indigo">Engineering Projects</span>
        </h3>
        
        <div className="flex gap-2 p-1.5 bg-white/5 rounded-full border border-white/5">
          {(['All', 'Full Stack', 'AI/ML'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === tab 
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Cards List */}
      <div className="flex flex-col gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass rounded-3xl p-8 flex flex-col md:flex-row gap-8 hover:glow-accent border border-white/5 bg-black/10 transition-all duration-300 relative overflow-hidden"
            >
              {/* Left Column: Title, Description, Stats */}
              <div className="flex-grow md:w-[60%] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><FiStar /> {project.stars}</span>
                      <span className="flex items-center gap-1"><FiGitBranch /> {project.forks}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-4">{project.title}</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-4">
                  <a 
                    href={project.live}
                    className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    Live Demo <FiExternalLink size={14} />
                  </a>
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    GitHub Source <FiGithub size={14} />
                  </a>
                </div>
              </div>

              {/* Right Column: UI Preview, Tech & Core Features */}
              <div className="md:w-[40%] flex flex-col justify-between p-6 bg-white/[0.02] rounded-2xl border border-white/5 gap-4">
                {/* Mini UI Preview Container */}
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 group-hover:border-indigo-500/30 transition-all duration-500 shadow-md">
                  <img 
                    src={project.image} 
                    alt={`${project.title} UI preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Small floating icon */}
                  <div className="absolute bottom-2 right-2 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    {project.icon}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Technologies</h5>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all duration-300 select-none">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Core Achievements</h5>
                  <div className="flex flex-col gap-1.5">
                    {project.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex gap-2 items-start text-xs text-muted-foreground">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span className="leading-relaxed text-[11px]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
