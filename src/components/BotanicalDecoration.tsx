import React from 'react';
import { Language } from '../types';

interface BotanicalDecorationProps {
  language: Language;
}

export const BotanicalDecoration: React.FC<BotanicalDecorationProps> = ({ language }) => {
  const isRTL = language === 'ur' || language === 'ar';
  return (
    <div
      className={`pointer-events-none absolute bottom-0 select-none overflow-hidden transition-all duration-700 opacity-[0.06] dark:opacity-[0.05] text-[var(--accent-olive)] ${
        isRTL ? 'left-0 origin-bottom-left scale-x-[-1]' : 'right-0 origin-bottom-right'
      }`}
      aria-hidden="true"
    >
      <svg
        width="340"
        height="340"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80"
      >
        {/* Luxury Prestige Geometric Star-Floral Arabesque Curves */}
        <path d="M50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 Z" />
        <path d="M50 80 C50 65 40 55 25 50 C40 45 50 35 50 20 C50 35 60 45 75 50 C60 55 50 65 50 80 Z" />
        <path d="M50 60 C50 52 45 48 38 50 C45 46 50 42 50 34 C50 42 55 46 62 50 C55 48 50 52 50 60 Z" />
      </svg>
    </div>
  );
};
