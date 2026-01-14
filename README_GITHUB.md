# Coins Pricing Proof

**FX pricing transparency & audit-ready breakdown**

A production-ready page that makes FX pricing auditable: shows where each provider "takes their cut", explains settlement structures, and proves why market-based execution matters.

---

## 🎯 Purpose

This page is designed to:

- **Educate** VIP clients on FX pricing mechanics (spreads, fees, IOF, SWIFT costs)
- **Prove** that Coins offers better execution through fewer intermediaries
- **Audit** every number: sources linked, calculations transparent, updated real-time
- **Convert** institutional clients through data-driven confidence

---

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 19 + Tailwind 4 + shadcn/ui
- **Routing**: Wouter (client-only)
- **i18n**: JSON-based (en.json, pt.json)
- **Deployment**: Vercel (production source of truth)
- **Version Control**: GitHub (main = production)

### Project Structure

```
coins-pricing-proof/
├─ README.md
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ .github/
│  └─ PULL_REQUEST_TEMPLATE.md
├─ public/
│  ├─ logo-coinsxyz.svg
│  └─ icons/
├─ client/
│  ├─ index.html
│  ├─ src/
│  │  ├─ pages/
│  │  │  └─ Home.tsx
│  │  ├─ components/
│  │  │  ├─ AuditSummary.tsx
│  │  │  ├─ CostStack.tsx
│  │  │  ├─ FXDiagrams.tsx
│  │  │  ├─ StablecoinRail.tsx
│  │  │  └─ ...
│  │  ├─ lib/
│  │  │  ├─ translations.ts
│  │  │  └─ formatters.ts
│  │  ├─ App.tsx
│  │  ├─ main.tsx
│  │  └─ index.css
│  └─ public/
├─ i18n/
│  ├─ en.json
│  └─ pt.json
└─ server/ (placeholder for future)
```

---

## 🔄 Workflow: GitHub → Vercel

### Branch Strategy

| Branch | Purpose | Deploy Target |
|--------|---------|---|
| `main` | Production | pricing.coins.xyz |
| `staging` | Pre-production | staging.pricing.coins.xyz |
| `feat/*` | Feature development | Preview URLs (auto) |
| `fix/*` | Bug fixes | Preview URLs (auto) |

### CI/CD Pipeline

1. **Push to branch** → GitHub
2. **PR created** → Vercel Preview (auto)
3. **Merge to main** → Vercel Production (auto)
4. **Merge to staging** → Vercel Staging (auto)

### Branch Protection Rules

- `main`: Require PR, 1-2 reviews, block force-push, require Vercel checks
- `staging`: Require PR, 1 review

---

## 🌍 Internationalization (i18n)

### Rules

- **No hardcoded strings** in components
- All UI text comes from `i18n/en.json` or `i18n/pt.json`
- Language toggle controls 100% of the page (including diagrams)
- Fallback: EN if translation missing

### Structure

```json
{
  "title": "Digital FX",
  "subtitle": "Understand how exchange rates are priced. No secrets.",
  "sections": {
    "auditSummary": {
      "title": "Audit Summary",
      "youSend": "You send",
      "marketBaseline": "Market Baseline (mid-market)"
    }
  }
}
```

### Adding Translations

1. Add key to `i18n/en.json`
2. Add translation to `i18n/pt.json`
3. Import in component: `const t = translations[language]`
4. Use: `<p>{t.sections.auditSummary.title}</p>`

---

## 💱 Number Formatting

### Rules

- **EN locale**: £100,000.00 (comma for thousands, dot for decimal)
- **PT locale**: £100.000,00 (dot for thousands, comma for decimal)
- Use `formatCurrency(amount, 'BRL', language)` from `lib/formatters.ts`

### Example

```tsx
import { formatCurrency } from '../lib/formatters';

<p>{formatCurrency(coinsFinal, 'BRL', language)}</p>
// EN: R$ 636,034.50
// PT: R$ 636.034,50
```

---

## 📊 Key Components

### AuditSummary
Shows 3 key numbers (You send, Market baseline, You receive) + savings vs Bank/Wise + audit badges + conclusion.

### CostStack
Visual bars showing where each provider "takes their cut" from the baseline.

### FXDiagrams
5 educational diagrams:
1. Path of Your Money
2. Deconstructing FX Spreads
3. Impact of Wide Spreads
4. Why IOF Tax Varies
5. SWIFT Maze vs Direct Path

### StablecoinRail
Mini-explainer: stablecoin as settlement infrastructure (not "bet").

---

## 🚀 Development

### Local Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Environment Variables

None required for local development. Production uses Vercel env vars (set in Vercel dashboard).

---

## ✅ Definition of Done (DoD)

Before merging to `main`:

- [ ] All strings from i18n (no hardcoded text)
- [ ] Number formatting correct (locale-aware)
- [ ] Diagrams have real numbers + sources
- [ ] IOF shows "structure-dependent" for Coins (not fixed 3.5%)
- [ ] Savings logic: "Best" badge when Coins wins, "Difference" when not
- [ ] No PT/EN mix (language toggle controls 100%)
- [ ] Vercel Preview passes all checks
- [ ] Manual testing on mobile + desktop

---

## 🔗 Data Sources

- **FX Reference**: Wise mid-market API
- **Crypto Reference**: Binance USDT/BRL
- **Coins Execution**: Market-based (order book)
- **IOF**: Varies by settlement structure (not fixed)

All sources are linked in the page footer.

---

## 📝 Deployment

### Vercel Dashboard

1. **Settings → Git** → Auto-deploy enabled
2. **Domains** → pricing.coins.xyz (main), staging.pricing.coins.xyz (staging)
3. **Analytics** → Basic telemetry enabled
4. **Preview Deployments** → Auto for all PRs

### Rollback

If needed, use Vercel → Deployments → "Promote previous" (fully auditable).

---

## 🤝 Contributing

1. Create branch: `git checkout -b feat/your-feature`
2. Make changes (follow i18n + formatting rules)
3. Push: `git push origin feat/your-feature`
4. Create PR (use template)
5. Wait for Vercel Preview + reviews
6. Merge to `main` (auto-deploys to production)

---

## 📞 Support

Questions? Check:
- Diagrams in `client/src/components/`
- Translations in `i18n/`
- Number formatting in `client/src/lib/formatters.ts`

---

**Source of Truth**: GitHub (main branch) → Vercel (production)

**Sandbox**: Local development only (not for validation)

**Last Updated**: 2026-01-14
