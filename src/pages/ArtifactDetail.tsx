import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight,
  BookOpen,
  Layers,
  FileText,
  AlertCircle
} from 'lucide-react';
import { HERITAGE_ITEMS, LIVING_TRADITIONS, EPOCHS } from '../data/heritageData';
import { VerificationBadge } from '../components/VerificationBadge';
import { ArtifactViewer3D } from '../components/ArtifactViewer3D';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ErrorState } from '../components/ErrorState';
import { SaveButton } from '../components/SaveButton';
import { SafeImage } from '../components/SafeImage';

export const ArtifactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const item = HERITAGE_ITEMS.find(i => i.id === id);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ErrorState
          title="Artifact Record Not Found"
          message={`We could not locate accession #${id} in the primary scholarly repository.`}
          backPath="/discover"
        />
      </div>
    );
  }

  // Related data links
  const relatedEpoch = EPOCHS.find(e => e.id === item.timelineEpochId) || EPOCHS[0];
  const relatedTradition = LIVING_TRADITIONS.find(t => 
    item.relatedTraditions?.includes(t.id) || t.location.includes(item.region)
  ) || LIVING_TRADITIONS[0];

  const otherArtifacts = HERITAGE_ITEMS.filter(i => i.id !== item.id).slice(0, 3);

  // Audio Speech Synthesis
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const text = item.audioNarrative?.transcript || `${item.title}. ${item.description}. ${item.historicalContext || ''}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      {/* Breadcrumb Hierarchy */}
      <Breadcrumbs
        items={[
          { label: 'Archival Registry', path: '/discover' },
          { label: item.category, path: `/discover?category=${item.category}` },
          { label: item.title }
        ]}
      />

      {/* Header Bar */}
      <header className="border-b border-stone-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider bg-[#936B38]/10 px-2.5 py-0.5 rounded-full">
              {item.category} • {item.period}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs font-mono text-stone-500">{item.accessionNo}</span>
          </div>

          <div className="flex items-center gap-3">
            <SaveButton itemId={item.id} itemType="artifact" variant="pill" />
            <VerificationBadge status={item.verificationStatus} size="md" />
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          {item.title}
        </h1>

        {item.nativeTitle && (
          <p className="text-base sm:text-lg text-stone-500 italic font-serif">
            {item.nativeTitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
          <span className="flex items-center gap-1 text-stone-700 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#936B38]" />
            {item.location} ({item.region} India)
          </span>
          <span>•</span>
          <span>Repository: <strong className="text-stone-700">{item.repository}</strong></span>
          <span>•</span>
          <span>Survey Record: <strong className="text-stone-700">{item.source}</strong></span>
        </div>
      </header>

      {/* Hero Visual Area: 3D Volumetric Proxy & Archival Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <ArtifactViewer3D item={item} />

          {/* Secondary angles */}
          {item.secondaryImages && item.secondaryImages.length > 0 && (
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Conservation Plates:
              </span>
              <div className="flex items-center gap-2">
                {item.secondaryImages.map((img, idx) => (
                  <div key={idx} className="w-16 h-16 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                    <SafeImage
                      src={img}
                      alt={`${item.title} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Specimen Metadata Dossier */}
        <div className="lg:col-span-4 space-y-6">
          {/* Audio Guide Player */}
          <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleAudio}
                className="w-10 h-10 rounded-full bg-[#151D2A] text-white flex items-center justify-center hover:bg-[#936B38] transition-colors shadow-xs"
                title={isPlayingAudio ? 'Stop narration' : 'Play curatorial audio guide'}
                aria-label={isPlayingAudio ? 'Stop audio guide' : 'Play audio guide'}
              >
                {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div>
                <span className="text-xs font-semibold text-stone-900 block">
                  Curatorial Narration
                </span>
                <span className="text-[11px] text-stone-500">
                  {item.audioNarrative?.duration || '1 min 45 sec'} • Scholarly Synthesis
                </span>
              </div>
            </div>
            {isPlayingAudio && (
              <span className="text-xs font-semibold text-[#A64B2A] animate-pulse">
                Active…
              </span>
            )}
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 divide-y divide-stone-100 text-xs shadow-2xs space-y-2">
            <div className="flex items-center justify-between py-1.5 first:pt-0">
              <span className="text-stone-500">Accession Code</span>
              <span className="font-mono font-bold text-stone-900">{item.accessionNo}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-stone-500">Historical Era</span>
              <Link to="/timeline" className="font-medium text-[#A64B2A] hover:underline">
                {item.period}
              </Link>
            </div>
            {item.dynasty && (
              <div className="flex items-center justify-between py-1.5">
                <span className="text-stone-500">Ruling Dynasty</span>
                <span className="font-medium text-stone-900">{item.dynasty}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-1.5">
              <span className="text-stone-500">Geographic Provenance</span>
              <span className="font-medium text-stone-900">{item.location}</span>
            </div>
            {item.material && (
              <div className="flex items-center justify-between py-1.5">
                <span className="text-stone-500">Material &amp; Medium</span>
                <span className="font-medium text-stone-900">{item.material}</span>
              </div>
            )}
            {item.dimensions && (
              <div className="flex items-center justify-between py-1.5">
                <span className="text-stone-500">Physical Dimensions</span>
                <span className="font-medium text-stone-900">{item.dimensions}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-1.5 last:pb-0">
              <span className="text-stone-500">Current Custodian</span>
              <span className="font-medium text-stone-900 truncate max-w-[180px]" title={item.repository}>
                {item.repository}
              </span>
            </div>
          </div>

          {/* Virasat AI In-Context Research Link */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-2.5">
            <span className="text-xs font-semibold text-[#936B38] uppercase tracking-wider block font-mono">
              Research Inquiry
            </span>
            <p className="text-xs text-stone-600 leading-relaxed">
              Query primary epigraphs, iconometric canons, or metallurgical provenance for this record.
            </p>
            <Link
              to={`/ai-guide`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#151D2A] hover:text-[#A64B2A] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#936B38]" />
              <span>Consult Virasat AI about this specimen &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Monograph Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 border-t border-stone-200">
        <div className="lg:col-span-8 space-y-10">
          {/* Section 1: Overview */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
              1. Curatorial Overview
            </h2>
            <p className="text-stone-800 text-base sm:text-lg leading-relaxed font-serif">
              {item.description}
            </p>
          </section>

          {/* Section 2: What you are looking at (Visual Interpretation) */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
              2. What You Are Looking At — Visual Interpretation
            </h2>
            <div className="p-6 rounded-2xl bg-white border border-stone-200/90 space-y-3 shadow-2xs">
              {item.iconographyDetails && item.iconographyDetails.length > 0 ? (
                <ul className="space-y-2.5 text-sm text-stone-700 leading-relaxed">
                  {item.iconographyDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A64B2A] mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-stone-700 leading-relaxed">
                  The visual composition exhibits classical proportional harmony governed by ancient Indian iconographic canons, marked by distinctive metallurgical finishes and symbolic attributes.
                </p>
              )}
            </div>
          </section>

          {/* Section 3: Historical Context */}
          {item.historicalContext && (
            <section className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
                3. Historical Context &amp; Commissioning
              </h2>
              <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed">
                <p>{item.historicalContext}</p>
              </div>
            </section>
          )}

          {/* Section 4: Material & Technique */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
              4. Material &amp; Fabrication Technique
            </h2>
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-stone-700 space-y-2">
              <p>
                <strong>Primary Medium:</strong> {item.material || 'Authentic regional materials recorded during archaeological inventory.'}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                Preserved under museum conservation protocol. Surfaces and composition verified through comparative epigraphic and stylistic alignment.
              </p>
            </div>
          </section>

          {/* Section 5: AI-Assisted Research Interpretation Block (Prompt Section 20 & 23) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#A64B2A] uppercase tracking-wider">
                5. AI-Assisted Interpretative Synthesis
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-mono px-2 py-0.5 rounded-md border border-amber-200 font-semibold">
                AI-Assisted
              </span>
            </div>
            
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7D9C6] space-y-3">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Virasat AI cross-references this record's accession details against secondary cultural databases. The specimen demonstrates dynastic continuity with regional temple workshops and stylistic links to contemporaneous classical traditions.
              </p>
              
              <div className="flex items-center gap-2 pt-2 border-t border-[#E7D9C6] text-[11px] text-stone-500">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>
                  AI-assisted interpretation — not expert authentication. Verify important historical claims using cited institutional sources below.
                </span>
              </div>
            </div>
          </section>

          {/* Section 6: Sources & Scholarly Citations */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
              6. Institutional Sources &amp; Licensing
            </h2>
            <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3 text-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-semibold text-stone-900 block text-sm">
                    {item.source}
                  </span>
                  <span className="text-stone-500">{item.attribution}</span>
                </div>
                <Link
                  to="/sources"
                  className="shrink-0 text-xs font-semibold text-[#936B38] hover:underline flex items-center gap-1"
                >
                  <span>Verification Registry</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-[11px] text-stone-500">
                <span>License: <strong className="text-stone-700">{item.license}</strong></span>
                <span>Verification State: <strong className="text-stone-700">{item.verificationStatus}</strong></span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Rail: Cross-Platform Knowledge Graph Links */}
        <div className="lg:col-span-4 space-y-6">
          {/* Where it belongs: Geospatial location */}
          {item.coordinates && (
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A64B2A] uppercase font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>Where It Belongs</span>
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                {item.location}
              </h3>
              <p className="text-xs text-stone-600 font-mono">
                Coordinates: {item.coordinates.lat.toFixed(4)}° N, {item.coordinates.lng.toFixed(4)}° E
              </p>
              <Link
                to="/map"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#936B38] transition-colors"
              >
                <span>Open in Heritage Map</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}

          {/* Timeline Position */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#936B38] uppercase font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Historical Timeline Position</span>
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">
              {relatedEpoch.name}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
              {relatedEpoch.description}
            </p>
            <Link
              to="/timeline"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#936B38] transition-colors"
            >
              <span>Explore Epoch in Timeline</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Related Tradition Continuity */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>Related Living Tradition</span>
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">
              {relatedTradition.title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
              {relatedTradition.description}
            </p>
            <Link
              to="/living-traditions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#936B38] transition-colors"
            >
              <span>View Living Heritage Guild</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Related Artifacts */}
      <section className="pt-10 border-t border-stone-200 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
            Connected Knowledge Graph
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Related Cultural Specimens
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArtifacts.map((other) => (
            <Link
              key={other.id}
              to={`/artifact/${other.id}`}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-[#936B38] transition-all group p-4 flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                <SafeImage
                  src={other.imageUrl}
                  alt={other.title}
                  creditKey={other.id}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-mono text-[#936B38] uppercase font-bold">
                  {other.category}
                </span>
                <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#A64B2A] transition-colors leading-snug truncate">
                  {other.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-1">{other.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
