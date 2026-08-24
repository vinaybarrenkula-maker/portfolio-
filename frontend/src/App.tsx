import { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Hero } from './components/Hero';
import { FeaturedWorks } from './components/FeaturedWorks';
import { BentoGrid } from './components/BentoGrid';
import { EducationTimeline } from './components/EducationTimeline';
import { SkillsOrbit } from './components/SkillsOrbit';
import { Accolades } from './components/Accolades';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';
import { FiArrowUp } from 'react-icons/fi';

function App() {
  // Ensure dark mode is active by default to match friend's default theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-[#020205] text-foreground relative selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
        {/* Fixed Looping Video Background */}
        <div className="fixed inset-0 w-screen h-screen -z-30 pointer-events-none overflow-hidden bg-[#020205]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-[0.25] filter brightness-[0.6] contrast-[1.1]"
          >
            <source src="/style.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlay to blend video edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/10 via-[#020205]/40 to-[#020205]" />
        </div>

        {/* Floating Capsule Navbar */}
        <Navbar />

        {/* Background Grids & Dots with radial masking for high-end look */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_90%)] pointer-events-none -z-20"></div>

        {/* Hero Section */}
        <Hero />

        {/* Featured Works Showcase (Features) */}
        <div id="features">
          <FeaturedWorks />
        </div>

        {/* About & Stats Bento (Technology / About) */}
        <div id="technology">
          <BentoGrid />
        </div>

        {/* Education Timeline */}
        <div id="education">
          <EducationTimeline />
        </div>

        {/* Skills Orbit (Skill) */}
        <div id="skills">
          <SkillsOrbit />
        </div>

        {/* Accolades & Certifications */}
        <Accolades />

        {/* Contact Form */}
        <div id="contact">
          <Contact />
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black/10 py-12 relative">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-lg font-bold text-white">Vinay <span className="text-indigo-400">/&gt;</span></span>
              <p className="text-xs text-muted-foreground mt-1">© {new Date().getFullYear()} Vinay Barrenkula. All rights reserved.</p>
            </div>
            
            <div className="flex gap-6 items-center">
              <span className="text-xs text-muted-foreground">Designing & developing modern MERN web apps.</span>
              <button 
                onClick={scrollToTop} 
                className="p-3 bg-white/5 border border-white/10 hover:border-indigo-500/40 rounded-full hover:glow-accent text-white transition-all duration-300"
              >
                <FiArrowUp size={16} />
              </button>
            </div>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  );
}

export default App;
