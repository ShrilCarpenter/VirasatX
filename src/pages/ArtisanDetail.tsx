import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTISANS_DATA, LIVING_TRADITIONS } from '../data/heritageData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerificationBadge } from '../components/VerificationBadge';
import { ErrorState } from '../components/ErrorState';
import { Award, HeartHandshake, ShieldCheck, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export const ArtisanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Match either from ARTISANS_DATA or LIVING_TRADITIONS
  const artisan = ARTISANS_DATA.find(a => a.id === id);
  const tradition = LIVING_TRADITIONS.find(t => t.id === id);

  if (!artisan && !tradition) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ErrorState
          title="Artisan Profile Not Found"
          message={`We could not locate profile #${id} in the living traditions registry.`}
          backPath="/living-traditions"
        />
      </div>
    );
  }

  const title = artisan?.name || tradition?.title;
  const location = artisan?.location || tradition?.location;
  const state = artisan?.state || tradition?.region;
  const traditionName = artisan?.tradition || tradition?.subCategory;
  const description = artisan?.bio || tradition?.description;
  const materials = artisan?.materials || tradition?.materials || ['Traditional organic materials'];
  const techniques = artisan?.techniques || tradition?.keyPractices || ['Hereditary hand-crafted techniques'];
  const supportAvenues = artisan?.supportAvenues || tradition?.responsibleWaysToSupport || ['Support certified fair-trade cooperative societies.'];
  const imageUrl = artisan?.imageUrl || tradition?.imageUrl || '';
  const verificationStatus = artisan?.verificationStatus || tradition?.verificationStatus || 'Scholar-verified';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fadeIn">
      <Breadcrumbs
        items={[
          { label: 'Living Traditions', path: '/living-traditions' },
          { label: title || 'Artisan Profile' }
        ]}
      />

      {/* Main Profile Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
          <img
            src={imageUrl}
            alt={title}
            onError={(e) => { e.currentTarget.src = '/images/ui/placeholder-heritage.jpg'; }}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-700 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>GI Certified Heritage</span>
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-[#936B38] font-bold uppercase tracking-wider">
              {traditionName}
            </span>
            <VerificationBadge status={verificationStatus} size="md" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
            <MapPin className="w-4 h-4 text-[#A64B2A] shrink-0" />
            <span>{location}, {state}</span>
          </div>

          <p className="text-stone-600 text-sm leading-relaxed">
            {description}
          </p>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ethical Custodianship Verified: No unconsented private telephone or address data is exposed.</span>
          </div>
        </div>
      </div>

      {/* Materials, Traditional Techniques, and Responsible Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Materials & Tools */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Raw Materials &amp; Native Mediums
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
            {materials.map((mat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#936B38]" />
                <span>{mat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Traditional Process Steps */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Hereditary Techniques
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
            {techniques.map((tech, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#F7EFE6] text-[#936B38] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Responsible Ways to Support Direct Artisan Livelihoods */}
      <div className="p-8 rounded-3xl bg-[#F7EFE6] border border-[#E7D6C0] space-y-4">
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Responsible Avenues to Support This Tradition
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Support genuine GI-certified artisan families directly by commissioning original hand-crafted pieces and avoiding industrialized mass-market imitations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {supportAvenues.map((ave, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white border border-stone-200 text-xs text-stone-800 flex items-start gap-2.5 shadow-2xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{ave}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
