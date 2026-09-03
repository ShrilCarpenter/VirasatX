import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  backPath?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We could not retrieve this cultural heritage record. Please try again or return to the directory.',
  onRetry,
  backPath = '/discover'
}) => {
  return (
    <div className="max-w-2xl mx-auto my-16 px-4 text-center py-12 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-6">
      <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-bold text-stone-900">{title}</h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto">{message}</p>
      </div>
      <div className="flex items-center justify-center gap-4 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
        <Link
          to={backPath}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Collection</span>
        </Link>
      </div>
    </div>
  );
};
