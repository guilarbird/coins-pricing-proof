"use client"

import { formatBps, formatRate } from "@/lib/format-number"
import { CurrencyIcon } from "@/components/icons/currency-icons"
import { FlagIcon } from "@/components/icons/flag-icons"
import { TrendingUp, TrendingDown, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { useMarketData, getConfidenceBadge, formatTimestampDisplay } from "@/lib/hooks/use-market-data"

interface MarketRate {
  pair: string
  displayPair: string
  titleKey: string
  descriptionKey: string
  railBadgeKey: string
  railExplainerKey: string
  mid: number
  bid: number | null
  ask: number | null
  spreadBps: number
  footerKey?: string
  currencyFrom: "GBP" | "USD" | "USDT"
  currencyTo: "USD" | "BRL"
  flagFrom?: "GB" | "US"
  flagTo?: "US" | "BR"
  dataKey?: string
  confidence?: string
  timestamp?: string
  sourceName?: string
}

interface MarketReferenceProps {
  t: (key: string) => string
  locale?: "en" | "pt"
}

export function MarketReference({ t, locale = "en" }: MarketReferenceProps) {
  const { data: marketData, isLoading, error, refresh } = useMarketData()

  // Default rates (used as fallback)
  const defaultRates: MarketRate[] = [
    {
      pair: "GBP/USD",
      displayPair: "£ / $",
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
      flagFrom: "GB",
      flagTo: "US",
      dataKey: "GBP/USDT", // Map to GBP/USDT from Binance
    },
    {
      pair: "USD/BRL",
      displayPair: "$ / R$",
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
      flagFrom: "US",
      flagTo: "BR",
      dataKey: "USD/BRL", // Map to Valor PRO
    },
    {
      pair: "USDT/BRL",
      displayPair: "₮ / R$",
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
      flagTo: "BR",
      dataKey: "USDT/BRL:coins", // Map to Coins.xyz
    },
  ]

  const rates = defaultRates.map((rate) => {
    if (!marketData?.quotes || !rate.dataKey) return rate

    const liveQuote = marketData.quotes[rate.dataKey]
    if (!liveQuote || liveQuote.confidence === "unavailable") return rate

    return {
      ...rate,
      mid: liveQuote.mid || rate.mid,
      bid: liveQuote.bid,
      ask: liveQuote.ask,
      spreadBps: liveQuote.spread_bps || rate.spreadBps,
      confidence: liveQuote.confidence,
      timestamp: liveQuote.timestamp,
      sourceName: liveQuote.sourceName,
    }
  })

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
            <div className="w-8 h-px bg-border" />
            <span>{t("marketReference.header")}</span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{t("marketReference.title")}</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">{t("marketReference.subtitle")}</p>

          <div className="flex items-center justify-center gap-2 mt-3">
            {isLoading ? (
              <RefreshCw className="w-3 h-3 text-muted-foreground animate-spin" />
            ) : error ? (
              <WifiOff className="w-3 h-3 text-destructive" />
            ) : (
              <Wifi className="w-3 h-3 text-success" />
            )}
            <span className="text-[10px] font-mono text-muted-foreground">
              {isLoading
                ? "Fetching..."
                : marketData?.timestamp
                  ? `Updated ${formatTimestampDisplay(marketData.timestamp)}`
                  : "Indicative rates"}
            </span>
            <button
              onClick={() => refresh()}
              className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Rate Cards - terminal module style */}
        <div className="grid md:grid-cols-3 gap-5">
          {rates.map((rate) => {
            const confidenceBadge = rate.confidence ? getConfidenceBadge(rate.confidence) : null

            return (
              <div key={rate.pair} className="terminal-module rounded-lg overflow-hidden group">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-background/30">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-background/90 to-background/60 border-2 border-border/40 flex items-center justify-center shadow-md ring-1 ring-white/5 relative">
                        <CurrencyIcon currency={rate.currencyFrom} className="w-5 h-5" />
                        {rate.flagFrom && (
                          <div className="absolute -bottom-0.5 -right-0.5">
                            <FlagIcon country={rate.flagFrom} className="w-3 h-2 rounded-[1px] shadow-sm" />
                          </div>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-background/90 to-background/60 border-2 border-border/40 flex items-center justify-center shadow-md ring-1 ring-white/5 relative">
                        <CurrencyIcon currency={rate.currencyTo} className="w-5 h-5" />
                        {rate.flagTo && (
                          <div className="absolute -bottom-0.5 -right-0.5">
                            <FlagIcon country={rate.flagTo} className="w-3 h-2 rounded-[1px] shadow-sm" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-foreground">{rate.displayPair}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{rate.pair}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider px-2.5 py-1 rounded-sm bg-secondary/50 border border-border/30 shadow-sm">
                      {t(rate.railBadgeKey)}
                    </span>
                    {confidenceBadge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${confidenceBadge.className}`}>
                        {confidenceBadge.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  <p className="text-xs text-muted-foreground/80 leading-relaxed border-l-2 border-border/50 pl-3">
                    {t(rate.railExplainerKey)}
                  </p>

                  {rate.sourceName && (
                    <div className="text-[10px] font-mono text-muted-foreground">Source: {rate.sourceName}</div>
                  )}

                  {/* Rates Grid - data terminal style */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Mid rate - primary */}
                    <div className="col-span-2 p-3 rounded bg-secondary/30 border border-border/20">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                          {t("marketReference.mid")}
                        </span>
                        <span className="text-xl font-mono font-bold data-cell text-foreground">
                          {formatRate(rate.mid, locale)}
                        </span>
                      </div>
                    </div>

                    {/* Bid */}
                    <div className="p-2.5 rounded bg-success/5 border border-success/10">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-success" />
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                          {t("marketReference.bid")}
                        </span>
                      </div>
                      <span className="text-sm font-mono data-cell text-success">
                        {rate.bid !== null ? formatRate(rate.bid, locale) : "—"}
                      </span>
                    </div>

                    {/* Ask */}
                    <div className="p-2.5 rounded bg-warning/5 border border-warning/10">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingDown className="w-3 h-3 text-warning" />
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                          {t("marketReference.ask")}
                        </span>
                      </div>
                      <span className="text-sm font-mono data-cell text-warning">
                        {rate.ask !== null ? formatRate(rate.ask, locale) : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Spread indicator */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/20">
                    <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                      {t("marketReference.spread")}
                    </span>
                    <span className="text-sm font-mono font-medium text-foreground data-cell">
                      {formatBps(rate.spreadBps)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
