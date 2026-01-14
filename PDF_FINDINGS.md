# FX Pricing Comparison Guide — Key Findings

## Current Page Status
- Market reference: GBPBRL 6.5913 (from GBPUSD 1.27 × USDBRL 5.19)
- Bank model: 80 bps spread + 0.8% fee + 3.5% IOF
- Bank receives: R$625,741.11 (total cost ~5.06%)
- Coins receives: R$659,104.05 (network fee $5 USD)
- Difference: ~R$33k more with Coins

## Key Recommendations from PDF

### 1. Provide Independent Benchmarks
- Show real mid-market rate with timestamp
- Use trusted source (XE, Wise) for credibility
- Example: "Mid-market rate as of 13 Jan 2026: 7.21137 BRL/GBP"

### 2. Benchmark Against Providers
- **Wise**: Uses mid-market rate, charges £9.99 fee → 7,139.33 BRL (1,000 GBP)
- **PayPal**: Charges $4.99 + applies rate 5.1450 vs mid 5.3728 → total cost $13.47
- **Banks**: Add 2-4% markup on mid-market rate

### 3. Explain IOF Clearly
- IOF is 3.5% (as of July 2025)
- Applies to ALL international transfers (Pix, cards, wire transfers)
- **Important**: Coins crypto-rail STILL triggers IOF
- Model should show: Bank cost = spread + fee + IOF (unavoidable)

### 4. Break Down Hidden Costs
- Add tooltips: "Spread (80 bps)" → explain banks add 0.8-3% to mid-market
- Allow users to adjust parameters (spread 0.5%, 1%, 2%)
- Show sensitivity: "If spread was 40 bps instead..."

### 5. Educate About Crypto Rails
- Explain OTC workflow: GBP → USDT → USDT/BRL order book → BRL
- Link to Coins order book (e.g., 1 USDT = R$5.19)
- Emphasize: Coins references on-exchange rate, not opaque bank rate

### 6. Design & Usability
- Add currency/amount flexibility (not just £100k GBP→BRL)
- Mobile responsive
- Color coding: green vs red for savings
- Copy results or export for documentation
- Add "Book a call" CTA for VIP clients

## Example Comparison Table (from PDF)
| Provider | Amount | Rate | Fee | Total Received | Total Cost |
|----------|--------|------|-----|-----------------|-----------|
| Bank | 1,000 GBP | varies | varies | ~7,100 BRL | ~1.5% |
| Wise | 1,000 GBP | 7.21137 | £9.99 | 7,139.33 BRL | 0.99% |
| PayPal | USD→BRL | 5.1450 | $4.99 | varies | ~0.25% |
| Coins | 1,000 GBP | 7.21137 | $5 network | ~7,200 BRL | ~0.07% |

## Citations to Add
1. PagBrasil: IOF explanation (3.5% rate)
2. Airwallex: Bank markup 2-4% article
3. Wise: Mid-market comparison (7.21137 BRL/GBP)
4. Wise: Large transfer guide
5. PayPal: Fee/rate breakdown example
