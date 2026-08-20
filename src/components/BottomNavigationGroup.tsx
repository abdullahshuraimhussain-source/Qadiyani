import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface BottomNavigationGroupProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onPrevLanguage: () => void;
  onNextLanguage: () => void;
}

interface LanguageOption {
  code: Language;
  label: string;
  fontClass: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', fontClass: 'font-sans-en text-[13px] tracking-normal' },
  { code: 'ur', label: 'اردو', fontClass: 'font-urdu text-[14px] leading-tight pt-0.5' },
  { code: 'ar', label: 'العربية', fontClass: 'font-arabic-sans text-[13px] font-medium' },
];

export const BottomNavigationGroup: React.FC<BottomNavigationGroupProps> = ({
  currentLanguage,
  onLanguageChange,
  onPrevLanguage,
  onNextLanguage,
}) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 select-none">
      {/* Left Navigation Arrow Button */}
      <button
        id="btn-prev-language"
        onClick={onPrevLanguage}
        aria-label="Previous Language"
        title="Previous Language"
        className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-[var(--card-bg)]/95 dark:bg-[#1C1B18]/95 backdrop-blur-md border border-[var(--border-light)] text-[var(--text-secondary)] shadow-lg hover:scale-105 hover:text-[var(--text-primary)] hover:border-[var(--accent-olive)] active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75] transition-transform duration-200 group-hover:-translate-x-0.5" />
      </button>

      {/* Center Language Switcher Pills */}
      <div
        role="radiogroup"
        aria-label="Select language"
        className="relative inline-flex items-center p-1 sm:p-1.5 rounded-full bg-[var(--card-bg)]/95 dark:bg-[#1C1B18]/95 backdrop-blur-md border border-[var(--border-light)] shadow-lg transition-colors duration-300 gap-1"
      >
        {LANGUAGES.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              id={`btn-lang-${lang.code}`}
              role="radio"
              aria-checked={isActive}
              onClick={() => onLanguageChange(lang.code)}
              className={`relative z-10 px-3 sm:px-4 py-1.5 text-xs rounded-full transition-colors duration-200 text-center cursor-pointer flex items-center justify-center ${
                lang.fontClass
              } ${
                isActive
                  ? 'text-white font-medium shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-lang-pill"
                  className="absolute inset-0 bg-[var(--accent-olive)] rounded-full -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{lang.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Navigation Arrow Button */}
      <button
        id="btn-next-language"
        onClick={onNextLanguage}
        aria-label="Next Language"
        title="Next Language"
        className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-[var(--card-bg)]/95 dark:bg-[#1C1B18]/95 backdrop-blur-md border border-[var(--border-light)] text-[var(--text-secondary)] shadow-lg hover:scale-105 hover:text-[var(--text-primary)] hover:border-[var(--accent-olive)] active:scale-95"
      >
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75] transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};
