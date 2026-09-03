import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Compass, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  Share2, 
  ArrowRight,
  BookOpen,
  Info,
  Layers
} from 'lucide-react';
import { HERITAGE_ITEMS, LIVING_TRADITIONS, EPOCHS } from '../data/heritageData';
import { VerificationBadge } from '../components/VerificationBadge';
import { ArtifactViewer3D } from '../components/ArtifactViewer3D';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ErrorState } from '../components/ErrorState';
import { SaveButton } from '../components/SaveButton';

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
          { label: 'Collection', path: '/discover' },
          { label: item.category, path: `/discover?category=${item.category}` },
          { label: item.title }
        ]}
      />

      {/* Top Main Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Col: 360° Studio & Archival Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <ArtifactViewer3D item={item} />

          {/* Secondary Thumbnail Strip if available */}
          {item.secondaryImages && item.secondaryImages.length > 0 && (
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Archival Angles:
              </span>
              <div className="flex items-center gap-2">
                {item.secondaryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${item.title} angle ${idx + 1}`}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Curatorial Metadata Dossier */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
                {item.categoryLabel}
              </span>
              <div className="flex items-center gap-2">
                <SaveButton itemId={item.id} itemType="artifact" variant="pill" />
                <VerificationBadge status={item.verificationStatus} size="md" />
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {item.title}
            </h1>

            {item.nativeTitle && (
              <p className="text-base text-stone-500 italic font-serif">
                {item.nativeTitle}
              </p>
            )}
          </div>

          {/* Audio Guide Player Banner */}
          <div className="p-4 rounded-2xl bg-[#F7EFE6] border border-[#E7D6C0] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleAudio}
                className="w-10 h-10 rounded-full bg-[#151D2A] text-white flex items-center justify-center hover:bg-[#936B38] transition-colors shadow-xs"
                title={isPlayingAudio ? 'Stop narration' : 'Play curatorial audio guide'}
              >
                {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div>
                <span className="text-xs font-semibold text-stone-900 block">
                  Curatorial Audio Guide Narration
                </span>
                <span className="text-[11px] text-stone-500">
                  {item.audioNarrative?.duration || '1 min 45 sec'} • English / Web Speech
                </span>
              </div>
            </div>
            {isPlayingAudio && (
              <span className="text-xs font-semibold text-[#A64B2A] animate-pulse">
                Speaking…
              </span>
            )}
          </div>

          {/* Core Technical Specifications Table */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 divide-y divide-stone-100 text-xs shadow-2xs space-y-2">
            <div className="flex items-center justify-between py-1.5 first:pt-0">
              <span className="text-stone-500">Accession Number</span>
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
                <span className="text-stone-500">Dynasty</span>
                <span className="font-medium text-stone-900">{item.dynasty}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-1.5">
              <span className="text-stone-500">Origin Location</span>
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
              <span className="text-stone-500">Permanent Repository</span>
              <span className="font-medium text-stone-900 truncate max-w-[200px]" title={item.repository}>
                {item.repository}
              </span>
            </div>
          </div>

          {/* Ask AI Contextual Prompt */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Curatorial Research Inquiry
            </span>
            <p className="text-xs text-stone-600">
              Have questions about this specimen's iconometry, metallurgical alloy, or agamic ritual function?
            </p>
            <Link
              to={`/ai-guide`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#936B38] hover:text-[#7D5B2F] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Virasat AI about {item.title} &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Historical Context & Detailed Iconography Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 border-t border-stone-200">
        <div className="lg:col-span-8 space-y-8">
          {/* Curatorial Overview */}
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Curatorial Overview
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Historical Context */}
          {item.historicalContext && (
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Historical Context &amp; Commissioning
              </h3>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {item.historicalContext}
              </p>
            </div>
          )}

          {/* Cultural Significance & Canon */}
          {item.significance && item.significance.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Key Iconographic Attributes &amp; Agamic Canons
              </h3>
              <ul className="space-y-2.5">
                {item.significance.map((sig, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#936B38] mt-1.5 shrink-0" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Iconography List if present */}
          {item.iconographyDetails && item.iconographyDetails.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Visual Iconography Breakdown
              </h4>
              <ul className="space-y-2 text-xs text-stone-600">
                {item.iconographyDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-[#A64B2A]">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Col: Cross-Platform Connections */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cross-Link 1: Historical Timeline Epoch */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase">
              <Clock className="w-3.5 h-3.5 text-[#936B38]" />
              <span>Timeline Connection</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-stone-900">
              {relatedEpoch.name}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
              {relatedEpoch.description}
            </p>
            <Link
              to="/timeline"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#936B38] transition-colors"
            >
              <span>Explore {relatedEpoch.name} Era</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Cross-Link 2: Living Tradition Connection */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>Living Tradition Continuity</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-stone-900">
              {relatedTradition.title}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
              {relatedTradition.description}
            </p>
            <Link
              to="/living-traditions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#936B38] transition-colors"
            >
              <span>Visit Guild Profile</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Cross-Link 3: Geospatial Map Coordinates */}
          {item.coordinates && (
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A64B2A] uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>Geospatial Archive</span>
              </div>
              <p className="text-xs text-stone-700 font-medium">
                Located at {item.location} ({item.coordinates.lat.toFixed(4)}° N, {item.coordinates.lng.toFixed(4)}° E)
              </p>
              <Link
                to="/map"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#936B38] transition-colors"
              >
                <span>View on Geospatial Map</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}

          {/* Source Attribution & License */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              Primary Source Attribution
            </span>
            <p className="text-stone-700 font-medium">{item.source}</p>
            <p className="text-stone-500 text-[11px]">{item.attribution}</p>
            <div className="pt-2 flex items-center justify-between border-t border-stone-200 text-[11px]">
              <span className="text-stone-400">License: {item.license}</span>
              <Link to="/sources" className="text-[#936B38] hover:underline font-semibold">
                Sources &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Artifacts Carousel/Grid */}
      <div className="pt-10 border-t border-stone-200 space-y-6">
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Related Cultural Specimen
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArtifacts.map((other) => (
            <Link
              key={other.id}
              to={`/artifact/${other.id}`}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#936B38] transition-all group p-4 flex items-center gap-4"
            >
              <img
                src={other.imageUrl}
                alt={other.title}
                className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#936B38] uppercase font-bold">
                  {other.category}
                </span>
                <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#A64B2A] transition-colors leading-snug line-clamp-1">
                  {other.title}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-1">{other.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
