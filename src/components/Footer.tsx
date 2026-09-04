import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, HeartHandshake, Wrench, ShieldCheck } from 'lucide-react';

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
      {/* Main 4-Column Editorial Links Layout (Prompt Section 59) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Description Column */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#936B38] text-white flex items-center justify-center font-serif text-lg font-bold">
              V
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-white tracking-tight block">
                VirasatX
              </span>
              <span className="text-[10px] text-[#D4AF37] font-mono block">
                India's Heritage Repository
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            An authoritative, source-grounded digital archive connecting tangible artifacts, sacred architecture, manuscripts, and living traditions.
          </p>
        </div>

        {/* Column 1: Explore */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#936B38]" />
            <span>Explore</span>
          </h3>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <Link to="/discover" className="hover:text-white transition-colors">
                Discover Catalog
              </Link>
            </li>
            <li>
              <Link to="/discover?category=Artifacts" className="hover:text-white transition-colors">
                Curated Collections
              </Link>
            </li>
            <li>
              <Link to="/timeline" className="hover:text-white transition-colors">
                Civilizational Timeline
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-white transition-colors">
                Geospatial Heritage Map
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Living Heritage */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>Living Heritage</span>
          </h3>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <Link to="/living-traditions" className="hover:text-white transition-colors">
                Living Traditions
              </Link>
            </li>
            <li>
              <Link to="/living-traditions" className="hover:text-white transition-colors">
                Artisan Guilds
              </Link>
            </li>
            <li>
              <Link to="/manuscripts" className="hover:text-white transition-colors">
                Sacred Manuscripts
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Tools */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Tools</span>
          </h3>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <Link to="/ai-guide" className="hover:text-white transition-colors">
                Virasat AI Guide
              </Link>
            </li>
            <li>
              <Link to="/identify" className="hover:text-white transition-colors">
                Visual Identification
              </Link>
            </li>
            <li>
              <Link to="/plan-visit" className="hover:text-white transition-colors">
                Plan a Responsible Visit
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Trust */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A64B2A]" />
            <span>Trust &amp; Provenance</span>
          </h3>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <Link to="/sources" className="hover:text-white transition-colors">
                Primary Sources
              </Link>
            </li>
            <li>
              <Link to="/ai-transparency" className="hover:text-white transition-colors">
                AI Transparency
              </Link>
            </li>
            <li>
              <Link to="/accessibility" className="hover:text-white transition-colors">
                Accessibility Statement
              </Link>
            </li>
            <li>
              <Link to="/copyright" className="hover:text-white transition-colors">
                Copyright &amp; Image Rights
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About VirasatX
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Disclaimers & Fair Use */}
      <div className="border-t border-stone-800/80 px-4 sm:px-6 py-6 bg-stone-950/70 text-[11px] text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center md:text-left">
            <p className="text-stone-400 font-medium">
              VirasatX — India's Heritage Repository
            </p>
            <p>
              National Digital Heritage Archive &amp; Cultural Knowledge System
            </p>
          </div>
          <p className="text-center md:text-right max-w-lg text-stone-400">
            Primary sources documented from Archaeological Survey of India (ASI), National Archives of India, Museums of India, and UNESCO Memory of the World.
          </p>
        </div>
      </div>
    </footer>
  );
};
