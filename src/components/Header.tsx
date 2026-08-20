import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Info, BookOpen } from 'lucide-react';
import { GeometricEmblem } from './GeometricEmblem';
import { ThemeToggle } from './ThemeToggle';
import { Language, Theme } from '../types';

interface HeaderProps {
  language: Language;
  theme: Theme;
  onThemeToggle: () => void;
  onOpenAbout: () => void;
  onOpenReferences: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  theme,
  onThemeToggle,
  onOpenAbout,
  onOpenReferences,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isRTL = language === 'ur' || language === 'ar';

  const localizedLabels = {
    brand: {
      en: 'Qadiani',
      ur: 'قادیانی',
      ar: 'القاديانية',
    },
    tagline: {
      en: {
        line1: 'No Prophet After Muhammad ﷺ',
        line2: 'The Qadiani Claim Rejects the Finality of Prophethood',
      },
      ur: {
        line1: 'محمد ﷺ کے بعد کوئی نبی نہیں',
        line2: 'قادیانی دعویٰ ختمِ نبوت کا انکار ہے',
      },
      ar: {
        line1: 'لا نبي بعد محمد ﷺ',
        line2: 'الدعوى القاديانية تنقض ختم النبوة',
      },
    },
    menu: {
      en: 'Menu',
      ur: 'فہرست',
      ar: 'القائمة',
    },
    aboutTitle: {
      en: 'About',
      ur: 'تعارف و مقصد',
      ar: 'عن المنصة',
    },
    aboutDesc: {
      en: 'Learn about this digital publication',
      ur: 'اس پلیٹ فارم کا علمی تعارف',
      ar: 'نبذة عن المنصة ورسالتها',
    },
    referencesTitle: {
      en: 'References',
      ur: 'علمی حوالہ جات',
      ar: 'المراجع والمصادر',
    },
    referencesDesc: {
      en: 'Hadith, Qur\'an & Consensus proofs',
      ur: 'قرآن، حدیث اور اجماع کے مراجع',
      ar: 'أدلة القرآن والحديث والإجماع',
    },
  };

  const currentTagline = localizedLabels.tagline[language];

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleSelectAbout = () => {
    setIsMenuOpen(false);
    onOpenAbout();
  };

  const handleSelectReferences = () => {
    setIsMenuOpen(false);
    onOpenReferences();
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 min-h-20 sm:min-h-24 py-2.5 px-4 sm:px-8 lg:px-12 flex items-center justify-between border-b border-[var(--border-light)] bg-[var(--bg-main)]/95 backdrop-blur-md transition-colors duration-300"
      dir="ltr"
    >
      {/* Brand Identity */}
      <div className="flex items-center gap-3 sm:gap-4 group cursor-default select-none max-w-[65%] sm:max-w-[75%]">
        <GeometricEmblem size={34} className="w-7 h-7 sm:w-9 sm:h-9 shrink-0" />
        <div className="flex flex-col min-w-0 justify-center">
          <span className="text-sm sm:text-lg lg:text-xl tracking-[0.15em] sm:tracking-[0.2em] font-serif-en font-bold uppercase leading-tight text-[var(--text-primary)]">
            {localizedLabels.brand[language]}
          </span>
          <span
            className={`text-[9px] sm:text-[10.5px] lg:text-[11.5px] text-[var(--text-secondary)] mt-0.5 sm:mt-1 leading-[1.35] sm:leading-[1.4] ${
              isRTL ? (language === 'ur' ? 'font-urdu' : 'font-arabic-sans') : 'font-sans-en'
            }`}
          >
            <span className="block font-medium text-[var(--text-primary)]/85">
              {currentTagline.line1}
            </span>
            <span className="block opacity-80">
              {currentTagline.line2}
            </span>
          </span>
        </div>
      </div>

      {/* Header Controls (Theme Toggle & 3-Line Menu Button on the Right) */}
      <div className="relative flex items-center gap-2 sm:gap-3" ref={menuRef}>
        {/* Theme Toggle */}
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />

        {/* 3-Line Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={localizedLabels.menu[language]}
          aria-expanded={isMenuOpen}
          className={`relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[var(--border-light)] bg-[var(--card-bg)]/80 hover:bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent-olive)] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95 ${
            isMenuOpen ? 'border-[var(--accent-olive)] bg-[var(--card-bg)]' : ''
          }`}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-[var(--accent-olive)] transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="w-5 h-5 text-[var(--text-primary)] transition-transform duration-300" />
          )}
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-full right-0 mt-2.5 w-64 sm:w-72 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] shadow-2xl p-2 z-50 overflow-hidden ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Menu Items List */}
              <div className="flex flex-col gap-1">
                {/* About Button */}
                <button
                  onClick={handleSelectAbout}
                  className={`w-full p-3 rounded-xl flex items-start gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer text-left ${
                    isRTL ? 'text-right flex-row-reverse' : 'text-left flex-row'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[var(--accent-olive-subtle)] text-[var(--accent-olive)] shrink-0 mt-0.5">
                    <Info className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-sm sm:text-base font-semibold text-[var(--text-primary)] ${
                        isRTL
                          ? language === 'ur'
                            ? 'font-urdu'
                            : 'font-arabic'
                          : 'font-serif-en'
                      }`}
                    >
                      {localizedLabels.aboutTitle[language]}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs text-[var(--text-secondary)] opacity-85 mt-0.5 leading-snug ${
                        isRTL
                          ? language === 'ur'
                            ? 'font-urdu leading-tight'
                            : 'font-arabic-sans'
                          : 'font-sans-en'
                      }`}
                    >
                      {localizedLabels.aboutDesc[language]}
                    </span>
                  </div>
                </button>

                <div className="h-[1px] bg-[var(--border-light)] mx-2 opacity-60" />

                {/* References Button */}
                <button
                  onClick={handleSelectReferences}
                  className={`w-full p-3 rounded-xl flex items-start gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer text-left ${
                    isRTL ? 'text-right flex-row-reverse' : 'text-left flex-row'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[var(--accent-olive-subtle)] text-[var(--accent-olive)] shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-sm sm:text-base font-semibold text-[var(--text-primary)] ${
                        isRTL
                          ? language === 'ur'
                            ? 'font-urdu'
                            : 'font-arabic'
                          : 'font-serif-en'
                      }`}
                    >
                      {localizedLabels.referencesTitle[language]}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs text-[var(--text-secondary)] opacity-85 mt-0.5 leading-snug ${
                        isRTL
                          ? language === 'ur'
                            ? 'font-urdu leading-tight'
                            : 'font-arabic-sans'
                          : 'font-sans-en'
                      }`}
                    >
                      {localizedLabels.referencesDesc[language]}
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
