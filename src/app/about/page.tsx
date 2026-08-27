'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award, Shield, Sparkles, Layers, Cpu, Globe,
  CheckCircle2, ArrowRight, Landmark, Code2, Database, ShieldCheck, HelpCircle
} from 'lucide-react';

export default function AboutPage() {
  const sourcesList = [
    {
      institution: 'Archaeological Survey of India (ASI)',
      role: 'Monuments, architectural blueprints, excavation dossiers, and protection laws.',
      category: 'Government & Archaeology'
    },
    {
      institution: 'National Museum, New Delhi',
      role: 'Artifact accession registers, classical bronze metallurgical documentation, and miniature paintings.',
      category: 'Museum Repositories'
    },
    {
      institution: 'Bhandarkar Oriental Research Institute (BORI), Pune',
      role: 'Ancient manuscript transcriptions, Vedic critical editions, and Sharada/Grantha paleography.',
      category: 'Manuscripts & Epigraphy'
    },
    {
      institution: 'National Mission for Manuscripts (NMM)',
      role: 'Digitization guidelines, conservation standards, and palm-leaf preservation methodologies.',
      category: 'Manuscript Conservation'
    },
    {
      institution: 'UNESCO World Heritage Centre',
      role: 'Outstanding Universal Value (OUV) statements and sustainable heritage conservation metrics.',
      category: 'Global Cultural Heritage'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Header */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#78716C] text-xs font-sans font-medium">
            <Landmark className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>Smart India Hackathon 2026 • SIH26195</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            About Virasat AI
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] max-w-2xl">
            A digital heritage museum platform developed to digitally preserve, interpret, and make India’s cultural civilizational heritage accessible to all.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Mission Statement Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1917]">
            Our Mission: Digital Preservation & Accessible Heritage
          </h2>
          <p className="font-serif-editorial text-xl text-[#57534E] leading-relaxed italic">
            “India is the repository of over five million ancient manuscripts, hundreds of thousands of sacred monuments, and millennia of living artisanal traditions. Virasat AI reimagines this legacy into a calm, trustworthy digital museum.”
          </p>
          <p className="text-sm text-[#44403C] leading-relaxed">
            Developed under the <strong>Smart India Hackathon (SIH26195 — Student Innovation, Heritage & Culture Track)</strong>, Virasat AI bridges classical civilizational knowledge with transparent artificial intelligence, 3D digitization, and responsible tourism.
          </p>
        </div>

        {/* Sources & Attribution Section */}
        <div id="sources" className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
              Credibility & Attribution
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Sources & Institutional Attribution
            </h2>
            <p className="text-xs text-[#57534E]">
              We gratefully acknowledge the primary repositories and academic institutions whose published work guides our digital curations:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {sourcesList.map((src, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <h3 className="font-serif-display text-base font-bold text-[#1C1917]">
                    {src.institution}
                  </h3>
                  <p className="text-xs text-[#57534E] mt-0.5">
                    {src.role}
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase bg-[#F4EFE6] text-[#78716C] px-2.5 py-1 rounded-md shrink-0 self-start sm:self-auto">
                  {src.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ethical AI & Transparency Box */}
        <div id="ethical-ai" className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9A3412]">
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
            <span>Ethical AI & Data Transparency</span>
          </div>

          <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
            Historical Rigor Over Generative Hallucination
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#44403C]">
            <div className="p-4 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] space-y-1.5">
              <strong className="text-[#1C1917] block">Ground Truth in Verified Archives:</strong>
              <p className="text-[#57534E]">
                All artifact metadata, dates, materials, and dynastic lineages are retrieved directly from verified museum records, not fabricated by LLM generation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] space-y-1.5">
              <strong className="text-[#1C1917] block">Clear Curatorial Demarcation:</strong>
              <p className="text-[#57534E]">
                When the AI assistant answers inquiries or analyzes iconography, outputs are explicitly labeled as AI interpretation for educational discovery.
              </p>
            </div>
          </div>
        </div>

        {/* System Architecture */}
        <div id="architecture" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9A3412]">
            <Code2 className="w-4 h-4" />
            <span>Technical Architecture</span>
          </div>

          <h3 className="font-serif-display text-2xl font-bold text-[#1C1917]">
            Engineered with Modern Web Standards
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm">
              <strong className="text-[#1C1917] block mb-1">Frontend</strong>
              <span className="text-[#78716C]">Next.js App Router, React 19, TypeScript, Tailwind CSS</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm">
              <strong className="text-[#1C1917] block mb-1">3D Archival Studio</strong>
              <span className="text-[#78716C]">Interactive 360° Object Rotation & Directional Lighting</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm">
              <strong className="text-[#1C1917] block mb-1">Speech & Audio</strong>
              <span className="text-[#78716C]">Web Speech API & Web Audio Synthesized Tanpura</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm">
              <strong className="text-[#1C1917] block mb-1">Multilingual</strong>
              <span className="text-[#78716C]">8 Indian Languages with Script Fidelity</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
