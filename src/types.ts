export type Language = 'en' | 'ur' | 'ar';
export type Theme = 'light' | 'dark';

export interface SlideContentItem {
  id: number;
  category: {
    en: string;
    ur: string;
    ar: string;
  };
  title: {
    en: string;
    ur: string;
    ar: string;
  };
  description: {
    en: string;
    ur: string;
    ar: string;
  };
  keyTakeaway?: {
    en: string;
    ur: string;
    ar: string;
  };
}

export interface ReferenceItem {
  id: string;
  type: 'quran' | 'hadith' | 'consensus' | 'resolution';
  title: {
    en: string;
    ur: string;
    ar: string;
  };
  source: {
    en: string;
    ur: string;
    ar: string;
  };
  citation: {
    en: string;
    ur: string;
    ar: string;
  };
  quote: {
    en: string;
    ur: string;
    ar: string;
  };
  note?: {
    en: string;
    ur: string;
    ar: string;
  };
}
