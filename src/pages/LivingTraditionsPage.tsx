import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, MapPin, ArrowRight, Layers, Award } from 'lucide-react';
import { LIVING_TRADITIONS, ARTISANS_DATA } from '../data/heritageData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerificationBadge } from '../components/VerificationBadge';
import { SafeImage } from '../components/SafeImage';

export const LivingTraditionsPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'South', 'North', 'West', 'Central', 'East'];

  const filteredTraditions = LIVING_TRADITIONS.filter(t => 
    selectedRegion === 'All' || t.region === selectedRegion
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Intangible Heritage' }, { label: 'Living Traditions & Master Guilds' }]} />

      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-900/10 text-emerald-800 text-xs font-mono uppercase tracking-wider font-semibold">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Living Heritage Continuum</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          Heritage is still alive.
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          India's civilizational memory does not dwell solely in stone monuments or glass museum vitrines. It lives in the hereditary hands of sthapatis, pattachitra chitrakars, master weavers, and tribal metallurgists maintaining centuries-old oral and material traditions.
        </p>
      </div>

      {/* Region Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {regions.map(reg => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`text-xs px-4 py-2 rounded-xl font-medium transition-colors ${
              selectedRegion === reg
                ? 'bg-[#151D2A] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {reg === 'All' ? 'All Traditions' : `${reg} India`}
          </button>
        ))}
      </div>

      {/* Living Traditions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTraditions.map(trad => (
          <article
            key={trad.id}
            className="rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-[#936B38]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden bg-stone-900">
                <SafeImage
                  src={trad.imageUrl}
                  alt={trad.title}
                  creditKey={trad.id}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#151D2A]/85 backdrop-blur-md text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{trad.giTagStatus ? 'GI Registered' : 'Master Guild'}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-[#151D2A]/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center justify-between border border-white/10">
                  <span className="truncate">{trad.location}</span>
                  <span className="font-mono text-stone-300 text-[11px] shrink-0">{trad.guildCount}</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-[11px] font-mono text-[#936B38] uppercase font-bold tracking-wider block">
                  {trad.subCategory}
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                  {trad.title}
                </h2>
                <p className="text-xs text-stone-500 font-medium">
                  {trad.community} • Unbroken lineage since {trad.unbrokenSince}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {trad.description}
                </p>

                {/* Key practices list */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-mono font-semibold text-stone-400 uppercase tracking-wider block">
                    Traditional Guild Practices:
                  </span>
                  {trad.keyPractices.map((practice, i) => (
                    <div key={i} className="text-xs text-stone-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                      <span>{practice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-4">
              {trad.responsibleWaysToSupport && (
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 space-y-1">
                  <span className="font-semibold text-stone-800 block">Mindful Engagement:</span>
                  <p>{trad.responsibleWaysToSupport[0]}</p>
                </div>
              )}

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <VerificationBadge status={trad.verificationStatus} size="sm" />
                <Link
                  to={`/artisans/${trad.id}`}
                  className="inline-flex items-center gap-1 font-semibold text-stone-900 hover:text-[#936B38] transition-colors"
                >
                  <span>Guild Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Featured Master Artisan Communities Section */}
      <section className="pt-10 border-t border-stone-200 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
            Ethical Custodianship &amp; Collective Rights
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Artisan Cooperatives &amp; Master Guilds
          </h2>
          <p className="text-xs text-stone-500 max-w-2xl leading-relaxed">
            Celebrating hereditary cooperatives with geographical indication certifications. In strict accordance with ethical custodianship, no unconsented personal addresses or private contact numbers are published.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTISANS_DATA.map(artisan => (
            <div
              key={artisan.id}
              className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#936B38]/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-800 font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                    GI #{artisan.giCertificationNo}
                  </span>
                  <span className="text-xs font-mono text-stone-400">{artisan.generationSpan}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {artisan.name}
                </h3>
                <p className="text-xs font-semibold text-[#936B38]">
                  {artisan.tradition} • {artisan.location}, {artisan.state}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {artisan.bio}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-mono font-semibold text-stone-400 uppercase block mb-1">
                    Organic Sustainable Practices:
                  </span>
                  <ul className="text-xs text-stone-700 space-y-1">
                    {artisan.sustainablePractices.map((prac, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#936B38]" />
                        <span>{prac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <VerificationBadge status={artisan.verificationStatus} size="sm" />
                <Link
                  to={`/artisans/${artisan.id}`}
                  className="font-semibold text-stone-900 hover:text-[#936B38] flex items-center gap-1"
                >
                  <span>Guild Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
