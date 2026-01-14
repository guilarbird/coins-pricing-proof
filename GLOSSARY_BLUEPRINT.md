# Glossário Visual — Blueprint Educativo

## 1. Termos Financeiros com Tradução Contextual Dupla

| Termo | Tradução | Tooltip | Cor | Ícone |
|-------|----------|---------|-----|-------|
| **Bid** | Compra | "Preço máximo que o mercado está disposto a pagar pelo ativo." | Verde (#10B981) | 📊 |
| **Ask** | Venda | "Preço mínimo que o vendedor aceita vender." | Vermelho (#EF4444) | 📊 |
| **Spread** | Diferença | "Diferença entre o preço de compra e venda — representa o custo implícito da operação." | Amarelo (#F59E0B) | ⚠️ |
| **Mid-market rate** | Taxa Média | "Taxa média entre o Bid e o Ask — usada como referência justa de câmbio." | Azul (#3B82F6) | 📈 |
| **Fee** | Taxa | "Comissão cobrada pelo provedor de serviço." | Laranja (#FF8C42) | 💰 |
| **IOF** | Imposto | "Imposto sobre Operações Financeiras — taxa federal brasileira." | Vermelho (#DC2626) | ⚠️ |
| **Network Cost** | Custo de Rede | "Custo de processamento e segurança da transação blockchain." | Roxo (#8B5CF6) | 🔗 |

---

## 2. Microtooltips (Hover/Tap)

### Desktop (Hover)
```
Bid (Compra) [ℹ️]
↓ (on hover)
Preço máximo que o mercado está disposto a pagar pelo ativo.
```

### Mobile (Tap)
```
Bid (Compra) [ℹ️]
↓ (on tap)
Bottom sheet elegante:
┌─────────────────────────────┐
│ Bid (Compra)                │
│                             │
│ Preço máximo que o mercado  │
│ está disposto a pagar pelo  │
│ ativo.                      │
│                             │
│ [Entendi] [Saiba mais →]    │
└─────────────────────────────┘
```

---

## 3. Hierarquia Visual Revisada (Market Reference)

### Antes
```
GBP/USD
1.2700
Bid: 1.2695  Ask: 1.2705
```

### Depois
```
┌─────────────────────────────────┐
│ GBP/USD                         │
│ 1.2700 (Mid)                    │
│                                 │
│ Bid (Compra): 1.2695 [ℹ️]       │
│ Ask (Venda):  1.2705 [ℹ️]       │
│ ─────────────────────────────   │
│ Spread: 0.0010 (≈ 0.08%)        │
└─────────────────────────────────┘
```

**Mudanças:**
- Aumentar tipografia do valor principal (1.2700) para 2xl
- Usar semibold para Bid/Ask
- Adicionar linha fina abaixo (separator)
- Mostrar spread calculado em bps e %
- Cores semânticas: Verde (Bid), Vermelho (Ask), Amarelo (Spread)

---

## 4. Bloco Educacional no Rodapé

```
┌─────────────────────────────────────────────────────┐
│ 💡 Entenda o jargão                                 │
│                                                     │
│ Bid é o preço de compra, Ask é o preço de venda.  │
│ O Spread é a diferença entre eles — seu custo     │
│ implícito na operação.                             │
│                                                     │
│ [Saiba mais sobre termos financeiros →]            │
└─────────────────────────────────────────────────────┘
```

**Estilo:**
- Fundo: `bg-blue-500/10` (azul muito suave)
- Texto: `text-slate-300`
- Link: `text-blue-400 hover:text-blue-300`
- Ícone: 💡 (suave, não infantilizado)

---

## 5. Toggle "Mostrar Explicações"

### Localização
Header, lado direito (próximo ao globo de idioma):

```
[🌐] [📘 Mostrar explicações] [X]
```

### Comportamento
- **Ativado (ON)**: Todos os tooltips aparecem automaticamente em hover/tap
- **Desativado (OFF)**: Apenas o ícone ℹ️ aparece (modo institucional limpo)
- **Persistência**: Salvar em localStorage

### Implementação
```tsx
const [showExplanations, setShowExplanations] = useState(
  localStorage.getItem('showExplanations') === 'true'
);

useEffect(() => {
  localStorage.setItem('showExplanations', showExplanations);
}, [showExplanations]);
```

---

## 6. Microcores Profissionais

### Paleta
```css
/* Bid (Compra) */
--bid-color: #10B981 (Emerald)

/* Ask (Venda) */
--ask-color: #EF4444 (Red)

/* Spread */
--spread-color: #F59E0B (Amber)

/* Mid-market */
--mid-color: #3B82F6 (Blue)

/* Linhas finas */
--divider: rgba(255, 255, 255, 0.1)
```

### Aplicação
```html
<div className="space-y-2">
  <div className="flex justify-between items-center">
    <span className="text-slate-400">Bid (Compra) [ℹ️]</span>
    <span className="text-emerald-400 font-semibold">1.2695</span>
  </div>
  <div className="flex justify-between items-center">
    <span className="text-slate-400">Ask (Venda) [ℹ️]</span>
    <span className="text-red-400 font-semibold">1.2705</span>
  </div>
  <div className="border-t border-white/10 pt-2 flex justify-between items-center">
    <span className="text-slate-400">Spread [ℹ️]</span>
    <span className="text-amber-400 font-semibold">0.0010 (0.08%)</span>
  </div>
</div>
```

---

## 7. Bloco de Glossário Inteligente (Modo Educativo Opcional)

### Quando "Mostrar Explicações" está ON

Aparece uma seção colapsível no rodapé:

```
┌─────────────────────────────────────────────────────┐
│ 📘 Glossário Financeiro                             │
│                                                     │
│ ▼ Bid (Compra)                                      │
│   Preço máximo que o mercado está disposto a       │
│   pagar pelo ativo.                                │
│                                                     │
│ ▼ Ask (Venda)                                       │
│   Preço mínimo que o vendedor aceita vender.       │
│                                                     │
│ ▼ Spread                                            │
│   Diferença entre o preço de compra e venda —      │
│   representa o custo implícito da operação.        │
│                                                     │
│ ▼ Mid-market rate                                   │
│   Taxa média entre o Bid e o Ask — usada como      │
│   referência justa de câmbio.                      │
│                                                     │
│ ▼ IOF (Imposto)                                     │
│   Imposto sobre Operações Financeiras — taxa       │
│   federal brasileira que varia por estrutura.      │
│                                                     │
│ ▼ Network Cost                                      │
│   Custo de processamento e segurança da            │
│   transação blockchain.                            │
└─────────────────────────────────────────────────────┘
```

---

## 8. Copy Final (Microcopy)

### Market Reference Header
```
"Referência de Mercado — Taxas ao vivo"
```

### Tooltip Padrão
```
"Passe o mouse para entender o termo"
```

### Bloco Educacional
```
"💡 Entenda o jargão: Bid é compra, Ask é venda. O Spread é o custo entre elas."
```

### Toggle
```
"📘 Mostrar explicações"
```

### Glossário
```
"📘 Glossário Financeiro"
```

---

## 9. Responsividade Mobile

### Breakpoints
- **Mobile (< 768px)**: Bottom sheets, stacked layout, tooltips em tap
- **Tablet (768px - 1024px)**: Tooltips em hover, layout 2 colunas
- **Desktop (> 1024px)**: Tooltips em hover, layout 3 colunas

### Mobile-First Approach
```tsx
{/* Mobile: Stacked */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>

{/* Mobile: Bottom sheet para tooltips */}
<Dialog>
  <DialogContent className="rounded-t-2xl">
    {/* Tooltip content */}
  </DialogContent>
</Dialog>
```

---

## 10. Animações Suaves (Micromovimento)

### Tooltip Entrance
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tooltip {
  animation: slideUp 0.2s ease-out;
}
```

### Hover States
```css
.bid-value:hover {
  color: #10B981;
  text-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
}

.ask-value:hover {
  color: #EF4444;
  text-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
}
```

---

## 11. Acessibilidade

### ARIA Labels
```html
<span 
  role="button" 
  aria-label="Bid - Preço máximo que o mercado está disposto a pagar"
  className="cursor-help"
>
  Bid (Compra) [ℹ️]
</span>
```

### Keyboard Navigation
- Tab: Navegar entre tooltips
- Enter/Space: Abrir tooltip
- Escape: Fechar tooltip

---

## 12. Implementação Priorizada

**Fase 1 (MVP):**
- ✅ Tradução contextual dupla (Bid/Ask/Spread)
- ✅ Microtooltips com ℹ️
- ✅ Hierarquia visual revisada
- ✅ Cores semânticas (verde/vermelho/amarelo)

**Fase 2 (Refinamento):**
- ✅ Bloco educacional no rodapé
- ✅ Toggle "Mostrar explicações"
- ✅ Glossário colapsível

**Fase 3 (Polimento):**
- ✅ Animações suaves
- ✅ Acessibilidade completa
- ✅ Responsividade perfeita

