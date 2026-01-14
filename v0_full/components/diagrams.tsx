"use client"

import { ArrowDown, Building2, Landmark, Users } from "lucide-react"
import { CurrencyIcon } from "@/components/icons/currency-icons"
import { ProviderIcon } from "@/components/icons/provider-icons"

interface DiagramsProps {
  t: (key: string) => string
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
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
              <div className="w-8 h-px bg-accent/50" />
              <span>{t("diagrams.costLayers.headerLabel")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("diagrams.costLayers.title")}</h2>
            <p className="text-sm text-muted-foreground max-w-xl">{t("diagrams.costLayers.subtitle")}</p>
          </div>

          <div className="terminal-module rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border/30 bg-background/20">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                {t("diagrams.costLayers.header")}
              </span>
            </div>
            <div className="p-4 sm:p-6 overflow-x-auto">
              <div className="min-w-[500px]">
                <div className="flex justify-between items-end gap-8 h-56">
                  {providerCosts.map((provider) => {
                    const totalBps = provider.spreadBps + provider.feesBps + provider.iofPercent * 100
                    const scale = totalBps / maxTotal

                    return (
                      <div key={provider.id} className="flex-1 flex flex-col items-center gap-4">
                        <div
                          className="w-full flex flex-col-reverse rounded-sm overflow-hidden shadow-lg"
                          style={{ height: `${scale * 180}px` }}
                        >
                          {/* Spread bar */}
                          <div
                            className="bg-chart-1 flex items-center justify-center min-h-[24px] relative"
                            style={{ height: `${(provider.spreadBps / totalBps) * 100}%` }}
                          >
                            <span className="text-[10px] font-mono text-white font-medium drop-shadow">
                              {provider.spreadBps}
                            </span>
                          </div>
                          <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                          {/* Fees bar */}
                          <div
                            className="bg-chart-2 flex items-center justify-center min-h-[22px] relative"
                            style={{ height: `${(provider.feesBps / totalBps) * 100}%` }}
                          >
                            <span className="text-[10px] font-mono text-white font-medium drop-shadow">
                              {provider.feesBps}
                            </span>
                          </div>
                          <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                          {/* IOF bar */}
                          <div
                            className="bg-chart-3 rounded-t-sm flex items-center justify-center min-h-[22px] relative"
                            style={{ height: `${((provider.iofPercent * 100) / totalBps) * 100}%` }}
                          >
                            <span className="text-[10px] font-mono text-white font-medium drop-shadow">
                              {provider.iofPercent}%
                            </span>
                          </div>
                        </div>
                        <div className="text-center space-y-2">
                          <div className="w-10 h-10 mx-auto rounded-md bg-secondary/50 border border-border/30 flex items-center justify-center">
                            <ProviderIcon provider={provider.id as "bank" | "wise" | "coins"} className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium block">{t(provider.nameKey)}</span>
                          <span className="text-[10px] text-muted-foreground font-mono block">
                            {provider.layers} {t("diagrams.swiftMaze.layerCount")}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-8 mt-8 pt-4 border-t border-border/20">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-chart-1 border border-white/10" />
                    <span className="text-xs text-muted-foreground font-mono">
                      {t("diagrams.costLayers.legend.fxSpread")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-chart-2 border border-white/10" />
                    <span className="text-xs text-muted-foreground font-mono">
                      {t("diagrams.costLayers.legend.fees")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-chart-3 border border-white/10" />
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
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
              <div className="w-8 h-px bg-accent/50" />
              <span>{t("diagrams.swiftMaze.headerLabel")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("diagrams.swiftMaze.title")}</h2>
            <p className="text-sm text-muted-foreground max-w-xl">{t("diagrams.swiftMaze.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Traditional Route - Enhanced */}
            <div className="terminal-module rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border/30 bg-background/20">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {t("diagrams.swiftMaze.traditional")}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-col items-center gap-2">
                  {/* Sender */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-14 h-14 rounded-lg bg-secondary/80 border border-border/40 flex items-center justify-center shadow-sm">
                      <Users className="w-7 h-7 text-foreground" />
                    </div>
                    <span className="text-xs font-medium mt-1">{t("diagrams.swiftMaze.sender")}</span>
                    <div className="flex items-center gap-1">
                      <CurrencyIcon currency="GBP" className="w-4 h-4" />
                      <span className="text-[10px] text-muted-foreground font-mono">GBP</span>
                    </div>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  {/* Local Bank UK */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-md bg-muted/50 border border-border/30 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {t("diagrams.swiftMaze.localBank")}
                    </span>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  <div className="flex flex-col items-center gap-1 relative">
                    <div className="absolute -left-24 top-1/2 -translate-y-1/2 text-[9px] font-mono text-warning/90 bg-warning/10 px-2 py-0.5 rounded border border-warning/20 whitespace-nowrap">
                      {t("diagrams.swiftMaze.nostroVostro")}
                    </div>
                    <div className="w-12 h-12 rounded-md bg-warning/10 border border-warning/30 flex items-center justify-center">
                      <Landmark className="w-5 h-5 text-warning" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {t("diagrams.swiftMaze.correspondentBank")}
                    </span>
                    <div className="flex items-center gap-1">
                      <CurrencyIcon currency="USD" className="w-3 h-3" />
                      <span className="text-[9px] text-muted-foreground font-mono">USD</span>
                    </div>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  <div className="flex flex-col items-center gap-1 relative">
                    <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[9px] font-mono text-destructive/90 bg-destructive/10 px-2 py-0.5 rounded border border-destructive/20 whitespace-nowrap">
                      {t("diagrams.swiftMaze.fxMarkup")}
                    </div>
                    <div className="w-12 h-12 rounded-md bg-warning/10 border border-warning/30 flex items-center justify-center">
                      <Landmark className="w-5 h-5 text-warning" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {t("diagrams.swiftMaze.correspondentBank")}
                    </span>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  {/* Local Bank BR */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-md bg-muted/50 border border-border/30 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {t("diagrams.swiftMaze.localBank")}
                    </span>
                  </div>

                  <ArrowDown className="w-4 h-4 text-muted-foreground/50 my-1" />

                  {/* Receiver */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-14 h-14 rounded-lg bg-secondary/80 border border-border/40 flex items-center justify-center shadow-sm">
                      <Users className="w-7 h-7 text-foreground" />
                    </div>
                    <span className="text-xs font-medium mt-1">{t("diagrams.swiftMaze.receiver")}</span>
                    <div className="flex items-center gap-1">
                      <CurrencyIcon currency="BRL" className="w-4 h-4" />
                      <span className="text-[10px] text-muted-foreground font-mono">BRL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Route - Enhanced */}
            <div className="terminal-module rounded-lg overflow-hidden ring-1 ring-accent/40">
              <div className="px-4 py-2.5 border-b border-accent/20 bg-accent/5">
                <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                  {t("diagrams.swiftMaze.direct")}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-col items-center gap-3">
                  {/* Sender */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-14 h-14 rounded-lg bg-secondary/80 border border-accent/30 flex items-center justify-center shadow-sm">
                      <Users className="w-7 h-7 text-foreground" />
                    </div>
                    <span className="text-xs font-medium mt-1">{t("diagrams.swiftMaze.sender")}</span>
                    <div className="flex items-center gap-1">
                      <CurrencyIcon currency="GBP" className="w-4 h-4" />
                      <span className="text-[10px] text-muted-foreground font-mono">GBP</span>
                    </div>
                  </div>

                  <ArrowDown className="w-5 h-5 text-accent my-2" />

                  {/* Coins - Market Execution */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 border border-accent/40 flex items-center justify-center shadow-sm">
                      <ProviderIcon provider="coins" className="w-7 h-7 text-accent" />
                    </div>
                    <span className="text-xs font-medium mt-1 text-accent">{t("diagrams.swiftMaze.market")}</span>
                  </div>

                  <ArrowDown className="w-5 h-5 text-accent my-2" />

                  {/* Stablecoin Rail */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-md bg-accent/5 border border-accent/30 flex items-center justify-center">
                      <CurrencyIcon currency="USDT" className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {t("diagrams.swiftMaze.stablecoin")}
                    </span>
                  </div>

                  <ArrowDown className="w-5 h-5 text-accent my-2" />

                  {/* Receiver */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-14 h-14 rounded-lg bg-secondary/80 border border-accent/30 flex items-center justify-center shadow-sm">
                      <Users className="w-7 h-7 text-foreground" />
                    </div>
                    <span className="text-xs font-medium mt-1">{t("diagrams.swiftMaze.receiver")}</span>
                    <div className="flex items-center gap-1">
                      <CurrencyIcon currency="BRL" className="w-4 h-4" />
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
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
              <div className="w-8 h-px bg-accent/50" />
              <span>{t("diagrams.bidAsk.headerLabel")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t("diagrams.bidAsk.title")}</h2>
            <p className="text-sm text-muted-foreground max-w-xl">{t("diagrams.bidAsk.subtitle")}</p>
          </div>

          <div className="terminal-module rounded-lg overflow-hidden max-w-2xl mx-auto">
            <div className="px-4 py-2.5 border-b border-border/30 bg-background/20">
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
                <div className="absolute left-[20%] right-[20%] top-1/2 -translate-y-1/2 h-4 bg-accent/10 rounded border border-accent/20" />

                {/* Bid */}
                <div className="absolute left-[20%] -translate-x-1/2 flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-success mb-2 ring-2 ring-success/30 shadow-sm" />
                  <span className="text-xs font-medium">{t("diagrams.bidAsk.bidLabel")}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">4.9856</span>
                </div>

                {/* Mid */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-accent bg-background mb-2 shadow-sm" />
                  <span className="text-xs font-medium text-accent">{t("diagrams.bidAsk.midLabel")}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">4.9876</span>
                </div>

                {/* Ask */}
                <div className="absolute left-[80%] -translate-x-1/2 flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-warning mb-2 ring-2 ring-warning/30 shadow-sm" />
                  <span className="text-xs font-medium">{t("diagrams.bidAsk.askLabel")}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">4.9896</span>
                </div>

                {/* Spread label */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-1">
                  <span className="text-[10px] font-mono text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    {t("diagrams.bidAsk.spreadLabel")}: 8 bps
                  </span>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                {t("diagrams.bidAsk.explanation")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
