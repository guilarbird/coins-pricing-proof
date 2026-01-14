"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"

interface HeaderProps {
  locale: "en" | "pt"
  onToggleLocale: () => void
}

export function FxHeader({ locale, onToggleLocale }: HeaderProps) {
  const [isLightMode, setIsLightMode] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light"))
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Image
              src={isLightMode ? "/coins-logo-black-wordmark.png" : "/coins-logo-white-wordmark.png"}
              alt="Coins.xyz"
              width={140}
              height={32}
              className="h-7 w-auto"
              priority
            />
          </div>

          {/* Right side - status + theme + language */}
          <div className="flex items-center gap-4">
            {/* Live status indicator */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="status-indicator live" />
              <span className="hidden sm:inline font-mono uppercase tracking-wider">Live</span>
            </div>

            <div className="w-px h-4 bg-border" />

            <ThemeToggle />

            <div className="w-px h-4 bg-border" />

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleLocale}
              className="text-muted-foreground hover:text-foreground gap-1.5 h-8 px-2"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="uppercase text-xs font-mono tracking-wider">{locale}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
