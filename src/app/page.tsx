import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ScrollExperience3D from '@/components/home/ScrollExperience3D';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import Interactive3DShowcase from '@/components/home/Interactive3DShowcase';
import TimelineRibbon from '@/components/home/TimelineRibbon';
import RegionExplorer from '@/components/home/RegionExplorer';
import HeritageStoryFeature from '@/components/home/HeritageStoryFeature';
import AIAssistantTeaser from '@/components/home/AIAssistantTeaser';
import PreservationStats from '@/components/home/PreservationStats';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F4]">
      {/* 3D WebGL Interactive Hero */}
      <HeroSection />

      {/* Crazy 3D Civilizational Scroll Tunnel */}
      <ScrollExperience3D />

      {/* 3D Tilt Featured Curated Collections */}
      <FeaturedCollections />

      {/* Interactive 3D Masterpiece WebGL Inspector */}
      <Interactive3DShowcase />

      {/* Chronological Timeline Ribbon */}
      <TimelineRibbon />

      {/* Geographic Heritage Atlas */}
      <RegionExplorer />

      {/* Curated Editorial Story Feature */}
      <HeritageStoryFeature />

      {/* Intelligent AI Heritage Research Desk */}
      <AIAssistantTeaser />

      {/* Institutional Preservation & UNESCO Stats */}
      <PreservationStats />
    </div>
  );
}
