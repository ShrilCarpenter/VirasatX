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
    <section className="w-full py-20 bg-[#F4EFE6] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Intent */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#9A3412] text-xs font-sans font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>AI Research Assistant</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
                AI Heritage Guide
              </h2>
              <p className="font-serif-editorial text-lg text-[#57534E] leading-relaxed">
                “Ask about India’s art, architecture, manuscripts and traditions.”
              </p>
            </div>

            <p className="text-sm text-[#44403C] leading-relaxed">
              Designed as an intelligent museum research assistant. Answers are referenced against institutional archives with clear demarcation between verified archaeological facts and curatorial interpretation.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-[#57534E]">
                <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span><strong>Institutional Sources:</strong> Referenced against Archaeological Survey of India (ASI) and National Museum archives.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#57534E]">
                <HelpCircle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                <span><strong>Transparent AI:</strong> Interpretive analysis is labeled to maintain historical integrity.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/ai-guide"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-sans font-semibold transition-colors shadow-sm"
              >
                <span>Open Full AI Guide Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Light Chat Stage */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm overflow-hidden flex flex-col">
              
              {/* Chat Header */}
              <div className="px-6 py-3.5 bg-[#FAF7F0] border-b border-[#E7E1D4] flex items-center justify-between">
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

              {/* Chat Messages */}
              <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto bg-[#FFFFFF]">
                
                {/* User Message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="max-w-[85%] rounded-xl p-3.5 bg-[#F4EFE6] border border-[#E7E1D4] text-xs sm:text-sm text-[#1C1917] leading-relaxed">
                    {conversation.user}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#E7E1D4] flex items-center justify-center shrink-0 text-[#78716C]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Assistant Message */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#9A3412] flex items-center justify-center shrink-0 text-white">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="max-w-[90%] space-y-3">
                    <div className="rounded-xl p-4 bg-[#FBF9F4] border border-[#E7E1D4] text-xs sm:text-sm text-[#1C1917] leading-relaxed whitespace-pre-line">
                      {isLoading ? (
                        <div className="flex items-center gap-2 text-[#9A3412] text-xs">
                          <span className="w-2 h-2 rounded-full bg-[#9A3412] animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-[#9A3412] animate-bounce delay-100" />
                          <span className="w-2 h-2 rounded-full bg-[#9A3412] animate-bounce delay-200" />
                          <span>Consulting museum archives...</span>
                        </div>
                      ) : (
                        conversation.ai
                      )}
                    </div>

                    {/* Source Attribution */}
                    {conversation.source && !isLoading && (
                      <div className="p-2.5 rounded-lg bg-[#FAF7F0] border border-[#E7E1D4] text-[11px] text-[#57534E] flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                        <span><strong>Source:</strong> {conversation.source}</span>
                      </div>
                    )}

                    {/* Related Artifact Link */}
                    {conversation.relatedArtifactId && !isLoading && (
                      <div className="text-xs">
                        <Link
                          href={`/artifact/${conversation.relatedArtifactId}`}
                          className="font-semibold text-[#9A3412] hover:underline"
                        >
                          View Related Artifact in Collection →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Example Suggestion Chips */}
              <div className="px-5 py-2.5 bg-[#FAF7F0] border-t border-[#E7E1D4] flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[10px] uppercase font-bold text-[#78716C] shrink-0">
                  Try:
                </span>
                {promptSuggestions.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(prompt)}
                    disabled={isLoading}
                    className="text-[11px] px-3 py-1 rounded-full bg-[#FFFFFF] hover:bg-[#9A3412] text-[#44403C] hover:text-white border border-[#E7E1D4] shrink-0 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-[#FFFFFF] border-t border-[#E7E1D4] flex items-center gap-2">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={e => setInputQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAsk(inputQuery)}
                  placeholder="Ask about Indian heritage, monuments, manuscripts..."
                  disabled={isLoading}
                  className="flex-1 bg-[#FBF9F4] border border-[#E7E1D4] focus:border-[#9A3412] rounded-xl px-4 py-2 text-xs sm:text-sm text-[#1C1917] placeholder-[#78716C] focus:outline-none"
                />
                <button
                  onClick={() => handleAsk(inputQuery)}
                  disabled={isLoading || !inputQuery.trim()}
                  className="p-2.5 rounded-xl bg-[#9A3412] hover:bg-[#7C2D12] disabled:opacity-50 text-white transition-colors"
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
