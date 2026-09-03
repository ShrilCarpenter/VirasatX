import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Eye, Contrast, Keyboard, Sparkles, CheckCircle, Volume2 } from 'lucide-react';

interface AccessibilityPageProps {
  highContrast: boolean;
  onToggleContrast: () => void;
}

export const AccessibilityPage: React.FC<AccessibilityPageProps> = ({
  highContrast,
  onToggleContrast
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Accessibility Standards & Controls' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold">
          <Eye className="w-3.5 h-3.5 text-emerald-600" />
          <span>WCAG 2.1 AA Conformance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Accessibility at VirasatX
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Cultural heritage belongs to all citizens. VirasatX is engineered to provide inclusive, barrier-free access regardless of visual, motor, or language diversity.
        </p>
      </div>

      {/* Live Accessibility Controls */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Visual &amp; Interaction Preferences
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-200">
          <div>
            <span className="font-bold text-sm text-stone-900 block flex items-center gap-2">
              <Contrast className="w-4 h-4 text-[#936B38]" />
              <span>High Contrast Mode</span>
            </span>
            <p className="text-xs text-stone-500 mt-0.5">
              Swaps ivory parchment backgrounds for high-contrast deep black surfaces with bright text for low-vision readers.
            </p>
          </div>
          <button
            onClick={onToggleContrast}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-colors shadow-xs ${
              highContrast ? 'bg-amber-400 text-black' : 'bg-stone-900 text-white'
            }`}
          >
            {highContrast ? 'High Contrast Active' : 'Enable High Contrast'}
          </button>
        </div>
      </div>

      {/* Core Architectural Implementations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
            <Keyboard className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">Keyboard Navigation</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every interactive control, 360° inspector toggle, and modal can be navigated using standard Tab, Shift+Tab, and Enter keys with high-visibility outline focus states. Pressing "/" instantly opens universal search.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
            <Volume2 className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">Speech &amp; Audio Descriptions</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            All artifact dossiers feature speech synthesis narration buttons, enabling blind and visually impaired users to listen to scholarly descriptions and metric chanting.
          </p>
        </div>
      </div>

      {/* Standards Summary */}
      <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-300 text-xs text-stone-600 space-y-2">
        <strong className="text-stone-900 font-semibold block text-sm">Feedback &amp; Continuous Improvement:</strong>
        <p>
          If you encounter any accessibility barriers while inspecting manuscripts or using the 3D inspection studio, please report them to our accessibility engineering team.
        </p>
      </div>
    </div>
  );
};
