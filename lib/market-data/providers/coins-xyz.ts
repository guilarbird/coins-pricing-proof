// Coins.xyz Provider - Internal OTC desk USDT/BRL rates
// Uses authenticated API for orderbook/ticker data

import type { MarketQuote, CoinsTickerResponse } from "../types"
import { getCache, setCache, getStaleCache } from "../cache"
import { calculateMid, calculateSpreadBps, formatTimestamp, getEnvVar } from "../utils"
import crypto from "crypto"

const QUOTE_CACHE_KEY = "coins_xyz_usdt_brl"
const QUOTE_TTL = 30000 // 30 seconds

interface CoinsConfig {
  apiKey: string
  apiSecret: string
  baseUrl: string
}

function getConfig(): CoinsConfig | null {
  const apiKey = getEnvVar("COINS_API_KEY")
  const apiSecret = getEnvVar("COINS_API_SECRET")
  const baseUrl = getEnvVar("COINS_API_BASE_URL") || "https://api.coins.xyz"

  if (!apiKey || !apiSecret) {
    return null
  }

  return { apiKey, apiSecret, baseUrl }
}

function generateSignature(apiSecret: string, timestamp: string, method: string, path: string, body = ""): string {
  const message = `${timestamp}${method}${path}${body}`
  return crypto.createHmac("sha256", apiSecret).update(message).digest("hex")
}

export async function getCoinsUsdtBrl(): Promise<MarketQuote> {
  const fallback: MarketQuote = {
    symbol: "USDT/BRL",
    bid: null,
    ask: null,
    mid: 0,
    spread_bps: 0,
    timestamp: formatTimestamp(),
    source: "coins_xyz",
    confidence: "unavailable",
    sourceName: "Coins.xyz OTC",
    sourceUrl: "https://coins.xyz",
  }

  // Check cache
  const cached = getCache<MarketQuote>(QUOTE_CACHE_KEY)
  if (cached) return cached

  const config = getConfig()
  if (!config) {
    // Return stale cache or indicative rate
    const stale = getStaleCache<MarketQuote>(QUOTE_CACHE_KEY)
    if (stale) return { ...stale, confidence: "cached" }

    // Return indicative rate based on typical USDT/BRL
    return {
      ...fallback,
      mid: 5.45, // Approximate
      confidence: "indicative",
    }
  }

  try {
    const timestamp = Date.now().toString()
    const method = "GET"
    const path = "/v1/ticker/USDTBRL"

    const signature = generateSignature(config.apiSecret, timestamp, method, path)

    const response = await fetch(`${config.baseUrl}${path}`, {
      method,
      headers: {
        "X-API-KEY": config.apiKey,
        "X-TIMESTAMP": timestamp,
        "X-SIGNATURE": signature,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.error("[v0] Coins.xyz API error:", response.status)
      // Try alternative endpoint structure
      return await getCoinsAlternativeQuote(config)
    }

    const data: CoinsTickerResponse = await response.json()

    const bid = data.bid ?? null
    const ask = data.ask ?? null
    const mid = calculateMid(bid, ask) || data.last || 0

    const quote: MarketQuote = {
      symbol: "USDT/BRL",
      bid,
      ask,
      mid,
      spread_bps: calculateSpreadBps(bid, ask, mid),
      timestamp: formatTimestamp(),
      source: "coins_xyz",
      confidence: "live",
      sourceName: "Coins.xyz OTC",
      sourceUrl: "https://coins.xyz",
    }

    setCache(QUOTE_CACHE_KEY, quote, QUOTE_TTL)
    return quote
  } catch (error) {
    console.error("[v0] Coins.xyz fetch error:", error)
    const stale = getStaleCache<MarketQuote>(QUOTE_CACHE_KEY)
    if (stale) return { ...stale, confidence: "cached" }
    return {
      ...fallback,
      mid: 5.45,
      confidence: "indicative",
    }
  }
}

async function getCoinsAlternativeQuote(config: CoinsConfig): Promise<MarketQuote> {
  // Try orderbook endpoint as fallback
  try {
    const timestamp = Date.now().toString()
    const method = "GET"
    const path = "/v1/orderbook/USDTBRL"

    const signature = generateSignature(config.apiSecret, timestamp, method, path)

    const response = await fetch(`${config.baseUrl}${path}`, {
      method,
      headers: {
        "X-API-KEY": config.apiKey,
        "X-TIMESTAMP": timestamp,
        "X-SIGNATURE": signature,
        Accept: "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()

      // Extract best bid/ask from orderbook
      const bestBid = data.bids?.[0]?.[0] ? Number(data.bids[0][0]) : null
      const bestAsk = data.asks?.[0]?.[0] ? Number(data.asks[0][0]) : null
      const mid = calculateMid(bestBid, bestAsk)

      const quote: MarketQuote = {
        symbol: "USDT/BRL",
        bid: bestBid,
        ask: bestAsk,
        mid,
        spread_bps: calculateSpreadBps(bestBid, bestAsk, mid),
        timestamp: formatTimestamp(),
        source: "coins_xyz",
        confidence: "live",
        sourceName: "Coins.xyz OTC",
        sourceUrl: "https://coins.xyz",
      }

      setCache(QUOTE_CACHE_KEY, quote, QUOTE_TTL)
      return quote
    }
  } catch (error) {
    console.error("[v0] Coins.xyz orderbook error:", error)
  }

  // Return indicative if all fails
  return {
    symbol: "USDT/BRL",
    bid: null,
    ask: null,
    mid: 5.45,
    spread_bps: 0,
    timestamp: formatTimestamp(),
    source: "coins_xyz",
    confidence: "indicative",
    sourceName: "Coins.xyz OTC",
    sourceUrl: "https://coins.xyz",
  }
}

export function isCoinsConfigured(): boolean {
  return getConfig() !== null
}
