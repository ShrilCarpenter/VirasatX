import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Shield, BookOpen, Sparkles, HeartHandshake, Eye, Info, MapPin } from 'lucide-react';

interface FooterProps {
  highContrast?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ highContrast }) => {
  return (
    <footer className={`border-t transition-colors ${
      highContrast 
        ? 'bg-black text-stone-300 border-stone-800' 
        : 'bg-[#151D2A] text-stone-300 border-stone-800'
    }`}>
      {/* Top Banner: SIH26197 Official Alignment */}
      <div className="border-b border-stone-800/80 bg-stone-950/40 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-white">Smart India Hackathon 2026</span>
            <span className="text-stone-400">•</span>
            <span className="text-amber-300 font-mono font-bold">SIH26197</span>
            <span className="text-stone-400">•</span>
            <span className="text-stone-300">Theme: Heritage &amp; Culture</span>
            <span className="text-stone-400">•</span>
            <span className="text-stone-300">AICTE</span>
          </div>
          <div className="text-stone-400 italic">
            “Student Innovation—Ideas that showcase the rich cultural heritage and traditions of India.”
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand & Purpose */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#936B38] text-white flex items-center justify-center font-serif text-xl font-bold">
              V
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                VirasatX
              </span>
              <p className="text-[11px] text-[#D4AF37] font-medium tracking-wide">
                India’s Heritage Repository
              </p>
            </div>
          </div>

          <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
            “India’s Heritage, Understood, Preserved and Experienced.” An AI-powered, multilingual platform connecting ancient artifacts, temple architecture, sacred manuscripts, and unbroken living traditions.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-stone-400">
            <span className="px-2.5 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
              Open Cultural Access
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
              Responsible Tourism
            </span>
          </div>
        </div>

        {/* Col 2: Core Archives */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-[#936B38]" />
            <span>Digital Museum</span>
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/discover" className="hover:text-white transition-colors">
                Curated Collection
              </Link>
            </li>
            <li>
              <Link to="/timeline" className="hover:text-white transition-colors">
                11 Historical Epochs
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-white transition-colors">
                Geospatial Heritage Map
              </Link>
            </li>
            <li>
              <Link to="/artifact/nataraja" className="hover:text-white transition-colors">
                360° Inspection Studio
              </Link>
            </li>
            <li>
              <Link to="/manuscripts" className="hover:text-white transition-colors">
                Ancient Manuscripts Archive
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Living Heritage */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-[#A64B2A]" />
            <span>Living Traditions</span>
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/living-traditions" className="hover:text-white transition-colors">
                Master Craft Guilds
              </Link>
            </li>
            <li>
              <Link to="/living-traditions#gi-tags" className="hover:text-white transition-colors">
                GI-Certified Traditions
              </Link>
            </li>
            <li>
              <Link to="/plan-visit" className="hover:text-white transition-colors">
                Responsible Travel Planner
              </Link>
            </li>
            <li>
              <Link to="/learn" className="hover:text-white transition-colors">
                Heritage Learning Paths
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Trust & Transparency */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Trust &amp; Ethics</span>
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/ai-guide" className="hover:text-white transition-colors flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>AI Heritage Guide</span>
              </Link>
            </li>
            <li>
              <Link to="/ai-transparency" className="hover:text-white transition-colors">
                AI Transparency &amp; Pipeline
              </Link>
            </li>
            <li>
              <Link to="/sources" className="hover:text-white transition-colors">
                Primary Sources &amp; Licenses
              </Link>
            </li>
            <li>
              <Link to="/accessibility" className="hover:text-white transition-colors">
                Accessibility Statement
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About SIH26197 Project
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Disclaimers & Fair Use */}
      <div className="border-t border-stone-800 px-4 sm:px-6 py-6 bg-stone-950/70 text-[11px] text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © 2026 <strong>VirasatX</strong> • Built for Smart India Hackathon 2026 (Problem Statement SIH26197).
          </p>
          <p className="text-center md:text-right max-w-xl">
            Archival records referenced from Archaeological Survey of India (ASI), National Museum New Delhi, and National Mission for Manuscripts under educational fair-use principles. AI outputs represent scholarly interpretations, not expert authentication.
          </p>
        </div>
      </div>
    </footer>
  );
};
