'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, Send, Mic, MicOff, Volume2, Bot, User,
  ShieldCheck, HelpCircle, ArrowRight, Camera, RefreshCw, Layers
} from 'lucide-react';
import { aiService } from '@/services/aiService';
import { speechService } from '@/services/speechService';
import { ARTIFACTS_DATA } from '@/data/artifactsData';

export default function AIGuidePage() {
  const [activeTab, setActiveTab] = useState<'conversational' | 'vision'>('conversational');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{
    sender: 'user' | 'assistant';
    text: string;
    source?: string;
    relatedArtifactId?: string;
    followUps?: string[];
  }>>([
    {
      sender: 'assistant',
      text: `Welcome to the Virasat AI Heritage Research Guide. 

You can ask me questions regarding Indian archaeology, lost-wax bronze casting, temple architectural mathematics, ancient manuscripts, or regional craft traditions.

What aspect of Indian heritage would you like to explore today?`,
      source: 'Virasat AI Curated Prototype Collection',
      followUps: [
        'What is the significance of Nataraja?',
        'How was the Kailasa Temple constructed?',
        'Tell me about the Indus Valley Civilization.'
      ]
    }
  ]);

  const [selectedVisionArtifact, setSelectedVisionArtifact] = useState(ARTIFACTS_DATA[0]);
  const [visionAnalysis, setVisionAnalysis] = useState<any>(null);
  const [isAnalyzingVision, setIsAnalyzingVision] = useState(false);

  const promptSuggestions = [
    'What is the significance of Nataraja?',
    'How was the Kailasa Temple constructed?',
    'Tell me about the Indus Valley Civilization.',
    'Explain the Lion Capital of Ashoka.',
    'Plan a responsible heritage trip to Hampi.'
  ];

  const handleSendMessage = async (textToSend: string) => {
    const q = textToSend.trim();
    if (!q) return;

    const userMsg = { sender: 'user' as const, text: q };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await aiService.askHeritageQuestion(q);
      const assistantMsg = {
        sender: 'assistant' as const,
        text: response.message,
        source: response.verifiedSource,
        relatedArtifactId: response.relatedArtifactId,
        followUps: response.suggestedFollowUps
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechService.startListening(
        (transcript: string) => {
          setIsListening(false);
          handleSendMessage(transcript);
        },
        () => setIsListening(false)
      );
    }
  };

  const handleVisionAnalysis = (art: typeof ARTIFACTS_DATA[0]) => {
    setSelectedVisionArtifact(art);
    setIsAnalyzingVision(true);
    setTimeout(() => {
      const result = aiService.analyzeIconography(art.imageUrl);
      setVisionAnalysis(result);
      setIsAnalyzingVision(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Page Header Banner */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#78716C] text-xs font-sans font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>AI Research Assistant</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            AI Heritage Guide
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E]">
            “Ask about India’s art, architecture, manuscripts and traditions.”
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Mode Switcher */}
        <div className="flex items-center gap-2 border-b border-[#E7E1D4] pb-3">
          <button
            onClick={() => setActiveTab('conversational')}
            className={`px-4 py-2 rounded-lg text-xs font-sans font-semibold transition-all ${
              activeTab === 'conversational'
                ? 'bg-[#9A3412] text-white shadow-sm'
                : 'text-[#44403C] hover:bg-[#F4EFE6]'
            }`}
          >
            Research Assistant
          </button>
          <button
            onClick={() => {
              setActiveTab('vision');
              if (!visionAnalysis) handleVisionAnalysis(selectedVisionArtifact);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-sans font-semibold transition-all ${
              activeTab === 'vision'
                ? 'bg-[#9A3412] text-white shadow-sm'
                : 'text-[#44403C] hover:bg-[#F4EFE6]'
            }`}
          >
            Visual Iconography Identifier
          </button>
        </div>

        {/* Tab 1: Conversational Assistant */}
        {activeTab === 'conversational' && (
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm overflow-hidden flex flex-col">
            
            {/* Chat Messages */}
            <div className="p-6 space-y-6 min-h-[420px] max-h-[560px] overflow-y-auto bg-[#FFFFFF]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-[#9A3412] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-[#F4EFE6] text-[#1C1917] rounded-tr-none'
                          : 'bg-[#FBF9F4] text-[#1C1917] border border-[#E7E1D4] rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Sources */}
                    {msg.source && (
                      <div className="p-2.5 rounded-lg bg-[#FAF7F0] border border-[#E7E1D4] text-[11px] text-[#57534E] flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                        <span><strong>Source:</strong> {msg.source}</span>
                      </div>
                    )}

                    {/* Related Artifact */}
                    {msg.relatedArtifactId && (
                      <div className="text-xs">
                        <Link
                          href={`/artifact/${msg.relatedArtifactId}`}
                          className="font-sans font-semibold text-[#9A3412] hover:underline"
                        >
                          View Related Artifact in Collection →
                        </Link>
                      </div>
                    )}

                    {/* Follow-up chips */}
                    {msg.followUps && msg.followUps.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        <span className="text-[10px] text-[#78716C] font-bold uppercase block w-full">
                          Follow-up inquiries:
                        </span>
                        {msg.followUps.map((fu, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(fu)}
                            className="text-[11px] px-3 py-1 rounded-full bg-[#F4EFE6] hover:bg-[#9A3412] hover:text-white text-[#44403C] transition-colors border border-[#E7E1D4]"
                          >
                            {fu}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#E7E1D4] text-[#78716C] flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3 text-xs text-[#9A3412]">
                  <div className="w-8 h-8 rounded-full bg-[#9A3412] text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span>Consulting museum archives & Archaeological Survey records...</span>
                </div>
              )}
            </div>

            {/* Suggestion Chips */}
            <div className="px-5 py-2.5 bg-[#FAF7F0] border-t border-[#E7E1D4] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-[#78716C] shrink-0">
                Try:
              </span>
              {promptSuggestions.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="text-[11px] px-3 py-1 rounded-full bg-[#FFFFFF] hover:bg-[#9A3412] text-[#44403C] hover:text-white border border-[#E7E1D4] shrink-0 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-[#FFFFFF] border-t border-[#E7E1D4] flex items-center gap-2">
              <button
                onClick={toggleVoiceInput}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isListening
                    ? 'bg-[#9A3412] text-white animate-pulse'
                    : 'bg-[#FBF9F4] text-[#78716C] border-[#E7E1D4] hover:text-[#1C1917]'
                }`}
                title="Voice Input (English/Hindi)"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage(query)}
                placeholder="Ask about Indian heritage, monuments, manuscripts..."
                disabled={isLoading}
                className="flex-1 bg-[#FBF9F4] border border-[#E7E1D4] focus:border-[#9A3412] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1C1917] focus:outline-none placeholder-[#78716C]"
              />

              <button
                onClick={() => handleSendMessage(query)}
                disabled={isLoading || !query.trim()}
                className="p-2.5 rounded-xl bg-[#9A3412] hover:bg-[#7C2D12] text-white disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Visual Iconography Identifier */}
        {activeTab === 'vision' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm space-y-6">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
                Visual Iconography Identifier
              </h3>
              <p className="text-xs text-[#57534E] mt-1">
                Select an artifact photograph to inspect dynastic iconographic motifs and stylistic attributes.
              </p>
            </div>

            {/* Artifact Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ARTIFACTS_DATA.slice(0, 4).map(art => (
                <button
                  key={art.id}
                  onClick={() => handleVisionAnalysis(art)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    selectedVisionArtifact.id === art.id
                      ? 'bg-[#F4EFE6] border-[#9A3412] ring-1 ring-[#9A3412]/30'
                      : 'bg-[#FBF9F4] border-[#E7E1D4] hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="h-24 rounded-lg overflow-hidden bg-stone-100 mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[11px] font-bold text-[#1C1917] truncate">{art.title}</p>
                </button>
              ))}
            </div>

            {/* Analysis Output Box */}
            {visionAnalysis && (
              <div className="p-5 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E7E1D4] pb-3">
                  <span className="text-xs font-bold text-[#1C1917] uppercase">
                    Identified Dynasty: {visionAnalysis.identifiedDynasty}
                  </span>
                  <span className="text-xs text-[#15803D] font-mono font-bold">
                    Confidence: {(visionAnalysis.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#44403C]">
                  <div>
                    <strong className="text-[#1C1917]">Stylistic Era:</strong> {visionAnalysis.historicalPeriod}
                  </div>
                  <div>
                    <strong className="text-[#1C1917]">Key Motifs Identified:</strong> {visionAnalysis.detectedMotifs.join(' • ')}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#E7E1D4] text-[11px] text-[#57534E]">
                  <strong className="text-[#1C1917]">Educational Disclaimer:</strong> Visual iconography identifier is an AI analysis tool for educational study and does not replace peer-reviewed archaeological dating.
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
