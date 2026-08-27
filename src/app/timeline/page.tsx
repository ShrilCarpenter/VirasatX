'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Clock, Calendar, Compass, User, Landmark,
  Palette, MapPin, ArrowRight, Layers, ChevronRight
} from 'lucide-react';
import { TIMELINE_EPOCHS } from '@/data/timelineData';
import { ARTIFACTS_DATA } from '@/data/artifactsData';

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
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Header Banner */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#78716C] text-xs font-sans font-medium">
            <Clock className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>Chronological Horizons of India</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Historical Timeline
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] max-w-2xl">
            An interactive timeline spanning 5,000 years of civilization—from Harappan urbanism and Vedic philosophy to classical temple architecture and the modern republic.
          </p>
        </div>
      </div>

      {/* Main Timeline Experience */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Horizontal Timeline Scrubber Ribbon */}
        <div className="mb-10 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center gap-3 min-w-max">
            {TIMELINE_EPOCHS.map((epoch, idx) => {
              const isSelected = selectedEpochId === epoch.id;
              return (
                <button
                  key={epoch.id}
                  onClick={() => setSelectedEpochId(epoch.id)}
                  className={`p-4 rounded-xl text-left border transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-[#FFFFFF] text-[#1C1917] border-[#9A3412] shadow-md ring-1 ring-[#9A3412]/30'
                      : 'bg-[#F4EFE6] text-[#44403C] border-[#E7E1D4] hover:bg-[#FFFFFF] hover:border-[#9A3412]/40'
                  }`}
                >
                  <span className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isSelected ? 'text-[#9A3412] font-bold' : 'text-[#78716C]'}`}>
                    {epoch.dateRange}
                  </span>
                  <h3 className="font-serif-display text-sm font-bold text-[#1C1917]">
                    {epoch.name}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Epoch Deep Dive Showcase */}
        <div className="bg-[#FFFFFF] border border-[#E7E1D4] rounded-2xl overflow-hidden shadow-sm space-y-8 p-6 sm:p-10">
          
          {/* Top Epoch Info Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Framed Image */}
            <div className="lg:col-span-5 rounded-xl overflow-hidden bg-stone-100 border border-[#E7E1D4] h-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentEpoch.heroImageUrl}
                alt={currentEpoch.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Dossier */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#9A3412] uppercase tracking-wider">
                    {currentEpoch.dateRange}
                  </span>
                  <span className="text-xs text-[#78716C]">
                    • {currentEpoch.primaryLocations.slice(0, 3).join(', ')}
                  </span>
                </div>
                <h2 className="font-serif-display text-3xl font-bold text-[#1C1917]">
                  {currentEpoch.name}
                </h2>
                {currentEpoch.nativeName && (
                  <p className="text-sm font-serif-display text-[#78716C] italic">
                    {currentEpoch.nativeName}
                  </p>
                )}
              </div>

              <p className="text-sm text-[#44403C] leading-relaxed">
                {currentEpoch.summary}
              </p>

              {/* Epoch Stats & Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-[#FBF9F4] border border-[#E7E1D4]">
                  <strong className="text-[#1C1917] block mb-0.5">Architectural Style:</strong>
                  <span className="text-[#57534E]">{currentEpoch.architecturalStyle}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FBF9F4] border border-[#E7E1D4]">
                  <strong className="text-[#1C1917] block mb-0.5">Prominent Rulers & Thinkers:</strong>
                  <span className="text-[#57534E]">{currentEpoch.prominentFigures.join(', ')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Historical Milestones */}
          <div className="pt-6 border-t border-[#E7E1D4] space-y-4">
            <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
              Key Civilizational Milestones & Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentEpoch.keyEvents.map((ev, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#9A3412] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-[#44403C] leading-relaxed">{ev}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Artifacts */}
          {epochArtifacts.length > 0 && (
            <div className="pt-6 border-t border-[#E7E1D4] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
                  Curated Artifacts from this Epoch
                </h3>
                <Link
                  href={`/explore?period=${encodeURIComponent(currentEpoch.name)}`}
                  className="text-xs font-sans font-semibold text-[#9A3412] hover:underline"
                >
                  Explore all from this era →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {epochArtifacts.map(art => (
                  <Link
                    key={art.id}
                    href={`/artifact/${art.id}`}
                    className="group rounded-xl overflow-hidden bg-[#FBF9F4] border border-[#E7E1D4] hover:border-[#9A3412]/50 hover:bg-[#FFFFFF] shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-white/90 text-[#1C1917] shadow-sm">
                        {art.category}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-serif-display text-base font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors line-clamp-1">
                        {art.title}
                      </h4>
                      <p className="text-xs text-[#78716C]">
                        {art.material} • {art.location}, {art.state}
                      </p>
                      <div className="pt-2 border-t border-[#E7E1D4] flex items-center justify-between text-xs font-semibold text-[#9A3412]">
                        <span>Examine Artifact</span>
                        <ArrowRight className="w-3.5 h-3.5" />
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
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF9F4] flex items-center justify-center text-sm font-serif-display">Loading Historical Timeline...</div>}>
      <TimelineContent />
    </Suspense>
  );
}
