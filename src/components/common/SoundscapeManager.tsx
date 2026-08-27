'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundscapeService } from '@/services/soundscapeService';

export default function SoundscapeManager() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(soundscapeService.getStatus());
  }, []);

  const handleToggle = () => {
    const newState = soundscapeService.toggle();
    setIsPlaying(newState);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleToggle}
        title={isPlaying ? 'Mute Ambient Tanpura Soundscape' : 'Play Ambient Tanpura Drone'}
        className={`flex items-center gap-2.5 px-4 py-2 rounded-full shadow-md border text-xs font-sans font-medium transition-all ${
          isPlaying
            ? 'bg-[#1C1917] text-white border-[#1C1917]'
            : 'bg-[#FFFFFF] text-[#44403C] border-[#E7E1D4] hover:border-[#9A3412] hover:bg-[#FBF9F4]'
        }`}
        aria-label="Toggle Museum Soundscape"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-1">
              <span className="w-1 h-3 bg-amber-300 rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-amber-100 rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-amber-300 rounded-full animate-pulse delay-150" />
            </div>
            <span>Tanpura Active</span>
            <Volume2 className="w-3.5 h-3.5" />
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#78716C]" />
            <span>Ambient Sound</span>
          </>
        )}
      </button>
    </div>
  );
}
