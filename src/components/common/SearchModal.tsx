'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Compass, Clock, MapPin, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { TIMELINE_EPOCHS } from '@/data/timelineData';
import { HERITAGE_MAP_SITES } from '@/data/heritageMapData';
import { MANUSCRIPTS_DATA } from '@/data/manuscriptsData';

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

  const q = query.trim().toLowerCase();

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
      <div className="fixed inset-0 bg-[#141311]/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FFFDF9] border border-[#E2DAC9] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E2DAC9] bg-[#FAF7F0]">
          <Search className="w-5 h-5 text-[#BE4D2A] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search artifacts, dynasties, manuscripts, monuments..."
            className="w-full bg-transparent text-[#1C1A17] placeholder-[#8C8275] text-base focus:outline-none font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-[#EBE3D3] rounded-full text-[#8C8275] mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono uppercase bg-[#EAE2D2] text-[#5C554B] px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Quick Category Suggestions if no query */}
          {!q && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#8C8275] mb-2.5">
                Popular Heritage Horizons
              </p>
              <div className="flex flex-wrap gap-2">
                {['Chola Bronzes', 'Ajanta Frescoes', 'Ashoka Pillar', 'Rigveda Manuscripts', 'Hampi', 'Patan Patola'].map(
                  tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full text-xs bg-[#F4EFE2] text-[#2C2824] hover:bg-[#BE4D2A] hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Artifacts */}
          {matchedArtifacts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#BE4D2A] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Artifacts & Masterpieces
                </span>
                <span className="text-[11px] text-[#8C8275]">{matchedArtifacts.length} found</span>
              </div>
              <div className="space-y-1.5">
                {matchedArtifacts.map(art => (
                  <Link
                    key={art.id}
                    href={`/artifact/${art.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F4EFE2] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#1C1A17] group-hover:text-[#BE4D2A] transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-xs text-[#8C8275]">
                          {art.period} • {art.category} • {art.state}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8C8275] group-hover:text-[#BE4D2A] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Historical Epochs */}
          {matchedTimeline.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#C5A059] flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5" />
                Historical Timeline Epochs
              </p>
              <div className="space-y-1.5">
                {matchedTimeline.map(epoch => (
                  <Link
                    key={epoch.id}
                    href={`/timeline?epoch=${epoch.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F4EFE2] transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-[#1C1A17] group-hover:text-[#C5A059]">
                        {epoch.name}
                      </h4>
                      <p className="text-xs text-[#8C8275]">{epoch.dateRange}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8C8275] group-hover:text-[#C5A059]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Heritage Sites */}
          {matchedSites.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#10B981] flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                Heritage Locations & Monuments
              </p>
              <div className="space-y-1.5">
                {matchedSites.map(site => (
                  <Link
                    key={site.id}
                    href={`/map?site=${site.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F4EFE2] transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-[#1C1A17] group-hover:text-[#10B981]">
                        {site.name}
                      </h4>
                      <p className="text-xs text-[#8C8275]">{site.state} • {site.type}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8C8275] group-hover:text-[#10B981]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Manuscripts */}
          {matchedManuscripts.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#6366F1] flex items-center gap-1.5 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                Ancient Manuscripts
              </p>
              <div className="space-y-1.5">
                {matchedManuscripts.map(ms => (
                  <Link
                    key={ms.id}
                    href={`/manuscripts?id=${ms.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F4EFE2] transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-[#1C1A17] group-hover:text-[#6366F1]">
                        {ms.title}
                      </h4>
                      <p className="text-xs text-[#8C8275]">{ms.script} Script • {ms.language}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8C8275] group-hover:text-[#6366F1]" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FAF7F0] border-t border-[#E2DAC9] flex items-center justify-between text-xs text-[#8C8275]">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Powered by Virasat AI Full-Text & Semantic Search Engine
          </span>
          <Link href="/explore" onClick={onClose} className="font-semibold text-[#BE4D2A] hover:underline">
            View all 30+ artifacts →
          </Link>
        </div>
      </div>
    </div>
  );
}
