import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Layers, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Camera, 
  BookOpen, 
  Leaf, 
  CheckCircle,
  Eye
} from 'lucide-react';
import { HERITAGE_ITEMS, EPOCHS, LIVING_TRADITIONS, RESEARCH_PRESETS } from '../data/heritageData';
import { VerificationBadge } from '../components/VerificationBadge';

interface HomeProps {
  onOpenSearch: () => void;
  highContrast?: boolean;
}

export const Home: React.FC<HomeProps> = ({ onOpenSearch, highContrast }) => {
  const navigate = useNavigate();
  const [activeEraIndex, setActiveEraIndex] = useState(0);

  const specimenOfTheWeek = HERITAGE_ITEMS.find(i => i.id === 'nataraja') || HERITAGE_ITEMS[0];
  const featuredTradition = LIVING_TRADITIONS[0];

  return (
    <div className="space-y-24 pb-20 animate-fadeIn">
      {/* 1. Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-300 bg-amber-50/80 text-amber-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span>Smart India Hackathon 2026 • SIH26197</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-[1.15] tracking-tight">
              India’s Heritage, <br />
              <span className="italic font-normal text-[#936B38]">Understood, Preserved</span> <br />
              and Experienced.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed">
              An intelligent, multimodal cultural heritage platform grounded in primary scholarly archives—connecting ancient artifacts, monumental sacred architecture, rare manuscripts, and unbroken living artisan traditions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/discover"
                className="px-7 py-3.5 rounded-full bg-[#151D2A] text-white text-sm font-semibold hover:bg-[#936B38] transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Explore India’s Heritage</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ai-guide"
                className="px-7 py-3.5 rounded-full border border-stone-300 bg-white/80 hover:bg-white text-stone-800 text-sm font-semibold hover:border-stone-400 transition-all shadow-2xs flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#936B38]" />
                <span>Ask Virasat AI</span>
              </Link>
            </div>

            {/* Quick stats pills */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-200/80 text-left">
              <div>
                <span className="font-serif text-2xl font-bold text-stone-900">5,000+</span>
                <p className="text-xs text-stone-500">Years of History</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-stone-900">11</span>
                <p className="text-xs text-stone-500">Historical Epochs</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-stone-900">100%</span>
                <p className="text-xs text-stone-500">Source-Grounded</p>
              </div>
            </div>
          </div>

          {/* Hero Feature Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 group bg-stone-900">
              <img
                src={specimenOfTheWeek.imageUrl}
                alt={specimenOfTheWeek.title}
                className="w-full h-[460px] object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                  Featured Specimen
                </span>
                <VerificationBadge status={specimenOfTheWeek.verificationStatus} />
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                  {specimenOfTheWeek.period} • {specimenOfTheWeek.dynasty}
                </p>
                <h3 className="font-serif text-2xl font-bold leading-snug">
                  {specimenOfTheWeek.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {specimenOfTheWeek.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link
                    to={`/artifact/${specimenOfTheWeek.id}`}
                    className="inline-flex items-center gap-1.5 text-amber-300 font-semibold hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Open 360° Inspection Studio</span>
                  </Link>
                  <span className="text-stone-400 font-mono text-[11px]">{specimenOfTheWeek.accessionNo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Universal Search Bar Banner */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div
          onClick={onOpenSearch}
          className="cursor-pointer p-4 sm:p-5 rounded-2xl bg-white border border-stone-300 shadow-sm hover:border-[#936B38] hover:shadow-md transition-all flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 text-stone-400 flex-1">
            <Search className="w-5 h-5 text-[#936B38]" />
            <span className="text-sm sm:text-base text-stone-500 font-medium">
              Search artifacts, places, traditions, artists, manuscripts…
            </span>
          </div>
          <kbd className="hidden sm:inline px-3 py-1.5 rounded-lg bg-stone-100 text-xs font-mono text-stone-500 border border-stone-200">
            Press /
          </kbd>
        </div>
      </section>

      {/* 3. Explore by Era (Chronological Timeline Teaser) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#936B38] uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Civilizational Journey</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
              Explore by Historical Era
            </h2>
          </div>
          <Link
            to="/timeline"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors"
          >
            <span>Full 11-Epoch Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Epoch Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {EPOCHS.map((epoch, idx) => (
            <button
              key={epoch.id}
              onClick={() => setActiveEraIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeEraIndex === idx
                  ? 'bg-[#151D2A] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {epoch.name}
            </button>
          ))}
        </div>

        {/* Active Epoch Feature Card */}
        {(() => {
          const currentEpoch = EPOCHS[activeEraIndex];
          return (
            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-block text-xs font-mono font-semibold px-3 py-1 rounded bg-[#F7EFE6] text-[#936B38]">
                  {currentEpoch.timeRange}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {currentEpoch.name}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {currentEpoch.description}
                </p>
                <div className="pt-2">
                  <span className="text-xs font-semibold uppercase text-stone-400 block mb-2">Key Civilizational Breakthroughs</span>
                  <div className="flex flex-wrap gap-2">
                    {currentEpoch.keyInnovations.map((item, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-xl bg-stone-100 text-stone-800">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-center">
                <span className="text-xs text-stone-400 uppercase font-semibold">Primary Archaeological Excavations</span>
                <div className="space-y-1.5">
                  {currentEpoch.primarySites.map((site, i) => (
                    <div key={i} className="text-sm font-medium text-stone-800">
                      {site}
                    </div>
                  ))}
                </div>
                <Link
                  to="/timeline"
                  className="inline-block w-full py-2.5 px-4 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Explore Epoch Dossier &rarr;
                </Link>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4. Explore by Region & Cultural Corridors */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#A64B2A] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Geospatial Heritage</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
              Explore by Cultural Corridor
            </h2>
          </div>
          <Link
            to="/map"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors"
          >
            <span>Open Interactive Map</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Buddhist Pilgrimage',
              region: 'North & East',
              sites: 'Sarnath • Nalanda • Bodh Gaya',
              desc: 'From the Ashoka Lion Capital to ancient Mahavihara intellectual scholastic assemblies.',
              img: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?q=80&w=800&auto=format&fit=crop'
            },
            {
              title: 'Chola Granite & Bronze',
              region: 'South (Kaveri Delta)',
              sites: 'Thanjavur • Swamimalai • Gangaikonda',
              desc: '66-metre dry granite vimanas and 1,000-year unbroken cire-perdue bronze foundries.',
              img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop'
            },
            {
              title: 'Deccan Rock-Cut Caves',
              region: 'Western Ghats',
              sites: 'Ellora • Ajanta • Elephanta',
              desc: 'Top-down monolithic basalt excavations and sublime Gupta-Vakataka mural frescoes.',
              img: 'https://images.unsplash.com/photo-1600100397608-f010f444f4e7?q=80&w=800&auto=format&fit=crop'
            },
            {
              title: 'Kalinga Sun & Temple Arts',
              region: 'East (Odisha Coast)',
              sites: 'Konark • Puri • Bhubaneswar',
              desc: 'Sundial chariot wheels, palm-leaf pothi manuscripts, and handwoven ikat silks.',
              img: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop'
            }
          ].map((corridor, i) => (
            <div
              key={i}
              onClick={() => navigate('/map')}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#936B38] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-stone-900">
                <img
                  src={corridor.img}
                  alt={corridor.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  {corridor.region}
                </div>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#936B38] transition-colors">
                    {corridor.title}
                  </h4>
                  <p className="text-xs font-semibold text-[#A64B2A] mt-0.5">{corridor.sites}</p>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {corridor.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-100 text-xs font-semibold text-stone-900 flex items-center justify-between">
                  <span>Explore Corridor</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Living Heritage (Master Craft Guilds) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Living Traditions &amp; Master Guilds</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
              Safeguarding Living Cultural Memory
            </h2>
          </div>
          <Link
            to="/living-traditions"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors"
          >
            <span>View All Guild Traditions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LIVING_TRADITIONS.slice(0, 3).map((trad) => (
            <div
              key={trad.id}
              onClick={() => navigate('/living-traditions')}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <img
                  src={trad.imageUrl}
                  alt={trad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-sm text-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-700">
                  {trad.giTagStatus ? 'GI Registered Guild' : 'Master Guild'}
                </div>
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#936B38] uppercase tracking-wider block">
                    {trad.subCategory}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#A64B2A] transition-colors mt-0.5">
                    {trad.title}
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">{trad.community} • {trad.location}</p>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {trad.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 italic">{trad.unbrokenSince}</span>
                  <span className="font-semibold text-stone-900 flex items-center gap-1">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Ask Virasat AI Teaser */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#151D2A] text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-semibold border border-stone-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Curatorial Research Assistant</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Scholarly AI Guidance with Explicit Citations &amp; Confidence
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Unlike generic chatbots, Virasat AI is strictly grounded in primary records from the Archaeological Survey of India, National Archives, and epigraphical corpuses. Every assertion links back to verified specimen IDs.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              {RESEARCH_PRESETS.slice(0, 3).map((p, i) => (
                <Link
                  key={i}
                  to={`/ai-guide`}
                  className="px-3 py-1.5 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
                >
                  "{p.question}"
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 text-center lg:text-right space-y-3">
            <Link
              to="/ai-guide"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#936B38] text-white text-sm font-semibold hover:bg-[#7D5B2F] shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Research Studio</span>
            </Link>
            <p className="text-[11px] text-stone-400">
              Zero client key leakage • Multi-tier confidence scoring
            </p>
          </div>
        </div>
      </section>

      {/* 7. Identify an Artifact (Vision AI Teaser) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F6F3ED] border border-stone-300 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-semibold">
              <Camera className="w-3.5 h-3.5 text-[#936B38]" />
              <span>Visual Iconography Identifier</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Identify Sculptures, Mudras &amp; Dynastic Signatures
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Upload a photograph of a temple relief, sculpture, or miniature painting. Our iconography engine highlights detected mudras, postures (tribhanga), dynastic stylistic signatures, and matches comparative ASI repository specimens.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/ai-guide#vision"
                className="px-6 py-3 rounded-full bg-[#151D2A] text-white text-xs font-semibold hover:bg-[#936B38] transition-colors shadow-sm flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Test Visual Analysis</span>
              </Link>
              <span className="text-xs text-stone-500 italic">
                *AI-assisted visual interpretation, not expert authentication.
              </span>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Supported Visual Classes
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                'Chola Bronzes',
                'Gandhara Schist Statues',
                'Dravidian Temple Columns',
                'Mughal Court Miniatures',
                'Madhubani Folk Murals',
                'Pala-Sena Stone Stele'
              ].map((cls, i) => (
                <div key={i} className="p-2 rounded-xl bg-stone-50 text-stone-800 border border-stone-200 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{cls}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Education & Responsible Travel Horizons */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education Box */}
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#936B38] flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Heritage Learning for Schools &amp; Researchers
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Curriculum-aligned learning paths, paleography transcription modules, and interactive cultural history quizzes built for students, teachers, and independent scholars.
            </p>
          </div>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors pt-4 border-t border-stone-100"
          >
            <span>Explore Learning Paths</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Responsible Travel Box */}
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Responsible Tourism &amp; Artisan Cluster Visits
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Combat overtourism at fragile monument corridors. Plan mindful day-by-day itineraries supporting GI-certified artisan cooperatives and heritage homestays.
            </p>
          </div>
          <Link
            to="/plan-visit"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors pt-4 border-t border-stone-100"
          >
            <span>Generate Responsible Visit Itinerary</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 9. Sources, Trust & Institutional Integrity */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto text-center space-y-4 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Institutional Research Standards</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Curatorial Integrity &amp; Open Access
        </h2>
        <p className="text-stone-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Every artifact record, translation, and historical claim cites authenticated institutional archives—including the Archaeological Survey of India (ASI), National Museum New Delhi, and UNESCO World Heritage documentation.
        </p>
        <div className="pt-2 flex items-center justify-center gap-6 text-xs text-stone-500">
          <Link to="/sources" className="underline hover:text-stone-900">Primary Sources &amp; Licenses</Link>
          <span>•</span>
          <Link to="/ai-transparency" className="underline hover:text-stone-900">AI Transparency Architecture</Link>
          <span>•</span>
          <Link to="/accessibility" className="underline hover:text-stone-900">Accessibility Statement</Link>
        </div>
      </section>
    </div>
  );
};
