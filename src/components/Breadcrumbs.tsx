import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  highContrast?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, highContrast }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs sm:text-sm">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link
            to="/"
            className={`flex items-center gap-1 transition-colors ${
              highContrast ? 'text-gray-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              {isLast || !item.path ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={`font-medium truncate max-w-[200px] sm:max-w-[320px] ${
                    highContrast ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`transition-colors ${
                    highContrast ? 'text-gray-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
