// Market data utility functions

export function calculateSpreadBps(bid: number | null, ask: number | null, mid: number): number {
  if (bid === null || ask === null || mid === 0) return 0
  const spread = ask - bid
  return Math.round((spread / mid) * 10000)
}

export function calculateMid(bid: number | null, ask: number | null): number {
  if (bid !== null && ask !== null) {
    return (bid + ask) / 2
  }
  return bid ?? ask ?? 0
}

export function formatTimestamp(): string {
  return new Date().toISOString()
}

export function safeParseFloat(value: string | number | undefined | null): number | null {
  if (value === undefined || value === null) return null
  const parsed = typeof value === "number" ? value : Number.parseFloat(value)
  return isNaN(parsed) ? null : parsed
}

export function invertRate(rate: number): number {
  if (rate === 0) return 0
  return 1 / rate
}

export function getEnvVar(key: string): string | undefined {
  return process.env[key]
}

export function isProviderConfigured(provider: "valor_pro" | "binance" | "coins_xyz"): boolean {
  switch (provider) {
    case "valor_pro":
      return !!(getEnvVar("VALOR_PRO_CLIENT_ID") && getEnvVar("VALOR_PRO_CLIENT_SECRET"))
    case "binance":
      return true
    case "coins_xyz":
      return !!getEnvVar("COINS_API_KEY")
    default:
      return false
  }
}
