'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Heart, Shield, Award, Landmark, MapPin } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/data/translations';

export default function Footer() {
  return (
    <footer className="w-full bg-[#161513] text-[#FAF7F0] border-t border-[#C5A059]/30 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C2824]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#BE4D2A] flex items-center justify-center border border-[#C5A059]/50 shadow-md">
                <span className="font-serif-display font-black text-lg text-[#FAF7F0]">वि</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif-display font-bold text-xl tracking-wider text-[#FAF7F0]">
                    VIRASAT AI
                  </span>
                  <span className="text-[10px] font-sans font-bold uppercase px-1.5 py-0.5 rounded bg-[#C5A059]/20 text-[#E6CD92] border border-[#C5A059]/40">
                    SIH 2026
                  </span>
                </div>
                <p className="text-xs text-[#A89F91]">India’s Heritage, Reimagined.</p>
              </div>
            </div>

            <p className="text-sm text-[#A89F91] leading-relaxed max-w-sm">
              An intelligent, world-class digital museum preserving and showcasing 5,000+ years of Indian art, architecture, ancient manuscripts, and living master traditions for future generations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#24211D] text-[#E6CD92] border border-[#C5A059]/30">
                <Landmark className="w-3.5 h-3.5 text-[#C5A059]" />
                ASI Public Domain Standards
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#24211D] text-[#E6CD92] border border-[#C5A059]/30">
                <Shield className="w-3.5 h-3.5 text-[#BE4D2A]" />
                UNESCO Memory of World
              </span>
            </div>
          </div>

          {/* Col 1: Explore Collections */}
          <div>
            <h4 className="font-serif-display text-sm font-semibold tracking-wider text-[#E6CD92] uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A89F91]">
              <li>
                <Link href="/explore?category=Sculptures" className="hover:text-[#FAF7F0] transition-colors">
                  Ancient Sculptures
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Paintings" className="hover:text-[#FAF7F0] transition-colors">
                  Classical Murals & Miniatures
                </Link>
              </li>
              <li>
                <Link href="/manuscripts" className="hover:text-[#FAF7F0] transition-colors">
                  Sacred Manuscripts
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Architecture" className="hover:text-[#FAF7F0] transition-colors">
                  Temple Architecture
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Textiles" className="hover:text-[#FAF7F0] transition-colors">
                  Royal Textiles & Crafts
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Numismatics" className="hover:text-[#FAF7F0] transition-colors">
                  Imperial Numismatics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Interactive Horizons */}
          <div>
            <h4 className="font-serif-display text-sm font-semibold tracking-wider text-[#E6CD92] uppercase mb-4">
              Museum Horizons
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A89F91]">
              <li>
                <Link href="/timeline" className="hover:text-[#FAF7F0] transition-colors">
                  India Through Time (11 Epochs)
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-[#FAF7F0] transition-colors">
                  Interactive Heritage Map
                </Link>
              </li>
              <li>
                <Link href="/gallery/gupta-golden-hall" className="hover:text-[#FAF7F0] transition-colors">
                  Virtual 3D Galleries
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-[#FAF7F0] transition-colors">
                  Living Master Artisans
                </Link>
              </li>
              <li>
                <Link href="/sustainable-travel" className="hover:text-[#FAF7F0] transition-colors">
                  Sustainable Itinerary Engine
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[#FAF7F0] transition-colors">
                  Curated Editorial Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: AI & Innovation */}
          <div>
            <h4 className="font-serif-display text-sm font-semibold tracking-wider text-[#E6CD92] uppercase mb-4">
              AI & Research
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A89F91]">
              <li>
                <Link href="/ai-guide" className="hover:text-[#FAF7F0] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  AI Heritage Guide
                </Link>
              </li>
              <li>
                <Link href="/ai-guide?tab=vision" className="hover:text-[#FAF7F0] transition-colors">
                  Visual Iconography Identifier
                </Link>
              </li>
              <li>
                <Link href="/manuscripts" className="hover:text-[#FAF7F0] transition-colors">
                  Manuscript Paleography OCR
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FAF7F0] transition-colors">
                  SIH 2026 Tech Architecture
                </Link>
              </li>
              <li>
                <Link href="/about#accessibility" className="hover:text-[#FAF7F0] transition-colors">
                  Multilingual Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Multilingual Support Ticker */}
        <div className="py-6 border-b border-[#2C2824] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#A89F91]">
            <Award className="w-4 h-4 text-[#C5A059]" />
            <span className="font-medium">Multilingual Cultural Inclusivity:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {SUPPORTED_LANGUAGES.map(lang => (
              <span
                key={lang.code}
                className="px-2.5 py-1 rounded bg-[#24211D] text-[#D8CFBF] border border-[#3D3830]"
              >
                {lang.nativeName}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7265]">
          <p>© {new Date().getFullYear()} Virasat AI — Smart India Hackathon 2026 (Heritage & Culture Track).</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#FAF7F0] transition-colors">About Project</Link>
            <Link href="/about#privacy" className="hover:text-[#FAF7F0] transition-colors">Ethical AI & Privacy</Link>
            <Link href="/about#citations" className="hover:text-[#FAF7F0] transition-colors">Archival Sources</Link>
            <Link href="/about#contact" className="hover:text-[#FAF7F0] transition-colors">SIH Team Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
