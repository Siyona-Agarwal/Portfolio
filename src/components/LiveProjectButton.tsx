import { motion } from 'framer-motion';

interface LiveProjectButtonProps {
  href?: string;
  label?: string;
}

export default function LiveProjectButton({
  href = 'https://github.com/Siyona-Agarwal',
  label = 'VIEW_PROJECT',
}: LiveProjectButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 border text-base tracking-widest px-4 py-1.5 transition-all duration-150"
      style={{
        fontFamily: "'VT323', monospace",
        color: '#2c1508',
        borderColor: 'rgba(90,52,16,0.4)',
        background: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(90,52,16,0.06)';
        e.currentTarget.style.borderColor = 'rgba(90,52,16,0.7)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'rgba(90,52,16,0.4)';
      }}
    >
      &gt; {label} _
    </motion.a>
  );
}
