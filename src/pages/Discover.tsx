import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Grid, 
  List, 
  Layers, 
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
  BookOpen,
  MapPin,
  Calendar
} from 'lucide-react';
import { HERITAGE_ITEMS } from '../data/heritageData';
import { VerificationBadge } from '../components/VerificationBadge';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SaveButton } from '../components/SaveButton';
import { SafeImage } from '../components/SafeImage';

export const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
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
  const statuses = [
    'All',
    'Scholar Verified',
    'Archival Record',
    'Museum Registered',
    'Field Documented'
  ];

  const filteredItems = HERITAGE_ITEMS.filter(item => {
    const matchSearch = 
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.material && item.material.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.nativeTitle && item.nativeTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchRegion = selectedRegion === 'All' || item.region === selectedRegion;
    const matchPeriod = selectedPeriod === 'All' || item.period.includes(selectedPeriod) || selectedPeriod.includes(item.period);
    const matchStatus = selectedStatus === 'All' || item.verificationStatus === selectedStatus;

    return matchSearch && matchCategory && matchRegion && matchPeriod && matchStatus;
  });

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedRegion !== 'All' || selectedPeriod !== 'All' || selectedStatus !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRegion('All');
    setSelectedPeriod('All');
    setSelectedStatus('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Archival Registry' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#936B38]/10 text-[#936B38] text-xs font-mono uppercase tracking-wider font-semibold">
            <span>Primary Heritage Dossiers</span>
            <span>•</span>
            <span>National Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Discover India's Heritage
          </h1>
          <p className="text-stone-600 text-sm max-w-2xl leading-relaxed">
            Examine verified archaeological specimens, temple architecture, dynastic sculptures, and rare palm-leaf manuscripts cross-referenced with survey records and museum accessions.
          </p>
        </div>

        {/* View Switcher & Results Count */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-white border border-stone-200 p-1 rounded-xl shadow-2xs flex items-center gap-1 text-stone-600">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${
                viewMode === 'grid' ? 'bg-[#151D2A] text-white' : 'hover:bg-stone-100 text-stone-600'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${
                viewMode === 'list' ? 'bg-[#151D2A] text-white' : 'hover:bg-stone-100 text-stone-600'
              }`}
              title="Archival Registry List View"
              aria-label="Archival List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-4">
        {/* Universal Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#936B38] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, material, dynastic origin, accession code, or region…"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-[#936B38] focus:bg-white transition-all placeholder:text-stone-400 font-sans"
          />
        </div>

        {/* Filter Select Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-stone-100">
          <div>
            <label className="text-xs font-medium text-stone-500 block mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#936B38]" />
              <span>Heritage Type</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 font-medium focus:outline-none focus:border-[#936B38]"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-stone-500 block mb-1.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#936B38]" />
              <span>Geographic Region</span>
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 font-medium focus:outline-none focus:border-[#936B38]"
            >
              {regions.map(r => <option key={r} value={r}>{r === 'All' ? 'All Regions' : `${r} India`}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-stone-500 block mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#936B38]" />
              <span>Historical Epoch</span>
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 font-medium focus:outline-none focus:border-[#936B38]"
            >
              {periods.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-stone-500 block mb-1.5 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#936B38]" />
              <span>Verification Status</span>
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 font-medium focus:outline-none focus:border-[#936B38]"
            >
              {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Verification Levels' : s}</option>)}
            </select>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            <strong className="text-stone-900 font-mono text-sm">{filteredItems.length}</strong>
            <span>archival records</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-[#A64B2A] hover:text-[#873b1f] font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-[#936B38]/60 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual specimen with SafeImage */}
                <div className="relative h-60 overflow-hidden bg-stone-900">
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.title}
                    creditKey={item.id}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#151D2A]/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10">
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <SaveButton itemId={item.id} itemType="artifact" variant="icon" />
                    <VerificationBadge status={item.verificationStatus} size="sm" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] bg-[#151D2A]/75 backdrop-blur-xs px-3 py-1.5 rounded-lg flex items-center justify-between border border-white/10">
                    <span className="truncate max-w-[65%]">{item.location}</span>
                    <span className="font-mono text-stone-300 shrink-0 text-[10px]">{item.accessionNo}</span>
                  </div>
                </div>

                {/* Dossier Content */}
                <div className="p-6 space-y-2.5">
                  <div className="text-[11px] font-mono text-[#936B38] font-semibold uppercase tracking-wider">
                    {item.period}
                  </div>
                  <h2 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#A64B2A] transition-colors leading-snug">
                    <Link to={`/artifact/${item.id}`}>{item.title}</Link>
                  </h2>
                  {item.nativeTitle && (
                    <p className="text-xs text-stone-500 italic font-serif">
                      {item.nativeTitle}
                    </p>
                  )}
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer row */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    to={`/artifact/${item.id}`}
                    className="text-xs font-semibold text-stone-900 group-hover:text-[#A64B2A] flex items-center gap-1 transition-colors"
                  >
                    <span>Examine Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <span className="text-[11px] text-stone-400 truncate max-w-[150px] font-mono">
                    {item.repository}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden divide-y divide-stone-100 shadow-2xs">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-stone-50/70 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.title}
                    creditKey={item.id}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="text-[11px] font-bold text-[#936B38] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="font-mono text-stone-500 text-[11px]">{item.accessionNo}</span>
                    <VerificationBadge status={item.verificationStatus} size="sm" />
                  </div>
                  <h2 className="font-serif text-lg font-bold text-stone-900 hover:text-[#A64B2A] transition-colors truncate">
                    <Link to={`/artifact/${item.id}`}>{item.title}</Link>
                  </h2>
                  <p className="text-xs text-stone-500">
                    <span className="font-medium text-stone-700">{item.period}</span> • {item.location} • <span className="italic">{item.repository}</span>
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-1 max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <SaveButton itemId={item.id} itemType="artifact" variant="icon" />
                <Link
                  to={`/artifact/${item.id}`}
                  className="px-4 py-2 rounded-xl bg-[#151D2A] text-white text-xs font-semibold hover:bg-[#A64B2A] transition-colors flex items-center gap-1.5"
                >
                  <span>Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/90 p-8 space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-stone-800">No archival records match your criteria</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
              No accessioned artifacts or monuments matched this combination of epoch, category, region, and verification status.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-[#151D2A] text-white text-xs font-semibold hover:bg-[#A64B2A] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
