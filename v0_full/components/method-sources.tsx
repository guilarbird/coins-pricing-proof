"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ExternalLink, FileText, AlertTriangle } from "lucide-react"

interface MethodSourcesProps {
  t: (key: string) => string
}

export function MethodSources({ t }: MethodSourcesProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sources = [
    {
      nameKey: "method.wiseMid",
      url: "#",
      timestamp: "2024-01-15 14:30 UTC",
    },
    {
      nameKey: "method.binanceUsdt",
      url: "#",
      timestamp: "2024-01-15 14:30 UTC",
    },
    {
      nameKey: "method.coinsOrderBook",
      url: "#",
      timestamp: "2024-01-15 14:30 UTC",
    },
  ]

  const calculationStepKeys = [
    "method.steps.step1",
    "method.steps.step2",
    "method.steps.step3",
    "method.steps.step4",
    "method.steps.step5",
    "method.steps.step6",
    "method.steps.step7",
    "method.steps.step8",
  ]

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
            <div className="w-8 h-px bg-accent/50" />
            <span>Compliance Documentation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("method.title")}</h2>
          <p className="text-sm text-muted-foreground max-w-xl">{t("method.subtitle")}</p>
        </div>

        <div className="space-y-4">
          {/* Calculation Steps - Collapsible */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="terminal-module rounded-lg overflow-hidden">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-4 py-3 h-auto rounded-none hover:bg-secondary/30"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">{t("method.calculationSteps")}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-2 border-t border-border/20">
                  {calculationStepKeys.map((stepKey, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 rounded bg-secondary/20">
                      <span className="font-mono text-[10px] text-accent shrink-0 w-4">{index + 1}.</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{t(stepKey)}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Data Sources */}
          <div className="terminal-module rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border/30 bg-background/20 flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                {t("method.dataSources")}
              </span>
            </div>
            <div className="p-4 space-y-2">
              {sources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-2.5 rounded bg-secondary/20">
                  <span className="text-xs">{t(source.nameKey)}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground font-mono">{source.timestamp}</span>
                    <Button variant="ghost" size="sm" className="h-6 gap-1 text-accent px-2">
                      <ExternalLink className="w-3 h-3" />
                      <span className="text-[10px]">{t("common.viewSources")}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-warning/5 border border-warning/15">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">{t("method.disclaimer")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
