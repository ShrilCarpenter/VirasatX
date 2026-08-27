'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Volume2, VolumeX, Play, Pause, Clock, ArrowRight, Share2, Sparkles, Quote } from 'lucide-react';
import { EDITORIAL_STORIES } from '@/data/storiesData';
import { speechService } from '@/services/speechService';

export default function StoriesPage() {
  const [playingStoryId, setPlayingStoryId] = useState<string | null>(null);

  const toggleAudio = (storyId: string, transcript?: string) => {
    if (playingStoryId === storyId) {
      speechService.stop();
      setPlayingStoryId(null);
    } else {
      if (transcript) {
        setPlayingStoryId(storyId);
        speechService.speak(transcript, {
          onEnd: () => setPlayingStoryId(null),
          onError: () => setPlayingStoryId(null)
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] pb-24">
      {/* Page Header */}
      <div className="bg-[#1C1A17] text-[#FAF7F0] border-b border-[#C5A059]/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2621] border border-[#C5A059]/40 text-[#E6CD92] text-xs font-serif-display uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#BE4D2A]" />
            <span>Curatorial Longform Dispatches</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F0]">
            Cultural Stories & Visual Essays
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#D4C8B2] max-w-2xl">
            Deep narrative journeys exploring the metaphysical philosophy, architecture, metallurgical secrets, and trade routes of Indian civilization.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {EDITORIAL_STORIES.map(story => {
          const isPlaying = playingStoryId === story.id;
          return (
            <article
              key={story.id}
              id={story.id}
              className="bg-[#FFFDF9] border border-[#E2DAC9] rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Story Hero Image */}
              <div className="relative h-72 sm:h-96 overflow-hidden bg-stone-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.heroImage}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141311]/90 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-[#1C1A17]/80 text-[#E6CD92] border border-[#C5A059]/40">
                    {story.period}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#1C1A17]/80 text-[#D8CFBF]">
                    {story.readTime}
                  </span>
                </div>
              </div>

              {/* Story Body */}
              <div className="p-6 sm:p-12 space-y-8">
                <div>
                  <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1A17] leading-tight">
                    {story.title}
                  </h2>
                  <p className="font-serif-editorial text-xl sm:text-2xl text-[#5C554B] leading-relaxed mt-2 italic">
                    “{story.subtitle}”
                  </p>
                  <p className="text-xs font-mono text-[#8C8275] uppercase tracking-wider mt-4">
                    By {story.author} • {story.publishedDate}
                  </p>
                </div>

                {/* Audio Guide Narration Bar */}
                {story.audioTranscript && (
                  <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E2DAC9] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleAudio(story.id, story.audioTranscript)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                          isPlaying
                            ? 'bg-[#BE4D2A] text-white animate-pulse shadow-md'
                            : 'bg-[#1C1A17] text-[#E6CD92] hover:bg-[#BE4D2A] hover:text-white'
                        }`}
                        aria-label="Play Story Narration"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <div>
                        <h4 className="font-serif-display text-sm font-bold text-[#1C1A17]">
                          {isPlaying ? 'Audio Narration Active...' : 'Listen to Curatorial Audio Story'}
                        </h4>
                        <p className="text-xs text-[#8C8275]">
                          Indian English voice synthesis with ambient audio support
                        </p>
                      </div>
                    </div>

                    {isPlaying && (
                      <span className="text-xs font-mono text-[#BE4D2A] font-bold animate-pulse">
                        Narrating...
                      </span>
                    )}
                  </div>
                )}

                {/* Sections */}
                <div className="space-y-8 pt-4">
                  {story.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="font-serif-display text-xl font-bold text-[#1C1A17]">
                        {sec.heading}
                      </h3>
                      <p className="text-base text-[#3D3934] leading-relaxed">
                        {sec.content}
                      </p>
                      {sec.quote && (
                        <blockquote className="my-4 p-5 rounded-2xl bg-[#FAF7F0] border-l-4 border-[#C5A059] italic text-sm sm:text-base font-serif-editorial text-[#1C1A17]">
                          “{sec.quote}”
                        </blockquote>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tags & Explore */}
                <div className="pt-6 border-t border-[#E2DAC9] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs bg-[#FAF7F0] text-[#5C554B] border border-[#E2DAC9]">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/explore"
                    className="text-xs font-serif-display uppercase font-bold text-[#BE4D2A] hover:underline flex items-center gap-1"
                  >
                    <span>Explore Related Museum Artifacts →</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
