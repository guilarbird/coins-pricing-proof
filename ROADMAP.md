# Coins.xyz FX Transfer Pricing Proof — Roadmap

## ✅ MVP Complete (v1.0)

### Core Features
- **Live FX Rates**: Wise API (GBP/USD, USD/BRL) + Binance API (USDT/BRL)
- **Market Reference Panel**: 3 rates with Bid/Ask/Spread in basis points
- **Educational Translations**: Contextual bilingual labels (Bid/Compra, Ask/Venda)
- **Transfer Simulator**: Real-time calculation with GBP amount input
- **Structural Comparison**: Bank (2.5% spread + 0.8% fee + 3.5% IOF) vs Wise (~1.1% IOF) vs Coins (network fee + 3.5% IOF)
- **Audio Explanation**: 60-90s educational narration (figurinhas metaphor for kids)
- **Audio Player**: Play/pause, progress bar, speed controls (1x/1.25x/1.5x)
- **Show Explanations Toggle**: Educative mode on/off with localStorage persistence
- **Multi-language Support**: Portuguese (PT), English (EN), Chinese (ZH)
- **Spread Architecture Diagram**: SVG visualization showing how each provider "bites" the rate
- **Official Coins Logo**: Horizontal black wordmark in header
- **Dark Theme**: Navy + Slate + Ice Blue palette with glassmorphism
- **Responsive Design**: Mobile-first, fully responsive

---

## 📋 Phase 2: Enhanced Transparency (v1.1)

### 2.1 Collapsible FAQ Section
**Purpose**: Reduce support inquiries by answering common questions upfront.

**Questions to Address**:
1. **"Why does Wise pay less IOF?"**
   - Explanation: Wise uses peer-to-peer matching, so IOF applies only to the spread difference, not the full amount.
   - Visual: Simple diagram showing matched orders.

2. **"How is the spread calculated?"**
   - Explanation: Spread is the difference between what the market pays (Bid) and what you receive (Ask). Banks typically apply 2-4% spreads; Wise ~1.1%; Coins ~0.04%.
   - Visual: Bid/Ask/Spread breakdown with basis points.

3. **"Can I lock exchange rates?"**
   - Explanation: Market rates fluctuate. Coins offers market-based execution (no rate lock). Traditional banks may offer forward contracts at a premium.
   - Visual: 24-hour volatility chart showing why locking is risky.

4. **"What is IOF and why is it mandatory?"**
   - Explanation: IOF (Imposto sobre Operações Financeiras) is a Brazilian federal tax on financial transactions. It applies to all international transfers, but the effective rate varies by settlement structure.
   - Visual: IOF breakdown by provider.

5. **"How does Coins' blockchain execution differ?"**
   - Explanation: Coins uses stablecoins (USDC, USDT) on blockchain for instant settlement with minimal fees. No intermediaries, no delays.
   - Visual: Flow diagram: Traditional (3-5 days) vs Blockchain (minutes).

**Implementation**:
- Accordion component (collapsible cards)
- Icons for each question (help, lock, tax, blockchain)
- Smooth animations on expand/collapse
- Mobile-optimized (full-width on mobile, 2-col on desktop)

---

## 📊 Phase 3: Real-Time Insights (v1.2)

### 3.1 24-Hour Rate History Chart
**Purpose**: Show volatility and demonstrate why market-based execution matters.

**Chart Details**:
- **Data Source**: Wise API historical rates (if available) or Binance USDT/BRL 24h data
- **Visualization**: TradingView-style mini chart (Chart.js or Lightweight Charts)
- **Metrics**:
  - Current rate (highlighted)
  - 24h high/low
  - Volatility (standard deviation)
  - Trend indicator (up/down arrow)
- **Interactivity**:
  - Hover to see rate at specific time
  - Click to expand to full-screen chart
  - Toggle between GBP/USD, USD/BRL, USDT/BRL

**Educational Context**:
- Tooltip: "Rates fluctuate constantly. Market-based execution ensures you get the best rate at the moment of transfer."
- Comparison: Show how a 1% rate swing = R$72 difference on 1000 GBP transfer.

**Implementation**:
- Lightweight Charts library (fast, minimal bundle size)
- 15-minute data refresh
- Responsive (stacked on mobile, inline on desktop)

---

## 📄 Phase 4: Audit & Export (v1.3)

### 4.1 PDF Report Export
**Purpose**: Generate audit-ready reports for sharing with advisors/accountants.

**Report Contents**:
1. **Header**
   - Coins.xyz logo
   - "FX Transfer Pricing Report"
   - Generation timestamp (ISO 8601)
   - Report ID (SHA256 hash of data)

2. **Executive Summary**
   - Transfer amount (GBP)
   - Destination (BRL)
   - Comparison: Bank vs Wise vs Coins (final amounts + costs)
   - Savings highlight

3. **Market Reference**
   - GBP/USD (Wise)
   - USD/BRL (Wise)
   - USDT/BRL (Binance)
   - Timestamp of rates

4. **Detailed Breakdown**
   - Bank: Spread (2.5%) → Fee (0.8%) → IOF (3.5%)
   - Wise: Mid-market → Fee (0.623%) → IOF (1.1%)
   - Coins: Mid-market → Network fee ($5) → IOF (3.5%)

5. **Methodology**
   - Explanation of calculations
   - Data sources (Wise API, Binance API)
   - IOF structure assumptions
   - Disclaimer: "Rates are indicative and subject to change"

6. **Footer**
   - Data sources and timestamps
   - SHA256 hash for integrity verification
   - Coins.xyz contact info

**Implementation**:
- Use `jsPDF` + `html2canvas` or `weasyprint` (backend)
- "Download Report" button in Transfer Simulator section
- Filename: `FX_Report_[TIMESTAMP]_[AMOUNT]GBP.pdf`
- Mobile-friendly (portrait orientation, responsive tables)

---

## 🎨 Phase 5: Visual Polish (v1.4)

### 5.1 Micro-interactions & Animations
- Smooth entrance animations for cards (stagger effect)
- Hover states on all interactive elements
- Loading skeleton for FX rates fetch
- Success toast on "Download Report"
- Spread diagram animation (line drawing effect)

### 5.2 Accessibility Audit
- WCAG 2.1 AA compliance check
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader testing (ARIA labels)
- Color contrast verification
- Focus indicators on all buttons

### 5.3 Performance Optimization
- Lazy load audio player
- Optimize images (logo, diagrams)
- Minify CSS/JS
- Cache API responses (30s TTL)
- Lighthouse score target: 90+

---

## 📱 Phase 6: Mobile-First Refinement (v1.5)

### 6.1 Mobile UX Enhancements
- Bottom sheet for language selector (instead of dropdown)
- Swipe gestures for chart navigation
- Larger touch targets (48px minimum)
- Simplified layout for small screens
- Sticky header for easy navigation

### 6.2 Offline Support
- Service Worker for offline rate caching
- Fallback rates if API fails
- "Last updated" indicator

---

## 🔐 Phase 7: Security & Compliance (v2.0)

### 7.1 Data Privacy
- No personal data collection
- No cookies (except localStorage for preferences)
- Privacy policy link in footer
- GDPR/LGPD compliance statement

### 7.2 Rate Accuracy & Disclaimers
- Clear disclaimer: "Rates are indicative, not binding"
- Timestamp on all rates (real-time indicator)
- Link to Wise/Binance official rates for verification
- Legal review of all copy

---

## 📈 Success Metrics (v2.0+)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time | < 2s | Lighthouse |
| Mobile Usability | 100% | Google Mobile-Friendly Test |
| Accessibility Score | 95+ | WAVE, Axe DevTools |
| Educational Clarity | 80%+ understand | User testing, heatmaps |
| Conversion (to Coins account) | 5%+ | Analytics |
| FAQ Click-through | 40%+ | Event tracking |
| PDF Export Usage | 20%+ | Event tracking |
| Bounce Rate | < 30% | Analytics |

---

## 🛠️ Technical Debt & Maintenance

- [ ] Monitor Wise API rate limits (1000 req/day)
- [ ] Monitor Binance API uptime
- [ ] Update exchange rates documentation quarterly
- [ ] A/B test CTA copy ("Simulate Now" vs "Get Started")
- [ ] Quarterly accessibility audit
- [ ] Security headers review (CSP, X-Frame-Options, etc.)

---

## 📞 Support & Feedback

- **GitHub Issues**: Feature requests, bug reports
- **Email**: [support@coins.xyz](mailto:support@coins.xyz)
- **Community**: [Circle community link]

---

**Last Updated**: 2026-01-14
**Version**: 1.0 (MVP)
**Status**: ✅ Complete
