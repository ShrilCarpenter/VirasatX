import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoadingSkeletonProps {
  type?: 'card' | 'page' | 'table';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'card', count = 3 }) => {
  if (type === 'page') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-pulse space-y-8">
        <div className="h-8 bg-stone-200 rounded w-1/3"></div>
        <div className="h-4 bg-stone-200 rounded w-1/2"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-96 bg-stone-200 rounded-2xl md:col-span-2"></div>
          <div className="space-y-4">
            <div className="h-10 bg-stone-200 rounded"></div>
            <div className="h-32 bg-stone-200 rounded"></div>
            <div className="h-20 bg-stone-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-stone-200/70 rounded-2xl h-80 flex flex-col justify-end p-6 space-y-3">
          <div className="h-4 bg-stone-300 rounded w-1/4"></div>
          <div className="h-6 bg-stone-300 rounded w-3/4"></div>
          <div className="h-4 bg-stone-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

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
    <div className="max-w-2xl mx-auto my-16 px-4 text-center py-12 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-6">
      <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-serif text-stone-900">{title}</h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto">{message}</p>
      </div>
      <div className="flex items-center justify-center gap-4 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
        <Link
          to={backPath}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Collection
        </Link>
      </div>
    </div>
  );
};
