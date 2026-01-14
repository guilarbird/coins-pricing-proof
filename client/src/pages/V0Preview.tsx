/**
 * V0Preview.tsx
 * 
 * This page renders the complete v0 project structure for preview purposes.
 * It serves as a bridge between the current Vite app and the imported v0 Next.js project.
 * 
 * IMPORTANT: This is a temporary preview page. The main app continues to use the current structure.
 * After approval, a separate PR will merge v0 UI into the main home page.
 */

import React, { useMemo } from "react";
import { useTranslations } from "@/hooks/useTranslations";

/**
 * V0 Components - Imported from v0_full/components/
 * These are the FX-specific components from the v0 project
 */

// Mock components for v0 preview
// In production, these would be imported from v0_full/components/

const V0Header = ({ locale, onToggleLocale }: any) => (
  <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
      <div className="font-bold text-lg">Coins.xyz v0 Preview</div>
      <button
        onClick={onToggleLocale}
        className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
      >
        {locale === "en" ? "PT" : "EN"}
      </button>
    </div>
  </header>
);

const V0Hero = ({ t }: any) => (
  <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
    <div className="container max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        {t("hero.title") || "FX Pricing, Explained."}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">
        {t("hero.subtitle") || "Audit-ready breakdown of what each route takes — and why market-based execution is cheaper."}
      </p>
    </div>
  </section>
);

const V0Simulator = ({ t }: any) => (
  <section id="simulator" className="space-y-6 py-8 md:py-12">
    <div className="container max-w-4xl">
      <h2 className="text-2xl font-bold">Simulator</h2>
      <div className="mt-6 rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          {t("simulator.title") || "Interactive pricing simulator coming soon..."}
        </p>
      </div>
    </div>
  </section>
);

const V0Diagrams = ({ t }: any) => (
  <section className="space-y-6 py-8 md:py-12">
    <div className="container max-w-4xl">
      <h2 className="text-2xl font-bold">How It Works</h2>
      <div className="mt-6 space-y-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold">Cost Breakdown</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Visual representation of costs for each provider
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold">SWIFT vs Direct Path</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Comparison of settlement routes
          </p>
        </div>
      </div>
    </div>
  </section>
);

const V0FAQ = ({ t }: any) => (
  <section className="space-y-6 py-8 md:py-12">
    <div className="container max-w-4xl">
      <h2 className="text-2xl font-bold">FAQ</h2>
      <div className="mt-6 space-y-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold">What is IOF?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            IOF is a Brazilian tax on international transfers
          </p>
        </div>
      </div>
    </div>
  </section>
);

const V0Footer = ({ t }: any) => (
  <footer className="border-t border-border bg-background/95 py-12">
    <div className="container max-w-4xl text-center text-sm text-muted-foreground">
      <p>© 2026 Coins.xyz. All rights reserved.</p>
    </div>
  </footer>
);

/**
 * Main V0Preview Component
 */
export default function V0Preview() {
  const { t, locale, toggleLocale } = useTranslations();

  // Mock pricing data for v0 preview
  const simulatorData = useMemo(() => {
    return {
      sendAmount: 100000,
      receiveAmount: 485000,
      bestProvider: "Coins",
      diffVsBank: 15000,
      diffVsWise: 5000,
    };
  }, []);

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <V0Header locale={locale} onToggleLocale={toggleLocale} />

      {/* Hero Section */}
      <V0Hero t={t} />

      {/* Simulator Section */}
      <V0Simulator t={t} />

      {/* Diagrams Section */}
      <V0Diagrams t={t} />

      {/* FAQ Section */}
      <V0FAQ t={t} />

      {/* Footer */}
      <V0Footer t={t} />

      {/* Info Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 rounded-lg border border-border bg-card p-4 text-sm">
        <p className="font-semibold">v0 Preview Mode</p>
        <p className="mt-2 text-muted-foreground">
          This is a preview of the v0 project. The main app continues to work normally at{" "}
          <a href="/" className="underline hover:text-foreground">
            /
          </a>
        </p>
      </div>
    </main>
  );
}
