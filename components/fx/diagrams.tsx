"use client"

import { ArrowDown, Check } from "lucide-react"
import {
  CurrencyIcon,
  UsdtIcon,
  BarclaysIcon,
  HsbcIcon,
  BnyMellonIcon,
  BtgIcon,
  CoinbaseIcon, // Add Coinbase icon import
} from "@/components/icons/currency-icons"
import { ProviderIcon } from "@/components/icons/provider-icons"
import { FlagIcon } from "@/components/icons/flag-icons"
import Image from "next/image"
import { useState } from "react"

interface DiagramsProps {
  t: (key: string) => string
}

function EdProfile({ className, borderClass = "border-border/40" }: { className?: string; borderClass?: string }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div
        className={`${className} rounded-full border-2 ${borderClass} shadow-sm bg-secondary flex items-center justify-center`}
      >
        <span className="text-lg font-semibold text-foreground">E</span>
      </div>
    )
  }

  return (
    <div className={`${className} rounded-full overflow-hidden border-2 ${borderClass} shadow-sm`}>
      <Image
        src="/ed-profile.jpg"
        alt="Ed"
        width={56}
        height={56}
        className="w-full h-full object-cover"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    </div>
  )
}

export function Diagrams({ t }: DiagramsProps) {
  const providerCosts = [
    {
      id: "bank",
      nameKey: "providers.bank",
      spreadBps: 250,
      feesBps: 80,
      iofPercent: 3.5,
      layers: 4,
    },
    {
      id: "wise",
      nameKey: "providers.wise",
      spreadBps: 50,
      feesBps: 89,
      iofPercent: 1.1,
      layers: 2,
    },
    {
      id: "coins",
      nameKey: "providers.coins",
      spreadBps: 15,
      feesBps: 30,
      iofPercent: 0.38,
      layers: 1,
    },
  ]

  const maxTotal = Math.max(...providerCosts.map((p) => p.spreadBps + p.feesBps + p.iofPercent * 100))

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Cost Layers Diagram */}
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
              <div className="w-8 h-px bg-border" />
              <span>{t("diagrams.costLayers.headerLabel")}</span>
              <div className="w-8 h-px bg-border" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("diagrams.costLayers.title")}</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">{t("diagrams.costLayers.subtitle")}</p>
          </div>

          <div className="terminal-module rounded-lg overflow-hidden border border-border">
            <div className="px-4 py-2.5 border-b border-border bg-muted/30">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                {t("diagrams.costLayers.header")}
              </span>
            </div>
            <div className="p-4 sm:p-6 overflow-x-auto">
              <div className="min-w-[400px]">
                <div className="grid grid-cols-3 gap-6 h-56">
                  {providerCosts.map((provider) => {
                    const totalBps = provider.spreadBps + provider.feesBps + provider.iofPercent * 100
                    const scale = totalBps / maxTotal
                    const isCoins = provider.id === "coins"

                    return (
                      <div key={provider.id} className="flex flex-col items-center gap-4">
                        <div
                          className={`w-full flex flex-col-reverse rounded overflow-hidden shadow-md ${
                            isCoins ? "ring-2 ring-success/50" : ""
                          }`}
                          style={{ height: `${scale * 180}px` }}
                        >
                          {/* Spread bar - metallic */}
                          <div
                            className="bg-muted-foreground/60 flex items-center justify-center min-h-[24px] relative"
                            style={{ height: `${(provider.spreadBps / totalBps) * 100}%` }}
                          >
                            <span className="text-[10px] font-mono text-background font-medium drop-shadow">
                              {provider.spreadBps}
                            </span>
                          </div>
                          <div className="h-px bg-background/20" />
                          {/* Fees bar - metallic lighter */}
                          <div
                            className="bg-muted-foreground/40 flex items-center justify-center min-h-[22px] relative"
                            style={{ height: `${(provider.feesBps / totalBps) * 100}%` }}
                          >
                            <span className="text-[10px] font-mono text-background font-medium drop-shadow">
                              {provider.feesBps}
                            </span>
                          </div>
                          <div className="h-px bg-background/20" />
                          {/* IOF bar - amber/warning */}
                          <div
                            className="bg-warning rounded-t flex items-center justify-center min-h-[22px] relative"
                            style={{ height: `${((provider.iofPercent * 100) / totalBps) * 100}%` }}
                          >
                            <span className="text-[10px] font-mono text-warning-foreground font-medium drop-shadow">
                              {provider.iofPercent}%
                            </span>
                          </div>
                        </div>
                        <div className="text-center space-y-2">
                          <div
                            className={`w-10 h-10 mx-auto rounded-md border flex items-center justify-center ${
                              isCoins ? "bg-success/10 border-success/40" : "bg-muted/50 border-border"
                            }`}
                          >
                            <ProviderIcon provider={provider.id as "bank" | "wise" | "coins"} className="w-5 h-5" />
                          </div>
                          <span className={`text-sm font-medium block ${isCoins ? "text-success" : ""}`}>
                            {t(provider.nameKey)}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono block">
                            {provider.layers} {t("diagrams.swiftMaze.layerCount")}
                          </span>
                          {isCoins && (
                            <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-success">
                              <Check className="w-3 h-3" />
                              <span>Best</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-8 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-muted-foreground/60" />
                    <span className="text-xs text-muted-foreground font-mono">
                      {t("diagrams.costLayers.legend.fxSpread")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-muted-foreground/40" />
                    <span className="text-xs text-muted-foreground font-mono">
                      {t("diagrams.costLayers.legend.fees")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-warning" />
                    <span className="text-xs text-muted-foreground font-mono">
                      {t("diagrams.costLayers.legend.iof")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SWIFT Maze Diagram */}
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
              <div className="w-8 h-px bg-border" />
              <span>{t("diagrams.swiftMaze.headerLabel")}</span>
              <div className="w-8 h-px bg-border" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("diagrams.swiftMaze.title")}</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">{t("diagrams.swiftMaze.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="terminal-module rounded-lg overflow-hidden border border-border">
              <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {t("diagrams.swiftMaze.traditional")}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-col items-center gap-2">
                  {/* Sender: Ed in UK */}
                  <div className="flex flex-col items-center gap-1">
                    <EdProfile className="w-14 h-14" borderClass="border-border" />
                    <span className="text-xs font-medium mt-1">Ed</span>
                    <div className="flex items-center gap-1.5">
                      <FlagIcon country="GB" className="w-4 h-3 rounded-sm opacity-80" />
                      <CurrencyIcon currency="GBP" className="w-4 h-4" />
                      <span className="text-[10px] text-muted-foreground font-mono">GBP</span>
                    </div>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  {/* UK Bank: Barclays */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-md bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
                      <BarclaysIcon className="w-10 h-10" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">Barclays</span>
                    <div className="flex items-center gap-1">
                      <FlagIcon country="GB" className="w-3 h-2 rounded-sm opacity-60" />
                      <span className="text-[9px] text-muted-foreground/70 font-mono">UK Bank</span>
                    </div>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  {/* Correspondent 1: HSBC */}
                  <div className="flex flex-col items-center gap-1 relative">
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-[9px] font-mono text-warning bg-warning/10 px-2 py-0.5 rounded border border-warning/20 whitespace-nowrap">
                      {t("diagrams.swiftMaze.nostroVostro")}
                    </div>
                    <div className="w-12 h-12 rounded-md bg-card border border-warning/30 flex items-center justify-center overflow-hidden">
                      <HsbcIcon className="w-10 h-10" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">HSBC</span>
                    <div className="flex items-center gap-1">
                      <CurrencyIcon currency="USD" className="w-3 h-3" />
                      <span className="text-[9px] text-muted-foreground/70 font-mono">Correspondent</span>
                    </div>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  {/* Correspondent 2: BNY Mellon */}
                  <div className="flex flex-col items-center gap-1 relative">
                    <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[9px] font-mono text-destructive bg-destructive/10 px-2 py-0.5 rounded border border-destructive/20 whitespace-nowrap">
                      {t("diagrams.swiftMaze.fxMarkup")}
                    </div>
                    <div className="w-12 h-12 rounded-md bg-card border border-warning/30 flex items-center justify-center overflow-hidden">
                      <BnyMellonIcon className="w-10 h-10" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">BNY Mellon</span>
                    <div className="flex items-center gap-1">
                      <FlagIcon country="US" className="w-3 h-2 rounded-sm opacity-60" />
                      <span className="text-[9px] text-muted-foreground/70 font-mono">Correspondent</span>
                    </div>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  {/* Local Bank BR: BTG Pactual */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-md border border-border flex items-center justify-center overflow-hidden">
                      <BtgIcon className="w-10 h-10" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">BTG Pactual</span>
                    <div className="flex items-center gap-1">
                      <FlagIcon country="BR" className="w-3 h-2 rounded-sm opacity-60" />
                      <span className="text-[9px] text-muted-foreground/70 font-mono">
                        {t("diagrams.swiftMaze.localBank")}
                      </span>
                    </div>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  {/* Receiver: Ed at BTG */}
                  <div className="flex flex-col items-center gap-1">
                    <EdProfile className="w-14 h-14" borderClass="border-border" />
                    <span className="text-xs font-medium mt-1">Ed</span>
                    <div className="flex items-center gap-1.5">
                      <FlagIcon country="BR" className="w-4 h-3 rounded-sm opacity-80" />
                      <BtgIcon className="w-4 h-4" />
                      <span className="text-[10px] text-muted-foreground font-mono">BRL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="terminal-module rounded-lg overflow-hidden border border-success/40 ring-1 ring-success/30">
              <div className="px-4 py-2.5 border-b border-success/30 bg-success/5">
                <span className="text-[10px] font-mono text-success uppercase tracking-wider">
                  {t("diagrams.swiftMaze.direct")}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <EdProfile className="w-14 h-14" borderClass="border-success/30" />
                    <span className="text-xs font-medium mt-1">Ed</span>
                    <div className="flex items-center gap-1.5">
                      <FlagIcon country="GB" className="w-4 h-3 rounded-sm opacity-80" />
                      <CurrencyIcon currency="GBP" className="w-5 h-5" />
                      <span className="text-[10px] text-muted-foreground font-mono">GBP</span>
                    </div>
                  </div>

                  <ArrowDown className="w-5 h-5 text-success my-2" />

                  <div className="flex flex-col items-center gap-1 relative">
                    <div className="absolute -left-24 top-1/2 -translate-y-1/2 text-[9px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-border whitespace-nowrap">
                      {t("diagrams.swiftMaze.onRamp")}
                    </div>
                    <div className="w-12 h-12 rounded-md bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
                      <CoinbaseIcon className="w-10 h-10" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">Coinbase</span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                      <CurrencyIcon currency="GBP" className="w-3 h-3" />
                      <span>→</span>
                      <UsdtIcon className="w-3 h-3" variant="color" />
                    </div>
                  </div>

                  <ArrowDown className="w-5 h-5 text-success my-2" />

                  {/* Coins OTC Trade Desk - USDT → BRL conversion */}
                  <div className="flex flex-col items-center gap-1 relative">
                    <div className="absolute -right-24 top-1/2 -translate-y-1/2 text-[9px] font-mono text-success bg-success/10 px-2 py-0.5 rounded border border-success/20 whitespace-nowrap">
                      {t("diagrams.swiftMaze.otcSpread")}
                    </div>
                    <div className="w-14 h-14 rounded-lg bg-success/10 border border-success/40 flex items-center justify-center shadow-sm">
                      <ProviderIcon provider="coins" className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-medium mt-1 text-success">{t("diagrams.swiftMaze.otcDesk")}</span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                      <UsdtIcon className="w-3 h-3" variant="color" />
                      <span>→</span>
                      <CurrencyIcon currency="BRL" className="w-3 h-3" />
                    </div>
                  </div>

                  <ArrowDown className="w-5 h-5 text-success my-2" />

                  {/* On-Chain Rail - USDT settlement */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-md bg-success/5 border border-success/30 flex items-center justify-center overflow-hidden p-1">
                      <UsdtIcon className="w-10 h-10" variant="color" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {t("diagrams.swiftMaze.stablecoin")}
                    </span>
                  </div>

                  <ArrowDown className="w-5 h-5 text-success my-2" />

                  {/* Receiver: Ed at BTG with BRL */}
                  <div className="flex flex-col items-center gap-1">
                    <EdProfile className="w-14 h-14" borderClass="border-success/30" />
                    <span className="text-xs font-medium mt-1">Ed</span>
                    <div className="flex items-center gap-1.5">
                      <FlagIcon country="BR" className="w-4 h-3 rounded-sm opacity-80" />
                      <BtgIcon className="w-4 h-4" />
                      <span className="text-[10px] text-muted-foreground font-mono">BRL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bid/Ask/Spread Diagram */}
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
              <div className="w-8 h-px bg-border" />
              <span>{t("diagrams.bidAsk.headerLabel")}</span>
              <div className="w-8 h-px bg-border" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("diagrams.bidAsk.title")}</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">{t("diagrams.bidAsk.subtitle")}</p>
          </div>

          <div className="terminal-module rounded-lg overflow-hidden max-w-2xl mx-auto border border-border">
            <div className="px-4 py-2.5 border-b border-border bg-muted/30">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                {t("diagrams.bidAsk.header")}
              </span>
            </div>
            <div className="p-5 sm:p-6 space-y-6">
              {/* Visual */}
              <div className="relative h-28 flex items-center">
                {/* Line */}
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-border rounded-full" />

                {/* Spread range highlight */}
                <div className="absolute left-[20%] right-[20%] top-1/2 -translate-y-1/2 h-4 bg-muted rounded border border-border" />

                {/* Bid */}
                <div className="absolute left-[20%] -translate-x-1/2 flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-success mb-2 ring-2 ring-success/30 shadow-sm" />
                  <span className="text-xs font-medium">{t("diagrams.bidAsk.bidLabel")}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">4.9856</span>
                </div>

                {/* Mid */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/50 mb-2 ring-2 ring-muted-foreground/20 shadow-sm" />
                  <span className="text-xs font-medium">{t("diagrams.bidAsk.midLabel")}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">4.9876</span>
                </div>

                {/* Ask */}
                <div className="absolute right-[20%] translate-x-1/2 flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-destructive mb-2 ring-2 ring-destructive/30 shadow-sm" />
                  <span className="text-xs font-medium">{t("diagrams.bidAsk.askLabel")}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">4.9896</span>
                </div>
              </div>

              {/* Explanation */}
              <div className="grid grid-cols-3 gap-3 text-center pt-4 border-t border-border">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                    {t("diagrams.bidAsk.spreadLabel")}
                  </span>
                  <span className="text-sm font-medium">4 bps</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                    {t("diagrams.bidAsk.youBuy")}
                  </span>
                  <span className="text-sm font-medium text-destructive">@ Ask</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                    {t("diagrams.bidAsk.youSell")}
                  </span>
                  <span className="text-sm font-medium text-success">@ Bid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
