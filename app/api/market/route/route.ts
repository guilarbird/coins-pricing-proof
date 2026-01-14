// API Route: GET /api/market/route?from=GBP&to=BRL&via=USDT
// Calculates FX route with leg breakdown

import { NextResponse } from "next/server"
import { getRouteQuote } from "@/lib/market-data"
import type { RouteRequest } from "@/lib/market-data/types"

export const dynamic = "force-dynamic"
export const revalidate = 30

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")?.toUpperCase()
    const to = searchParams.get("to")?.toUpperCase()
    const via = searchParams.get("via")?.toUpperCase() as "USDT" | "USD" | undefined

    if (!from || !to) {
      return NextResponse.json({ error: "Missing required parameters: from, to" }, { status: 400 })
    }

    const routeRequest: RouteRequest = { from, to, via }
    const routeQuote = await getRouteQuote(routeRequest)

    return NextResponse.json(routeQuote, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    })
  } catch (error) {
    console.error("[v0] Market route API error:", error)
    return NextResponse.json(
      {
        error: "Failed to calculate route",
        from: "",
        to: "",
        effectiveRate: 0,
        invertedRate: 0,
        legs: [],
        totalSpread_bps: 0,
        timestamp: new Date().toISOString(),
        confidence: "unavailable",
        sources: [],
      },
      { status: 500 },
    )
  }
}
