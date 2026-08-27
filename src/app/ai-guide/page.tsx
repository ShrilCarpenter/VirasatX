'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles, Send, Mic, MicOff, Image as ImageIcon, Volume2,
  VolumeX, ShieldCheck, HelpCircle, Bot, User, Upload, Check, RefreshCw
} from 'lucide-react';
import { aiService, AIResponse } from '@/services/aiService';
import { speechService } from '@/services/speechService';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { AIChatMessage } from '@/types';

export default function AIGuidePage() {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `Namaste! I am **Virasat AI**, your intelligent Indian Digital Heritage Guide.

I am trained on verified records from the Archaeological Survey of India (ASI), National Mission for Manuscripts, and world museum archives.

**How may I assist your exploration today?**
• Ask about ancient metallurgy (e.g., lost-wax Chola bronzes, Mauryan stone polish).
• Inquire into dynastic histories, Upanishadic philosophies, or temple architectures.
• Switch to the **Visual Iconography Identifier** tab below to analyze artifact photographs!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verifiedSource: 'Virasat AI National Knowledge Engine',
      confidenceScore: 0.99,
      suggestedFollowUps: [
        'Tell me about the Chola Bronze Nataraja.',
        'How was the monolithic Kailasa Temple at Ellora carved from the top down?',
        'Explain the Nasadiya Sukta creation hymn from the Rigveda.',
        'Plan a 3-day sustainable heritage tour in Hampi.'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'vision'>('chat');
  const [visionSampleCategory, setVisionSampleCategory] = useState('Sculptures');
  const [visionAnalysisResult, setVisionAnalysisResult] = useState<any>(null);
  const [visionAnalyzing, setVisionAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    const q = text.trim();
    if (!q || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const resp = await aiService.askHeritageQuestion(q);
      const assistantMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: resp.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verifiedSource: resp.verifiedSource,
        confidenceScore: resp.confidenceScore,
        relatedArtifactId: resp.relatedArtifactId,
        suggestedFollowUps: resp.suggestedFollowUps
      };

      setMessages(prev => [...prev, assistantMsg]);
      setTimeout(scrollToBottom, 100);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Speech Voice Readout
  const speakMessage = (content: string) => {
    // Strip markdown formatting for cleaner speech readout
    const plainText = content.replace(/[*_#•]/g, '');
    speechService.speak(plainText);
  };

  // Speech Recognition (Mic toggle)
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.lang = 'en-IN';
        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputQuery(transcript);
          setIsRecording(false);
        };
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        recognition.start();
      } else {
        alert('Speech recognition is not supported in this browser. Please type your question.');
      }
    }
  };

  // Visual Iconography Inspection
  const handleAnalyzeVision = async () => {
    setVisionAnalyzing(true);
    try {
      const result = await aiService.identifyIconographyFromImage(visionSampleCategory);
      setVisionAnalysisResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setVisionAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Header Banner */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#C5A059]/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2621] border border-[#C5A059]/40 text-[#E6CD92] text-xs font-serif-display uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Multimodal AI Heritage Guide</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F0]">
              Virasat AI Heritage Assistant
            </h1>
            <p className="text-xs sm:text-sm text-[#D4C8B2]">
              Powered by deep semantic indexing across 5,000+ years of verified Indian history, metallurgy, and art.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 bg-[#24211D] p-1.5 rounded-2xl border border-[#38332C]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-xl text-xs font-serif-display uppercase font-bold tracking-wider transition-all ${
                activeTab === 'chat'
                  ? 'bg-[#BE4D2A] text-white shadow'
                  : 'text-[#A89F91] hover:text-white'
              }`}
            >
              Conversational Chat
            </button>
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-4 py-2 rounded-xl text-xs font-serif-display uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'vision'
                  ? 'bg-[#C5A059] text-[#1C1A17] shadow font-black'
                  : 'text-[#A89F91] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Iconography Vision</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'chat' ? (
          /* Conversational Chat Interface */
          <div className="bg-[#FFFDF9] border border-[#E2DAC9] rounded-3xl shadow-xl overflow-hidden flex flex-col h-[680px]">
            {/* Disclaimer Bar */}
            <div className="px-6 py-2.5 bg-[#FAF7F0] border-b border-[#E2DAC9] flex items-center justify-between text-[11px] text-[#8C8275]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                Museum-verified facts are marked with primary archival sources.
              </span>
              <span className="font-mono uppercase text-[#BE4D2A] font-bold">
                SIH 2026 AI Core
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FFFDF9]">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-[#1C1A17] border border-[#C5A059] flex items-center justify-center text-[#E6CD92] shrink-0 mt-1 shadow">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2`}>
                    <div
                      className={`p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#BE4D2A] text-white rounded-tr-none'
                          : 'bg-[#FAF7F0] text-[#1C1A17] border border-[#E2DAC9] rounded-tl-none whitespace-pre-line'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Metadata Badges for Assistant */}
                    {msg.sender === 'assistant' && (
                      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-[#8C8275]">
                        <div className="flex items-center gap-2">
                          {msg.verifiedSource && (
                            <span className="flex items-center gap-1 text-[#10B981] font-medium">
                              <ShieldCheck className="w-3 h-3" />
                              {msg.verifiedSource}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => speakMessage(msg.content)}
                            className="flex items-center gap-1 hover:text-[#BE4D2A] transition-colors p-1"
                            title="Read Aloud in Indian Voice"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Suggested Follow-up chips */}
                    {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((chip, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(chip)}
                            className="text-[11px] px-3 py-1 rounded-full bg-[#FAF7F0] hover:bg-[#BE4D2A] text-[#5C554B] hover:text-white border border-[#E2DAC9] transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#BE4D2A] flex items-center justify-center text-white shrink-0 mt-1 shadow">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3 text-xs text-[#BE4D2A] p-4 bg-[#FAF7F0] border border-[#E2DAC9] rounded-2xl w-fit">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span className="font-serif-display font-medium">
                    Consulting Archaeological Survey of India (ASI) Knowledge Graph...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-[#FAF7F0] border-t border-[#E2DAC9] flex items-center gap-2">
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-2xl border transition-all ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse border-rose-600'
                    : 'bg-[#FFFDF9] text-[#8C8275] border-[#E2DAC9] hover:text-[#BE4D2A]'
                }`}
                title={isRecording ? 'Listening...' : 'Voice Input (Microphone)'}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputQuery)}
                placeholder="Ask about historical dynasties, lost-wax metallurgy, temple architecture, mudras..."
                className="flex-1 bg-[#FFFDF9] border border-[#E2DAC9] focus:border-[#C5A059] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#1C1A17] placeholder-[#8C8275] focus:outline-none shadow-sm"
              />

              <button
                onClick={() => handleSendMessage(inputQuery)}
                disabled={isLoading || !inputQuery.trim()}
                className="px-5 py-3 rounded-2xl bg-[#BE4D2A] hover:bg-[#98381A] disabled:opacity-50 text-white text-xs font-serif-display uppercase font-bold tracking-wider transition-colors shadow-md flex items-center gap-1.5 shrink-0"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Visual Iconography Identifier Simulator */
          <div className="bg-[#FFFDF9] border border-[#E2DAC9] rounded-3xl shadow-xl p-8 sm:p-12 space-y-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1A17]">
                Visual Iconography Identifier
              </h2>
              <p className="text-sm text-[#5C554B] leading-relaxed">
                Our computer vision model recognizes dynastic sculpting motifs, metallurgy alloys, and mudras from photographs of sculptures, paintings, and temple reliefs.
              </p>
            </div>

            {/* Sample Selector & Image Stage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8275]">
                  Select Sample Archival Asset to Inspect:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Nataraja Bronze', 'Ashoka Pillar', 'Padmapani Mural', 'Kailasa Monolith'].map(sample => (
                    <button
                      key={sample}
                      onClick={() => {
                        setVisionSampleCategory(sample);
                        setVisionAnalysisResult(null);
                      }}
                      className={`p-3 rounded-xl text-xs font-serif-display font-semibold border transition-all text-left ${
                        visionSampleCategory === sample
                          ? 'bg-[#1C1A17] text-[#E6CD92] border-[#C5A059]'
                          : 'bg-[#FAF7F0] text-[#3D3934] border-[#E2DAC9] hover:bg-[#F4EFE2]'
                      }`}
                    >
                      {sample}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleAnalyzeVision}
                    disabled={visionAnalyzing}
                    className="w-full py-3.5 rounded-2xl bg-[#BE4D2A] hover:bg-[#98381A] disabled:opacity-50 text-white font-serif-display text-xs uppercase font-bold tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {visionAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Analyzing Iconographic Markers...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Run AI Iconographic Analysis</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="md:col-span-6">
                <div className="relative h-64 rounded-2xl overflow-hidden bg-stone-900 border border-[#E2DAC9] shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1599818458999-f2c9e782e2c3?auto=format&fit=crop&w=800&q=80"
                    alt="Inspection Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                    Visual Target: {visionSampleCategory}
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Result Display */}
            {visionAnalysisResult && (
              <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#C5A059] shadow-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-[#E2DAC9] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#10B981] font-bold">
                      Match Confidence: {Math.round(visionAnalysisResult.confidence * 100)}%
                    </span>
                    <h3 className="font-serif-display text-xl font-bold text-[#1C1A17]">
                      {visionAnalysisResult.identifiedSubject}
                    </h3>
                  </div>
                  <span className="text-xs font-mono bg-[#1C1A17] text-[#E6CD92] px-3 py-1 rounded-full">
                    {visionAnalysisResult.dynastyMatch}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#8C8275]">
                    Detected Iconographic Features:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {visionAnalysisResult.iconographicAttributes.map((attr: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#3D3934] bg-[#FFFDF9] p-2.5 rounded-lg border border-[#E2DAC9]">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{attr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#5C554B] italic border-t border-[#E2DAC9] pt-3">
                  {visionAnalysisResult.verifiedNotes}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/artifact/${visionAnalysisResult.museumMatch.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-serif-display uppercase font-bold text-[#BE4D2A] hover:underline"
                  >
                    <span>View Full Accession Dossier in Museum Catalog →</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
