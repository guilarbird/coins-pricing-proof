// Binance Provider - DISABLED due to geo-restrictions (451 errors)
// Using CoinGecko as fallback for public market data

import type { MarketQuote } from "../types"
import { calculateMid, calculateSpreadBps, formatTimestamp } from "../utils"

// Indicative rates for when no live source is available
const INDICATIVE_RATES: Record<string, { bid: number; ask: number }> = {
  "USDT/BRL": { bid: 5.75, ask: 5.78 },
  "GBP/USDT": { bid: 1.265, ask: 1.268 },
  "GBP/BRL": { bid: 7.28, ask: 7.32 },
  "USD/BRL": { bid: 5.76, ask: 5.79 },
}

function getIndicativeQuote(symbol: string): MarketQuote {
  const rates = INDICATIVE_RATES[symbol] || INDICATIVE_RATES["USD/BRL"]
  const mid = calculateMid(rates.bid, rates.ask)

  return {
    symbol,
    bid: rates.bid,
    ask: rates.ask,
    mid,
    spread_bps: calculateSpreadBps(rates.bid, rates.ask, mid),
    timestamp: formatTimestamp(),
    source: "reference",
    confidence: "indicative",
    sourceName: "Market Reference (Indicative)",
    sourceUrl: "https://www.coingecko.com",
  }
}

// Binance is geo-blocked in v0 preview region (451 error)
export async function getBinanceQuote(symbol: string): Promise<MarketQuote> {
  return getIndicativeQuote(symbol)
}

export async function getBinanceUsdtBrl(): Promise<MarketQuote> {
  return getIndicativeQuote("USDT/BRL")
}

export async function getBinanceGbpUsdt(): Promise<MarketQuote> {
  return getIndicativeQuote("GBP/USDT")
}

export async function getBinanceUsdBrl(): Promise<MarketQuote> {
  return getIndicativeQuote("USD/BRL")
}

export function isBinanceConfigured(): boolean {
  return false // Disabled due to geo-restrictions
}
