'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Compass, Menu, X, Sparkles, Eye } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import SearchModal from './SearchModal';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Explore', href: '/explore' },
    { label: 'Collections', href: '/explore?tab=collections' },
    { label: 'Timeline', href: '/timeline' },
    { label: 'Heritage Map', href: '/map' },
    { label: 'Virtual Museum', href: '/gallery/gupta-golden-hall' },
    { label: 'Manuscripts', href: '/manuscripts' },
    { label: 'Artisans', href: '/artisans' },
    { label: 'Stories', href: '/stories' },
    { label: 'AI Guide', href: '/ai-guide' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E8DFC8]/80 bg-[#FAF7F0]/90 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BE4D2A] via-[#A83818] to-[#1C1A17] flex items-center justify-center shadow-md border border-[#C5A059]/40 group-hover:scale-105 transition-transform">
                <span className="font-serif-display font-black text-lg text-[#F7F2E8] tracking-widest">
                  वि
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-display font-bold text-xl tracking-wider text-[#1C1A17]">
                    VIRASAT
                  </span>
                  <span className="font-sans font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-[#C5A059]/20 text-[#8C6B1C] border border-[#C5A059]/40 tracking-wider">
                    AI
                  </span>
                </div>
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#8C8275] -mt-0.5">
                  Digital Heritage Museum
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-sans tracking-wide transition-all relative py-1 ${
                      isActive
                        ? 'text-[#BE4D2A] font-semibold'
                        : 'text-[#3D3934] hover:text-[#BE4D2A]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#BE4D2A] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Search, Language, Enter CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#5C554B] bg-[#FFFDF9] hover:bg-[#F4EFE2] border border-[#E2DAC9] hover:border-[#C5A059] rounded-full transition-all"
                title="Search Museum Archives (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-[#BE4D2A]" />
                <span className="font-sans">Search...</span>
                <kbd className="text-[10px] font-mono bg-[#EAE2D2] text-[#8C8275] px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Language Selector */}
              <LanguageSelector />

              {/* Enter Museum CTA */}
              <Link
                href="/explore"
                className="flex items-center gap-2 px-4 py-2 text-xs font-serif-display font-semibold uppercase tracking-wider rounded-full bg-gradient-to-r from-[#BE4D2A] to-[#A33C1B] text-[#FFFDF9] shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Enter Museum</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#5C554B] hover:text-[#1C1A17] rounded-lg"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#1C1A17] hover:bg-[#F4EFE2] rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#FFFDF9] border-b border-[#E2DAC9] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2DAC9]/60">
              <LanguageSelector />
              <Link
                href="/explore"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-1.5 text-xs font-serif-display uppercase tracking-wider rounded-full bg-[#BE4D2A] text-white"
              >
                Enter Museum
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    pathname === link.href
                      ? 'bg-[#F4EFE2] text-[#BE4D2A] font-semibold'
                      : 'text-[#3D3934] hover:bg-[#FAF7F0]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
