import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
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

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
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
            role="radio"
            aria-checked={isActive}
            onClick={() => onLanguageChange(lang.code)}
            className={`relative z-10 px-3.5 sm:px-4 py-1.5 text-xs rounded-full transition-colors duration-200 text-center select-none cursor-pointer flex items-center justify-center ${
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
  );
};
