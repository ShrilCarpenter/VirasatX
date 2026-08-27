import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TimelineRibbon from '@/components/home/TimelineRibbon';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import RegionExplorer from '@/components/home/RegionExplorer';
import HeritageStoryFeature from '@/components/home/HeritageStoryFeature';
import AIAssistantTeaser from '@/components/home/AIAssistantTeaser';
import PreservationStats from '@/components/home/PreservationStats';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TimelineRibbon />
      <FeaturedCollections />
      <RegionExplorer />
      <HeritageStoryFeature />
      <AIAssistantTeaser />
      <PreservationStats />
    </div>
  );
}
