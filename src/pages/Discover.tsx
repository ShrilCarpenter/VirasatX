import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  Sparkles, 
  Layers, 
  Eye, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { HERITAGE_ITEMS } from '../data/heritageData';
import { HeritageItem, HeritageCategory } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SaveButton } from '../components/SaveButton';

export const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Artifacts', 'Monuments', 'Manuscripts', 'Paintings', 'Sculptures'];
  const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];
  const periods = [
    'All',
    'Chola & Southern Dynasties',
    'Mauryan Empire',
    'Gupta Golden Age',
    'Post-Gupta & Regional Kingdoms',
    'Medieval India',
    'Vijayanagara Empire',
    'Mughal Era'
  ];

  const filteredItems = HERITAGE_ITEMS.filter(item => {
    const matchSearch = 
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchRegion = selectedRegion === 'All' || item.region === selectedRegion;
    const matchPeriod = selectedPeriod === 'All' || item.period.includes(selectedPeriod) || selectedPeriod.includes(item.period);

    return matchSearch && matchCategory && matchRegion && matchPeriod;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Collection Discovery' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-bold text-[#936B38] uppercase tracking-wider block">
            National Archival Registry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Curated Heritage Collection
          </h1>
          <p className="text-stone-600 text-sm max-w-xl mt-1">
            Browse authenticated Indian monuments, sculptures, sacred architecture, and ancient manuscripts cross-referenced with primary archaeological surveys.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-white border border-stone-200 p-1 rounded-xl shadow-2xs flex items-center gap-1 text-stone-600">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-stone-900 text-white' : 'hover:bg-stone-100'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-stone-900 text-white' : 'hover:bg-stone-100'
              }`}
              title="Archival List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
        {/* Search row */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#936B38] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by title, material, dynastic origin, location…"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-[#936B38] focus:bg-white transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Filter categories pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-stone-100">
          <div>
            <label className="text-xs font-semibold text-stone-500 block mb-1.5">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 font-medium focus:outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-500 block mb-1.5">Geographic Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 font-medium focus:outline-none"
            >
              {regions.map(r => <option key={r} value={r}>{r} India</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-500 block mb-1.5">Historical Epoch</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 font-medium focus:outline-none"
            >
              {periods.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
          <span>Showing <strong>{filteredItems.length}</strong> authenticated records</span>
          {(searchQuery || selectedCategory !== 'All' || selectedRegion !== 'All' || selectedPeriod !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedRegion('All');
                setSelectedPeriod('All');
              }}
              className="text-[#A64B2A] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#936B38] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-stone-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <SaveButton itemId={item.id} itemType="artifact" variant="icon" />
                    <VerificationBadge status={item.verificationStatus} size="sm" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center justify-between">
                    <span className="truncate">{item.location}</span>
                    <span className="font-mono text-stone-300 shrink-0">{item.accessionNo}</span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="text-xs font-mono text-[#936B38] font-semibold uppercase">
                    {item.period}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#A64B2A] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.nativeTitle && (
                    <p className="text-xs text-stone-500 italic font-serif">
                      {item.nativeTitle}
                    </p>
                  )}
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    to={`/artifact/${item.id}`}
                    className="text-xs font-semibold text-stone-900 hover:text-[#936B38] flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] text-stone-400 truncate max-w-[140px]">
                    {item.repository}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden divide-y divide-stone-100 shadow-sm">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-stone-50/80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-20 h-20 rounded-2xl object-cover border border-stone-200 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-[#936B38] uppercase">
                      {item.category}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs font-mono text-stone-500">{item.accessionNo}</span>
                    <VerificationBadge status={item.verificationStatus} size="sm" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 hover:text-[#A64B2A] transition-colors">
                    <Link to={`/artifact/${item.id}`}>{item.title}</Link>
                  </h3>
                  <p className="text-xs text-stone-500">
                    {item.period} • {item.location} • {item.repository}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <Link
                  to={`/artifact/${item.id}`}
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  View Dossier
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
          <Layers className="w-10 h-10 mx-auto text-stone-300" />
          <h3 className="font-serif text-xl font-bold text-stone-800">No records match your filters</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Try resetting your search query or selecting a broader category or region.
          </p>
        </div>
      )}
    </div>
  );
};
