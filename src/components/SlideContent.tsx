import React from 'react';
import { motion } from 'motion/react';
import { SlideContentItem, Language } from '../types';

interface SlideContentProps {
  slide: SlideContentItem;
  language: Language;
  slideIndex: number;
}

export const SlideContent: React.FC<SlideContentProps> = ({
  slide,
  language,
  slideIndex,
}) => {
  const isRTL = language === 'ur' || language === 'ar';
  const categoryText = slide.category[language];
  const titleText = slide.title[language];
  const descriptionText = slide.description[language];

  // Specific font and sizing classes for the main statement heading (large & bold)
  const getMainHeadingStyle = () => {
    switch (language) {
      case 'ur':
        return 'font-urdu text-[28px] sm:text-[38px] md:text-[48px] lg:text-[54px] font-bold text-[var(--text-primary)] leading-[1.65] sm:leading-[1.55] py-1';
      case 'ar':
        return 'font-arabic text-[30px] sm:text-[42px] md:text-[50px] lg:text-[60px] font-bold text-[var(--text-primary)] leading-[1.6] sm:leading-[1.5] lg:leading-[1.45]';
      case 'en':
      default:
        return 'font-serif-en text-[36px] sm:text-[48px] md:text-[60px] lg:text-[70px] font-medium text-[var(--text-primary)] leading-[1.15] tracking-[-0.01em]';
    }
  };

  // Specific font and sizing classes for the topic label "Qadiyanism" (smaller/sub-heading)
  const getTopicLabelStyle = () => {
    switch (language) {
      case 'ur':
        return 'font-urdu text-[19px] sm:text-[23px] md:text-[26px] font-semibold text-[var(--accent-olive)] tracking-normal mb-1.5 pt-0.5';
      case 'ar':
        return 'font-arabic text-[18px] sm:text-[21px] md:text-[25px] font-semibold text-[var(--accent-olive)] tracking-normal mb-1.5';
      case 'en':
      default:
        return 'font-serif-en text-lg sm:text-xl md:text-2xl font-medium text-[var(--accent-olive)] tracking-wider uppercase mb-1.5';
    }
  };

  const getBodyStyle = () => {
    switch (language) {
      case 'ur':
        return 'font-urdu text-[18px] sm:text-[21px] md:text-[23px] text-[var(--text-secondary)] font-normal max-w-2xl leading-[2.1] sm:leading-[2.2] py-1';
      case 'ar':
        return 'font-arabic text-[19px] sm:text-[21px] md:text-[23px] text-[var(--text-secondary)] font-normal max-w-2xl leading-[2.0]';
      case 'en':
      default:
        return 'font-sans-en text-lg sm:text-xl text-[var(--text-secondary)] font-light max-w-xl leading-relaxed';
    }
  };

  // Parse prefix and main title based on language
  const renderHeading = () => {
    let prefix = '';
    let mainHeading = titleText;

    if (language === 'en') {
      prefix = 'Qadiyanism';
      mainHeading = 'A False Creed Contrary to the Finality of Prophethood';
    } else if (language === 'ur') {
      prefix = 'قادیانیت';
      mainHeading = 'عقیدۂ ختمِ نبوت کے منافی ایک باطل فرقہ';
    } else if (language === 'ar') {
      prefix = 'القاديانية';
      mainHeading = 'فرقة باطلة مناقضة لعقيدة ختم النبوة';
    }

    return (
      <div className="mb-6 sm:mb-8 w-full flex flex-col">
        {/* Smaller Topic Tag / Prefix */}
        <span className={getTopicLabelStyle()}>
          {prefix}
        </span>
        {/* Main Prominent Large Heading */}
        <h1 className={getMainHeadingStyle()}>
          {mainHeading}
        </h1>
      </div>
    );
  };

  return (
    <motion.div
      key={`slide-${slideIndex}-${language}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full max-w-3xl mx-auto flex flex-col justify-center px-4 sm:px-6 ${
        isRTL ? 'text-right items-start' : 'text-left items-start'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Category Label with Subtle Olive Accent Line */}
      <motion.div
        initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6"
      >
        <div className="w-10 sm:w-12 h-[1.5px] bg-[var(--accent-olive)] shrink-0" />
        <span
          className={`font-semibold text-[var(--accent-olive)] ${
            isRTL
              ? language === 'ur'
                ? 'font-urdu text-[16px] sm:text-[18px] tracking-normal pt-0.5'
                : 'font-arabic-sans text-[14px] sm:text-[15px] tracking-normal'
              : 'font-sans-en text-xs sm:text-[13px] uppercase tracking-[0.2em]'
          }`}
        >
          {categoryText}
        </span>
      </motion.div>

      {/* Main Title Heading (with Smaller Prefix + Large Bold Main Statement) */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full"
      >
        {renderHeading()}
      </motion.div>

      {/* Scholarly Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className={`${getBodyStyle()} w-full`}
      >
        {descriptionText}
      </motion.p>
    </motion.div>
  );
};
