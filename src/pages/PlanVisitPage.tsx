import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Leaf, Calendar, MapPin, Sparkles, CheckCircle, AlertTriangle, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PlanVisitPage: React.FC = () => {
  const [destination, setDestination] = useState('Thanjavur & Kaveri Delta');
  const [duration, setDuration] = useState('3 Days');
  const [interest, setInterest] = useState('Architecture & Bronze Guilds');
  const [isGenerated, setIsGenerated] = useState(false);

  const sampleDestinations = [
    'Thanjavur & Kaveri Delta (Tamil Nadu)',
    'Varanasi & Sarnath (Uttar Pradesh)',
    'Hampi & Badami (Karnataka)',
    'Ellora & Ajanta (Maharashtra)',
    'Konark & Puri (Odisha)'
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Responsible Cultural Tourism Planner' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          <span>SDG 11 &amp; Anti-Overtourism Framework</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Responsible Cultural Visit Planner
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Design respectful, low-impact travel itineraries that protect fragile archaeological monuments, bypass crowded peak hours, and channel direct economic support to GI-certified master artisan cooperatives.
        </p>
      </div>

      {/* Input Planning Form */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Cultural Corridor
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#936B38]"
            >
              {sampleDestinations.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Available Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#936B38]"
            >
              <option value="1 Day">1 Day (Highlights)</option>
              <option value="2 Days">2 Days (Immersive)</option>
              <option value="3 Days">3 Days (Comprehensive)</option>
              <option value="5 Days">5 Days (Scholarly Circuit)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Primary Focus
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#936B38]"
            >
              <option value="Architecture & Bronze Guilds">Temple Architecture &amp; Craft Guilds</option>
              <option value="Archaeology & Manuscripts">Archaeological Excavations &amp; Manuscripts</option>
              <option value="Living Traditions & Weaving">Living Traditions &amp; Handlooms</option>
            </select>
          </div>

          <div className="sm:col-span-3 pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-[#936B38] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Responsible Itinerary</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Itinerary Plan */}
      <div className="space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs font-mono text-[#936B38] font-bold uppercase">
                Curated Travel Blueprint
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                {destination} — {duration}
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              Overtourism Mitigation Verified
            </span>
          </div>

          {/* Day-by-Day Suggestions */}
          <div className="space-y-4 divide-y divide-stone-100 text-xs sm:text-sm text-stone-700">
            <div className="pt-4 first:pt-0 space-y-2">
              <span className="font-bold text-stone-900 text-sm block">
                Day 1: Monumental Dawn &amp; Structural Stone Architecture
              </span>
              <p className="text-stone-600 leading-relaxed">
                Visit the central monument (e.g. Brihadisvara Vimana) at early sunrise (06:30–08:30) to experience optimal natural ambient lighting, avoid heat exhaustion, and reduce footfall during midday peak carrying-capacity windows.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600">
                <strong>Curatorial Focus:</strong> Observe interlocking granite joints without mortar and inspect base epigraphs recording royal dance endowments.
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <span className="font-bold text-stone-900 text-sm block">
                Day 2: Living Craft Guilds &amp; Direct Artisan Patronage
              </span>
              <p className="text-stone-600 leading-relaxed">
                Travel to authorized artisan cluster foundries (e.g. Swamimalai Bronze Workshops). Observe the cire-perdue lost-wax casting process and purchase directly from certified cooperative depots.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600">
                <strong>Ethical Note:</strong> Respect workshop working hours. Obtain permission before photographing hereditary sthapatis at work.
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <span className="font-bold text-stone-900 text-sm block">
                Day 3: Lesser-Known Satellite Monuments &amp; Rural Economy
              </span>
              <p className="text-stone-600 leading-relaxed">
                Disperse foot traffic to lesser-visited secondary monuments (e.g. Gangaikonda Cholapuram or Darasuram Airavatesvara). Support regional heritage homestays and traditional vegetarian dining establishments.
              </p>
            </div>
          </div>

          {/* Mandatory Responsible Travel Warning */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Mandatory Travel Verification Disclaimer</span>
            </div>
            <p>
              “Verify opening hours, tickets and local restrictions with official Archaeological Survey of India (ASI) or state tourism portals before travelling.” VirasatX does not invent private phone numbers, ticket pricing, or guaranteed workshop access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
