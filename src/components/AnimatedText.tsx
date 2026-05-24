import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: 'easeOut' }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
