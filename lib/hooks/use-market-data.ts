// Client-side hook for fetching market data
"use client"

import useSWR from "swr"
import type { MarketDataResponse, RouteQuote } from "@/lib/market-data/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useMarketData() {
  const { data, error, isLoading, mutate } = useSWR<MarketDataResponse & { providers: Record<string, boolean> }>(
    "/api/market/latest",
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 10000,
    },
  )

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  }
}

export function useRouteQuote(from: string, to: string, via?: "USDT" | "USD") {
  const url = `/api/market/route?from=${from}&to=${to}${via ? `&via=${via}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<RouteQuote>(url, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    dedupingInterval: 10000,
  })

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  }
}

// Format confidence badge
export function getConfidenceBadge(confidence: string): { label: string; className: string } {
  switch (confidence) {
    case "live":
      return { label: "Live", className: "bg-success/20 text-success" }
    case "cached":
      return { label: "Cached", className: "bg-warning/20 text-warning" }
    case "indicative":
      return { label: "Indicative", className: "bg-muted text-muted-foreground" }
    default:
      return { label: "Unavailable", className: "bg-destructive/20 text-destructive" }
  }
}

// Format timestamp for display
export function formatTimestampDisplay(isoTimestamp: string): string {
  const date = new Date(isoTimestamp)
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}
