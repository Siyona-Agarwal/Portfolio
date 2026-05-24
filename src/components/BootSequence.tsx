import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const LINES: { text: string; delay: number; bright?: boolean; ok?: boolean }[] = [
  { text: 'PORTFOLIO OS v2026.1 — SIYONA AGARWAL', delay: 0, bright: true },
  { text: 'RAM CHECK... 640K OK', delay: 220 },
  { text: 'LOADING AI MODULES...', delay: 440 },
  { text: '', delay: 600 },
  { text: 'AI_ML_ENGINE.EXE .......... OK', delay: 820, ok: true },
  { text: 'GROWJO_ENGINE.EXE ......... OK', delay: 1200, ok: true },
  { text: 'SIMULATION_CORE.EXE ....... OK', delay: 1580, ok: true },
  { text: 'DIGITAL_TWIN.EXE .......... OK', delay: 1960, ok: true },
  { text: 'PORTFOLIO_DB.EXE .......... OK', delay: 2340, ok: true },
  { text: 'NEURAL_WEIGHTS.EXE ........ OK', delay: 2720, ok: true },
  { text: '', delay: 3080 },
  { text: 'SYSTEM READY.', delay: 3280, bright: true },
  { text: 'WELCOME, ENGINEER.', delay: 3660, bright: true },
];

const AUTO_MS = 12000;

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<typeof LINES>([]);
  const [showCta, setShowCta] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleDone = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onDone, 380);
  }, [exiting, onDone]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((line) =>
      timers.push(setTimeout(() => setLines((p) => [...p, line]), line.delay)),
    );
    timers.push(setTimeout(() => setShowCta(true), 4100));
    timers.push(setTimeout(handleDone, AUTO_MS));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fn = () => { if (showCta) handleDone(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [showCta, handleDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none"
      style={{ background: '#ece5d0', fontFamily: "'VT323', monospace" }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.35 }}
      onClick={() => {
        if (showCta) handleDone();
      }}
    >
      {/* Title */}
      <div className="mb-8 text-center">
        <div
          className="text-2xl md:text-3xl tracking-widest mb-1"
          style={{ fontFamily: "'Press Start 2P', monospace", color: '#2c1508' }}
        >
          SIYONA.AGARWAL
        </div>
        <div className="text-base tracking-[0.3em]" style={{ color: '#8c6342' }}>
          AI &amp; SYSTEMS ENGINEER
        </div>
      </div>

      {/* Boot lines */}
      <div className="w-full max-w-lg px-8">
        {lines.map((line, i) => (
          <div
            key={i}
            className="text-base leading-8"
            style={{ color: line.bright ? '#2c1508' : '#5a3410' }}
          >
            {line.ok ? (
              <>
                {line.text.replace('OK', '')}
                <span style={{ color: '#2c1508', fontWeight: 'bold' }}>OK</span>
              </>
            ) : (
              line.text || ' '
            )}
          </div>
        ))}

        {showCta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-sm tracking-widest"
            style={{ color: '#8c6342', animation: 'cursor-blink 1s steps(1) infinite' }}
          >
            ▶ CLICK OR PRESS ANY KEY TO CONTINUE_
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
