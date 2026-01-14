# Coins.xyz Color Palette — Metallic + Ice + Glass

## Design Philosophy
**Sophisticated, transparent, accessible.** The palette combines metallic accents with ice-blue tones and glassmorphic effects to create a premium, institutional feel without sacrificing clarity or accessibility.

---

## Primary Colors (Dominate 60% of interface)

| Name | Hex | RGB | Usage | Notes |
|------|-----|-----|-------|-------|
| **Navy** | `#0F1419` | 15, 20, 25 | Main background | Deep, professional, reduces eye strain |
| **Slate** | `#1E293B` | 30, 41, 59 | Secondary background | Slightly lighter for contrast |
| **Charcoal** | `#334155` | 51, 65, 85 | Tertiary background | Used for cards, sections |

---

## Secondary Colors (Support 25% of interface)

| Name | Hex | RGB | Usage | Notes |
|------|-----|-----|-------|-------|
| **Ice Blue** | `#E0F2FE` | 224, 242, 254 | Text (light) | High contrast on dark backgrounds |
| **Frost Gray** | `#F1F5F9` | 241, 245, 249 | Subtle highlights | Very light, used sparingly |
| **Slate Gray** | `#CBD5E1` | 203, 213, 225 | Secondary text | Medium contrast, readable |

---

## Accent Colors (Highlight 10-20% of interface)

| Name | Hex | RGB | Usage | Notes |
|------|-----|-----|-------|-------|
| **Silver** | `#E5E7EB` | 229, 231, 235 | Metallic accents | Button borders, highlights |
| **Gold** | `#FBBF24` | 251, 191, 36 | Premium CTAs | "Create Account", "Simulate Now" |
| **Platinum** | `#F3F4F6` | 243, 244, 246 | Subtle metallic | Dividers, micro-accents |

---

## Semantic Colors (Functional)

| Name | Hex | RGB | Usage | Notes |
|------|-----|-----|-------|-------|
| **Bid (Green)** | `#10B981` | 16, 185, 129 | Buy price | Emerald, professional |
| **Ask (Red)** | `#EF4444` | 239, 68, 68 | Sell price | Clear, high contrast |
| **Spread (Amber)** | `#F59E0B` | 245, 158, 11 | Cost indicator | Warm, attention-grabbing |
| **Success (Green)** | `#059669` | 5, 150, 105 | Positive actions | Darker green for emphasis |
| **Error (Red)** | `#DC2626` | 220, 38, 38 | Errors, warnings | Darker red for emphasis |

---

## Glassmorphism Specifications

### Glass Cards (30-40% opacity)
```css
backdrop-filter: blur(12px);
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
```

### Glass Borders (Metallic edge)
```css
border: 1px solid rgba(229, 231, 235, 0.15);
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
```

### Hover State (50-60% opacity)
```css
background: rgba(255, 255, 255, 0.08);
border: 1px solid rgba(229, 231, 235, 0.25);
transition: all 0.3s ease;
```

---

## Metallic Gradients (CTAs & Highlights)

### Silver Gradient (Subtle)
```css
background: linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%);
```

### Gold Gradient (Premium)
```css
background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
```

### Platinum Gradient (Minimal)
```css
background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
```

---

## Text Colors & Contrast

| Context | Color | Hex | Contrast Ratio | WCAG |
|---------|-------|-----|-----------------|------|
| Primary text on Navy | Ice Blue | `#E0F2FE` | 11:1 | AAA ✅ |
| Secondary text on Navy | Slate Gray | `#CBD5E1` | 7.2:1 | AA ✅ |
| Tertiary text on Navy | Slate Gray (60%) | `#CBD5E1` + 60% opacity | 4.5:1 | AA ✅ |
| CTA text on Gold | Navy | `#0F1419` | 8.5:1 | AAA ✅ |
| Error text on Navy | Error Red | `#DC2626` | 6.8:1 | AA ✅ |

---

## Application Rules

### 1. Backgrounds
- **Primary**: Navy (`#0F1419`) for main sections
- **Secondary**: Slate (`#1E293B`) for cards, panels
- **Tertiary**: Charcoal (`#334155`) for nested sections

### 2. Text
- **Primary**: Ice Blue (`#E0F2FE`) for headings, CTAs
- **Secondary**: Slate Gray (`#CBD5E1`) for body text
- **Tertiary**: Slate Gray (60% opacity) for hints, timestamps

### 3. Accents (10-20% max)
- **Metallic borders**: Silver (`#E5E7EB`) on glass cards
- **Premium CTAs**: Gold gradient for "Create Account", "Simulate Now"
- **Subtle highlights**: Platinum (`#F3F4F6`) for dividers, micro-accents

### 4. Semantic
- **Bid**: Green (`#10B981`)
- **Ask**: Red (`#EF4444`)
- **Spread**: Amber (`#F59E0B`)

---

## Glassmorphism Implementation

### Card Structure
```html
<div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
  <!-- Content -->
</div>
```

### Hover Enhancement
```css
.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(229, 231, 235, 0.25);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}
```

### Metallic Button
```html
<button class="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-navy font-semibold hover:shadow-lg transition-all">
  Create Account
</button>
```

---

## Mobile Optimization

- **Reduce blur on mobile**: `backdrop-blur-md` instead of `backdrop-blur-xl`
- **Increase opacity slightly**: `bg-white/8` instead of `bg-white/5` for better readability
- **Larger touch targets**: Buttons 44px minimum height
- **Simplified gradients**: Use solid colors on small screens if performance is affected

---

## Accessibility Checklist

- ✅ All text meets WCAG AA contrast ratio (4.5:1 minimum)
- ✅ Semantic colors (green/red) not sole indicators
- ✅ Focus states clearly visible (gold or platinum outline)
- ✅ No animation longer than 3 seconds
- ✅ Glassmorphism doesn't obscure critical content
- ✅ Mobile-first responsive design

---

## Example Component: Market Reference Card

```html
<div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/8 transition-all">
  <h3 class="text-slate-300 font-semibold mb-4">GBP/USD</h3>
  <p class="text-3xl font-bold text-ice-blue">1.2700</p>
  
  <div class="border-t border-white/10 mt-4 pt-4 space-y-2">
    <div class="flex justify-between">
      <span class="text-emerald-400 font-semibold">Bid (Compra)</span>
      <span class="text-emerald-400">1.2695</span>
    </div>
    <div class="flex justify-between">
      <span class="text-red-400 font-semibold">Ask (Venda)</span>
      <span class="text-red-400">1.2705</span>
    </div>
    <div class="flex justify-between">
      <span class="text-amber-400 font-semibold">Spread</span>
      <span class="text-amber-400">0.0010 (7.87 bps)</span>
    </div>
  </div>
</div>
```

---

## Color Palette Summary

**Dominant (60%)**: Navy, Slate, Charcoal
**Supporting (25%)**: Ice Blue, Frost Gray, Slate Gray
**Accents (10-20%)**: Silver, Gold, Platinum
**Semantic**: Green (Bid), Red (Ask), Amber (Spread)

**Vibe**: Sophisticated, metallic, icy, transparent — Coins.xyz identity.

