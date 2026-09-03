import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scroll, Eye, BookOpen, ShieldCheck, ArrowRight, Layers, ZoomIn } from 'lucide-react';
import { MANUSCRIPTS_DATA } from '../data/heritageData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerificationBadge } from '../components/VerificationBadge';

export const ManuscriptsPage: React.FC = () => {
  const [selectedScript, setSelectedScript] = useState<string>('All');

  const scripts = ['All', 'Sharada', 'Brahmi', 'Karani', 'Sanskrit'];

  const filteredManuscripts = MANUSCRIPTS_DATA.filter(m =>
    selectedScript === 'All' || m.script.toLowerCase().includes(selectedScript.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Ancient Manuscripts & Paleography' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
          <Scroll className="w-3.5 h-3.5" />
          <span>Epigraphy &amp; Paleography Archive</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Ancient Manuscripts Conservation
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Explore curated high-resolution folios on palm leaf (Talapatra) and birch bark (Bhojpatra) with side-by-side paleographical transcription and scholarly translations.
        </p>
      </div>

      {/* Script Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {scripts.map(s => (
          <button
            key={s}
            onClick={() => setSelectedScript(s)}
            className={`text-xs px-4 py-2 rounded-full font-medium transition-colors ${
              selectedScript === s
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {s === 'All' ? 'All Scripts' : `${s} Script`}
          </button>
        ))}
      </div>

      {/* Manuscripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredManuscripts.map(ms => (
          <div
            key={ms.id}
            className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 overflow-hidden bg-stone-900">
                <img
                  src={ms.imageUrl}
                  alt={ms.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-indigo-950/80 backdrop-blur-md text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-700">
                  {ms.material.includes('Birch') ? 'Birch Bark' : 'Palm Leaf'}
                </div>
                <div className="absolute top-3 right-3">
                  <VerificationBadge status={ms.verificationStatus} size="sm" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-lg flex items-center justify-between">
                  <span className="truncate">{ms.script}</span>
                  <span className="font-mono text-stone-300">{ms.accessionNo}</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-[11px] font-mono text-[#936B38] font-bold uppercase tracking-wider block">
                  {ms.period}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {ms.title}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {ms.language} • {ms.repository}
                </p>

                {/* Transcription Preview Box */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                    Source Folio Text:
                  </span>
                  <p className="font-serif text-sm text-stone-800 font-semibold truncate">
                    {ms.transcription}
                  </p>
                  <p className="text-xs text-stone-500 italic truncate">
                    {ms.translation}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between pt-4 text-xs">
              <span className="text-stone-500">{ms.folioCount} Folios Catalogued</span>
              <Link
                to={`/manuscripts/${ms.id}`}
                className="inline-flex items-center gap-1.5 font-semibold text-stone-900 hover:text-[#936B38] transition-colors"
              >
                <span>Inspect Folio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Preservation & Scientific Paleography Note */}
      <div className="p-8 rounded-3xl bg-stone-100 border border-stone-200 space-y-3">
        <h3 className="font-serif text-xl font-bold text-stone-900">
          Manuscript Digitization Standards &amp; Honest Disclaimers
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
          Ancient scripts such as early Brahmi, Sharada, and Newari possess intricate ligatures and diacritics requiring expert epigraphist verification. VirasatX folios display primary institutional scans alongside curator-reviewed transcriptions and translations. We do not claim fully autonomous OCR for un-deciphered or damaged epigraphy, ensuring academic credibility.
        </p>
      </div>
    </div>
  );
};
