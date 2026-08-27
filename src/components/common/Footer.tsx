'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#F4EFE6] border-t border-[#E7E1D4] text-[#1C1917] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#E7E1D4]">
          
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-[#9A3412] flex items-center justify-center shadow-sm">
                <Landmark className="w-4 h-4 text-[#FAF7F0]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display font-bold text-lg tracking-wider text-[#1C1917]">
                  VIRASAT AI
                </span>
                <span className="text-[10px] font-sans tracking-wide text-[#78716C] -mt-0.5">
                  Digital Heritage Museum of India
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#57534E] leading-relaxed max-w-sm">
              An intelligent digital heritage museum preserving and sharing India’s art, architecture, manuscripts, and living traditions. Built for Smart India Hackathon 2026.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[11px] text-[#78716C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
              <span>SIH26195 • Heritage & Culture Track</span>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li>
                <Link href="/explore" className="hover:text-[#9A3412] transition-colors">
                  Museum Collections
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="hover:text-[#9A3412] transition-colors">
                  Historical Timeline
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-[#9A3412] transition-colors">
                  Heritage Map
                </Link>
              </li>
              <li>
                <Link href="/gallery/sculpture-gallery" className="hover:text-[#9A3412] transition-colors">
                  Virtual 3D Museum
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: AI & Research */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              AI & Research
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li>
                <Link href="/ai-guide" className="hover:text-[#9A3412] transition-colors">
                  AI Heritage Guide
                </Link>
              </li>
              <li>
                <Link href="/manuscripts" className="hover:text-[#9A3412] transition-colors">
                  Ancient Manuscripts
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-[#9A3412] transition-colors">
                  Living Heritage (Artisans)
                </Link>
              </li>
              <li>
                <Link href="/sustainable-travel" className="hover:text-[#9A3412] transition-colors">
                  Responsible Travel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              About & Sources
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li>
                <Link href="/about" className="hover:text-[#9A3412] transition-colors">
                  About Virasat AI
                </Link>
              </li>
              <li>
                <Link href="/about#sources" className="hover:text-[#9A3412] transition-colors">
                  Sources & Attribution
                </Link>
              </li>
              <li>
                <Link href="/about#architecture" className="hover:text-[#9A3412] transition-colors">
                  System Architecture
                </Link>
              </li>
              <li>
                <Link href="/about#ethical-ai" className="hover:text-[#9A3412] transition-colors">
                  Ethical AI & Transparency
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-3">
          <p>© 2026 Virasat AI — Smart India Hackathon 2026 (Heritage & Culture).</p>
          <p className="flex items-center gap-1.5">
            <span>Preserving Indian Civilization with Respect & Care</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
