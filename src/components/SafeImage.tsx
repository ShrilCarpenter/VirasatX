import React, { useState } from 'react';
import { Landmark, ImageOff, Info, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { IMAGE_CREDITS, ImageCredit } from '../data/imageCredits';

interface SafeImageProps {
  src: string;
  alt: string;
  creditKey?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  showCreditButton?: boolean;
  priority?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  creditKey,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  aspectRatio = 'auto',
  showCreditButton = false,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [creditModalOpen, setCreditModalOpen] = useState(false);

  const credit: ImageCredit | undefined = creditKey ? IMAGE_CREDITS[creditKey] : undefined;

  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  }[aspectRatio];

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${aspectClass} ${containerClassName}`}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <Landmark className="w-8 h-8 text-stone-300 animate-pulse" />
        </div>
      )}

      {/* Actual Image or Fallback */}
      {!hasError ? (
        <img
          src={src}
          alt={alt || 'Cultural heritage archival specimen'}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      ) : (
        /* Graceful Archival Fallback Placeholder */
        <div className="absolute inset-0 bg-[#FAF8F5] border border-stone-200 flex flex-col items-center justify-center p-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#F7EFE6] text-[#936B38] flex items-center justify-center shadow-2xs">
            <Landmark className="w-6 h-6" />
          </div>
          <span className="font-serif text-xs font-bold text-stone-900 line-clamp-1">
            {alt || 'Archival Specimen'}
          </span>
          <span className="text-[10px] text-stone-400 font-mono">
            Digital scan undergoing institutional conservation
          </span>
        </div>
      )}

      {/* Optional Source & License Credit Trigger */}
      {(showCreditButton || credit) && !hasError && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCreditModalOpen(true);
          }}
          className="absolute bottom-2.5 right-2.5 bg-black/60 hover:bg-black/80 text-white/90 text-[10px] px-2 py-1 rounded-md backdrop-blur-md flex items-center gap-1 transition-colors cursor-pointer z-10"
          title="Inspect Image Source &amp; License"
          aria-label="Image credit and licensing information"
        >
          <Info className="w-3 h-3" />
          <span>Credit</span>
        </button>
      )}

      {/* Credit Popover Modal */}
      {creditModalOpen && credit && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setCreditModalOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4 animate-scaleUp text-left"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-serif text-sm font-bold text-stone-900">
                  Image Source &amp; License
                </span>
              </div>
              <button
                onClick={() => setCreditModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700">
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">Subject</span>
                <p className="font-semibold text-stone-900">{credit.subject}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">Institutional Source</span>
                <p>{credit.source}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">Creator / Atelier</span>
                <p>{credit.creator}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-mono font-bold text-[#936B38] uppercase block">Usage License</span>
                <p className="font-medium text-stone-900 mt-0.5">{credit.license}</p>
                {credit.notes && <p className="text-[11px] text-stone-500 mt-1">{credit.notes}</p>}
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
                <span>Verified: {credit.checkedAt}</span>
                {credit.sourceUrl && (
                  <a
                    href={credit.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#936B38] hover:underline font-semibold"
                  >
                    <span>View Repository Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
