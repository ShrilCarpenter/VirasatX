import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Camera, 
  BookOpen, 
  Leaf, 
  ExternalLink,
  ChevronRight,
  Landmark,
  Eye
} from 'lucide-react';
import { HERITAGE_ITEMS, EPOCHS, LIVING_TRADITIONS, ARTISANS_DATA } from '../data/heritageData';
import { VerificationBadge } from '../components/VerificationBadge';
import { SafeImage } from '../components/SafeImage';

interface HomeProps {
  onOpenSearch: () => void;
  highContrast?: boolean;
}

export const Home: React.FC<HomeProps> = ({ onOpenSearch, highContrast }) => {
  const navigate = useNavigate();
  const [activeEraId, setActiveEraId] = useState<string>('indus-valley');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary specimens for editorial sections
  const specimenOfTheWeek = HERITAGE_ITEMS.find(i => i.id === 'nataraja') || HERITAGE_ITEMS[0];
  const ajantaRecord = HERITAGE_ITEMS.find(i => i.id === 'padmapani') || HERITAGE_ITEMS[1];
  const pattachitraTradition = LIVING_TRADITIONS.find(t => t.id === 'odisha-pattachitra') || LIVING_TRADITIONS[0];
  const raghurajpurArtisans = ARTISANS_DATA.find(a => a.id === 'chitrakar-raghurajpur') || ARTISANS_DATA[0];

  // Restrained timeline epochs for Section 14
  const coreTimelineEpochs = [
    { id: 'indus-valley', label: 'Indus Valley', period: 'c. 2600 – 1900 BCE', highlight: 'Standardized urban planning, bronze lost-wax casting, and steatite seals.' },
    { id: 'vedic-era', label: 'Ancient India', period: 'c. 1500 – 500 BCE', highlight: 'Oral transmission of Vedic hymns, early iron metallurgy, and philosophical treatises.' },
    { id: 'mauryan-era', label: 'Mauryan & Classical', period: 'c. 322 BCE – 550 CE', highlight: 'Ashokan moral edicts, Sanchi Stupa, Nalanda Mahavihara, and Ajanta frescoes.' },
    { id: 'medieval-era', label: 'Medieval Dynasties', period: 'c. 600 – 1526 CE', highlight: 'Monumental Dravidian granite temples, Ellora rock excavations, and palm-leaf pothis.' },
    { id: 'early-modern', label: 'Early Modern', period: 'c. 1526 – 1857 CE', highlight: 'Court miniature painting ateliers, Charbagh architecture, and double-ikat textiles.' },
    { id: 'modern-republic', label: 'Modern India', period: '1947 – Present', highlight: 'Constitutional preservation of indigenous heritage and GI registry protection.' }
  ];

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onOpenSearch();
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 animate-fadeIn">
      {/* 1. HERO SECTION (Prompt Section 12) */}
      <section className="pt-10 md:pt-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Vision & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-stone-300 bg-white/80 text-stone-700 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#936B38]" />
              <span>National Digital Heritage Repository</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#151D2A] leading-[1.12] tracking-tight">
              India's heritage, <br />
              <span className="italic font-normal text-[#936B38]">connected.</span>
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed">
              Discover artifacts, places, traditions, manuscripts and living cultural practices through a source-grounded digital heritage repository.
            </p>

            {/* Universal Hero Search Input (Prompt Section 13) */}
            <form onSubmit={handleHeroSearchSubmit} className="pt-2 max-w-xl">
              <div className="relative flex items-center rounded-xl bg-white border border-stone-300 shadow-xs focus-within:border-[#936B38] focus-within:ring-1 focus-within:ring-[#936B38] transition-all">
                <Search className="w-4 h-4 text-[#936B38] ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search an artifact, tradition, place, manuscript or period…"
                  className="w-full px-3 py-3.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none"
                  aria-label="Universal repository search"
                />
                <button
                  type="submit"
                  className="mr-2 px-4 py-2 rounded-lg bg-[#151D2A] text-white text-xs font-medium hover:bg-[#936B38] transition-colors shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </div>

              {/* Research query prompts */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[11px] text-stone-500">
                <span className="text-stone-400">Try:</span>
                {['Ajanta', 'Pattachitra', 'Chola bronzes', 'Nalanda', 'Madhubani', 'Indus Valley'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => navigate(`/discover?q=${encodeURIComponent(item)}`)}
                    className="underline hover:text-stone-900 cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </form>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/discover"
                className="px-6 py-3 rounded-lg bg-[#151D2A] text-white text-xs sm:text-sm font-semibold hover:bg-[#936B38] transition-colors shadow-xs flex items-center gap-2"
              >
                <span>Explore Heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/ai-guide"
                className="px-6 py-3 rounded-lg border border-stone-300 bg-white/90 hover:bg-white text-stone-800 text-xs sm:text-sm font-semibold hover:border-stone-400 transition-colors shadow-2xs flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#936B38]" />
                <span>Ask Virasat AI</span>
              </Link>
            </div>
          </div>

          {/* Right Column: ONE Powerful Heritage Visual (Prompt Section 12) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300/80 shadow-md bg-stone-900">
              <SafeImage
                src={specimenOfTheWeek.imageUrl}
                alt={specimenOfTheWeek.title}
                creditKey={specimenOfTheWeek.id}
                showCreditButton={true}
                containerClassName="h-[440px] w-full"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4">
                <VerificationBadge status={specimenOfTheWeek.verificationStatus} />
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] font-mono text-stone-300 uppercase tracking-wider">
                  <span>{specimenOfTheWeek.period}</span>
                  <span>•</span>
                  <span>{specimenOfTheWeek.region}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold leading-snug">
                  {specimenOfTheWeek.title}
                </h2>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {specimenOfTheWeek.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link
                    to={`/artifact/${specimenOfTheWeek.id}`}
                    className="inline-flex items-center gap-1.5 text-[#D4AF37] font-medium hover:text-white transition-colors"
                  >
                    <span>View Archival Record &rarr;</span>
                  </Link>
                  <span className="font-mono text-[10px] text-stone-400">
                    {specimenOfTheWeek.accessionNo}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE BY TIME (Prompt Section 14) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#936B38] font-bold block">
              CHRONOLOGY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151D2A] mt-0.5">
              Five millennia. One connected story.
            </h2>
          </div>
          <Link
            to="/timeline"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors"
          >
            <span>Explore the Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Restrained horizontal timeline selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {coreTimelineEpochs.map((epoch) => {
            const isSelected = activeEraId === epoch.id;
            return (
              <button
                key={epoch.id}
                onClick={() => setActiveEraId(epoch.id)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#936B38] shadow-xs ring-1 ring-[#936B38]'
                    : 'bg-white/60 border-stone-200 hover:border-stone-300 hover:bg-white'
                }`}
              >
                <span className="text-[10px] font-mono text-stone-500 block truncate">
                  {epoch.period}
                </span>
                <span className="font-serif text-sm font-bold text-stone-900 block mt-1">
                  {epoch.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active epoch summary snippet */}
        {(() => {
          const selected = coreTimelineEpochs.find(e => e.id === activeEraId) || coreTimelineEpochs[0];
          return (
            <div className="p-5 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#936B38]">
                  {selected.label} ({selected.period})
                </span>
                <p className="text-xs sm:text-sm text-stone-600">
                  {selected.highlight}
                </p>
              </div>
              <Link
                to={`/timeline`}
                className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors shrink-0 text-center"
              >
                Inspect Period Dossier
              </Link>
            </div>
          );
        })()}
      </section>

      {/* 3. FEATURED HERITAGE — EDITORIAL COMPOSITION (Prompt Section 16) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#936B38] font-bold block">
            CURATORIAL HIGHLIGHT
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151D2A] mt-0.5">
            Featured Heritage: Ajanta Caves
          </h2>
        </div>

        {/* Asymmetrical Editorial Composition: 1 large story + 3 related records */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main feature story */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <SafeImage
              src={ajantaRecord.imageUrl}
              alt={ajantaRecord.title}
              creditKey={ajantaRecord.id}
              showCreditButton={true}
              containerClassName="h-72 w-full"
            />
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                  {ajantaRecord.dateBadge}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {ajantaRecord.location}
                </span>
                <VerificationBadge status={ajantaRecord.verificationStatus} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#151D2A]">
                {ajantaRecord.title}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {ajantaRecord.description} {ajantaRecord.historicalContext}
              </p>
              <div className="pt-2">
                <Link
                  to={`/artifact/${ajantaRecord.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A64B2A] hover:underline"
                >
                  <span>Read Complete Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Connected Contextual Records (Prompt Section 2 & 16) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold block">
              Related Knowledge Graph
            </span>

            {[
              {
                title: 'Buddhist Mural Traditions',
                category: 'Visual Canons',
                desc: 'Mineral pigments, lapis lazuli grounds, and the classical Shadanga principles of posture and expression.',
                link: '/discover?q=mural'
              },
              {
                title: 'Deccan Rock-Cut Architecture',
                category: 'Sacred Engineering',
                desc: 'Subterranean basalt excavations uniting Buddhist, Hindu, and Jain sanctuary construction in Maharashtra.',
                link: '/artifact/ellora'
              },
              {
                title: 'Ancient Indian Painting Treatises',
                category: 'Scholarly Canon',
                desc: 'Chitrasutra textual guidelines on portraiture, anatomical proportion, and natural pigment binding.',
                link: '/learn'
              }
            ].map((related, idx) => (
              <Link
                key={idx}
                to={related.link}
                className="block p-4 rounded-xl bg-white border border-stone-200 hover:border-[#936B38] transition-all group"
              >
                <span className="text-[10px] font-mono uppercase text-[#936B38] font-bold block">
                  {related.category}
                </span>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#936B38] transition-colors mt-0.5">
                  {related.title}
                </h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {related.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPLORE BY PLACE (Prompt Section 15) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#936B38] font-bold block">
              GEOGRAPHY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151D2A] mt-0.5">
              Heritage has a place.
            </h2>
          </div>
          <Link
            to="/map"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors"
          >
            <span>Open Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Geographic Regions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { region: 'North', focus: 'Gangetic Plains & Himalayas', count: 'Sarnath, Varanasi, Taxila', image: '/images/regions/north-india.jpg' },
            { region: 'South', focus: 'Kaveri Delta & Malabar', count: 'Thanjavur, Swamimalai, Muziris', image: '/images/regions/south-india.jpg' },
            { region: 'East', focus: 'Kalinga & Magadha', count: 'Konark, Nalanda, Puri', image: '/images/regions/east-india.jpg' },
            { region: 'West', focus: 'Deccan & Gujarat', count: 'Ajanta, Ellora, Patan', image: '/images/regions/west-india.jpg' },
            { region: 'Central', focus: 'Malwa & Narmada Valley', count: 'Sanchi, Khajuraho, Bastar', image: '/images/regions/central-india.jpg' },
            { region: 'Northeast', focus: 'Brahmaputra Basin', count: 'Majuli, Kamakhya, Ahom', image: '/images/regions/northeast-india.jpg' }
          ].map((reg) => (
            <div
              key={reg.region}
              onClick={() => navigate(`/discover?region=${encodeURIComponent(reg.region)}`)}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-[#936B38] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-28 overflow-hidden bg-stone-900">
                <SafeImage
                  src={reg.image}
                  alt={reg.region}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-2 left-3 font-serif text-lg font-bold text-white drop-shadow-sm">
                  {reg.region}
                </span>
              </div>
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <p className="text-[11px] text-stone-600 font-medium">
                  {reg.focus}
                </p>
                <p className="text-[10px] font-mono text-stone-400 mt-2.5 pt-2 border-t border-stone-100">
                  {reg.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LIVING HERITAGE & ARTISAN GUILDS (Prompt Section 17 & 18) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#936B38] font-bold block">
              LIVING TRADITIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151D2A] mt-0.5">
              Heritage is still alive.
            </h2>
          </div>
          <Link
            to="/living-traditions"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors"
          >
            <span>Explore Living Heritage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LIVING_TRADITIONS.slice(0, 3).map((trad) => (
            <div
              key={trad.id}
              onClick={() => navigate(`/living-traditions`)}
              className="rounded-xl overflow-hidden bg-white border border-stone-200 shadow-2xs hover:border-stone-400 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <SafeImage
                src={trad.imageUrl}
                alt={trad.title}
                containerClassName="h-44 w-full"
              />
              <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#936B38] font-bold">
                      {trad.subCategory}
                    </span>
                    {trad.giTagStatus && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                        GI Tag
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#A64B2A] transition-colors mt-0.5">
                    {trad.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    {trad.community} • {trad.location}
                  </p>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {trad.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="italic">{trad.unbrokenSince}</span>
                  <span className="font-medium text-stone-800 flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ARTIFACT OF THE WEEK (Prompt Section 19) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Museum Catalog Entry Image */}
          <div className="lg:col-span-5">
            <SafeImage
              src={specimenOfTheWeek.imageUrl}
              alt={specimenOfTheWeek.title}
              creditKey={specimenOfTheWeek.id}
              showCreditButton={true}
              containerClassName="h-72 sm:h-80 w-full rounded-xl border border-stone-200"
            />
          </div>

          {/* Museum Catalog Entry Metadata beside image (Prompt Section 19) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#936B38] font-bold block">
                ARTIFACT OF THE WEEK
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                {specimenOfTheWeek.title}
              </h3>
            </div>

            {/* Catalog Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-y border-stone-100 py-3">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Period</span>
                <span className="font-medium text-stone-800">{specimenOfTheWeek.dateBadge}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Region</span>
                <span className="font-medium text-stone-800">{specimenOfTheWeek.region}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Material</span>
                <span className="font-medium text-stone-800 truncate block">{specimenOfTheWeek.material.split(',')[0]}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Source</span>
                <span className="font-medium text-stone-800 truncate block">{specimenOfTheWeek.source}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Verification</span>
                <VerificationBadge status={specimenOfTheWeek.verificationStatus} />
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Accession</span>
                <span className="font-mono text-stone-600">{specimenOfTheWeek.accessionNo}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {specimenOfTheWeek.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                to={`/artifact/${specimenOfTheWeek.id}`}
                className="px-5 py-2.5 rounded-lg bg-[#151D2A] text-white text-xs font-semibold hover:bg-[#936B38] transition-colors"
              >
                View Artifact
              </Link>
              <Link
                to={`/artifact/${specimenOfTheWeek.id}#history`}
                className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
              >
                Explore its story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VIRASAT AI RESEARCH COMPANION (Prompt Section 22) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#151D2A] text-white shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-semibold border border-stone-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Virasat AI • Dedicated Research Companion</span>
            </div>
            <h2 className="font-serif text-3xl font-bold leading-tight">
              Scholarly AI Guidance with Explicit Citations &amp; Confidence
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Unlike generic chatbots, Virasat AI is grounded in primary scholarly archives from the Archaeological Survey of India, National Archives, and epigraphical corpuses. Every answer distinguishes AI interpretation from source material.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              {[
                'Why are Ajanta murals important?',
                'How is Pattachitra traditionally made?',
                'What is the lost-wax casting technique of Chola bronzes?'
              ].map((q, idx) => (
                <Link
                  key={idx}
                  to={`/ai-guide`}
                  className="px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700 text-[11px] transition-colors"
                >
                  "{q}"
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 text-center lg:text-right space-y-3">
            <Link
              to="/ai-guide"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#936B38] text-white text-xs sm:text-sm font-semibold hover:bg-[#7D5B2F] transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Research Studio</span>
            </Link>
            <p className="text-[11px] text-stone-400">
              Source-linked • Confidence scoring • Error reporting
            </p>
          </div>
        </div>
      </section>

      {/* 8. LEARN & RESPONSIBLE HERITAGE (Prompt Section 31 & 71) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learn Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#936B38] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Curriculum &amp; Independent Learning
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Curriculum-aligned learning paths on temple architecture, epigraphy, and manuscript traditions with interactive knowledge checks saved to your profile.
            </p>
          </div>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors pt-3 border-t border-stone-100"
          >
            <span>Explore Learning Modules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsible Heritage Box (Prompt Section 31) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Experience heritage responsibly.
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Preservation guidance, respectful etiquette at sacred monument corridors, and sustainable support for registered artisan cooperatives.
            </p>
          </div>
          <Link
            to="/plan-visit"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#151D2A] hover:text-[#936B38] transition-colors pt-3 border-t border-stone-100"
          >
            <span>Plan Mindful Visit Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 9. SOURCES & TRUST (Prompt Section 21 & 42) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Institutional Open Access &amp; Credibility</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Source-Grounded Curatorial Integrity
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Every artifact, translation, and historical claim cites authenticated institutional archives—including the Archaeological Survey of India (ASI), National Museum, and UNESCO documentation.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-5 text-xs text-stone-500">
          <Link to="/sources" className="underline hover:text-stone-900">Source References &amp; Licenses</Link>
          <span>•</span>
          <Link to="/ai-transparency" className="underline hover:text-stone-900">AI Transparency</Link>
          <span>•</span>
          <Link to="/copyright" className="underline hover:text-stone-900">Copyright &amp; Image Rights</Link>
          <span>•</span>
          <Link to="/accessibility" className="underline hover:text-stone-900">Accessibility Statement</Link>
        </div>
      </section>
    </div>
  );
};

