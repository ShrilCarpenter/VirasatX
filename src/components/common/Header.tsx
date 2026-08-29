'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Landmark, Rotate3d, Compass, Clock, Map, Sparkles, Info } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import SearchModal from './SearchModal';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Clean, focused museum pillars (no redundant or cluttered links)
  const navLinks = [
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: '3D Museum', href: '/gallery/sculpture-gallery', icon: Rotate3d, badge: '3D' },
    { label: 'Timeline', href: '/timeline', icon: Clock },
    { label: 'Heritage Map', href: '/map', icon: Map },
    { label: 'AI Guide', href: '/ai-guide', icon: Sparkles },
    { label: 'About', href: '/about', icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E1D4] bg-[#FBF9F4]/95 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Museum Identity Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-[#9A3412] flex items-center justify-center shadow-sm border border-[#7C2D12]">
                <Landmark className="w-4 h-4 text-[#FAF7F0]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-display font-bold text-lg tracking-wider text-[#1C1917]">
                    VIRASAT AI
                  </span>
                  <span className="text-[9px] font-sans font-semibold uppercase px-1.5 py-0.5 rounded bg-[#F4EFE6] text-[#78716C] border border-[#E7E1D4]">
                    Museum
                  </span>
                </div>
                <span className="text-[10px] font-sans tracking-wide text-[#78716C] -mt-0.5">
                  Digital Heritage Museum of India
                </span>
              </div>
            </Link>

            {/* Desktop Primary Navigation — Clean & Minimalist */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href.startsWith('/gallery') && pathname.startsWith('/gallery'));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-sans tracking-normal transition-all relative py-1 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#9A3412] font-semibold'
                        : 'text-[#44403C] hover:text-[#9A3412]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-full bg-[#9A3412] text-white font-bold tracking-wider">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A3412] rounded-full" />
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
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs text-[#57534E] bg-[#FFFFFF] hover:bg-[#F4EFE6] border border-[#E7E1D4] rounded-full transition-all shadow-sm"
                title="Search Museum Collections (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-[#9A3412]" />
                <span>Search collection...</span>
                <kbd className="text-[10px] font-mono bg-[#F4EFE6] text-[#78716C] px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Language Selector */}
              <LanguageSelector />

              {/* Enter Museum CTA */}
              <Link
                href="/explore"
                className="px-4 py-2 text-xs font-sans font-semibold rounded-full bg-[#9A3412] hover:bg-[#7C2D12] text-white transition-all shadow-sm"
              >
                Enter Museum
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#44403C] hover:text-[#1C1917]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#1C1917] hover:bg-[#F4EFE6] rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E7E1D4] px-4 pt-3 pb-6 space-y-4 shadow-md animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D4]/60">
              <LanguageSelector />
              <Link
                href="/explore"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#9A3412] text-white"
              >
                Enter Museum
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F4EFE6] text-[#9A3412] font-bold'
                        : 'text-[#44403C] hover:bg-[#FBF9F4]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#9A3412]" />
                    <span className="flex-1">{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-[#9A3412] text-white font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
