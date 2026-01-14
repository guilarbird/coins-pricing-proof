"use client"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { formatCurrency, formatBps, formatPercent } from "@/lib/format-number"
import { calculateComparison } from "@/lib/pricing/calculate"
import type { PricingModel, IofMode, ComparisonResult } from "@/lib/pricing/types"
import { CurrencyIcon } from "@/components/icons/currency-icons"
import { ProviderIcon } from "@/components/icons/provider-icons"
import { Layers, Info, Trophy, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SimulatorProps {
  t: (key: string) => string
  locale: "en" | "pt"
}

function ProviderCard({
  model,
  isBest,
  t,
  locale,
}: {
  model: PricingModel
  isBest: boolean
  t: (key: string) => string
  locale: "en" | "pt"
}) {
  const totalBps = model.spreadBps + model.feeBpsOrFlat + model.iofPercent * 100
  const spreadWidth = totalBps > 0 ? (model.spreadBps / totalBps) * 100 : 0
  const feesWidth = totalBps > 0 ? (model.feeBpsOrFlat / totalBps) * 100 : 0
  const iofWidth = totalBps > 0 ? ((model.iofPercent * 100) / totalBps) * 100 : 0

  return (
    <div
      className={`terminal-module rounded-lg overflow-hidden relative transition-all ${
        isBest ? "ring-2 ring-accent/60 shadow-lg shadow-accent/10" : ""
      }`}
    >
      {isBest && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-b-md bg-accent text-accent-foreground text-[10px] font-mono uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            {t("simulator.bestForScenario")}
          </div>
        </div>
      )}

      {/* Header bar */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b ${isBest ? "border-accent/30 bg-accent/5 pt-5" : "border-border/30 bg-background/20"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-md flex items-center justify-center border ${
              model.provider === "bank"
                ? "bg-muted/50 text-muted-foreground border-border/30"
                : model.provider === "wise"
                  ? "bg-secondary/50 text-foreground border-border/30"
                  : "bg-accent/10 text-accent border-accent/30"
            }`}
          >
            <ProviderIcon provider={model.provider} className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm">{t(model.providerNameKey)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Output Amount - primary data */}
        <div
          className={`p-3 rounded border ${isBest ? "bg-accent/5 border-accent/20" : "bg-secondary/30 border-border/20"}`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <CurrencyIcon currency="BRL" className="w-3.5 h-3.5" />
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              {t("simulator.outputLabel")}
            </span>
          </div>
          <p className={`text-xl font-bold font-mono data-cell ${isBest ? "text-accent" : ""}`}>
            {formatCurrency(model.receiveBRL, "BRL", locale)}
          </p>
        </div>

        {/* Cost Breakdown - data rows */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-1.5 border-b border-border/10">
            <span className="text-xs text-muted-foreground">{t("simulator.fxSpread")}</span>
            <span className="text-xs font-mono data-cell">{formatBps(model.spreadBps)}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border/10">
            <span className="text-xs text-muted-foreground">{t("simulator.explicitFees")}</span>
            <span className="text-xs font-mono data-cell">{formatBps(model.feeBpsOrFlat)}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border/10">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              {t("simulator.iof")}
              {model.notesKey && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-48">{t(model.notesKey)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </span>
            <span className="text-xs font-mono data-cell">{formatPercent(model.iofPercent, locale)}</span>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {t("simulator.settlementLayers")}
            </span>
            <span className="text-xs font-mono data-cell">{model.layersCount}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-border/20 space-y-3">
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            {t("simulator.costStack")}
          </span>
          <div className="h-3.5 rounded-sm bg-background/50 overflow-hidden flex shadow-inner">
            {spreadWidth > 0 && (
              <>
                <div
                  className="h-full bg-chart-1 transition-all flex items-center justify-center"
                  style={{ width: `${spreadWidth}%` }}
                  title={`${t("simulator.costLegend.spread")}: ${formatBps(model.spreadBps)}`}
                />
                {(feesWidth > 0 || iofWidth > 0) && (
                  <div className="w-px h-full bg-gradient-to-b from-white/40 via-white/20 to-white/40" />
                )}
              </>
            )}
            {feesWidth > 0 && (
              <>
                <div
                  className="h-full bg-chart-2 transition-all flex items-center justify-center"
                  style={{ width: `${feesWidth}%` }}
                  title={`${t("simulator.costLegend.fees")}: ${formatBps(model.feeBpsOrFlat)}`}
                />
                {iofWidth > 0 && (
                  <div className="w-px h-full bg-gradient-to-b from-white/40 via-white/20 to-white/40" />
                )}
              </>
            )}
            {iofWidth > 0 && (
              <div
                className="h-full bg-chart-3 transition-all flex items-center justify-center"
                style={{ width: `${iofWidth}%` }}
                title={`${t("simulator.costLegend.iof")}: ${formatPercent(model.iofPercent, locale)}`}
              />
            )}
          </div>
          <div className="flex gap-4 text-[10px] flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-chart-1 border border-white/10" />
              <span className="text-muted-foreground">
                {t("simulator.costLegend.spread")} ({formatBps(model.spreadBps)})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-chart-2 border border-white/10" />
              <span className="text-muted-foreground">
                {t("simulator.costLegend.fees")} ({formatBps(model.feeBpsOrFlat)})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-chart-3 border border-white/10" />
              <span className="text-muted-foreground">
                {t("simulator.costLegend.iof")} ({formatPercent(model.iofPercent, locale)})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Simulator({ t, locale }: SimulatorProps) {
  const [amount, setAmount] = useState(100000)
  const [iofMode, setIofMode] = useState<IofMode>("standard")

  const comparison: ComparisonResult = useMemo(() => {
    return calculateComparison({
      sendAmountGBP: amount,
      gbpUsdRate: 1.2734,
      usdBrlRate: 4.9876,
      usdtBrlRate: 4.995,
      iofModeOverride: iofMode,
    })
  }, [amount, iofMode])

  const { models, bestProvider, savingsVsBank, savingsVsWise, savingsLabel } = comparison

  const handleIofToggle = (checked: boolean) => {
    setIofMode(checked ? "optimized" : "standard")
  }

  const formatDiff = (value: number) => {
    const sign = value >= 0 ? "+" : ""
    return `${sign}${formatCurrency(Math.abs(value), "BRL", locale)}`
  }

  return (
    <section id="simulator" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
            <div className="w-8 h-px bg-accent/50" />
            <span>{t("simulator.header")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("simulator.title")}</h2>
          <p className="text-sm text-muted-foreground max-w-xl">{t("simulator.subtitle")}</p>
        </div>

        {/* Input Section - execution parameters */}
        <div className="terminal-module rounded-lg overflow-hidden mb-8 max-w-2xl mx-auto">
          <div className="px-4 py-2.5 border-b border-border/30 bg-background/20">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              {t("simulator.tradeParams")}
            </span>
          </div>
          <div className="p-4 sm:p-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs font-medium flex items-center gap-2">
                <CurrencyIcon currency="GBP" className="w-4 h-4" />
                {t("simulator.inputLabel")}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">
                  £
                </span>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pl-7 h-12 text-xl font-mono bg-background border-border/50 data-cell"
                />
              </div>
            </div>

            {/* IOF Toggle - parameter selector style */}
            <div className="flex items-center justify-between p-3 rounded bg-secondary/30 border border-border/20">
              <div className="space-y-0.5">
                <p className="text-xs font-medium">{t("simulator.iofToggleLabel")}</p>
                <p className="text-[10px] text-muted-foreground">{t("simulator.iofNote")}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-mono">
                  {iofMode === "optimized" ? t("simulator.iofOptimized") : t("simulator.iofStandard")}
                </span>
                <Switch checked={iofMode === "optimized"} onCheckedChange={handleIofToggle} />
              </div>
            </div>
          </div>
        </div>

        {/* Provider Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {models.map((model) => (
            <ProviderCard
              key={model.provider}
              model={model}
              isBest={model.provider === bestProvider}
              t={t}
              locale={locale}
            />
          ))}
        </div>

        <div className="mt-8 terminal-module rounded-lg overflow-hidden max-w-2xl mx-auto">
          <div className="px-4 py-2.5 border-b border-accent/20 bg-accent/5">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                {t("common.bestProvider")}
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <ProviderIcon provider={bestProvider} className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">{t(`providers.${bestProvider}`)}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{t("simulator.bestForScenario")}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                    {savingsLabel === "savings" ? t("common.savings") : t("common.difference")} {t("common.vs")}{" "}
                    {t("providers.bank")}
                  </p>
                  <p
                    className={`text-base font-bold data-cell ${savingsVsBank >= 0 ? "text-accent" : "text-muted-foreground"}`}
                  >
                    {formatDiff(savingsVsBank)}
                  </p>
                </div>
                <div className="w-px h-8 bg-border/30" />
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                    {savingsLabel === "savings" ? t("common.savings") : t("common.difference")} {t("common.vs")}{" "}
                    {t("providers.wise")}
                  </p>
                  <p
                    className={`text-base font-bold data-cell ${savingsVsWise >= 0 ? "text-accent" : "text-muted-foreground"}`}
                  >
                    {formatDiff(savingsVsWise)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
