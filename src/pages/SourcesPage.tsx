import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, BookOpen, ExternalLink, FileCheck, CheckCircle } from 'lucide-react';
import { HERITAGE_ITEMS, MANUSCRIPTS_DATA } from '../data/heritageData';
import { VerificationBadge } from '../components/VerificationBadge';

export const SourcesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Primary Sources, Attribution & Licenses' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Curatorial Accountability &amp; Academic Integrity</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Primary Sources &amp; Attribution
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          VirasatX maintains absolute transparency in cultural documentation. All visual artifacts, inscriptions, and historical claims are directly attributed to verified institutional archives under educational fair-use principles.
        </p>
      </div>

      {/* Verification Status Legend */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Verification Badge Hierarchy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
            <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Scholar-verified</span>
            </span>
            <p className="text-emerald-800 leading-relaxed">
              Corroborated by primary peer-reviewed epigraphical publications (e.g. Epigraphia Indica, ASI Archaeological Reports).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-1.5">
            <span className="font-bold text-blue-900 block flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-blue-700" />
              <span>Curator-reviewed</span>
            </span>
            <p className="text-blue-800 leading-relaxed">
              Audited against official museum accession registries (e.g. National Museum New Delhi, Chennai Government Museum).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1.5">
            <span className="font-bold text-amber-900 block flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-700" />
              <span>Source-linked</span>
            </span>
            <p className="text-amber-800 leading-relaxed">
              Directly cross-referenced with public state archaeology department records and UNESCO World Heritage documentation.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Catalog Accession Audit Table */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Archival Accession Index &amp; Image Licenses
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase font-mono text-[11px]">
                <th className="py-3 px-2">Record ID</th>
                <th className="py-3 px-2">Title</th>
                <th className="py-3 px-2">Primary Institutional Source</th>
                <th className="py-3 px-2">Image License</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {HERITAGE_ITEMS.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-2 font-mono font-bold text-[#936B38] whitespace-nowrap">
                    {item.accessionNo}
                  </td>
                  <td className="py-3 px-2 font-serif font-semibold text-stone-900">
                    <a href={`/artifact/${item.id}`} className="hover:underline">
                      {item.title}
                    </a>
                  </td>
                  <td className="py-3 px-2 text-stone-600">
                    {item.repository}
                  </td>
                  <td className="py-3 px-2 text-stone-500 font-mono text-[11px]">
                    {item.license}
                  </td>
                  <td className="py-3 px-2 whitespace-nowrap">
                    <VerificationBadge status={item.verificationStatus} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Open Access Statement */}
      <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-stone-300 space-y-3">
        <h3 className="font-serif text-xl font-bold text-stone-900">
          Institutional Disclaimer
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          VirasatX is an independent scholarly innovation platform developed for Smart India Hackathon 2026 (SIH26197). We do not claim official government partnerships, endorsements, or proprietary copyright over the public cultural patrimony of India. All archival records cite open cultural data frameworks.
        </p>
      </div>
    </div>
  );
};
