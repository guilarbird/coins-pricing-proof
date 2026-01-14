# Wise API Integration Guide

## Overview
Wise provides a public REST API to fetch real-time exchange rates without authentication.

## Endpoints

### Get Current Exchange Rate
```
GET /v1/rates?source=EUR&target=USD
```

**Parameters:**
- `source`: Source currency code (e.g., GBP)
- `target`: Target currency code (e.g., USD)

**Response:**
```json
[
  {
    "rate": 1.166,
    "source": "EUR",
    "target": "USD",
    "time": "2018-08-31T10:43:31+0000"
  }
]
```

## Implementation Strategy

### 1. Fetch Rates
- GBP → USD: `GET /v1/rates?source=GBP&target=USD`
- USD → BRL: `GET /v1/rates?source=USD&target=BRL`
- GBP → BRL: Derived from above two rates

### 2. Caching
- Cache rates for 15-30 seconds to avoid excessive API calls
- Update automatically on component mount and every 30 seconds

### 3. Error Handling
- Fallback to previous rates if API fails
- Show "Unable to fetch live rates" message
- Use simulated rates as backup

### 4. Implementation Location
- Add `useEffect` hook in `Home.tsx` to fetch rates
- Store in state: `gbpusdRate`, `usdBrlRate`
- Update calculations automatically when rates change

## Notes
- No authentication required for public rate endpoint
- Rate updates approximately every 1 minute
- CORS should work from browser (public endpoint)
- Consider rate limiting if needed

## Testing
- Test with real API: `https://api.wise.com/v1/rates?source=GBP&target=USD`
- Sandbox available: `https://api.wise-sandbox.com/v1/rates?source=GBP&target=USD`
