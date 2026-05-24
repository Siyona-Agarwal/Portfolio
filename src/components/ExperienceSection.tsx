import { motion } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Terminal } from 'lucide-react';

const EXPERIENCES = [
  {
    num: '01',
    dir: 'IIT_DELHI',
    company: 'Thought2Designs System Pvt. Ltd. @ IIT Delhi',
    role: 'Research and Development Intern',
    period: 'Jan 2026 - Present',
    tech: ['Python', 'C++', 'PyTorch', 'React', 'Three.js', 'Electron', 'FastAPI'],
    bullets: [
      'MMFT Microfluidics IDE: Built an interactive, browser-based simulation IDE using Flask and Three.js with OpenFOAM, extending the Munich MMFT engine with stochastic pump simulations and genealogy tracing.',
      'Indian Army Digital Twin: Engineered a bearing failure anomaly pipeline using LSTM, CNN, and Transformer models, developing a physics-informed inference engine for real-time Remaining Useful Life (RUL) prediction.',
      'MSIM IDE Workbench: Architected a cross-platform multi-paradigm simulation modeling suite utilizing Electron, React, and FastAPI with visual drag-and-drop statecharts and dynamic code generation.'
    ]
  },
  {
    num: '02',
    dir: 'GROWTH_NATIVES',
    company: 'Growth Natives',
    role: 'AI/ML Summer Intern',
    period: 'May - July 2025',
    tech: ['Python', 'Flask', 'Playwright', 'MongoDB', 'SQLite', 'PyCaret', 'SQL'],
    bullets: [
      'Email Guessing & Verification Engine: Reconstructed corporate contact lists and unmasked email domains concurrently via Playwright browser context pooling and asyncio.Semaphore task-pooling, boosting speeds by 15x.',
      'Chatbot Cost Mitigation: Engineered a zero-maintenance Flask & SQLite rate-limiting layer with dual-boundary IP and global spending caps, neutralizing competitor LLM quota drains.',
      'ML Media Mix Models: Executed PyCaret Media Mix Modeling pipelines and advanced EDA; certified in professional SQL data warehousing.'
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-20 md:py-28 px-6 md:px-10 border-t border-b"
      style={{ 
        background: '#e6ddc8', 
        fontFamily: "'VT323', monospace",
        borderColor: 'rgba(90,52,16,0.12)' 
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="pb-5 mb-16" style={{ borderBottom: '1px solid rgba(90,52,16,0.18)' }}>
          <div className="text-sm tracking-[0.3em] mb-2" style={{ color: '#8c6342' }}>
            // SECTION_03
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ color: '#2c1508', fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(16px, 3vw, 42px)' }}
          >
            EXPERIENCE
          </motion.h2>
        </div>

        {/* Timeline Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left panel: Prompt & Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="text-sm tracking-[0.2em]" style={{ color: '#8c6342' }}>
              C:\EXPERIENCE\&gt; query --all-jobs
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border p-6"
              style={{ borderColor: 'rgba(90,52,16,0.22)', background: 'rgba(90,52,16,0.03)' }}
            >
              <div className="text-lg font-bold uppercase mb-4 flex items-center gap-2" style={{ color: '#2c1508' }}>
                <Terminal size={18} style={{ color: '#b8743c' }} />
                <span>EXPERIENCE_REPORT</span>
              </div>
              
              <div className="space-y-3.5 text-lg leading-7" style={{ color: '#5a3410' }}>
                <div>
                  <span style={{ color: '#8c6342' }}>TOTAL_ACTIVE_ROLES:</span>
                  <br />
                  <strong className="text-[#2c1508]" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '14px' }}>02 INTERNSHIPS</strong>
                </div>
                <div>
                  <span style={{ color: '#8c6342' }}>CORE_COMPETENCIES:</span>
                  <br />
                  <span className="text-[#2c1508]">AI/ML Engineering, Systems Concurrency, Simulation Platforms, Cost Mitigation Middleware</span>
                </div>
                <div>
                  <span style={{ color: '#8c6342' }}>STATUS:</span>
                  <br />
                  <span className="animate-pulse font-bold text-[#b8743c]">● COMMITTING_CODE</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right panel: Timeline Tree */}
          <div className="lg:col-span-8 space-y-12 relative pl-4 md:pl-8">
            
            {/* Vertical timeline vertical connector */}
            <div 
              className="absolute left-[3px] md:left-[7px] top-6 bottom-6 border-l border-dashed pointer-events-none"
              style={{ borderColor: 'rgba(90,52,16,0.25)' }}
            />

            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative space-y-4"
              >
                {/* Timeline node point */}
                <div 
                  className="absolute -left-[17px] md:-left-[29px] top-1.5 w-3 h-3 border flex items-center justify-center bg-[#e6ddc8] z-10"
                  style={{ borderColor: '#b8743c', color: '#b8743c' }}
                >
                  <div className="w-1.5 h-1.5" style={{ background: '#5a3410' }} />
                </div>

                {/* Directory path */}
                <div className="text-sm tracking-wider flex items-center gap-1.5" style={{ color: '#8c6342' }}>
                  <span>C:\EXPERIENCE\{exp.dir}&gt; cat profile.txt</span>
                </div>

                {/* Main job card */}
                <div 
                  className="border"
                  style={{ 
                    borderColor: 'rgba(90,52,16,0.2)', 
                    background: '#ece5d0'
                  }}
                >
                  {/* Folder Title bar */}
                  <div 
                    className="flex flex-wrap items-center justify-between px-5 py-2 border-b gap-2 text-base select-none"
                    style={{ 
                      background: '#ece5d0', 
                      borderColor: 'rgba(90,52,16,0.15)',
                      color: '#5a3410'
                    }}
                  >
                    <div className="flex items-center gap-2 font-bold" style={{ color: '#2c1508' }}>
                      <Briefcase size={16} style={{ color: '#b8743c' }} />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#8c6342] font-semibold">
                      <Calendar size={14} />
                      <span>[{exp.period}]</span>
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6 md:p-8 space-y-5">
                    
                    {/* Header position title */}
                    <div>
                      <h3 
                        className="text-2xl font-bold tracking-tight uppercase leading-snug"
                        style={{ color: '#2c1508', fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(10px, 1.8vw, 16px)' }}
                      >
                        {exp.role}
                      </h3>
                    </div>

                    {/* Accomplishment bullets */}
                    <div className="space-y-3.5">
                      {exp.bullets.map((bullet, bIdx) => {
                        const parts = bullet.split(':');
                        const projName = parts[0];
                        const projDesc = parts.slice(1).join(':');
                        return (
                          <div key={bIdx} className="text-lg leading-7 flex items-start gap-2.5" style={{ color: '#5a3410' }}>
                            <ChevronRight size={16} className="mt-1 text-[#b8743c] shrink-0" />
                            <p>
                              <strong className="text-[#2c1508] font-bold">{projName}:</strong>
                              {projDesc}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-4 border-t border-dashed flex flex-wrap gap-2" style={{ borderColor: 'rgba(90,52,16,0.15)' }}>
                      {exp.tech.map((t) => (
                        <span 
                          key={t}
                          className="text-base border px-2.5 py-0.5"
                          style={{
                            color: '#8c6342',
                            borderColor: 'rgba(90,52,16,0.3)',
                            background: 'rgba(90,52,16,0.03)'
                          }}
                        >
                          [{t}]
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
