import { useState, FormEvent } from 'react';
import { PROJECTS, BRAND_COLORS } from '../data';
import { Mail, Phone, MapPin, CheckCircle, Navigation, ShieldCheck, Sparkles } from 'lucide-react';

interface ContactViewProps {
  lightMode: boolean;
  accessibilityTextSize: 'sm' | 'md' | 'lg' | 'xl';
  openLeadModal: (projectSlug: string, message?: string) => void;
}

export default function ContactView({ lightMode, accessibilityTextSize, openLeadModal }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectSlug: 'melbourne-city-sector-ii',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email syntax matching standard domain needed';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone contact number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, ''))) {
      errs.phone = 'Real 10-digit primary contact mobile path required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLocalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/[\s-+]/g, '')
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessResponse(data);
      } else {
        const errData = await response.json();
        setErrors({ submit: errData.error || 'Server boundary error.' });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Transfers failed. Check Express server runtime.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getHeadingClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-xl';
    if (accessibilityTextSize === 'lg') return 'text-4xl';
    if (accessibilityTextSize === 'xl') return 'text-5xl';
    return 'text-3xl sm:text-4xl';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 select-none">
      
      {/* 1. Header Banner */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono flex justify-center items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Direct Communications
        </span>
        <h1 className={`font-serif tracking-tight font-black mt-2 ${
          lightMode ? 'text-slate-900' : 'text-slate-100'
        } ${getHeadingClass()}`}>
          Contact 4 Pillars Realty
        </h1>
        <p className="text-slate-450 italic mt-1 font-serif text-sm">
          Book Your Site Visit Today
        </p>
        <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* 2. Main content coordinates splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Area: Coordinates Directory & Checkpoints */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <h3 className={`font-serif font-bold text-lg ${lightMode ? 'text-slate-900' : 'text-slate-150'}`}>
            Corporate Headquarters
          </h3>

          <div className={`p-6 border rounded-2xl flex flex-col gap-5 ${
            lightMode ? 'bg-[#f8fafc] border-slate-200' : 'bg-slate-950 border-slate-850'
          }`}>
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase block">Corporate HQ Address</span>
                <p className="text-xs text-slate-350 leading-relaxed mt-1">
                  Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil Petrol Pump, Besa Square, New Nagpur, Maharashtra
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase block">Sales Helpline Desks</span>
                <div className="text-xs text-slate-350 font-mono mt-1 flex flex-col gap-0.5">
                  <a href="tel:+919373233777" className="hover:text-blue-550 transition-all">+91 9373233777</a>
                  <a href="tel:+919371612666" className="hover:text-blue-550 transition-all">+91 9371612666</a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase block">Electronic Enquiries</span>
                <a href="mailto:info@4pillarsrealty.com" className="text-xs text-slate-350 hover:text-blue-550 transition-all font-mono mt-1 block">
                  info@4pillarsrealty.com
                </a>
              </div>
            </div>
          </div>

          {/* District Commit Checkpoints map metrics */}
          <div className={`p-6 border rounded-2xl flex flex-col gap-4 ${
            lightMode ? 'bg-[#f4f7fa] border-slate-205' : 'bg-[#091522] border-slate-900'
          }`}>
            <span className="text-[10px] font-bold text-sky-400 font-mono uppercase tracking-widest">
              Location Siting Checkpoints
            </span>
            
            <div className="flex flex-col gap-2.5 text-xs text-slate-350">
              {[
                { point: 'Besa Square Crossing', distance: 'Ready Immediate access inside neighborhood' },
                { point: 'Nagpur Metro Corridor (Wardha Rd)', distance: '8 minutes commute boundary' },
                { point: 'Nagpur Dr. Ambedkar Int Airport', distance: '12 minutes highway drive' },
                { point: 'MIHAN Technology Corridor', distance: '15 minutes arterial reach' }
              ].map((loc, index) => (
                <div key={index} className="flex justify-between items-center py-1.5 border-b border-slate-800/10">
                  <span className="font-semibold">{loc.point}</span>
                  <span className="font-mono text-[10px] text-slate-500">{loc.distance}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Area: Form submission panel */}
        <div className="lg:col-span-7">
          
          <div className={`border rounded-3xl p-6 relative ${
            lightMode ? 'bg-[#f8fafc] border-slate-200' : 'bg-slate-950 border-slate-850'
          }`}>
            
            {successResponse ? (
              <div className="text-center py-10 flex flex-col gap-4">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-bold text-white tracking-tight">Enquiry Queued Successfully</h4>
                
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Our relationship advisory counselors will telephone your contact path shortly.
                </p>

                {/* Simulated Server email output */}
                <div className="text-left bg-slate-900 p-4 border border-slate-800 rounded-xl mt-4">
                  <span className="text-[9px] font-mono font-bold text-blue-400 block mb-2 uppercase tracking-wide">
                    Automated email response triggered:
                  </span>
                  <pre className="text-[9px] font-mono text-slate-405 leading-normal whitespace-pre-wrap select-all">
                    {successResponse.simulatedEmailUserText}
                  </pre>
                </div>

                <button
                  onClick={() => setSuccessResponse(null)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-xl text-xs max-w-[200px] mx-auto mt-4"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleLocalSubmit} className="flex flex-col gap-4 text-xs select-none">
                
                <h3 className={`font-serif font-bold text-base mb-2 ${lightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                  Leave a Message for the Advisors
                </h3>

                {/* Input 1: name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1 font-mono">Full Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  {errors.name && <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.name}</p>}
                </div>

                {/* Input 2: Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1 font-mono">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                    {errors.email && <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1 font-mono">Phone Number (+91)</label>
                    <input
                      type="tel"
                      placeholder="9373233777"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                    {errors.phone && <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.phone}</p>}
                  </div>
                </div>

                {/* Dropdown selects project */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1 font-mono">Project of Siting Interest</label>
                  <select
                    value={formData.projectSlug}
                    onChange={(e) => setFormData({ ...formData, projectSlug: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {PROJECTS.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Text area message */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1 font-mono">Message or Sizing constraints</label>
                  <textarea
                    rows={3}
                    placeholder="E.g. Are corner layout residential plots still unbooked? What interest rates applies?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all uppercase tracking-widest mt-2 hover:shadow-lg shadow-blue-900/30 font-mono"
                >
                  {isSubmitting ? 'Transmitting details...' : 'Submit Inquiry & Trigger Automated Emails'}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
