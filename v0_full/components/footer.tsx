"use client"

interface FooterProps {
  t: (key: string) => string
}

export function FxFooter({ t }: FooterProps) {
  return (
    <footer className="py-10 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded metallic-stroke flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px]">C</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground tracking-tight text-sm">COINS</span>
              <span className="text-muted-foreground text-xs font-medium tracking-wider">{t("footer.tradeDesk")}</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-mono">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-mono">
              {t("footer.terms")}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-mono">
              {t("footer.disclaimer")}
            </a>
          </div>
        </div>

        <div className="section-divider my-6" />

        <p className="text-center text-[10px] text-muted-foreground font-mono">{t("footer.copyright")}</p>
      </div>
    </footer>
  )
}
