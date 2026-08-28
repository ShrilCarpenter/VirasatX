'use client';

import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'card' | 'grid' | 'text' | 'hero';
  count?: number;
  className?: string;
}

export default function SkeletonLoader({
  variant = 'card',
  count = 1,
  className = ''
}: SkeletonLoaderProps) {
  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: count || 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm animate-pulse"
          >
            <div className="h-48 bg-[#E7E1D4]/60" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-[#E7E1D4] rounded w-3/4" />
              <div className="h-3 bg-[#E7E1D4]/70 rounded w-1/2" />
              <div className="pt-2 border-t border-[#E7E1D4]/40 flex justify-between">
                <div className="h-3 bg-[#E7E1D4]/50 rounded w-1/4" />
                <div className="h-3 bg-[#E7E1D4]/50 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="w-full py-16 bg-[#F4EFE6] border-b border-[#E7E1D4] animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-6 bg-[#E7E1D4] rounded-full w-48" />
          <div className="h-10 bg-[#E7E1D4] rounded w-2/3" />
          <div className="h-5 bg-[#E7E1D4]/70 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`space-y-2.5 animate-pulse ${className}`}>
        <div className="h-4 bg-[#E7E1D4] rounded w-full" />
        <div className="h-4 bg-[#E7E1D4] rounded w-5/6" />
        <div className="h-4 bg-[#E7E1D4] rounded w-4/6" />
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#E7E1D4] shadow-sm animate-pulse space-y-4"
        >
          <div className="h-6 bg-[#E7E1D4] rounded w-1/3" />
          <div className="space-y-2">
            <div className="h-4 bg-[#E7E1D4]/70 rounded w-full" />
            <div className="h-4 bg-[#E7E1D4]/70 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
