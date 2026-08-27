'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Volume2, VolumeX, ArrowRight, Play, Pause, Sparkles, Quote } from 'lucide-react';
import { EDITORIAL_STORIES } from '@/data/storiesData';
import { speechService } from '@/services/speechService';

export default function HeritageStoryFeature() {
  const story = EDITORIAL_STORIES[0];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudioNarration = () => {
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
    <section className="w-full py-24 bg-[#FAF7F0] border-t border-[#E2DAC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-serif-display uppercase font-bold tracking-widest text-[#BE4D2A] mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Curated Daily Dispatch</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Audio Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C8275] bg-[#F4EFE2] px-3 py-1 rounded-full border border-[#E2DAC9]">
                {story.period} • {story.readTime}
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1A17] leading-tight pt-2">
                {story.title}
              </h2>
            </div>

            <p className="font-serif-editorial text-xl sm:text-2xl text-[#5C554B] leading-relaxed italic">
              “{story.subtitle}”
            </p>

            {/* Live Audio Narration Bar */}
            <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <button
                  onClick={toggleAudioNarration}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isPlayingAudio
                      ? 'bg-[#BE4D2A] text-white shadow-lg scale-105 animate-pulse'
                      : 'bg-[#1C1A17] text-[#E6CD92] hover:bg-[#BE4D2A] hover:text-white shadow-md'
                  }`}
                  aria-label="Toggle Audio Guide"
                >
                  {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <h4 className="text-sm font-bold font-serif-display text-[#1C1A17]">
                    {isPlayingAudio ? 'Audio Narration Playing...' : 'Listen to Archival Story Audio'}
                  </h4>
                  <p className="text-xs text-[#8C8275]">
                    Narrated with Indian voice synthesis (Web Speech API)
                  </p>
                </div>
              </div>

              {isPlayingAudio && (
                <div className="flex items-center gap-1">
                  {[40, 70, 30, 90, 50, 80, 60, 100, 45].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#BE4D2A] rounded-full animate-pulse"
                      style={{ height: `${h * 0.25}px`, animationDelay: `${i * 80}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Snippet Excerpt */}
            <p className="text-sm sm:text-base text-[#4A443C] leading-relaxed">
              {story.sections[0].content}
            </p>

            {/* Call to action */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                href={`/stories#${story.id}`}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1C1A17] text-[#FAF7F0] hover:bg-[#BE4D2A] text-xs font-serif-display uppercase font-bold tracking-wider transition-colors shadow-md group"
              >
                <span>Read Complete Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/stories"
                className="text-xs font-serif-display uppercase font-semibold text-[#8C8275] hover:text-[#BE4D2A] transition-colors"
              >
                Browse All Visual Essays →
              </Link>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E2DAC9] bg-stone-900 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.heroImage}
                alt={story.title}
                className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311]/90 via-[#141311]/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E6CD92] bg-[#1C1A17]/80 px-2.5 py-1 rounded-full border border-[#C5A059]/40">
                  Featured Masterpiece
                </span>
                <h4 className="font-serif-display text-xl font-bold">
                  The Cosmic Rhythm of Anandatandava
                </h4>
                <p className="text-xs text-[#D8CFBF] line-clamp-2">
                  Cast in solid panchaloha through lost-wax foundry traditions in the Kaveri Delta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
