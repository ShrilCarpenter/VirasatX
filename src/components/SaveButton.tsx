import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SaveButtonProps {
  itemId: string;
  itemType?: string;
  variant?: 'icon' | 'button' | 'pill';
  className?: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  itemId,
  itemType = 'artifact',
  variant = 'button',
  className = '',
}) => {
  const { isFavorite, toggleFavorite } = useAuth();
  const saved = isFavorite(itemId);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaving(true);
    try {
      await toggleFavorite(itemId, itemType);
    } finally {
      setIsSaving(false);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        disabled={isSaving}
        className={`p-2.5 rounded-full transition-all backdrop-blur-md shadow-2xs ${
          saved
            ? 'bg-[#D4AF37] text-stone-950 hover:bg-amber-400'
            : 'bg-black/50 text-white hover:bg-black/75'
        } ${className}`}
        title={saved ? 'Remove from My VirasatX' : 'Save to My VirasatX'}
        aria-label={saved ? 'Remove from saved' : 'Save discovery'}
      >
        {saved ? (
          <BookmarkCheck className="w-4 h-4" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={handleToggle}
        disabled={isSaving}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-2xs ${
          saved
            ? 'bg-[#F7EFE6] text-[#936B38] border border-[#E7D6C0]'
            : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
        } ${className}`}
      >
        {saved ? (
          <>
            <BookmarkCheck className="w-3.5 h-3.5 text-[#936B38]" />
            <span>Saved to My VirasatX</span>
          </>
        ) : (
          <>
            <Bookmark className="w-3.5 h-3.5 text-stone-400" />
            <span>Save to My VirasatX</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isSaving}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
        saved
          ? 'bg-[#151D2A] text-white hover:bg-stone-800 shadow-sm'
          : 'bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 shadow-2xs'
      } ${className}`}
    >
      {saved ? (
        <>
          <BookmarkCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Saved to My VirasatX</span>
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4 text-stone-400" />
          <span>Save Discovery</span>
        </>
      )}
    </button>
  );
};
