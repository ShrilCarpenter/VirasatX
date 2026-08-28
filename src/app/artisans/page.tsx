'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Heart, ShieldCheck, MapPin, Compass, ExternalLink, Sparkles, Users, Info } from 'lucide-react';
import { MASTER_ARTISANS_DATA } from '@/data/artisansData';

export default function ArtisansPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Page Header */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#78716C] text-xs font-sans font-medium">
            <Users className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>Living Heritage & Master Traditions</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Living Heritage & Master Artisans
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] max-w-2xl">
            Indian heritage lives not only in stone monuments and manuscripts, but in the hands of master artisan guilds preserving millennia of GI-certified techniques.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Curatorial Note */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] flex items-start gap-3 text-xs text-[#57534E]">
          <Info className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
          <p>
            The master artisans profiled here represent recognized GI-tagged craft traditions across India. Biographical notes and technique descriptions are curated from published cultural documentation and artisan cooperatives.
          </p>
        </div>

        {/* Master Artisan Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MASTER_ARTISANS_DATA.map(artisan => (
            <div
              key={artisan.id}
              className="group rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm hover:shadow-md hover:border-[#9A3412]/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo & Craft Image */}
                <div className="relative h-56 overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artisan.craftImageUrl}
                    alt={artisan.craftName}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* GI Tag Badge */}
                  {artisan.giTagCertified && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#FFFFFF]/90 text-[#15803D] border border-[#E7E1D4] shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#15803D]" />
                      <span>{artisan.giTagName}</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-mono text-amber-200">{artisan.villageTown}, {artisan.state}</span>
                    <h3 className="font-serif-display text-base font-bold">
                      {artisan.craftName}
                    </h3>
                  </div>
                </div>

                {/* Artisan Bio */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 shrink-0 border border-[#E7E1D4] relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={artisan.portraitUrl} alt={artisan.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif-display text-sm font-bold text-[#1C1917]">
                        {artisan.name}
                      </h4>
                      <p className="text-xs text-[#78716C]">{artisan.generation}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#44403C] leading-relaxed line-clamp-3">
                    {artisan.story}
                  </p>

                  {/* Materials & Technique */}
                  <div className="space-y-1.5 text-xs text-[#57534E] bg-[#FBF9F4] p-3 rounded-xl border border-[#E7E1D4]">
                    <div>
                      <strong className="text-[#1C1917]">Technique:</strong> {artisan.techniqueSummary}
                    </div>
                    <div className="pt-1 border-t border-[#E7E1D4] flex items-center justify-between">
                      <span className="text-[#78716C]">Craft Process:</span>
                      <span className="text-[#15803D] font-semibold">100% Handcrafted & Natural Dyes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cooperative Guild */}
              <div className="p-5 pt-0">
                <div className="p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E7E1D4] text-[11px] text-[#78716C] flex items-center justify-between">
                  <span className="truncate pr-2">{artisan.contactCooperative}</span>
                  <span className="text-[#9A3412] font-semibold uppercase shrink-0">Craft Guild</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
