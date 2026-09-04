import React from 'react';
import { LeafletHeritageMap } from '../components/LeafletHeritageMap';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CULTURAL_CORRIDORS } from '../data/heritageData';
import { MapPin, Compass, Layers, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeritageMapPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Geospatial Heritage Map & Corridors' }]} />

      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#936B38]/10 text-[#936B38] text-xs font-mono uppercase tracking-wider font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Archaeological Atlas</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          Geospatial Heritage Map of India
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Explore UNESCO World Heritage monuments, ancient rock-cut excavations, sacred architecture, and master artisan clusters mapped with primary archaeological survey coordinates.
        </p>
      </div>

      {/* Main Functional Leaflet Map */}
      <LeafletHeritageMap />

      {/* Thematic Cultural Corridors Grid */}
      <div className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
            Historic Pilgrimage &amp; Trade Networks
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Thematic Cultural Corridors
          </h2>
          <p className="text-xs text-stone-500 max-w-2xl leading-relaxed">
            Curated trans-regional corridors connecting tangible stone monuments with centuries-old living craft guilds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CULTURAL_CORRIDORS.map(corridor => (
            <div
              key={corridor.id}
              className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3 flex flex-col justify-between hover:border-[#936B38]/50 transition-colors"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#936B38] font-bold uppercase block">
                  {corridor.region}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {corridor.name}
                </h3>
                <p className="text-xs font-medium text-[#A64B2A]">
                  {corridor.highlight}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {corridor.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-1.5 text-[11px] text-stone-500 font-mono">
                <div className="flex items-center gap-1.5 font-medium text-stone-700">
                  <MapPin className="w-3.5 h-3.5 text-[#936B38] shrink-0" />
                  <span className="truncate">{corridor.unescoSites}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{corridor.artisanGuilds}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsible Visiting Guidelines Notice */}
      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7D6C0] flex items-start gap-4">
        <Info className="w-5 h-5 text-[#936B38] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-stone-700 leading-relaxed">
          <strong className="text-stone-900 block font-serif text-sm">
            Ethical Visitor &amp; Conservation Note
          </strong>
          <p>
            VirasatX coordinates reflect primary survey datum from the Archaeological Survey of India (ASI). Visitors to delicate excavated zones (such as Ajanta or Dholavira) are reminded to observe local heritage preservation laws: do not touch ancient rock reliefs or plaster pigments, avoid flash photography inside caves, and support local community artisan guilds directly.
          </p>
        </div>
      </div>
    </div>
  );
};
