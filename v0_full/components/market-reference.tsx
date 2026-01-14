"use client"

import { formatBps, formatRate } from "@/lib/format-number"
import { CurrencyIcon } from "@/components/icons/currency-icons"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MarketRate {
  pair: string
  titleKey: string
  descriptionKey: string
  railBadgeKey: string
  railExplainerKey: string
  mid: number
  bid: number
  ask: number
  spreadBps: number
  footerKey?: string
  currencyFrom: "GBP" | "USD" | "USDT"
  currencyTo: "USD" | "BRL"
}

interface MarketReferenceProps {
  t: (key: string) => string
  locale?: "en" | "pt"
}

export function MarketReference({ t, locale = "en" }: MarketReferenceProps) {
  const rates: MarketRate[] = [
    {
      pair: "GBP/USD",
      titleKey: "marketReference.gbpUsd.title",
      descriptionKey: "marketReference.gbpUsd.description",
      railBadgeKey: "marketReference.railBadge.bankFx",
      railExplainerKey: "marketReference.gbpUsd.railExplainer",
      mid: 1.2734,
      bid: 1.2732,
      ask: 1.2736,
      spreadBps: 3,
      currencyFrom: "GBP",
      currencyTo: "USD",
    },
    {
      pair: "USD/BRL",
      titleKey: "marketReference.usdBrl.title",
      descriptionKey: "marketReference.usdBrl.description",
      railBadgeKey: "marketReference.railBadge.localSettlement",
      railExplainerKey: "marketReference.usdBrl.railExplainer",
      mid: 4.9876,
      bid: 4.9856,
      ask: 4.9896,
      spreadBps: 8,
      currencyFrom: "USD",
      currencyTo: "BRL",
    },
    {
      pair: "USDT/BRL",
      titleKey: "marketReference.usdtBrl.title",
      descriptionKey: "marketReference.usdtBrl.description",
      railBadgeKey: "marketReference.railBadge.stablecoinRail",
      railExplainerKey: "marketReference.usdtBrl.railExplainer",
      mid: 4.995,
      bid: 4.992,
      ask: 4.998,
      spreadBps: 12,
      footerKey: "marketReference.usdtBrl.footer",
      currencyFrom: "USDT",
      currencyTo: "BRL",
    },
  ]

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - minimal */}
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
            <div className="w-8 h-px bg-accent/50" />
            <span>{t("marketReference.header")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("marketReference.title")}</h2>
          <p className="text-sm text-muted-foreground max-w-xl">{t("marketReference.subtitle")}</p>
        </div>

        {/* Rate Cards - terminal module style */}
        <div className="grid md:grid-cols-3 gap-5">
          {rates.map((rate) => (
            <div key={rate.pair} className="terminal-module rounded-lg overflow-hidden group">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-background/30">
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-background/90 to-background/60 border-2 border-border/40 flex items-center justify-center shadow-md ring-1 ring-white/5">
                      <CurrencyIcon currency={rate.currencyFrom} className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-background/90 to-background/60 border-2 border-border/40 flex items-center justify-center shadow-md ring-1 ring-white/5">
                      <CurrencyIcon currency={rate.currencyTo} className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="font-semibold text-sm">{rate.pair}</span>
                </div>
                <span className="text-[10px] font-mono text-accent/90 uppercase tracking-wider px-2.5 py-1 rounded-sm bg-accent/10 border border-accent/20 shadow-sm">
                  {t(rate.railBadgeKey)}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                <p className="text-xs text-muted-foreground/80 leading-relaxed border-l-2 border-accent/30 pl-3">
                  {t(rate.railExplainerKey)}
                </p>

                {/* Rates Grid - data terminal style */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Mid rate - primary */}
                  <div className="col-span-2 p-3 rounded bg-secondary/30 border border-border/20">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                        {t("marketReference.mid")}
                      </span>
                      <span className="text-xl font-mono font-bold data-cell">{formatRate(rate.mid, locale)}</span>
                    </div>
                  </div>

                  {/* Bid */}
                  <div className="p-2.5 rounded bg-success/5 border border-success/10">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                        {t("marketReference.bid")}
                      </span>
                    </div>
                    <span className="text-sm font-mono data-cell text-success">{formatRate(rate.bid, locale)}</span>
                  </div>

                  {/* Ask */}
                  <div className="p-2.5 rounded bg-warning/5 border border-warning/10">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingDown className="w-3 h-3 text-warning" />
                      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                        {t("marketReference.ask")}
                      </span>
                    </div>
                    <span className="text-sm font-mono data-cell text-warning">{formatRate(rate.ask, locale)}</span>
                  </div>
                </div>

                {/* Spread indicator - v5: Shows 0 bps explicitly */}
                <div className="flex items-center justify-between pt-3 border-t border-border/20">
                  <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                    {t("marketReference.spread")}
                  </span>
                  <span className="text-sm font-mono font-medium text-accent data-cell">
                    {formatBps(rate.spreadBps)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
