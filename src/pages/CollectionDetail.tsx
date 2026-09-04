import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HERITAGE_ITEMS } from '../data/heritageData';
import { VerificationBadge } from '../components/VerificationBadge';
import { ArrowRight, Layers } from 'lucide-react';

export const CollectionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Filter items based on slug match
  const filtered = HERITAGE_ITEMS.filter(i => {
    if (!slug) return true;
    const cleanSlug = slug.toLowerCase();
    return (
      i.category.toLowerCase().includes(cleanSlug) ||
      i.categoryLabel.toLowerCase().includes(cleanSlug) ||
      i.period.toLowerCase().includes(cleanSlug) ||
      i.material?.toLowerCase().includes(cleanSlug)
    );
  });

  const displayTitle = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1) + ' Collection'
    : 'Curated Thematic Collection';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fadeIn">
      <Breadcrumbs
        items={[
          { label: 'Collections', path: '/discover' },
          { label: displayTitle }
        ]}
      />

      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider block">
          Curatorial Thematic Archive
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          {displayTitle}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Explore specialized holdings curated across regional styles, dynastic ateliers, and material technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-56 overflow-hidden bg-stone-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  onError={(e) => { e.currentTarget.src = '/images/ui/placeholder-heritage.jpg'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                  {item.category}
                </div>
                <div className="absolute top-3 right-3">
                  <VerificationBadge status={item.verificationStatus} size="sm" />
                </div>
              </div>

              <div className="p-6 space-y-2">
                <span className="text-xs font-mono text-[#936B38] font-semibold uppercase">
                  {item.period}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#A64B2A] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <Link
                  to={`/artifact/${item.id}`}
                  className="text-xs font-semibold text-stone-900 hover:text-[#936B38] flex items-center gap-1 transition-colors"
                >
                  <span>Inspect Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-stone-400 truncate max-w-[140px]">
                  {item.repository}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
