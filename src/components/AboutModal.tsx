import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { GeometricEmblem } from './GeometricEmblem';
import { Language } from '../types';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isRTL = language === 'ur' || language === 'ar';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const content = {
    title: {
      en: 'About Hidayah',
      ur: 'ہدایہ — تعارف و مقصد',
      ar: 'عن منصة هداية',
    },
    subtitle: {
      en: 'Truth • Clarity • Guidance',
      ur: 'حق • وضوح • رہنمائی',
      ar: 'الحق • الوضوح • الهداية',
    },
    body: {
      en: 'HIDAYAH is a digital scholarly publication crafted to present the core Islamic doctrine of Khatm-e-Nubuwwat (the Finality of Prophethood) and provide definitive clarity regarding the claims of Qadiyanism in three primary languages: English, Urdu, and Arabic.\n\nThe project emphasizes uncompromised scholarly integrity, noble aesthetics, and concise, evidence-based presentation founded upon the Holy Qur\'an, authentic Hadith, and universal scholarly consensus (Ijma\').',
      ur: '”ہدایہ“ ایک علمی و تحقیقی پیشکش ہے جس کا مقصد ختمِ نبوت کے بنیادی و قطعی اسلامی عقیدے کو اجاگر کرنا اور قادیانیت کے حوالے سے مستند اسلامی موقف کو تین بین الاقوامی زبانوں (انگریزی، اردو اور عربی) میں پیش کرنا ہے۔\n\nیہ پلیٹ فارم قرآن و سنت اور امت کے متفقہ اجماع کی روشنی میں خالص علمی، پروقار اور واضح انداز میں رہنمائی فراہم کرتا ہے۔',
      ar: '«هداية» هي منصة علمية تهدف إلى إبراز عقيدة ختم النبوة الثابتة بالنصوص القطعية في الشريعة الإسلامية، وبيان الحكم الشرعي الواضح في الفرقة القاديانية بثلاث لغات: الإنجليزية، الأردية، والعربية.\n\nترتكز المنصة على نصوص القرآن الكريم وصحيح السنة النبوية الشريفة وإجماع علماء الأمة الإسلامية بأسلوب علمي رصين ومختصر.',
    },
    closeBtn: {
      en: 'Close',
      ur: 'بند کریں',
      ar: 'إغلاق',
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 dark:bg-black/70 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-xl rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] shadow-2xl p-6 sm:p-8 z-10 my-auto ${
              isRTL ? 'text-right' : 'text-left'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label={content.closeBtn[language]}
              className={`absolute top-5 ${
                isRTL ? 'left-5' : 'right-5'
              } p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="text-[var(--accent-olive)]">
                <GeometricEmblem size={32} />
              </div>
              <div>
                <h2
                  className={`text-xl sm:text-2xl font-bold text-[var(--text-primary)] ${
                    isRTL
                      ? language === 'ur'
                        ? 'font-urdu'
                        : 'font-arabic'
                      : 'font-serif-en tracking-wide'
                  }`}
                >
                  {content.title[language]}
                </h2>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-olive)] font-sans-en mt-0.5">
                  {content.subtitle[language]}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-4 text-[var(--text-secondary)]">
              {content.body[language].split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className={`text-sm sm:text-base leading-relaxed ${
                    isRTL
                      ? language === 'ur'
                        ? 'font-urdu text-[16px] sm:text-[17px] leading-[2.0] py-0.5'
                        : 'font-arabic text-[16px] leading-[1.9]'
                      : 'font-sans-en font-normal leading-[1.7]'
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Footer Divider & Notice */}
            <div className="mt-8 pt-5 border-t border-[var(--border-light)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-sans-en">
              <span className="opacity-80">Three Languages • One Clear Message</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-[var(--accent-olive)] text-white font-medium hover:bg-[var(--accent-olive-hover)] transition-colors cursor-pointer"
              >
                {content.closeBtn[language]}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
