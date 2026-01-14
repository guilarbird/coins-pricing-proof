// API Route: GET /api/market/latest
// Returns all available market quotes with caching

import { NextResponse } from "next/server"
import { getAllQuotes, getProviderStatus } from "@/lib/market-data"

export const dynamic = "force-dynamic"
export const revalidate = 30 // Cache for 30 seconds

export async function GET() {
  try {
    const [quotes, providerStatus] = await Promise.all([getAllQuotes(), Promise.resolve(getProviderStatus())])

    return NextResponse.json(
      {
        ...quotes,
        providers: providerStatus,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Market latest API error:", error)
    return NextResponse.json(
      {
        quotes: {},
        timestamp: new Date().toISOString(),
        errors: ["Failed to fetch market data"],
        providers: getProviderStatus(),
      },
      { status: 500 },
    )
  }
}
