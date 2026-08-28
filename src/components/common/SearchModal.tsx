'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Compass, Clock, MapPin, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { TIMELINE_EPOCHS } from '@/data/timelineData';
import { HERITAGE_MAP_SITES } from '@/data/heritageMapData';
import { MANUSCRIPTS_DATA } from '@/data/manuscriptsData';
import { sanitizeTextInput } from '@/lib/sanitize';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const cleanQuery = sanitizeTextInput(query, 100);
  const q = cleanQuery.toLowerCase();

  const matchedArtifacts = q
    ? ARTIFACTS_DATA.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.dynasty.toLowerCase().includes(q) ||
          a.period.toLowerCase().includes(q) ||
          a.state.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 5)
    : ARTIFACTS_DATA.slice(0, 3);

  const matchedTimeline = q
    ? TIMELINE_EPOCHS.filter(
        e =>
          e.name.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.prominentFigures.some(p => p.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const matchedSites = q
    ? HERITAGE_MAP_SITES.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q) ||
          s.type.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedManuscripts = q
    ? MANUSCRIPTS_DATA.filter(
        m =>
          m.title.toLowerCase().includes(q) ||
          m.script.toLowerCase().includes(q) ||
          m.language.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E7E1D4] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E7E1D4] bg-[#FBF9F4]">
          <Search className="w-5 h-5 text-[#9A3412] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search artifacts, dynasties, manuscripts, monuments..."
            className="w-full bg-transparent text-[#1C1917] placeholder-[#78716C] text-sm sm:text-base focus:outline-none font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-[#F4EFE6] rounded-full text-[#78716C] mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-[#FFFFFF] border border-[#E7E1D4] rounded text-[#78716C]">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Artifacts */}
          <div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#78716C] px-2 mb-2 block">
              Museum Artifacts ({matchedArtifacts.length})
            </span>
            <div className="space-y-1">
              {matchedArtifacts.map(art => (
                <Link
                  key={art.id}
                  href={`/artifact/${art.id}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FBF9F4] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-[#78716C]">
                        {art.period} • {art.category} • {art.state}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#78716C] group-hover:text-[#9A3412]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Timeline Epochs */}
          {matchedTimeline.length > 0 && (
            <div className="pt-2 border-t border-[#E7E1D4]">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#78716C] px-2 mb-2 block">
                Historical Epochs
              </span>
              <div className="space-y-1">
                {matchedTimeline.map(epoch => (
                  <Link
                    key={epoch.id}
                    href={`/timeline?epoch=${epoch.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FBF9F4] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#9A3412]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#1C1917] group-hover:text-[#9A3412]">
                          {epoch.name}
                        </h4>
                        <p className="text-[11px] text-[#78716C]">{epoch.dateRange}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#78716C]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Heritage Sites */}
          {matchedSites.length > 0 && (
            <div className="pt-2 border-t border-[#E7E1D4]">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#78716C] px-2 mb-2 block">
                Heritage Sites & Monuments
              </span>
              <div className="space-y-1">
                {matchedSites.map(site => (
                  <Link
                    key={site.id}
                    href={`/map?site=${site.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FBF9F4] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#9A3412]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#1C1917] group-hover:text-[#9A3412]">
                          {site.name}
                        </h4>
                        <p className="text-[11px] text-[#78716C]">{site.state} • {site.dynastyPeriod}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#78716C]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Manuscripts */}
          {matchedManuscripts.length > 0 && (
            <div className="pt-2 border-t border-[#E7E1D4]">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#78716C] px-2 mb-2 block">
                Ancient Manuscripts
              </span>
              <div className="space-y-1">
                {matchedManuscripts.map(ms => (
                  <Link
                    key={ms.id}
                    href="/manuscripts"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FBF9F4] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-[#9A3412]" />
                      <div>
                        <h4 className="text-xs font-bold text-[#1C1917] group-hover:text-[#9A3412]">
                          {ms.title}
                        </h4>
                        <p className="text-[11px] text-[#78716C]">{ms.script} Script • {ms.dateEst}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#78716C]" />
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
