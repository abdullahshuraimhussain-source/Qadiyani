import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface FooterBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAbout: () => void;
  onOpenReferences: () => void;
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

export const FooterBar: React.FC<FooterBarProps> = ({
  language,
  onLanguageChange,
  onOpenAbout,
  onOpenReferences,
}) => {
  const isRTL = language === 'ur' || language === 'ar';

  const localizedLabels = {
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

  const getNavFontClass = () => {
    switch (language) {
      case 'ur':
        return 'font-urdu text-[14px] sm:text-[15px]';
      case 'ar':
        return 'font-arabic-sans text-[13px] sm:text-[14px]';
      case 'en':
      default:
        return 'font-sans-en text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider';
    }
  };

  return (
    <footer className="fixed bottom-4 sm:bottom-6 inset-x-0 flex flex-col items-center gap-2 sm:gap-2.5 z-30 pointer-events-none px-4">
      {/* Editorial Navigation Links (Styled just like they were at the top: clean, elegant text) */}
      <nav
        aria-label="Footer links"
        className={`pointer-events-auto flex items-center gap-4 sm:gap-6 text-[var(--text-secondary)] transition-all duration-300 ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <button
          onClick={onOpenAbout}
          className={`hover:text-[var(--text-primary)] transition-all duration-200 cursor-pointer px-2 sm:px-3 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 ${getNavFontClass()}`}
        >
          {localizedLabels.about[language]}
        </button>

        <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)] opacity-30 shrink-0" />

        <button
          onClick={onOpenReferences}
          className={`hover:text-[var(--text-primary)] transition-all duration-200 cursor-pointer px-2 sm:px-3 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 ${getNavFontClass()}`}
        >
          {localizedLabels.references[language]}
        </button>
      </nav>

      {/* Language Switcher Capsule Box */}
      <div
        role="radiogroup"
        aria-label="Select language"
        className="pointer-events-auto shadow-lg rounded-full bg-[var(--card-bg)]/95 dark:bg-[#1C1B18]/95 backdrop-blur-md border border-[var(--border-light)] p-1 flex items-center gap-1 transition-all duration-300"
      >
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              role="radio"
              aria-checked={isActive}
              onClick={() => onLanguageChange(lang.code)}
              className={`relative z-10 px-3.5 sm:px-4 py-1.5 rounded-full transition-colors duration-200 text-center select-none cursor-pointer flex items-center justify-center whitespace-nowrap ${
                lang.fontClass
              } ${
                isActive
                  ? 'text-white font-medium shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-lang-pill-footer"
                  className="absolute inset-0 bg-[var(--accent-olive)] rounded-full -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{lang.label}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
};
