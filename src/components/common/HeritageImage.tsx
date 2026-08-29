'use client';

import React, { useState } from 'react';

interface HeritageImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  aspectRatio?: string;
}

const DEFAULT_FALLBACKS: Record<string, string> = {
  sculpture: 'https://images.unsplash.com/photo-1599818458999-f2c9e782e2c3?auto=format&fit=crop&w=1000&q=80',
  temple: 'https://images.unsplash.com/photo-1588096344356-9a2a9cf2996d?auto=format&fit=crop&w=1000&q=80',
  manuscript: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
  painting: 'https://images.unsplash.com/photo-1590059390046-52c6755490a6?auto=format&fit=crop&w=1000&q=80',
  general: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80'
};

export default function HeritageImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACKS.general,
  className = '',
  ...props
}: HeritageImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync if prop changes
  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // If Wikimedia URL had an issue, fallback gracefully to reliable high-res mirror
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <span className="w-5 h-5 rounded-full border-2 border-[#9A3412] border-t-transparent animate-spin opacity-50" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
}
