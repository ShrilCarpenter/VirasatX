'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Play, Pause, Clock, ArrowRight, Share2, Quote } from 'lucide-react';
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
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] pb-24">
      {/* Page Header */}
      <div className="bg-[#F4EFE6] border-b border-[#E7E1D4] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#78716C] text-xs font-sans font-medium">
            <FileText className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>Museum Editorial Essays</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
            Heritage Stories & Visual Essays
          </h1>

          <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] max-w-2xl">
            Narrative journeys exploring the philosophy, architecture, metallurgical secrets, and ancient trade routes of Indian civilization.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {EDITORIAL_STORIES.map(story => {
          const isPlaying = playingStoryId === story.id;
          return (
            <article
              key={story.id}
              id={story.id}
              className="bg-[#FFFFFF] border border-[#E7E1D4] rounded-2xl overflow-hidden shadow-sm space-y-6 p-6 sm:p-10"
            >
              {/* Framed Hero Visual */}
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-stone-100 border border-[#E7E1D4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.heroImage}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#FFFFFF]/90 text-[#1C1917] shadow-sm">
                    {story.period}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#F4EFE6] text-[#78716C]">
                    {story.readTime}
                  </span>
                </div>
              </div>

              {/* Story Header */}
              <div className="space-y-2">
                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
                  {story.title}
                </h2>
                <p className="font-serif-editorial text-lg sm:text-xl text-[#57534E] italic">
                  “{story.subtitle}”
                </p>
                <p className="text-xs text-[#78716C] font-mono pt-1">
                  By {story.author} • {story.publishedDate}
                </p>
              </div>

              {/* Audio Narration Bar */}
              {story.audioTranscript && (
                <div className="p-3.5 rounded-xl bg-[#FBF9F4] border border-[#E7E1D4] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleAudio(story.id, story.audioTranscript)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isPlaying
                          ? 'bg-[#9A3412] text-white shadow animate-pulse'
                          : 'bg-[#1C1917] text-white hover:bg-[#9A3412]'
                      }`}
                      aria-label="Play Story Narration"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-[#1C1917]">
                        {isPlaying ? 'Audio Narration Active...' : '▶ Listen to Curatorial Narration'}
                      </h4>
                      <p className="text-[11px] text-[#78716C]">
                        Indian English speech synthesis
                      </p>
                    </div>
                  </div>

                  {isPlaying && (
                    <span className="text-xs font-mono text-[#9A3412] font-semibold animate-pulse">
                      Narrating...
                    </span>
                  )}
                </div>
              )}

              {/* Story Sections */}
              <div className="space-y-6 pt-2 text-sm text-[#44403C] leading-relaxed">
                {story.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-serif-display text-lg font-bold text-[#1C1917]">
                      {sec.heading}
                    </h3>
                    <p>{sec.content}</p>
                    {sec.quote && (
                      <blockquote className="my-3 p-4 rounded-xl bg-[#F4EFE6] border-l-4 border-[#9A3412] italic font-serif-editorial text-base text-[#1C1917]">
                        “{sec.quote}”
                      </blockquote>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Tags */}
              <div className="pt-4 border-t border-[#E7E1D4] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {story.tags.map(t => (
                    <span key={t} className="px-2.5 py-0.5 rounded text-[11px] bg-[#FBF9F4] text-[#78716C] border border-[#E7E1D4]">
                      #{t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/explore"
                  className="text-xs font-sans font-semibold text-[#9A3412] hover:underline flex items-center gap-1"
                >
                  <span>Explore Related Artifacts →</span>
                </Link>
              </div>

            </article>
          );
        })}
      </div>
    </div>
  );
}
