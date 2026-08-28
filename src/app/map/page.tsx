'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  MapPin, Filter, Compass, Landmark, Shield,
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
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Page Header Banner */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#78716C] text-xs font-sans font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>Interactive Subcontinental Atlas</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Heritage Map of India
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] max-w-2xl">
            Explore monuments, UNESCO World Heritage properties, archaeological excavations, and living craft clusters across 28 states.
          </p>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#FFFFFF] p-4 rounded-2xl border border-[#E7E1D4] shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedType('')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold shrink-0 transition-all ${
                !selectedType
                  ? 'bg-[#1C1917] text-white shadow-sm'
                  : 'bg-[#FBF9F4] text-[#44403C] border border-[#E7E1D4] hover:border-[#9A3412]/50'
              }`}
            >
              All Types ({HERITAGE_MAP_SITES.length})
            </button>
            {MARKER_CATEGORIES.map(cat => {
              const isSelected = selectedType === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedType(isSelected ? '' : cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#9A3412] text-white shadow-sm'
                      : 'bg-[#FBF9F4] text-[#44403C] border border-[#E7E1D4] hover:border-[#9A3412]/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Region Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="bg-[#FBF9F4] border border-[#E7E1D4] rounded-xl px-3 py-1.5 text-xs font-sans font-semibold text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
            >
              <option value="">All Regions</option>
              {REGIONS.map(r => (
                <option key={r} value={r}>{r} India</option>
              ))}
            </select>
          </div>
        </div>

        {/* Map & Dossier Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Geographic Grid / Pin List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D4] mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                  Heritage Properties ({filteredSites.length})
                </span>
                <span className="text-xs text-[#78716C]">
                  Click any site to examine dossier
                </span>
              </div>

              {/* Site Pins List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-1">
                {filteredSites.map(site => {
                  const isSelected = activeSite.id === site.id;
                  return (
                    <button
                      key={site.id}
                      onClick={() => setSelectedSiteId(site.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#F4EFE6] border-[#9A3412] shadow-sm ring-1 ring-[#9A3412]/30'
                          : 'bg-[#FBF9F4] border-[#E7E1D4] hover:bg-[#FFFFFF] hover:border-[#9A3412]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-[#9A3412] font-semibold uppercase">
                          {site.state}
                        </span>
                        {site.unescoStatus && (
                          <span className="text-[9px] font-sans font-semibold uppercase bg-[#15803D] text-white px-1.5 py-0.5 rounded">
                            UNESCO
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif-display text-sm font-bold text-[#1C1917] line-clamp-1">
                        {site.name}
                      </h4>
                      <p className="text-[11px] text-[#78716C] line-clamp-1 mt-0.5">
                        {site.dynastyPeriod}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Active Site Dossier Card */}
          <div className="lg:col-span-5">
            {activeSite && (
              <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm overflow-hidden p-6 space-y-6">
                
                {/* Photo Header */}
                <div className="relative h-56 rounded-xl overflow-hidden bg-stone-100 border border-[#E7E1D4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeSite.imageUrl}
                    alt={activeSite.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {activeSite.unescoStatus && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-[#15803D] text-white shadow-sm">
                      UNESCO World Heritage Site
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] font-sans bg-black/60 text-white/90">
                    Representative Image
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-mono text-[#9A3412] uppercase font-bold">
                      {activeSite.state} • {activeSite.region} India
                    </span>
                    <h3 className="font-serif-display text-2xl font-bold text-[#1C1917] mt-0.5">
                      {activeSite.name}
                    </h3>
                    <p className="text-xs text-[#78716C]">
                      {activeSite.dynastyPeriod}
                    </p>
                  </div>

                  {/* Overview */}
                  <div className="p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] space-y-1">
                    <strong className="text-xs font-bold text-[#1C1917] block">Overview:</strong>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {activeSite.fullDescription || activeSite.shortDescription}
                    </p>
                  </div>

                  {/* Visiting Etiquette & Sustainable Travel */}
                  <div className="space-y-1 text-xs text-[#57534E]">
                    <div>
                      <strong className="text-[#1C1917]">Responsible Visiting Etiquette:</strong>
                      <p className="text-[#78716C] mt-0.5">
                        Please adhere to ASI conservation rules. Do not touch centuries-old carvings or frescoes. Support local registered guides.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-[#E7E1D4] flex items-center justify-between">
                  <Link
                    href={`/sustainable-travel`}
                    className="text-xs font-sans font-semibold text-[#9A3412] hover:underline"
                  >
                    Plan Responsible Visit →
                  </Link>
                  <Link
                    href={`/explore?region=${activeSite.region}`}
                    className="text-xs font-sans font-semibold text-[#1C1917] hover:text-[#9A3412]"
                  >
                    Related Artifacts →
                  </Link>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF9F4]">
          <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-3 animate-pulse">
              <div className="h-5 bg-[#E7E1D4] rounded-full w-40" />
              <div className="h-10 bg-[#E7E1D4] rounded w-64" />
              <div className="h-4 bg-[#E7E1D4]/70 rounded w-96" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 h-96 bg-white rounded-2xl border border-[#E7E1D4] animate-pulse" />
              <div className="lg:col-span-5 h-96 bg-white rounded-2xl border border-[#E7E1D4] animate-pulse" />
            </div>
          </div>
        </div>
      }
    >
      <MapContent />
    </Suspense>
  );
}
