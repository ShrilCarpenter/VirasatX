'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { TIMELINE_EPOCHS } from '@/data/timelineData';

export default function TimelineRibbon() {
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState(0);

  const keyEras = [
    { title: 'Ancient India', period: '2600 BCE – 600 BCE', epochId: 'indus-valley', highlight: 'Indus Valley Civilization & Vedic Philosophy' },
    { title: 'Classical India', period: '600 BCE – 550 CE', epochId: 'mauryan-era', highlight: 'Mauryan Imperial Unity & Gupta Golden Age' },
    { title: 'Early Medieval', period: '550 CE – 1300 CE', epochId: 'chola-era', highlight: 'Chola Maritime Bronzes & Monolithic Kailasa' },
    { title: 'Late Medieval', period: '1336 CE – 1818 CE', epochId: 'vijayanagara-era', highlight: 'Vijayanagara Splendor, Mughals & Marathas' },
    { title: 'Modern India', period: '1947 CE – Present', epochId: 'independent-era', highlight: 'Sovereign Republic & Living Craft Preservation' },
  ];

  const currentEra = keyEras[selectedPeriodIdx];
  const matchedEpoch = TIMELINE_EPOCHS.find(e => e.id === currentEra.epochId) || TIMELINE_EPOCHS[0];

  return (
    <section className="w-full py-20 bg-[#F4EFE2] border-y border-[#E2DAC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-serif-display uppercase font-bold tracking-widest text-[#BE4D2A] mb-2">
              <Clock className="w-4 h-4" />
              <span>Chronological Horizon</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1A17]">
              Explore India Through Time
            </h2>
            <p className="font-serif-editorial text-lg text-[#5C554B] mt-1 max-w-xl">
              Travel across 5,000 years of dynastic evolution, artistic revolutions, and intellectual discoveries.
            </p>
          </div>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 text-sm font-serif-display font-bold uppercase tracking-wider text-[#BE4D2A] hover:text-[#98381A] group"
          >
            <span>Explore All 11 Epochs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Period Ribbon Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {keyEras.map((era, idx) => {
            const isSelected = selectedPeriodIdx === idx;
            return (
              <button
                key={era.title}
                onClick={() => setSelectedPeriodIdx(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#1C1A17] text-[#FAF7F0] border-[#C5A059] shadow-lg scale-[1.02]'
                    : 'bg-[#FFFDF9] text-[#2C2824] border-[#E2DAC9] hover:border-[#C5A059] hover:bg-[#FAF7F0]'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-0 left-0 right-0 h-1 bg-[#BE4D2A]" />
                )}
                <span className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${isSelected ? 'text-[#E6CD92]' : 'text-[#8C8275]'}`}>
                  {era.period}
                </span>
                <h3 className={`font-serif-display text-base font-bold ${isSelected ? 'text-[#FAF7F0]' : 'text-[#1C1A17]'}`}>
                  {era.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Era Spotlight Card */}
        <div className="bg-[#FFFDF9] border border-[#E2DAC9] rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[400px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={matchedEpoch.heroImageUrl}
              alt={matchedEpoch.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141311]/80 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
              <span className="text-xs uppercase font-mono text-[#E6CD92]">{matchedEpoch.dateRange}</span>
              <h4 className="font-serif-display text-xl font-bold">{matchedEpoch.name}</h4>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2DAC9]/60 pb-3">
                <span className="text-xs uppercase font-mono tracking-widest text-[#BE4D2A] font-bold">
                  {matchedEpoch.dateRange}
                </span>
                <span className="text-xs text-[#8C8275] bg-[#F4EFE2] px-2.5 py-1 rounded-full">
                  {matchedEpoch.artifactsCount}+ Catalogued Artifacts
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1A17]">
                {matchedEpoch.name}
              </h3>
              <p className="text-xs text-[#8C8275] font-serif-display italic -mt-2">
                {matchedEpoch.nativeName}
              </p>

              <p className="text-sm sm:text-base text-[#4A443C] leading-relaxed">
                {matchedEpoch.summary}
              </p>

              {/* Key Events List */}
              <div className="space-y-2 pt-2">
                <p className="text-xs uppercase font-bold tracking-wider text-[#8C8275]">
                  Civilizational Milestones:
                </p>
                <div className="space-y-1.5">
                  {matchedEpoch.keyEvents.slice(0, 2).map((ev, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#3D3934]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BE4D2A] mt-1.5 shrink-0" />
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E2DAC9]/60 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#8C8275]">
                Key Styles: <span className="font-medium text-[#1C1A17]">{matchedEpoch.architecturalStyle.split(',')[0]}</span>
              </div>

              <Link
                href={`/timeline?epoch=${matchedEpoch.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1A17] text-[#FAF7F0] hover:bg-[#BE4D2A] text-xs font-serif-display uppercase font-semibold tracking-wider transition-colors shadow-md"
              >
                <span>Deep Dive into this Epoch</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
