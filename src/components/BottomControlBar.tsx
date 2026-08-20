import React from 'react';
import { BookOpen, Compass, Moon, Sun } from 'lucide-react';
import { Language, Theme } from '../types';

interface BottomControlBarProps {
  language: Language;
  theme: Theme;
  onOpenReferences: () => void;
  onThemeToggle: () => void;
}

export const BottomControlBar: React.FC<BottomControlBarProps> = ({
  language,
  theme,
  onOpenReferences,
  onThemeToggle,
}) => {
  const isRTL = language === 'ur' || language === 'ar';
  const isDark = theme === 'dark';

  const labels = {
    references: {
      en: 'References',
      ur: 'حوالہ جات',
      ar: 'المراجع',
    },
    navigation: {
      en: 'Scroll • Swipe • Keys',
      ur: 'اسکرول • سوائپ • کیز',
      ar: 'تمرير • سحب • مفاتيح',
    },
    theme: {
      en: isDark ? 'Light Mode' : 'Dark Mode',
      ur: isDark ? 'روشن موڈ' : 'تاریک موڈ',
      ar: isDark ? 'الوضع النهاري' : 'الوضع الليلي',
    }
  };

  return (
    <div
      className="inline-flex items-center px-6 sm:px-8 py-3 rounded-full bg-white/80 dark:bg-[#181B16]/80 backdrop-blur-md border border-[var(--border-light)] shadow-xl transition-all duration-300 select-none text-[var(--text-secondary)] gap-5 sm:gap-8"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Section 1: References Book Button */}
      <button
        onClick={onOpenReferences}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer group"
      >
        <BookOpen className="w-3.5 h-3.5 text-[var(--text-secondary)] transition-transform duration-200 group-hover:scale-110 group-hover:text-[var(--accent-olive)]" />
        <span className={`whitespace-nowrap ${isRTL ? (language === 'ur' ? 'font-urdu' : 'font-arabic-sans') : 'font-sans-en'}`}>
          {labels.references[language]}
        </span>
      </button>

      {/* Divider */}
      <div className="h-4 w-[1px] bg-[var(--border-light)]" />

      {/* Section 2: Navigation Guide (Scroll / Swipe) */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
        <Compass className="w-3.5 h-3.5" />
        <span className={`whitespace-nowrap ${isRTL ? (language === 'ur' ? 'font-urdu' : 'font-arabic-sans') : 'font-sans-en'}`}>
          {labels.navigation[language]}
        </span>
      </div>

      {/* Divider */}
      <div className="h-4 w-[1px] bg-[var(--border-light)]" />

      {/* Section 3: Theme Toggle */}
      <button
        onClick={onThemeToggle}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer group"
        aria-label="Toggle visual theme"
      >
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-300 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[var(--text-primary)] transition-transform duration-300 group-hover:-rotate-12" />
        )}
        <span className={`whitespace-nowrap ${isRTL ? (language === 'ur' ? 'font-urdu' : 'font-arabic-sans') : 'font-sans-en'}`}>
          {labels.theme[language]}
        </span>
      </button>
    </div>
  );
};
