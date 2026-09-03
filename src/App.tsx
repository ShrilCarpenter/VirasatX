import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { UniversalSearchModal } from './components/UniversalSearchModal';
import { AuthModal } from './components/AuthModal';

// Route Pages
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { SearchPage } from './pages/SearchPage';
import { CollectionDetail } from './pages/CollectionDetail';
import { ArtifactDetail } from './pages/ArtifactDetail';
import { TimelinePage } from './pages/TimelinePage';
import { HeritageMapPage } from './pages/HeritageMapPage';
import { LivingTraditionsPage } from './pages/LivingTraditionsPage';
import { ArtisanDetail } from './pages/ArtisanDetail';
import { ManuscriptsPage } from './pages/ManuscriptsPage';
import { ManuscriptDetail } from './pages/ManuscriptDetail';
import { AIGuidePage } from './pages/AIGuidePage';
import { PlanVisitPage } from './pages/PlanVisitPage';
import { LearnPage } from './pages/LearnPage';
import { SourcesPage } from './pages/SourcesPage';
import { AITransparencyPage } from './pages/AITransparencyPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { AboutPage } from './pages/AboutPage';

// Auth Pages
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ProfilePage } from './pages/ProfilePage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainAppLayout() {
  const [activeLanguage, setActiveLanguage] = useState('EN');
  const [highContrast, setHighContrast] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { authModalOpen, setAuthModalOpen } = useAuth();

  // Global keyboard shortcut: press "/" to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen transition-colors ${
      highContrast ? 'bg-black text-white' : 'bg-[#FAF8F5] text-[#151D2A]'
    }`}>
      {/* Top Fixed Header */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        activeLanguage={activeLanguage}
        onChangeLanguage={setActiveLanguage}
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast(!highContrast)}
      />

      {/* Main Routed Content */}
      <main className="pt-18 min-h-[calc(100vh-280px)]">
        <Routes>
          <Route path="/" element={<Home onOpenSearch={() => setIsSearchOpen(true)} highContrast={highContrast} />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/collections/:slug" element={<CollectionDetail />} />
          <Route path="/artifact/:id" element={<ArtifactDetail />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/map" element={<HeritageMapPage />} />
          <Route path="/living-traditions" element={<LivingTraditionsPage />} />
          <Route path="/artisans/:id" element={<ArtisanDetail />} />
          <Route path="/manuscripts" element={<ManuscriptsPage />} />
          <Route path="/manuscripts/:id" element={<ManuscriptDetail />} />
          <Route path="/ai-guide" element={<AIGuidePage />} />
          <Route path="/plan-visit" element={<PlanVisitPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/sources" element={<SourcesPage />} />
          <Route path="/ai-transparency" element={<AITransparencyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage highContrast={highContrast} onToggleContrast={() => setHighContrast(!highContrast)} />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Auth & Profile Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Fallback */}
          <Route path="*" element={<Home onOpenSearch={() => setIsSearchOpen(true)} highContrast={highContrast} />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer highContrast={highContrast} />

      {/* Universal Search Modal */}
      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        highContrast={highContrast}
      />

      {/* Global Guest Auth Prompt Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <MainAppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
