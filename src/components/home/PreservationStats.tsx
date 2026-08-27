'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Globe, Landmark, ArrowRight, Heart, Award } from 'lucide-react';

export default function PreservationStats() {
  const stats = [
    { value: '30+ Masterpieces', label: 'Curated Digital Collection', desc: 'Verified 3D models, architectural scans, and ancient codices.' },
    { value: '11 Epochs', label: 'Chronological Scope', desc: 'From the Harappan Bronze Age (2600 BCE) to the Modern Republic.' },
    { value: '28 States', label: 'National Heritage Mapped', desc: 'Documenting monuments, archaeological sites, and craft clusters.' },
    { value: '8 Languages', label: 'Multilingual Access', desc: 'Available in English, Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, and Kannada.' }
  ];

  return (
    <section className="w-full py-20 bg-[#FBF9F4] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase font-bold tracking-widest text-[#9A3412]">
            <Shield className="w-3.5 h-3.5" />
            <span>Digital Heritage Preservation</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Preserving Heritage for Future Generations
          </h2>
          <p className="font-serif-editorial text-lg text-[#57534E]">
            Bridging classical civilizational knowledge with transparent artificial intelligence, 3D digitization, and responsible tourism.
          </p>
        </div>

        {/* Honest Credible Prototype Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm text-center space-y-2"
            >
              <p className="font-serif-display text-3xl font-bold text-[#9A3412]">
                {stat.value}
              </p>
              <h3 className="font-serif-display text-base font-bold text-[#1C1917]">
                {stat.label}
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Responsible Tourism & Living Heritage Institutional Banner */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#F4EFE6] border border-[#E7E1D4] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase text-[#9A3412] font-semibold">
              SIH 2026 Theme: Heritage & Culture
            </span>
            <h3 className="font-serif-display text-2xl font-bold text-[#1C1917]">
              Living Traditions & Responsible Heritage Discovery
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Virasat AI highlights GI-certified craft traditions and promotes mindful visitor practices to protect fragile monuments from overtourism while honoring hereditary artisan communities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/sustainable-travel"
              className="px-5 py-2.5 rounded-full bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-sans font-semibold transition-colors shadow-sm"
            >
              Responsible Travel
            </Link>
            <Link
              href="/artisans"
              className="px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#FBF9F4] border border-[#E7E1D4] text-[#1C1917] text-xs font-sans font-semibold transition-colors"
            >
              Living Heritage
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
