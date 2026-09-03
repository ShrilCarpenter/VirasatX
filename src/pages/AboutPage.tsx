import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Landmark, Award, Shield, CheckCircle, Code2, Globe, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'About VirasatX (SIH26197)' }]} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold">
          <Award className="w-4 h-4 text-[#936B38]" />
          <span>Smart India Hackathon 2026 • SIH26197</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          VirasatX — India’s Heritage Repository
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed italic font-serif">
          “India’s Heritage, Understood, Preserved and Experienced.”
        </p>
      </div>

      {/* Official SIH Alignment Box */}
      <div className="p-8 rounded-3xl bg-[#151D2A] text-white shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest block">
            Official Hackathon Alignment
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Smart India Hackathon 2026 Specification
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
            <span className="text-stone-400 block font-mono">Problem Statement ID</span>
            <span className="font-mono text-base font-bold text-amber-300">SIH26197</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
            <span className="text-stone-400 block font-mono">Theme</span>
            <span className="font-semibold text-white">Heritage &amp; Culture</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
            <span className="text-stone-400 block font-mono">Lead Organization</span>
            <span className="font-semibold text-white">AICTE</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
            <span className="text-stone-400 block font-mono">Category</span>
            <span className="font-semibold text-white">Software (Student Innovation)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 leading-relaxed">
          <strong className="text-white block mb-1">Official Problem Statement:</strong>
          “Student Innovation—Ideas that showcase the rich cultural heritage and traditions of India.”
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          The Cultural Horizon Model
        </h2>
        <p className="text-stone-600 text-sm leading-relaxed">
          VirasatX rejects the traditional static museum presentation where objects are isolated from their cultural reality. Our platform interconnects every element along an unbroken civilizational thread:
        </p>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 font-mono text-xs sm:text-sm text-[#936B38] text-center font-bold">
          Artifact &rarr; Historical Era &rarr; Cultural Corridor &rarr; Heritage Site &rarr; Living Tradition &rarr; Master Artisan &rarr; Responsible Visit
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <Landmark className="w-5 h-5 text-[#936B38]" />
            <h4 className="font-bold text-stone-900 text-sm font-serif">3D Archival Studio</h4>
            <p className="text-stone-600 leading-relaxed">
              360° interactive WebGL rotation with museum gallery lighting simulation allowing tactile inspection of delicate sculptures.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <Shield className="w-5 h-5 text-emerald-700" />
            <h4 className="font-bold text-stone-900 text-sm font-serif">Lightweight RAG AI</h4>
            <p className="text-stone-600 leading-relaxed">
              Dedicated curatorial research assistant grounded in primary ASI and IGNCA archives with explicit record IDs and zero client secret leakage.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <HeartHandshake className="w-5 h-5 text-[#A64B2A]" />
            <h4 className="font-bold text-stone-900 text-sm font-serif">Living Craft Continuity</h4>
            <p className="text-stone-600 leading-relaxed">
              Elevating GI-tagged master craft guilds and tribal metallurgy directly into the digital preservation narrative.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Technology Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-stone-400 block font-mono">Frontend</span>
            <span className="font-bold text-stone-900">React 19 &amp; Vite 6</span>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-stone-400 block font-mono">Styling</span>
            <span className="font-bold text-stone-900">Tailwind CSS v4</span>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-stone-400 block font-mono">3D &amp; Mapping</span>
            <span className="font-bold text-stone-900">Three.js &amp; Leaflet</span>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-stone-400 block font-mono">AI / LLM</span>
            <span className="font-bold text-stone-900">Google GenAI SDK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
