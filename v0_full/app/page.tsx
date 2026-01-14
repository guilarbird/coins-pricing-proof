"use client"

import { useMemo } from "react"
import { useTranslations } from "@/lib/i18n/use-translations"
import { FxHeader } from "@/components/fx/header"
import { FxHero } from "@/components/fx/hero"
import { MarketReference } from "@/components/fx/market-reference"
import { Simulator } from "@/components/fx/simulator"
import { Diagrams } from "@/components/fx/diagrams"
import { MethodSources } from "@/components/fx/method-sources"
import { Faq } from "@/components/fx/faq"
import { AudioPlayer } from "@/components/fx/audio-player"
import { FxFooter } from "@/components/fx/footer"
import { MobileCta } from "@/components/fx/mobile-cta"
import { calculateComparison } from "@/lib/pricing/calculate"

export default function Home() {
  const { t, locale, toggleLocale } = useTranslations()

  const scrollToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" })
  }

  const heroComparison = useMemo(() => {
    return calculateComparison({
      sendAmountGBP: 100000,
      gbpUsdRate: 1.2734,
      usdBrlRate: 4.9876,
      usdtBrlRate: 4.995,
      iofModeOverride: "optimized",
    })
  }, [])

  const coinsModel = heroComparison.models.find((m) => m.provider === "coins")!
  const bankModel = heroComparison.models.find((m) => m.provider === "bank")!
  const wiseModel = heroComparison.models.find((m) => m.provider === "wise")!

  const simulatorData = {
    sendAmount: 100000,
    receiveAmount: coinsModel.receiveBRL,
    bestProvider: "Coins",
    diffVsBank: coinsModel.receiveBRL - bankModel.receiveBRL,
    diffVsWise: coinsModel.receiveBRL - wiseModel.receiveBRL,
  }

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <FxHeader locale={locale} onToggleLocale={toggleLocale} />
      <FxHero t={t} locale={locale} simulatorData={simulatorData} onSimulateClick={scrollToSimulator} />
      <MarketReference t={t} locale={locale} />
      <Simulator t={t} locale={locale} />
      <Diagrams t={t} />
      <MethodSources t={t} />
      <AudioPlayer t={t} />
      <Faq t={t} />
      <FxFooter t={t} />
      <MobileCta t={t} onSimulateClick={scrollToSimulator} />
    </main>
  )
}
