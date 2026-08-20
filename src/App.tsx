import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { Language, Theme } from './types';
import { SLIDES_DATA } from './data/slides';
import { Header } from './components/Header';
import { SlideContent } from './components/SlideContent';
import { BottomNavigationGroup } from './components/BottomNavigationGroup';
import { BotanicalDecoration } from './components/BotanicalDecoration';
import { AboutModal } from './components/AboutModal';
import { ReferencesModal } from './components/ReferencesModal';

export default function App() {
  const [currentSlide] = useState<number>(0);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('hidayah_lang');
    return (saved === 'en' || saved === 'ur' || saved === 'ar') ? saved : 'en';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('hidayah_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isReferencesOpen, setIsReferencesOpen] = useState<boolean>(false);

  // Wheel debounce / cooldown tracking ref
  const wheelCooldownRef = useRef<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Update HTML element lang attribute and storage
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
    localStorage.setItem('hidayah_lang', language);
  }, [language]);

  // Update theme class on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('hidayah_theme', theme);
  }, [theme]);

  const languages: Language[] = ['en', 'ur', 'ar'];

  const handleNextLanguage = useCallback(() => {
    setLanguage((prev) => {
      const idx = languages.indexOf(prev);
      const nextIdx = (idx + 1) % languages.length;
      return languages[nextIdx];
    });
  }, []);

  const handlePrevLanguage = useCallback(() => {
    setLanguage((prev) => {
      const idx = languages.indexOf(prev);
      const prevIdx = (idx - 1 + languages.length) % languages.length;
      return languages[prevIdx];
    });
  }, []);

  const handleThemeToggle = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Keyboard navigation for language switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if modals are open
      if (isAboutOpen || isReferencesOpen) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        handleNextLanguage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevLanguage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextLanguage, handlePrevLanguage, isAboutOpen, isReferencesOpen]);

  // Mouse wheel navigation with cooldown
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAboutOpen || isReferencesOpen) return;

      // Small delta tolerance to prevent accidental triggers
      if (Math.abs(e.deltaY) < 25 && Math.abs(e.deltaX) < 25) return;

      if (wheelCooldownRef.current) return;

      if (e.deltaY > 0 || e.deltaX > 25) {
        handleNextLanguage();
      } else if (e.deltaY < 0 || e.deltaX < -25) {
        handlePrevLanguage();
      }

      wheelCooldownRef.current = true;
      setTimeout(() => {
        wheelCooldownRef.current = false;
      }, 650);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleNextLanguage, handlePrevLanguage, isAboutOpen, isReferencesOpen]);

  // Touch Swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAboutOpen || isReferencesOpen) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isAboutOpen || isReferencesOpen) return;
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    const minSwipeDistance = 45;

    // Horizontal swipe dominates
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX < 0) {
        handleNextLanguage();
      } else {
        handlePrevLanguage();
      }
    }
    // Vertical swipe
    else if (Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY < 0) {
        handleNextLanguage();
      } else {
        handlePrevLanguage();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const currentSlideData = SLIDES_DATA[currentSlide] || SLIDES_DATA[0];

  return (
    <div
      className="relative w-screen h-screen h-[100dvh] overflow-hidden bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-400 flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle Botanical Decoration Line-Art */}
      <BotanicalDecoration language={language} />

      {/* Fixed Header */}
      <Header
        language={language}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenReferences={() => setIsReferencesOpen(true)}
      />

      {/* Main Full-Screen Presentation Area */}
      <main className="relative flex-1 w-full flex items-center justify-center pt-24 pb-28 px-4 sm:px-12 md:px-20 lg:px-32 z-10">
        <AnimatePresence mode="wait">
          <SlideContent
            key={`content-${language}`}
            slide={currentSlideData}
            language={language}
            slideIndex={0}
          />
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation & Language Controls */}
      <footer className="fixed bottom-4 sm:bottom-6 inset-x-0 flex justify-center z-30 pointer-events-none px-4">
        <div className="pointer-events-auto">
          <BottomNavigationGroup
            currentLanguage={language}
            onLanguageChange={setLanguage}
            onPrevLanguage={handlePrevLanguage}
            onNextLanguage={handleNextLanguage}
          />
        </div>
      </footer>

      {/* Scholarly Modals */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        language={language}
      />

      <ReferencesModal
        isOpen={isReferencesOpen}
        onClose={() => setIsReferencesOpen(false)}
        language={language}
      />
    </div>
  );
}
