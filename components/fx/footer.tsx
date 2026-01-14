"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface FooterProps {
  t: (key: string) => string
}

export function FxFooter({ t }: FooterProps) {
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
    <footer className="py-10 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <Image
            src={isLightMode ? "/coins-logo-black-wordmark.png" : "/coins-logo-white-wordmark.png"}
            alt="Coins.xyz"
            width={120}
            height={28}
            className="h-6 w-auto"
          />
        </div>
      </div>
    </footer>
  )
}
