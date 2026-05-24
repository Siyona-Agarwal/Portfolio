import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

const PROMPT = 'C:\\PORTFOLIO\\> LOADING_SIYONA_AGARWAL...';
// Heading lines typed sequentially
const LINE_A = 'SIYONA';
const LINE_B = 'AGARWAL';
const SUBTITLE = 'AI & SYSTEMS ENGINEER';
const TAGLINE = '> BUILDING SIMULATION PLATFORMS, DIGITAL TWINS, AND INTELLIGENT ENGINEERING SYSTEMS.';

export default function HeroSection() {
  const [step, setStep] = useState(0); // 0=prompt, 1=lineA, 2=lineB, 3=subtitle, 4=done
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  const next = useCallback(() => setStep((s) => s + 1), []);

  return (
    <section
      className="min-h-screen flex flex-col crt-flicker relative"
      style={{ background: '#ece5d0', overflowX: 'clip', zIndex: 40 }}
    >
      {/* ── Navbar ── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          borderBottom: '1px solid rgba(90,52,16,0.2)',
          background: 'rgba(236, 229, 208, 0.85)'
        }}
      >
        <nav className="flex justify-between items-center px-6 md:px-10 py-4">
          {/* Logo */}
          <span
            className="text-xs tracking-widest"
            style={{ fontFamily: "'Press Start 2P', monospace", color: '#2c1508', fontSize: 'clamp(8px,1vw,12px)' }}
          >
            ▶ SIYONA.AGARWAL
          </span>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm tracking-widest">

            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-all duration-150"
                style={{ color: '#5a3410', opacity: 0.7 }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Email me + status */}
          <div className="flex items-center gap-4 text-sm tracking-widest">
            <motion.a
              href="mailto:siyona272010@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="border-2 px-3 py-1 transition-all duration-150 font-bold flex items-center gap-2"
              style={{
                color: isEmailHovered ? '#b8743c' : '#ece5d0',
                backgroundColor: isEmailHovered ? 'transparent' : '#b8743c',
                borderColor: '#b8743c',
                boxShadow: isEmailHovered ? '0 0 15px rgba(184,116,60,0.5)' : '0 0 8px rgba(184,116,60,0.3)',
              }}
              onMouseEnter={() => setIsEmailHovered(true)}
              onMouseLeave={() => setIsEmailHovered(false)}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{
                  backgroundColor: isEmailHovered ? '#b8743c' : '#ece5d0',
                  transition: 'background-color 150ms'
                }}
              />
              EMAIL ME
            </motion.a>
            <span style={{ color: '#8c6342' }}>ONLINE</span>
          </div>
        </nav>
      </motion.header>

      {/* ── Hero body ── */}
      <div className="flex-1 flex flex-col justify-between px-6 md:px-10 pt-24 md:pt-28 pb-8 md:pb-10">

        {/* Loading prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-sm md:text-base tracking-widest mb-6 md:mb-8"
          style={{ color: '#8c6342' }}
        >
          <Typewriter
            text={PROMPT}
            speed={38}
            delay={400}
            cursor={step === 0}
            cursorDone={false}
            onComplete={next}
          />
        </motion.div>

        {/* ── Pixel heading ── */}
        <div className="flex-1 flex flex-col justify-center" style={{ overflow: 'clip' }}>

          {/* Line A: SIYONA */}
          <div
            className="whitespace-nowrap leading-none"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(40px, 11vw, 200px)',
              color: '#2c1508',
              lineHeight: 1.05,
            }}
          >
            {step >= 1 && (
              <Typewriter
                text={LINE_A}
                speed={110}
                delay={0}
                cursor={step === 1}
                cursorDone={false}
                onComplete={next}
              />
            )}
          </div>

          {/* Line B: AGARWAL */}
          <div
            className="whitespace-nowrap leading-none mt-2 md:mt-4"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(40px, 11vw, 200px)',
              color: '#5a3410',
              lineHeight: 1.05,
            }}
          >
            {step >= 2 && (
              <Typewriter
                text={LINE_B}
                speed={110}
                delay={0}
                cursor={step === 2}
                cursorDone={false}
                onComplete={next}
              />
            )}
          </div>

          {/* Subtitle */}
          <div
            className="mt-5 md:mt-7 text-xl md:text-2xl lg:text-3xl tracking-[0.3em]"
            style={{ color: '#8c6342', fontFamily: "'VT323', monospace" }}
          >
            {step >= 3 && (
              <Typewriter
                text={SUBTITLE}
                speed={55}
                delay={0}
                cursor={step === 3}
                cursorDone={false}
                onComplete={next}
              />
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex justify-between items-end mt-8">
          <div
            className="text-base md:text-lg tracking-wide max-w-[260px] md:max-w-[440px] leading-7"
            style={{ color: '#5a3410', opacity: 0.75, fontFamily: "'VT323', monospace" }}
          >
            {step >= 4 && (
              <Typewriter
                text={TAGLINE}
                speed={18}
                delay={120}
                cursor={false}
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
