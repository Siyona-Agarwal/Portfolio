import { motion } from 'framer-motion';

const SKILLS = [
  {
    cat: 'LANGUAGES',
    items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL'],
  },

  {
    cat: 'ML / AI',
    items: [
      'PyTorch',
      'scikit-learn',
      'NumPy',
      'Pandas',
      'PyCaret',
      'Transformers',
    ],
  },

  {
    cat: 'FRONTEND',
    items: [
      'React',
      'Three.js',
      'Tailwind',
      'Framer Motion',
      'Electron',
      'HTML5/CSS3',
    ],
  },

  {
    cat: 'BACKEND',
    items: [
      'Flask',
      'FastAPI',
      'Node.js',
      'Asyncio',
      'REST APIs',
      'WebSockets',
    ],
  },

  {
    cat: 'DATA & AUTOMATION',
    items: [
      'MongoDB',
      'SQLAlchemy',
      'Playwright',
      'Selenium',
      'Pandas',
      'Regex Pipelines',
    ],
  },

  {
    cat: 'SIMULATION & SYSTEMS',
    items: [
      'OpenFOAM',
      'ParaView',
      'Digital Twins',
      'Monte Carlo Analysis',
      'Simulation IDEs',
    ],
  },
];

const STATS = [
  { k: 'PROJECTS_SHIPPED', v: '5+' },
  { k: 'CGPA', v: '9.35' },
  { k: 'INTERNSHIPS', v: '2' },
  { k: 'STATUS', v: 'OPEN_TO_WORK' },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 px-6 md:px-10"
      style={{ background: '#ece5d0', fontFamily: "'VT323', monospace" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-5 mb-12" style={{ borderBottom: '1px solid rgba(90,52,16,0.18)' }}>
          <div className="text-sm tracking-[0.3em] mb-2" style={{ color: '#8c6342' }}>
            // SECTION_02
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl tracking-tight"
            style={{ color: '#2c1508', fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(16px, 3vw, 42px)' }}
          >
            ABOUT ME
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="text-sm tracking-[0.25em] mb-4" style={{ color: '#8c6342' }}>
              C:\ABOUT\&gt; cat bio.txt
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl md:text-2xl leading-8"
              style={{ color: '#5a3410' }}
            >
              AI/ML engineer and full-stack developer focused on simulation
              systems, predictive maintenance, digital twins, and intelligent
              engineering platforms. I enjoy building technically deep products
              that combine machine learning, visualization, and scalable
              software systems.
            </motion.p>

            {/* Stats */}
            <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(90,52,16,0.15)' }}>
              <div className="text-sm tracking-[0.25em] mb-5" style={{ color: '#8c6342' }}>
                C:\STATS\&gt; query --all
              </div>
              <div className="space-y-3">
                {STATS.map(({ k, v }, i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                    className="flex gap-2 text-xl"
                  >
                    <span style={{ color: '#8c6342', minWidth: 220 }}>{k}</span>
                    <span style={{ color: '#8c6342' }}>:</span>
                    <span style={{ color: '#2c1508', fontWeight: 'bold' }}>{v}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — skill tree */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border p-6 md:p-8"
            style={{ borderColor: 'rgba(90,52,16,0.22)', background: 'rgba(90,52,16,0.03)' }}
          >
            <div className="text-sm tracking-widest mb-6" style={{ color: '#8c6342' }}>
              C:\SKILLS\&gt; dir /s
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {SKILLS.map((g) => (
                <div key={g.cat}>
                  <div className="text-xl tracking-wide mb-1.5" style={{ color: '#2c1508' }}>
                    [ {g.cat} ]
                  </div>
                  <div className="ml-4 space-y-0.5">
                    {g.items.map((item, ii) => (
                      <div key={item} className="text-lg flex gap-2" style={{ color: '#5a3410' }}>
                        <span style={{ color: '#8c6342' }} className="select-none shrink-0">
                          {ii === g.items.length - 1 ? '└──' : '├──'}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-6 pt-4 text-sm tracking-widest"
              style={{ borderTop: '1px solid rgba(90,52,16,0.15)', color: '#8c6342' }}
            >
              &gt; {SKILLS.reduce((a, g) => a + g.items.length, 0)} items found
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
