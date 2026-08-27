import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatYear(year: number): string {
  if (year < 0) {
    return `${Math.abs(year)} BCE`;
  }
  return `${year} CE`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getRegionColor(region: string): { bg: string; text: string; border: string; accent: string } {
  switch (region) {
    case 'North':
      return { bg: 'bg-amber-950/20', text: 'text-amber-300', border: 'border-amber-700/40', accent: '#D4AF37' };
    case 'South':
      return { bg: 'bg-emerald-950/20', text: 'text-emerald-300', border: 'border-emerald-700/40', accent: '#10B981' };
    case 'East':
      return { bg: 'bg-rose-950/20', text: 'text-rose-300', border: 'border-rose-700/40', accent: '#F43F5E' };
    case 'West':
      return { bg: 'bg-orange-950/20', text: 'text-orange-300', border: 'border-orange-700/40', accent: '#F97316' };
    case 'Central':
      return { bg: 'bg-stone-900/40', text: 'text-stone-300', border: 'border-stone-700/40', accent: '#A8A29E' };
    case 'Northeast':
      return { bg: 'bg-teal-950/20', text: 'text-teal-300', border: 'border-teal-700/40', accent: '#14B8A6' };
    default:
      return { bg: 'bg-stone-900/30', text: 'text-stone-300', border: 'border-stone-700/40', accent: '#C5A059' };
  }
}
