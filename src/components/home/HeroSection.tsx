'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Eye, ArrowRight, ShieldCheck, Volume2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#161513] text-[#FAF7F0]">
      {/* Background Cinematic Visual with Multi-Layer Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1599818458999-f2c9e782e2c3?auto=format&fit=crop&w=2000&q=90"
          alt="Virasat AI Indian Heritage Digital Museum"
          className="w-full h-full object-cover object-right md:object-center brightness-[0.42] scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Editorial Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141311] via-[#141311]/85 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-[#141311]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#141311]/30 to-[#141311]/90" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl space-y-8">
          {/* Top Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2A2621]/90 border border-[#C5A059]/40 backdrop-blur-md shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#BE4D2A] animate-pulse" />
            <span className="text-xs uppercase font-serif-display font-semibold tracking-widest text-[#E6CD92]">
              Smart India Hackathon 2026 • Heritage & Culture
            </span>
          </div>

          {/* Main Editorial Headline */}
          <div className="space-y-3">
            <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF7F0] leading-[1.1]">
              India’s Heritage, <br />
              <span className="gold-gradient-text">Reimagined.</span>
            </h1>
            <p className="font-serif-editorial text-xl sm:text-2xl text-[#E8DFC8] font-normal leading-relaxed max-w-2xl pt-2">
              Discover thousands of years of ancient sculptures, illuminated manuscripts, temple architecture, master artisans, and living traditions through an intelligent digital museum.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/explore"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#BE4D2A] via-[#C85A32] to-[#98381A] text-[#FFFDF9] font-serif-display font-bold text-sm tracking-wider uppercase shadow-xl hover:shadow-[#BE4D2A]/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Compass className="w-4 h-4" />
              <span>Explore the Museum</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href="/ai-guide"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#24211D]/90 hover:bg-[#332E27] text-[#E6CD92] border border-[#C5A059]/50 font-serif-display font-semibold text-sm tracking-wider uppercase backdrop-blur-md shadow-lg hover:border-[#C5A059] transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Ask the AI Guide</span>
            </Link>

            <Link
              href="/gallery/gupta-golden-hall"
              className="flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-serif-display tracking-widest text-[#D4C8B2] hover:text-[#FAF7F0] transition-colors"
            >
              <Eye className="w-4 h-4 text-[#C5A059]" />
              <span>Enter 3D Virtual Gallery</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-[#38332C]/80 max-w-2xl">
            <div>
              <p className="font-serif-display text-2xl sm:text-3xl font-bold text-[#E6CD92]">10,000+</p>
              <p className="text-xs uppercase tracking-wider text-[#A89F91]">Digital Artifacts</p>
            </div>
            <div>
              <p className="font-serif-display text-2xl sm:text-3xl font-bold text-[#E6CD92]">28</p>
              <p className="text-xs uppercase tracking-wider text-[#A89F91]">States & UTs</p>
            </div>
            <div>
              <p className="font-serif-display text-2xl sm:text-3xl font-bold text-[#E6CD92]">11</p>
              <p className="text-xs uppercase tracking-wider text-[#A89F91]">Historical Epochs</p>
            </div>
            <div>
              <p className="font-serif-display text-2xl sm:text-3xl font-bold text-[#E6CD92]">12+</p>
              <p className="text-xs uppercase tracking-wider text-[#A89F91]">Indian Languages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom scroll anchor */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 text-[#8C8275] text-[11px] uppercase font-sans tracking-widest">
        <span>Scroll to Explore</span>
        <div className="w-4 h-7 border border-[#C5A059]/40 rounded-full flex justify-center pt-1">
          <div className="w-1 h-1.5 bg-[#C5A059] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
