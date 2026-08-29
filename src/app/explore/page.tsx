'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search, Filter, SlidersHorizontal, Grid, List, Bookmark,
  Volume2, Compass, X, Eye, Layers, ArrowRight
} from 'lucide-react';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { Artifact, ArtifactCategory, HeritageRegion, HistoricalPeriod } from '@/types';
import Card3DTilt from '@/components/common/Card3DTilt';
import HeritageImage from '@/components/common/HeritageImage';

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

  // Toggle bookmark
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

      if (selectedCategory && art.category !== selectedCategory) return false;
      if (selectedRegion && art.region !== selectedRegion) return false;
      if (selectedPeriod && art.period !== selectedPeriod) return false;
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
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Page Header Banner */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#78716C] text-xs font-sans font-medium">
            <Compass className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>Museum Archival Catalogue</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Museum Collections
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] max-w-2xl">
            Search artifacts, monuments, sculptures, dynasties, and traditions curated from Indian national repositories.
          </p>

          {/* Main Search Bar */}
          <div className="pt-2 max-w-3xl">
            <div className="relative flex items-center bg-[#FFFFFF] rounded-2xl shadow-sm border border-[#E7E1D4] overflow-hidden p-1.5">
              <Search className="w-5 h-5 text-[#9A3412] ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search artifacts, dynasties, materials, regions..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-[#1C1917] placeholder-[#78716C] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-full hover:bg-[#F4EFE6] text-[#78716C] mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FBF9F4] hover:bg-[#F4EFE6] text-[#1C1917] text-xs font-sans font-semibold border border-[#E7E1D4] transition-colors shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#9A3412]" />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#9A3412] text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Pills Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-xs font-sans font-semibold shrink-0 transition-all ${
              !selectedCategory
                ? 'bg-[#1C1917] text-white shadow-sm'
                : 'bg-[#FFFFFF] text-[#44403C] border border-[#E7E1D4] hover:border-[#9A3412]/50'
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
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#9A3412] text-white shadow-sm'
                    : 'bg-[#FFFFFF] text-[#44403C] border border-[#E7E1D4] hover:border-[#9A3412]/50'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        {isFiltersOpen && (
          <div className="mb-8 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm animate-in fade-in zoom-in-95 duration-150 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7E1D4] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#9A3412]" />
                Filter by Multi-Faceted Criteria
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-[#9A3412] hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Region */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={e => setSelectedRegion(e.target.value)}
                  className="w-full bg-[#FBF9F4] border border-[#E7E1D4] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                >
                  <option value="">All Regions</option>
                  {REGIONS.map(r => (
                    <option key={r} value={r}>{r} India</option>
                  ))}
                </select>
              </div>

              {/* Historical Period */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                  Historical Period
                </label>
                <select
                  value={selectedPeriod}
                  onChange={e => setSelectedPeriod(e.target.value)}
                  className="w-full bg-[#FBF9F4] border border-[#E7E1D4] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                >
                  <option value="">All Epochs</option>
                  {PERIODS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Material Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                  Material
                </label>
                <select
                  value={selectedMaterial}
                  onChange={e => setSelectedMaterial(e.target.value)}
                  className="w-full bg-[#FBF9F4] border border-[#E7E1D4] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                  Sort Order
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="w-full bg-[#FBF9F4] border border-[#E7E1D4] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                >
                  <option value="featured">Featured Curations First</option>
                  <option value="title">Alphabetical (A-Z)</option>
                  <option value="period">Chronological Period</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count & View Toggle */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E1D4] mb-8">
          <div>
            <span className="font-serif-display text-base font-bold text-[#1C1917]">
              Showing {filteredArtifacts.length} Artifacts
            </span>
            {activeFiltersCount > 0 && (
              <span className="text-xs text-[#78716C] ml-2">
                (Filtered by {activeFiltersCount} criteria)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-[#FFFFFF] text-[#78716C] border-[#E7E1D4] hover:bg-[#F4EFE6]'
              }`}
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-[#FFFFFF] text-[#78716C] border-[#E7E1D4] hover:bg-[#F4EFE6]'
              }`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Consistent Artifact Card System with 3D Tilt */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtifacts.map(art => {
              const isSaved = savedIds.includes(art.id);
              return (
                <Card3DTilt key={art.id} maxTilt={8} scaleOnHover={1.02} className="h-full rounded-2xl">
                  <div className="group rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm hover:shadow-lg hover:border-[#9A3412]/50 transition-all duration-300 flex flex-col justify-between h-full">
                    {/* Framed Image Container */}
                    <Link href={`/artifact/${art.id}`} className="relative h-64 overflow-hidden bg-stone-100 block">
                      <HeritageImage
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-[#FFFFFF]/90 text-[#1C1917] shadow-sm border border-[#E7E1D4]">
                          {art.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-[#F4EFE6] text-[#78716C] border border-[#E7E1D4]">
                          {art.region}
                        </span>
                      </div>

                      <button
                        onClick={e => toggleSave(art.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
                          isSaved
                            ? 'bg-[#9A3412] text-white shadow-sm'
                            : 'bg-[#FFFFFF]/80 text-[#78716C] hover:text-[#1C1917] hover:bg-[#FFFFFF]'
                        }`}
                        title={isSaved ? 'Saved in Curation' : 'Save to My Curation'}
                        aria-label="Save"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </Link>

                    {/* Body Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <Link href={`/artifact/${art.id}`}>
                          <h3 className="font-serif-display text-lg font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors leading-snug">
                            {art.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-[#78716C] mt-1">
                          {art.dynasty} • {art.period}
                        </p>
                        <p className="text-xs text-[#57534E] line-clamp-2 mt-2 leading-relaxed">
                          {art.overview}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E7E1D4] flex items-center justify-between text-xs">
                        <span className="text-[#78716C]">
                          {art.location}, {art.state}
                        </span>
                        <Link
                          href={`/artifact/${art.id}`}
                          className="font-sans font-semibold text-[#9A3412] hover:underline flex items-center gap-1"
                        >
                          <span>View Artifact</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card3DTilt>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredArtifacts.map(art => (
              <Link
                key={art.id}
                href={`/artifact/${art.id}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] hover:border-[#9A3412]/50 shadow-sm hover:shadow-md transition-all gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                    <HeritageImage
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-medium uppercase text-[#9A3412] bg-[#F4EFE6] px-2 py-0.5 rounded">
                      {art.category} • {art.period}
                    </span>
                    <h3 className="font-serif-display text-base font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors mt-1">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#78716C]">
                      {art.dynasty} • {art.location}, {art.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <span className="text-xs font-sans font-semibold text-[#9A3412] group-hover:underline flex items-center gap-1">
                    <span>View Artifact</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredArtifacts.length === 0 && (
          <div className="text-center py-16 bg-[#FFFFFF] border border-[#E7E1D4] rounded-2xl p-8 space-y-4">
            <Compass className="w-10 h-10 text-[#78716C] mx-auto" />
            <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
              No Archival Artifacts Found
            </h3>
            <p className="text-sm text-[#57534E] max-w-md mx-auto">
              We couldn’t find any heritage items matching your query. Try broadening your filter parameters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-full bg-[#9A3412] text-white text-xs font-sans font-semibold"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-white border border-[#E7E1D4] animate-pulse">
                  <div className="h-60 bg-[#E7E1D4]/60" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-[#E7E1D4] rounded w-3/4" />
                    <div className="h-3 bg-[#E7E1D4]/70 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
