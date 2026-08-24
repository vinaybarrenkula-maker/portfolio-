import { motion } from 'framer-motion';

const education = [
  {
    step: "01",
    institution: "Anurag University",
    degree: "B.Tech in Computer Science & Engineering",
    duration: "Aug 2024 - Present",
    score: "CGPA: 9.02",
    details: "Focusing on Full Stack Web Development, Data Structures, Algorithms, and System Design."
  },
  {
    step: "02",
    institution: "Impulse Junior College",
    degree: "Intermediate Education (MPC)",
    duration: "2022 - 2024",
    score: "CGPA: 9.75",
    details: "Completed high-level Mathematics, Physics, and Chemistry coursework."
  },
  {
    step: "03",
    institution: "Matrix High School",
    degree: "Secondary School Certificate (SSC)",
    duration: "Graduated 2022",
    score: "9.8 GPA / equivalent",
    details: "Strong foundation in analytical skills and scientific principles."
  }
];

export function EducationTimeline() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h3 className="text-3xl font-bold mb-12 text-center">
        Academic <span className="text-gradient-indigo">Journey</span>
      </h3>
      
      <div className="relative border-l border-indigo-500/30 dark:border-indigo-500/10 ml-4 md:ml-6 flex flex-col gap-12">
        {education.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Numeric Badge */}
            <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-background border border-indigo-500/40 flex justify-center items-center font-bold text-xs md:text-sm text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              {item.step}
            </div>
            
            <div className="glass rounded-3xl p-6 md:p-8 hover:glow-accent transition-all duration-300">
              <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">{item.duration}</span>
              <h4 className="text-xl md:text-2xl font-bold mt-1 mb-2">{item.institution}</h4>
              <p className="text-sm font-medium text-muted-foreground mb-4">{item.degree} • <span className="text-indigo-300">{item.score}</span></p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
