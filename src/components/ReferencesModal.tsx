import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Check, Copy } from 'lucide-react';
import { REFERENCES_DATA } from '../data/references';
import { Language } from '../types';

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isRTL = language === 'ur' || language === 'ar';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const headers = {
    title: {
      en: 'Scholarly References',
      ur: 'علمی و شرعی مراجع',
      ar: 'المراجع والمصادر العلمية',
    },
    subtitle: {
      en: 'Foundational Proofs on the Finality of Prophethood & Sect Rulings',
      ur: 'ختمِ نبوت کے قطعی دلائل اور شرعی مآخذ',
      ar: 'أدلة ختم النبوة القطعية والمصادر المعتمدة',
    },
    copyBtn: {
      en: 'Copy',
      ur: 'کاپی کریں',
      ar: 'نسخ',
    },
    copiedBtn: {
      en: 'Copied',
      ur: 'کاپی ہوگیا',
      ar: 'تم النسخ',
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] shadow-2xl p-5 sm:p-8 z-10 my-auto overflow-hidden ${
              isRTL ? 'text-right' : 'text-left'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Header Area */}
            <div className="flex items-start justify-between pb-5 border-b border-[var(--border-light)] shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--accent-olive-subtle)] text-[var(--accent-olive)]">
                  <BookOpen className="w-5 h-5" />
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
                    {headers.title[language]}
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-sans-en mt-0.5">
                    {headers.subtitle[language]}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label={headers.closeBtn[language]}
                className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable References List */}
            <div className="overflow-y-auto py-5 space-y-4 pr-1 sm:pr-2 custom-scrollbar">
              {REFERENCES_DATA.map((ref) => {
                const title = ref.title[language];
                const source = ref.source[language];
                const quote = ref.quote[language];
                const note = ref.note ? ref.note[language] : null;
                const isCopied = copiedId === ref.id;

                return (
                  <div
                    key={ref.id}
                    className="p-4 sm:p-5 rounded-xl border border-[var(--border-light)] bg-black/[0.015] dark:bg-white/[0.02] hover:border-[var(--accent-olive)]/40 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[var(--accent-olive-subtle)] text-[var(--accent-olive)] font-sans-en">
                          {ref.type.toUpperCase()}
                        </span>
                        <span className="text-xs text-[var(--text-secondary)] font-sans-en">
                          {source}
                        </span>
                      </div>

                      <button
                        onClick={() => copyToClipboard(quote, ref.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-sans-en px-2 py-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                        title="Copy text"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                              {headers.copiedBtn[language]}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 opacity-70" />
                            <span>{headers.copyBtn[language]}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h3
                      className={`text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-2 ${
                        isRTL
                          ? language === 'ur'
                            ? 'font-urdu text-[19px]'
                            : 'font-arabic'
                          : 'font-serif-en'
                      }`}
                    >
                      {title}
                    </h3>

                    {/* Quotation block */}
                    <div
                      className={`p-3.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border-light)] text-[var(--text-primary)] mb-2.5 ${
                        isRTL
                          ? language === 'ur'
                            ? 'font-urdu text-[16px] leading-[2.1] py-1'
                            : 'font-arabic text-[15px] leading-[1.9]'
                          : 'font-serif-en text-[16px] italic leading-[1.6]'
                      }`}
                    >
                      {quote}
                    </div>

                    {note && (
                      <p
                        className={`text-xs sm:text-[13px] text-[var(--text-secondary)] ${
                          isRTL
                            ? language === 'ur'
                              ? 'font-urdu leading-[2.0] pt-0.5'
                              : 'font-arabic leading-[1.8]'
                            : 'font-sans-en leading-[1.5]'
                        }`}
                      >
                        <span className="font-semibold text-[var(--accent-olive)]">
                          {language === 'ur' ? 'تفسیری نوٹ: ' : language === 'ar' ? 'إيضاح: ' : 'Scholarly Note: '}
                        </span>
                        {note}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between shrink-0 font-sans-en text-xs text-[var(--text-secondary)]">
              <span>Authentic Primary Sources • Hadith & Ijma'</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-[var(--accent-olive)] text-white font-medium hover:bg-[var(--accent-olive-hover)] transition-colors cursor-pointer"
              >
                {headers.closeBtn[language]}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
