'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Heart, ShieldCheck, MapPin, Compass, ExternalLink, Sparkles } from 'lucide-react';
import { MASTER_ARTISANS_DATA } from '@/data/artisansData';

export default function ArtisansPage() {
  const [selectedArtisan, setSelectedArtisan] = useState(MASTER_ARTISANS_DATA[0]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Page Header */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#C5A059]/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2621] border border-[#C5A059]/40 text-[#E6CD92] text-xs font-serif-display uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Living Heritage & Master Artisans Directory</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0]">
            The Master Artisans of India
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#D4C8B2] max-w-2xl">
            Celebrating the hereditary craft families whose hands maintain thousands of years of GI-certified bronze metallurgy, double-ikat weaving, and botanical pigment art.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Master Artisan Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MASTER_ARTISANS_DATA.map(artisan => (
            <div
              key={artisan.id}
              className="group rounded-3xl overflow-hidden bg-[#FFFDF9] border border-[#E2DAC9] shadow-sm hover:shadow-xl hover:border-[#C5A059] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo & Craft Image */}
                <div className="relative h-60 overflow-hidden bg-stone-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artisan.craftImageUrl}
                    alt={artisan.craftName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141311]/90 via-transparent to-transparent" />

                  {/* GI Tag Badge */}
                  {artisan.giTagCertified && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#1C1A17]/80 text-[#10B981] border border-[#10B981]/40 backdrop-blur-sm flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{artisan.giTagName}</span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-mono text-[#E6CD92]">{artisan.villageTown}, {artisan.state}</span>
                    <h3 className="font-serif-display text-lg font-bold">
                      {artisan.craftName}
                    </h3>
                  </div>
                </div>

                {/* Artisan Bio */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-200 shrink-0 border-2 border-[#C5A059]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={artisan.portraitUrl} alt={artisan.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif-display text-base font-bold text-[#1C1A17]">
                        {artisan.name}
                      </h4>
                      <p className="text-xs text-[#8C8275]">{artisan.generation}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A443C] leading-relaxed line-clamp-3">
                    {artisan.story}
                  </p>

                  {/* Materials & Technique */}
                  <div className="space-y-1.5 text-xs text-[#5C554B] bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#E2DAC9]">
                    <div>
                      <strong className="text-[#1C1A17]">Technique:</strong> {artisan.techniqueSummary}
                    </div>
                    <div className="pt-1.5 border-t border-[#E2DAC9]/60">
                      <strong className="text-[#1C1A17]">Sustainability Rating:</strong>{' '}
                      <span className="text-[#10B981] font-bold">{artisan.sustainabilityRating}/100</span> (Eco Handcrafted)
                    </div>
                  </div>
                </div>
              </div>

              {/* Cooperative Contact Link */}
              <div className="p-6 pt-0">
                <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#E2DAC9] text-[11px] text-[#8C8275] flex items-center justify-between">
                  <span className="truncate pr-2">{artisan.contactCooperative}</span>
                  <span className="text-[#BE4D2A] font-bold uppercase shrink-0">Ethical Guild</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
