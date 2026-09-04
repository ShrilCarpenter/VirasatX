import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Search, ArrowRight, Layers, MapPin } from 'lucide-react';
import { HERITAGE_ITEMS, LIVING_TRADITIONS, MANUSCRIPTS_DATA } from '../data/heritageData';
import { VerificationBadge } from '../components/VerificationBadge';
import { Link } from 'react-router-dom';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const queryLower = query.toLowerCase().trim();

  const matchedArtifacts = HERITAGE_ITEMS.filter(item =>
    !queryLower ||
    item.title.toLowerCase().includes(queryLower) ||
    item.category.toLowerCase().includes(queryLower) ||
    item.location.toLowerCase().includes(queryLower) ||
    item.period.toLowerCase().includes(queryLower)
  );

  const matchedTraditions = LIVING_TRADITIONS.filter(trad =>
    !queryLower ||
    trad.title.toLowerCase().includes(queryLower) ||
    trad.community.toLowerCase().includes(queryLower) ||
    trad.location.toLowerCase().includes(queryLower)
  );

  const matchedManuscripts = MANUSCRIPTS_DATA.filter(ms =>
    !queryLower ||
    ms.title.toLowerCase().includes(queryLower) ||
    ms.script.toLowerCase().includes(queryLower) ||
    ms.language.toLowerCase().includes(queryLower)
  );

  const totalMatches = matchedArtifacts.length + matchedTraditions.length + matchedManuscripts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Universal Repository Search' }]} />

      <div className="space-y-3 max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Universal Archive Search
        </h1>
        <p className="text-stone-600 text-sm">
          Search across monuments, bronzes, ancient manuscripts, and living traditions.
        </p>
      </div>

      {/* Large Search Box */}
      <div className="relative max-w-3xl">
        <Search className="w-5 h-5 text-[#936B38] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artifacts, places, traditions, artists, manuscripts…"
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-300 text-sm sm:text-base focus:outline-none focus:border-[#936B38] shadow-xs"
        />
      </div>

      <div className="text-xs text-stone-500">
        Found <strong>{totalMatches}</strong> matching records in primary database
      </div>

      {/* Results */}
      <div className="space-y-8">
        {matchedArtifacts.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-2">
              Artifacts &amp; Architecture ({matchedArtifacts.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedArtifacts.map(item => (
                <Link
                  key={item.id}
                  to={`/artifact/${item.id}`}
                  className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#936B38] hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = '/images/ui/placeholder-heritage.jpg'; }}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-[#936B38] font-bold uppercase block">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#A64B2A] transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 truncate">{item.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {matchedTraditions.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-2">
              Living Traditions ({matchedTraditions.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedTraditions.map(trad => (
                <Link
                  key={trad.id}
                  to={`/artisans/${trad.id}`}
                  className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#936B38] hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <img
                    src={trad.imageUrl}
                    alt={trad.title}
                    onError={(e) => { e.currentTarget.src = '/images/ui/placeholder-heritage.jpg'; }}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase block">
                      {trad.subCategory}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#A64B2A] transition-colors truncate">
                      {trad.title}
                    </h3>
                    <p className="text-xs text-stone-500 truncate">{trad.community} • {trad.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {matchedManuscripts.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-2">
              Ancient Manuscripts ({matchedManuscripts.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedManuscripts.map(ms => (
                <Link
                  key={ms.id}
                  to={`/manuscripts/${ms.id}`}
                  className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#936B38] hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <img
                    src={ms.imageUrl}
                    alt={ms.title}
                    onError={(e) => { e.currentTarget.src = '/images/ui/placeholder-heritage.jpg'; }}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-indigo-700 font-bold uppercase block">
                      {ms.script}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#A64B2A] transition-colors truncate">
                      {ms.title}
                    </h3>
                    <p className="text-xs text-stone-500 truncate">{ms.repository}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
