# ValorPro API Integration Guide

## API Cotações (Quotes API)

### Connection Details
- **WebSocket URL**: `wss://ws.api.valorpro.com.br:33700`
- **Technology**: WebSocket (bidirectional, real-time)
- **Authentication**: Token-based

### Authentication Flow
1. Connect to WebSocket
2. Send auth command with access_token:
```json
auth { "access_token": "INSERT_TOKEN_HERE" }
```
3. Wait for "token_verified" response

### Subscribe to Quotes
Command to subscribe to a symbol:
```json
subscribe { "origin": 2, "symbol": "USDBRL" }
```

Where:
- `origin`: 2 (for quotes)
- `symbol`: Asset code (e.g., "USDBRL" for USD/BRL)

### Unsubscribe
```json
unsubscribe { "origin": 2, "symbol": "USDBRL" }
```

### Available Commands
- **field**: Reduce message size by specifying fields (e.g., `field { "id": 1001 }`)
- **timeout**: Set update frequency in milliseconds (e.g., `timeout { "time": 10000 }` = 10 seconds)
- **snap**: Get snapshot of asset (e.g., `snap { "origin": 2, "symbol": "USDBRL" }`)

### Fields Documentation
- Endpoint: `https://quotes.api.valorpro.com.br/swagger/index.html`
- API endpoint: `/api/v1/fields`

### Response Format
Real-time updates with quote data (bid, ask, last price, volume, etc.)

## Notes
- Token must be obtained separately (not included in this guide)
- Each new connection requires a new token
- WebSocket maintains bidirectional connection
- Use `timeout` command to reduce update frequency if needed

## Status
- ❌ Not yet integrated (requires token)
- 🔄 Alternative: Use REST API if available
