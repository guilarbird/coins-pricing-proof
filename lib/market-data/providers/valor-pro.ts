// Valor PRO Provider - USD/BRL from Brazilian financial data API

import type { MarketQuote } from "../types"
import { calculateMid, calculateSpreadBps, formatTimestamp } from "../utils"

const INDICATIVE_USD_BRL = { bid: 5.76, ask: 5.79 }

function getIndicativeFallback(): MarketQuote {
  const mid = calculateMid(INDICATIVE_USD_BRL.bid, INDICATIVE_USD_BRL.ask)
  return {
    symbol: "USD/BRL",
    bid: INDICATIVE_USD_BRL.bid,
    ask: INDICATIVE_USD_BRL.ask,
    mid,
    spread_bps: calculateSpreadBps(INDICATIVE_USD_BRL.bid, INDICATIVE_USD_BRL.ask, mid),
    timestamp: formatTimestamp(),
    source: "valor_pro",
    confidence: "indicative",
    sourceName: "Interbank FX (Indicative)",
    sourceUrl: "https://valorpro.com.br",
  }
}

export async function getValorProUsdBrl(): Promise<MarketQuote> {
  // Return indicative data directly - no API calls
  // Live integration requires production deployment with proper API configuration
  return getIndicativeFallback()
}

export function isValorProConfigured(): boolean {
  // Always return false in v0 preview since API is not accessible
  return false
}
