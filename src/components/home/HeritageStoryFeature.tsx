'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Play, Pause, ArrowRight } from 'lucide-react';
import { EDITORIAL_STORIES } from '@/data/storiesData';
import { speechService } from '@/services/speechService';
import Card3DTilt from '@/components/common/Card3DTilt';
import HeritageImage from '@/components/common/HeritageImage';

export default function HeritageStoryFeature() {
  const story = EDITORIAL_STORIES[0];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
    } else {
      if (story.audioTranscript) {
        setIsPlayingAudio(true);
        speechService.speak(story.audioTranscript, {
          onEnd: () => setIsPlayingAudio(false),
          onError: () => setIsPlayingAudio(false),
        });
      }
    }
  };

  return (
    <section className="w-full py-20 bg-[#FBF9F4] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-sans uppercase font-bold tracking-widest text-[#9A3412] mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Heritage Stories</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story Content & Audio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#78716C]">
                {story.period} • {story.readTime}
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1917] leading-tight">
                {story.title}
              </h2>
            </div>

            <p className="font-serif-editorial text-xl text-[#57534E] leading-relaxed italic">
              “{story.subtitle}”
            </p>

            {/* Simple, Compact Audio Player Bar */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isPlayingAudio
                      ? 'bg-[#9A3412] text-white shadow-sm animate-pulse'
                      : 'bg-[#1C1917] text-white hover:bg-[#9A3412]'
                  }`}
                  aria-label="Toggle Audio Guide"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917]">
                    {isPlayingAudio ? 'Playing Audio Guide...' : 'Listen to Story Description'}
                  </h4>
                  <p className="text-[11px] text-[#78716C]">
                    Duration: ~2 min • English (Speech synthesis)
                  </p>
                </div>
              </div>

              {isPlayingAudio && (
                <span className="text-xs font-mono font-medium text-[#9A3412] animate-pulse">
                  Listening
                </span>
              )}
            </div>

            {/* Snippet */}
            <p className="text-sm text-[#44403C] leading-relaxed">
              {story.sections[0].content}
            </p>

            {/* Action Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/stories#${story.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#9A3412] text-white text-xs font-sans font-semibold transition-colors shadow-sm"
              >
                <span>Read Complete Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/stories"
                className="text-xs font-sans font-semibold text-[#78716C] hover:text-[#9A3412] transition-colors"
              >
                Browse All Heritage Stories →
              </Link>
            </div>
          </div>

          {/* Right Column: Framed Visual with 3D Tilt */}
          <div className="lg:col-span-5">
            <Card3DTilt maxTilt={8} scaleOnHover={1.02} className="rounded-2xl">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E7E1D4] bg-[#FFFFFF] p-3">
                <div className="relative h-[380px] rounded-xl overflow-hidden bg-stone-100">
                  <HeritageImage
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200">
                      Cire-Perdue Metallurgy
                    </span>
                    <h4 className="font-serif-display text-lg font-bold">
                      The Anandatandava Bronze Castings
                    </h4>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          </div>

        </div>
      </div>
    </section>
  );
}
