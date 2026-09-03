import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, MapPin, Sparkles, ArrowRight, Layers, Award } from 'lucide-react';
import { LIVING_TRADITIONS, ARTISANS_DATA } from '../data/heritageData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerificationBadge } from '../components/VerificationBadge';

export const LivingTraditionsPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'South', 'North', 'West', 'Central', 'East'];

  const filteredTraditions = LIVING_TRADITIONS.filter(t => 
    selectedRegion === 'All' || t.region === selectedRegion
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Living Traditions & Master Guilds' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Intangible Cultural Heritage</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Living Traditions &amp; Master Craft Guilds
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          India's civilizational memory does not live solely inside museum glass cases—it thrives in the living hands of hereditary sthapatis, master weavers, lacquer turners, and tribal metalsmiths preserving multi-generational techniques.
        </p>
      </div>

      {/* Region Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {regions.map(reg => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`text-xs px-4 py-2 rounded-full font-medium transition-colors ${
              selectedRegion === reg
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {reg} India
          </button>
        ))}
      </div>

      {/* Living Traditions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTraditions.map(trad => (
          <div
            key={trad.id}
            className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden bg-stone-900">
                <img
                  src={trad.imageUrl}
                  alt={trad.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-700 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{trad.giTagStatus ? 'GI Registered' : 'Master Guild'}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl flex items-center justify-between">
                  <span>{trad.location}</span>
                  <span className="font-mono text-stone-300 text-[11px]">{trad.guildCount}</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-[11px] font-mono text-[#936B38] uppercase font-bold tracking-wider">
                  {trad.subCategory}
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {trad.title}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {trad.community} • Unbroken since {trad.unbrokenSince}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {trad.description}
                </p>

                {/* Key practices list */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                    Traditional Guild Practices:
                  </span>
                  {trad.keyPractices.map((practice, i) => (
                    <div key={i} className="text-xs text-stone-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{practice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-4">
              {trad.responsibleWaysToSupport && (
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 space-y-1">
                  <span className="font-semibold text-stone-800 block">Responsible Ways to Support:</span>
                  <p>{trad.responsibleWaysToSupport[0]}</p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs">
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
          </div>
        ))}
      </div>

      {/* Featured Master Artisan Communities Section */}
      <div className="pt-10 border-t border-stone-200 space-y-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Respectful Artisan Community Registry
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Celebrating hereditary cooperatives with geographical indication certifications. In strict accordance with ethical custodianship, no private phone numbers or unconsented personal addresses are displayed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTISANS_DATA.map(artisan => (
            <div
              key={artisan.id}
              className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-700 font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                    GI Tag {artisan.giCertificationNo}
                  </span>
                  <span className="text-xs text-stone-400">{artisan.generationSpan}</span>
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
                  <span className="text-[11px] font-semibold text-stone-400 uppercase block mb-1">
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
                  className="font-semibold text-stone-900 hover:text-[#936B38]"
                >
                  View Profile &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
