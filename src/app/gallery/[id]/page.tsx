'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronLeft, ChevronRight, Eye, Play, Pause,
  Map, Sparkles, Compass, Info, ArrowLeft, Layers, Volume2
} from 'lucide-react';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { speechService } from '@/services/speechService';

const GALLERIES = [
  {
    id: 'sculpture-gallery',
    name: 'Gallery 01: Sculpture Gallery',
    nativeName: 'मूर्तिकला दीर्घा',
    description: 'Lost-wax Chola bronzes, Mauryan polished sandstone, Harappan bronzes, and classical Indian stone sculpture.',
    artworkIds: ['chola-bronze-nataraja', 'ashoka-lion-capital', 'dancing-girl-mohenjodaro', 'didarganj-yakshi-sculpture', 'samudragupta-gold-dinar-coin', 'dhokra-brass-tribal-bull'],
  },
  {
    id: 'manuscript-gallery',
    name: 'Gallery 02: Manuscript Gallery',
    nativeName: 'प्राचीन पाण्डुलिपि दीर्घा',
    description: 'Ancient birch-bark and palm-leaf codices containing classical philosophical, medical, and administrative treatises.',
    artworkIds: ['rigveda-samhita-manuscript', 'kautilya-arthashastra-manuscript', 'kalpasutra-golden-jain-folio', 'charaka-samhita-ayurveda'],
  },
  {
    id: 'architecture-gallery',
    name: 'Gallery 03: Temple Architecture Gallery',
    nativeName: 'मंदिर स्थापत्य दीर्घा',
    description: 'Architectural documentation of monolithic rock excavations, Dravidian vimanas, Konark sundials, and Sanchi toranas.',
    artworkIds: ['kailasa-temple-ellora', 'konark-sun-temple-wheel', 'sanchi-stupa-great-torana', 'ashoka-lion-capital'],
  },
  {
    id: 'painting-gallery',
    name: 'Gallery 04: Painting Gallery',
    nativeName: 'चित्रकला दीर्घा',
    description: 'Ajanta rock fresco murals, Thanjavur gold-leaf icons, Hamzanama miniatures, and Odisha Pattachitra scrolls.',
    artworkIds: ['padmapani-bodhisattva-ajanta', 'tanjore-gold-leaf-painting', 'mughal-miniature-hamzanama', 'pattachitra-scroll-jagannath'],
  }
];

export default function VirtualGalleryPage() {
  const params = useParams();
  const rawId = (params?.id as string) || 'sculpture-gallery';
  // Map old route ids gracefully
  const galleryId = rawId === 'gupta-golden-hall' ? 'sculpture-gallery' :
                    rawId === 'sacred-manuscripts-vault' ? 'manuscript-gallery' :
                    rawId === 'chola-sanctum' ? 'sculpture-gallery' : rawId;

  const currentGallery = GALLERIES.find(g => g.id === galleryId) || GALLERIES[0];

  const galleryArtworks = currentGallery.artworkIds
    .map(id => ARTIFACTS_DATA.find(a => a.id === id))
    .filter(Boolean) as typeof ARTIFACTS_DATA;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showPlaque, setShowPlaque] = useState(true);
  const [showFloorplan, setShowFloorplan] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] flex flex-col justify-between">
      {/* Top Header Bar */}
      <div className="px-6 py-4 bg-[#F4EFE6] border-b border-[#E7E1D4] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/explore"
            className="flex items-center gap-1.5 text-xs font-sans font-semibold text-[#78716C] hover:text-[#1C1917]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Collections</span>
          </Link>
          <div className="h-4 w-px bg-[#E7E1D4]" />
          <div>
            <h1 className="font-serif-display text-base font-bold text-[#1C1917]">
              {currentGallery.name}
            </h1>
            <p className="text-[11px] text-[#78716C]">{currentGallery.nativeName}</p>
          </div>
        </div>

        {/* Gallery Switcher & Floorplan */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFloorplan(!showFloorplan)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium bg-[#FFFFFF] border border-[#E7E1D4] text-[#44403C] hover:border-[#9A3412]"
          >
            <Map className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>Galleries ({GALLERIES.length})</span>
          </button>
        </div>
      </div>

      {/* Gallery Selector Drawer */}
      {showFloorplan && (
        <div className="bg-[#FFFFFF] border-b border-[#E7E1D4] px-6 py-4 animate-in slide-in-from-top-2 duration-150">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERIES.map(gal => (
              <Link
                key={gal.id}
                href={`/gallery/${gal.id}`}
                onClick={() => setShowFloorplan(false)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  gal.id === currentGallery.id
                    ? 'bg-[#F4EFE6] border-[#9A3412] shadow-sm'
                    : 'bg-[#FBF9F4] border-[#E7E1D4] hover:bg-[#FFFFFF]'
                }`}
              >
                <h4 className="font-serif-display text-sm font-bold text-[#1C1917]">
                  {gal.name}
                </h4>
                <p className="text-[11px] text-[#78716C] line-clamp-2 mt-1">
                  {gal.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Exhibition Stage */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex flex-col justify-center items-center">
        {currentArt && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Wall-Mounted Spotlight Artwork */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] shadow-md p-4 max-w-lg w-full">
                <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentArt.imageUrl}
                    alt={currentArt.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Exhibit navigation arrows */}
                <div className="flex items-center justify-between pt-3 text-xs text-[#78716C]">
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 hover:text-[#1C1917] font-sans font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <span className="font-mono text-[11px]">
                    Exhibit {currentIdx + 1} of {galleryArtworks.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 hover:text-[#1C1917] font-sans font-semibold"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Museum Info Plaque */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm space-y-4">
                <div className="space-y-1 border-b border-[#E7E1D4] pb-3">
                  <span className="text-[10px] font-sans uppercase font-semibold text-[#9A3412] bg-[#F4EFE6] px-2 py-0.5 rounded">
                    {currentArt.category} • {currentArt.period}
                  </span>
                  <h2 className="font-serif-display text-2xl font-bold text-[#1C1917] pt-1">
                    {currentArt.title}
                  </h2>
                  {currentArt.nativeTitle && (
                    <p className="text-xs text-[#78716C] font-serif-display italic">
                      {currentArt.nativeTitle}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-[#57534E]">
                  <div>
                    <strong className="text-[#1C1917]">Dynasty:</strong> {currentArt.dynasty}
                  </div>
                  <div>
                    <strong className="text-[#1C1917]">Material:</strong> {currentArt.material}
                  </div>
                  <div>
                    <strong className="text-[#1C1917]">Location:</strong> {currentArt.location}, {currentArt.state}
                  </div>
                  <div>
                    <strong className="text-[#1C1917]">Repository:</strong> {currentArt.currentLocation}
                  </div>
                </div>

                <p className="text-xs text-[#44403C] leading-relaxed pt-2 border-t border-[#E7E1D4]">
                  {currentArt.overview}
                </p>

                {/* Audio plaque button */}
                {currentArt.audioNarrative && (
                  <button
                    onClick={toggleAudio}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-sans font-semibold transition-all flex items-center justify-center gap-2 ${
                      isPlayingAudio
                        ? 'bg-[#9A3412] text-white animate-pulse'
                        : 'bg-[#F4EFE6] hover:bg-[#EAE2D2] text-[#1C1917] border border-[#E7E1D4]'
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingAudio ? 'Audio Plaque Playing...' : '▶ Listen to Plaque Description'}</span>
                  </button>
                )}

                <div className="pt-2">
                  <Link
                    href={`/artifact/${currentArt.id}`}
                    className="w-full py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#9A3412] text-white text-xs font-sans font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open 3D Archival Inspection Studio →</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Bottom Gallery Thumbnail Bar */}
      <div className="bg-[#F4EFE6] border-t border-[#E7E1D4] py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 overflow-x-auto no-scrollbar">
          {galleryArtworks.map((art, idx) => (
            <button
              key={art.id}
              onClick={() => {
                speechService.stop();
                setIsPlayingAudio(false);
                setCurrentIdx(idx);
              }}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-stone-100 ${
                currentIdx === idx
                  ? 'border-[#9A3412] ring-2 ring-[#9A3412]/30 scale-105'
                  : 'border-[#E7E1D4] opacity-70 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
