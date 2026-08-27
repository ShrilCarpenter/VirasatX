'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { HeritageRegion } from '@/types';
import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { HERITAGE_MAP_SITES } from '@/data/heritageMapData';

export default function RegionExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<HeritageRegion>('South');

  const regions: { id: HeritageRegion; name: string; hindi: string; states: string; description: string }[] = [
    {
      id: 'North',
      name: 'North India',
      hindi: 'उत्तर भारत',
      states: 'Jammu & Kashmir, Himachal, Punjab, Haryana, UP, Uttarakhand, Delhi',
      description: 'Himalayan monasteries, Kashmiri Kani shawls, Sarnath Ashoka edicts, Vedic riverbanks, and Mughal monumental marble.'
    },
    {
      id: 'South',
      name: 'South India',
      hindi: 'दक्षिण भारत',
      states: 'Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana',
      description: 'Chola lost-wax bronzes, Brihadisvara granite towers, Vijayanagara Hampi, Kathakali dance-theatre, and Mysore Bidriware.'
    },
    {
      id: 'East',
      name: 'East India',
      hindi: 'पूर्वी भारत',
      states: 'Bihar, Odisha, West Bengal, Jharkhand',
      description: 'Nalanda Buddhist university, Konark Sun Temple sundials, Puri Pattachitra scrolls, and Didarganj Yakshi sculptures.'
    },
    {
      id: 'West',
      name: 'West India',
      hindi: 'पश्चिम भारत',
      states: 'Maharashtra, Gujarat, Rajasthan, Goa',
      description: 'Ajanta rock frescoes, Ellora Kailasa monolith, Patan Patola double-ikat, Dholavira Harappan citadel, and desert Rogan art.'
    },
    {
      id: 'Central',
      name: 'Central India',
      hindi: 'मध्य भारत',
      states: 'Madhya Pradesh, Chhattisgarh',
      description: 'Sanchi Buddhist toranas, Khajuraho temples, Bastar tribal Dhokra lost-wax metallurgy, and Bhimbetka prehistoric shelters.'
    },
    {
      id: 'Northeast',
      name: 'Northeast India',
      hindi: 'पूर्वोत्तर भारत',
      states: 'Assam, Meghalaya, Arunachal, Nagaland, Manipur, Mizoram, Tripura, Sikkim',
      description: 'Majuli river island Sattras, Sattriya classical dance, sacred living root bridges, Muga golden silk, and tribal weaving lore.'
    }
  ];

  const currentRegionMeta = regions.find(r => r.id === selectedRegion) || regions[1];
  const regionArtifacts = ARTIFACTS_DATA.filter(a => a.region === selectedRegion);
  const regionSites = HERITAGE_MAP_SITES.filter(s => s.region === selectedRegion);

  return (
    <section className="w-full py-24 bg-[#F4EFE2] border-t border-[#E2DAC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-serif-display uppercase font-bold tracking-widest text-[#BE4D2A] mb-2">
            <Compass className="w-4 h-4" />
            <span>Geographic Heritage Atlas</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1A17]">
            Explore by Region
          </h2>
          <p className="font-serif-editorial text-lg sm:text-xl text-[#5C554B] mt-2">
            Navigate the extraordinary cultural diversity across all six geographic zones of the Indian subcontinent.
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {regions.map(r => {
            const isSelected = selectedRegion === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-serif-display uppercase font-bold tracking-wider transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#1C1A17] text-[#E6CD92] shadow-md scale-105 border border-[#C5A059]'
                    : 'bg-[#FFFDF9] text-[#3D3934] border border-[#E2DAC9] hover:border-[#C5A059] hover:bg-[#FAF7F0]'
                }`}
              >
                <span>{r.name}</span>
                <span className={`text-[10px] ml-1.5 opacity-80 ${isSelected ? 'text-[#E6CD92]' : 'text-[#8C8275]'}`}>
                  ({r.hindi})
                </span>
              </button>
            );
          })}
        </div>

        {/* Region Content Display Card */}
        <div className="bg-[#FFFDF9] border border-[#E2DAC9] rounded-2xl p-6 sm:p-10 shadow-lg space-y-8">
          {/* Overview Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E2DAC9]/80 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1A17]">
                  {currentRegionMeta.name}
                </h3>
                <span className="text-sm font-serif-display font-medium text-[#BE4D2A]">
                  {currentRegionMeta.hindi}
                </span>
              </div>
              <p className="text-xs text-[#8C8275] font-mono mt-1">
                States: {currentRegionMeta.states}
              </p>
            </div>

            <Link
              href={`/map?region=${selectedRegion}`}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF7F0] border border-[#C5A059] text-xs font-serif-display font-bold uppercase tracking-wider text-[#BE4D2A] hover:bg-[#BE4D2A] hover:text-white transition-all shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open on Heritage Map</span>
            </Link>
          </div>

          <p className="text-base text-[#3D3934] leading-relaxed">
            {currentRegionMeta.description}
          </p>

          {/* Featured Regional Artifacts Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C8275]">
                Masterpiece Artifacts from {currentRegionMeta.name} ({regionArtifacts.length} Catalogued)
              </h4>
              <Link href={`/explore?region=${selectedRegion}`} className="text-xs font-semibold text-[#BE4D2A] hover:underline">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionArtifacts.slice(0, 3).map(art => (
                <Link
                  key={art.id}
                  href={`/artifact/${art.id}`}
                  className="group rounded-xl border border-[#E2DAC9] overflow-hidden bg-[#FAF7F0] hover:border-[#BE4D2A] hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden bg-stone-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#1C1A17]/80 text-[#E6CD92] border border-[#C5A059]/40">
                      {art.category}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-serif-display text-base font-bold text-[#1C1A17] group-hover:text-[#BE4D2A] transition-colors line-clamp-1">
                        {art.title}
                      </h5>
                      <p className="text-xs text-[#8C8275] mt-1">
                        {art.period} • {art.location}, {art.state}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[#E2DAC9]/60 flex items-center justify-between text-xs font-semibold text-[#BE4D2A]">
                      <span>Inspect Artifact</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
