"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowDown, CheckCircle, Clock } from "lucide-react"
import { formatCurrency } from "@/lib/format-number"
import { FlagIcon } from "@/components/icons/flag-icons"

interface HeroProps {
  t: (key: string) => string
  locale: "en" | "pt"
  simulatorData: {
    sendAmount: number
    receiveAmount: number
    bestProvider: string
    diffVsBank: number
    diffVsWise: number
  }
  onSimulateClick: () => void
  onAmountChange: (amount: number) => void
}

export function FxHero({ t, locale, simulatorData, onSimulateClick, onAmountChange }: HeroProps) {
  const timestamp = new Date().toLocaleString(locale === "pt" ? "pt-BR" : "en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  })

  const isSavings = simulatorData.diffVsBank >= 0 && simulatorData.diffVsWise >= 0
  const labelKey = isSavings ? "common.savings" : "common.difference"

  const formatDiff = (value: number) => {
    const sign = value >= 0 ? "+" : ""
    return `${sign}${formatCurrency(Math.abs(value), "BRL", locale)}`
  }

  const primaryCta = locale === "pt" ? "Ver meu spread real" : "Reveal your FX spread"
  const secondaryCta = locale === "pt" ? "Comparar banco vs mercado" : "Compare bank vs market pricing"
  const microcopy =
    locale === "pt"
      ? "O spread nasce da estrutura — não só do provedor."
      : "Spreads are shaped by structure — not just provider."

  return (
    <section className="relative min-h-screen flex items-center pt-14 noise-overlay overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-steel-700/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-steel-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-steel-600" />
                <span className="eyebrow-label">FX · Settlement · Disbursements</span>
              </div>

              <h1 className="hero-title text-balance">
                <span className="text-silver-100">{t("hero.title")}</span>
              </h1>

              <p className="hero-subtitle text-silver-400 text-pretty">{t("hero.subtitle")}</p>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={onSimulateClick} className="cta-primary gap-2 h-11">
                  {primaryCta}
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="lg" onClick={onSimulateClick} className="cta-secondary h-11">
                  {secondaryCta}
                </Button>
              </div>

              <p className="text-xs font-mono text-silver-500 mt-2">{microcopy}</p>
            </div>

            <div className="trust-row mt-4">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold-300" />
                <span className="text-silver-400">{t("common.allCostsShown")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold-300" />
                <span className="text-silver-400">{t("common.sourcesLinked")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-steel-400" />
                <span className="text-silver-500">{timestamp}</span>
              </div>
            </div>
          </div>

          {/* Right: Quote Card — Steel framed */}
          <div className="relative">
            <div className="terminal-module rounded-lg overflow-hidden border border-steel-600">
              <div className="flex items-center justify-between px-5 py-3 border-b border-steel-700 bg-background/30">
                <div className="flex items-center gap-2">
                  <div className="status-indicator live" />
                  <span className="eyebrow-label">{locale === "pt" ? "Cotação Indicativa" : "Indicative Quote"}</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gold-500/10 text-gold-300 border-gold-400/20 text-xs font-mono h-5"
                >
                  {t("common.bestProvider")}: {simulatorData.bestProvider}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 space-y-5">
                {/* Send row — Silver */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 eyebrow-label">
                    <FlagIcon country="GB" className="w-4 h-3 rounded-sm opacity-70" />
                    {t("common.youSend")}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-silver-200 shrink-0">£</span>
                    <Input
                      type="number"
                      value={simulatorData.sendAmount}
                      onChange={(e) => onAmountChange(Number(e.target.value) || 0)}
                      className="text-2xl sm:text-3xl font-bold tracking-tight data-cell bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto p-0 min-w-0 flex-1 text-silver-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-sm text-silver-400 font-mono shrink-0">GBP</span>
                  </div>
                </div>

                {/* Steel divider */}
                <div className="steel-divider" />

                {/* Receive row — Silver by default, Gold only for confirmed advantage */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 eyebrow-label">
                    <FlagIcon country="BR" className="w-4 h-3 rounded-sm opacity-70" />
                    {t("common.youReceive")} (Coins.xyz)
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span
                      className={`text-2xl sm:text-3xl font-bold tracking-tight data-cell ${isSavings ? "text-gold-300" : "text-silver-200"}`}
                    >
                      {formatCurrency(simulatorData.receiveAmount, "BRL", locale)}
                    </span>
                    <span className="text-sm text-silver-400 font-mono">BRL</span>
                  </div>
                </div>

                {/* Differences grid — Gold for positive, silver for neutral */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-steel-700">
                  <div className="space-y-1">
                    <span className="eyebrow-label text-[10px]">
                      {t(labelKey)} {t("common.vs")} {t("providers.bank")}
                    </span>
                    <p
                      className={`text-base font-bold data-cell ${simulatorData.diffVsBank >= 0 ? "text-gold-300" : "text-silver-400"}`}
                    >
                      {formatDiff(simulatorData.diffVsBank)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="eyebrow-label text-[10px]">
                      {t(labelKey)} {t("common.vs")} {t("providers.wise")}
                    </span>
                    <p
                      className={`text-base font-bold data-cell ${simulatorData.diffVsWise >= 0 ? "text-gold-300" : "text-silver-400"}`}
                    >
                      {formatDiff(simulatorData.diffVsWise)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle steel glow behind card */}
            <div className="absolute -z-10 -inset-4 bg-steel-700/20 rounded-2xl blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
