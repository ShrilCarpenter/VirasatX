'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/data/translations';

interface LanguageSelectorProps {
  currentLang?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
}

export default function LanguageSelector({
  currentLang = 'en',
  onLanguageChange,
}: LanguageSelectorProps) {
  const [selected, setSelected] = useState<LanguageCode>(currentLang);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-[#E7E1D4] bg-[#FFFFFF] hover:bg-[#F4EFE6] text-[#44403C] transition-all"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#9A3412]" />
        <span className="font-medium">{currentMeta.nativeName}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#FFFFFF] border border-[#E7E1D4] shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#78716C] border-b border-[#E7E1D4] mb-1">
              Select Language
            </div>
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#F4EFE6] transition-colors ${
                  selected === lang.code ? 'font-bold text-[#9A3412] bg-[#FBF9F4]' : 'text-[#44403C]'
                }`}
              >
                <span>{lang.nativeName} <span className="text-[#78716C] text-[10px] font-normal">({lang.name})</span></span>
                {selected === lang.code && <Check className="w-3.5 h-3.5 text-[#9A3412]" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
