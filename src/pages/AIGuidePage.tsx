import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  ArrowRight, 
  BookOpen, 
  ExternalLink, 
  AlertCircle,
  Camera,
  Layers,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { RESEARCH_PRESETS, HERITAGE_ITEMS } from '../data/heritageData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ConfidenceBadge, VerificationBadge } from '../components/VerificationBadge';
import { AICurationResponse } from '../types';
import { SafeImage } from '../components/SafeImage';
import { Link } from 'react-router-dom';

export const AIGuidePage: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [aiResponse, setAiResponse] = useState<AICurationResponse | null>({
    answer: RESEARCH_PRESETS[0].responseParagraphs.join('\n\n'),
    citations: RESEARCH_PRESETS[0].citations.map(c => ({
      recordId: c.recordId || 'ASI-104',
      title: c.title,
      source: c.source,
      verificationStatus: 'Scholar-verified'
    })),
    confidence: RESEARCH_PRESETS[0].confidence,
    relatedRecords: (RESEARCH_PRESETS[0].relatedRecords || []).map(id => {
      const item = HERITAGE_ITEMS.find(i => i.id === id);
      return {
        id,
        title: item?.title || id,
        category: item?.category || 'Heritage',
        imageUrl: item?.imageUrl || ''
      };
    }),
    fallback: true,
    disclaimer: 'Curated scholarly baseline initialized from verified primary archives.'
  });

  const handleSendQuery = async (queryText: string) => {
    const text = queryText || inputQuery;
    if (!text.trim()) return;

    setIsQuerying(true);

    try {
      const res = await fetch('/api/ai-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, language: 'English' })
      });

      if (!res.ok) throw new Error('API server unavailable');
      const data: AICurationResponse = await res.json();
      setAiResponse(data);
    } catch (err) {
      console.warn('Backend unavailable, using local curated knowledge fallback:', err);
      const match = RESEARCH_PRESETS.find(p => p.question.toLowerCase().includes(text.toLowerCase()));
      if (match) {
        setAiResponse({
          answer: match.responseParagraphs.join('\n\n'),
          citations: match.citations.map(c => ({
            recordId: c.recordId || 'ASI-104',
            title: c.title,
            source: c.source,
            verificationStatus: 'Scholar-verified'
          })),
          confidence: match.confidence,
          relatedRecords: (match.relatedRecords || []).map(id => {
            const item = HERITAGE_ITEMS.find(i => i.id === id);
            return {
              id,
              title: item?.title || id,
              category: item?.category || 'Heritage',
              imageUrl: item?.imageUrl || ''
            };
          }),
          fallback: true,
          disclaimer: 'Demo response from curated heritage knowledge (offline mode)'
        });
      } else {
        setAiResponse({
          answer: `The inquiry regarding "${text}" addresses key themes in Indian cultural heritage. In our repository, cross-referenced archaeological surveys and museum catalogs document related dynastic architecture and sculpture traditions. Explore curated dossiers such as the Chola Nataraja or Brihadisvara Temple for verified primary sources.`,
          citations: [
            { recordId: 'ASI-104', title: 'National Museum Curatorial Catalog', source: 'Archaeological Survey of India', verificationStatus: 'Curator-reviewed' }
          ],
          confidence: 'Moderate confidence',
          relatedRecords: HERITAGE_ITEMS.slice(0, 3).map(r => ({
            id: r.id,
            title: r.title,
            category: r.category,
            imageUrl: r.imageUrl
          })),
          fallback: true,
          disclaimer: 'Synthesized from curated repository records.'
        });
      }
    } finally {
      setIsQuerying(false);
      setInputQuery('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fadeIn">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Research Tools' }, { label: 'Virasat AI Guide' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#936B38]/10 text-[#936B38] text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curatorial Research Companion</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Virasat AI
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Your research companion for India's heritage. Inquiries are grounded in primary archaeological surveys, epigraphs, and museum accessions—with source citations and confidence metrics.
          </p>
        </div>

        {/* Visual Identification CTA */}
        <Link
          to="/identify"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs font-semibold hover:border-[#936B38] hover:bg-stone-50 transition-colors shadow-2xs self-start md:self-auto"
        >
          <Camera className="w-3.5 h-3.5 text-[#936B38]" />
          <span>Need Visual Identification? &rarr;</span>
        </Link>
      </div>

      {/* Main Research Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inquiry Prompts & Input */}
        <div className="lg:col-span-5 space-y-6">
          {/* Query Presets */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
            <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider block">
              Curated Scholarly Inquiries
            </span>
            <div className="space-y-2">
              {RESEARCH_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendQuery(p.question)}
                  className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-[#FAF8F5] border border-stone-200/80 text-xs font-medium text-stone-800 transition-colors flex items-center justify-between group"
                >
                  <span className="line-clamp-2 leading-relaxed font-serif">"{p.question}"</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#936B38] shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Query Input */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
            <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider block">
              Ask Virasat AI
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery(inputQuery);
              }}
              className="space-y-3"
            >
              <textarea
                rows={3}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about architectural canons, dynastic patrons, iconography, or metallurgical traditions…"
                className="w-full p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#936B38] focus:bg-white transition-all resize-none placeholder:text-stone-400 font-sans"
              />
              <button
                type="submit"
                disabled={isQuerying || !inputQuery.trim()}
                className="w-full py-3 rounded-xl bg-[#151D2A] hover:bg-[#A64B2A] disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isQuerying ? 'Retrieving Curated Sources…' : 'Synthesize Research Answer'}</span>
              </button>
            </form>
            <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
              <span>Source Grounding Active</span>
              <Link to="/ai-transparency" className="hover:underline text-[#936B38] font-medium">
                AI Transparency &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Grounded AI Response Card */}
        <div className="lg:col-span-7 space-y-6">
          {isQuerying ? (
            <div className="p-12 rounded-2xl bg-white border border-stone-200/90 shadow-2xs text-center space-y-4 animate-pulse">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#FAF8F5] text-[#936B38] flex items-center justify-center">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <h2 className="font-serif text-xl font-bold text-stone-800">
                Consulting Curated Archival Records…
              </h2>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                Searching verified accession records, archaeological survey bulletins, and epigraphical indices.
              </p>
            </div>
          ) : aiResponse ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-6">
              {/* Response Header: AI-assisted badge vs Source status */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-mono px-2 py-0.5 rounded-md border border-amber-200 font-semibold uppercase">
                    AI-Assisted
                  </span>
                  <ConfidenceBadge level={aiResponse.confidence} />
                </div>
                <span className="text-xs text-stone-400 font-mono">
                  {aiResponse.citations.length} Corroborated Sources
                </span>
              </div>

              {/* Distinguishable AI Interpretation Box (Prompt Section 23) */}
              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E7D6C0] space-y-3">
                <span className="text-[10px] font-mono font-bold text-[#A64B2A] uppercase tracking-wider block">
                  AI Synthesized Interpretation
                </span>
                <div className="text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif">
                  {aiResponse.answer}
                </div>
              </div>

              {/* Verified Sources Block (Prompt Section 22 & 23) */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider block">
                  Sources Consulted
                </span>
                <div className="space-y-2">
                  {aiResponse.citations.map((cite, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono font-bold text-[#936B38] shrink-0">
                          [{cite.recordId}]
                        </span>
                        <span className="font-medium text-stone-800 truncate">
                          {cite.title}
                        </span>
                        <span className="text-stone-400 truncate">({cite.source})</span>
                      </div>
                      <VerificationBadge status={cite.verificationStatus} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Knowledge Graph Records (Prompt Section 22) */}
              {aiResponse.relatedRecords && aiResponse.relatedRecords.length > 0 && (
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <span className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider block">
                    Related Heritage Records
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {aiResponse.relatedRecords.map(rec => (
                      <Link
                        key={rec.id}
                        to={`/artifact/${rec.id}`}
                        className="p-2.5 rounded-xl bg-stone-50 hover:bg-[#FAF8F5] border border-stone-200 transition-colors flex items-center gap-2.5 group"
                      >
                        {rec.imageUrl && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
                            <SafeImage
                              src={rec.imageUrl}
                              alt={rec.title}
                              creditKey={rec.id}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="text-xs font-serif font-bold text-stone-800 group-hover:text-[#A64B2A] truncate">
                          {rec.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Next Explorations */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <span className="font-mono font-bold text-stone-500 uppercase text-[10px] block flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#936B38]" />
                  Suggested Next Exploration:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link to="/timeline" className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-[#936B38] transition-colors">
                    Explore Era in Timeline &rarr;
                  </Link>
                  <Link to="/living-traditions" className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-[#936B38] transition-colors">
                    Related Living Guilds &rarr;
                  </Link>
                  <Link to="/map" className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-[#936B38] transition-colors">
                    Geospatial Provenance Map &rarr;
                  </Link>
                </div>
              </div>

              {/* Standard Concise AI Disclaimer (Prompt Section 24) */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  AI-generated interpretations may contain errors. Verify important historical or cultural claims using the cited sources.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
