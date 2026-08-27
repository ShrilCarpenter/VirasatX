'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, Bot, User, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { aiService, AIResponse } from '@/services/aiService';

export default function AIAssistantTeaser() {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{
    user: string;
    ai: string;
    source?: string;
  }>({
    user: 'Tell me the history of the Chola Bronze Nataraja sculpture.',
    ai: 'This 11th-century sculpture represents Shiva in his cosmic dance (Anandatandava). Cast in solid panchaloha via the lost-wax technique in the Kaveri Delta, the upper right hand holds the damaru (sound of creation), the left holds agni (dissolution fire), and his foot crushes Apasmara, the demon of spiritual ignorance.',
    source: 'National Museum New Delhi Archival Catalogue & Archaeological Survey of India (ASI)'
  });

  const promptSuggestions = [
    'How was the monolithic Kailasa Temple at Ellora carved?',
    'What is the meaning of the four lions on the Ashoka Pillar?',
    'Explain the Nasadiya Sukta creation hymn from the Rigveda.',
    'Plan a 3-day sustainable cultural tour in Hampi.'
  ];

  const handleAsk = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;
    setIsLoading(true);
    setInputQuery('');

    try {
      const response = await aiService.askHeritageQuestion(q);
      setConversation({
        user: q,
        ai: response.message,
        source: response.verifiedSource
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-24 bg-[#141311] text-[#FAF7F0] border-t border-[#C5A059]/30 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BE4D2A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24211D] border border-[#C5A059]/40 text-[#E6CD92] text-xs font-serif-display uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Intelligent Cultural Concierge</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F0] leading-tight">
              Meet Your AI <br />
              <span className="gold-gradient-text">Heritage Guide</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D4C8B2] leading-relaxed">
              Ask deep questions about ancient metallurgical alloys, dynastic lineages, Vedic iconography, architectural engineering, and sustainable itineraries.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#BE4D2A]/20 border border-[#BE4D2A] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#BE4D2A]" />
                </div>
                <p className="text-xs sm:text-sm text-[#A89F91]">
                  <strong className="text-[#FAF7F0]">Verified Archival Citations:</strong> Distinguishes verified archaeological facts from AI interpretive reasoning.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
                <p className="text-xs sm:text-sm text-[#A89F91]">
                  <strong className="text-[#FAF7F0]">Multilingual & Audio-Ready:</strong> Converses in 8 Indian languages with voice narration.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/ai-guide"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#BE4D2A] to-[#98381A] text-[#FFFDF9] font-serif-display font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Launch Full AI Guide Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Interactive Chat Box */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#1C1A17] border border-[#C5A059]/40 shadow-2xl overflow-hidden flex flex-col">
              {/* Chat Header */}
              <div className="px-6 py-4 bg-[#26231E] border-b border-[#38332C] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#BE4D2A] flex items-center justify-center text-[#FAF7F0] shadow">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif-display text-sm font-bold text-[#FAF7F0]">
                      Virasat AI Assistant
                    </h4>
                    <p className="text-[10px] text-[#A89F91] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Domain Knowledge Engine Online
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase bg-[#141311] text-[#E6CD92] px-2.5 py-1 rounded border border-[#C5A059]/30">
                  SIH 2026 Engine
                </span>
              </div>

              {/* Chat Messages Body */}
              <div className="p-6 space-y-4 max-h-[360px] overflow-y-auto bg-[#181614]">
                {/* User Message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-none p-4 bg-[#BE4D2A] text-white text-xs sm:text-sm leading-relaxed shadow-md">
                    {conversation.user}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#38332C] flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-[#D8CFBF]" />
                  </div>
                </div>

                {/* AI Assistant Message */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#C5A059] flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-[#1C1A17]" />
                  </div>
                  <div className="max-w-[90%] space-y-2">
                    <div className="rounded-2xl rounded-tl-none p-4 bg-[#26231E] border border-[#3D372F] text-xs sm:text-sm text-[#ECE6DA] leading-relaxed whitespace-pre-line shadow-md">
                      {isLoading ? (
                        <div className="flex items-center gap-2 text-[#E6CD92]">
                          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce delay-100" />
                          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce delay-200" />
                          <span className="text-xs">Consulting Archival Database...</span>
                        </div>
                      ) : (
                        conversation.ai
                      )}
                    </div>

                    {conversation.source && !isLoading && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#A89F91] pl-2">
                        <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                        <span>Source: {conversation.source}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sample Prompt Chips */}
              <div className="px-6 py-3 bg-[#201D19] border-t border-[#332E27] flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[10px] uppercase font-bold text-[#8C8275] shrink-0">
                  Try:
                </span>
                {promptSuggestions.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(prompt)}
                    disabled={isLoading}
                    className="text-[11px] px-3 py-1 rounded-full bg-[#2B2721] hover:bg-[#BE4D2A] text-[#D8CFBF] hover:text-white border border-[#3D372F] shrink-0 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-4 bg-[#26231E] border-t border-[#38332C] flex items-center gap-2">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={e => setInputQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAsk(inputQuery)}
                  placeholder="Ask anything about Indian heritage, monuments, manuscripts..."
                  disabled={isLoading}
                  className="flex-1 bg-[#181614] border border-[#3D372F] focus:border-[#C5A059] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#FAF7F0] placeholder-[#8C8275] focus:outline-none font-sans"
                />
                <button
                  onClick={() => handleAsk(inputQuery)}
                  disabled={isLoading || !inputQuery.trim()}
                  className="p-2.5 rounded-xl bg-[#BE4D2A] hover:bg-[#98381A] disabled:opacity-50 text-white transition-colors"
                  aria-label="Send Query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
