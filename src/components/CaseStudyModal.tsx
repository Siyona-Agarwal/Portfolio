import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Terminal, Monitor, RefreshCw, Layers } from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TABS = [
  { id: 0, label: '0: DASHBOARD VIEW' },
  { id: 1, label: '1: INTERACTIVE SIMULATOR' },
];

const GALLERY_STEPS = [
  {
    id: 'raw',
    label: 'PHASE 1: RAW INPUT SHEET',
    img: '/growjo_raw.png',
    title: 'RAW ENTERPRISE CONTACTS CSV (INPUT)',
    desc: 'The starting pipeline data. Corporate lists contain unstructured names, titles, and masked email strings (e.g. c***********@gfsmith.com). Clean RegEx engines parse them prior to guessing.',
    specs: [
      { k: 'COLUMNS_FOUND', v: 'id, company_name, name, title, reveal_email_link, email, linkedin' },
      { k: 'RAW_MASK_STATE', v: 'MASKED (* Symbols)' },
      { k: 'BOTTLENECK', v: 'Unclean structures, initials & suffixes' }
    ]
  },
  {
    id: 'dash',
    label: 'PHASE 2: BATCH INTERFACE',
    img: '/growjo_dashboard.png',
    title: 'GROWJO BULK VERIFICATION INTERFACE',
    desc: 'Your custom web control panel. Integrates drag-and-drop file ingestion, dynamic loading feedback streams, and optimized parameters. Splices contacts into concurrent CPU & network queues.',
    specs: [
      { k: 'INGESTION_TYPE', v: 'Bulk CSV drag-and-drop' },
      { k: 'STEALTH_BYPASS', v: 'Chrome headshell & custom bypass agents' },
      { k: 'QUEUE_METRIC', v: 'Parallel worker context pool (asyncio)' }
    ]
  },
  {
    id: 'verified',
    label: 'PHASE 3: VERIFIED RESULTS',
    img: '/growjo_verified.png',
    title: 'VERIFIED CORPORATE EMAIL DOWNLOAD (OUTPUT)',
    desc: 'The final resolved CSV payload. Scheme popularity maps unmask variables, threadpooled MX queries determine provider hosts, and Playwright worker nodes verify active inboxes (e.g. oumaymah@gadventures.com).',
    specs: [
      { k: 'VERIFICATION_RATE', v: 'Google / Microsoft Sign-in checks' },
      { k: 'OUTPUT_FILE_TYPE', v: 'Session-filtered CSV download' },
      { k: 'AVERAGE_SPEED', v: '0.48 seconds per row (15x boost)' }
    ]
  }
];

interface LogLine {
  text: string;
  type: 'info' | 'success' | 'warn' | 'result' | 'cmd';
  delay: number;
}

export default function CaseStudyModal({ isOpen, onClose }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [galleryStep, setGalleryStep] = useState('raw');
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Active step computed globally
  const currentStep = GALLERY_STEPS.find((s) => s.id === galleryStep) || GALLERY_STEPS[0];

  // Simulator State
  const [firstName, setFirstName] = useState('Siyona');
  const [lastName, setLastName] = useState('Agarwal');
  const [domain, setDomain] = useState('google.com');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<LogLine[]>([]);
  const [visibleLogCount, setVisibleLogCount] = useState(0);
  const [finalEmail, setFinalEmail] = useState('');
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Close on Esc, Switch tabs with 0-1 keypresses
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === '0') {
        setActiveTab(0);
      } else if (e.key === '1') {
        setActiveTab(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    modalRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isZoomed]);

  // Scroll simulator log to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [visibleLogCount, simLogs]);

  if (!isOpen) return null;

  // Run timed simulation sequence
  const startSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setVisibleLogCount(0);

    const emailPrefix = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const generatedEmail = `${emailPrefix}@${domain.toLowerCase()}`;
    setFinalEmail(generatedEmail);

    const isGoogle = domain.toLowerCase().includes('google') || domain.toLowerCase().includes('gmail');
    const isMicrosoft = domain.toLowerCase().includes('microsoft') || domain.toLowerCase().includes('outlook') || domain.toLowerCase().includes('exchange');
    const provider = isGoogle ? 'Google Workspace Gateway' : isMicrosoft ? 'Microsoft Exchange Hub' : 'SMTP SMTP/IMAP Server';
    const providerHost = isGoogle ? `aspmx.l.google.com` : isMicrosoft ? `mail.protection.outlook.com` : `mail.${domain.toLowerCase()}`;

    // Timed pipeline logs sequence
    const logs: LogLine[] = [
      { text: `C:\\GROWJO\\ENGINE> run --first="${firstName}" --last="${lastName}" --domain="${domain}"`, type: 'cmd', delay: 100 },
      { text: '[0.05s] EXTRACTING DATA FROM MONGODB BATCH............ OK', type: 'info', delay: 350 },
      { text: `        Name Cleaned: ${firstName} ${lastName}`, type: 'info', delay: 600 },
      { text: `        Corporate Domain: ${domain}`, type: 'info', delay: 850 },
      { text: '[0.28s] PIPELINING REGEX NAME CLEANSER................... OK', type: 'info', delay: 1100 },
      { text: '        Applying cleansing heuristics... standardizing raw letters...', type: 'info', delay: 1350 },
      { text: `        Cleansed values: fn=${firstName.toLowerCase()} | ln=${lastName.toLowerCase()}`, type: 'info', delay: 1600 },
      { text: '[0.54s] SOLVING MASKED PATTERN HEURISTICS............... MATCHED', type: 'success', delay: 1850 },
      { text: `        Loading schema popularity for ${domain}...`, type: 'info', delay: 2100 },
      { text: '        Identified corporate schemes: first.last (87% popular) | finitial_last (10%)', type: 'info', delay: 2350 },
      { text: `        Prioritizing first synthesized format: "${generatedEmail}"`, type: 'info', delay: 2600 },
      { text: '[0.82s] NON-BLOCKING CONCURRENT DNS MX RESOLUTION....... RESOLVED', type: 'success', delay: 2850 },
      { text: `        Delegating MX lookup to asyncio.to_thread pool...`, type: 'info', delay: 3100 },
      { text: `        MX records resolved: ${providerHost} | Platform: ${provider}`, type: 'info', delay: 3350 },
      { text: '[1.15s] INITIATING CONCURRENT PLAYWRIGHT WORKERS......... POOL_ACTIVE', type: 'info', delay: 3650 },
      { text: '        Chromium process pooled... spawning lightweight tab contexts...', type: 'info', delay: 3950 },
      { text: '        Stealth bypass active: User-Agent spoofing & anti-bot cookies injected...', type: 'info', delay: 4250 },
      { text: `        Linux Snap self-healing path verified: using targeted sandboxed shell...`, type: 'info', delay: 4550 },
      { text: `[1.68s] RUNNING SIGN-IN GATEWAY CHALLENGE FLOWS.......... SUCCESS`, type: 'success', delay: 4950 },
      { text: `        Simulating login handshake protocol on ${provider}...`, type: 'info', delay: 5250 },
      { text: `        DOM event: wait_for_selector('input[type="email"]') ... INTERACTED`, type: 'info', delay: 5550 },
      { text: '        DOM event: validating mailbox status indicators... VERIFIED ACTIVE', type: 'info', delay: 5850 },
      { text: '[2.15s] SYNCHRONIZING TO GLOBAL VERIFICATION CACHE....... COMMITTED', type: 'info', delay: 6150 },
      { text: `        Saved entry: ${generatedEmail} -> STATUS_VERIFIED`, type: 'info', delay: 6450 },
      { text: '[2.38s] CSV SESSION-FILTERED EXPORT GENERATED........... SUCCESS', type: 'success', delay: 6700 },
      { text: 'BATCH PIPELINE COMPLETED IN 2.38s (equivalent sequential bypass: 15.4s)', type: 'result', delay: 7000 },
    ];

    setSimLogs(logs);

    // Timed display loops
    logs.forEach((log, index) => {
      setTimeout(() => {
        setVisibleLogCount((prev) => prev + 1);
        if (index === logs.length - 1) {
          setIsSimulating(false);
        }
      }, log.delay);
    });
  };

  const loadDemo = (first: string, last: string, dom: string) => {
    if (isSimulating) return;
    setFirstName(first);
    setLastName(last);
    setDomain(dom);
    setSimLogs([]);
    setVisibleLogCount(0);
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/45 backdrop-blur-[1.5px]">
      {/* Main retro dashboard window */}
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-4xl h-[90vh] md:h-[82vh] flex flex-col border shadow-2xl relative outline-none"
        style={{
          borderColor: '#5a3410',
          background: '#ece5d0',
          fontFamily: "'VT323', monospace",
        }}
      >
        {/* Double Border Frame decoration */}
        <div
          className="absolute inset-[3px] pointer-events-none border border-dashed"
          style={{ borderColor: 'rgba(90, 52, 16, 0.25)' }}
        />

        {/* Console Title Header */}
        <div
          className="flex items-center justify-between px-4 h-10 border-b select-none shrink-0"
          style={{
            borderColor: 'rgba(90,52,16,0.2)',
            background: '#e6ddc8',
          }}
        >
          <div className="flex items-center gap-2 text-lg font-bold min-w-0" style={{ color: '#2c1508' }}>
            <Terminal size={18} className="shrink-0" style={{ color: '#b8743c' }} />
            <span className="truncate">C:\PROJECTS\GROWJO_ENGINE\WORKING_DEMO.EXE</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-0.5 border text-base tracking-widest transition-all shrink-0"
            style={{
              color: '#2c1508',
              borderColor: 'rgba(90,52,16,0.3)',
              background: 'rgba(90,52,16,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(90,52,16,0.1)';
              e.currentTarget.style.borderColor = 'rgba(90,52,16,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(90,52,16,0.04)';
              e.currentTarget.style.borderColor = 'rgba(90,52,16,0.3)';
            }}
          >
            [ESC] <X size={15} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          className="flex flex-wrap border-b shrink-0 text-lg tracking-wider"
          style={{ borderColor: 'rgba(90,52,16,0.15)', background: '#ece5d0' }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-5 py-2.5 border-r font-bold transition-all flex items-center gap-1.5"
                style={{
                  borderColor: 'rgba(90,52,16,0.15)',
                  background: isActive ? '#5a3410' : 'transparent',
                  color: isActive ? '#ece5d0' : '#8c6342',
                }}
              >
                {isActive && <span className="text-[#b8743c]">&gt;</span>}
                {tab.label}
              </button>
            );
          })}

          <div className="ml-auto hidden md:flex items-center gap-2 px-4 text-base" style={{ color: '#8c6342' }}>
            <span>TABS: [0] &amp; [1]_</span>
          </div>
        </div>

        {/* Modal Scrollable Panels */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
          
          {/* TAB 0: CHRONOLOGICAL WORKFLOW GALLERY */}
          {activeTab === 0 && (
            <div className="space-y-6">
                
                {/* Visual Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#2c1508' }}>
                      <Monitor size={20} style={{ color: '#b8743c' }} />
                      GROWJO DATA PIPELINE WORKFLOW GALLERY
                    </h3>
                    <p className="text-xl leading-6" style={{ color: '#8c6342' }}>
                      Select a phase below to inspect raw inputs, control interfaces, and resolved unmasked outputs.
                    </p>
                  </div>
                </div>

                {/* Sub-gallery navigation toggles */}
                <div 
                  className="flex flex-col sm:flex-row border p-1 rounded-sm text-lg font-bold shrink-0"
                  style={{ borderColor: 'rgba(90,52,16,0.18)', background: 'rgba(90,52,16,0.02)' }}
                >
                  {GALLERY_STEPS.map((step) => {
                    const isCurrent = galleryStep === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setGalleryStep(step.id)}
                        className="flex-1 py-2 px-4 transition-all duration-150 select-none text-center"
                        style={{
                          background: isCurrent ? '#5a3410' : 'transparent',
                          color: isCurrent ? '#ece5d0' : '#8c6342',
                        }}
                      >
                        {step.label}
                      </button>
                    );
                  })}
                </div>

                {/* Picture Monitor & Description Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  
                  {/* Visual Monitor (Dashboard/Spreadsheet Image) */}
                  <div 
                    className="md:col-span-2 border p-3 bg-black/5" 
                    style={{ borderColor: 'rgba(90,52,16,0.2)' }}
                  >
                    <div 
                      onClick={() => setIsZoomed(true)}
                      className="relative group overflow-hidden border cursor-zoom-in" 
                      style={{ borderColor: 'rgba(90,52,16,0.15)' }}
                    >
                      {/* Screen reflection overlay - ONLY for dark dashboard */}
                      {currentStep.id === 'dash' && (
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-30 z-20" />
                      )}
                      
                      {/* The screenshot */}
                      <img 
                        src={currentStep.img} 
                        alt={currentStep.title} 
                        className="w-full h-auto object-cover rounded-sm select-none"
                      />
                    </div>
                    <div className="text-center text-base tracking-wider mt-2.5" style={{ color: '#8c6342' }}>
                      * 🔍 CLICK PREVIEW IMAGE TO ZOOM IN / ENLARGE _ *
                    </div>
                  </div>

                  {/* Dashboard Specs Terminal */}
                  <div 
                    className="border p-5 md:p-6 space-y-4"
                    style={{
                      borderColor: 'rgba(90,52,16,0.22)',
                      background: 'rgba(90,52,16,0.03)',
                    }}
                  >
                    <div className="text-base font-bold tracking-widest" style={{ color: '#b8743c' }}>
                      [ PIPELINE_PHASE_INFO ]
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold uppercase mb-1" style={{ color: '#2c1508' }}>
                          {currentStep.title}
                        </h4>
                        <p className="text-base leading-6" style={{ color: '#5a3410' }}>
                          {currentStep.desc}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-dashed" style={{ borderColor: 'rgba(90,52,16,0.15)' }}>
                        <div className="text-base font-bold tracking-wider mb-2" style={{ color: '#8c6342' }}>
                          TELEMETRY &amp; METADATA:
                        </div>
                        <div className="space-y-2">
                          {currentStep.specs.map((spec) => (
                            <div key={spec.k} className="text-base">
                              <span style={{ color: '#8c6342' }}>{spec.k}</span>
                              <br />
                              <span style={{ color: '#2c1508', fontWeight: 'bold' }}>&gt; {spec.v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
          )}

          {/* TAB 1: INTERACTIVE PIPELINE SIMULATOR */}
          {activeTab === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ color: '#2c1508' }}>
                  <Layers size={20} style={{ color: '#b8743c' }} />
                  BATCH PIPELINE RUNNER SIMULATOR
                </h3>
                <p className="text-xl leading-6" style={{ color: '#8c6342' }}>
                  Type in corporate credentials below to see the naming heuristics, MX resolving, and Playwright verification workers execute predictions!
                </p>
              </div>

              {/* Simulator Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                
                {/* Left: Input Console */}
                <div 
                  className="border p-5 flex flex-col justify-between"
                  style={{
                    borderColor: 'rgba(90,52,16,0.2)',
                    background: '#e6ddc8',
                  }}
                >
                  <div className="space-y-4">
                    <div className="text-base font-bold tracking-widest pb-2 border-b" style={{ color: '#5a3410', borderColor: 'rgba(90,52,16,0.15)' }}>
                      [ CREDENTIAL_ENTRY ]
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-base tracking-wide uppercase mb-1 font-bold" style={{ color: '#2c1508' }}>FIRST_NAME:</label>
                        <input 
                          type="text" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                          disabled={isSimulating}
                          className="w-full border px-3 py-1.5 text-lg select-all outline-none"
                          style={{
                            background: '#ece5d0',
                            borderColor: 'rgba(90,52,16,0.3)',
                            color: '#2c1508'
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-base tracking-wide uppercase mb-1 font-bold" style={{ color: '#2c1508' }}>LAST_NAME:</label>
                        <input 
                          type="text" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                          disabled={isSimulating}
                          className="w-full border px-3 py-1.5 text-lg select-all outline-none"
                          style={{
                            background: '#ece5d0',
                            borderColor: 'rgba(90,52,16,0.3)',
                            color: '#2c1508'
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-base tracking-wide uppercase mb-1 font-bold" style={{ color: '#2c1508' }}>TARGET_DOMAIN:</label>
                        <input 
                          type="text" 
                          value={domain} 
                          onChange={(e) => setDomain(e.target.value.toLowerCase().replace(/[^a-z0-9.-]/g, ''))}
                          disabled={isSimulating}
                          className="w-full border px-3 py-1.5 text-lg select-all outline-none"
                          style={{
                            background: '#ece5d0',
                            borderColor: 'rgba(90,52,16,0.3)',
                            color: '#2c1508'
                          }}
                        />
                      </div>
                    </div>

                    {/* Quick Demos */}
                    <div className="pt-2">
                      <span className="block text-sm tracking-widest uppercase mb-1.5" style={{ color: '#8c6342' }}>PRE-CONFIGURED TEMPLATES:</span>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => loadDemo('Jane', 'Doe', 'microsoft.com')}
                          disabled={isSimulating}
                          className="text-base border px-2 py-0.5"
                          style={{ borderColor: 'rgba(90,52,16,0.3)', background: 'rgba(90,52,16,0.03)', color: '#5a3410' }}
                        >
                          [J.DOE_MSFT]
                        </button>
                        <button 
                          onClick={() => loadDemo('Elon', 'Musk', 'tesla.com')}
                          disabled={isSimulating}
                          className="text-base border px-2 py-0.5"
                          style={{ borderColor: 'rgba(90,52,16,0.3)', background: 'rgba(90,52,16,0.03)', color: '#5a3410' }}
                        >
                          [E.MUSK_TSLA]
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={startSimulation}
                    disabled={isSimulating || !firstName || !lastName || !domain}
                    className="w-full mt-6 flex items-center justify-center gap-2 border text-lg tracking-widest py-2.5 transition-all select-none font-bold"
                    style={{
                      color: isSimulating ? '#8c6342' : '#ece5d0',
                      borderColor: isSimulating ? 'rgba(90,52,16,0.2)' : '#b8743c',
                      background: isSimulating ? 'rgba(90,52,16,0.05)' : '#b8743c',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSimulating) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#2c1508';
                        e.currentTarget.style.borderColor = 'rgba(90,52,16,0.7)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSimulating) {
                        e.currentTarget.style.background = '#b8743c';
                        e.currentTarget.style.color = '#ece5d0';
                        e.currentTarget.style.borderColor = '#b8743c';
                      }
                    }}
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw className="animate-spin" size={18} />
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>RUN_VERIFICATION _</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Right: Live Terminal Logs */}
                <div className="md:col-span-2 flex flex-col border min-h-[300px]" style={{ borderColor: 'rgba(90,52,16,0.25)' }}>
                  {/* Terminal Screen Header */}
                  <div 
                    className="px-4 py-1.5 text-base border-b flex justify-between select-none"
                    style={{ background: '#e6ddc8', borderColor: 'rgba(90,52,16,0.18)', color: '#5a3410' }}
                  >
                    <span>GROWJO_TERM_VT100 (ONLINE)</span>
                    <span className={isSimulating ? 'animate-pulse text-[#b8743c]' : ''}>
                      {isSimulating ? '● BUSY_RUNNING' : '○ IDLE_AWAITING'}
                    </span>
                  </div>

                  {/* Terminal Display */}
                  <div 
                    ref={logContainerRef}
                    className="flex-1 p-4 bg-black/90 font-mono text-base leading-6 overflow-y-auto max-h-[320px] select-text"
                    style={{ color: '#c4a482', fontFamily: "'Courier New', Courier, monospace" }}
                  >
                    {simLogs.length === 0 && (
                      <div className="text-center py-10 opacity-50 space-y-1.5" style={{ color: '#8c6342' }}>
                        <div>-- SYSTEM CONSOLE OFFLINE --</div>
                        <div className="text-xs">ENTER DATA AND CLICK [RUN_VERIFICATION] ABOVE TO COMMENCE TESTING</div>
                      </div>
                    )}

                    {simLogs.slice(0, visibleLogCount).map((log, index) => {
                      let color = '#a48c7c';
                      let prefix = '';

                      if (log.type === 'cmd') {
                        color = '#ffffff';
                        prefix = '>';
                      } else if (log.type === 'success') {
                        color = '#82c492';
                        prefix = '[+]';
                      } else if (log.type === 'warn') {
                        color = '#c4b082';
                        prefix = '[!]';
                      } else if (log.type === 'result') {
                        color = '#ffffff';
                      }

                      if (log.type === 'result') {
                        return (
                          <div 
                            key={index} 
                            className="mt-4 p-3 border text-center font-bold relative"
                            style={{ 
                              borderColor: '#82c492', 
                              background: 'rgba(130,196,146,0.08)',
                              color: '#82c492'
                            }}
                          >
                            <div className="text-lg tracking-widest text-[#82c492]">✓ BATCH PIPELINE RESOLUTION</div>
                            <div className="text-xl uppercase mt-1.5 select-all" style={{ color: '#ffffff' }}>{finalEmail}</div>
                            <div className="text-base tracking-widest opacity-80 mt-1">STATUS: ACTIVE &amp; VERIFIED MAILBOX (2.38s)</div>
                          </div>
                        );
                      }

                      return (
                        <div key={index} style={{ color }} className="mb-0.5 whitespace-pre-wrap">
                          {prefix && <span className="mr-2 font-bold opacity-75">{prefix}</span>}
                          {log.text}
                        </div>
                      );
                    })}

                    {/* Blinking cursor line */}
                    {isSimulating && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="w-2 h-4 animate-pulse" style={{ background: '#c4a482' }} />
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Status Footer Bar */}
        <div
          className="px-4 py-2 border-t flex justify-between items-center text-base tracking-wider shrink-0 select-none"
          style={{
            borderColor: 'rgba(90,52,16,0.2)',
            background: '#e6ddc8',
            color: '#8c6342',
          }}
        >
          <span>SYSTEM_STATUS: {isSimulating ? 'BUSY' : 'IDLE'}</span>
          <div className="flex items-center gap-4">
            <span>TABS: [0] &amp; [1]</span>
            <span className="hidden sm:inline">CLOSE: [ESC]</span>
            <span className="animate-pulse" style={{ color: '#5a3410' }}>■ CONNECTED</span>
          </div>
        </div>
      </motion.div>

      {/* Lightbox High-Resolution Zoom Overlay */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/85 backdrop-blur-[2.5px] cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="relative max-w-5xl w-full border-2 p-1" 
              style={{ borderColor: '#b8743c', background: '#ece5d0' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <img 
                src={currentStep.img} 
                alt={currentStep.title} 
                className="w-full h-auto object-contain select-none"
              />
              
              {/* Double border decoration inside */}
              <div 
                className="absolute inset-[3px] pointer-events-none border border-dashed" 
                style={{ borderColor: 'rgba(90,52,16,0.3)' }}
              />

              {/* Lightbox status bar */}
              <div 
                className="absolute -bottom-10 left-0 right-0 text-center font-mono text-base tracking-widest text-[#ece5d0]"
              >
                [ CLICK ANYWHERE OUTSIDE OR PRESS ESC TO RETURN _ ]
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
