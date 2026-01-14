import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import translations from '@/lib/translations';

export function useTranslations() {
  const { language } = useContext(LanguageContext);
  
  // Return the translations object for the current language
  // If a key is missing, fallback to EN
  return {
    t: (key: string, defaultValue?: string) => {
      const keys = key.split('.');
      let value: any = translations[language] || translations.en;
      
      for (const k of keys) {
        value = value?.[k];
        if (!value) {
          // Fallback to EN if key not found
          value = translations.en;
          for (const k2 of keys) {
            value = value?.[k2];
          }
          break;
        }
      }
      
      return value || defaultValue || key;
    },
    language,
  };
}
