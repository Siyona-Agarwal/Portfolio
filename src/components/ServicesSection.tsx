import { motion } from 'framer-motion';

const SERVICES = [
  {
    num: '01',
    key: 'SIMULATION_PLATFORMS',
    desc: 'Interactive engineering and scientific simulation systems with visualization, analysis, and real-time execution pipelines.',
  },
  {
    num: '02',
    key: 'AI_PREDICTIVE_SYSTEMS',
    desc: 'Machine learning pipelines for anomaly detection, predictive maintenance, classification, and intelligent automation.',
  },
  {
    num: '03',
    key: 'FULL_STACK_ENGINEERING',
    desc: 'Scalable backend systems, APIs, dashboards, and modern web applications using Python, React, Flask, and FastAPI.',
  },
  {
    num: '04',
    key: 'VISUALIZATION_3D',
    desc: 'Real-time dashboards, Three.js visualizations, node-based editors, and interactive engineering interfaces.',
  },
  {
    num: '05',
    key: 'RESEARCH_PROTOTYPING',
    desc: 'Rapid experimentation and development of technically complex systems combining ML, simulation, and data engineering.',
  },
  {
  num: '06',
  key: 'FREELANCE_WEB_EXPERIENCE',
  desc: 'Designing and developing modern production-ready websites for real clients with responsive UI, premium aesthetics, and deployment-ready frontend systems.',
},
  
];

export default function ServicesSection() {
  return (
    <section
      id="skills"
      className="py-20 md:py-28 px-6 md:px-10"
      style={{ background: '#e6ddc8', fontFamily: "'VT323', monospace" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-5 mb-12" style={{ borderBottom: '1px solid rgba(90,52,16,0.18)' }}>
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
            WHAT I BUILD
          </motion.h2>
        </div>

        <div style={{ borderTop: '1px solid rgba(90,52,16,0.12)' }}>
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex flex-col md:flex-row md:items-start gap-3 md:gap-10 py-6 cursor-default transition-all duration-150"
              style={{ borderBottom: '1px solid rgba(90,52,16,0.12)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(90,52,16,0.03)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <span className="text-sm shrink-0 pt-0.5" style={{ color: '#8c6342' }}>
                {svc.num}/
              </span>
              <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-10 flex-1">
                <h3
                  className="text-xl shrink-0 md:w-72 tracking-wide"
                  style={{ color: '#2c1508' }}
                >
                  {svc.key}
                </h3>
                <p className="text-xl leading-7" style={{ color: '#5a3410', opacity: 0.7 }}>
                  {svc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-5 text-sm tracking-[0.25em]"
          style={{ color: '#8c6342' }}
        >
          &gt; {SERVICES.length} services registered
        </motion.div>
      </div>
    </section>
  );
}
