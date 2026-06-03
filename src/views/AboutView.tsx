import { BRAND_COLORS } from '../data';
import { Landmark, ShieldCheck, Heart, User, Sparkles, Navigation } from 'lucide-react';

interface AboutViewProps {
  lightMode: boolean;
  accessibilityTextSize: 'sm' | 'md' | 'lg' | 'xl';
}

export default function AboutView({ lightMode, accessibilityTextSize }: AboutViewProps) {
  
  const getHeadingClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-xl';
    if (accessibilityTextSize === 'lg') return 'text-4xl';
    if (accessibilityTextSize === 'xl') return 'text-5xl';
    return 'text-3xl sm:text-4xl';
  };

  const getTextClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-xs';
    if (accessibilityTextSize === 'lg') return 'text-base';
    if (accessibilityTextSize === 'xl') return 'text-lg';
    return 'text-sm';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 select-none">
      
      {/* 1. Header Banner */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono flex justify-center items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Corporate DNA
        </span>
        <h1 className={`font-serif tracking-tight font-black mt-2 ${
          lightMode ? 'text-slate-900' : 'text-slate-100'
        } ${getHeadingClass()}`}>
          About 4 Pillars Reality
        </h1>
        <p className={`${lightMode ? 'text-slate-600' : 'text-slate-400'} italic mt-1 font-serif text-sm`}>
          Building Trust. Creating Communities.
        </p>
        <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* 2. Brand Positioning Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h2 className="font-serif font-bold text-xl tracking-tight text-blue-500">
            Our Philosophies & Intentions
          </h2>
          <div className={`space-y-4 leading-relaxed ${
            lightMode ? 'text-slate-650' : 'text-slate-350'
          } ${getTextClass()}`}>
            <p>
              At 4 Pillars Reality, we believe every property should offer more than just space—it should create opportunities for better living and future growth.
            </p>
            <p>
              We specialize in premium plotted developments, residential townships, and luxury apartments across Nagpur. Our projects are carefully selected in emerging locations that offer strong connectivity, quality infrastructure, and excellent appreciation potential.
            </p>
            <p>
              Our commitment to transparency, customer satisfaction, and quality development has made us a trusted name among homebuyers and investors. We hold statutory compliance as our absolute priority.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden relative shadow-lg">
            <img
              src="/src/assets/images/hero_nagpur_township_png_1780484676643.png"
              alt="4 Pillars Corporate Workspace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 flex items-end">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 100% NMRDA & RERA Standard Compliance Guaranteed
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Four Pillars Core Values layout */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
            Key Anchors
          </span>
          <h3 className={`font-serif font-semibold text-lg ${lightMode ? 'text-slate-900' : 'text-white'}`}>
            The Four Pillars of Our Operations
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[
            { val: 'Pillar I: Legal Clarity', desc: 'Every plot layout goes through extensive title searches prior to release letter checks.' },
            { val: 'Pillar II: Strategic Siting', desc: 'We only options along South Nagpur high-growth corridors favoring immediate valuation elevation.' },
            { val: 'Pillar III: Durable Infra', desc: 'No shortcuts. Tar cement roads, LED grids, and sewerage pipelines engineered for years.' },
            { val: 'Pillar IV: Pure Transparency', desc: 'No hidden calculations. Straightforward documentation with absolute customer relationship backing.' }
          ].map((val, i) => (
            <div 
              key={i} 
              className={`border rounded-2xl p-5 relative overflow-hidden ${
                lightMode 
                  ? 'bg-white border-slate-200' 
                  : 'bg-slate-950 border-slate-850'
              }`}
            >
              <div className="text-3xl text-blue-500/10 font-bold absolute bottom-2 right-3 select-none font-mono">
                0{i + 1}
              </div>
              <h4 className={`text-sm font-serif font-bold tracking-tight ${lightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                {val.val}
              </h4>
              <p className={`text-xs mt-2.5 leading-relaxed ${lightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
