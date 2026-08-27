'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search, Filter, SlidersHorizontal, Grid, List, Bookmark,
  Volume2, Compass, ArrowUpDown, X, Check, Eye, Sparkles
} from 'lucide-react';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { Artifact, ArtifactCategory, HeritageRegion, HistoricalPeriod } from '@/types';

const CATEGORIES: ArtifactCategory[] = [
  'Sculptures', 'Paintings', 'Manuscripts', 'Architecture',
  'Textiles', 'Jewellery', 'Folk Art', 'Music', 'Dance', 'Festivals', 'Numismatics'
];

const REGIONS: HeritageRegion[] = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];

const PERIODS: HistoricalPeriod[] = [
  'Indus Valley Civilization',
  'Vedic Period',
  'Mahajanapadas & Mauryan Empire',
  'Gupta Golden Era',
  'Post-Gupta & Early Medieval',
  'Chola & Southern Dynasties',
  'Delhi Sultanate',
  'Vijayanagara Empire',
  'Mughal Era',
  'Maratha Empire',
  'Independent & Modern India'
];

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialRegion = searchParams.get('region') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'title' | 'period'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Toggle bookmark / save
  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter and sort items
  const filteredArtifacts = useMemo(() => {
    return ARTIFACTS_DATA.filter(art => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          art.title.toLowerCase().includes(q) ||
          art.dynasty.toLowerCase().includes(q) ||
          art.location.toLowerCase().includes(q) ||
          art.state.toLowerCase().includes(q) ||
          art.material.toLowerCase().includes(q) ||
          art.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Category
      if (selectedCategory && art.category !== selectedCategory) return false;

      // Region
      if (selectedRegion && art.region !== selectedRegion) return false;

      // Period
      if (selectedPeriod && art.period !== selectedPeriod) return false;

      // Material
      if (selectedMaterial && !art.material.toLowerCase().includes(selectedMaterial.toLowerCase())) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'period') return a.period.localeCompare(b.period);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedRegion, selectedPeriod, selectedMaterial, sortBy]);

  const activeFiltersCount = [
    selectedCategory,
    selectedRegion,
    selectedPeriod,
    selectedMaterial
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedRegion('');
    setSelectedPeriod('');
    setSelectedMaterial('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Page Header Banner */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#C5A059]/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2621] border border-[#C5A059]/40 text-[#E6CD92] text-xs font-serif-display uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Museum Archival Catalogue</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0]">
            Explore the Museum
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#D4C8B2] max-w-2xl">
            Search artifacts, monuments, sculptures, dynasties, and traditions curated from India’s national repositories.
          </p>

          {/* Main Search Bar */}
          <div className="pt-4 max-w-3xl">
            <div className="relative flex items-center bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#E2DAC9] overflow-hidden p-1.5">
              <Search className="w-5 h-5 text-[#BE4D2A] ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search artifacts, dynasties, materials, regions, iconography..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-[#1C1A17] placeholder-[#8C8275] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-full hover:bg-[#F4EFE2] text-[#8C8275] mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F4EFE2] hover:bg-[#EAE2D2] text-[#1C1A17] text-xs font-serif-display uppercase font-bold tracking-wider transition-colors shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#BE4D2A]" />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#BE4D2A] text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Pills Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-xs font-serif-display uppercase font-bold tracking-wider shrink-0 transition-all ${
              !selectedCategory
                ? 'bg-[#1C1A17] text-[#FAF7F0] shadow-md border border-[#C5A059]'
                : 'bg-[#FFFDF9] text-[#3D3934] border border-[#E2DAC9] hover:border-[#C5A059]'
            }`}
          >
            All Categories ({ARTIFACTS_DATA.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = ARTIFACTS_DATA.filter(a => a.category === cat).length;
            if (count === 0) return null;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isSelected ? '' : cat)}
                className={`px-4 py-2 rounded-full text-xs font-serif-display uppercase font-bold tracking-wider shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#BE4D2A] text-white shadow-md'
                    : 'bg-[#FFFDF9] text-[#3D3934] border border-[#E2DAC9] hover:border-[#BE4D2A]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        {isFiltersOpen && (
          <div className="mb-8 p-6 rounded-2xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-lg animate-in fade-in zoom-in-95 duration-150 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2DAC9]/80 pb-3">
              <span className="font-serif-display text-sm font-bold uppercase tracking-wider text-[#1C1A17] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#BE4D2A]" />
                Filter by Multi-Faceted Criteria
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-[#BE4D2A] hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Region */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8275] mb-2">
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={e => setSelectedRegion(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E2DAC9] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1A17] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="">All Regions</option>
                  {REGIONS.map(r => (
                    <option key={r} value={r}>{r} India</option>
                  ))}
                </select>
              </div>

              {/* Historical Period */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8275] mb-2">
                  Historical Period
                </label>
                <select
                  value={selectedPeriod}
                  onChange={e => setSelectedPeriod(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E2DAC9] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1A17] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="">All Epochs</option>
                  {PERIODS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Material Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8275] mb-2">
                  Material
                </label>
                <select
                  value={selectedMaterial}
                  onChange={e => setSelectedMaterial(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E2DAC9] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1A17] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="">All Materials</option>
                  <option value="Bronze">Cast Bronze (Panchaloha)</option>
                  <option value="Sandstone">Chunar Sandstone</option>
                  <option value="Basalt">Basalt Monolithic Rock</option>
                  <option value="Gold">Pure Gold & Foil</option>
                  <option value="Palm Leaf">Palm Leaf (Talapatra)</option>
                  <option value="Birch Bark">Birch Bark (Bhojpatra)</option>
                  <option value="Silk">Mulberry Silk (Patola/Pashmina)</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8275] mb-2">
                  Sort Order
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="w-full bg-[#FAF7F0] border border-[#E2DAC9] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1A17] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="featured">Featured Curations First</option>
                  <option value="title">Alphabetical (A-Z)</option>
                  <option value="period">Chronological Period</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Bar & Layout Switcher */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E2DAC9]/80 mb-8">
          <div>
            <span className="font-serif-display text-base font-bold text-[#1C1A17]">
              Showing {filteredArtifacts.length} Artifacts
            </span>
            {activeFiltersCount > 0 && (
              <span className="text-xs text-[#8C8275] ml-2">
                (Filtered by {activeFiltersCount} criteria)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                  : 'bg-[#FFFDF9] text-[#8C8275] border-[#E2DAC9] hover:bg-[#F4EFE2]'
              }`}
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                  : 'bg-[#FFFDF9] text-[#8C8275] border-[#E2DAC9] hover:bg-[#F4EFE2]'
              }`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Artifacts Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtifacts.map(art => {
              const isSaved = savedIds.includes(art.id);
              return (
                <div
                  key={art.id}
                  className="group rounded-2xl overflow-hidden bg-[#FFFDF9] border border-[#E2DAC9] shadow-sm hover:shadow-xl hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Card */}
                  <Link href={`/artifact/${art.id}`} className="relative h-64 overflow-hidden bg-stone-900 block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141311]/90 via-[#141311]/20 to-transparent" />

                    {/* Category & Region Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#1C1A17]/80 text-[#E6CD92] border border-[#C5A059]/40 backdrop-blur-sm">
                        {art.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#BE4D2A]/80 text-white backdrop-blur-sm">
                        {art.region}
                      </span>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={e => toggleSave(art.id, e)}
                      className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isSaved
                          ? 'bg-[#BE4D2A] text-white shadow-md'
                          : 'bg-[#1C1A17]/70 text-[#D8CFBF] hover:text-white hover:bg-[#1C1A17]'
                      }`}
                      title={isSaved ? 'Saved in Curation' : 'Save to My Curation'}
                      aria-label="Save"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    {/* Audio availability indicator */}
                    {art.audioNarrative && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#1C1A17]/80 text-[#E6CD92] border border-[#C5A059]/30">
                        <Volume2 className="w-3 h-3 text-[#E6CD92]" />
                        <span>Audio</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-16">
                      <p className="text-[11px] font-mono text-[#E6CD92]">
                        {art.period}
                      </p>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <Link href={`/artifact/${art.id}`}>
                        <h3 className="font-serif-display text-lg font-bold text-[#1C1A17] group-hover:text-[#BE4D2A] transition-colors leading-snug">
                          {art.title}
                        </h3>
                      </Link>
                      {art.nativeTitle && (
                        <p className="text-xs font-serif-display text-[#8C8275] italic mt-0.5">
                          {art.nativeTitle}
                        </p>
                      )}
                      <p className="text-xs text-[#5C554B] line-clamp-2 mt-2 leading-relaxed">
                        {art.overview}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E2DAC9]/60 flex items-center justify-between text-xs">
                      <span className="text-[#8C8275] font-mono text-[11px]">
                        {art.location}, {art.state}
                      </span>
                      <Link
                        href={`/artifact/${art.id}`}
                        className="font-serif-display font-bold uppercase tracking-wider text-[#BE4D2A] hover:text-[#98381A] flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Artifact</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredArtifacts.map(art => (
              <Link
                key={art.id}
                href={`/artifact/${art.id}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-[#FFFDF9] border border-[#E2DAC9] hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#BE4D2A] bg-[#F4EFE2] px-2 py-0.5 rounded">
                      {art.category} • {art.period}
                    </span>
                    <h3 className="font-serif-display text-base font-bold text-[#1C1A17] group-hover:text-[#BE4D2A] transition-colors mt-1">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#8C8275] line-clamp-1">
                      {art.material} • {art.dynasty} • {art.currentLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <span className="text-xs font-serif-display font-bold uppercase tracking-wider text-[#BE4D2A] group-hover:underline">
                    View Artifact →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredArtifacts.length === 0 && (
          <div className="text-center py-20 bg-[#FFFDF9] border border-[#E2DAC9] rounded-2xl p-8 space-y-4">
            <Compass className="w-10 h-10 text-[#8C8275] mx-auto" />
            <h3 className="font-serif-display text-xl font-bold text-[#1C1A17]">
              No Archival Artifacts Found
            </h3>
            <p className="text-sm text-[#5C554B] max-w-md mx-auto">
              We couldn’t find any heritage items matching your query. Try broadening your filter parameters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 rounded-full bg-[#BE4D2A] text-white text-xs font-serif-display uppercase font-bold tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-sm font-serif-display">Loading Museum Collections...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
