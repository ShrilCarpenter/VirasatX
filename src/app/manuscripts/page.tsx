'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, Volume2, Play, Pause, ZoomIn, ZoomOut,
  Languages, FileText, CheckCircle, ShieldCheck, Compass, ArrowRight
} from 'lucide-react';
import { MANUSCRIPTS_DATA } from '@/data/manuscriptsData';
import { speechService } from '@/services/speechService';
import { ManuscriptItem } from '@/types';

export default function ManuscriptsPage() {
  const [selectedManuscript, setSelectedManuscript] = useState<ManuscriptItem>(MANUSCRIPTS_DATA[0]);
  const [activeTranslationTab, setActiveTranslationTab] = useState<'english' | 'hindi' | 'paleography' | 'philosophy'>('english');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const toggleChantAudio = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
    } else {
      if (selectedManuscript.chantAudioTranscript) {
        setIsPlayingAudio(true);
        speechService.speak(selectedManuscript.chantAudioTranscript, {
          onEnd: () => setIsPlayingAudio(false),
          onError: () => setIsPlayingAudio(false)
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Page Header */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#78716C] text-xs font-sans font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>Manuscript & Paleography Archive</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Ancient Manuscripts & Paleography
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] max-w-2xl">
            Explore high-resolution palm-leaf (<em>Talapatra</em>) and birch-bark (<em>Bhojpatra</em>) codices with transcriptions and translations.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Manuscript Selector Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
              Select Preserved Codex:
            </span>
            <span className="text-xs text-[#78716C]">
              {MANUSCRIPTS_DATA.length} Preserved Folios Catalogued
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MANUSCRIPTS_DATA.map(ms => {
              const isSelected = selectedManuscript.id === ms.id;
              return (
                <button
                  key={ms.id}
                  onClick={() => {
                    speechService.stop();
                    setIsPlayingAudio(false);
                    setSelectedManuscript(ms);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#9A3412] shadow-md ring-1 ring-[#9A3412]/30'
                      : 'bg-[#F4EFE6] border-[#E7E1D4] hover:bg-[#FFFFFF] hover:border-[#9A3412]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#9A3412] font-semibold mb-1">
                    <span>{ms.script}</span>
                    <span>{ms.material.split(' ')[0]}</span>
                  </div>
                  <h3 className="font-serif-display text-sm font-bold text-[#1C1917] line-clamp-1">
                    {ms.title}
                  </h3>
                  <p className="text-[11px] text-[#78716C] mt-0.5 line-clamp-1">
                    {ms.dateEst}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Manuscript Deep Inspection Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: High-Res Folio Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E1D4] text-xs">
                <span className="font-mono text-[#78716C]">
                  {selectedManuscript.material} • {selectedManuscript.conservationStatus}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}
                    className="p-1 rounded hover:bg-[#F4EFE6] text-[#78716C]"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono w-12 text-center">
                    {(zoomLevel * 100).toFixed(0)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
                    className="p-1 rounded hover:bg-[#F4EFE6] text-[#78716C]"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Folio View Stage */}
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-stone-100 border border-[#E7E1D4] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedManuscript.imageUrl}
                  alt={selectedManuscript.title}
                  loading="lazy"
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="max-h-full max-w-full object-contain transition-transform duration-200 cursor-grab"
                />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] font-sans bg-black/60 text-white/90">
                  Representative Archival Image
                </div>
              </div>

              {/* Audio Player */}
              {selectedManuscript.chantAudioTranscript && (
                <div className="p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleChantAudio}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isPlayingAudio
                          ? 'bg-[#9A3412] text-white shadow animate-pulse'
                          : 'bg-[#1C1917] text-white hover:bg-[#9A3412]'
                      }`}
                    >
                      {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-[#1C1917]">
                        {isPlayingAudio ? 'Audio Playback Active...' : '▶ Listen to Manuscript Recitation'}
                      </h4>
                      <p className="text-[11px] text-[#78716C]">
                        Language: {selectedManuscript.language} • Audio synthesis
                      </p>
                    </div>
                  </div>

                  {isPlayingAudio && (
                    <span className="text-xs font-mono text-[#9A3412] font-semibold animate-pulse">
                      Playing
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Transcription & Translation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm space-y-4">
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-semibold bg-[#F4EFE6] text-[#9A3412]">
                    {selectedManuscript.script} Script
                  </span>
                  <span className="text-xs text-[#78716C] font-mono">
                    {selectedManuscript.language}
                  </span>
                </div>
                <h2 className="font-serif-display text-2xl font-bold text-[#1C1917] mt-1">
                  {selectedManuscript.title}
                </h2>
                <p className="text-xs text-[#78716C]">
                  {selectedManuscript.dateEst} • {selectedManuscript.currentRepository}
                </p>
              </div>

              {/* Ancient Script Original Transcription */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] block">
                  Original Text Transcription ({selectedManuscript.script}):
                </span>
                <div className="p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] font-serif text-sm leading-relaxed text-[#1C1917] whitespace-pre-line max-h-48 overflow-y-auto">
                  {selectedManuscript.extractedSanskritPrakritText}
                </div>
              </div>

              {/* Translation Tabs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 border-b border-[#E7E1D4] pb-2 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setActiveTranslationTab('english')}
                    className={`px-3 py-1 text-xs font-sans font-semibold rounded-lg shrink-0 transition-colors ${
                      activeTranslationTab === 'english'
                        ? 'bg-[#9A3412] text-white'
                        : 'text-[#57534E] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    English Translation
                  </button>
                  <button
                    onClick={() => setActiveTranslationTab('hindi')}
                    className={`px-3 py-1 text-xs font-sans font-semibold rounded-lg shrink-0 transition-colors ${
                      activeTranslationTab === 'hindi'
                        ? 'bg-[#9A3412] text-white'
                        : 'text-[#57534E] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    हिन्दी अनुवाद
                  </button>
                  <button
                    onClick={() => setActiveTranslationTab('paleography')}
                    className={`px-3 py-1 text-xs font-sans font-semibold rounded-lg shrink-0 transition-colors ${
                      activeTranslationTab === 'paleography'
                        ? 'bg-[#9A3412] text-white'
                        : 'text-[#57534E] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    Paleography Notes
                  </button>
                  <button
                    onClick={() => setActiveTranslationTab('philosophy')}
                    className={`px-3 py-1 text-xs font-sans font-semibold rounded-lg shrink-0 transition-colors ${
                      activeTranslationTab === 'philosophy'
                        ? 'bg-[#9A3412] text-white'
                        : 'text-[#57534E] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    Context
                  </button>
                </div>

                <div className="text-xs text-[#44403C] leading-relaxed p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E7E1D4] max-h-52 overflow-y-auto">
                  {activeTranslationTab === 'english' && (
                    <p className="whitespace-pre-line">{selectedManuscript.englishTranslation}</p>
                  )}
                  {activeTranslationTab === 'hindi' && (
                    <p className="whitespace-pre-line">{selectedManuscript.hindiTranslation}</p>
                  )}
                  {activeTranslationTab === 'paleography' && (
                    <p>{selectedManuscript.paleographyNotes}</p>
                  )}
                  {activeTranslationTab === 'philosophy' && (
                    <p>{selectedManuscript.philosophicalContext}</p>
                  )}
                </div>
              </div>

              {/* Attribution */}
              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#78716C]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                <span>Curated from published records of the <strong>National Mission for Manuscripts (NMM)</strong> & BORI Pune.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
