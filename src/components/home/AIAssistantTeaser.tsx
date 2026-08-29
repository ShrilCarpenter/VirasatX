'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, Bot, User, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { aiService } from '@/services/aiService';

export default function AIAssistantTeaser() {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{
    user: string;
    ai: string;
    source?: string;
    relatedArtifactId?: string;
    suggestedFollowUps?: string[];
  }>({
    user: 'What is the significance of the Chola Bronze Nataraja?',
    ai: `The 11th-century Chola Bronze Nataraja depicts Shiva executing the Anandatandava (the cosmic dance of creation and dissolution). 

• Upper Right Hand: Holds the damaru (sound of cosmic creation).
• Upper Left Hand: Holds agni (the fire that dissolves the universe).
• Lower Right Hand: Abhaya mudra (protection and fearlessness).
• Lower Left Hand: Points diagonally to the lifted left foot (refuge of the soul).
• Underfoot: Subjugates Apasmara Purusha, the dwarf representing spiritual ignorance.`,
    source: 'Archaeological Survey of India & National Museum New Delhi',
    relatedArtifactId: 'chola-bronze-nataraja',
    suggestedFollowUps: [
      'How were Chola bronzes cast using the lost-wax technique?',
      'Why does a replica of Nataraja stand at CERN in Switzerland?'
    ]
  });

  const promptSuggestions = [
    'What is the significance of Nataraja?',
    'How was the Kailasa Temple constructed?',
    'Tell me about the Indus Valley Civilization.',
    'Explain the Lion Capital of Ashoka.',
    'Plan a responsible heritage trip to Hampi.'
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
        source: response.verifiedSource,
        relatedArtifactId: response.relatedArtifactId,
        suggestedFollowUps: response.suggestedFollowUps
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-20 sm:py-24 bg-[#F4EFE6] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans uppercase font-bold tracking-widest text-[#9A3412] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Museum Research Desk</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
              AI Heritage Guide
            </h2>
            <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] mt-1 max-w-2xl">
              Inquire about historical iconography, metallurgy techniques, ancient scripts, and monument architecture.
            </p>
          </div>

          <Link
            href="/ai-guide"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#9A3412] hover:text-[#7C2D12] group"
          >
            <span>Open Full Research Studio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Framed Masterpiece Visual with Research Desk Label */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] p-4 sm:p-5 shadow-sm space-y-4">
            
            {/* Museum Artifact Photograph */}
            <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Shiva_as_the_Lord_of_Dance_LACMA_edit.jpg"
                alt="Chola Bronze Nataraja Masterpiece"
                loading="lazy"
                className="w-full h-full object-cover object-center brightness-[0.96]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#FFFFFF]/90 text-[#1C1917] text-[10px] font-sans font-semibold border border-[#E7E1D4]">
                Featured Research Subject
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-mono uppercase text-amber-200 block">
                  Chola Dynasty • 11th Century CE
                </span>
                <h4 className="font-serif-display text-lg font-bold text-white">
                  Nataraja — Lord of the Cosmic Dance
                </h4>
              </div>
            </div>

            {/* Museum Desk Curatorial Note */}
            <div className="space-y-2 text-xs text-[#57534E] leading-relaxed">
              <p>
                <strong>Archival Inquiries:</strong> Ask our AI assistant regarding the philosophical symbolism, lost-wax metallurgy, or historical context of this artifact.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#15803D] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Verified against National Museum & ASI archival records</span>
              </div>
            </div>

            {/* Link to Artifact */}
            <div className="pt-3 border-t border-[#E7E1D4] flex items-center justify-between">
              <span className="text-xs text-[#78716C]">
                Accession: <strong className="text-[#1C1917]">NM-BR-56.12</strong>
              </span>
              <Link
                href="/artifact/chola-bronze-nataraja"
                className="text-xs font-semibold text-[#9A3412] hover:underline inline-flex items-center gap-1"
              >
                <span>Full Catalog Record</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>

          {/* Right Column: Clean Light Chat Stage */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm overflow-hidden justify-between">
            
            {/* Desk Header */}
            <div className="px-6 py-4 bg-[#FAF7F0] border-b border-[#E7E1D4] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#9A3412] flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917]">
                    Virasat AI Assistant
                  </h4>
                  <span className="text-[10px] text-[#78716C]">
                    Museum Research & Curatorial Inquiries
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#78716C] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E7E1D4]">
                SIH 2026 Prototype
              </span>
            </div>

            {/* Inquiry & Response Dialogue */}
            <div className="p-6 space-y-4 max-h-[340px] overflow-y-auto bg-[#FFFFFF]">
              
              {/* User Question */}
              <div className="flex items-start gap-3 justify-end">
                <div className="max-w-[85%] rounded-xl p-3.5 bg-[#F4EFE6] border border-[#E7E1D4] text-xs sm:text-sm text-[#1C1917] leading-relaxed">
                  {conversation.user}
                </div>
                <div className="w-7 h-7 rounded-full bg-[#E7E1D4] flex items-center justify-center shrink-0 text-[#78716C]">
                  <User className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#9A3412] flex items-center justify-center shrink-0 text-white mt-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="max-w-[90%] space-y-2">
                  <div className="rounded-xl p-4 bg-[#FBF9F4] border border-[#E7E1D4] text-xs sm:text-sm text-[#292524] leading-relaxed whitespace-pre-line font-serif-editorial">
                    {conversation.ai}
                  </div>

                  {/* Institutional Citation Tag */}
                  {conversation.source && (
                    <div className="flex items-center gap-1.5 text-[10px] text-[#78716C] px-1 font-mono">
                      <ShieldCheck className="w-3 h-3 text-[#15803D]" />
                      <span>Source: {conversation.source}</span>
                    </div>
                  )}

                  {/* Suggested Follow-Ups */}
                  {conversation.suggestedFollowUps && conversation.suggestedFollowUps.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {conversation.suggestedFollowUps.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAsk(q)}
                          className="text-[11px] font-sans px-2.5 py-1 rounded-full bg-[#FFFFFF] hover:bg-[#F4EFE6] border border-[#E7E1D4] text-[#78716C] hover:text-[#9A3412] transition-colors text-left"
                        >
                          → {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Inquiry Input Bar */}
            <div className="p-4 bg-[#FAF7F0] border-t border-[#E7E1D4] space-y-3">
              {/* Quick Prompts */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
                <span className="text-[10px] font-mono uppercase text-[#78716C] shrink-0">
                  Sample Inquiries:
                </span>
                {promptSuggestions.slice(0, 3).map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleAsk(p)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#FFFFFF] hover:bg-[#F4EFE6] border border-[#E7E1D4] text-[11px] text-[#44403C] hover:text-[#9A3412] transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAsk(inputQuery);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask a question about Indian heritage, iconography, or history..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-xs sm:text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#9A3412] focus:ring-1 focus:ring-[#9A3412]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputQuery.trim()}
                  className="w-10 h-10 rounded-full bg-[#9A3412] hover:bg-[#7C2D12] text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-colors shadow-sm"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
