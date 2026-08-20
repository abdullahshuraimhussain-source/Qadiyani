import React from 'react';
import { Info, BookOpen } from 'lucide-react';
import { Language } from '../types';

interface ActionPillsProps {
  language: Language;
  onOpenAbout: () => void;
  onOpenReferences: () => void;
}

export const ActionPills: React.FC<ActionPillsProps> = ({
  language,
  onOpenAbout,
  onOpenReferences,
}) => {
  const isRTL = language === 'ur' || language === 'ar';

  const labels = {
    about: {
      en: 'About',
      ur: 'تعارف',
      ar: 'عن الموقع',
    },
    references: {
      en: 'References',
      ur: 'حوالہ جات',
      ar: 'المراجع',
    },
  };

  const getFontClass = () => {
    switch (language) {
      case 'ur':
        return 'font-urdu text-[13.5px]';
      case 'ar':
        return 'font-arabic-sans text-[12.5px]';
      case 'en':
      default:
        return 'font-sans-en text-[12px] uppercase tracking-wider font-semibold';
    }
  };

  return (
    <div
      role="toolbar"
      aria-label="Information and references"
      className="relative inline-flex items-center p-1 rounded-full bg-[#E4E1D9]/40 dark:bg-white/5 border border-[var(--border-light)] shadow-xs transition-colors duration-300 gap-1"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <button
        onClick={onOpenAbout}
        className={`relative px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 ${getFontClass()}`}
      >
        <Info className="w-3.5 h-3.5 text-[var(--accent-olive)] shrink-0" />
        <span>{labels.about[language]}</span>
      </button>

      <div className="w-[1px] h-3.5 bg-[var(--border-light)] opacity-70" />

      <button
        onClick={onOpenReferences}
        className={`relative px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 ${getFontClass()}`}
      >
        <BookOpen className="w-3.5 h-3.5 text-[var(--accent-olive)] shrink-0" />
        <span>{labels.references[language]}</span>
      </button>
    </div>
  );
};
