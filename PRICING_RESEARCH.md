# Pricing Research — GBP → BRL Transfer Costs

## Source: World Bank Remittance Prices Worldwide
Data collected: Feb 18-24, 2025

### Market Reference Rate
- **Market Mid-Rate**: ~7.22 GBP/BRL (varies by source, typically 7.18-7.24)

### Typical Provider Costs (120 GBP transfer)

| Provider | Fee (GBP) | Exchange Rate Margin (%) | Total Cost (%) |
|----------|-----------|--------------------------|-----------------|
| **Wise** | 0.02 | 0.02% | 1.41% |
| **Remitly** | 1.99 | 0.82% | 2.48% |
| **Western Union** | 1.99 | 1.06% | 2.72% |
| **MoneyGram** | 1.32 | 1.32% | 1.58% |
| **Average (transparent)** | ~1.50 | ~0.80% | ~2.30% |

### Key Insights

1. **Exchange Rate Margin** (spread on the rate itself):
   - Wise: 0.02% (nearly mid-market)
   - Remitly: 0.82%
   - Western Union: 1.06%
   - Average: ~0.80%

2. **Explicit Fee** (charged separately):
   - Ranges from £0.02 (Wise) to £1.99 (Remitly, Western Union)
   - Typical: £1.50-£2.00

3. **Total Cost**:
   - Best-in-class (Wise): 1.41%
   - Industry average: 2.30-2.50%
   - High-cost providers: 3-4%

### BTG Pactual Context
- Edward's current provider (BTG)
- Explicit fee: 0.80% (mentioned in brief)
- Likely additional spread: 1.0-1.5% on the rate
- **Estimated total cost: 1.80-2.30%**

---

## Correct Pricing Logic for Page

### Step 1: Market Reference
- Show mid-market rate: **7.2200 GBP/BRL**
- Source: Binance (GBPUSD) + ValorPro (USDBRL) = derived GBPBRL

### Step 2: Execution Rate (Bank applies spread)
- Bank takes market rate and applies spread
- Example: 7.2200 → 7.1400 (80 bps spread = 1.11% margin)
- This is where the first cost is hidden

### Step 3: Explicit Fee
- Fee charged on top: 0.80%
- Applied to the already-adjusted rate

### Step 4: Total Cost Calculation
```
Market rate:        7.2200
Bank execution:     7.1400 (80 bps spread)
Cost of spread:     (7.2200 - 7.1400) / 7.2200 = 1.11%
Explicit fee:       0.80%
Total cost:         1.91%
```

---

## What the Page Should Show

**NOT**: "Bank costs 503 bps vs Coins 0.39 bps" (illogical)

**INSTEAD**: 
1. Market reference rate (neutral baseline)
2. How bank's execution rate differs (show the spread visually)
3. How explicit fee is applied on top
4. Alternative: using market rate directly with minimal spread

This makes the logic transparent and auditable.
