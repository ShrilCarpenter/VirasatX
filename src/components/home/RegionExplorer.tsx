'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Compass } from 'lucide-react';
import { HeritageRegion } from '@/types';
import { ARTIFACTS_DATA } from '@/data/artifactsData';

export default function RegionExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<HeritageRegion>('South');

  const regions: {
    id: HeritageRegion;
    name: string;
    hindi: string;
    states: string;
    description: string;
    bannerImageUrl: string;
  }[] = [
    {
      id: 'North',
      name: 'North India',
      hindi: 'उत्तर भारत',
      states: 'Jammu & Kashmir, Himachal, Punjab, Haryana, Uttar Pradesh, Uttarakhand, Delhi',
      description: 'Himalayan monasteries, Kashmiri Kani shawls, Sarnath Ashoka edicts, and the living spiritual ghats of Varanasi.',
      bannerImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'South',
      name: 'South India',
      hindi: 'दक्षिण भारत',
      states: 'Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana',
      description: 'Chola lost-wax panchaloha bronzes, Brihadisvara granite towers, Vijayanagara Hampi, and Kathakali dance-theatre.',
      bannerImageUrl: 'https://images.unsplash.com/photo-1599818458999-f2c9e782e2c3?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'East',
      name: 'East India',
      hindi: 'पूर्वी भारत',
      states: 'Bihar, Odisha, West Bengal, Jharkhand',
      description: 'Nalanda ancient university, Konark Sun Temple sundials, Puri Pattachitra scrolls, and Didarganj Yakshi sculptures.',
      bannerImageUrl: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'West',
      name: 'West India',
      hindi: 'पश्चिम भारत',
      states: 'Maharashtra, Gujarat, Rajasthan, Goa',
      description: 'Ajanta Buddhist rock frescoes, Ellora Kailasa monolith, Patan Patola double-ikat, and Dholavira Harappan citadel.',
      bannerImageUrl: 'https://images.unsplash.com/photo-1590059390046-52c6755490a6?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'Central',
      name: 'Central India',
      hindi: 'मध्य भारत',
      states: 'Madhya Pradesh, Chhattisgarh',
      description: 'Sanchi Great Stupa toranas, Khajuraho temples, and Bastar tribal Dhokra lost-wax metallurgy.',
      bannerImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'Northeast',
      name: 'Northeast India',
      hindi: 'पूर्वोत्तर भारत',
      states: 'Assam, Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Sikkim',
      description: 'Majuli river island Sattras, Sattriya classical dance, sacred living root bridges, and indigenous weaving traditions.',
      bannerImageUrl: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const currentRegionMeta = regions.find(r => r.id === selectedRegion) || regions[1];
  const regionArtifacts = ARTIFACTS_DATA.filter(a => a.region === selectedRegion);

  return (
    <section className="w-full py-20 sm:py-24 bg-[#F4EFE6] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans uppercase font-bold tracking-widest text-[#9A3412] mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Geographic Heritage Atlas</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Explore by Region
            </h2>
            <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] mt-1 max-w-2xl">
              Discover archaeological sites, sculpture schools, and living traditions across India’s six cultural regions.
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

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          {regions.map(r => {
            const isSelected = selectedRegion === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#9A3412] text-white shadow-sm'
                    : 'bg-[#FFFFFF] text-[#44403C] border border-[#E7E1D4] hover:border-[#9A3412]/50 hover:bg-[#FBF9F4]'
                }`}
              >
                <span>{r.name}</span>
                <span className={`text-[10px] ml-1.5 opacity-80 ${isSelected ? 'text-white' : 'text-[#78716C]'}`}>
                  ({r.hindi})
                </span>
              </button>
            );
          })}
        </div>

        {/* Region Card with Visual Banner */}
        <div className="bg-[#FFFFFF] border border-[#E7E1D4] rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
          
          {/* Header & Regional Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-[#E7E1D4]">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  {currentRegionMeta.name}
                </h3>
                <span className="text-xs font-sans font-medium px-2.5 py-0.5 rounded-full bg-[#F4EFE6] text-[#9A3412] border border-[#E7E1D4]">
                  {currentRegionMeta.hindi}
                </span>
              </div>
              <p className="text-xs text-[#78716C]">
                {currentRegionMeta.states}
              </p>
              <p className="text-sm text-[#44403C] leading-relaxed pt-1">
                {currentRegionMeta.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href={`/map?region=${selectedRegion}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FBF9F4] hover:bg-[#F4EFE6] border border-[#E7E1D4] text-xs font-sans font-semibold text-[#9A3412] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Locate Sites on Map</span>
              </Link>
            </div>
          </div>

          {/* Regional Artifacts Gallery */}
          <div>
            <div className="flex items-center justify-between mb-5">
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
                  <div className="relative h-52 overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-white/90 text-[#44403C] shadow-sm">
                      {art.category}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-serif-display text-base font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors line-clamp-1">
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
