import React from 'react';
import { X, Bookmark, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  title = 'Save to My VirasatX',
  description = 'Create a free patron account to curate your personal heritage collection, track manuscript paleography progress, and save living artisan guilds across visits.'
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-6 text-center animate-scaleUp relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-[#F7EFE6] text-[#936B38] flex items-center justify-center mx-auto shadow-2xs">
          <Bookmark className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider block">
            Personal Heritage Registry
          </span>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
            {description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            to="/signup"
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-[#151D2A] hover:bg-[#936B38] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/login"
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center justify-center transition-colors"
          >
            <span>Sign In to Existing Account</span>
          </Link>
        </div>

        <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Public browsing remains 100% free and open without an account.</span>
        </div>
      </div>
    </div>
  );
};
