import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  Globe, 
  Contrast, 
  User, 
  Bookmark, 
  BookOpen, 
  Compass, 
  Camera, 
  Clock, 
  MapPin, 
  Scroll, 
  Layers, 
  LogOut, 
  ChevronDown,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenSearch: () => void;
  activeLanguage: string;
  onChangeLanguage: (lang: string) => void;
  highContrast: boolean;
  onToggleContrast: () => void;
}

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'HI', label: 'हिन्दी' },
  { code: 'TA', label: 'தமிழ்' },
  { code: 'TE', label: 'తెలుగు' },
  { code: 'BN', label: 'বাংলা' },
  { code: 'GU', label: 'ગુજરાતી' },
  { code: 'MR', label: 'मराठी' },
  { code: 'KN', label: 'ಕನ್ನಡ' }
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  activeLanguage,
  onChangeLanguage,
  highContrast,
  onToggleContrast
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, favorites } = useAuth();

  // Primary desktop navigation links per prompt specification
  const primaryNavLinks = [
    { label: 'Discover', path: '/discover' },
    { label: 'Timeline', path: '/timeline' },
    { label: 'Map', path: '/map' },
    { label: 'Living Heritage', path: '/living-traditions' },
    { label: 'Manuscripts', path: '/manuscripts' },
    { label: 'AI Guide', path: '/ai-guide' },
    { label: 'Identify', path: '/identify' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await signOut();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-colors border-b ${
      highContrast 
        ? 'bg-black border-white/30 text-white' 
        : 'bg-[#FAF8F5]/95 backdrop-blur-md border-[#E7E3DC] text-[#151D2A]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Brand & SIH26197 Identity */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-[#151D2A] flex items-center justify-center border border-[#936B38] shadow-xs group-hover:scale-105 transition-transform">
              <span className="font-serif text-lg font-bold text-[#D4AF37]">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-[#151D2A] group-hover:text-[#936B38] transition-colors leading-none">
                VirasatX
              </span>
              <span className="text-[9px] font-mono tracking-wider text-stone-500 uppercase mt-0.5">
                India's Heritage Repository
              </span>
            </div>
          </Link>

          {/* Official SIH26197 Track Badge */}
          <div className="hidden xl:flex items-center pl-3 border-l border-stone-200">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 font-bold">
              SIH26197
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-medium text-stone-700">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                isActive(link.path)
                  ? 'bg-[#151D2A] text-white font-semibold'
                  : 'hover:text-[#151D2A] hover:bg-stone-200/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Global Toolbar: Search, Lang, Contrast, Patron Auth */}
        <div className="flex items-center gap-2">
          {/* Universal Search Modal Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-300 bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 transition-all text-xs shadow-2xs"
            title="Search Repository (Press /)"
            aria-label="Open universal search"
          >
            <Search className="w-3.5 h-3.5 text-[#936B38]" />
            <span className="hidden sm:inline">Search…</span>
            <kbd className="hidden md:inline-block font-mono text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded border border-stone-200">
              /
            </kbd>
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border border-stone-300 bg-white/90 hover:bg-white text-stone-700 transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Change Language"
              aria-label="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-stone-600" />
              <span className="font-semibold text-[11px] hidden sm:inline">{activeLanguage}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-stone-200 shadow-lg py-1.5 z-50 text-xs">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onChangeLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#F7EFE6] transition-colors flex items-center justify-between cursor-pointer ${
                      activeLanguage === lang.code ? 'font-bold text-[#936B38]' : 'text-stone-700'
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contrast Accessibility Toggle */}
          <button
            onClick={onToggleContrast}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              highContrast 
                ? 'bg-amber-400 text-black border-amber-300' 
                : 'border-stone-300 bg-white/90 text-stone-700 hover:bg-white'
            }`}
            title="Toggle High Contrast Mode"
            aria-label="High contrast mode"
          >
            <Contrast className="w-3.5 h-3.5" />
          </button>

          {/* Patron Account / My VirasatX Dropdown */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#151D2A] text-white hover:bg-stone-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="truncate max-w-[90px]">My VirasatX</span>
                  {favorites.length > 0 && (
                    <span className="font-mono text-[9px] px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-stone-950 font-bold">
                      {favorites.length}
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-stone-300" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-stone-200 shadow-xl py-2 z-50 text-xs space-y-1">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <span className="font-serif font-bold text-stone-900 block truncate">
                        {profile?.display_name || user.email?.split('@')[0]}
                      </span>
                      <span className="text-[10px] text-stone-400 truncate block">
                        {user.email}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 hover:bg-[#F7EFE6] transition-colors flex items-center gap-2.5 text-stone-700 font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-[#936B38]" />
                      <span>Patron Profile</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 hover:bg-[#F7EFE6] transition-colors flex items-center justify-between text-stone-700 font-medium"
                    >
                      <div className="flex items-center gap-2.5">
                        <Bookmark className="w-3.5 h-3.5 text-[#936B38]" />
                        <span>Saved Discoveries</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-stone-400">
                        {favorites.length}
                      </span>
                    </Link>

                    <Link
                      to="/learn"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 hover:bg-[#F7EFE6] transition-colors flex items-center gap-2.5 text-stone-700 font-medium"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#936B38]" />
                      <span>Learning Progress</span>
                    </Link>

                    <div className="pt-1 border-t border-stone-100">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-700 transition-colors flex items-center gap-2.5 font-medium cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#151D2A] text-white hover:bg-[#936B38] text-xs font-semibold shadow-2xs transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>My VirasatX</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Organized by Information Architecture Concepts (Prompt Section 11) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF8F5] max-h-[calc(100vh-4.5rem)] overflow-y-auto px-5 py-6 space-y-6">
          {/* 1. EXPLORE */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold block">
              EXPLORE
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/discover"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-2"
              >
                <Layers className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Discover</span>
              </Link>
              <Link
                to="/timeline"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-2"
              >
                <Clock className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Timeline</span>
              </Link>
              <Link
                to="/map"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Map</span>
              </Link>
              <Link
                to="/discover?type=Monuments"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Collections</span>
              </Link>
            </div>
          </div>

          {/* 2. LIVING HERITAGE */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold block">
              LIVING HERITAGE
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/living-traditions"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-2"
              >
                <span>Traditions</span>
              </Link>
              <Link
                to="/living-traditions#artisans"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-2"
              >
                <span>Artisans &amp; Guilds</span>
              </Link>
            </div>
          </div>

          {/* 3. KNOWLEDGE */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold block">
              KNOWLEDGE
            </span>
            <div className="grid grid-cols-3 gap-2">
              <Link
                to="/manuscripts"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-1.5"
              >
                <Scroll className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Manuscripts</span>
              </Link>
              <Link
                to="/learn"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Learn</span>
              </Link>
              <Link
                to="/sources"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Sources</span>
              </Link>
            </div>
          </div>

          {/* 4. TOOLS */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold block">
              TOOLS
            </span>
            <div className="grid grid-cols-3 gap-2">
              <Link
                to="/ai-guide"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#936B38]" />
                <span>AI Guide</span>
              </Link>
              <Link
                to="/identify"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Identify</span>
              </Link>
              <Link
                to="/plan-visit"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-xs font-medium text-stone-800 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Plan Visit</span>
              </Link>
            </div>
          </div>

          {/* 5. PERSONAL (MY VIRASATX) */}
          <div className="pt-4 border-t border-stone-200 space-y-2">
            <Link
              to={user ? '/profile' : '/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#151D2A] text-white text-xs font-semibold shadow-xs"
            >
              <User className="w-4 h-4" />
              <span>{user ? 'My VirasatX Profile' : 'Sign In to My VirasatX'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

