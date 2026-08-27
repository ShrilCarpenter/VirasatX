'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ChevronDown, Menu, X, Landmark, Compass, BookOpen, Users, FileText, Info, Leaf } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import SearchModal from './SearchModal';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const primaryNavLinks = [
    { label: 'Explore', href: '/explore' },
    { label: 'Collections', href: '/explore#collections' },
    { label: 'Timeline', href: '/timeline' },
    { label: 'Heritage Map', href: '/map' },
    { label: 'Virtual Museum', href: '/gallery/sculpture-gallery' },
    { label: 'AI Guide', href: '/ai-guide' },
  ];

  const secondaryNavLinks = [
    { label: 'Manuscripts', href: '/manuscripts', desc: 'Ancient palm-leaf & birch-bark codices', icon: BookOpen },
    { label: 'Living Heritage', href: '/artisans', desc: 'Master artisans & GI-tagged traditions', icon: Users },
    { label: 'Heritage Stories', href: '/stories', desc: 'Curatorial visual essays & dispatches', icon: FileText },
    { label: 'Responsible Travel', href: '/sustainable-travel', desc: 'Mindful heritage tourism & etiquette', icon: Leaf },
    { label: 'About & Sources', href: '/about', desc: 'Institutional sources & SIH 2026 project', icon: Info },
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

            {/* Desktop Primary Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {primaryNavLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-sans tracking-normal transition-all relative py-1 ${
                      isActive
                        ? 'text-[#9A3412] font-semibold'
                        : 'text-[#44403C] hover:text-[#9A3412]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A3412] rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsMoreDropdownOpen(false), 200)}
                  className="flex items-center gap-1 text-sm font-sans text-[#44403C] hover:text-[#9A3412] py-1 transition-colors"
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMoreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-[#E7E1D4] shadow-lg p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {secondaryNavLinks.map(sec => {
                      const Icon = sec.icon;
                      return (
                        <Link
                          key={sec.href}
                          href={sec.href}
                          onClick={() => setIsMoreDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#FBF9F4] transition-colors group"
                        >
                          <Icon className="w-4 h-4 text-[#9A3412] mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-[#1C1917] group-hover:text-[#9A3412]">
                              {sec.label}
                            </p>
                            <p className="text-[11px] text-[#78716C] leading-tight">
                              {sec.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Side: Search, Language, Enter CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#57534E] bg-[#FFFFFF] hover:bg-[#F4EFE6] border border-[#E7E1D4] rounded-full transition-all"
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

            {/* Mobile Menu Button */}
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
          <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E7E1D4] px-4 pt-3 pb-6 space-y-3 shadow-md animate-in slide-in-from-top-2 duration-150">
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
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[...primaryNavLinks, ...secondaryNavLinks].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                    pathname === link.href
                      ? 'bg-[#F4EFE6] text-[#9A3412] font-semibold'
                      : 'text-[#44403C] hover:bg-[#FBF9F4]'
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
