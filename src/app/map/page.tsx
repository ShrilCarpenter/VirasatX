'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  MapPin, Filter, Compass, Landmark, Shield, Sparkles,
  ArrowRight, X, ExternalLink, Award, Users, Leaf
} from 'lucide-react';
import { HERITAGE_MAP_SITES } from '@/data/heritageMapData';
import { HeritageSiteLocation, MarkerType, HeritageRegion } from '@/types';

const MARKER_CATEGORIES: MarkerType[] = [
  'Monument', 'Archaeological site', 'UNESCO site', 'Craft', 'Living tradition'
];

const REGIONS: HeritageRegion[] = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];

function MapContent() {
  const searchParams = useSearchParams();
  const siteParam = searchParams.get('site');
  const regionParam = searchParams.get('region');

  const [selectedSiteId, setSelectedSiteId] = useState<string>(
    siteParam || HERITAGE_MAP_SITES[0].id
  );
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>(regionParam || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSites = useMemo(() => {
    return HERITAGE_MAP_SITES.filter(site => {
      if (selectedType && site.type !== selectedType) return false;
      if (selectedRegion && site.region !== selectedRegion) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          site.name.toLowerCase().includes(q) ||
          site.state.toLowerCase().includes(q) ||
          site.dynastyPeriod.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedType, selectedRegion, searchQuery]);

  const activeSite =
    HERITAGE_MAP_SITES.find(s => s.id === selectedSiteId) || HERITAGE_MAP_SITES[0];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Page Header Banner */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#C5A059]/30 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2621] border border-[#C5A059]/40 text-[#E6CD92] text-xs font-serif-display uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Interactive Subcontinental Atlas</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0]">
            Explore Heritage Across India
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#D4C8B2] max-w-2xl">
            Geo-spatial mapping of monuments, UNESCO World Heritage properties, archaeological excavation sanctuaries, and living craft clusters.
          </p>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#FFFDF9] p-4 rounded-2xl border border-[#E2DAC9] shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedType('')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif-display uppercase font-bold tracking-wider shrink-0 transition-all ${
                !selectedType
                  ? 'bg-[#1C1A17] text-white shadow'
                  : 'bg-[#FAF7F0] text-[#3D3934] border border-[#E2DAC9] hover:border-[#BE4D2A]'
              }`}
            >
              All Markers ({HERITAGE_MAP_SITES.length})
            </button>
            {MARKER_CATEGORIES.map(cat => {
              const isSelected = selectedType === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedType(isSelected ? '' : cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-serif-display uppercase font-bold tracking-wider shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#BE4D2A] text-white shadow'
                      : 'bg-[#FAF7F0] text-[#3D3934] border border-[#E2DAC9] hover:border-[#BE4D2A]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Region Dropdown */}
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="bg-[#FAF7F0] border border-[#E2DAC9] rounded-xl px-3 py-1.5 text-xs font-medium text-[#1C1A17] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="">All 6 Regions</option>
            {REGIONS.map(r => (
              <option key={r} value={r}>{r} India</option>
            ))}
          </select>
        </div>

        {/* 2-Column Stage: Interactive Geo Canvas & Detailed Site Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map Display Canvas */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-[#161513] border border-[#C5A059]/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[560px] relative">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6CD92] bg-[#24211D] px-3 py-1 rounded-full border border-[#C5A059]/30">
                Subcontinental GPS Grid
              </span>
              <span className="text-xs text-[#A89F91]">
                {filteredSites.length} Markers Plotted
              </span>
            </div>

            {/* Simulated Vector India Map Graphic with Geo-pins */}
            <div className="relative my-8 flex-1 flex items-center justify-center">
              {/* Subtle Map Outline Vector Silhouette */}
              <div className="relative w-full max-w-md aspect-[4/5] bg-gradient-to-b from-[#24211D]/60 via-[#1C1A17]/80 to-[#141311] rounded-3xl border border-[#38332C] flex items-center justify-center p-6 overflow-hidden">
                {/* SVG India Map Silhouette Mock */}
                <svg viewBox="0 0 400 500" className="w-full h-full opacity-30 text-[#C5A059]" fill="currentColor">
                  <path d="M 180 30 Q 200 40 220 50 T 260 90 T 290 140 T 320 200 T 310 270 T 260 350 T 210 430 T 190 470 T 170 430 T 130 350 T 90 280 T 80 200 T 110 120 T 150 60 Z" />
                </svg>

                {/* Interactive Site Pin Dots on Canvas */}
                <div className="absolute inset-0 p-8">
                  {filteredSites.map(site => {
                    const isSelected = selectedSiteId === site.id;
                    // Approximate normalized lat/lng to canvas coordinates
                    const topPercent = Math.max(10, Math.min(88, ((35 - site.coordinates[0]) / (35 - 8)) * 80 + 10));
                    const leftPercent = Math.max(12, Math.min(88, ((site.coordinates[1] - 68) / (96 - 68)) * 80 + 10));

                    return (
                      <button
                        key={site.id}
                        onClick={() => setSelectedSiteId(site.id)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                          isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-110'
                        }`}
                        style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                        title={`${site.name} (${site.state})`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${
                            isSelected
                              ? 'bg-[#BE4D2A] border-[#FFFDF9] ring-4 ring-[#BE4D2A]/40'
                              : site.unescoStatus
                              ? 'bg-[#C5A059] border-[#1C1A17]'
                              : 'bg-[#10B981] border-[#1C1A17]'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-white" />
                        </div>
                        {/* Hover Pin Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-[#1C1A17] text-white text-[10px] font-sans px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap border border-[#C5A059]/40 pointer-events-none">
                          {site.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#A89F91] border-t border-[#332E27] pt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#C5A059]" />
                <span>UNESCO World Heritage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span>Living Heritage / Craft Cluster</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#BE4D2A]" />
                <span>Selected Destination</span>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Site Detailed Dossier Drawer */}
          <div className="lg:col-span-5 rounded-3xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-xl overflow-hidden flex flex-col justify-between space-y-6">
            {/* Site Image Banner */}
            <div className="relative h-60 overflow-hidden bg-stone-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSite.imageUrl}
                alt={activeSite.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311]/90 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-[#1C1A17]/80 text-[#E6CD92] border border-[#C5A059]/40">
                  {activeSite.type}
                </span>
                {activeSite.unescoStatus && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#C5A059] text-[#1C1A17] font-bold">
                    UNESCO
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-mono text-[#E6CD92]">{activeSite.state} • {activeSite.region} India</span>
                <h3 className="font-serif-display text-xl font-bold leading-tight">
                  {activeSite.name}
                </h3>
              </div>
            </div>

            {/* Site Body Details */}
            <div className="px-6 space-y-4">
              <p className="text-xs text-[#8C8275] font-serif-display italic -mt-2">
                {activeSite.hindiName}
              </p>

              <p className="text-sm text-[#3D3934] leading-relaxed">
                {activeSite.fullDescription}
              </p>

              {/* Sustainability & Crowd Metrics */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#FAF7F0] border border-[#E2DAC9] text-xs">
                <div>
                  <span className="text-[#8C8275] uppercase font-bold">Eco Sustainability</span>
                  <p className="font-serif-display text-base font-bold text-[#10B981] mt-0.5">
                    {activeSite.sustainabilityScore}/100 Index
                  </p>
                </div>
                <div>
                  <span className="text-[#8C8275] uppercase font-bold">Crowd Level</span>
                  <p className="font-serif-display text-base font-bold text-[#BE4D2A] mt-0.5">
                    {activeSite.crowdLevel} Density
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#8C8275]">Site Highlights:</span>
                {activeSite.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#3D3934]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BE4D2A] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Visiting Tips */}
              <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E2DAC9] text-xs text-[#5C554B] leading-relaxed">
                <strong className="text-[#1C1A17]">Responsible Visiting Tip:</strong> {activeSite.visitingTips}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/sustainable-travel"
                className="w-full sm:w-1/2 text-center py-2.5 rounded-xl bg-[#BE4D2A] hover:bg-[#98381A] text-white text-xs font-serif-display uppercase font-bold tracking-wider transition-colors shadow-md"
              >
                Build Itinerary
              </Link>
              <Link
                href="/explore"
                className="w-full sm:w-1/2 text-center py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#EAE2D2] border border-[#E2DAC9] text-xs font-serif-display uppercase font-bold tracking-wider text-[#1C1A17] transition-colors"
              >
                Browse Artifacts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-sm font-serif-display">Loading Heritage Map...</div>}>
      <MapContent />
    </Suspense>
  );
}
