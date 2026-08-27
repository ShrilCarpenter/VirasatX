'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/data/translations';

interface LanguageSelectorProps {
  currentLang?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  variant?: 'light' | 'dark';
}

export default function LanguageSelector({
  currentLang = 'en',
  onLanguageChange,
  variant = 'light'
}: LanguageSelectorProps) {
  const [selected, setSelected] = useState<LanguageCode>(currentLang);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check localStorage if available
    const saved = localStorage.getItem('virasat_lang') as LanguageCode;
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      setSelected(saved);
      onLanguageChange?.(saved);
    }
  }, [onLanguageChange]);

  const handleSelect = (code: LanguageCode) => {
    setSelected(code);
    localStorage.setItem('virasat_lang', code);
    onLanguageChange?.(code);
    setIsOpen(false);
  };

  const currentMeta = SUPPORTED_LANGUAGES.find(l => l.code === selected) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider rounded-full border transition-all ${
          variant === 'dark'
            ? 'bg-[#1C1A17]/80 text-[#E6CD92] border-[#C5A059]/40 hover:border-[#C5A059] hover:bg-[#2A2723]'
            : 'bg-[#FFFDF9] text-[#1C1A17] border-[#E2DAC9] hover:border-[#C5A059] hover:bg-[#F7F2E8]'
        }`}
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
        <span className="font-medium">{currentMeta.nativeName}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#FFFDF9] border border-[#E2DAC9] shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#8C8275] border-b border-[#E2DAC9]/60 mb-1">
              Select Language / भाषा चुनें
            </div>
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#F4EFE2] transition-colors ${
                  selected === lang.code ? 'font-bold text-[#BE4D2A] bg-[#F7F2E8]' : 'text-[#2C2824]'
                }`}
              >
                <span>{lang.nativeName} <span className="text-[#8C8275] text-[10px] font-normal">({lang.name})</span></span>
                {selected === lang.code && <Check className="w-3.5 h-3.5 text-[#BE4D2A]" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
