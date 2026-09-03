import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Sparkles, ArrowRight, BookOpen, Compass, Shield } from 'lucide-react';
import { HERITAGE_ITEMS, LIVING_TRADITIONS, MANUSCRIPTS_DATA, EPOCHS } from '../data/heritageData';
import { VerificationBadge } from './VerificationBadge';
import { useNavigate } from 'react-router-dom';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  highContrast?: boolean;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  highContrast
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Artifacts' | 'Traditions' | 'Manuscripts'>('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const queryLower = query.toLowerCase().trim();

  // Search across items
  const matchedArtifacts = HERITAGE_ITEMS.filter(item =>
    !queryLower ||
    item.title.toLowerCase().includes(queryLower) ||
    item.category.toLowerCase().includes(queryLower) ||
    item.location.toLowerCase().includes(queryLower) ||
    item.period.toLowerCase().includes(queryLower) ||
    item.material?.toLowerCase().includes(queryLower) ||
    item.dynasty?.toLowerCase().includes(queryLower)
  );

  const matchedTraditions = LIVING_TRADITIONS.filter(t =>
    !queryLower ||
    t.title.toLowerCase().includes(queryLower) ||
    t.community.toLowerCase().includes(queryLower) ||
    t.location.toLowerCase().includes(queryLower)
  );

  const matchedManuscripts = MANUSCRIPTS_DATA.filter(m =>
    !queryLower ||
    m.title.toLowerCase().includes(queryLower) ||
    m.script.toLowerCase().includes(queryLower) ||
    m.language.toLowerCase().includes(queryLower)
  );

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-stone-900/60 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-3xl rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[85vh] ${
        highContrast ? 'bg-stone-950 border-stone-800 text-white' : 'bg-[#FAF8F5] border-stone-200 text-stone-900'
      }`}>
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#936B38] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artifacts, places, traditions, artists, manuscripts…"
            className="w-full bg-transparent border-none outline-none text-base sm:text-lg font-medium placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded-lg border border-stone-300 hover:bg-stone-200 text-stone-600 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 sm:px-6 py-2.5 bg-stone-100/70 border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-xs">
          {(['All', 'Artifacts', 'Traditions', 'Manuscripts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Quick Suggestion Chips when query is empty */}
        {!query && (
          <div className="p-4 sm:p-6 border-b border-stone-200 bg-white">
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#936B38]" />
              <span>Suggested Explorations</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Nataraja',
                'Chola Bronze',
                'Brihadisvara Temple',
                'Ashoka Pillar',
                'Nalanda Seal',
                'Sharada Script',
                'Swamimalai Guild',
                'Ajanta Murals',
                'Konark Sun Temple'
              ].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-[#F7EFE6] text-stone-700 hover:text-[#936B38] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 divide-y divide-stone-100">
          {(activeTab === 'All' || activeTab === 'Artifacts') && matchedArtifacts.slice(0, 6).map(item => (
            <div
              key={item.id}
              onClick={() => handleSelect(`/artifact/${item.id}`)}
              className="pt-3 first:pt-0 flex items-center justify-between gap-4 p-2.5 rounded-2xl hover:bg-stone-100/80 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#936B38] uppercase">
                      {item.category}
                    </span>
                    <VerificationBadge status={item.verificationStatus} size="sm" />
                  </div>
                  <h4 className="font-serif font-semibold text-stone-900 group-hover:text-[#A64B2A] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-1">
                    {item.period} • {item.location}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          ))}

          {(activeTab === 'All' || activeTab === 'Traditions') && matchedTraditions.slice(0, 4).map(trad => (
            <div
              key={trad.id}
              onClick={() => handleSelect('/living-traditions')}
              className="pt-3 flex items-center justify-between gap-4 p-2.5 rounded-2xl hover:bg-stone-100/80 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={trad.imageUrl}
                  alt={trad.title}
                  className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                />
                <div>
                  <span className="text-[11px] font-semibold text-[#A64B2A] uppercase">
                    Living Tradition • {trad.subCategory}
                  </span>
                  <h4 className="font-serif font-semibold text-stone-900 group-hover:text-[#A64B2A] transition-colors">
                    {trad.title}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {trad.community} | {trad.location}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          ))}

          {(activeTab === 'All' || activeTab === 'Manuscripts') && matchedManuscripts.slice(0, 3).map(ms => (
            <div
              key={ms.id}
              onClick={() => handleSelect(`/manuscripts/${ms.id}`)}
              className="pt-3 flex items-center justify-between gap-4 p-2.5 rounded-2xl hover:bg-stone-100/80 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={ms.imageUrl}
                  alt={ms.title}
                  className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                />
                <div>
                  <span className="text-[11px] font-semibold text-indigo-700 uppercase">
                    Ancient Manuscript • {ms.script}
                  </span>
                  <h4 className="font-serif font-semibold text-stone-900 group-hover:text-[#A64B2A] transition-colors">
                    {ms.title}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {ms.language} | {ms.repository}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          ))}

          {matchedArtifacts.length === 0 && matchedTraditions.length === 0 && matchedManuscripts.length === 0 && (
            <div className="py-12 text-center text-stone-500 space-y-2">
              <Compass className="w-8 h-8 mx-auto text-stone-300" />
              <p className="font-medium text-stone-800">No matching heritage records found for "{query}"</p>
              <p className="text-xs text-stone-400">Try searching for broader terms like "Chola", "Bronze", "Temple", or "Stone"</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-100 text-center text-[11px] text-stone-500 border-t border-stone-200">
          Showing verified primary records from the Archaeological Survey of India and National Archives
        </div>
      </div>
    </div>
  );
};
