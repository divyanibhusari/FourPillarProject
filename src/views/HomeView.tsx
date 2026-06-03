import { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS, AMENITIES_CATALOG, BRAND_COLORS } from '../data';
import { Project } from '../types';
import { Sparkles, MapPin, CheckCircle, ArrowRight, ShieldCheck, Footprints, Coins, DoorOpen, HelpCircle, Building2, Wrench } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';
import ProjectCard from '../components/ProjectCard';

interface HomeViewProps {
  onSelectProject: (slug: string) => void;
  openLeadModal: (projectSlug: string, initialMessage?: string) => void;
  onChangeRoute: (route: string) => void;
  accessibilityTextSize: 'sm' | 'md' | 'lg' | 'xl';
  lightMode: boolean;
}

export default function HomeView({
  onSelectProject,
  openLeadModal,
  onChangeRoute,
  accessibilityTextSize,
  lightMode
}: HomeViewProps) {

  const [heroTab, setHeroTab] = useState<'project' | 'work' | 'benefits'>('project');

  const activeProjects = PROJECTS.filter(p => p.type !== 'upcoming');
  const upcomingProjects = PROJECTS.filter(p => p.type === 'upcoming');

  const getHeadingClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-xl';
    if (accessibilityTextSize === 'lg') return 'text-4xl';
    if (accessibilityTextSize === 'xl') return 'text-5xl';
    return 'text-3xl sm:text-4xl';
  };

  const getSubheadingClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-base';
    if (accessibilityTextSize === 'lg') return 'text-2xl';
    if (accessibilityTextSize === 'xl') return 'text-3xl';
    return 'text-xl sm:text-2xl';
  };

  const getTextClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-xs';
    if (accessibilityTextSize === 'lg') return 'text-base';
    if (accessibilityTextSize === 'xl') return 'text-lg';
    return 'text-sm';
  };

  return (
    <div className="flex flex-col">
      
      {/* 1. HERO BANNER: Premium Custom Minimal Layout */}
      <section 
        className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
        aria-label="Welcome Introduction Banner"
      >
        {/* Parallax Background generated image with premium filter adjusting dynamically with context */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_nagpur_township_png_1780484676643.png"
            alt="Nagpur Premium Township Horizon by 4 Pillars Realty"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover select-none filter transition-all duration-500 ${
              lightMode ? 'brightness-[1.0] opacity-[0.16] saturate-[45%]' : 'brightness-[0.3] opacity-30'
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
            lightMode ? 'from-[#F8FAFC] via-[#F8FAFC]/50 to-transparent' : 'from-[#091522] via-[#091522]/20 to-transparent'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Vision Statement & Interactive Pillars */}
            <div className="lg:col-span-7 text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5"
              >
                <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full border flex items-center gap-1.5 ${
                  lightMode 
                    ? 'text-blue-700 bg-blue-50 border-blue-200' 
                    : 'text-red-400 bg-red-950/25 border-red-900/40'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" /> Nagpur's Premier Gated Developers
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className={`font-serif font-extrabold tracking-tight leading-[1.1] max-w-2xl ${
                  lightMode ? 'text-slate-900' : 'text-white'
                } ${getHeadingClass()}`}>
                  Building High-Yield <span className="text-blue-600">Gated Communities</span> across Nagpur
                </h1>
                
                <h2 className={`font-sans tracking-wide max-w-xl font-normal leading-relaxed ${
                  lightMode ? 'text-slate-700' : 'text-slate-300'
                } ${getSubheadingClass()}`}>
                  Securing land expansions, legal layouts, and modern on-ground infrastructure delivering premium assets directly.
                </h2>
              </motion.div>

              {/* Direct feature togglers to explain WHAT and WORK immediately with minimal copy */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1"
              >
                {/* Micro Card 1: What is the Project */}
                <button 
                  onClick={() => setHeroTab('project')}
                  className={`p-4 rounded-xl border transition-all text-left block w-full relative overflow-hidden group ${
                    heroTab === 'project'
                      ? (lightMode ? 'bg-blue-50/80 border-blue-300 shadow-md shadow-blue-100' : 'bg-slate-900/90 border-blue-500/40 shadow-lg')
                      : (lightMode ? 'bg-white/80 border-slate-200 hover:border-slate-300' : 'bg-slate-950/40 border-slate-900 hover:border-slate-800')
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`p-1.5 rounded-lg text-xs shrink-0 transition-colors ${
                      heroTab === 'project' 
                        ? 'bg-blue-600 text-white' 
                        : (lightMode ? 'bg-slate-100 text-slate-700' : 'bg-slate-900 text-slate-450')
                    }`}>
                      <Building2 className="w-3.5 h-3.5" />
                    </span>
                    <span className={`text-[10px] font-mono tracking-wider font-bold uppercase transition-colors ${
                      heroTab === 'project' ? 'text-blue-600' : 'text-slate-500'
                    }`}>01 • Current Projects</span>
                  </div>
                  <h3 className={`text-xs font-bold leading-snug ${
                    lightMode ? 'text-slate-900' : 'text-white'
                  }`}>
                    Gated Residential Plots & Townships
                  </h3>
                  <p className="text-[10.5px] text-slate-500 mt-1 leading-normal font-sans">
                    Secure RL clear-titled layouts and custom properties optimized directly for private home constructions.
                  </p>
                </button>

                {/* Micro Card 2: What is the Work */}
                <button 
                  onClick={() => setHeroTab('work')}
                  className={`p-4 rounded-xl border transition-all text-left block w-full relative overflow-hidden group ${
                    heroTab === 'work'
                      ? (lightMode ? 'bg-blue-50/80 border-blue-300 shadow-md shadow-blue-100' : 'bg-slate-900/90 border-blue-500/40 shadow-lg')
                      : (lightMode ? 'bg-white/80 border-slate-200 hover:border-slate-300' : 'bg-slate-950/40 border-slate-900 hover:border-slate-800')
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`p-1.5 rounded-lg text-xs shrink-0 transition-colors ${
                      heroTab === 'work' 
                        ? 'bg-blue-600 text-white' 
                        : (lightMode ? 'bg-slate-100 text-slate-700' : 'bg-slate-900 text-slate-450')
                    }`}>
                      <Wrench className="w-3.5 h-3.5" />
                    </span>
                    <span className={`text-[10px] font-mono tracking-wider font-bold uppercase transition-colors ${
                      heroTab === 'work' ? 'text-blue-600' : 'text-slate-500'
                    }`}>02 • The Engineered Work</span>
                  </div>
                  <h3 className={`text-xs font-bold leading-snug ${
                    lightMode ? 'text-slate-900' : 'text-white'
                  }`}>
                    Premium Infrastructure Delivered
                  </h3>
                  <p className="text-[10.5px] text-slate-500 mt-1 leading-normal font-sans">
                    Constructing concrete highway accesses, underground drainage pipes, solar streetlights & recreational gardens.
                  </p>
                </button>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto"
              >
                <button
                  onClick={() => openLeadModal('melbourne-city-sector-ii', 'Interested in scheduling a physical site visit to explore layouts.')}
                  className="bg-blue-600 hover:bg-blue-500 text-slate-100 font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-blue-900/30 transition-all text-xs uppercase tracking-wider font-mono shrink-0"
                >
                  Schedule Private Site Cabin
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('neighborhood-map-container');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else onChangeRoute('map');
                  }}
                  className={`border font-bold px-7 py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider font-mono ${
                    lightMode 
                      ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm' 
                      : 'bg-slate-900/80 border-slate-700 hover:bg-slate-800 text-slate-200 hover:text-white'
                  }`}
                >
                  Interactive Sandbox Map
                </button>
              </motion.div>
            </div>

            {/* Right Column: Unique & Premium "System Diagnostic" Bento Console */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className={`relative rounded-3xl border p-5 overflow-hidden shadow-2xl transition-all duration-500 ${
                  lightMode 
                    ? 'bg-white/95 border-slate-200 shadow-slate-200/40 text-slate-800' 
                    : 'bg-slate-950/95 border-slate-800/80 shadow-black text-white'
                }`}
              >
                {/* Scientific Blueprint Dots overlay background */}
                <div className="absolute inset-0 bg-[radial-gradient(#2563eb_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-[0.12] pointer-events-none" />
                
                {/* Header status bar */}
                <div className="flex justify-between items-center pb-3.5 mb-4 border-b border-dashed border-slate-850/10 relative z-10 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                    PLATFORM ANALYSIS
                  </span>
                  <span>4P CORE v3.2</span>
                </div>

                {/* Elegant tab togglers inside bento */}
                <div className="grid grid-cols-3 gap-1 relative z-10 mb-4 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/60 text-[10px] font-mono leading-none tracking-tight">
                  {(['project', 'work', 'benefits'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setHeroTab(tab)}
                      className={`py-2 px-1 rounded-lg uppercase transition-all font-bold ${
                        heroTab === tab
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {tab === 'project' ? 'Concept' : tab === 'work' ? 'Engineering' : 'Leverages'}
                    </button>
                  ))}
                </div>

                {/* Dynamic Content Pane based on selected tab */}
                <div className="relative z-10 min-h-[220px] flex flex-col justify-between">
                  
                  {/* TAB 1: Concept */}
                  {heroTab === 'project' && (
                    <motion.div
                      key="project"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <span className="text-[9px] uppercase tracking-widest font-mono text-blue-500 font-bold block">01 • THE PORTFOLIO</span>
                        <h4 className="text-base font-serif font-bold tracking-tight mt-0.5">Premium Plots & Luxury Ready Builds</h4>
                      </div>

                      {/* Vector layout map abstraction */}
                      <div className="h-24 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:10px_10px]" />
                        <svg className="w-full h-full text-blue-500/20 absolute inset-0 p-2" viewBox="0 0 100 40" fill="none">
                          <rect x="5" y="4" width="35" height="32" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1,1" />
                          <rect x="45" y="4" width="50" height="12" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1,1" />
                          <rect x="45" y="20" width="50" height="16" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1,1" />
                          <line x1="42" y1="2" x2="42" y2="38" stroke="#ef4444" strokeWidth="0.7" strokeDasharray="2,2" />
                          <circle cx="20" cy="20" r="1.5" fill="#10b981" />
                          <circle cx="70" cy="10" r="1.5" fill="#3b82f6" />
                          <circle cx="70" cy="28" r="1.5" fill="#f59e0b" />
                        </svg>
                        <span className="absolute bottom-1.5 right-2 font-mono text-[8px] text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded uppercase">
                          BESA ROAD CORRIDORS
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-[11px] leading-relaxed">
                        <div className="bg-slate-100 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/40 dark:border-slate-800/40">
                          <span className="text-[9px] font-mono text-slate-450 block uppercase">Sizing Matrix</span>
                          <span className={`font-bold ${lightMode ? 'text-slate-900' : 'text-slate-100'}`}>1,100 - 4,500 Sq.Ft.</span>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/40 dark:border-slate-800/40">
                          <span className="text-[9px] font-mono text-slate-450 block uppercase">Transit Access</span>
                          <span className={`font-bold ${lightMode ? 'text-slate-900' : 'text-slate-100'}`}>Wardha Rd Highway NH-44</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: The Work (Engineering Specs) */}
                  {heroTab === 'work' && (
                    <motion.div
                      key="work"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div>
                        <span className="text-[9px] uppercase tracking-widest font-mono text-blue-500 font-bold block">02 • SUB-SURFACE METRICS</span>
                        <h4 className="text-base font-serif font-bold tracking-tight mt-0.5">Meticulous Engineering Construction</h4>
                      </div>

                      <div className="space-y-1.5 text-[10.5px] leading-relaxed">
                        <div className="flex items-start gap-2 bg-slate-100 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-200/40 dark:border-slate-800/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                          <span><strong>Transport Channels:</strong> WBM solid concrete arterial roadways with layout walkways.</span>
                        </div>
                        <div className="flex items-start gap-2 bg-slate-100 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-200/40 dark:border-slate-800/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                          <span><strong>Internal Services:</strong> Underground pipeline networks managing storm water & sewage.</span>
                        </div>
                        <div className="flex items-start gap-2 bg-slate-100 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-200/40 dark:border-slate-800/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                          <span><strong>Green Spaces:</strong> Tree-lined layout boundaries, visual parks & solar streetlight systems.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Leverage & Financial Benefits */}
                  {heroTab === 'benefits' && (
                    <motion.div
                      key="benefits"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <span className="text-[9px] uppercase tracking-widest font-mono text-blue-500 font-bold block">03 • SECURITIES & CAPITAL</span>
                        <h4 className="text-base font-serif font-bold tracking-tight mt-0.5">Absolute Legal Clear Title Guarantee</h4>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-1">
                        Secure instant layout coordinates with completely clear titles, verified legal disclosures, and extensive banking linkages.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] leading-normal font-mono">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-450 font-bold">
                          <span className="text-[8px] uppercase tracking-wider block text-slate-500 font-sans">NMRDA STATUS</span>
                          <span>100% RL Released</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-450 font-bold">
                          <span className="text-[8px] uppercase tracking-wider block text-slate-500 font-sans">LENDING LEVEL</span>
                          <span>Up to 80% Finance</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Legend controls */}
                  <div className="mt-4 pt-3 border-t border-slate-800/15 flex items-center justify-between text-[9px] font-mono text-slate-500 font-semibold select-none">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block shrink-0" />
                      RL RELEASED
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block shrink-0" />
                      FAST REGISTRATION
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block shrink-0" />
                      BANK APPROVED
                    </span>
                  </div>

                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Down Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-slate-500 text-[10px] tracking-widest uppercase font-mono select-none">
          <span>Scroll to uncover projects</span>
          <span className="w-0.5 h-6 bg-blue-600/60 mt-2 block animate-pulse animate-duration-1000" />
        </div>
      </section>

      {/* 2. CORPORATE HERITAGE: Trust and details */}
      <section 
        className={`py-16 md:py-20 border-b ${
          lightMode ? 'bg-white border-slate-200' : 'bg-[#091522] border-slate-900'
        }`}
        id="corporate-heritage-brief"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">
                Corporate Heritage
              </span>
              <h2 className={`font-serif font-bold tracking-tight mt-2 ${
                lightMode ? 'text-slate-900' : 'text-slate-100'
              } ${getHeadingClass()}`}>
                About 4 Pillars Reality
              </h2>
              <p className={`font-serif italic text-red-500 mt-1 ${getSubheadingClass()}`}>
                Building Trust. Creating Communities.
              </p>
              <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full" />
              
              <div className={`mt-6 space-y-4 leading-relaxed ${
                lightMode ? 'text-slate-655' : 'text-slate-400'
              } ${getTextClass()}`}>
                <p>
                  At 4 Pillars Reality, we believe every property should offer more than just space—it should create opportunities for better living and future growth.
                </p>
                <p>
                  We specialize in premium plotted developments, residential townships, and luxury apartments across Nagpur. Our projects are carefully selected in emerging locations that offer strong connectivity, quality infrastructure, and excellent appreciation potential.
                </p>
                <p>
                  Our commitment to transparency, customer satisfaction, and quality development has made us a trusted name among homebuyers and investors.
                </p>
              </div>

              <button
                onClick={() => {
                  onChangeRoute('about');
                  window.scrollTo({ top: 0 });
                }}
                className="mt-6 text-xs text-blue-500 font-bold hover:text-blue-400 transition-colors uppercase tracking-wider flex items-center gap-1 font-mono"
              >
                Discover corporate standards <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Strategic Locations', desc: 'Projects located in high-growth areas with strong future development potential.' },
                { title: 'Quality Infrastructure', desc: 'Well-planned layouts, wide paved roads, premium water utilities, and modern open parks.' },
                { title: 'Transparent Transactions', desc: 'NMRDA RL clear-titles. Professional assistance and absolute legal precision throughout buying stages.' },
                { title: 'Easy Financing Support', desc: 'Approved up to 80% bank loans backing with top-tier national housing financiers.' }
              ].map((val, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`border rounded-2xl p-5 ${
                    lightMode 
                      ? 'bg-slate-55 border-slate-200/80 shadow-sm' 
                      : 'bg-slate-950/40 border-slate-800/80'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 text-xs font-mono font-bold">
                    0{i + 1}
                  </div>
                  <h4 className={`font-serif font-bold text-sm tracking-tight ${lightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                    {val.title}
                  </h4>
                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE MAP: Anchor neighborhood exploration */}
      <section 
        className={`py-12 ${
          lightMode ? 'bg-slate-100' : 'bg-slate-950'
        }`}
        id="neighborhood-map-container"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* We embed our custom InteractiveMap */}
          <div className="relative z-10">
            <InteractiveMap
              onSelectProject={onSelectProject}
              openLeadModal={openLeadModal}
              accessibilityTextSize={accessibilityTextSize}
              lightMode={lightMode}
            />
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE PORTFOLIO: Premium layouts carousel */}
      <section 
        className={`py-16 md:py-20 border-b ${
          lightMode ? 'bg-white border-slate-200' : 'bg-[#091522] border-slate-900'
        }`}
        id="projects-carousel"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 border-b border-slate-900/10 pb-6"
          >
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono">
                Active Listings
              </span>
              <h2 className={`font-serif font-bold tracking-tight mt-1.5 ${
                lightMode ? 'text-slate-900' : 'text-slate-100'
              } ${getHeadingClass()}`}>
                Our Signature Projects
              </h2>
            </div>
            <button
              onClick={() => {
                onChangeRoute('projects');
                window.scrollTo({ top: 0 });
              }}
              className="text-xs text-blue-500 font-bold hover:text-blue-400 transition-colors uppercase tracking-wider flex items-center gap-1 font-mono"
            >
              Browse all brochures <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeProjects.map((proj, idx) => (
              <ProjectCard
                key={proj.slug}
                proj={proj}
                idx={idx}
                lightMode={lightMode}
                onSelectProject={onSelectProject}
                openLeadModal={openLeadModal}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. LIFESTYLE AMENITIES: Bento Grid layout */}
      <section 
        className={`py-16 md:py-20 border-b ${
          lightMode ? 'bg-[#f4f7fa] border-slate-200' : 'bg-slate-950 border-slate-905'
        }`}
        id="all-amenities-inventory"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono">
              Infrastructure Standards
            </span>
            <h2 className={`font-serif font-bold tracking-tight mt-1.5 ${
              lightMode ? 'text-slate-900' : 'text-slate-100'
            } ${getHeadingClass()}`}>
              Premium Lifestyle Amenities
            </h2>
            <p className="text-slate-500 text-xs mt-1.5">
              Our gated properties are meticulously engineered with high-end materials supporting durable community living.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AMENITIES_CATALOG.map((am, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`border rounded-2xl p-5 hover:shadow-md transition-all ${
                  lightMode 
                    ? 'bg-white border-slate-200 shadow-sm' 
                    : 'bg-[#091522]/80 border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                  <DoorOpen className="w-5 h-5" />
                </div>
                <h4 className={`font-bold font-serif text-sm tracking-tight ${
                  lightMode ? 'text-slate-900' : 'text-slate-100'
                }`}>
                  {am.name}
                </h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                  {am.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Infrastructure grid */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`mt-8 py-5 px-6 rounded-2xl border text-xs leading-relaxed max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 ${
              lightMode ? 'bg-white border-slate-200' : 'bg-[#091522] border-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-slate-500 text-[11px]">
                <strong>Additional Amenities Included:</strong> Every layout includes concrete tar lines, extensive LED streetlights, automated sewerage feeds, underground cabling, and landscaped jogging areas.
              </p>
            </div>
            <button
              onClick={() => openLeadModal('melbourne-city-sector-ii', 'Please share legal details about plotting infrastructures.')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-3.5 rounded-lg text-[10px] shrink-0"
            >
              Verify Infrastructure
            </button>
          </motion.div>

        </div>
      </section>

      {/* 6. UPCOMING PROJECTS: Preview developments */}
      <section 
        className={`py-16 border-b ${
          lightMode ? 'bg-white border-slate-200' : 'bg-[#091522] border-slate-900'
        }`}
        id="upcoming-releases"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest font-mono">
              Future Boundaries
            </span>
            <h2 className={`font-serif font-bold tracking-tight mt-1.5 ${
              lightMode ? 'text-slate-900' : 'text-slate-100'
            } ${getHeadingClass()}`}>
              Upcoming Developments in Nagpur
            </h2>
            <p className="text-slate-505 text-xs mt-1">
              Be the first to secure plots on pre-launch high appreciation locations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingProjects.map((proj, idx) => (
              <motion.div 
                key={proj.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between ${
                  lightMode 
                    ? 'bg-slate-55 border-slate-200/80' 
                    : 'bg-slate-950 border-slate-850'
                }`}
              >
                <div>
                  <span className="text-[9px] font-bold font-mono uppercase bg-blue-900/20 text-blue-400 border border-blue-900/30 px-2 py-0.5 rounded">
                    FUTURE PHASE
                  </span>
                  <h3 className={`font-serif font-bold text-lg tracking-tight mt-3 ${
                    lightMode ? 'text-slate-900' : 'text-slate-100'
                  }`}>
                    {proj.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] border-t border-slate-900/10 pt-4">
                    {proj.specs.map((spec, sIdx) => (
                      <div key={sIdx}>
                        <span className="text-[10px] text-slate-550 block font-normal uppercase tracking-wider">{spec.label}</span>
                        <span className="font-bold text-white mt-0.5 inline-block font-mono text-xs">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">Highlights</span>
                    <ul className="grid grid-cols-2 gap-2 mt-1.5 text-[11px] text-slate-500">
                      {[
                        'Planned Residential Community',
                        'Wide Internal Roads',
                        'Modern Infrastructure',
                        'Future Growth Potential'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-1 text-slate-550">
                          <CheckCircle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900/10 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(proj.slug)}
                    className="text-xs text-blue-500 hover:text-blue-400 font-sans font-bold"
                  >
                    View Timeline
                  </button>
                  <button
                    onClick={() => openLeadModal(proj.slug, `I am interested in Pre-registering for the ${proj.name}. please send details.`)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1.5 px-4 rounded-lg text-xs"
                  >
                    Register Pre-launch
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. ADVISORY MARKET: Real Estate Investment Opportunities in Nagpur */}
      <section 
        className={`py-16 md:py-20 border-b ${
          lightMode ? 'bg-[#f8fafc] border-slate-200' : 'bg-slate-950 border-slate-905'
        }`}
        id="investment-advisory"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono">
              Market Intelligence
            </span>
            <h2 className={`font-serif font-bold tracking-tight mt-1.5 ${
              lightMode ? 'text-slate-900' : 'text-slate-100'
            } ${getHeadingClass()}`}>
              Real Estate Investment Opportunities in Nagpur
            </h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full" />
            
            <p className={`mt-6 leading-relaxed ${
              lightMode ? 'text-slate-655' : 'text-slate-455'
            } ${getTextClass()}`}>
              Nagpur continues to emerge as one of India's most promising real estate markets. Increasing infrastructure development, growing residential demand, and expanding urban growth corridors make it an attractive destination for property investment.
            </p>
            <p className={`mt-4 leading-relaxed ${
              lightMode ? 'text-slate-655' : 'text-slate-455'
            } ${getTextClass()}`}>
              At 4 Pillars Realty, we help investors and homebuyers capitalize on these opportunities through carefully planned projects located in developing residential zones.
            </p>
            <p className={`mt-4 leading-relaxed ${
              lightMode ? 'text-slate-655' : 'text-slate-455'
            } ${getTextClass()}`}>
              Whether you are looking for residential plots, township developments, or luxury apartments, our projects are designed to offer both lifestyle benefits and future value appreciation.
            </p>

            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() => onChangeRoute('blogs')}
                className="bg-[#003B72] hover:bg-[#1A67A4] text-white text-xs font-bold py-3 px-6 rounded-xl transition-all font-mono tracking-wider uppercase"
              >
                Read Market Handbooks
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. CLIENT REVIEWS: Testimonials */}
      <section 
        className={`py-16 md:py-20 border-b ${
          lightMode ? 'bg-white border-slate-200' : 'bg-[#091522] border-slate-900'
        }`}
        id="client-testimonials"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest font-mono">
              Client Commendations
            </span>
            <h2 className={`font-serif font-bold tracking-tight mt-1.5 ${
              lightMode ? 'text-slate-900' : 'text-slate-100'
            } ${getHeadingClass()}`}>
              What Our Customers Value
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { val: 'Trusted Guidance', text: 'We assist buyers at every stage of the property journey, aligning finances with clear-titled plots matches.' },
              { val: 'Location Advantage', text: 'Projects selected specifically for future growth and high metro-highway connectivity.' },
              { val: 'Hassle-Free Process', text: 'From legal verification selection to physical registry documentation and up to 80% banking assistances.' },
              { val: 'Long-Term Value', text: 'Masterplan developments designed solely to support rapid valuation jumps and sustainable custom builds.' }
            ].map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`border rounded-2xl p-5 relative overflow-hidden ${
                  lightMode 
                    ? 'bg-slate-55 border-slate-200' 
                    : 'bg-slate-950/40 border-slate-850'
                }`}
              >
                <div className="text-4xl text-slate-700/30 font-serif absolute -top-1 -left-1 select-none font-bold">
                  “
                </div>
                <h4 className={`text-sm font-bold font-serif tracking-tight mt-4 ${
                  lightMode ? 'text-slate-900' : 'text-slate-100'
                }`}>
                  {test.val}
                </h4>
                <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                  {test.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. CALL TO ACTION: Capture visits */}
      <section 
        className="relative py-16 text-center overflow-hidden border-b border-slate-900 bg-[#091522] text-white"
        aria-label="Direct site visiting action call"
      >
        <div className="absolute inset-0 opacity-10">
          <img
            src="/src/assets/images/project_melbourne_png_1780484693295.png"
            alt="Seamless layouts"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono block mb-2">
            Elevate Portfolio Sizing
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl tracking-tight text-white mb-4">
            Book Your Site Visit Today
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-6">
            Ready to explore your future property? Our team is here to help you find the right residential plot or luxury apartment based on your requirements and investment goals.
          </p>

          <button
            onClick={() => openLeadModal('melbourne-city-sector-ii', 'Interests in scheduled site tour.')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl uppercase font-mono text-xs tracking-wider transition-all shadow-xl shadow-blue-900/30 inline-block"
          >
            Schedule VIP Transport Cabin
          </button>
        </motion.div>
      </section>

    </div>
  );
}
