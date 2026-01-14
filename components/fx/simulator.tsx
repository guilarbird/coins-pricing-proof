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
import { FlagIcon } from "@/components/icons/flag-icons"
import { Layers, Info, Trophy, Check } from "lucide-react"
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
        isBest ? "ring-1 ring-gold-400/40" : ""
      }`}
    >
      {isBest && (
        <div className="absolute top-2 right-2 z-10">
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-gold-500/10 border border-gold-400/30">
            <Check className="w-3 h-3 text-gold-300" />
            <span className="text-[9px] font-mono text-gold-300 uppercase tracking-wider">Best</span>
          </div>
        </div>
      )}

      {/* Header bar — Steel */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b ${
          isBest ? "border-gold-400/20 bg-gold-500/5" : "border-steel-700 bg-background/20"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-md flex items-center justify-center border ${
              model.provider === "bank"
                ? "bg-steel-700/50 text-silver-400 border-steel-600"
                : model.provider === "wise"
                  ? "bg-steel-700/50 text-silver-300 border-steel-600"
                  : isBest
                    ? "bg-gold-500/10 text-gold-300 border-gold-400/30"
                    : "bg-steel-700/50 text-silver-300 border-steel-600"
            }`}
          >
            <ProviderIcon provider={model.provider} className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm text-silver-200">{t(model.providerNameKey)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Output Amount — Silver default, Gold for best */}
        <div
          className={`p-3 rounded border ${
            isBest ? "bg-gold-500/5 border-gold-400/20" : "bg-steel-700/30 border-steel-600"
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <FlagIcon country="BR" className="w-4 h-3 rounded-sm opacity-70" />
            <CurrencyIcon currency="BRL" className="w-3.5 h-3.5" />
            <span className="text-[10px] text-silver-400 font-mono uppercase tracking-wider">
              {t("simulator.outputLabel")}
            </span>
          </div>
          <p className={`text-xl font-bold font-mono data-cell ${isBest ? "text-silver-100" : "text-silver-200"}`}>
            {formatCurrency(model.receiveBRL, "BRL", locale)}
          </p>
        </div>

        {/* Cost Breakdown — Silver data rows */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-1.5 border-b border-steel-700/50">
            <span className="text-xs text-silver-400">{t("simulator.fxSpread")}</span>
            <span className="text-xs font-mono data-cell text-silver-200">{formatBps(model.spreadBps)}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-steel-700/50">
            <span className="text-xs text-silver-400">{t("simulator.explicitFees")}</span>
            <span className="text-xs font-mono data-cell text-silver-200">{formatBps(model.feeBpsOrFlat)}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-steel-700/50">
            <span className="text-xs text-silver-400 flex items-center gap-1">
              {t("simulator.iof")}
              {model.notesKey && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-silver-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-48">{t(model.notesKey)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </span>
            <span className="text-xs font-mono data-cell text-silver-200">
              {formatPercent(model.iofPercent, locale)}
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <span className="text-xs text-silver-400 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {t("simulator.settlementLayers")}
            </span>
            <span className="text-xs font-mono data-cell text-silver-200">{model.layersCount}</span>
          </div>
        </div>

        {/* Cost Stack — Steel/Silver bars */}
        <div className="pt-3 border-t border-steel-700 space-y-3">
          <span className="text-[10px] text-silver-500 font-mono uppercase tracking-wider">
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
              <span className="text-silver-400">
                {t("simulator.costLegend.spread")} ({formatBps(model.spreadBps)})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-chart-2 border border-white/10" />
              <span className="text-silver-400">
                {t("simulator.costLegend.fees")} ({formatBps(model.feeBpsOrFlat)})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-chart-3 border border-white/10" />
              <span className="text-silver-400">
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
        <div className="mb-10 space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-silver-500 font-mono uppercase tracking-widest">
            <div className="w-8 h-px bg-steel-600" />
            <span>{t("simulator.header")}</span>
            <div className="w-8 h-px bg-steel-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-silver-100">{t("simulator.title")}</h2>
          <p className="text-sm text-silver-400 max-w-xl mx-auto">{t("simulator.subtitle")}</p>
        </div>

        {/* Input Section — Steel frame, silver text */}
        <div className="terminal-module rounded-lg overflow-hidden mb-8 max-w-2xl mx-auto">
          <div className="px-4 py-2.5 border-b border-steel-700 bg-background/20">
            <span className="text-[10px] font-mono text-silver-500 uppercase tracking-wider">
              {t("simulator.tradeParams")}
            </span>
          </div>
          <div className="p-4 sm:p-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs font-medium flex items-center gap-2 text-silver-300">
                <FlagIcon country="GB" className="w-4 h-3 rounded-sm opacity-70" />
                <CurrencyIcon currency="GBP" className="w-4 h-4" />
                {t("simulator.inputLabel")}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-400 font-mono text-sm">£</span>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pl-7 h-12 text-xl font-mono bg-background border-steel-600 data-cell text-silver-200"
                />
              </div>
            </div>

            {/* IOF Toggle — Steel surface */}
            <div className="flex items-center justify-between p-3 rounded bg-steel-700/30 border border-steel-600">
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-silver-300">{t("simulator.iofToggleLabel")}</p>
                <p className="text-[10px] text-silver-500">{t("simulator.iofNote")}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-silver-500 font-mono">
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

        {/* Execution Summary — Gold for verdict */}
        <div className="mt-8 terminal-module rounded-lg overflow-hidden max-w-2xl mx-auto">
          <div className="px-4 py-2.5 border-b border-steel-700 bg-background/20">
            <div className="flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[10px] font-mono text-silver-500 uppercase tracking-wider">
                {t("common.executionSummary")}
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gold-500/10 border border-gold-400/30 flex items-center justify-center">
                  <ProviderIcon provider={bestProvider} className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-silver-100">{t(`providers.${bestProvider}`)}</p>
                  <p className="text-[10px] text-silver-500 font-mono">{t("simulator.lowestCost")}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[10px] text-silver-500 font-mono uppercase tracking-wider">
                    {t("common.vs")} {t("providers.bank")}
                  </p>
                  <p
                    className={`text-base font-bold data-cell ${savingsVsBank >= 0 ? "text-gold-300" : "text-silver-400"}`}
                  >
                    {formatDiff(savingsVsBank)}
                  </p>
                </div>
                <div className="w-px h-8 bg-steel-600" />
                <div className="text-center">
                  <p className="text-[10px] text-silver-500 font-mono uppercase tracking-wider">
                    {t("common.vs")} {t("providers.wise")}
                  </p>
                  <p
                    className={`text-base font-bold data-cell ${savingsVsWise >= 0 ? "text-gold-300" : "text-silver-400"}`}
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
