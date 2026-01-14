"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

interface MobileCtaProps {
  t: (key: string) => string
  onSimulateClick: () => void
}

export function MobileCta({ t, onSimulateClick }: MobileCtaProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-background/90 backdrop-blur-xl border-t border-border/50 md:hidden z-50">
      <Button
        onClick={onSimulateClick}
        className="w-full metallic-stroke text-primary-foreground font-medium gap-2 h-11 text-sm"
      >
        {t("common.simulateNow")}
        <ArrowDown className="w-4 h-4" />
      </Button>
    </div>
  )
}
