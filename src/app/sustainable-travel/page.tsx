'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Leaf, Compass, Shield, Users, Sparkles, Calendar,
  MapPin, Check, Heart, Award, ArrowRight, ShieldCheck, Info
} from 'lucide-react';
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
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Header Banner */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#15803D] text-xs font-sans font-medium">
            <Leaf className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Responsible Heritage Travel</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Responsible Heritage Travel
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] max-w-2xl">
            Guidelines and curated itineraries to protect historic monuments from overtourism while supporting hereditary artisan communities and local heritage trusts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Featured Sustainable Heritage Destinations */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                Conservation & Visitor Guidelines
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
                Featured Heritage Destinations
              </h2>
            </div>
            <span className="text-xs text-[#78716C]">
              Curated travel guidelines for low-impact cultural exploration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUSTAINABLE_DESTINATIONS.map(dest => (
              <div
                key={dest.id}
                className="group rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm hover:shadow-md hover:border-[#9A3412]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#FFFFFF]/90 text-[#15803D] border border-[#E7E1D4] shadow-sm">
                      {dest.environmentalSensitivity}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[11px] font-mono text-[#78716C]">{dest.state} • {dest.region} India</span>
                      <h3 className="font-serif-display text-lg font-bold text-[#1C1917] mt-0.5">
                        {dest.name}
                      </h3>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#57534E]">
                      <div>
                        <strong>Best Visiting Season:</strong> {dest.bestVisitingPeriod}
                      </div>
                      <div>
                        <strong>Local Impact:</strong> {dest.localEconomicImpact}
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] mb-1">
                        Responsible Travel Guideline:
                      </p>
                      <p className="text-xs text-[#44403C] leading-relaxed bg-[#FBF9F4] p-3 rounded-xl border border-[#E7E1D4]">
                        {dest.responsibleTravelTips[0]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setSelectedRegion(`${dest.name} (${dest.state})`);
                      window.scrollTo({ top: 750, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#FBF9F4] hover:bg-[#9A3412] hover:text-white border border-[#E7E1D4] text-xs font-sans font-semibold text-[#1C1917] transition-all"
                  >
                    Build Travel Itinerary →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Itinerary Builder */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#15803D] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Itinerary Planner
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Generate a Mindful Heritage Itinerary
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Select your preferred duration, cultural focus, and pace. Virasat AI generates a low-impact day-by-day exploration plan connected to regional artisans and heritage sites.
            </p>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4]">
            {/* Region */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                Region / Hub
              </label>
              <select
                value={selectedRegion}
                onChange={e => setSelectedRegion(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E1D4] rounded-lg px-3 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                Duration
              </label>
              <div className="flex items-center gap-2">
                {[2, 3, 4, 5].map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      duration === d
                        ? 'bg-[#9A3412] text-white shadow-sm'
                        : 'bg-[#FFFFFF] border border-[#E7E1D4] text-[#1C1917] hover:border-[#9A3412]'
                    }`}
                  >
                    {d}D
                  </button>
                ))}
              </div>
            </div>

            {/* Cultural Focus */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                Cultural Focus
              </label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value as any)}
                className="w-full bg-[#FFFFFF] border border-[#E7E1D4] rounded-lg px-3 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
              >
                <option value="Architecture & Temples">Architecture & Temples</option>
                <option value="Living Crafts & Artisans">Living Crafts & Artisans</option>
                <option value="Ancient Manuscripts & Philosophy">Ancient Manuscripts & Philosophy</option>
                <option value="Royal Forts & Palaces">Royal Forts & Palaces</option>
              </select>
            </div>

            {/* Pace */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                Pace
              </label>
              <select
                value={pace}
                onChange={e => setPace(e.target.value as any)}
                className="w-full bg-[#FFFFFF] border border-[#E7E1D4] rounded-lg px-3 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
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
            className="w-full py-3.5 rounded-xl bg-[#9A3412] hover:bg-[#7C2D12] text-white font-sans text-xs uppercase font-bold tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Synthesizing Itinerary...' : 'Generate Heritage Itinerary'}</span>
          </button>

          {/* Generated Plan Output Display */}
          {generatedPlan && (
            <div className="p-6 rounded-2xl bg-[#FBF9F4] border border-[#E7E1D4] space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E7E1D4] pb-4 gap-2">
                <div>
                  <span className="text-xs font-mono text-[#15803D] font-bold">
                    {generatedPlan.estimatedCarbonImpact}
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#1C1917] mt-0.5">
                    {generatedPlan.title}
                  </h3>
                </div>

                <span className="text-xs font-sans bg-[#FFFFFF] text-[#9A3412] px-3 py-1 rounded-full border border-[#E7E1D4]">
                  {generatedPlan.days.length}-Day Plan
                </span>
              </div>

              {/* Days List */}
              <div className="space-y-4">
                {generatedPlan.days.map(day => (
                  <div
                    key={day.dayNumber}
                    className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm space-y-3"
                  >
                    <div className="flex items-center gap-2.5 border-b border-[#E7E1D4] pb-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#9A3412] text-white text-xs font-bold flex items-center justify-center">
                        D{day.dayNumber}
                      </span>
                      <h4 className="font-serif-display text-base font-bold text-[#1C1917]">
                        {day.title}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <strong className="text-[#9A3412] block mb-1">Morning:</strong>
                        <p className="text-[#44403C] leading-relaxed">{day.morningActivity}</p>
                      </div>
                      <div>
                        <strong className="text-[#B45309] block mb-1">Afternoon:</strong>
                        <p className="text-[#44403C] leading-relaxed">{day.afternoonActivity}</p>
                      </div>
                      <div>
                        <strong className="text-[#15803D] block mb-1">Evening Immersion:</strong>
                        <p className="text-[#44403C] leading-relaxed">{day.eveningCulturalImmersion}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E7E1D4] text-xs text-[#57534E] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span><strong>Cuisine:</strong> {day.localCuisineRecommendation}</span>
                      <span className="text-[#15803D]"><strong>Etiquette:</strong> {day.responsibleTravelNote}</span>
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
