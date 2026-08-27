'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Compass, Volume2, Play, Pause, Bookmark,
  Clock, MapPin, Sparkles, ArrowRight, ShieldCheck,
  Layers, Bot, Send, Info, Eye, CheckCircle2, HelpCircle
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
      text: `Greetings! I am the Virasat AI Assistant for "${artifact.title}". You can ask about its historical discovery, metallurgical casting, dynastic lineage, or iconographic symbolism.`,
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
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <Link href="/" className="hover:text-[#1C1917]">Museum</Link>
            <span>/</span>
            <Link href="/explore" className="hover:text-[#1C1917]">Collections</Link>
            <span>/</span>
            <span className="text-[#9A3412] font-medium">{artifact.category}</span>
            <span>/</span>
            <span className="text-[#1C1917] truncate max-w-[200px]">{artifact.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold border transition-all ${
                isSaved
                  ? 'bg-[#9A3412] text-white border-[#9A3412]'
                  : 'bg-[#FFFFFF] text-[#44403C] border-[#E7E1D4] hover:border-[#9A3412]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved to Curation' : 'Save Artifact'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Top Artifact Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: 3D Archival Inspection Studio */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm p-4">
              <ArtifactViewer3D artifact={artifact} />
            </div>

            {/* Simple Inline Audio Guide Player */}
            {artifact.audioNarrative && (
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAudio}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isPlayingAudio
                        ? 'bg-[#9A3412] text-white shadow animate-pulse'
                        : 'bg-[#1C1917] text-white hover:bg-[#9A3412]'
                    }`}
                    aria-label="Toggle Audio Plaque"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917]">
                      {isPlayingAudio ? 'Audio Plaque Active...' : '▶ Listen to Curatorial Description'}
                    </h4>
                    <p className="text-[11px] text-[#78716C]">
                      Duration: {artifact.audioNarrative.duration} • Voice Synthesis (Indian English)
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

          {/* Right Column: Title & Quick Dossier Metadata */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium uppercase bg-[#F4EFE6] text-[#9A3412] border border-[#E7E1D4]">
                  {artifact.category}
                </span>
                <span className="text-xs text-[#78716C] font-mono">
                  Accession #{artifact.id.slice(0, 8).toUpperCase()}
                </span>
              </div>

              <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917] leading-tight">
                {artifact.title}
              </h1>

              {artifact.nativeTitle && (
                <p className="text-sm font-serif-display text-[#78716C] italic">
                  {artifact.nativeTitle}
                </p>
              )}
            </div>

            {/* Quick Information Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#F4EFE6] border border-[#E7E1D4] text-xs">
              <div>
                <span className="text-[#78716C] block">Historical Period</span>
                <strong className="text-[#1C1917] font-medium">{artifact.period}</strong>
              </div>
              <div>
                <span className="text-[#78716C] block">Dynasty</span>
                <strong className="text-[#1C1917] font-medium">{artifact.dynasty}</strong>
              </div>
              <div>
                <span className="text-[#78716C] block">Material</span>
                <strong className="text-[#1C1917] font-medium">{artifact.material}</strong>
              </div>
              <div>
                <span className="text-[#78716C] block">Dimensions</span>
                <strong className="text-[#1C1917] font-medium">{artifact.dimensions}</strong>
              </div>
              <div>
                <span className="text-[#78716C] block">Origin Location</span>
                <strong className="text-[#1C1917] font-medium">{artifact.location}, {artifact.state}</strong>
              </div>
              <div>
                <span className="text-[#78716C] block">Current Repository</span>
                <strong className="text-[#1C1917] font-medium">{artifact.currentLocation}</strong>
              </div>
            </div>

            {/* Ask AI Trigger Button */}
            <button
              onClick={() => setAiChatOpen(!aiChatOpen)}
              className="w-full py-3 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#FBF9F4] text-[#1C1917] border border-[#E7E1D4] hover:border-[#9A3412] text-xs font-sans font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-[#9A3412]" />
              <span>{aiChatOpen ? 'Close AI Curatorial Assistant' : 'Ask AI Curatorial Assistant about this Artifact'}</span>
            </button>

            {/* Contextual AI Assistant Panel */}
            {aiChatOpen && (
              <div className="rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] p-4 shadow-sm space-y-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="max-h-56 overflow-y-auto space-y-2.5 text-xs">
                  {aiMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#F4EFE6] text-[#1C1917] ml-6'
                          : 'bg-[#FBF9F4] border border-[#E7E1D4] text-[#1C1917] mr-2'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.source && (
                        <span className="text-[10px] text-[#78716C] block mt-1">
                          Source: {msg.source}
                        </span>
                      )}
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="text-xs text-[#9A3412] p-2 animate-pulse">
                      Analyzing museum records...
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-[#E7E1D4]">
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={e => setAiQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAskAI(aiQuery)}
                    placeholder={`Ask about ${artifact.title}...`}
                    className="flex-1 bg-[#FBF9F4] border border-[#E7E1D4] rounded-lg px-3 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                  />
                  <button
                    onClick={() => handleAskAI(aiQuery)}
                    disabled={aiLoading || !aiQuery.trim()}
                    className="p-2 rounded-lg bg-[#9A3412] text-white hover:bg-[#7C2D12] disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Curatorial Deep Dive Tabs & Information Demarcation */}
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] p-6 sm:p-8 shadow-sm space-y-8">
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-[#E7E1D4] pb-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'About the Artifact' },
              { id: 'context', label: 'Historical Context' },
              { id: 'significance', label: 'Cultural Significance' },
              { id: 'iconography', label: 'Iconography & Mudras' }
            ].map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-sans font-semibold transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#9A3412] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4EFE6]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="space-y-6 text-sm text-[#44403C] leading-relaxed">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
                  Curatorial Overview
                </h3>
                <p>{artifact.overview}</p>
                <div className="p-4 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#1C1917]">
                    Accession & Discovery Dossier
                  </h4>
                  <p className="text-xs text-[#57534E]">
                    Preserved under the custody of <strong>{artifact.currentLocation}</strong>. Catalogued and photographed for national digital preservation under the SIH 2026 Heritage & Culture initiative.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'context' && (
              <div className="space-y-4">
                <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
                  Historical Context & Era
                </h3>
                <p>{artifact.historicalContext}</p>
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    href={`/timeline?epoch=${artifact.period.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#9A3412] hover:underline"
                  >
                    <span>View this period on the History Timeline →</span>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'significance' && (
              <div className="space-y-4">
                <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
                  Cultural & Philosophical Significance
                </h3>
                <p>{artifact.culturalSignificance}</p>
              </div>
            )}

            {activeTab === 'iconography' && (
              <div className="space-y-4">
                <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
                  Iconographical Details & Motifs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {artifact.iconographyDetails.map((detail, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9A3412]" />
                        <span className="text-xs font-bold text-[#1C1917]">Symbolic Element</span>
                      </div>
                      <p className="text-xs text-[#57534E] leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Transparent Demarcation: Verified Information vs AI Interpretation */}
          <div className="pt-6 border-t border-[#E7E1D4] grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Verified Historical Information */}
            <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E7E1D4] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#15803D] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Historical Information</span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Dimensions, materials, dynastic records, and accession data are verified against published institutional archives of the <strong>{artifact.currentLocation}</strong> and the <strong>Archaeological Survey of India (ASI)</strong>.
              </p>
            </div>

            {/* AI Curatorial Interpretation */}
            <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E7E1D4] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B45309] uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>AI Curatorial Interpretation</span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Interactive dialogue and iconography query synthesis are generated by the Virasat AI assistant for educational accessibility. Interpretations reflect curatorial scholarship.
              </p>
            </div>
          </div>

        </div>

        {/* Related Museum Artifacts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1917]">
              Related Curated Artifacts
            </h2>
            <Link href="/explore" className="text-xs font-sans font-semibold text-[#9A3412] hover:underline">
              View All Collections →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArtifacts.map(rel => (
              <Link
                key={rel.id}
                href={`/artifact/${rel.id}`}
                className="group rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] hover:border-[#9A3412]/50 shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rel.imageUrl}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-white/90 text-[#1C1917] shadow-sm">
                    {rel.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-serif-display text-base font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors line-clamp-1">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#78716C]">
                    {rel.period} • {rel.location}, {rel.state}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
