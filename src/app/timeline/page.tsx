'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Clock, Calendar, Compass, User, Landmark,
  Palette, MapPin, ArrowRight, Sparkles, Layers, ChevronRight
} from 'lucide-react';
import { TIMELINE_EPOCHS } from '@/data/timelineData';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { TimelineEpoch } from '@/types';

function TimelineContent() {
  const searchParams = useSearchParams();
  const epochParam = searchParams.get('epoch');

  const [selectedEpochId, setSelectedEpochId] = useState<string>(
    epochParam || TIMELINE_EPOCHS[0].id
  );

  useEffect(() => {
    if (epochParam && TIMELINE_EPOCHS.some(e => e.id === epochParam)) {
      setSelectedEpochId(epochParam);
    }
  }, [epochParam]);

  const currentEpoch =
    TIMELINE_EPOCHS.find(e => e.id === selectedEpochId) || TIMELINE_EPOCHS[0];

  const epochArtifacts = ARTIFACTS_DATA.filter(a =>
    currentEpoch.relatedArtifactIds.includes(a.id) || a.period === currentEpoch.name
  );

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Header Banner */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#C5A059]/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2621] border border-[#C5A059]/40 text-[#E6CD92] text-xs font-serif-display uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Chronological Horizons of India</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0]">
            India Through Time
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#D4C8B2] max-w-2xl">
            An interactive odyssey spanning 5,000 years of civilization—from Harappan grid-cities and Upanishadic philosophy to classical temple monoliths and modern sovereign preservation.
          </p>
        </div>
      </div>

      {/* Main Timeline Experience */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Horizontal Timeline Scrubber Ribbon */}
        <div className="mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center gap-3 min-w-max">
            {TIMELINE_EPOCHS.map((epoch, idx) => {
              const isSelected = selectedEpochId === epoch.id;
              return (
                <button
                  key={epoch.id}
                  onClick={() => setSelectedEpochId(epoch.id)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-[#1C1A17] text-[#FAF7F0] border-[#C5A059] shadow-xl scale-105'
                      : 'bg-[#FFFDF9] text-[#3D3934] border-[#E2DAC9] hover:border-[#C5A059] hover:bg-[#F4EFE2]'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-0 left-0 right-0 h-1 bg-[#BE4D2A]" />
                  )}
                  <span className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isSelected ? 'text-[#E6CD92]' : 'text-[#8C8275]'}`}>
                    {epoch.dateRange}
                  </span>
                  <h3 className={`font-serif-display text-sm font-bold ${isSelected ? 'text-[#FAF7F0]' : 'text-[#1C1A17]'}`}>
                    {epoch.name}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Epoch Deep Dive Showcase */}
        <div className="bg-[#FFFDF9] border border-[#E2DAC9] rounded-3xl overflow-hidden shadow-xl">
          {/* Hero Banner for Selected Epoch */}
          <div className="relative h-72 sm:h-96 overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentEpoch.heroImageUrl}
              alt={currentEpoch.name}
              className="w-full h-full object-cover brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-[#1C1A17]/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6CD92] bg-[#1C1A17]/80 px-3 py-1 rounded-full border border-[#C5A059]/40">
                {currentEpoch.dateRange}
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold">
                {currentEpoch.name}
              </h2>
              <p className="font-serif-display text-sm text-[#D8CFBF] italic">
                {currentEpoch.nativeName}
              </p>
            </div>
          </div>

          {/* Epoch Content Body */}
          <div className="p-6 sm:p-12 space-y-10">
            {/* Summary */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#BE4D2A]">
                Historical Overview & Synthesis
              </h3>
              <p className="font-serif-editorial text-xl sm:text-2xl text-[#1C1A17] leading-relaxed">
                “{currentEpoch.summary}”
              </p>
              <p className="text-sm sm:text-base text-[#4A443C] leading-relaxed pt-2">
                {currentEpoch.description}
              </p>
            </div>

            {/* 3-Column Dossier Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-[#E2DAC9]">
              {/* Col 1: Major Historical Events */}
              <div className="space-y-4 p-6 rounded-2xl bg-[#FAF7F0] border border-[#E2DAC9]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#BE4D2A]">
                  <Calendar className="w-4 h-4" />
                  <span>Key Civilizational Events</span>
                </div>
                <div className="space-y-2.5">
                  {currentEpoch.keyEvents.map((ev, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#3D3934]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BE4D2A] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{ev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 2: Prominent Figures & Thinkers */}
              <div className="space-y-4 p-6 rounded-2xl bg-[#FAF7F0] border border-[#E2DAC9]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                  <User className="w-4 h-4" />
                  <span>Rulers, Polymaths & Sages</span>
                </div>
                <div className="space-y-2">
                  {currentEpoch.prominentFigures.map((fig, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#1C1A17]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                      <span>{fig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 3: Architecture & Artistic Traditions */}
              <div className="space-y-4 p-6 rounded-2xl bg-[#FAF7F0] border border-[#E2DAC9]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981]">
                  <Landmark className="w-4 h-4" />
                  <span>Architecture & Visual Arts</span>
                </div>
                <div className="space-y-2 text-xs text-[#3D3934]">
                  <div>
                    <span className="font-bold text-[#1C1A17]">Architectural Canon:</span>
                    <p className="mt-0.5">{currentEpoch.architecturalStyle}</p>
                  </div>
                  <div className="pt-2">
                    <span className="font-bold text-[#1C1A17]">Artistic Traditions:</span>
                    <p className="mt-0.5">{currentEpoch.artisticTraditions.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connected Artifacts Section */}
            {epochArtifacts.length > 0 && (
              <div className="pt-8 border-t border-[#E2DAC9]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif-display text-2xl font-bold text-[#1C1A17]">
                    Masterpieces from the {currentEpoch.name}
                  </h3>
                  <Link
                    href={`/explore?period=${encodeURIComponent(currentEpoch.name)}`}
                    className="text-xs font-serif-display uppercase font-bold text-[#BE4D2A] hover:underline"
                  >
                    View All Epoch Artifacts →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {epochArtifacts.map(art => (
                    <Link
                      key={art.id}
                      href={`/artifact/${art.id}`}
                      className="group rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#E2DAC9] hover:border-[#BE4D2A] shadow-sm hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden bg-stone-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#1C1A17]/80 text-[#E6CD92]">
                          {art.category}
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif-display text-base font-bold text-[#1C1A17] group-hover:text-[#BE4D2A] transition-colors line-clamp-1">
                            {art.title}
                          </h4>
                          <p className="text-xs text-[#8C8275] mt-1">
                            {art.location} • {art.material}
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-[#E2DAC9]/60 flex items-center justify-between text-xs font-semibold text-[#BE4D2A]">
                          <span>Inspect Masterpiece</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-sm font-serif-display">Loading Historical Timeline...</div>}>
      <TimelineContent />
    </Suspense>
  );
}
