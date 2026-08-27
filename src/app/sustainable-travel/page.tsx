'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Leaf, Compass, Shield, Users, Sparkles, Calendar,
  MapPin, Check, Heart, Award, ArrowRight, Download, Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SUSTAINABLE_DESTINATIONS } from '@/data/sustainableDestinationsData';
import { aiService } from '@/services/aiService';
import { GeneratedItinerary } from '@/types';

export default function SustainableTravelPage() {
  const [selectedRegion, setSelectedRegion] = useState('South India (Kaveri & Hampi Basin)');
  const [duration, setDuration] = useState(3);
  const [theme, setTheme] = useState<GeneratedItinerary['theme']>('Architecture & Temples');
  const [pace, setPace] = useState<GeneratedItinerary['pace']>('Immersive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedItinerary | null>(null);

  const handleGenerateItinerary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = aiService.generateSustainableItinerary({
        region: selectedRegion,
        durationDays: duration,
        theme,
        pace
      });
      setGeneratedPlan(plan);
      setIsGenerating(false);

      // Trigger celebratory eco-confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#BE4D2A', '#C5A059', '#10B981']
        });
      } catch (e) {
        // Safe fallback
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Header Banner */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#C5A059]/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2621] border border-[#C5A059]/40 text-[#10B981] text-xs font-serif-display uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Responsible & Regenerative Cultural Tourism</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0]">
            Sustainable Heritage Tourism
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#D4C8B2] max-w-2xl">
            Protect fragile stone monuments from overtourism while generating direct livelihoods for hereditary artisan families and indigenous communities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Destination Sustainability Cards Grid */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#BE4D2A]">
                Eco-Heritage Monitoring Index
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1A17] mt-1">
                Featured Sustainable Heritage Destinations
              </h2>
            </div>
            <span className="text-xs text-[#8C8275]">
              Audited by INTACH & Ministry of Tourism Guidelines
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUSTAINABLE_DESTINATIONS.map(dest => (
              <div
                key={dest.id}
                className="group rounded-3xl overflow-hidden bg-[#FFFDF9] border border-[#E2DAC9] shadow-sm hover:shadow-xl hover:border-[#C5A059] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-stone-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono bg-[#1C1A17]/80 text-[#10B981] border border-[#10B981]/40 backdrop-blur-sm">
                      Eco-Score: {dest.sustainabilityScore}/100
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono bg-[#1C1A17]/80 text-[#E6CD92] border border-[#C5A059]/40 backdrop-blur-sm">
                      Crowd: {dest.crowdLevel}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-xs font-mono text-[#8C8275]">{dest.state} • {dest.region} India</span>
                      <h3 className="font-serif-display text-xl font-bold text-[#1C1A17] mt-0.5">
                        {dest.name}
                      </h3>
                    </div>

                    <div className="space-y-2 text-xs text-[#5C554B]">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span><strong>Best Season:</strong> {dest.bestVisitingPeriod}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BE4D2A]" />
                        <span><strong>Impact:</strong> {dest.localEconomicImpact}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#8C8275] mb-1.5">
                        Responsible Travel Code:
                      </p>
                      <p className="text-xs text-[#3D3934] leading-relaxed bg-[#FAF7F0] p-3 rounded-xl border border-[#E2DAC9]">
                        {dest.responsibleTravelTips[0]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setSelectedRegion(`${dest.name} (${dest.state})`);
                      window.scrollTo({ top: 850, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#BE4D2A] hover:text-white border border-[#E2DAC9] text-xs font-serif-display uppercase font-bold tracking-wider text-[#1C1A17] transition-all"
                  >
                    Build Custom Itinerary →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Sustainable Itinerary Generator Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-xl space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10B981] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              AI Responsible Tour Planner
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1A17]">
              Generate Your Sustainable Heritage Itinerary
            </h2>
            <p className="text-sm text-[#5C554B] leading-relaxed">
              Select your preferred duration, cultural focus, and pace. Our engine crafts a low-impact day-by-day plan featuring verified eco-homestays and living artisan cooperatives.
            </p>
          </div>

          {/* Configuration Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#FAF7F0] border border-[#E2DAC9]">
            {/* Region */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8275] mb-2">
                Region / Heritage Hub
              </label>
              <select
                value={selectedRegion}
                onChange={e => setSelectedRegion(e.target.value)}
                className="w-full bg-[#FFFDF9] border border-[#E2DAC9] rounded-xl px-3 py-2.5 text-xs font-medium text-[#1C1A17] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="South India (Kaveri & Hampi Basin)">South India (Kaveri & Hampi)</option>
                <option value="Gujarat (Dholavira & Patan Artisans)">Gujarat (Dholavira & Patan)</option>
                <option value="Madhya Pradesh (Sanchi & Khajuraho)">Madhya Pradesh (Sanchi & Khajuraho)</option>
                <option value="Assam (Majuli Sattras & Brahmaputra)">Assam (Majuli & Brahmaputra)</option>
                <option value="Chhattisgarh (Bastar Forest Artisans)">Chhattisgarh (Bastar Forests)</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8275] mb-2">
                Duration (Days)
              </label>
              <div className="flex items-center gap-2">
                {[2, 3, 4, 5].map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold font-serif-display transition-all ${
                      duration === d
                        ? 'bg-[#BE4D2A] text-white shadow'
                        : 'bg-[#FFFDF9] border border-[#E2DAC9] text-[#1C1A17] hover:border-[#BE4D2A]'
                    }`}
                  >
                    {d}D
                  </button>
                ))}
              </div>
            </div>

            {/* Cultural Focus Theme */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8275] mb-2">
                Heritage Theme
              </label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value as any)}
                className="w-full bg-[#FFFDF9] border border-[#E2DAC9] rounded-xl px-3 py-2.5 text-xs font-medium text-[#1C1A17] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="Architecture & Temples">Architecture & Temples</option>
                <option value="Living Crafts & Artisans">Living Crafts & Master Artisans</option>
                <option value="Ancient Manuscripts & Philosophy">Ancient Manuscripts & Philosophy</option>
                <option value="Royal Forts & Palaces">Royal Forts & Palaces</option>
              </select>
            </div>

            {/* Pace */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8275] mb-2">
                Pace of Travel
              </label>
              <select
                value={pace}
                onChange={e => setPace(e.target.value as any)}
                className="w-full bg-[#FFFDF9] border border-[#E2DAC9] rounded-xl px-3 py-2.5 text-xs font-medium text-[#1C1A17] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="Immersive">Immersive & Mindful</option>
                <option value="Leisurely">Leisurely & Relaxed</option>
                <option value="Active">Active Exploration</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateItinerary}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#BE4D2A] via-[#C85A32] to-[#98381A] text-white font-serif-display text-sm uppercase font-bold tracking-wider shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Synthesizing Sustainable Itinerary...' : 'Generate AI Responsible Itinerary'}</span>
          </button>

          {/* Generated Plan Output Display */}
          {generatedPlan && (
            <div className="p-8 rounded-3xl bg-[#FAF7F0] border border-[#C5A059] shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E2DAC9] pb-6 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-bold">
                    {generatedPlan.estimatedCarbonImpact}
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1A17] mt-1">
                    {generatedPlan.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#1C1A17] text-[#E6CD92] border border-[#C5A059]">
                    Artisan Support Score: {generatedPlan.localArtisanSupportScore}%
                  </span>
                </div>
              </div>

              {/* Days Timeline Accordion / List */}
              <div className="space-y-6">
                {generatedPlan.days.map(day => (
                  <div
                    key={day.dayNumber}
                    className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-sm space-y-4"
                  >
                    <div className="flex items-center gap-3 border-b border-[#E2DAC9]/60 pb-3">
                      <span className="w-8 h-8 rounded-full bg-[#BE4D2A] text-white text-xs font-bold flex items-center justify-center">
                        D{day.dayNumber}
                      </span>
                      <h4 className="font-serif-display text-lg font-bold text-[#1C1A17]">
                        {day.title}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="font-bold text-[#BE4D2A] uppercase">Morning Horizon</span>
                        <p className="text-[#4A443C] leading-relaxed">{day.morningActivity}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-[#C5A059] uppercase">Afternoon Heritage</span>
                        <p className="text-[#4A443C] leading-relaxed">{day.afternoonActivity}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-[#10B981] uppercase">Evening Cultural Immersion</span>
                        <p className="text-[#4A443C] leading-relaxed">{day.eveningCulturalImmersion}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#E2DAC9]/60 text-xs">
                      <div className="bg-[#FAF7F0] p-3 rounded-xl">
                        <strong className="text-[#1C1A17]">Regional Organic Cuisine:</strong> {day.localCuisineRecommendation}
                      </div>
                      <div className="bg-[#FAF7F0] p-3 rounded-xl">
                        <strong className="text-[#10B981]">Responsible Travel Protocol:</strong> {day.responsibleTravelNote}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
