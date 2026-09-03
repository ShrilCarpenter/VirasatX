import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Sparkles, Shield, AlertTriangle, CheckCircle, ArrowRight, HelpCircle, Layers, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AITransparencyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'AI Transparency & Pipeline Architecture' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Explainable AI &amp; Ethical Guardrails</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          AI Transparency &amp; Pipeline Architecture
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          How VirasatX uses Retrieval-Augmented Generation (RAG) to eliminate hallucinations, enforce verified scholarly citations, and maintain strict cultural custodianship.
        </p>
      </div>

      {/* Visual Pipeline Flowchart */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          The Grounded AI Pipeline
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-mono font-bold flex items-center justify-center mx-auto text-[11px]">1</span>
            <span className="font-bold text-stone-900 block">User Query</span>
            <p className="text-[11px] text-stone-500">Sanitized inquiry in English or Indian languages.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7EFE6] border border-[#E7D6C0] space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-[#936B38] text-white font-mono font-bold flex items-center justify-center mx-auto text-[11px]">2</span>
            <span className="font-bold text-stone-900 block">RAG Retrieval</span>
            <p className="text-[11px] text-stone-500">Matches inquiry against curated ASI &amp; manuscript records.</p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-indigo-700 text-white font-mono font-bold flex items-center justify-center mx-auto text-[11px]">3</span>
            <span className="font-bold text-stone-900 block">Server LLM</span>
            <p className="text-[11px] text-stone-500">Google Gemini called securely via backend proxy.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center mx-auto text-[11px]">4</span>
            <span className="font-bold text-stone-900 block">Citations &amp; Confidence</span>
            <p className="text-[11px] text-stone-500">Attribution to real accession IDs &amp; confidence badge.</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-stone-950 font-mono font-bold flex items-center justify-center mx-auto text-[11px]">5</span>
            <span className="font-bold block">Verified Output</span>
            <p className="text-[11px] text-stone-300">Scholarly answer with zero fabricated sources.</p>
          </div>
        </div>
      </div>

      {/* What AI Does vs What AI Does NOT Do */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-emerald-50/50 border border-emerald-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>What Virasat AI Does</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-700">✓</span>
              <span>Retrieves verified facts from authenticated Archaeological Survey of India (ASI) accession catalogues.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-700">✓</span>
              <span>Clearly displays source record IDs in brackets like [ASI-104] or [UNESCO #250].</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-700">✓</span>
              <span>Rates answers across High Confidence, Moderate Confidence, or Needs Verification.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-700">✓</span>
              <span>Declares when information is insufficient rather than inventing false claims.</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-rose-50/50 border border-rose-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>What Virasat AI Does NOT Do</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-rose-950 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-rose-700">✗</span>
              <span>Does NOT authenticate artifacts or assign market valuation for antiquities trade.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-rose-700">✗</span>
              <span>Does NOT expose API keys or credentials to the client browser environment.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-rose-700">✗</span>
              <span>Does NOT claim custom proprietary model training where standard foundational APIs are used.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-rose-700">✗</span>
              <span>Does NOT fabricate historical quotes, dates, or non-existent museum collections.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Cultural Sensitivity & Error Reporting */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Cultural Sensitivity &amp; Disputed Interpretations
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Indian cultural history encompasses multifaceted theological, dynastic, and regional perspectives. Where historical consensus is debated among scholars (such as script origins or chronology nuances), Virasat AI presents the competing scholarly schools of thought neutrally rather than asserting dogma.
        </p>
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
          <strong className="text-stone-900 block font-semibold">Reporting Discrepancies:</strong>
          <p>
            If you identify an inaccurate transcription or outdated accession datum, please notify our curatorial review team via the GitHub repository issues tab citing the specific accession number.
          </p>
        </div>
      </div>
    </div>
  );
};
