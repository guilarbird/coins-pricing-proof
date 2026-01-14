"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ExternalLink, FileText, AlertTriangle, Wifi, WifiOff, Settings } from "lucide-react"
import { useMarketData, formatTimestampDisplay } from "@/lib/hooks/use-market-data"
import { ValorProIcon, BinanceIcon, CoinsIcon } from "@/components/icons/provider-icons"

interface MethodSourcesProps {
  t: (key: string) => string
}

export function MethodSources({ t }: MethodSourcesProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { data: marketData, isLoading } = useMarketData()

  const dataSources = [
    {
      name: "Institutional FX reference (mid-market)",
      provider: "Valor PRO",
      symbol: "USD/BRL",
      url: "https://valorpro.com.br",
      quote: marketData?.quotes?.["USD/BRL"],
      icon: <ValorProIcon className="w-5 h-5" />,
    },
    {
      name: "On-chain market depth",
      provider: "Binance",
      symbol: "USDT/BRL",
      url: "https://binance.com",
      quote: marketData?.quotes?.["USDT/BRL:binance"],
      icon: <BinanceIcon className="w-5 h-5" />,
    },
    {
      name: "Coins.xyz Digital FX desk / RFQ execution",
      provider: "Coins.xyz OTC",
      symbol: "USDT/BRL",
      url: "https://coins.xyz",
      quote: marketData?.quotes?.["USDT/BRL:coins"],
      icon: <CoinsIcon className="w-5 h-5" variant="colored" />,
    },
  ]

  // Count live sources
  const liveCount = dataSources.filter((s) => s.quote?.confidence === "live").length
  const hasAnyData = dataSources.some((s) => s.quote)

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
        {/* Header - centered */}
        <div className="mb-8 space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
            <div className="w-8 h-px bg-border" />
            <span>Compliance Documentation</span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("method.title")}</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">{t("method.subtitle")}</p>
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
                    <FileText className="w-4 h-4 text-muted-foreground" />
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
                      <span className="font-mono text-[10px] text-foreground shrink-0 w-4">{index + 1}.</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{t(stepKey)}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Data Sources */}
          <div className="terminal-module rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border/30 bg-background/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {t("method.dataSources")}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {isLoading ? (
                  <span className="text-[10px] font-mono text-muted-foreground">Loading...</span>
                ) : liveCount > 0 ? (
                  <>
                    <Wifi className="w-3 h-3 text-success" />
                    <span className="text-[10px] font-mono text-success">
                      {liveCount}/{dataSources.length} Live
                    </span>
                  </>
                ) : hasAnyData ? (
                  <>
                    <Settings className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] font-mono text-muted-foreground">Indicative</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] font-mono text-muted-foreground">Offline</span>
                  </>
                )}
              </div>
            </div>
            <div className="p-4 space-y-2">
              {dataSources.map((source, index) => {
                const confidence = source.quote?.confidence || "indicative"
                const timestamp = source.quote?.timestamp ? formatTimestampDisplay(source.quote.timestamp) : "—"

                return (
                  <div key={index} className="flex items-center justify-between p-2.5 rounded bg-secondary/20">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">{source.icon}</div>
                      <div className="flex flex-col">
                        <span className="text-xs text-foreground">{source.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground">{source.provider}</span>
                          <span className="text-[10px] font-mono text-muted-foreground/50">·</span>
                          <span className="text-[10px] font-mono text-muted-foreground">{source.symbol}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground font-mono">{timestamp}</span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          confidence === "live"
                            ? "bg-success/20 text-success"
                            : confidence === "cached"
                              ? "bg-warning/20 text-warning"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {confidence}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 gap-1 text-foreground hover:text-foreground/80 px-2"
                        asChild
                      >
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                          <span className="text-[10px]">{t("common.viewSources")}</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            {liveCount === 0 && (
              <div className="px-4 pb-4">
                <div className="flex items-start gap-2 p-2.5 rounded bg-muted/30 border border-border/20">
                  <Settings className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Live data requires API configuration. In production, connect Valor PRO, Binance, and Coins.xyz APIs
                    via environment variables.
                  </p>
                </div>
              </div>
            )}
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
