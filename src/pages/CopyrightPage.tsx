import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Mail, 
  Sparkles, 
  Info,
  Scale
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { IMAGE_CREDITS } from '../data/imageCredits';

export const CopyrightPage: React.FC = () => {
  const creditsList = Object.entries(IMAGE_CREDITS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Institutional Trust' }, { label: 'Copyright & Image Rights' }]} />

      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#936B38]/10 text-[#936B38] text-xs font-mono uppercase tracking-wider font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal &amp; Archival Rights Framework</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Image Rights, Provenance &amp; Licensing
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          VirasatX adheres to rigorous provenance documentation. Every visual specimen on this platform is accounted for with primary museum accession records, open-access licenses, and institutional attribution.
        </p>
      </div>

      {/* Overview Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#936B38]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-lg font-bold text-stone-900">
            Public Domain Antiquities
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Ancient Indian monuments, stone inscriptions, and historical bronzes are part of humanity's shared public domain. Photographic surrogates follow CC0 or CC BY licensing standards.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#A64B2A]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-lg font-bold text-stone-900">
            AI Media Disclosure
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Illustrative synthetic visual models are explicitly labelled "Illustrative AI-generated media" and are never misrepresented as physical archaeological survey photographs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-lg font-bold text-stone-900">
            Community Protection
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Living artisan communities and GI guilds retain intellectual and cultural moral rights. User submissions require explicit ownership declarations before curatorial intake.
          </p>
        </div>
      </div>

      {/* Production Image Audit Table (Prompt Section 97) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
              Audit Verification Matrix
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Specimen Rights &amp; Attribution Register
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-500">
            {creditsList.length} Verified Production Records
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-stone-200/90 bg-white shadow-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-mono">
                <th className="p-3.5 font-semibold">Subject / Specimen</th>
                <th className="p-3.5 font-semibold">Source Institution</th>
                <th className="p-3.5 font-semibold">License</th>
                <th className="p-3.5 font-semibold">Attribution Holder</th>
                <th className="p-3.5 font-semibold">Status</th>
                <th className="p-3.5 font-semibold">Audit Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {creditsList.map(([key, item]) => (
                <tr key={key} className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-3.5 font-serif font-bold text-stone-900">
                    <div>{item.subject}</div>
                    <div className="text-[10px] font-mono text-stone-400 font-normal">{item.filename}</div>
                  </td>
                  <td className="p-3.5">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#936B38] hover:underline flex items-center gap-1"
                    >
                      <span className="truncate max-w-[180px]">{item.source}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="p-3.5 font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-800 text-[11px]">
                      {item.license}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-600">
                    {item.creator}
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-medium text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-stone-500">
                    {item.checkedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contributor Rights Declaration (Prompt Section 83) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900">
          User Submissions &amp; Rights Declaration
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          When a researcher, student, or community member submits a living heritage story or photographic record through My VirasatX, they are required to affirm:
        </p>
        <blockquote className="p-4 rounded-xl bg-stone-50 border-l-4 border-[#936B38] text-xs text-stone-700 italic font-serif leading-relaxed">
          "I confirm that I hold the legal rights to submit this documentation, or that this image is legitimately licensed under Creative Commons or the public domain for non-commercial educational repository use, and does not violate indigenous community customary restrictions."
        </blockquote>
        <p className="text-xs text-stone-500 leading-relaxed">
          Submissions remain in an unverified holding queue until editorial verification by project curators.
        </p>
      </section>

      {/* Takedown & Dispute Policy (Prompt Section 88) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#E7D6C0] space-y-4">
        <div className="flex items-center gap-2 text-[#A64B2A]">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Notice &amp; Takedown Procedure
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          If you are an institution, museum, photographer, or cultural representative and believe any specimen photograph or text reproduction infringes your copyright or violates customary community sensitivity, please submit an inquiry. We evaluate all formal provenance concerns within 48 hours.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-stone-800">
            <Mail className="w-4 h-4 text-[#936B38]" />
            <span>curatorial@virasatx.gov.in (AICTE SIH26197)</span>
          </div>
          <span className="text-stone-300">•</span>
          <Link to="/about" className="text-[#936B38] hover:underline font-sans font-semibold">
            Institutional Secretariat &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};
