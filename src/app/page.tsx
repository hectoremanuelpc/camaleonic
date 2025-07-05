'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { PlatformsSection } from '@/components/home/PlatformsSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CallToAction } from '@/components/home/CallToAction';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral/5 to-highlight/10 container mx-auto">
      <HeroSection isVisible={isVisible} />
      <StatsSection isVisible={isVisible} />
      <PlatformsSection isVisible={isVisible} />
      <FeaturesSection isVisible={isVisible} />
      <CallToAction isVisible={isVisible} />
    </div>
  );
}
