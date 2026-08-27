'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Compass } from 'lucide-react';
import { HeritageRegion } from '@/types';
import { ARTIFACTS_DATA } from '@/data/artifactsData';

export default function RegionExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<HeritageRegion>('South');

  const regions: { id: HeritageRegion; name: string; hindi: string; states: string; description: string }[] = [
    {
      id: 'North',
      name: 'North India',
      hindi: 'उत्तर भारत',
      states: 'Jammu & Kashmir, Himachal, Punjab, Haryana, Uttar Pradesh, Uttarakhand, Delhi',
      description: 'Himalayan monasteries, Kashmiri Kani shawls, Sarnath Ashoka edicts, and the living spiritual ghats of Varanasi.'
    },
    {
      id: 'South',
      name: 'South India',
      hindi: 'दक्षिण भारत',
      states: 'Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana',
      description: 'Chola lost-wax panchaloha bronzes, Brihadisvara granite towers, Vijayanagara Hampi, and Kathakali dance-theatre.'
    },
    {
      id: 'East',
      name: 'East India',
      hindi: 'पूर्वी भारत',
      states: 'Bihar, Odisha, West Bengal, Jharkhand',
      description: 'Nalanda ancient university, Konark Sun Temple sundials, Puri Pattachitra scrolls, and Didarganj Yakshi sculptures.'
    },
    {
      id: 'West',
      name: 'West India',
      hindi: 'पश्चिम भारत',
      states: 'Maharashtra, Gujarat, Rajasthan, Goa',
      description: 'Ajanta Buddhist rock frescoes, Ellora Kailasa monolith, Patan Patola double-ikat, and Dholavira Harappan citadel.'
    },
    {
      id: 'Central',
      name: 'Central India',
      hindi: 'मध्य भारत',
      states: 'Madhya Pradesh, Chhattisgarh',
      description: 'Sanchi Great Stupa toranas, Khajuraho temples, and Bastar tribal Dhokra lost-wax metallurgy.'
    },
    {
      id: 'Northeast',
      name: 'Northeast India',
      hindi: 'पूर्वोत्तर भारत',
      states: 'Assam, Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Sikkim',
      description: 'Majuli river island Sattras, Sattriya classical dance, sacred living root bridges, and indigenous weaving traditions.'
    }
  ];

  const currentRegionMeta = regions.find(r => r.id === selectedRegion) || regions[1];
  const regionArtifacts = ARTIFACTS_DATA.filter(a => a.region === selectedRegion);

  return (
    <section className="w-full py-20 bg-[#F4EFE6] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans uppercase font-bold tracking-widest text-[#9A3412] mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Geographic Heritage Atlas</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1A17]">
              Explore by Region
            </h2>
            <p className="font-serif-editorial text-lg text-[#57534E] mt-1 max-w-xl">
              Discover cultural heritage across the six geographic regions of the Indian subcontinent.
            </p>
          </div>

          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#9A3412] hover:text-[#7C2D12] group"
          >
            <span>Open Interactive Heritage Map</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {regions.map(r => {
            const isSelected = selectedRegion === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#9A3412] text-white shadow-sm'
                    : 'bg-[#FFFFFF] text-[#44403C] border border-[#E7E1D4] hover:border-[#9A3412]/50 hover:bg-[#FBF9F4]'
                }`}
              >
                <span>{r.name}</span>
                <span className={`text-[10px] ml-1 opacity-75 ${isSelected ? 'text-white' : 'text-[#78716C]'}`}>
                  ({r.hindi})
                </span>
              </button>
            );
          })}
        </div>

        {/* Region Card */}
        <div className="bg-[#FFFFFF] border border-[#E7E1D4] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E1D4] gap-2">
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-[#1C1A17]">
                {currentRegionMeta.name}
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                {currentRegionMeta.states}
              </p>
            </div>
            <Link
              href={`/map?region=${selectedRegion}`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FBF9F4] border border-[#E7E1D4] text-xs font-sans font-medium text-[#9A3412] hover:bg-[#F4EFE6] self-start sm:self-auto"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Locate on Map</span>
            </Link>
          </div>

          <p className="text-sm text-[#44403C] leading-relaxed">
            {currentRegionMeta.description}
          </p>

          {/* Regional Artifacts Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                Curated Artifacts from {currentRegionMeta.name}:
              </span>
              <Link href={`/explore?region=${selectedRegion}`} className="text-xs font-semibold text-[#9A3412] hover:underline">
                View all in {currentRegionMeta.name} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionArtifacts.slice(0, 3).map(art => (
                <Link
                  key={art.id}
                  href={`/artifact/${art.id}`}
                  className="group rounded-xl border border-[#E7E1D4] overflow-hidden bg-[#FBF9F4] hover:border-[#9A3412]/50 hover:bg-[#FFFFFF] transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-white/90 text-[#44403C] shadow-sm">
                      {art.category}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-serif-display text-base font-bold text-[#1C1A17] group-hover:text-[#9A3412] transition-colors line-clamp-1">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#78716C]">
                      {art.period} • {art.location}, {art.state}
                    </p>
                    <div className="pt-2 border-t border-[#E7E1D4] flex items-center justify-between text-xs font-semibold text-[#9A3412]">
                      <span>Examine Artifact</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
