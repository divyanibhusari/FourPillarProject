import { useState, useEffect } from 'react';
import { BRAND_COLORS } from '../data';
import { User } from '../types';
import { Search, Volume2, Sparkles, UserCheck, Lock, LayoutGrid, Type, Eclipse, Menu, X, Landmark } from 'lucide-react';
import { LogoSymbol } from './Logo';

interface NavbarProps {
  currentRoute: string;
  onChangeRoute: (route: string) => void;
  openSearch: () => void;
  user: User;
  onLoginSuccess: (user: any) => void;
  onLogout: () => void;
  accessibilityTextSize: 'sm' | 'md' | 'lg' | 'xl';
  setAccessibilityTextSize: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  accessibilityHighContrast: boolean;
  setAccessibilityHighContrast: (contrast: boolean) => void;
  lightMode: boolean;
  setLightMode: (light: boolean) => void;
}

export default function Navbar({
  currentRoute,
  onChangeRoute,
  openSearch,
  user,
  onLoginSuccess,
  onLogout,
  accessibilityTextSize,
  setAccessibilityTextSize,
  accessibilityHighContrast,
  setAccessibilityHighContrast,
  lightMode,
  setLightMode,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPortalCard, setShowPortalCard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for the secure mock OAuth postMessage response from the popup
  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      // Security checker
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const loggedUser = event.data.user;
        onLoginSuccess(loggedUser);
        setShowPortalCard(true);
      }
    };
    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, []);

  const triggerOAuthPopup = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    window.open(
      '/auth/popup?provider=Google',
      '4pillars_oauth',
      `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`
    );
  };

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Map Explorer', route: 'map' },
    { label: 'Signature Projects', route: 'projects' },
    { label: 'Enquire Desk', route: 'contact' },
  ];

  const handleLinkClick = (route: string) => {
    onChangeRoute(route);
    setMobileMenuOpen(false);
    // Smooth scroll page back up to header
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cycleTextSize = () => {
    const sizes: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
    const currentIdx = sizes.indexOf(accessibilityTextSize);
    const nextIdx = (currentIdx + 1) % sizes.length;
    setAccessibilityTextSize(sizes[nextIdx]);
  };

  return (
    <header 
      id="main-app-nav-header"
      className={`fixed inset-x-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'top-3 max-w-[92%] lg:max-w-6xl mx-auto rounded-2xl shadow-xl border backdrop-blur-md ' + 
            (lightMode ? 'bg-white/85 border-slate-200/50 shadow-slate-200/40' : 'bg-[#091522]/85 border-slate-800/50 shadow-[#030911]/60') 
          : 'top-0 max-w-full bg-transparent border-transparent'
      } ${accessibilityHighContrast ? 'border-b-4 border-white bg-black!' : ''}`}
    >
      <div className={`transition-all duration-500 px-4 sm:px-6 lg:px-8 flex items-center justify-between ${
        scrolled ? 'py-2' : 'py-4'
      }`}>
        
        {/* Left Aspect: Corporate Logo and Text Slogan */}
        <button 
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 group hover:opacity-90 transition-all text-left"
          aria-label="4 Pillars Corporate Homepage"
        >
          {/* Logo Brand Symbol */}
          <LogoSymbol className="w-13 h-13 shrink-0" lightMode={lightMode} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-sans font-black tracking-tight leading-none text-sm sm:text-base ${lightMode ? 'text-slate-900' : 'text-white'}`}>
                4 PILLARS
              </span>
              <span className="text-[9px] font-bold text-red-500 bg-red-550/10 px-1 py-0.2 rounded uppercase tracking-wider font-mono">
                REALTY
              </span>
            </div>
            {/* Tagline */}
            <span className="text-[9.5px] font-serif italic text-red-600 font-extrabold tracking-tight leading-none block mt-0.5 whitespace-nowrap">
              We turn Dreams... Into Reality
            </span>
          </div>
        </button>

        {/* Desktop Interactive Nav Link Grid */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Desktop Primary Navigation">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleLinkClick(link.route)}
                className={`text-xs font-semibold tracking-wide uppercase transition-colors relative py-1.5 ${
                  isActive 
                    ? 'text-blue-500 font-bold' 
                    : (lightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-350 hover:text-white')
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Feature Panel: Search, Contrast, Sizing, OAuth Account triggers */}
        <div className="flex items-center gap-2.5">
          
          {/* Search Trigger */}
          <button
            onClick={openSearch}
            className={`p-2 rounded-xl transition-all border ${
              lightMode 
                ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700' 
                : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
            }`}
            aria-label="Open global indexing search box"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Accessibility Settings Palette group */}
          <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-800/20 pl-2.5">
            {/* Sizing scale trigger */}
            <button
              onClick={cycleTextSize}
              className={`p-2 rounded-xl transition-all border flex items-center gap-1 ${
                lightMode 
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              title={`Adjust text sizing (Current: ${accessibilityTextSize})`}
              aria-label="Toggle typography height size metrics"
            >
              <Type className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase font-mono">{accessibilityTextSize}</span>
            </button>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setAccessibilityHighContrast(!accessibilityHighContrast)}
              className={`p-2 rounded-xl transition-all border ${
                accessibilityHighContrast 
                  ? 'bg-white border-white text-black' 
                  : (lightMode ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800')
              }`}
              title="Toggle visually high contrast mode boundaries"
              aria-label="Enable monochromatic high contrast limits"
            >
              <Eclipse className="w-4 h-4" />
            </button>

            {/* Light/Dark Toggle */}
            <button
              onClick={() => setLightMode(!lightMode)}
              className={`p-2 rounded-xl transition-all border ${
                lightMode 
                  ? 'bg-slate-900 border-slate-850 text-white hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle Light or Dark ambient visualization"
              aria-label="Switch luxury visual spectrum theme mode"
            >
              <Eclipse className="w-4 h-4 rotate-180" />
            </button>
          </div>

          {/* Secure OAuth Action Portal Panel */}
          <div className="relative border-l border-slate-800/20 pl-2.5">
            {user.isLoggedIn ? (
              <button
                onClick={() => setShowPortalCard(!showPortalCard)}
                className="flex items-center gap-2 bg-slate-900 border border-emerald-500/30 hover:border-emerald-500 py-1 px-1.5 pr-3 rounded-full text-xs text-white transition-all shadow-md relative"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full border border-emerald-500 shrink-0"
                />
                <span className="font-semibold text-[10px] sm:text-[11px] font-mono text-emerald-400 max-w-[70px] truncate">
                  Portal Sync
                </span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-900 animate-pulse" />
              </button>
            ) : (
              <button
                onClick={triggerOAuthPopup}
                className="bg-[#003B72] hover:bg-[#1A67A4] border border-blue-500/30 text-white font-semibold text-[10px] sm:text-[11px] py-1.5 px-3 rounded-xl transition-all shadow-lg flex items-center gap-1.5 uppercase tracking-wider"
              >
                <Lock className="w-3.5 h-3.5" /> Link Account
              </button>
            )}

            {/* VIP Customer Portal Overlay Dropdown */}
            {showPortalCard && user.isLoggedIn && (
              <div className="absolute right-0 mt-3.5 bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl w-72 animate-scale-up text-white z-50">
                <div className="flex justify-between items-start border-b border-slate-900 pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border border-emerald-500 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold leading-none">{user.name}</h4>
                      <span className="text-[9px] text-slate-500 font-mono mt-1 block">{user.email}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPortalCard(false)}
                    className="text-slate-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-2.5 px-3.5 rounded-xl text-[10px] leading-relaxed relative overflow-hidden">
                    <LayoutGrid className="absolute right-2 bottom-1 w-12 h-12 text-emerald-500/5 rotate-12 pointer-events-none" />
                    <strong>VIP Client Account Sync:</strong> Welcome back! Your secure identity matching triggers prioritized site requests, unlocking active map sandboxes.
                  </div>

                  <div className="border-t border-slate-900 pt-3 flex flex-col gap-1 text-[11px]">
                    <div className="text-slate-400 font-mono text-[9px] uppercase tracking-wider mb-1">
                      Identity Verifications
                    </div>
                    <div className="flex justify-between text-slate-300 py-1 border-b border-slate-900/60">
                      <span>Authority Standard</span>
                      <span className="text-emerald-400 font-bold font-mono">NMRDA Secure</span>
                    </div>
                    <div className="flex justify-between text-slate-300 py-1">
                      <span>Privileged Rank</span>
                      <span className="text-amber-500 font-bold font-mono">Gold Level</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onLogout();
                      setShowPortalCard(false);
                    }}
                    className="w-full text-center bg-slate-900 hover:bg-red-950/20 hover:border-red-500/30 border border-slate-800 text-slate-450 hover:text-red-400 text-[10px] font-bold py-1.5 rounded-xl transition-all uppercase tracking-widest mt-2 font-mono"
                  >
                    Disconnect Profile
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburg menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 lg:hidden rounded-xl border ${
              lightMode 
                ? 'bg-slate-100 border-slate-200 text-slate-700' 
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
            aria-label="Toggle mobile menu layout options"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>
      </div>

      {/* Expanded Mobile Navigation Drawer overlay */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t absolute w-full left-0 z-40 p-5 shadow-xl transition-all ${
          lightMode 
            ? 'bg-white border-slate-200 shadow-slate-200' 
            : 'bg-[#091522] border-slate-900 shadow-slate-950/80'
        }`}>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`text-left text-xs font-bold uppercase tracking-widest p-2.5 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-blue-600/10 text-blue-500' 
                      : (lightMode ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-400 hover:bg-slate-900 hover:text-white')
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Accessibility Micro-controls in mobile */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/40 justify-around shrink-0">
              <button
                onClick={cycleTextSize}
                className="flex items-center gap-1 text-[11px] font-mono font-bold text-slate-400 uppercase border border-slate-800 p-2 rounded-xl"
              >
                <Type className="w-4.5 h-4.5" /> Text Size: {accessibilityTextSize}
              </button>
              <button
                onClick={() => setAccessibilityHighContrast(!accessibilityHighContrast)}
                className="flex items-center gap-1 text-[11px] font-mono font-bold text-slate-400 uppercase border border-slate-800 p-2 rounded-xl"
              >
                <Eclipse className="w-4.5 h-4.5" /> High Contrast: {accessibilityHighContrast ? 'On' : 'Off'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
