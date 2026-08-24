import { motion } from 'framer-motion';
import { FiAward, FiCheckCircle } from 'react-icons/fi';

const accolades = [
  {
    title: "Java Programming Silver Badge",
    issuer: "NPTEL",
    date: "Dec 2025",
    tags: ["Java", "OOPs", "Data Structures"],
    credentialId: "Verified Badge"
  },
  {
    title: "Full Stack MERN Development Certificate",
    issuer: "Suntek",
    date: "2025",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    credentialId: "Verified Certificate"
  }
];

export function Accolades() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <h3 className="text-3xl font-bold mb-12 text-center">
        Accolades & <span className="text-gradient-indigo">Certifications</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {accolades.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass rounded-3xl p-6 flex flex-col justify-between hover:glow-accent transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
                  <FiAward size={24} />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                  <FiCheckCircle size={10} /> {item.credentialId}
                </span>
              </div>
              
              <h4 className="text-lg font-bold mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground mb-4">{item.issuer} • {item.date}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map(tag => (
                <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-indigo-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
