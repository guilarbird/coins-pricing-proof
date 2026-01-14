// Market Data Service - Main entry point
// Aggregates data from all providers and handles routing

import type { MarketQuote, RouteQuote, MarketDataResponse, RouteRequest } from "./types"
import { getValorProUsdBrl, isValorProConfigured } from "./providers/valor-pro"
import { getBinanceUsdtBrl, getBinanceGbpUsdt, getBinanceUsdBrl, isBinanceConfigured } from "./providers/binance"
import { getCoinsUsdtBrl, isCoinsConfigured } from "./providers/coins-xyz"
import { formatTimestamp } from "./utils"

// Get all available quotes
export async function getAllQuotes(): Promise<MarketDataResponse> {
  const errors: string[] = []
  const quotes: Record<string, MarketQuote> = {}

  // Fetch all quotes in parallel
  const [usdBrlValor, usdtBrlCoins, usdtBrlBinance, gbpUsdtBinance] = await Promise.all([
    getValorProUsdBrl().catch((e) => {
      errors.push(`Valor PRO: ${e.message}`)
      return null
    }),
    getCoinsUsdtBrl().catch((e) => {
      errors.push(`Coins.xyz: ${e.message}`)
      return null
    }),
    getBinanceUsdtBrl().catch((e) => {
      errors.push(`Binance USDT/BRL: ${e.message}`)
      return null
    }),
    getBinanceGbpUsdt().catch((e) => {
      errors.push(`Binance GBP/USDT: ${e.message}`)
      return null
    }),
  ])

  if (usdBrlValor) quotes["USD/BRL"] = usdBrlValor
  if (usdtBrlCoins) quotes["USDT/BRL:coins"] = usdtBrlCoins
  if (usdtBrlBinance) quotes["USDT/BRL:binance"] = usdtBrlBinance
  if (gbpUsdtBinance) quotes["GBP/USDT"] = gbpUsdtBinance

  return {
    quotes,
    timestamp: formatTimestamp(),
    errors: errors.length > 0 ? errors : undefined,
  }
}

// Calculate route quote (e.g., GBP -> BRL)
export async function getRouteQuote(request: RouteRequest): Promise<RouteQuote> {
  const { from, to, via } = request

  // GBP -> BRL routing
  if (from === "GBP" && to === "BRL") {
    if (via === "USDT" || !via) {
      return await calculateGbpToBrlViaUsdt()
    } else if (via === "USD") {
      return await calculateGbpToBrlViaUsd()
    }
  }

  // USD -> BRL direct
  if (from === "USD" && to === "BRL") {
    return await calculateUsdToBrl()
  }

  // USDT -> BRL direct
  if (from === "USDT" && to === "BRL") {
    return await calculateUsdtToBrl()
  }

  // Fallback
  return createFallbackRoute(from, to)
}

async function calculateGbpToBrlViaUsdt(): Promise<RouteQuote> {
  // Leg 1: GBP -> USDT
  const gbpUsdt = await getBinanceGbpUsdt()

  // Leg 2: USDT -> BRL (prefer Coins.xyz, fallback to Binance)
  let usdtBrl = await getCoinsUsdtBrl()
  if (usdtBrl.confidence === "unavailable") {
    usdtBrl = await getBinanceUsdtBrl()
  }

  // If GBP/USDT not available, try via USD
  if (gbpUsdt.confidence === "unavailable") {
    return await calculateGbpToBrlViaUsd()
  }

  // Calculate effective rate: GBP -> USDT -> BRL
  const effectiveRate = gbpUsdt.mid * usdtBrl.mid
  const totalSpread = gbpUsdt.spread_bps + usdtBrl.spread_bps

  // Determine overall confidence
  const confidences = [gbpUsdt.confidence, usdtBrl.confidence]
  const overallConfidence = confidences.includes("unavailable")
    ? "unavailable"
    : confidences.includes("indicative")
      ? "indicative"
      : confidences.includes("cached")
        ? "cached"
        : "live"

  return {
    from: "GBP",
    to: "BRL",
    via: "USDT",
    effectiveRate,
    invertedRate: effectiveRate > 0 ? 1 / effectiveRate : 0,
    legs: [
      {
        from: "GBP",
        to: "USDT",
        rate: gbpUsdt.mid,
        spread_bps: gbpUsdt.spread_bps,
        source: gbpUsdt.source,
        sourceName: gbpUsdt.sourceName,
      },
      {
        from: "USDT",
        to: "BRL",
        rate: usdtBrl.mid,
        spread_bps: usdtBrl.spread_bps,
        source: usdtBrl.source,
        sourceName: usdtBrl.sourceName,
      },
    ],
    totalSpread_bps: totalSpread,
    timestamp: formatTimestamp(),
    confidence: overallConfidence,
    sources: [gbpUsdt, usdtBrl],
  }
}

async function calculateGbpToBrlViaUsd(): Promise<RouteQuote> {
  // GBP/USD rate (approximately 1.27)
  const gbpUsdRate = 1.27 // Fallback - would need forex API for live

  // USD -> BRL from Valor PRO
  const usdBrl = await getValorProUsdBrl()

  const effectiveRate = gbpUsdRate * usdBrl.mid

  return {
    from: "GBP",
    to: "BRL",
    via: "USD",
    effectiveRate,
    invertedRate: effectiveRate > 0 ? 1 / effectiveRate : 0,
    legs: [
      {
        from: "GBP",
        to: "USD",
        rate: gbpUsdRate,
        spread_bps: 5, // Typical interbank spread
        source: "composite",
        sourceName: "Interbank Reference",
      },
      {
        from: "USD",
        to: "BRL",
        rate: usdBrl.mid,
        spread_bps: usdBrl.spread_bps,
        source: usdBrl.source,
        sourceName: usdBrl.sourceName,
      },
    ],
    totalSpread_bps: 5 + usdBrl.spread_bps,
    timestamp: formatTimestamp(),
    confidence: usdBrl.confidence,
    sources: [usdBrl],
  }
}

async function calculateUsdToBrl(): Promise<RouteQuote> {
  const usdBrl = await getValorProUsdBrl()

  // Fallback to Binance if Valor PRO unavailable
  if (usdBrl.confidence === "unavailable") {
    const binanceUsdBrl = await getBinanceUsdBrl()
    return {
      from: "USD",
      to: "BRL",
      effectiveRate: binanceUsdBrl.mid,
      invertedRate: binanceUsdBrl.mid > 0 ? 1 / binanceUsdBrl.mid : 0,
      legs: [
        {
          from: "USD",
          to: "BRL",
          rate: binanceUsdBrl.mid,
          spread_bps: binanceUsdBrl.spread_bps,
          source: binanceUsdBrl.source,
          sourceName: binanceUsdBrl.sourceName,
        },
      ],
      totalSpread_bps: binanceUsdBrl.spread_bps,
      timestamp: formatTimestamp(),
      confidence: binanceUsdBrl.confidence,
      sources: [binanceUsdBrl],
    }
  }

  return {
    from: "USD",
    to: "BRL",
    effectiveRate: usdBrl.mid,
    invertedRate: usdBrl.mid > 0 ? 1 / usdBrl.mid : 0,
    legs: [
      {
        from: "USD",
        to: "BRL",
        rate: usdBrl.mid,
        spread_bps: usdBrl.spread_bps,
        source: usdBrl.source,
        sourceName: usdBrl.sourceName,
      },
    ],
    totalSpread_bps: usdBrl.spread_bps,
    timestamp: formatTimestamp(),
    confidence: usdBrl.confidence,
    sources: [usdBrl],
  }
}

async function calculateUsdtToBrl(): Promise<RouteQuote> {
  // Prefer Coins.xyz, fallback to Binance
  let usdtBrl = await getCoinsUsdtBrl()
  if (usdtBrl.confidence === "unavailable") {
    usdtBrl = await getBinanceUsdtBrl()
  }

  return {
    from: "USDT",
    to: "BRL",
    effectiveRate: usdtBrl.mid,
    invertedRate: usdtBrl.mid > 0 ? 1 / usdtBrl.mid : 0,
    legs: [
      {
        from: "USDT",
        to: "BRL",
        rate: usdtBrl.mid,
        spread_bps: usdtBrl.spread_bps,
        source: usdtBrl.source,
        sourceName: usdtBrl.sourceName,
      },
    ],
    totalSpread_bps: usdtBrl.spread_bps,
    timestamp: formatTimestamp(),
    confidence: usdtBrl.confidence,
    sources: [usdtBrl],
  }
}

function createFallbackRoute(from: string, to: string): RouteQuote {
  return {
    from,
    to,
    effectiveRate: 0,
    invertedRate: 0,
    legs: [],
    totalSpread_bps: 0,
    timestamp: formatTimestamp(),
    confidence: "unavailable",
    sources: [],
  }
}

// Export provider status for UI
export function getProviderStatus() {
  return {
    valor_pro: isValorProConfigured(),
    binance: isBinanceConfigured(),
    coins_xyz: isCoinsConfigured(),
  }
}

// Re-export types
export type { MarketQuote, RouteQuote, MarketDataResponse, RouteRequest }
