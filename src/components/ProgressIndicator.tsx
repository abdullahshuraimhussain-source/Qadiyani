import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface ProgressIndicatorProps {
  currentSlide: number;
  totalSlides: number;
  onSelectSlide: (index: number) => void;
  language: Language;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentSlide,
  totalSlides,
  onSelectSlide,
  language,
}) => {
  const isRTL = language === 'ur' || language === 'ar';

  const formatNumber = (num: number) => {
    const formatted = num < 10 ? `0${num}` : `${num}`;
    if (language === 'ur') {
      // Urdu Eastern Arabic-Indic numerals option or standard clean numerals
      const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return formatted.split('').map(d => urduDigits[parseInt(d, 10)] || d).join('');
    }
    if (language === 'ar') {
      const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return formatted.split('').map(d => arabicDigits[parseInt(d, 10)] || d).join('');
    }
    return formatted;
  };

  const currentStr = formatNumber(currentSlide + 1);
  const totalStr = formatNumber(totalSlides);

  return (
    <div
      className="flex flex-col items-center gap-3 select-none"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Numerical Indicator (01 / 03) */}
      <span className="text-xs font-bold tracking-[0.2em] text-[var(--text-secondary)] font-sans-en">
        {currentStr} / {totalStr}
      </span>

      {/* 3-Segment Progress Bar */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === currentSlide;
          const isPassed = idx < currentSlide;

          return (
            <button
              key={idx}
              onClick={() => onSelectSlide(idx)}
              aria-label={`Jump to slide ${idx + 1}`}
              className="group py-1 cursor-pointer"
            >
              <div className="relative h-1 w-10 sm:w-12 rounded-full overflow-hidden bg-[var(--border-light)] transition-colors duration-300 group-hover:bg-[var(--accent-olive)]/40">
                {isActive && (
                  <motion.div
                    layoutId="active-progress-segment"
                    className="absolute inset-0 bg-[var(--accent-olive)] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {!isActive && isPassed && (
                  <div className="absolute inset-0 bg-[var(--accent-olive)]/60 rounded-full" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
