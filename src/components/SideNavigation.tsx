import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface SideNavigationProps {
  onPrevLanguage: () => void;
  onNextLanguage: () => void;
  language: Language;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  onPrevLanguage,
  onNextLanguage,
}) => {
  return (
    <>
      {/* Left Navigation Button - Switch Language Backwards */}
      <div className="fixed left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={onPrevLanguage}
          aria-label="Previous Language"
          title="Previous Language (English / Urdu / Arabic)"
          className="group w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-white/70 dark:bg-white/10 border border-[var(--border-light)] text-[var(--text-secondary)] shadow-sm hover:scale-105 hover:text-[var(--text-primary)] hover:border-[var(--accent-olive)] active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>
      </div>

      {/* Right Navigation Button - Switch Language Forwards */}
      <div className="fixed right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={onNextLanguage}
          aria-label="Next Language"
          title="Next Language (English / Urdu / Arabic)"
          className="group w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-white/70 dark:bg-white/10 border border-[var(--border-light)] text-[var(--text-secondary)] shadow-sm hover:scale-105 hover:text-[var(--text-primary)] hover:border-[var(--accent-olive)] active:scale-95"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </>
  );
};
