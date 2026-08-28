'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeLink?: boolean;
}

export default function ErrorState({
  title = 'Unable to Load Content',
  message = 'We encountered an issue retrieving museum records. Please try again or return to collections.',
  onRetry,
  showHomeLink = true,
}: ErrorStateProps) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-[#FBF9F4] rounded-2xl border border-[#E7E1D4]">
      <div className="w-12 h-12 rounded-full bg-[#F4EFE6] border border-[#E7E1D4] flex items-center justify-center text-[#9A3412] mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="font-serif-display text-xl font-bold text-[#1C1917] mb-2">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-[#57534E] max-w-md mb-6 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#9A3412] text-white text-xs font-sans font-semibold hover:bg-[#7C2D12] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}

        {showHomeLink && (
          <Link
            href="/explore"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[#E7E1D4] text-[#44403C] text-xs font-sans font-semibold hover:bg-[#F4EFE6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Collections</span>
          </Link>
        )}
      </div>
    </div>
  );
}
