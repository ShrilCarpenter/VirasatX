'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { ARTIFACTS_DATA } from '@/data/artifactsData';

export default function FeaturedCollections() {
  const getCategoryCount = (cat: string) => {
    return ARTIFACTS_DATA.filter(a => a.category === cat).length;
  };

  const collections = [
    {
      title: 'Ancient Sculptures',
      category: 'Sculptures',
      description: 'Lost-wax Chola bronzes, Mauryan polished sandstone, and classical stone icons.',
      imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shiva_as_the_Lord_of_Dance_LACMA_edit.jpg',
      count: `${getCategoryCount('Sculptures')} Curated Exhibits`,
      periodTag: '10th Century BCE – 13th Century CE'
    },
    {
      title: 'Classical Paintings',
      category: 'Paintings',
      description: 'Ajanta rock cave frescoes, Mughal court miniatures, and Thanjavur gold-leaf works.',
      imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ajanta_Padmapani.jpg',
      count: `${getCategoryCount('Paintings')} Curated Exhibits`,
      periodTag: '2nd Century BCE – 18th Century CE'
    },
    {
      title: 'Sacred Manuscripts',
      category: 'Manuscripts',
      description: 'Rigveda Sharada codices on birch bark and Kautilya’s Arthashastra on palm leaf.',
      imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rigveda_MS2097.jpg',
      count: `${getCategoryCount('Manuscripts')} Curated Exhibits`,
      periodTag: 'Vedic Composition – Medieval Archives'
    },
    {
      title: 'Temple Architecture',
      category: 'Architecture',
      description: 'Monolithic Kailasa at Ellora, Dravidian granite vimanas, and Konark stone sundials.',
      imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kailasha_temple_at_ellora.JPG',
      count: `${getCategoryCount('Architecture')} Curated Exhibits`,
      periodTag: '3rd Century BCE – 16th Century CE'
    },
    {
      title: 'Folk Traditions',
      category: 'Dance',
      description: 'Kathakali ritual kireedam masks, Bastar Dhokra casting, and sacred performing arts.',
      imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kathakali_dancer.jpg',
      count: `${getCategoryCount('Dance')} Curated Exhibits`,
      periodTag: 'Ancient – Living Heritage Traditions'
    },
    {
      title: 'Textiles & Crafts',
      category: 'Textiles',
      description: 'Kashmiri Kani pashmina, Patan Patola double ikat, and Bidriware pure silver inlays.',
      imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Patan_Patola_Silk_Saree.jpg',
      count: `${getCategoryCount('Textiles')} Curated Exhibits`,
      periodTag: 'Hereditary GI Guild Lineages'
    },
  ];

  return (
    <section id="collections" className="w-full py-20 sm:py-24 bg-[#FBF9F4] border-b border-[#E7E1D4]">
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
            <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] mt-1 max-w-2xl">
              Dedicated galleries spanning six fundamental disciplines of Indian artistic, sculptural, and manuscript heritage.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#9A3412] hover:text-[#7C2D12] group"
          >
            <span>Explore All Museum Collections</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Large Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map(col => (
            <Link
              key={col.title}
              href={`/explore?category=${encodeURIComponent(col.category)}`}
              className="group rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm hover:shadow-md hover:border-[#9A3412]/50 transition-all flex flex-col justify-between"
            >
              {/* Large Image Container (Occupies ~70% of Card) */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.imageUrl}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.97]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Period & Count Tag */}
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md text-[10px] font-sans font-semibold bg-[#FFFFFF]/90 text-[#1C1917] backdrop-blur-sm shadow-sm border border-[#E7E1D4]">
                  {col.count}
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200 block">
                    {col.periodTag}
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                    {col.title}
                  </h3>
                </div>
              </div>

              {/* Minimalist Museum Plaque Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-3 border-t border-[#E7E1D4] flex items-center justify-between text-xs font-sans font-semibold text-[#9A3412]">
                  <span>Enter Gallery</span>
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
