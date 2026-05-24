import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import BootSequence from './components/BootSequence';
import CRTOverlay from './components/CRTOverlay';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';

function Footer() {
  return (
    <footer
      id="contact"
      className="px-6 md:px-10 py-12 relative z-10"
      style={{
        borderTop: '1px solid rgba(90,52,16,0.2)',
        background: '#e6ddc8',
        fontFamily: "'VT323', monospace",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Identity */}
        <div>
          <div
            className="mb-1"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(10px, 1.5vw, 18px)',
              color: '#2c1508',
            }}
          >
            SIYONA AGARWAL
          </div>
          <div className="text-base tracking-[0.25em]" style={{ color: '#8c6342' }}>
            AI &amp; SYSTEMS ENGINEER
          </div>
        </div>

        {/* Links */}
        <div className="space-y-1 text-lg" style={{ color: '#5a3410' }}>
          <div>
            &gt;{' '}
            <a href="mailto:siyona272010@gmail.com" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.75 }}>
              siyona272010@gmail.com
            </a>
          </div>
          <div>
            &gt;{' '}
            <a href="tel:+917017307004" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.75 }}>
              +91 70173 07004
            </a>
          </div>
          <div>
            &gt;{' '}
            <a href="https://github.com/Siyona-Agarwal" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.75 }}>
              github.com/Siyona-Agarwal
            </a>
          </div>
          <div>
            &gt;{' '}
            <a href="https://linkedin.com/in/siyona-agarwal" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.75 }}>
              linkedin.com/in/siyona-agarwal
            </a>
          </div>
        </div>

        {/* Resume + copyright */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <a
            href="SiyonaAgarwal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border text-base tracking-widest px-4 py-2 transition-all duration-150"
            style={{ color: '#2c1508', borderColor: 'rgba(90,52,16,0.4)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(90,52,16,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            &gt; DOWNLOAD RESUME _
          </a>
          <div className="text-sm tracking-widest" style={{ color: '#8c6342' }}>
            © 2026 SIYONA AGARWAL
          </div>
        </div>
      </div>
    </footer>
  );
}

function FixedResumeButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="SiyonaAgarwal_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="fixed z-50 border-2 px-4 py-2 text-sm tracking-widest font-bold flex items-center gap-2 transition-all duration-150"
      style={{
        bottom: '2rem',
        right: '2rem',
        fontFamily: "'VT323', monospace",
        fontSize: '1.1rem',
        color: hovered ? '#b8743c' : '#ece5d0',
        backgroundColor: hovered ? 'transparent' : '#b8743c',
        borderColor: '#b8743c',
        boxShadow: hovered ? '0 0 15px rgba(184,116,60,0.5)' : '0 0 8px rgba(184,116,60,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: hovered ? '#b8743c' : '#ece5d0', transition: 'background-color 150ms' }}
      />
      RESUME
    </motion.a>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const handleBoot = useCallback(() => setBooted(true), []);

  return (
    <div style={{ background: '#ece5d0', overflowX: 'clip', minHeight: '100vh' }}>
      <CRTOverlay />
      <FixedResumeButton />

      {!booted && <BootSequence onDone={handleBoot} />}

      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <HeroSection />
          <MarqueeSection />
          <AboutSection />
          <ExperienceSection />
          <ServicesSection />
          <ProjectsSection />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
