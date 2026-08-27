'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BookOpen, Volume2, VolumeX, Play, Pause, ZoomIn,
  ZoomOut, Shield, Compass, Sparkles, Layers, ArrowRight
} from 'lucide-react';
import { MANUSCRIPTS_DATA } from '@/data/manuscriptsData';
import { speechService } from '@/services/speechService';
import { ManuscriptItem } from '@/types';

function ManuscriptsContent() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');

  const [selectedManuscriptId, setSelectedManuscriptId] = useState<string>(
    idParam || MANUSCRIPTS_DATA[0].id
  );
  const [activeTranslationTab, setActiveTranslationTab] = useState<'english' | 'hindi' | 'paleography'>('english');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const currentManuscript =
    MANUSCRIPTS_DATA.find(m => m.id === selectedManuscriptId) || MANUSCRIPTS_DATA[0];

  const toggleChantAudio = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
    } else {
      if (currentManuscript.extractedSanskritPrakritText) {
        setIsPlayingAudio(true);
        speechService.speak(currentManuscript.extractedSanskritPrakritText, {
          lang: 'hi-IN',
          rate: 0.85,
          pitch: 0.95,
          onEnd: () => setIsPlayingAudio(false),
          onError: () => setIsPlayingAudio(false)
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Page Header */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#C5A059]/30 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2621] border border-[#C5A059]/40 text-[#E6CD92] text-xs font-serif-display uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>National Mission for Manuscripts (NMM) Archival Codex</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0]">
            Ancient Manuscript Conservation Viewer
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#D4C8B2] max-w-2xl">
            Examine high-resolution palm leaf (Talapatra) and birch bark (Bhojpatra) codices with side-by-side transcription, paleography breakdown, and Vedic chanting.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Manuscript Selector Scroller */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {MANUSCRIPTS_DATA.map(ms => {
            const isSelected = selectedManuscriptId === ms.id;
            return (
              <button
                key={ms.id}
                onClick={() => {
                  setSelectedManuscriptId(ms.id);
                  speechService.stop();
                  setIsPlayingAudio(false);
                }}
                className={`p-4 rounded-2xl border text-left shrink-0 max-w-xs transition-all ${
                  isSelected
                    ? 'bg-[#1C1A17] text-[#FAF7F0] border-[#C5A059] shadow-lg scale-105'
                    : 'bg-[#FFFDF9] text-[#3D3934] border-[#E2DAC9] hover:border-[#C5A059]'
                }`}
              >
                <span className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isSelected ? 'text-[#E6CD92]' : 'text-[#8C8275]'}`}>
                  {ms.script} Script • {ms.language}
                </span>
                <h4 className="font-serif-display text-sm font-bold truncate">
                  {ms.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* 2-Column Stage: Deep Archival Viewer & Side-by-Side Transcription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: High-Res Archival Loupe Stage */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl bg-[#141311] border border-[#C5A059]/40 p-4 sm:p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-[#A89F91] border-b border-[#332E27] pb-3">
                <span className="font-mono text-[#E6CD92]">
                  {currentManuscript.material}
                </span>
                <span className="bg-[#24211D] px-2.5 py-1 rounded text-[#10B981] font-medium">
                  {currentManuscript.conservationStatus}
                </span>
              </div>

              {/* High-Res Manuscript Surface */}
              <div className="relative h-[340px] sm:h-[400px] overflow-hidden rounded-2xl bg-black flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentManuscript.imageUrl}
                  alt={currentManuscript.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-200"
                  style={{ transform: `scale(${zoomScale})` }}
                />
              </div>

              {/* Viewer Controls */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomScale(prev => Math.max(1, prev - 0.25))}
                    className="p-2 rounded-xl bg-[#26231E] text-[#D8CFBF] hover:text-white border border-[#38332C]"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-[#E6CD92] w-12 text-center">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomScale(prev => Math.min(3, prev + 0.25))}
                    className="p-2 rounded-xl bg-[#26231E] text-[#D8CFBF] hover:text-white border border-[#38332C]"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-[#8C8275] font-mono">
                  Repository: {currentManuscript.currentRepository}
                </span>
              </div>
            </div>

            {/* Audio Recitation Player */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleChantAudio}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    isPlayingAudio
                      ? 'bg-[#BE4D2A] text-white animate-pulse shadow-md'
                      : 'bg-[#1C1A17] text-[#E6CD92] hover:bg-[#BE4D2A] hover:text-white'
                  }`}
                  aria-label="Play Recitation"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <h5 className="font-serif-display text-sm font-bold text-[#1C1A17]">
                    Sanskrit / Prakrit Vocal Recitation
                  </h5>
                  <p className="text-xs text-[#8C8275]">
                    Classical metric recitation synthesized via Indian speech engine
                  </p>
                </div>
              </div>

              {isPlayingAudio && (
                <span className="text-xs font-mono text-[#BE4D2A] font-bold animate-pulse">
                  Chanting...
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Transcription & Translation Panel */}
          <div className="lg:col-span-6 rounded-3xl bg-[#FFFDF9] border border-[#E2DAC9] p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8C8275] font-mono mb-1">
                <span>{currentManuscript.period}</span>
                <span>{currentManuscript.dateEst}</span>
              </div>

              <h2 className="font-serif-display text-2xl font-bold text-[#1C1A17]">
                {currentManuscript.title}
              </h2>
              <p className="font-serif-display text-sm text-[#BE4D2A] italic mt-0.5">
                {currentManuscript.nativeTitle}
              </p>
            </div>

            {/* Original Script OCR Block */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C8275] flex items-center justify-between">
                <span>Original {currentManuscript.script} Script OCR Transcription:</span>
                <span className="text-[#6366F1] font-mono">100% Verified</span>
              </span>
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E2DAC9] font-serif-display text-sm sm:text-base leading-relaxed text-[#1C1A17] whitespace-pre-line">
                {currentManuscript.extractedSanskritPrakritText}
              </div>
            </div>

            {/* Translation Tabs */}
            <div className="space-y-4">
              <div className="flex items-center border-b border-[#E2DAC9] text-xs font-serif-display uppercase font-bold tracking-wider">
                <button
                  onClick={() => setActiveTranslationTab('english')}
                  className={`pb-3 px-3 transition-colors ${
                    activeTranslationTab === 'english'
                      ? 'text-[#BE4D2A] border-b-2 border-[#BE4D2A]'
                      : 'text-[#8C8275] hover:text-[#1C1A17]'
                  }`}
                >
                  English Translation
                </button>
                <button
                  onClick={() => setActiveTranslationTab('hindi')}
                  className={`pb-3 px-3 transition-colors ${
                    activeTranslationTab === 'hindi'
                      ? 'text-[#BE4D2A] border-b-2 border-[#BE4D2A]'
                      : 'text-[#8C8275] hover:text-[#1C1A17]'
                  }`}
                >
                  हिन्दी अनुवाद
                </button>
                <button
                  onClick={() => setActiveTranslationTab('paleography')}
                  className={`pb-3 px-3 transition-colors ${
                    activeTranslationTab === 'paleography'
                      ? 'text-[#BE4D2A] border-b-2 border-[#BE4D2A]'
                      : 'text-[#8C8275] hover:text-[#1C1A17]'
                  }`}
                >
                  Paleography & Conservation
                </button>
              </div>

              {/* Translation Tab Content */}
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E2DAC9] text-sm text-[#3D3934] leading-relaxed min-h-[140px]">
                {activeTranslationTab === 'english' && (
                  <p className="whitespace-pre-line font-serif-editorial text-base sm:text-lg">
                    {currentManuscript.englishTranslation}
                  </p>
                )}
                {activeTranslationTab === 'hindi' && (
                  <p className="whitespace-pre-line font-serif-editorial text-base sm:text-lg">
                    {currentManuscript.hindiTranslation}
                  </p>
                )}
                {activeTranslationTab === 'paleography' && (
                  <div className="space-y-3 text-xs">
                    <p>
                      <strong className="text-[#1C1A17]">Paleography Analysis:</strong> {currentManuscript.paleographyNotes}
                    </p>
                    <p>
                      <strong className="text-[#1C1A17]">Philosophical Canon:</strong> {currentManuscript.philosophicalContext}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/ai-guide"
                className="inline-flex items-center gap-1.5 text-xs font-serif-display uppercase font-bold text-[#BE4D2A] hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Guide to analyze this manuscript →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ManuscriptsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-sm font-serif-display">Loading Ancient Manuscripts...</div>}>
      <ManuscriptsContent />
    </Suspense>
  );
}
