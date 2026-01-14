# UX Improvements — Coins.xyz FX Transfer Pricing

Based on Nielsen Norman Group, Mojo Agency, and Siteimprove best practices.

## Phase 1: Interactive Simulator
- [ ] Add editable amount input field (default: 1000)
- [ ] Add currency selector dropdown (GBP, USD, EUR, BRL)
- [ ] Update calculations in real-time as user types
- [ ] Show results immediately without page reload
- [ ] Add input validation and error messages

## Phase 2: Contextual Help & Explanations
- [ ] Add help icons (?) next to each field
- [ ] Create tooltips explaining "Amount to send", "Network fee", "IOF tax"
- [ ] Explain why each input affects the final result
- [ ] Use plain Portuguese language (avoid "bps", use "0.38% de custo")

## Phase 3: Dynamic Savings Chart
- [ ] Create bar chart: Coins vs Wise vs Bank
- [ ] Show savings amount in BRL (e.g., "Save R$12,439")
- [ ] Make chart interactive (hover for details)
- [ ] Highlight Coins advantage visually

## Phase 4: Accessibility Improvements
- [ ] Verify contrast ratio (minimum 4.5:1)
- [ ] Increase spacing between elements
- [ ] Test responsiveness (mobile, tablet, desktop)
- [ ] Ensure keyboard navigation works
- [ ] Test on slow networks

## Phase 5: Clear CTAs
- [ ] Add "Simulate Transfer" button (primary, high contrast)
- [ ] Add "Create Account" button (secondary)
- [ ] Add "Learn How It Works" link (low friction)
- [ ] Position above the fold

## Phase 6: Localization
- [ ] Add language selector (globe icon, no flag)
- [ ] Support PT-BR, EN, ZH
- [ ] Add region selector (Brazil, UK, EU, etc.)
- [ ] Auto-update currencies and taxes by region

## Phase 7: Algorithm Transparency
- [ ] Add "How We Calculate" link/section
- [ ] Show formula: mid-market rate + network fee + IOF
- [ ] Cite data sources (Wise API, Binance API)
- [ ] Show rate update timestamp

## Testing Checklist
- [ ] Test on mobile (iOS, Android)
- [ ] Test on slow 3G network
- [ ] Verify all tooltips are accessible
- [ ] Check color contrast with WCAG tools
- [ ] Test keyboard-only navigation
- [ ] Verify audio player works on all browsers
