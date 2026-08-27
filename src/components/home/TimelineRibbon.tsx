'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, ChevronRight, Landmark } from 'lucide-react';
import { TIMELINE_EPOCHS } from '@/data/timelineData';

export default function TimelineRibbon() {
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState(0);

  const keyEras = [
    { title: 'Ancient India', period: '2600 BCE – 600 BCE', epochId: 'indus-valley', highlight: 'Indus Valley Urbanism & Vedic Philosophy' },
    { title: 'Classical India', period: '600 BCE – 550 CE', epochId: 'mauryan-era', highlight: 'Mauryan Imperial Unity & Gupta Golden Age' },
    { title: 'Early Medieval', period: '550 CE – 1300 CE', epochId: 'chola-era', highlight: 'Chola Maritime Bronzes & Monolithic Kailasa' },
    { title: 'Late Medieval', period: '1300 CE – 1818 CE', epochId: 'vijayanagara-era', highlight: 'Vijayanagara Splendor, Mughals & Marathas' },
    { title: 'Modern India', period: '1947 – Present', epochId: 'independent-era', highlight: 'Sovereign Republic & Living Cultural Preservation' },
  ];

  const currentEra = keyEras[selectedPeriodIdx];
  const matchedEpoch = TIMELINE_EPOCHS.find(e => e.id === currentEra.epochId) || TIMELINE_EPOCHS[0];

  return (
    <section className="w-full py-20 bg-[#F4EFE6] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans uppercase font-bold tracking-widest text-[#9A3412] mb-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Historical Epochs</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Explore India Through Time
            </h2>
            <p className="font-serif-editorial text-lg text-[#57534E] mt-1 max-w-xl">
              Chronological journeys across 5,000 years of dynastic evolution, artistic traditions, and architectural marvels.
            </p>
          </div>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#9A3412] hover:text-[#7C2D12] group"
          >
            <span>View Complete 11-Epoch Timeline</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Clean Timeline Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {keyEras.map((era, idx) => {
            const isSelected = selectedPeriodIdx === idx;
            return (
              <button
                key={era.title}
                onClick={() => setSelectedPeriodIdx(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#FFFFFF] text-[#1C1917] border-[#9A3412] shadow-md ring-1 ring-[#9A3412]/30'
                    : 'bg-[#FBF9F4] text-[#44403C] border-[#E7E1D4] hover:bg-[#FFFFFF] hover:border-[#9A3412]/40'
                }`}
              >
                <span className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isSelected ? 'text-[#9A3412] font-bold' : 'text-[#78716C]'}`}>
                  {era.period}
                </span>
                <h3 className="font-serif-display text-base font-bold text-[#1C1917]">
                  {era.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Epoch Spotlight Box */}
        <div className="bg-[#FFFFFF] border border-[#E7E1D4] rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[340px] bg-stone-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={matchedEpoch.heroImageUrl}
              alt={matchedEpoch.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-3 left-4 right-4 text-white lg:hidden">
              <span className="text-[10px] font-mono">{matchedEpoch.dateRange}</span>
              <h4 className="font-serif-display text-lg font-bold">{matchedEpoch.name}</h4>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E7E1D4] pb-2.5">
                <span className="text-xs font-mono tracking-wider text-[#9A3412] font-bold">
                  {matchedEpoch.dateRange}
                </span>
                <span className="text-xs text-[#78716C]">
                  {matchedEpoch.primaryLocations.slice(0, 3).join(' • ')}
                </span>
              </div>

              <h3 className="font-serif-display text-2xl font-bold text-[#1C1917]">
                {matchedEpoch.name}
              </h3>
              {matchedEpoch.nativeName && (
                <p className="text-xs text-[#78716C] font-serif-display italic -mt-2">
                  {matchedEpoch.nativeName}
                </p>
              )}

              <p className="text-sm text-[#44403C] leading-relaxed">
                {matchedEpoch.summary}
              </p>

              {/* Civilizational Highlights */}
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                  Key Historical Milestones:
                </p>
                <div className="space-y-1">
                  {matchedEpoch.keyEvents.slice(0, 2).map((ev, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#44403C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9A3412] mt-1 shrink-0" />
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="pt-4 border-t border-[#E7E1D4] flex items-center justify-between">
              <span className="text-xs text-[#78716C]">
                Architecture: <strong className="text-[#1C1917]">{matchedEpoch.architecturalStyle.split(',')[0]}</strong>
              </span>
              <Link
                href={`/timeline?epoch=${matchedEpoch.id}`}
                className="inline-flex items-center gap-1 text-xs font-sans font-bold uppercase tracking-wider text-[#9A3412] hover:text-[#7C2D12]"
              >
                <span>Examine Epoch Dossier</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
