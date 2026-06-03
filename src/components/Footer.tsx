import { Mail, Phone, MapPin, ChevronUp, Landmark, ShieldCheck, HelpCircle } from 'lucide-react';
import { LogoFull } from './Logo';

interface FooterProps {
  onChangeRoute: (route: string) => void;
  lightMode: boolean;
}

export default function Footer({ onChangeRoute, lightMode }: FooterProps) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mainLinks = [
    { label: 'Home Page', route: 'home' },
    { label: 'Map Explorer', route: 'map' },
    { label: 'Signature Projects', route: 'projects' },
    { label: 'Enquire Desk', route: 'contact' },
  ];

  const remainingLinks = [
    { label: 'Corporate Heritage', route: 'about' },
    { label: 'Investor Blogs', route: 'blogs' },
    { label: 'FAQs & Legal Guidelines', route: 'faqs' },
  ];

  const projectsLinks = [
    { label: 'Melbourne City Sector II', route: 'melbourne-city-sector-ii' },
    { label: 'Canberra City', route: 'canberra-city' },
    { label: 'Shraddha Bhakti Avenue', route: 'shraddha-bhakti-avenue' },
    { label: 'Upcoming Development Units', route: 'upcoming' },
  ];

  return (
    <footer 
      id="main-app-nav-footer" 
      className={`border-t relative z-10 ${
        lightMode 
          ? 'bg-slate-50 border-slate-200 text-slate-800' 
          : 'bg-[#050c14] border-slate-900 text-slate-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Grid Info section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Corporate ID and slogan (Spans 3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="max-w-[210px]">
              <LogoFull lightMode={lightMode} className="w-full h-auto" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mt-2.5">
              Nagpur's elite property development company. Specializing in high-yield plotted communities carrying 100% legal clarity.
            </p>

            <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-950/20 border border-slate-900/10 p-3 rounded-xl mt-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>NMRDA approved & layout standards guaranteed.</span>
            </div>
          </div>

          {/* Column 2: Main primary Navigations (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest font-mono block mb-4 ${lightMode ? 'text-slate-850' : 'text-white'}`}>
              Navigations
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-500">
              {mainLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => {
                      onChangeRoute(link.route);
                      scrollToTop();
                    }}
                    className={`hover:text-blue-500 transition-colors text-left ${lightMode ? 'text-slate-600' : 'text-slate-400'}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Secondary Information & Remaining pages (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest font-mono block mb-4 ${lightMode ? 'text-slate-850' : 'text-white'}`}>
              Information
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-500">
              {remainingLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => {
                      onChangeRoute(link.route);
                      scrollToTop();
                    }}
                    className={`hover:text-blue-500 transition-colors text-left ${lightMode ? 'text-slate-600' : 'text-slate-400'}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Active Portfolios (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest font-mono block mb-4 ${lightMode ? 'text-slate-850' : 'text-white'}`}>
              Portfolios
            </span>
            <ul className="flex flex-col gap-2.5 text-xs">
              {projectsLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => {
                      onChangeRoute(link.route);
                      scrollToTop();
                    }}
                    className={`hover:text-blue-500 transition-colors text-left ${lightMode ? 'text-slate-600' : 'text-slate-400'}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Coordinates (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <span className={`text-[10px] font-bold uppercase tracking-widest font-mono block mb-4 ${lightMode ? 'text-slate-850' : 'text-white'}`}>
              Corporate Coordinates
            </span>
            <ul className="flex flex-col gap-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil Petrol Pump, Besa Square, New Nagpur, Maharashtra
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                <div className="flex flex-col font-mono">
                  <a href="tel:+919373233777" className="hover:text-blue-500 transition-all">+91 9373233777</a>
                  <a href="tel:+919371612666" className="hover:text-blue-500 transition-all mt-0.5">+91 9371612666</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                <a href="mailto:info@4pillarsrealty.com" className="hover:text-blue-500 transition-all font-mono">
                  info@4pillarsrealty.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright and disclaimer */}
        <div className={`border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 ${
          lightMode ? 'border-slate-200' : 'border-slate-900'
        }`}>
          <div className="text-[11px] text-slate-500 text-center sm:text-left leading-normal max-w-2xl">
            <p>© {new Date().getFullYear()} 4 Pillars Realty (Nagpur). All rights reserved.</p>
            <p className="mt-1.5 leading-relaxed text-[10px] italic">
              <strong>Statutory Advisory:</strong> All project layouts, specifications, sizing details, and amenities displayed are derived from the released NMRDA blueprints. Home loans up to 80% are provided on verified buyer criteria using legal partner institutes.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
              lightMode 
                ? 'bg-white border-slate-200 text-slate-650 hover:bg-slate-100' 
                : 'bg-slate-950 border-slate-900 text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
            title="Scroll elements back to top"
            aria-label="Scroll to top of layout"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
