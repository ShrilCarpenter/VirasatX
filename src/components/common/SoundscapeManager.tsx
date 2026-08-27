'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundscapeService } from '@/services/soundscapeService';

export default function SoundscapeManager() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check state periodically or on change
    setIsPlaying(soundscapeService.getStatus());
  }, []);

  const handleToggle = () => {
    const newState = soundscapeService.toggle();
    setIsPlaying(newState);
    setHasInteracted(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleToggle}
        title={isPlaying ? 'Mute Ambient Museum Soundscape' : 'Play Ambient Sitar/Tanpura Drone'}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg border transition-all duration-300 ${
          isPlaying
            ? 'bg-[#1C1A17] text-[#E6CD92] border-[#C5A059] gold-border-glow scale-105'
            : 'bg-[#FFFDF9]/90 text-[#3D3934] border-[#E2DAC9] hover:border-[#C5A059] hover:bg-[#FFFDF9]'
        }`}
        aria-label="Toggle Museum Soundscape"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-1">
              <span className="w-1 h-3.5 bg-[#C5A059] rounded-full animate-pulse" />
              <span className="w-1 h-5 bg-[#E6CD92] rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2.5 bg-[#C5A059] rounded-full animate-pulse delay-150" />
            </div>
            <span className="text-xs font-serif-display font-medium tracking-wide">Soundscape Active</span>
            <Volume2 className="w-4 h-4 text-[#E6CD92]" />
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#8C8275]" />
            <span className="text-xs font-serif-display tracking-wide text-[#5C554B]">Ambient Audio</span>
            {!hasInteracted && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BE4D2A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BE4D2A]"></span>
              </span>
            )}
          </>
        )}
      </button>
    </div>
  );
}
