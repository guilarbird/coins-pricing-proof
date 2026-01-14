import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import translations from '@/lib/translations';

export function useTranslations() {
  const { language } = useContext(LanguageContext);

  const t = (key: keyof typeof translations.en): string => {
    const translationObj = translations[language as keyof typeof translations];
    return (translationObj[key as keyof typeof translationObj] as string) || translations.en[key] || key;
  };

  return { t, language };
}
