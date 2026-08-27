'use client';

import React, { useState, useRef } from 'react';
import { RotateCw, Sun, ZoomIn, ZoomOut, Maximize2, Sparkles, Layers } from 'lucide-react';
import { Artifact } from '@/types';

interface ArtifactViewer3DProps {
  artifact: Artifact;
}

export default function ArtifactViewer3D({ artifact }: ArtifactViewer3DProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lightingAngle, setLightingAngle] = useState(45);
  const [activeViewMode, setActiveViewMode] = useState<'standard' | 'lighting' | 'inspection'>('standard');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotationAngle(prev => (prev + delta * 0.5) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotationAngle(0);
    setZoomLevel(1);
    setLightingAngle(45);
  };

  // Lighting studio gradient calculation
  const lightX = 50 + Math.cos((lightingAngle * Math.PI) / 180) * 40;
  const lightY = 50 + Math.sin((lightingAngle * Math.PI) / 180) * 40;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#141311] border border-[#C5A059]/40 shadow-2xl flex flex-col select-none">
      {/* Top Controls Bar */}
      <div className="px-6 py-4 bg-[#1C1A17] border-b border-[#332E27] flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#BE4D2A] animate-pulse" />
          <span className="font-serif-display text-xs uppercase font-bold tracking-widest text-[#E6CD92]">
            3D Archival Inspection Studio
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-[#26231E] p-1 rounded-xl border border-[#38332C]">
          <button
            onClick={() => setActiveViewMode('standard')}
            className={`px-3 py-1 rounded-lg text-xs font-serif-display uppercase tracking-wider transition-colors ${
              activeViewMode === 'standard'
                ? 'bg-[#BE4D2A] text-white font-bold'
                : 'text-[#A89F91] hover:text-white'
            }`}
          >
            360° Rotate
          </button>
          <button
            onClick={() => setActiveViewMode('lighting')}
            className={`px-3 py-1 rounded-lg text-xs font-serif-display uppercase tracking-wider transition-colors flex items-center gap-1 ${
              activeViewMode === 'lighting'
                ? 'bg-[#C5A059] text-[#1C1A17] font-bold'
                : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <Sun className="w-3 h-3" />
            <span>Lighting Studio</span>
          </button>
          <button
            onClick={() => setActiveViewMode('inspection')}
            className={`px-3 py-1 rounded-lg text-xs font-serif-display uppercase tracking-wider transition-colors flex items-center gap-1 ${
              activeViewMode === 'inspection'
                ? 'bg-[#6366F1] text-white font-bold'
                : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Deep Loupe</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        className="relative h-[460px] sm:h-[540px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Dynamic Studio Spotlighting */}
        {activeViewMode === 'lighting' && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-75"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(230, 205, 146, 0.25) 0%, transparent 65%)`
            }}
          />
        )}

        {/* Pedestal Shadow */}
        <div className="absolute bottom-10 w-3/5 h-8 bg-black/60 rounded-full blur-xl pointer-events-none" />

        {/* Artifact Image with dynamic transforms */}
        <div
          className="relative max-h-[85%] max-w-[85%] transition-transform duration-75 ease-out"
          style={{
            transform: `scale(${zoomLevel}) rotateY(${rotationAngle}deg)`,
            filter: activeViewMode === 'lighting' ? `brightness(${1 + Math.sin(rotationAngle * 0.05) * 0.15})` : 'none'
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artifact.imageUrl}
            alt={artifact.title}
            className="max-h-[420px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] pointer-events-none"
          />
        </div>

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-4 left-6 pointer-events-none text-[11px] font-mono uppercase tracking-widest text-[#A89F91] flex items-center gap-2 bg-[#1C1A17]/80 px-3 py-1.5 rounded-full border border-[#332E27]">
          <RotateCw className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />
          <span>Click & Drag to Rotate 360° ({Math.round(rotationAngle)}°)</span>
        </div>
      </div>

      {/* Bottom Tool Sliders */}
      <div className="px-6 py-4 bg-[#1C1A17] border-t border-[#332E27] flex flex-wrap items-center justify-between gap-4">
        {/* Zoom Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
            className="p-1.5 rounded-lg bg-[#26231E] text-[#D8CFBF] hover:bg-[#332E27] border border-[#38332C]"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-[#E6CD92] w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
            className="p-1.5 rounded-lg bg-[#26231E] text-[#D8CFBF] hover:bg-[#332E27] border border-[#38332C]"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Light Slider if in lighting mode */}
        {activeViewMode === 'lighting' && (
          <div className="flex items-center gap-2 text-xs text-[#A89F91]">
            <Sun className="w-4 h-4 text-[#C5A059]" />
            <span>Spotlight Angle:</span>
            <input
              type="range"
              min="0"
              max="360"
              value={lightingAngle}
              onChange={e => setLightingAngle(Number(e.target.value))}
              className="w-28 accent-[#C5A059]"
            />
          </div>
        )}

        <button
          onClick={resetView}
          className="text-xs font-mono uppercase tracking-wider text-[#A89F91] hover:text-[#FAF7F0] underline"
        >
          Reset View
        </button>
      </div>
    </div>
  );
}
