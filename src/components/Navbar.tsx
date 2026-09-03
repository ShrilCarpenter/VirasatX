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
  UploadCloud,
  LogOut,
  ChevronDown
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

  const navLinks = [
    { label: 'Discover', path: '/discover' },
    { label: 'Timeline', path: '/timeline' },
    { label: 'Map', path: '/map' },
    { label: 'Living Heritage', path: '/living-traditions' },
    { label: 'Manuscripts', path: '/manuscripts' },
    { label: 'AI Guide', path: '/ai-guide' },
    { label: 'Plan a Visit', path: '/plan-visit' }
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand & SIH26197 Identity Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#151D2A] flex items-center justify-center shadow-xs border border-[#936B38] group-hover:scale-105 transition-transform">
              <span className="font-serif text-xl font-bold text-[#D4AF37]">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900 group-hover:text-[#936B38] transition-colors leading-none">
                VirasatX
              </span>
              <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase mt-0.5">
                Heritage Repository
              </span>
            </div>
          </Link>

          {/* Official SIH26197 Track Badge */}
          <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-stone-300 text-xs">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-bold">
              SIH26197
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium text-stone-700">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                isActive(link.path)
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Global Toolbar: Search, Lang, Contrast, Patron Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Universal Search Modal Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-300 bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 transition-all text-xs shadow-2xs"
            title="Search Repository (Press /)"
            aria-label="Open universal search"
          >
            <Search className="w-3.5 h-3.5 text-[#936B38]" />
            <span className="hidden md:inline">Search…</span>
            <kbd className="hidden md:inline-block font-mono text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded border border-stone-200">
              /
            </kbd>
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2 rounded-full border border-stone-300 bg-white/80 hover:bg-white text-stone-700 transition-colors flex items-center gap-1 text-xs"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-stone-600" />
              <span className="font-semibold text-[11px]">{activeLanguage}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white border border-stone-200 shadow-xl py-1.5 z-50 text-xs">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onChangeLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#F7EFE6] transition-colors flex items-center justify-between ${
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
            className={`p-2 rounded-full border transition-colors ${
              highContrast 
                ? 'bg-amber-400 text-black border-amber-300' 
                : 'border-stone-300 bg-white/80 text-stone-700 hover:bg-white'
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
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-stone-950 font-bold">
                      {favorites.length}
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-stone-300" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-stone-200 shadow-xl py-2 z-50 text-xs space-y-1 animate-scaleUp">
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
            className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200/60 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-[#151D2A] text-white'
                  : 'text-stone-800 hover:bg-stone-200/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-stone-200 space-y-2">
            <Link
              to={user ? '/profile' : '/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#151D2A] text-white text-xs font-semibold"
            >
              <User className="w-4 h-4" />
              <span>{user ? 'My VirasatX Profile' : 'Sign In to My VirasatX'}</span>
            </Link>
            <Link
              to="/ai-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#936B38] text-white text-xs font-semibold shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Virasat AI Assistant</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
