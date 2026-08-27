'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronLeft, ChevronRight, Eye, Volume2, Maximize2,
  Minimize2, Map, Sparkles, Compass, Info, ArrowLeft
} from 'lucide-react';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { speechService } from '@/services/speechService';

const GALLERIES = [
  {
    id: 'gupta-golden-hall',
    name: 'The Classical Gupta & Vakataka Wing',
    nativeName: 'गुप्त एवं वाकाटक शास्त्रीय कला दीर्घा',
    description: 'Masterpieces of 4th–6th century classical Indian sculpture, Ajanta frescoes, and pure gold dinars.',
    artworkIds: ['padmapani-bodhisattva-ajanta', 'samudragupta-gold-dinar-coin', 'didarganj-yakshi-sculpture', 'ashoka-lion-capital'],
    wallTexture: 'bg-[#181614]',
  },
  {
    id: 'chola-sanctum',
    name: 'The Imperial Chola Bronze Sanctum',
    nativeName: 'चोल कांस्य एवं कावेरी डेल्टा गर्भगृह',
    description: 'Sacred lost-wax panchaloha processional bronzes from the 10th–12th century Kaveri Delta.',
    artworkIds: ['chola-bronze-nataraja', 'tanjore-gold-leaf-painting', 'bidriware-silver-inlay-huqqa', 'kautilya-arthashastra-manuscript'],
    wallTexture: 'bg-[#141210]',
  },
  {
    id: 'sacred-manuscripts-vault',
    name: 'The Ancient Manuscripts & Epigraphy Vault',
    nativeName: 'प्राचीन पाण्डुलिपि एवं अभिलेख कक्ष',
    description: 'Birch-bark and palm-leaf codices containing humanity’s oldest philosophical texts.',
    artworkIds: ['rigveda-samhita-manuscript', 'kautilya-arthashastra-manuscript', 'kalpasutra-golden-jain-folio', 'charaka-samhita-ayurveda'],
    wallTexture: 'bg-[#1A1815]',
  }
];

export default function VirtualGalleryPage() {
  const params = useParams();
  const galleryId = (params?.id as string) || 'gupta-golden-hall';
  const currentGallery = GALLERIES.find(g => g.id === galleryId) || GALLERIES[0];

  const galleryArtworks = currentGallery.artworkIds
    .map(id => ARTIFACTS_DATA.find(a => a.id === id))
    .filter(Boolean) as typeof ARTIFACTS_DATA;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showPlaque, setShowPlaque] = useState(true);
  const [showFloorplan, setShowFloorplan] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentArt = galleryArtworks[currentIdx] || galleryArtworks[0];

  const handleNext = () => {
    speechService.stop();
    setIsPlayingAudio(false);
    setCurrentIdx(prev => (prev + 1) % galleryArtworks.length);
  };

  const handlePrev = () => {
    speechService.stop();
    setIsPlayingAudio(false);
    setCurrentIdx(prev => (prev - 1 + galleryArtworks.length) % galleryArtworks.length);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
    } else {
      if (currentArt?.audioNarrative?.transcript) {
        setIsPlayingAudio(true);
        speechService.speak(currentArt.audioNarrative.transcript, {
          onEnd: () => setIsPlayingAudio(false),
          onError: () => setIsPlayingAudio(false)
        });
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative min-h-[92vh] w-full bg-[#12110F] text-[#FAF7F0] overflow-hidden flex flex-col justify-between select-none">
      {/* Top Gallery Header Bar */}
      <div className="relative z-20 px-6 py-4 bg-[#181614]/90 border-b border-[#C5A059]/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/explore"
            className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#A89F91] hover:text-[#FAF7F0] bg-[#24211D] px-3 py-1.5 rounded-full border border-[#38332C]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Gallery</span>
          </Link>
          <div>
            <h1 className="font-serif-display text-base sm:text-lg font-bold text-[#FAF7F0]">
              {currentGallery.name}
            </h1>
            <p className="text-xs text-[#C5A059] font-serif-display italic">
              {currentGallery.nativeName}
            </p>
          </div>
        </div>

        {/* Wing Switcher & Floorplan */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFloorplan(!showFloorplan)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif-display uppercase tracking-wider bg-[#24211D] text-[#E6CD92] border border-[#C5A059]/40 hover:border-[#C5A059]"
          >
            <Map className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Gallery Floorplan</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-[#24211D] text-[#D8CFBF] hover:text-white border border-[#38332C]"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Virtual Museum Wall Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-16 py-8">
        {/* Museum Floor & Wall Lighting Shadows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17] via-[#141210] to-[#0A0A09]" />
        
        {/* Soft Volumetric Overhead Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[65%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A059]/20 via-[#C5A059]/5 to-transparent pointer-events-none" />

        {/* Gallery Wall Frame Container */}
        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
          {/* Framed Exhibit Plaque on Wall */}
          <div className="relative group">
            {/* Museum Wall Frame Molding */}
            <div className="p-3 sm:p-5 rounded-2xl bg-[#26221D] border-4 border-[#C5A059]/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-500">
              <div className="relative max-h-[50vh] sm:max-h-[58vh] overflow-hidden rounded-lg bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentArt.imageUrl}
                  alt={currentArt.title}
                  className="max-h-[50vh] sm:max-h-[58vh] w-auto object-contain mx-auto transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Pedestal Reflection */}
            <div className="w-4/5 h-6 mx-auto mt-2 bg-black/60 rounded-full blur-lg pointer-events-none" />
          </div>

          {/* Wall Mounted Brass Info Plaque */}
          {showPlaque && (
            <div className="mt-6 w-full max-w-lg p-5 rounded-2xl bg-[#1C1A17]/95 border border-[#C5A059]/40 shadow-2xl backdrop-blur-md text-center space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#E6CD92] border-b border-[#332E27] pb-2">
                <span>Exhibit {currentIdx + 1} of {galleryArtworks.length}</span>
                <span>{currentArt.period}</span>
              </div>

              <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#FAF7F0]">
                {currentArt.title}
              </h2>

              <p className="text-xs text-[#D4C8B2] line-clamp-2 leading-relaxed">
                {currentArt.overview}
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={toggleAudio}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif-display uppercase font-bold tracking-wider transition-all ${
                    isPlayingAudio
                      ? 'bg-[#BE4D2A] text-white animate-pulse'
                      : 'bg-[#2B2721] text-[#E6CD92] hover:bg-[#BE4D2A] hover:text-white border border-[#C5A059]/40'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? 'Audio Playing' : 'Play Audio Guide'}</span>
                </button>

                <Link
                  href={`/artifact/${currentArt.id}`}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-serif-display uppercase font-bold tracking-wider bg-[#C5A059] text-[#1C1A17] hover:brightness-110"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Deep Inspection</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Previous Artwork Navigation Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#1C1A17]/80 hover:bg-[#BE4D2A] border border-[#C5A059]/40 text-[#E6CD92] hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl"
          aria-label="Previous Artwork"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Artwork Navigation Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#1C1A17]/80 hover:bg-[#BE4D2A] border border-[#C5A059]/40 text-[#E6CD92] hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl"
          aria-label="Next Artwork"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Gallery Floorplan Modal / Drawer */}
      {showFloorplan && (
        <div className="absolute inset-0 z-30 bg-[#141311]/90 backdrop-blur-md p-6 flex flex-col justify-center items-center">
          <div className="w-full max-w-2xl bg-[#1C1A17] border border-[#C5A059] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#332E27] pb-4">
              <div>
                <h3 className="font-serif-display text-xl font-bold text-[#FAF7F0]">
                  Virtual Museum Wings & Floorplan
                </h3>
                <p className="text-xs text-[#A89F91]">Select an exhibition wing to explore</p>
              </div>
              <button
                onClick={() => setShowFloorplan(false)}
                className="px-3 py-1 rounded bg-[#26231E] text-xs font-mono uppercase text-[#D8CFBF]"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {GALLERIES.map(gal => (
                <Link
                  key={gal.id}
                  href={`/gallery/${gal.id}`}
                  onClick={() => setShowFloorplan(false)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    gal.id === galleryId
                      ? 'bg-[#2A2621] border-[#C5A059] text-white shadow-lg'
                      : 'bg-[#181614] border-[#38332C] text-[#A89F91] hover:border-[#C5A059] hover:text-white'
                  }`}
                >
                  <h4 className="font-serif-display text-sm font-bold text-[#FAF7F0] mb-1">
                    {gal.name}
                  </h4>
                  <p className="text-[11px] text-[#A89F91] line-clamp-2">
                    {gal.description}
                  </p>
                  <span className="inline-block mt-3 text-[10px] font-mono uppercase text-[#C5A059]">
                    {gal.artworkIds.length} Masterpieces →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Gallery Navigation Bar */}
      <div className="relative z-20 px-6 py-3 bg-[#181614]/90 border-t border-[#C5A059]/30 flex items-center justify-between text-xs text-[#A89F91]">
        <button
          onClick={() => setShowPlaque(!showPlaque)}
          className="flex items-center gap-1.5 text-xs text-[#E6CD92] hover:text-white"
        >
          <Info className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{showPlaque ? 'Hide Plaque' : 'Show Plaque'}</span>
        </button>

        {/* Thumbnail Dots */}
        <div className="flex items-center gap-2">
          {galleryArtworks.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentIdx === idx ? 'w-6 bg-[#BE4D2A]' : 'bg-[#38332C] hover:bg-[#C5A059]'
              }`}
              aria-label={`Go to Artwork ${idx + 1}`}
            />
          ))}
        </div>

        <span className="font-mono text-[11px]">
          Room: {currentGallery.id}
        </span>
      </div>
    </div>
  );
}
