'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Globe, Heart, Award, ArrowRight } from 'lucide-react';

export default function PreservationStats() {
  const stats = [
    { value: '10,000+', label: 'Digital Artifacts Preserved', desc: 'High-definition 3D models, gigapixel murals, and historical codices.' },
    { value: '28 States', label: 'National Subcontinental Reach', desc: 'Preserving tangible and intangible lore across every state and union territory.' },
    { value: '100+', label: 'Heritage Sites Mapped', desc: 'Geo-spatial documentation of UNESCO, ASI, and living cultural clusters.' },
    { value: '12+ Languages', label: 'Multilingual Inclusivity', desc: 'Accessible through text, audio synthesis, and native Indian scripts.' }
  ];

  return (
    <section className="w-full py-24 bg-[#FAF7F0] border-t border-[#E2DAC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-serif-display uppercase font-bold tracking-widest text-[#BE4D2A]">
            <Shield className="w-4 h-4" />
            <span>National Digital Conservation</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1A17]">
            Preserving Heritage for Future Generations
          </h2>
          <p className="font-serif-editorial text-lg sm:text-xl text-[#5C554B] leading-relaxed">
            Bridging ancient civilizational knowledge with modern artificial intelligence, 3D photogrammetry, and sustainable tourism ethics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-sm hover:shadow-xl hover:border-[#C5A059] transition-all text-center space-y-3"
            >
              <p className="font-serif-display text-4xl sm:text-5xl font-bold text-[#BE4D2A]">
                {stat.value}
              </p>
              <h3 className="font-serif-display text-base font-bold text-[#1C1A17]">
                {stat.label}
              </h3>
              <p className="text-xs text-[#5C554B] leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Sustainable Heritage Tourism & Living Crafts Callout Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1C1A17] via-[#2A2621] to-[#141311] text-[#FAF7F0] border border-[#C5A059]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6CD92] bg-[#332E27] px-3 py-1 rounded-full border border-[#C5A059]/30">
              Sustainable Cultural Economy
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF7F0]">
              Empowering 100,000+ Master Artisans
            </h3>
            <p className="text-sm text-[#D4C8B2] leading-relaxed">
              Every virtual tour and sustainable travel itinerary directly champions GI-certified crafts, reducing overtourism at crowded monuments while channeling direct economic revenue to traditional weaving and sculpting communities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <Link
              href="/sustainable-travel"
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-[#BE4D2A] hover:bg-[#98381A] text-white text-xs font-serif-display uppercase font-bold tracking-wider transition-colors shadow-lg"
            >
              Plan Sustainable Journey
            </Link>
            <Link
              href="/artisans"
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-[#24211D] border border-[#C5A059]/50 hover:border-[#C5A059] text-[#E6CD92] text-xs font-serif-display uppercase font-bold tracking-wider transition-colors"
            >
              Meet Master Artisans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
