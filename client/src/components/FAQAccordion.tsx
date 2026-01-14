import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { ChevronDown } from 'lucide-react';

export function FAQAccordion() {
  const { t } = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t('faqQuestion1'),
      answer: t('faqAnswer1'),
    },
    {
      question: t('faqQuestion2'),
      answer: t('faqAnswer2'),
    },
    {
      question: t('faqQuestion3'),
      answer: t('faqAnswer3'),
    },
    {
      question: t('faqQuestion4'),
      answer: t('faqAnswer4'),
    },
  ];

  return (
    <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold mb-6">{t('faq')}</h3>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-slate-700/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 transition text-left"
            >
              <span className="font-medium text-sm">{faq.question}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </button>

            {openIndex === index && (
              <div className="p-4 bg-slate-900/50 border-t border-slate-700/50 text-sm text-muted-foreground">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
