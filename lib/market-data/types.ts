// Market Data Types for Live FX Integration
// Sources: Valor PRO (USD/BRL), Coins.xyz (USDT/BRL), Binance (public)

export type MarketSource = "valor_pro" | "coins_xyz" | "binance" | "composite"

export type Confidence = "live" | "cached" | "indicative" | "unavailable"

export interface MarketQuote {
  symbol: string // e.g., "USD/BRL", "USDT/BRL", "GBP/USDT"
  bid: number | null
  ask: number | null
  mid: number
  spread_bps: number // basis points
  timestamp: string // ISO 8601
  source: MarketSource
  confidence: Confidence
  sourceUrl?: string
  sourceName?: string
}

export interface RouteQuote {
  from: string
  to: string
  via?: string
  effectiveRate: number
  invertedRate: number // 1/effectiveRate for display
  legs: RouteLeg[]
  totalSpread_bps: number
  timestamp: string
  confidence: Confidence
  sources: MarketQuote[]
}

export interface RouteLeg {
  from: string
  to: string
  rate: number
  spread_bps: number
  source: MarketSource
  sourceName?: string
}

export interface MarketDataResponse {
  quotes: Record<string, MarketQuote>
  timestamp: string
  errors?: string[]
}

export interface RouteRequest {
  from: string
  to: string
  via?: "USDT" | "USD"
}

// Provider configuration
export interface ProviderConfig {
  enabled: boolean
  baseUrl?: string
  apiKey?: string
  apiSecret?: string
  clientId?: string
  clientSecret?: string
}

// Cache entry
export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

// Valor PRO specific types
export interface ValorProTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface ValorProQuote {
  origin: number
  symbol: string
  bid?: number
  ask?: number
  last?: number
  timestamp?: string
  [key: string]: unknown
}

// Binance specific types
export interface BinanceBookTicker {
  symbol: string
  bidPrice: string
  bidQty: string
  askPrice: string
  askQty: string
}

export interface BinanceTicker24h {
  symbol: string
  lastPrice: string
  bidPrice: string
  askPrice: string
  priceChange: string
  priceChangePercent: string
}

// Coins.xyz specific types
export interface CoinsOrderbook {
  bids: [string, string][] // [price, quantity]
  asks: [string, string][]
  timestamp: number
}

export interface CoinsTickerResponse {
  symbol: string
  bid: number
  ask: number
  last: number
  volume_24h: number
  timestamp: number
}
