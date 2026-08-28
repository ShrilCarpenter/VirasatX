'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Landmark } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#FBF9F4] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Content Column */}
          <div className="lg:col-span-6 space-y-8">
            {/* Museum Institutional Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#9A3412]" />
              <span className="text-xs font-sans font-medium text-[#78716C] tracking-wide">
                Smart India Hackathon 2026 • Heritage & Culture Prototype
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-4">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917] leading-[1.15]">
                India’s Heritage, <br />
                <span className="text-[#9A3412] italic font-normal">Reimagined.</span>
              </h1>
              <p className="font-serif-editorial text-xl sm:text-2xl text-[#57534E] font-normal leading-relaxed max-w-xl">
                Explore India’s art, architecture, manuscripts and living traditions through an intelligent digital museum.
              </p>
            </div>

            {/* CTAs: Clean Primary & Secondary only */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/explore"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#9A3412] hover:bg-[#7C2D12] text-white font-sans font-semibold text-sm transition-all shadow-sm group"
              >
                <Compass className="w-4 h-4" />
                <span>Explore the Museum</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/ai-guide"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F4EFE6] text-[#1C1917] border border-[#E7E1D4] hover:border-[#9A3412] font-sans font-semibold text-sm transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#B45309]" />
                <span>Meet the AI Heritage Guide</span>
              </Link>
            </div>

            {/* Editorial Museum Meta Highlight */}
            <div className="pt-6 border-t border-[#E7E1D4] grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="font-bold text-[#1C1917] block">5,000+ Years</span>
                <span className="text-[#78716C]">Civilizational History</span>
              </div>
              <div>
                <span className="font-bold text-[#1C1917] block">28 States & UTs</span>
                <span className="text-[#78716C]">Regional Collections</span>
              </div>
              <div>
                <span className="font-bold text-[#1C1917] block">Curated Archive</span>
                <span className="text-[#78716C]">Digital Preservation</span>
              </div>
            </div>
          </div>

          {/* Right Museum Visual Frame Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] p-3 sm:p-4 shadow-md">
              {/* Museum Framed Photograph */}
              <div className="relative h-[380px] sm:h-[460px] overflow-hidden rounded-xl bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1599818458999-f2c9e782e2c3?auto=format&fit=crop&w=1200&q=85"
                  alt="Chola Bronze Nataraja Artifact"
                  className="w-full h-full object-cover object-center brightness-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-sans bg-black/60 text-white/90">
                  Representative Photography
                </div>
              </div>

              {/* Museum Institutional Caption Plaque */}
              <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#78716C]">
                <div>
                  <strong className="text-[#1C1917] font-serif-display text-sm block">
                    Nataraja — Lord of the Cosmic Dance
                  </strong>
                  <span>Chola Dynasty • 11th Century CE • Tamil Nadu</span>
                </div>
                <Link
                  href="/artifact/chola-bronze-nataraja"
                  className="text-xs font-semibold text-[#9A3412] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>View Artifact</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
