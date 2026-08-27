'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';

export default function FeaturedCollections() {
  const collections = [
    {
      title: 'Ancient Sculptures',
      category: 'Sculptures',
      description: 'Lost-wax Chola bronzes, Mauryan polished sandstone, and classical stone icons.',
      imageUrl: 'https://images.unsplash.com/photo-1599818458999-f2c9e782e2c3?auto=format&fit=crop&w=800&q=80',
      count: '320+ items',
    },
    {
      title: 'Classical Paintings',
      category: 'Paintings',
      description: 'Ajanta rock frescoes, Mughal court miniatures, Thanjavur gold-leaf and Pattachitra scrolls.',
      imageUrl: 'https://images.unsplash.com/photo-1590059390046-52c6755490a6?auto=format&fit=crop&w=800&q=80',
      count: '450+ items',
    },
    {
      title: 'Sacred Manuscripts',
      category: 'Manuscripts',
      description: 'Rigveda Sharada codices, Kautilya’s Arthashastra on palm leaf, and golden Kalpasutras.',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      count: '180+ items',
    },
    {
      title: 'Temple Architecture',
      category: 'Architecture',
      description: 'Monolithic Kailasa at Ellora, Dravidian granite vimanas of Thanjavur, and Konark sundials.',
      imageUrl: 'https://images.unsplash.com/photo-1588096344356-9a2a9cf2996d?auto=format&fit=crop&w=800&q=80',
      count: '240+ items',
    },
    {
      title: 'Folk Traditions',
      category: 'Dance',
      description: 'Kathakali dance-theatre kireedam masks, Bastar Dhokra casting, and living tribal heritage.',
      imageUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80',
      count: '190+ items',
    },
    {
      title: 'Textiles & Crafts',
      category: 'Textiles',
      description: 'Kashmiri Kani pashmina, Patan Patola double ikat, Bidriware silver, and Varanasi zari.',
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      count: '210+ items',
    },
  ];

  return (
    <section id="collections" className="w-full py-20 bg-[#FBF9F4] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans uppercase font-bold tracking-widest text-[#9A3412] mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Curated Galleries</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Featured Collections
            </h2>
            <p className="font-serif-editorial text-lg text-[#57534E] mt-1 max-w-xl">
              Browse dedicated curations spanning six fundamental disciplines of Indian artistic and intellectual heritage.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#9A3412] hover:text-[#7C2D12] group"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Clean Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map(col => (
            <Link
              key={col.title}
              href={`/explore?category=${encodeURIComponent(col.category)}`}
              className="group rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm hover:shadow-md hover:border-[#9A3412]/50 transition-all flex flex-col justify-between"
            >
              {/* Image Container with Natural Framing */}
              <div className="relative h-60 overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.imageUrl}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-md text-[11px] font-sans font-medium bg-[#FFFFFF]/90 text-[#44403C] shadow-sm border border-[#E7E1D4]">
                  {col.count}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#1C1917] group-hover:text-[#9A3412] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed mt-1.5">
                    {col.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E1D4] flex items-center justify-between text-xs font-sans font-semibold text-[#9A3412]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
