import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MANUSCRIPTS_DATA } from '../data/heritageData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerificationBadge } from '../components/VerificationBadge';
import { ErrorState } from '../components/ErrorState';
import { ZoomIn, ZoomOut, Volume2, VolumeX, ShieldCheck, BookOpen, Layers, Info } from 'lucide-react';

export const ManuscriptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const ms = MANUSCRIPTS_DATA.find(m => m.id === id);

  if (!ms) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ErrorState
          title="Manuscript Folio Not Found"
          message={`We could not locate manuscript #${id} in the primary paleography archive.`}
          backPath="/manuscripts"
        />
      </div>
    );
  }

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(ms.transcription);
      utterance.rate = 0.85;
      utterance.lang = 'hi-IN';
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <Breadcrumbs
        items={[
          { label: 'Ancient Manuscripts', path: '/manuscripts' },
          { label: ms.title }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
              {ms.script}
            </span>
            <VerificationBadge status={ms.verificationStatus} size="sm" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {ms.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Accession #{ms.accessionNo} • {ms.material} • {ms.repository}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.3, 2.5))}
            className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs flex items-center gap-1 shadow-2xs"
            title="Zoom in on folio scan"
          >
            <ZoomIn className="w-4 h-4" />
            <span>Zoom In</span>
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.3, 1))}
            className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs flex items-center gap-1 shadow-2xs"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Interactive High-Res Manuscript Viewer Canvas */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-950 border border-stone-800 shadow-xl min-h-[380px] flex items-center justify-center p-4">
        <div
          className="transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing max-w-full"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src={ms.imageUrl}
            alt={ms.title}
            className="max-h-[480px] w-auto rounded-xl shadow-2xl object-contain"
          />
        </div>
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-xl border border-white/10">
          Curatorial Scan: {ms.dimensions} • {ms.preservationStatus}
        </div>
      </div>

      {/* Side-by-Side Paleographical Transcription & Translation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Col: Original Inscription & Transliteration */}
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Folio Transcription &amp; Transliteration
            </h3>
            <button
              onClick={handleToggleAudio}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs flex items-center gap-1.5 transition-colors"
              title="Play vocalized transcription"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Stop' : 'Vocalize'}</span>
            </button>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Original Inscribed Characters ({ms.script})
            </span>
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-lg sm:text-xl font-serif text-stone-900 leading-relaxed">
              {ms.transcription}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              IAST International Roman Transliteration
            </span>
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-sm font-mono text-stone-700 leading-relaxed">
              {ms.transliteration}
            </div>
          </div>
        </div>

        {/* Right Col: Scholarly Translations */}
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Curatorial English &amp; Hindi Translations
          </h3>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#936B38] uppercase tracking-wider block">
              English Translation (Scholar-Verified)
            </span>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed italic p-5 rounded-2xl bg-[#F7EFE6]/60 border border-[#E7D6C0]">
              “{ms.translation}”
            </p>
          </div>

          {ms.hindiTranslation && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#A64B2A] uppercase tracking-wider block">
                हिन्दी अनुवाद (Hindi Scholarly Translation)
              </span>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif p-5 rounded-2xl bg-stone-50 border border-stone-200">
                “{ms.hindiTranslation}”
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Scientific Paleography & Conservation Dossier */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <h3 className="font-serif text-xl font-bold text-stone-900">
          Scientific Paleography &amp; Conservation Observations
        </h3>
        <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
          {ms.paleographyNotes.map((note, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#936B38] mt-1.5 shrink-0" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
