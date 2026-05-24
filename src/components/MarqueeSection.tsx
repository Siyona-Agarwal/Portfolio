import { motion } from 'framer-motion';

const ITEMS = [
  '◆ CURRENTLY AT THOUGHT2DESIGNS @ IIT DELHI',
  '▶ siyona272010@gmail.com',
  '◆ OPEN TO WORK — 2026',
  '▶ AI & SYSTEMS ENGINEERING',
  '▶ github.com/Siyona-Agarwal',
  '▶ AVAILABLE FOR FULL-TIME ROLES',
];

const DOUBLED = [...ITEMS, ...ITEMS];

export default function MarqueeSection() {
  return (
    <section
      className="overflow-hidden py-3 text-sm tracking-widest"
      style={{
        borderTop: '1px solid rgba(90,52,16,0.2)',
        borderBottom: '1px solid rgba(90,52,16,0.2)',
        background: '#e6ddc8',
        fontFamily: "'VT323', monospace",
      }}
    >
      <motion.div
        className="flex gap-8 shrink-0"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap shrink-0"
            style={{ color: '#5a3410', opacity: i % 2 === 0 ? 0.8 : 0.6 }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
