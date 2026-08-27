'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Layers } from 'lucide-react';

export default function FeaturedCollections() {
  const collections = [
    {
      title: 'Ancient Sculptures',
      hindiTitle: 'प्राचीन मूर्तियां एवं धातु शिल्प',
      category: 'Sculptures',
      description: 'Lost-wax Chola bronzes, Mauryan mirror-polished sandstone, and Gandharan Bodhisattvas.',
      imageUrl: 'https://images.unsplash.com/photo-1599818458999-f2c9e782e2c3?auto=format&fit=crop&w=800&q=80',
      count: '320+ Items',
      accentColor: 'from-[#BE4D2A]',
    },
    {
      title: 'Classical Paintings',
      hindiTitle: 'शास्त्रीय भित्तिचित्र एवं लघुचित्र',
      category: 'Paintings',
      description: 'Ajanta rock frescoes, Mughal court miniatures, Thanjavur gold-leaf and Madhubani scrolls.',
      imageUrl: 'https://images.unsplash.com/photo-1590059390046-52c6755490a6?auto=format&fit=crop&w=800&q=80',
      count: '450+ Items',
      accentColor: 'from-[#C5A059]',
    },
    {
      title: 'Sacred Manuscripts',
      hindiTitle: 'प्राचीन तालपत्र एवं भोजपत्र पाण्डुलिपियां',
      category: 'Manuscripts',
      description: 'Rigveda Sharada codices, Kautilya’s Arthashastra on palm leaf, and golden Kalpasutras.',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      count: '180+ Items',
      accentColor: 'from-[#6366F1]',
    },
    {
      title: 'Temple Architecture',
      hindiTitle: 'भव्य भारतीय मंदिर वास्तुकला',
      category: 'Architecture',
      description: 'Monolithic Kailasa at Ellora, Dravidian granite vimanas of Thanjavur, and Konark sundials.',
      imageUrl: 'https://images.unsplash.com/photo-1588096344356-9a2a9cf2996d?auto=format&fit=crop&w=800&q=80',
      count: '240+ Items',
      accentColor: 'from-[#DE7525]',
    },
    {
      title: 'Folk Traditions & Dance',
      hindiTitle: 'लोक कला, शास्त्रीय संगीत एवं नृत्य',
      category: 'Dance',
      description: 'Kathakali kireedam masks, Bastar Dhokra casting, and 4,000-year unbroken tribal lore.',
      imageUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80',
      count: '190+ Items',
      accentColor: 'from-[#10B981]',
    },
    {
      title: 'Textiles & Royal Crafts',
      hindiTitle: 'शाही वस्त्र, पश्मीना एवं धातु इनले',
      category: 'Textiles',
      description: 'Kashmiri Kani pashmina, Patan Patola double ikat, Bidriware silver, and Varanasi zari.',
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      count: '210+ Items',
      accentColor: 'from-[#BE4D2A]',
    },
  ];

  return (
    <section className="w-full py-24 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-serif-display uppercase font-bold tracking-widest text-[#BE4D2A] mb-2">
              <Layers className="w-4 h-4" />
              <span>Curated Horizons</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1A17]">
              Featured Collections
            </h2>
            <p className="font-serif-editorial text-lg sm:text-xl text-[#5C554B] mt-2 max-w-xl">
              Immerse yourself in specialized thematic galleries spanning six monumental pillars of Indian artistic expression.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFDF9] border border-[#E2DAC9] hover:border-[#BE4D2A] text-xs font-serif-display uppercase font-bold tracking-wider text-[#1C1A17] hover:text-[#BE4D2A] transition-all shadow-sm group"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map(col => (
            <Link
              key={col.title}
              href={`/explore?category=${encodeURIComponent(col.category)}`}
              className="group relative rounded-2xl overflow-hidden bg-[#FFFDF9] border border-[#E2DAC9] shadow-md hover:shadow-2xl hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-64 overflow-hidden bg-stone-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.imageUrl}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88] group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141311]/90 via-[#141311]/30 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-[#1C1A17]/80 text-[#E6CD92] border border-[#C5A059]/40 backdrop-blur-sm">
                  {col.count}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-[#E6CD92] font-serif-display font-medium mb-1">
                    {col.hindiTitle}
                  </p>
                  <h3 className="font-serif-display text-xl font-bold text-white group-hover:text-[#E6CD92] transition-colors">
                    {col.title}
                  </h3>
                </div>
              </div>

              {/* Description Body */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-[#FFFDF9]">
                <p className="text-sm text-[#4A443C] leading-relaxed mb-4">
                  {col.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E2DAC9]/60 text-xs font-serif-display font-bold uppercase tracking-wider text-[#BE4D2A] group-hover:text-[#98381A]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
