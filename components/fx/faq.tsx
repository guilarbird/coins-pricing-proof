"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqProps {
  t: (key: string) => string
}

export function Faq({ t }: FaqProps) {
  const faqItems = [
    { questionKey: "faq.q1.question", answerKey: "faq.q1.answer" },
    { questionKey: "faq.q2.question", answerKey: "faq.q2.answer" },
    { questionKey: "faq.q3.question", answerKey: "faq.q3.answer" },
    { questionKey: "faq.q4.question", answerKey: "faq.q4.answer" },
  ]

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
            <div className="w-8 h-px bg-border" />
            <span>Support</span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{t("faq.title")}</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="terminal-module rounded-lg overflow-hidden border-0 data-[state=open]:ring-1 data-[state=open]:ring-border"
            >
              <AccordionTrigger className="text-left hover:no-underline px-4 py-3 text-sm">
                <span className="font-medium text-foreground">{t(item.questionKey)}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-xs px-4 pb-4 leading-relaxed">
                {t(item.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
