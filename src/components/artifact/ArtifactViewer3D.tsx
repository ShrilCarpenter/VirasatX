'use client';

import React, { useState } from 'react';
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

  // Lighting studio calculation
  const lightX = 50 + Math.cos((lightingAngle * Math.PI) / 180) * 40;
  const lightY = 50 + Math.sin((lightingAngle * Math.PI) / 180) * 40;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm flex flex-col select-none">
      {/* Top Controls Bar */}
      <div className="px-5 py-3.5 bg-[#F4EFE6] border-b border-[#E7E1D4] flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#9A3412]" />
          <span className="text-xs font-sans font-semibold text-[#1C1917]">
            3D Archival Inspection Studio
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#FFFFFF] p-1 rounded-lg border border-[#E7E1D4]">
          <button
            onClick={() => setActiveViewMode('standard')}
            className={`px-3 py-1 rounded-md text-xs font-sans font-medium transition-colors ${
              activeViewMode === 'standard'
                ? 'bg-[#9A3412] text-white font-semibold'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            360° Rotate
          </button>
          <button
            onClick={() => setActiveViewMode('lighting')}
            className={`px-3 py-1 rounded-md text-xs font-sans font-medium transition-colors flex items-center gap-1 ${
              activeViewMode === 'lighting'
                ? 'bg-[#9A3412] text-white font-semibold'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            <Sun className="w-3 h-3" />
            <span>Lighting</span>
          </button>
          <button
            onClick={() => setActiveViewMode('inspection')}
            className={`px-3 py-1 rounded-md text-xs font-sans font-medium transition-colors flex items-center gap-1 ${
              activeViewMode === 'inspection'
                ? 'bg-[#9A3412] text-white font-semibold'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Deep Loupe</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        className="relative h-[380px] sm:h-[460px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing bg-stone-100/60"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Dynamic Studio Lighting Overlay */}
        {activeViewMode === 'lighting' && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-150"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.6) 0%, rgba(220, 210, 195, 0.4) 60%, rgba(180, 170, 155, 0.5) 100%)`
            }}
          />
        )}

        {/* Artifact 3D Object Rendering */}
        <div
          className="relative max-h-[85%] max-w-[85%] transition-transform duration-75 flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel}) rotateY(${rotationAngle}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artifact.imageUrl}
            alt={artifact.title}
            className="max-h-[340px] sm:max-h-[400px] w-auto object-contain drop-shadow-lg"
            draggable={false}
          />
        </div>

        {/* Angle Overlay Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#FFFFFF]/90 text-[#57534E] border border-[#E7E1D4] shadow-sm">
          Azimuth: {Math.round(rotationAngle)}°
        </div>
      </div>

      {/* Bottom Tool Controls */}
      <div className="px-5 py-3 bg-[#F4EFE6] border-t border-[#E7E1D4] flex flex-wrap items-center justify-between gap-3 text-xs text-[#57534E]">
        <div className="flex items-center gap-2">
          <span>Zoom:</span>
          <button
            onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}
            className="p-1 rounded bg-[#FFFFFF] border border-[#E7E1D4] hover:bg-[#FBF9F4]"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-10 text-center">
            {(zoomLevel * 100).toFixed(0)}%
          </span>
          <button
            onClick={() => setZoomLevel(Math.min(2.5, zoomLevel + 0.25))}
            className="p-1 rounded bg-[#FFFFFF] border border-[#E7E1D4] hover:bg-[#FBF9F4]"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {activeViewMode === 'lighting' && (
          <div className="flex items-center gap-2">
            <span>Light Angle:</span>
            <input
              type="range"
              min="0"
              max="360"
              value={lightingAngle}
              onChange={e => setLightingAngle(Number(e.target.value))}
              className="w-24 accent-[#9A3412]"
            />
          </div>
        )}

        <button
          onClick={resetView}
          className="text-xs font-semibold text-[#9A3412] hover:underline"
        >
          Reset Studio
        </button>
      </div>
    </div>
  );
}
