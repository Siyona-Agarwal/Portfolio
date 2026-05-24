import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';
import CaseStudyModal from './CaseStudyModal';

const GITHUB = 'https://github.com/Siyona-Agarwal';

const PROJECTS = [
  {
    num: '01',
    file: 'GROWJO_ENGINE.exe',
    tag: 'SYSTEMS / ASYNC ENGINE',
    title: 'Growjo Email Guessing & Async Verification Engine',
    desc: 'High-performance full-stack data pipeline designed to reconstruct and verify masked corporate email addresses via concurrent browser automation, DNS MX resolutions, and naming pattern heuristics.',
    stack: ['Python', 'Flask', 'Playwright', 'MongoDB', 'Asyncio', 'DNS/SMTP'],
    href: 'https://github.com/Siyona-Agarwal/Growjo-Email-Guessing-Async-Verification-Engine',
    hasCaseStudy: true,
  },
  {
    num: '02',
    file: 'MMFT_SIMULATOR.exe',
    tag: 'RESEARCH / SIMULATION PLATFORM',
    title: 'MMFT Simulator',
    desc: 'Microfluidics simulation IDE with OpenFOAM integration, Monte Carlo tolerance analysis, ParaView rendering, and interactive 3D visualization.',
    stack: ['Python', 'C++', 'Flask', 'Three.js', 'OpenFOAM'],
    href: GITHUB,
    isProprietary: true,
  },
  {
    num: '03',
    file: 'PREDICTIVE_TWIN.exe',
    tag: 'AI / INDUSTRIAL SYSTEMS',
    title: 'Predictive Maintenance Digital Twin',
    desc: 'Predictive maintenance pipeline using LSTM, CNN, Transformer, and Autoencoder models for industrial bearing fault detection and RUL prediction. Built for Indian Army. Macro F1: 0.97.',
    stack: ['Python', 'PyTorch', 'Flask'],
    href: GITHUB,
    isProprietary: true,
  },
  {
    num: '04',
    file: 'MSIM.exe',
    tag: 'SIMULATION IDE',
    title: 'MSIM',
    desc: 'Cross-platform multi-paradigm simulation IDE for agent-based, system-dynamics, and hybrid simulations with live visualization and code generation.',
    stack: ['TypeScript', 'React', 'Electron', 'FastAPI'],
    href: GITHUB,
    isProprietary: true,
  },
  {
    num: '05',
    file: 'PRAAVINYA.exe',
    tag: 'CAREER PLATFORM',
    title: 'Praavinya- Placement and Career Suite',
    desc: 'Placement and career suite with resume building, job scraping, and student profile management. Best UI/UX award at ACM Student Chapter among 100+ entries.',
    stack: ['Python', 'HTML', 'CSS', 'JavaScript', 'SQLAlchemy'],
    href: GITHUB,
    isProprietary: true,
  },
  {
    num: '06',
    file: 'THEAGGARWALS.exe',
    tag: 'FREELANCE / WEB EXPERIENCE',
    title: 'The Aggarwals',
    desc: 'Designed and developed a modern business website for a real client with responsive UI, premium visual design, and production deployment.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Vercel'],
    href: 'https://theaggarwals.vercel.app',
  },
];

function ProjectCard({ 
  project, 
  index, 
  onReadCaseStudy,
  onShowProprietaryAlert
}: { 
  project: typeof PROJECTS[0]; 
  index: number; 
  onReadCaseStudy?: () => void; 
  onShowProprietaryAlert?: () => void;
}) {
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = isDesktop
    ? useTransform(scrollYProgress, [0, 0.35], [0.92, 1])
    : 1;
  const opacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        position: 'sticky',
        top: `calc(var(--sticky-top, 20px) + ${index * 36}px)`,
        zIndex: index + 1,
        background: '#ece5d0',
      }}
      className="mb-6 border relative after:absolute after:inset-x-0 after:top-[calc(100%-1px)] after:h-[200vh] after:bg-[#ece5d0] after:z-[-1] after:content-['']"
      id={index === 2 ? 'projects' : undefined}
    >
      {/* Terminal title bar */}
      <div
        className="flex items-center gap-3 px-5 h-9 text-sm tracking-widest"
        style={{
          borderBottom: '1px solid rgba(113, 93, 74, 0.2)',
          background: '#e6ddc8',
          fontFamily: "'VT323', monospace",
          color: '#5a3410',
        }}
      >
        <span style={{ color: '#8c6342' }}>[ {project.num} ]</span>
        <span className="truncate" style={{ color: '#2c1508' }}>{project.file}</span>
        <span
          className="ml-auto hidden sm:inline truncate"
          style={{
            color:
              project.tag === 'FREELANCE / WEB EXPERIENCE'
                ? '#b8743c'
                : '#8c6342',
          }}
        >
          {project.tag}
        </span>
      </div>

      {/* Card body */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ background: '#ece5d0', minHeight: 380, borderColor: 'rgba(90,52,16,0.2)' }}
      >
        {/* Left: info */}
        <div
          className="flex flex-col justify-between p-7 md:p-10"
          style={{ borderRight: '1px solid rgba(90,52,16,0.15)', fontFamily: "'VT323', monospace" }}
        >
          <div>
            <h3
              className="text-2xl md:text-3xl tracking-tight mb-4 leading-snug"
              style={{ color: '#2c1508', fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(12px, 2vw, 26px)' }}
            >
              <>
                {project.title}

                {project.tag === 'FREELANCE / WEB EXPERIENCE' && (
                  <span
                    style={{
                      display: 'block',
                      marginTop: '12px',
                      color: '#b8743c',
                      fontSize: '12px',
                      fontFamily: "'VT323', monospace",
                      letterSpacing: '0.2em',
                    }}
                  >
                    [ CLIENT_WORK ]
                  </span>
                )}
              </>
            </h3>
            <div>
              <p
                className="text-xl leading-8"
                style={{ color: '#5a3410', opacity: 0.8 }}
              >
                {project.desc}
              </p>

              {project.tag === 'FREELANCE / WEB EXPERIENCE' && (
                <div
                  className="mt-5 text-lg tracking-wider"
                  style={{ color: '#b8743c' }}
                >
                  DEPLOYED AT:
                  <br />
                  theaggarwals.vercel.app
                </div>
              )}
            </div>
          </div>
          <div className="mt-8">
            {/* Stack badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="text-base tracking-wider border px-3 py-0.5"
                  style={{ color: '#5a3410', borderColor: 'rgba(90,52,16,0.3)', background: 'rgba(90,52,16,0.04)' }}
                >
                  [{t}]
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {project.isProprietary ? (
                <motion.button
                  onClick={onShowProprietaryAlert}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border text-base tracking-widest px-4 py-1.5 transition-all duration-150 font-bold"
                  style={{
                    fontFamily: "'VT323', monospace",
                    color: '#8c6342',
                    borderColor: 'rgba(90,52,16,0.35)',
                    background: 'rgba(90,52,16,0.02)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(90,52,16,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(90,52,16,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(90,52,16,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(90,52,16,0.35)';
                  }}
                >
                  &gt; PROPRIETARY_IP _
                </motion.button>
              ) : (
                <LiveProjectButton href={project.href} label={project.hasCaseStudy ? 'VIEW_GITHUB' : 'VIEW_PROJECT'} />
              )}
              {project.hasCaseStudy && (
                <motion.button
                  onClick={onReadCaseStudy}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border text-base tracking-widest px-4 py-1.5 transition-all duration-150 font-bold"
                  style={{
                    fontFamily: "'VT323', monospace",
                    color: '#ece5d0',
                    borderColor: '#b8743c',
                    background: '#b8743c',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#2c1508';
                    e.currentTarget.style.borderColor = 'rgba(90,52,16,0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#b8743c';
                    e.currentTarget.style.color = '#ece5d0';
                    e.currentTarget.style.borderColor = '#b8743c';
                  }}
                >
                  &gt; READ_CASE_STUDY _
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Right: terminal decoration */}
        <div
          className="hidden md:flex items-center justify-center p-8"
          style={{ background: '#e6ddc8' }}
        >
          <div
            className="w-full text-base leading-8 tracking-wide"
            style={{ fontFamily: "'VT323', monospace", color: '#8c6342' }}
          >
            <div style={{ color: '#5a3410' }}>C:\PROJECTS\{project.num}\&gt; run {project.file}</div>
            {project.isProprietary ? (
              <>
                <div className="mt-3 animate-pulse" style={{ color: '#b8743c' }}>ACCESS CHECK............... RESTRICTED</div>
                <div style={{ color: '#b8743c' }}>IP PROTECTION.............. ACTIVE [NDA]</div>
                <div style={{ color: '#b8743c' }}>SOURCE_CODE_BLOCKED........ OK</div>
                <div className="mt-3" style={{ color: '#2c1508' }}>
                  STATUS: SECURED PROPRIETARY IP
                </div>
              </>
            ) : (
              <>
                <div className="mt-3">LOADING MODULES............ OK</div>
                <div>INITIALIZING ENV........... OK</div>
                <div>COMPILING ASSETS........... OK</div>
                <div className="mt-3" style={{ color: '#2c1508' }}>
                  {project.tag === 'FREELANCE / WEB EXPERIENCE'
                    ? 'STATUS: LIVE IN PRODUCTION'
                    : 'STATUS: RUNNING'}
                </div>
              </>
            )}
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(90,52,16,0.15)' }}>
              {project.stack.map((s) => (
                <div key={s}>&gt; {s.toUpperCase()}_MODULE ........ ACTIVE</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proprietaryAlertProject, setProprietaryAlertProject] = useState<any | null>(null);

  return (
    <section
      id="projects"
      className="py-20 md:py-28 px-6 md:px-10"
      style={{ background: '#ece5d0', fontFamily: "'VT323', monospace" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-5 mb-16" style={{ borderBottom: '1px solid rgba(90,52,16,0.18)' }}>
          <div className="text-sm tracking-[0.3em] mb-2" style={{ color: '#8c6342' }}>
            // SECTION_04
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ color: '#2c1508', fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(16px, 3vw, 42px)' }}
          >
            PROJECTS
          </motion.h2>
        </div>

        <>
          {PROJECTS.map((p, i) => (
            <ProjectCard 
              key={p.num} 
              project={p} 
              index={i} 
              onReadCaseStudy={p.hasCaseStudy ? () => setIsModalOpen(true) : undefined}
              onShowProprietaryAlert={p.isProprietary ? () => setProprietaryAlertProject(p) : undefined}
            />
          ))}

          {/* Spacer for final sticky card */}
          <div className="h-[60vh]" />
        </>
      </div>

      <CaseStudyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Proprietary IP Alert Modal */}
      <AnimatePresence>
        {proprietaryAlertProject && (
          <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/45 backdrop-blur-[1.5px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg border p-6 shadow-2xl relative"
              style={{
                borderColor: '#b8743c',
                background: '#ece5d0',
                fontFamily: "'VT323', monospace",
              }}
            >
              {/* Double border inside */}
              <div 
                className="absolute inset-[3px] pointer-events-none border border-dashed" 
                style={{ borderColor: 'rgba(184,116,60,0.3)' }}
              />

              {/* Alert Header */}
              <div className="text-center font-bold text-xl uppercase mb-4 text-[#b8743c]" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px' }}>
                ◀ SYSTEM PROTECTION ALERT ▶
              </div>

              {/* Body */}
              <div className="space-y-4 text-lg leading-7 p-4 border" style={{ borderColor: 'rgba(90,52,16,0.18)', background: 'rgba(90,52,16,0.02)' }}>
                <div className="text-center font-bold text-[#2c1508] uppercase text-xl">
                  ACCESS RESTRICTED: SECURED IP
                </div>
                
                <p style={{ color: '#5a3410' }}>
                  The source files and deployment endpoints for <strong className="text-[#2c1508]">{proprietaryAlertProject.title}</strong> ({proprietaryAlertProject.file}) are proprietary intellectual property bound under active Non-Disclosure Agreements (NDA).
                </p>

                <p style={{ color: '#5a3410' }}>
                  To respect corporate privacy and client copyright guidelines, Siyona does not publicly distribute these codebases.
                </p>
                
                <div className="pt-2 border-t border-dashed" style={{ borderColor: 'rgba(90,52,16,0.15)' }}>
                  <strong className="text-[#2c1508]">Technical Deep-Dive:</strong>
                  <br />
                  System architecture, physics-informed ML features, and software modularity details are available during technical interview briefs.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={() => setProprietaryAlertProject(null)}
                  className="flex-1 text-center border font-bold text-lg tracking-widest px-4 py-2.5 transition-all duration-150"
                  style={{
                    color: '#ece5d0',
                    borderColor: '#b8743c',
                    background: '#b8743c',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#2c1508';
                    e.currentTarget.style.borderColor = 'rgba(90,52,16,0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#b8743c';
                    e.currentTarget.style.color = '#ece5d0';
                    e.currentTarget.style.borderColor = '#b8743c';
                  }}
                >
                  &gt; REQUEST_DEEP_DIVE _
                </a>
                <button
                  onClick={() => setProprietaryAlertProject(null)}
                  className="flex-1 border font-bold text-lg tracking-widest px-4 py-2.5 transition-all duration-150"
                  style={{
                    color: '#2c1508',
                    borderColor: 'rgba(90,52,16,0.4)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(90,52,16,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(90,52,16,0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(90,52,16,0.4)';
                  }}
                >
                  &gt; CLOSE_ALERT _
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
