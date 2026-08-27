'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Compass, Volume2, VolumeX, Play, Pause, Bookmark,
  Clock, MapPin, Sparkles, ArrowRight, Share2, Shield,
  Layers, Check, Bot, Send
} from 'lucide-react';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import ArtifactViewer3D from '@/components/artifact/ArtifactViewer3D';
import { speechService } from '@/services/speechService';
import { aiService } from '@/services/aiService';

export default function ArtifactDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const artifact = ARTIFACTS_DATA.find(a => a.id === id) || ARTIFACTS_DATA[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'context' | 'significance' | 'iconography'>('overview');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'assistant'; text: string; source?: string }[]>([
    {
      sender: 'assistant',
      text: `Greetings! I am your Virasat AI Curatorial Assistant for "${artifact.title}". You can ask me about its lost-wax metallurgy, dynastic lineage, iconographic mudras, or historical discovery.`,
      source: artifact.currentLocation
    }
  ]);

  if (!artifact) {
    return notFound();
  }

  const toggleAudio = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
    } else {
      if (artifact.audioNarrative?.transcript) {
        setIsPlayingAudio(true);
        speechService.speak(artifact.audioNarrative.transcript, {
          onEnd: () => setIsPlayingAudio(false),
          onError: () => setIsPlayingAudio(false)
        });
      }
    }
  };

  const handleAskAI = async (text: string) => {
    const q = text.trim();
    if (!q) return;
    setAiLoading(true);
    setAiQuery('');

    const newMsgs = [...aiMessages, { sender: 'user' as const, text: q }];
    setAiMessages(newMsgs);

    try {
      const resp = await aiService.askHeritageQuestion(q, artifact.id);
      setAiMessages([...newMsgs, { sender: 'assistant', text: resp.message, source: resp.verifiedSource }]);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const relatedArtifacts = ARTIFACTS_DATA.filter(
    a => a.id !== artifact.id && (a.period === artifact.period || a.category === artifact.category)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#332E27] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#A89F91] font-mono">
            <Link href="/" className="hover:text-[#FAF7F0]">Museum</Link>
            <span>/</span>
            <Link href="/explore" className="hover:text-[#FAF7F0]">Collections</Link>
            <span>/</span>
            <span className="text-[#E6CD92]">{artifact.category}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Save Curation Button */}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif-display uppercase tracking-wider border transition-all ${
                isSaved
                  ? 'bg-[#BE4D2A] text-white border-[#BE4D2A]'
                  : 'bg-[#26231E] text-[#D8CFBF] border-[#38332C] hover:border-[#C5A059]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Curated' : 'Save'}</span>
            </button>

            {/* Ask AI Toggle */}
            <button
              onClick={() => setAiChatOpen(!aiChatOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif-display uppercase tracking-wider bg-[#C5A059] text-[#1C1A17] font-bold shadow-md hover:brightness-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Artifact Showcase Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: 3D Archival Stage */}
          <div className="lg:col-span-7 space-y-6">
            <ArtifactViewer3D artifact={artifact} />

            {/* Audio Guide Narration Player */}
            {artifact.audioNarrative && (
              <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleAudio}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isPlayingAudio
                        ? 'bg-[#BE4D2A] text-white shadow-lg scale-105 animate-pulse'
                        : 'bg-[#1C1A17] text-[#E6CD92] hover:bg-[#BE4D2A] hover:text-white shadow-md'
                    }`}
                    aria-label="Toggle Audio Guide"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <div>
                    <h4 className="font-serif-display text-base font-bold text-[#1C1A17]">
                      {artifact.audioNarrative.title}
                    </h4>
                    <p className="text-xs text-[#8C8275]">
                      Official Audio Guide • {artifact.audioNarrative.duration} • Indian Voice Synth
                    </p>
                  </div>
                </div>

                {isPlayingAudio && (
                  <div className="flex items-center gap-1">
                    {[40, 80, 50, 100, 60, 90, 45, 75].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-[#BE4D2A] rounded-full animate-pulse"
                        style={{ height: `${h * 0.25}px`, animationDelay: `${i * 90}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Metadata & Curatorial Dossier */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Titles */}
            <div className="space-y-2 border-b border-[#E2DAC9] pb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#BE4D2A] bg-[#F4EFE2] px-2.5 py-0.5 rounded">
                  {artifact.category}
                </span>
                <span className="text-xs font-mono text-[#8C8275]">
                  {artifact.region} India
                </span>
              </div>

              <h1 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1A17] leading-tight">
                {artifact.title}
              </h1>

              {artifact.nativeTitle && (
                <p className="text-sm font-serif-display text-[#BE4D2A] italic">
                  {artifact.nativeTitle}
                </p>
              )}
            </div>

            {/* Key Metadata Table */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-sm text-xs">
              <div>
                <p className="text-[#8C8275] uppercase font-bold tracking-wider">Historical Epoch</p>
                <p className="font-serif-display text-sm font-bold text-[#1C1A17] mt-0.5">{artifact.period}</p>
                <p className="text-[#8C8275] font-mono text-[11px]">{artifact.dateRange}</p>
              </div>

              <div>
                <p className="text-[#8C8275] uppercase font-bold tracking-wider">Dynastic Lineage</p>
                <p className="font-serif-display text-sm font-bold text-[#1C1A17] mt-0.5">{artifact.dynasty}</p>
              </div>

              <div>
                <p className="text-[#8C8275] uppercase font-bold tracking-wider">Material & Alloy</p>
                <p className="text-sm font-medium text-[#1C1A17] mt-0.5">{artifact.material}</p>
              </div>

              <div>
                <p className="text-[#8C8275] uppercase font-bold tracking-wider">Current Repository</p>
                <p className="text-sm font-medium text-[#1C1A17] mt-0.5">{artifact.currentLocation}</p>
              </div>
            </div>

            {/* Quick Action Navigation Links */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href={`/timeline?epoch=${artifact.timelineEpochId || 'indus-valley'}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#F4EFE2] hover:bg-[#EAE2D2] border border-[#E2DAC9] text-xs font-serif-display uppercase font-bold tracking-wider text-[#1C1A17] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#BE4D2A]" />
                  <span>In Timeline</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C8275]" />
              </Link>

              <Link
                href={`/map?site=${artifact.heritageMapLocationId || 'brihadisvara-thanjavur'}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#F4EFE2] hover:bg-[#EAE2D2] border border-[#E2DAC9] text-xs font-serif-display uppercase font-bold tracking-wider text-[#1C1A17] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#10B981]" />
                  <span>On Heritage Map</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C8275]" />
              </Link>
            </div>

            {/* Tabbed Dossier Sections */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center border-b border-[#E2DAC9] text-xs font-serif-display uppercase font-bold tracking-wider">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'context', label: 'Historical Context' },
                  { id: 'significance', label: 'Cultural Significance' },
                  { id: 'iconography', label: 'Iconography' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 px-3 transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-[#BE4D2A] border-b-2 border-[#BE4D2A]'
                        : 'text-[#8C8275] hover:text-[#1C1A17]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="text-sm text-[#3D3934] leading-relaxed p-4 rounded-xl bg-[#FFFDF9] border border-[#E2DAC9]">
                {activeTab === 'overview' && (
                  <p>{artifact.overview}</p>
                )}
                {activeTab === 'context' && (
                  <p>{artifact.historicalContext}</p>
                )}
                {activeTab === 'significance' && (
                  <p>{artifact.culturalSignificance}</p>
                )}
                {activeTab === 'iconography' && (
                  <div className="space-y-2">
                    {artifact.iconographyDetails ? (
                      artifact.iconographyDetails.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#BE4D2A] mt-1.5 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))
                    ) : (
                      <p>Standard iconography conforming to canonical Shilpa Shastras.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Guide Interactive Side Drawer / Modal if toggled */}
        {aiChatOpen && (
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#1C1A17] text-[#FAF7F0] border border-[#C5A059]/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#332E27] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#BE4D2A] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-bold text-[#FAF7F0]">
                    AI Curatorial Assistant — {artifact.title}
                  </h3>
                  <p className="text-xs text-[#A89F91]">
                    Ask deep questions regarding metallurgy, iconography, and dynastic history.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAiChatOpen(false)}
                className="text-xs font-mono uppercase bg-[#26231E] text-[#D8CFBF] px-3 py-1 rounded"
              >
                Close
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#BE4D2A] text-white rounded-tr-none'
                        : 'bg-[#26231E] text-[#ECE6DA] border border-[#38332C] rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                    {msg.source && (
                      <p className="text-[10px] text-[#A89F91] mt-2 border-t border-[#38332C]/60 pt-1">
                        Verified Source: {msg.source}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="flex items-center gap-2 text-xs text-[#E6CD92] p-3 bg-[#26231E] rounded-xl w-fit">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Consulting museum archives...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={aiQuery}
                onChange={e => setAiQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAskAI(aiQuery)}
                placeholder={`Ask anything about ${artifact.title}...`}
                className="flex-1 bg-[#141311] border border-[#38332C] focus:border-[#C5A059] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#FAF7F0] focus:outline-none"
              />
              <button
                onClick={() => handleAskAI(aiQuery)}
                disabled={aiLoading || !aiQuery.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#BE4D2A] hover:bg-[#98381A] disabled:opacity-50 text-white font-serif-display text-xs uppercase font-bold"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Related Artifacts Carousel */}
        {relatedArtifacts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E2DAC9]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#1C1A17]">
                  Related Museum Masterpieces
                </h3>
                <p className="font-serif-editorial text-sm text-[#5C554B]">
                  From the same {artifact.period} or {artifact.category} tradition.
                </p>
              </div>
              <Link href="/explore" className="text-xs font-serif-display uppercase font-bold text-[#BE4D2A] hover:underline">
                Explore All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArtifacts.map(rel => (
                <Link
                  key={rel.id}
                  href={`/artifact/${rel.id}`}
                  className="group rounded-2xl overflow-hidden bg-[#FFFDF9] border border-[#E2DAC9] hover:border-[#C5A059] shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-stone-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#1C1A17]/80 text-[#E6CD92]">
                      {rel.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-display text-base font-bold text-[#1C1A17] group-hover:text-[#BE4D2A] transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#8C8275] mt-1">
                        {rel.period} • {rel.location}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[#E2DAC9]/60 flex items-center justify-between text-xs font-semibold text-[#BE4D2A]">
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
