'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { TIMELINE_EPOCHS } from '@/data/timelineData';
import Card3DTilt from '@/components/common/Card3DTilt';
import HeritageImage from '@/components/common/HeritageImage';

export default function TimelineRibbon() {
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState(0);

  const keyEras = [
    {
      title: 'Ancient India',
      period: '2600 BCE – 600 BCE',
      epochId: 'indus-valley',
      highlight: 'Indus Valley Urbanism & Vedic Philosophy',
      thumbnailUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dancing_girl_of_Mohenjo-daro.jpg'
    },
    {
      title: 'Classical India',
      period: '600 BCE – 550 CE',
      epochId: 'mauryan-era',
      highlight: 'Mauryan Imperial Unity & Gupta Golden Age',
      thumbnailUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lion_Capital_of_Ashoka_2.jpg'
    },
    {
      title: 'Early Medieval',
      period: '550 CE – 1300 CE',
      epochId: 'chola-era',
      highlight: 'Chola Maritime Bronzes & Monolithic Kailasa',
      thumbnailUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Brihadisvara_Temple,_Thanjavur,_Tamil_Nadu,_India.jpg'
    },
    {
      title: 'Late Medieval',
      period: '1300 CE – 1818 CE',
      epochId: 'vijayanagara-era',
      highlight: 'Vijayanagara Splendor, Mughals & Marathas',
      thumbnailUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Stone_chariot_at_Hampi.jpg'
    },
    {
      title: 'Modern India',
      period: '1947 – Present',
      epochId: 'independent-era',
      highlight: 'Sovereign Republic & Living Cultural Preservation',
      thumbnailUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kathakali_dancer.jpg'
    },
  ];

  const currentEra = keyEras[selectedPeriodIdx];
  const matchedEpoch = TIMELINE_EPOCHS.find(e => e.id === currentEra.epochId) || TIMELINE_EPOCHS[0];

  return (
    <section className="w-full py-20 sm:py-24 bg-[#F4EFE6] border-b border-[#E7E1D4]">
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
            <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] mt-1 max-w-2xl">
              Chronological journeys across 5,000 years of civilizational evolution, master metallurgy, and rock architecture.
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

        {/* Visual Timeline Era Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {keyEras.map((era, idx) => {
            const isSelected = selectedPeriodIdx === idx;
            return (
              <button
                key={era.title}
                onClick={() => setSelectedPeriodIdx(idx)}
                className={`group rounded-xl overflow-hidden text-left border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FFFFFF] text-[#1C1917] border-[#9A3412] shadow-md ring-2 ring-[#9A3412]/30'
                    : 'bg-[#FBF9F4] text-[#44403C] border-[#E7E1D4] hover:bg-[#FFFFFF] hover:border-[#9A3412]/50'
                }`}
              >
                {/* Era Image Thumbnail */}
                <div className="relative h-24 w-full overflow-hidden bg-stone-200">
                  <HeritageImage
                    src={era.thumbnailUrl}
                    alt={era.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isSelected ? 'scale-105 brightness-100' : 'group-hover:scale-105 brightness-90'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-white/90 drop-shadow-sm font-semibold">
                    {era.period}
                  </span>
                </div>

                <div className="p-3">
                  <h3 className="font-serif-display text-sm sm:text-base font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors">
                    {era.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Large Historical Epoch Spotlight Card with 3D Tilt */}
        <Card3DTilt maxTilt={6} scaleOnHover={1.01} className="rounded-2xl">
          <div className="bg-[#FFFFFF] border border-[#E7E1D4] rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Large Historical Visual Column */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px] bg-stone-100">
              <HeritageImage
                src={matchedEpoch.heroImageUrl}
                alt={matchedEpoch.name}
                className="w-full h-full object-cover object-center brightness-[0.96]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              
              {/* Overlay Caption */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-200 block">
                  {matchedEpoch.dateRange}
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                  {matchedEpoch.name}
                </h3>
                {matchedEpoch.nativeName && (
                  <p className="text-xs text-white/80 font-serif-display italic mt-0.5">
                    {matchedEpoch.nativeName}
                  </p>
                )}
              </div>
            </div>

            {/* Curated Historical Narrative Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E7E1D4] pb-3">
                  <span className="text-xs font-mono tracking-wider text-[#9A3412] font-bold">
                    {matchedEpoch.dateRange}
                  </span>
                  <span className="text-xs text-[#78716C]">
                    {matchedEpoch.primaryLocations.slice(0, 3).join(' • ')}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
                  {matchedEpoch.description}
                </p>

                {/* Key Events List */}
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                    Key Historical Milestones:
                  </p>
                  <div className="space-y-2">
                    {matchedEpoch.keyEvents.slice(0, 3).map((event, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#44403C]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9A3412] mt-1.5 shrink-0" />
                        <span>{event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Plaque */}
              <div className="pt-4 border-t border-[#E7E1D4] flex items-center justify-between">
                <span className="text-xs text-[#78716C]">
                  Art & Architecture: <strong className="text-[#1C1917]">{matchedEpoch.architecturalStyle.split(',')[0]}</strong>
                </span>

                <Link
                  href={`/timeline?epoch=${matchedEpoch.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#9A3412] hover:text-[#7C2D12] group"
                >
                  <span>Examine Full Era</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </Card3DTilt>

      </div>
    </section>
  );
}
