'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award, Shield, Sparkles, Layers, Cpu, Globe,
  CheckCircle, ArrowRight, Heart, Landmark, Code2, Database
} from 'lucide-react';

export default function AboutPage() {
  const judgingPillars = [
    {
      title: 'Problem Statement Alignment',
      badge: 'Heritage & Culture Track',
      desc: 'Digitally preserves over 10,000+ artifacts, ancient manuscripts, and living traditions across 28 Indian states with zero generic tourism templates.'
    },
    {
      title: 'Multimodal AI Innovation',
      badge: 'Vision, Voice & LLM',
      desc: 'Integrates Computer Vision for iconographic recognition, Web Speech voice synthesis, and semantic knowledge retrieval with verified citations.'
    },
    {
      title: 'Sustainable Tourism Impact',
      badge: 'UN SDG 8 & 11',
      desc: 'Addresses overtourism through eco-heritage scores and an AI itinerary engine channeling revenue directly to GI-tagged master artisan cooperatives.'
    },
    {
      title: 'Universal Accessibility',
      badge: '8 Indian Languages',
      desc: 'Full screen-reader compatibility, keyboard navigation, high contrast parchment palette, and audio guides in native Indian languages.'
    }
  ];

  const demoSteps = [
    { step: 1, title: 'Hero & Soundscape', action: 'Open homepage, toggle soothing ambient Tanpura soundscape' },
    { step: 2, title: 'Enter Digital Museum', action: 'Explore 30+ artifacts with multi-criteria period/material filters' },
    { step: 3, title: 'Deep 3D Inspection', action: 'Open Chola Nataraja: rotate 360°, inspect lighting studio, listen to audio' },
    { step: 4, title: 'Ask AI Heritage Guide', action: 'Query the assistant on lost-wax metallurgy with verified ASI citations' },
    { step: 5, title: 'History Timeline', action: 'Jump to 10th-century Chola Golden Era across 11 historical epochs' },
    { step: 6, title: 'Heritage Map', action: 'Locate Brihadisvara Temple with eco-sustainability index and visiting tips' },
    { step: 7, title: 'Manuscript Conservation', action: 'Inspect Rigveda / Arthashastra with side-by-side script OCR & chant audio' },
    { step: 8, title: 'Sustainable Itinerary', action: 'Generate a 3-day low-carbon responsible itinerary supporting local artisans' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Header */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#C5A059]/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2621] border border-[#C5A059]/40 text-[#E6CD92] text-xs font-serif-display uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Smart India Hackathon 2026 • Project Dossier</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0]">
            About Virasat AI
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#D4C8B2] max-w-2xl">
            A full-stack, AI-powered digital heritage museum ecosystem developed to preserve, celebrate, and responsibly showcase India’s cultural heritage.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Mission Statement */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-lg space-y-6">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1A17]">
            The Vision: India’s Heritage, Reimagined
          </h2>
          <p className="font-serif-editorial text-xl sm:text-2xl text-[#5C554B] leading-relaxed italic">
            “India is the cradle of human civilizational knowledge. Over five million ancient manuscripts, hundreds of thousands of temples, and centuries of living artisanal wisdom risk erosion through lack of accessible digital preservation.”
          </p>
          <p className="text-sm sm:text-base text-[#4A443C] leading-relaxed">
            <strong>Virasat AI</strong> rejects generic tourist portal templates in favor of a world-class, premium museum experience combining the editorial elegance of Google Arts & Culture with the sacred sophistication of Indian aesthetics.
          </p>
        </div>

        {/* SIH Judging Alignment Grid */}
        <div className="space-y-6">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1A17]">
            SIH 2026 Innovation Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {judgingPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-display text-lg font-bold text-[#1C1A17]">
                    {pillar.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-[#FAF7F0] text-[#BE4D2A] px-2.5 py-1 rounded-full border border-[#E2DAC9] font-bold">
                    {pillar.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Minute SIH Presentation Workflow */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#1C1A17] text-[#FAF7F0] border border-[#C5A059]/40 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E6CD92]">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Seamless 3-Minute SIH Judging Demo Flow</span>
          </div>

          <h3 className="font-serif-display text-2xl font-bold text-[#FAF7F0]">
            One Connected Heritage Ecosystem
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {demoSteps.map(item => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-[#26231E] border border-[#38332C] flex items-start gap-3 text-xs"
              >
                <span className="w-6 h-6 rounded-full bg-[#BE4D2A] text-white font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-bold text-[#FAF7F0] mb-0.5">{item.title}</h4>
                  <p className="text-[#A89F91]">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Architecture Box */}
        <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-lg space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#BE4D2A]">
            <Code2 className="w-4 h-4" />
            <span>Technical Architecture</span>
          </div>

          <h3 className="font-serif-display text-2xl font-bold text-[#1C1A17]">
            Built with Modern Full-Stack Standards
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E2DAC9]">
              <strong className="text-[#1C1A17] block mb-1">Frontend</strong>
              <span className="text-[#5C554B]">Next.js App Router, React 19, TypeScript, Tailwind CSS</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E2DAC9]">
              <strong className="text-[#1C1A17] block mb-1">Interactive 3D</strong>
              <span className="text-[#5C554B]">360° Object Rotation & Directional Lighting Studio</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E2DAC9]">
              <strong className="text-[#1C1A17] block mb-1">Acoustic Audio</strong>
              <span className="text-[#5C554B]">Web Speech API & Web Audio Synthesized Tanpura</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E2DAC9]">
              <strong className="text-[#1C1A17] block mb-1">AI Engine</strong>
              <span className="text-[#5C554B]">Pluggable LLM interface with verified ASI knowledge base</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
