# Price APIs Integration Guide

## APIs to Integrate

### 1. Binance API - USDT/BRL
**Endpoint:** `GET https://api.binance.com/api/v3/ticker/price?symbol=USDTBRL`

**Response:**
```json
{
  "symbol": "USDTBRL",
  "price": "5.3712"
}
```

**Notes:**
- Public endpoint (no authentication required)
- Weight: 1
- Update frequency: Real-time
- No CORS issues (public API)

### 2. ValorPro API - USD/BRL
**Status:** Need to research endpoint
**Expected:** Official Brazilian FX rate for USD/BRL

### 3. Wise API - GBP/USD (Already Implemented)
**Endpoint:** `GET https://api.wise.com/v1/rates?source=GBP&target=USD`
- Already working
- 30-second cache

## Implementation Plan

1. Add USDT/BRL fetch from Binance
2. Add USD/BRL fetch from ValorPro (TBD)
3. Keep Wise API for reference
4. Display all three rates in Market Data panel
5. Decide later how to derive GBP/BRL (options: Wise GBP/USD × ValorPro USD/BRL, or direct calculation)

## Code Location
- `client/src/pages/Home.tsx` - useEffect hook for fetching rates
