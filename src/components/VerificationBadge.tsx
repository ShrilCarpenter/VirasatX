import React from 'react';
import { VerificationStatus, ConfidenceLevel } from '../types';
import { ShieldCheck, CheckCircle2, Users, Sparkles, AlertCircle, FileCheck } from 'lucide-react';

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status, size = 'sm' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Scholar-verified':
        return {
          icon: ShieldCheck,
          text: 'Scholar-verified',
          className: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'Curator-reviewed':
        return {
          icon: FileCheck,
          text: 'Curator-reviewed',
          className: 'bg-blue-50 text-blue-800 border-blue-200'
        };
      case 'Source-linked':
        return {
          icon: CheckCircle2,
          text: 'Source-linked',
          className: 'bg-amber-50 text-amber-800 border-amber-200'
        };
      case 'Community-contributed':
        return {
          icon: Users,
          text: 'Community-contributed',
          className: 'bg-purple-50 text-purple-800 border-purple-200'
        };
      case 'AI-assisted':
        return {
          icon: Sparkles,
          text: 'AI-assisted interpretation',
          className: 'bg-indigo-50 text-indigo-800 border-indigo-200'
        };
      case 'Under review':
      default:
        return {
          icon: AlertCircle,
          text: 'Under review',
          className: 'bg-stone-100 text-stone-700 border-stone-300'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${config.className}`}>
      <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      {config.text}
    </span>
  );
};

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ level }) => {
  const getConfig = () => {
    switch (level) {
      case 'High confidence':
        return {
          text: 'High confidence',
          className: 'bg-emerald-100 text-emerald-900 border-emerald-300'
        };
      case 'Moderate confidence':
        return {
          text: 'Moderate confidence',
          className: 'bg-amber-100 text-amber-900 border-amber-300'
        };
      case 'Needs verification':
      default:
        return {
          text: 'Needs verification',
          className: 'bg-rose-100 text-rose-900 border-rose-300'
        };
    }
  };

  const config = getConfig();

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 font-semibold rounded-full border ${config.className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.text}
    </span>
  );
};
