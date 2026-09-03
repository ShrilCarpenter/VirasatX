import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Layers, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { EPOCHS, HERITAGE_ITEMS, LIVING_TRADITIONS } from '../data/heritageData';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const TimelinePage: React.FC = () => {
  const [selectedEpochId, setSelectedEpochId] = useState<string>(EPOCHS[0].id);

  const selectedEpoch = EPOCHS.find(e => e.id === selectedEpochId) || EPOCHS[0];

  // Artifacts linked to this epoch
  const epochArtifacts = HERITAGE_ITEMS.filter(i => 
    i.timelineEpochId === selectedEpoch.id || 
    i.period.toLowerCase().includes(selectedEpoch.name.toLowerCase().split(' ')[0])
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Chronological Indian History Timeline' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#936B38] uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>Chronological Civilizational Sequence</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          5,000 Years Across 11 Epochs
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          From the sophisticated brick hydraulic cities of Harappa to classical Sanskrit philosophy, monumental granite vimanas, and the modern constitutional preservation of living traditions.
        </p>
      </div>

      {/* Horizontal Scrollable Timeline Ribbon */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-3 min-w-[800px] py-1">
          {EPOCHS.map((epoch, index) => {
            const isSelected = epoch.id === selectedEpochId;
            return (
              <button
                key={epoch.id}
                onClick={() => setSelectedEpochId(epoch.id)}
                className={`relative px-4 py-3 rounded-2xl text-left transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-[#151D2A] text-white border-[#151D2A] shadow-md scale-102'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                <span className={`text-[10px] font-mono block ${isSelected ? 'text-[#D4AF37]' : 'text-stone-500'}`}>
                  Epoch {index + 1}
                </span>
                <span className="font-serif text-sm font-bold block truncate max-w-[170px]">
                  {epoch.name}
                </span>
                <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                  {epoch.timeRange}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Epoch Deep Dive Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Epoch Historical Overview */}
        <div className="lg:col-span-8 space-y-8 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <div className="space-y-3">
            <div className="inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#F7EFE6] text-[#936B38]">
              {selectedEpoch.timeRange}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {selectedEpoch.name}
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {selectedEpoch.description}
            </p>
          </div>

          {/* Architectural Style & Breakthroughs */}
          {selectedEpoch.architecturalStyle && (
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-xs font-semibold uppercase text-stone-400 block tracking-wider">
                Architectural &amp; Structural Idiom
              </span>
              <p className="text-stone-800 text-sm font-medium leading-relaxed">
                {selectedEpoch.architecturalStyle}
              </p>
            </div>
          )}

          {/* Civilizational Milestones Grid */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Civilizational Milestones &amp; Innovations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedEpoch.keyInnovations.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-white flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#F7EFE6] text-[#936B38] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prominent Thinkers & Rulers */}
          {selectedEpoch.prominentThinkers && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Prominent Historical Figures &amp; Guild Masters
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedEpoch.prominentThinkers.map((thinker, i) => (
                  <span key={i} className="text-xs px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-800 font-medium">
                    {thinker}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Connected Artifacts & Sites */}
        <div className="lg:col-span-4 space-y-6">
          {/* Archaeological Sites Card */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Primary Archaeological Sites
            </span>
            <div className="space-y-2">
              {selectedEpoch.primarySites.map((site, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                  <MapPin className="w-3.5 h-3.5 text-[#936B38] shrink-0" />
                  <span>{site}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link
                to="/map"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors"
              >
                <span>View Sites on Heritage Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Connected Artifact Records */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Connected Archival Records ({epochArtifacts.length})
            </span>
            {epochArtifacts.length > 0 ? (
              <div className="space-y-3">
                {epochArtifacts.map(artifact => (
                  <Link
                    key={artifact.id}
                    to={`/artifact/${artifact.id}`}
                    className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-stone-50 border border-stone-100 transition-colors group"
                  >
                    <img
                      src={artifact.imageUrl}
                      alt={artifact.title}
                      className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-[#936B38] block uppercase">
                        {artifact.category}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-stone-900 group-hover:text-[#A64B2A] transition-colors truncate">
                        {artifact.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">{artifact.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 italic">
                Additional accession records currently undergoing digitization in ASI conservation circles.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
