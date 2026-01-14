# Coins.xyz Pricing Proof — Documentação Técnica

## Visão Geral

Esta página institucional de prova econômica demonstra de forma auditável e decomponível a diferença de custos entre conversão bancária tradicional (GBP → BRL) e conversão via rail cripto (GBP → USDT → BRL) usando Coins.xyz.

O objetivo é **educar primeiro** (mostrar preços do mundo), **decompor custos** (explicar cada taxa), e só então **comparar resultados** (mostrar o delta).

---

## Arquitetura

### Backend (Python)

O projeto inclui módulos Python independentes para cada fase:

1. **`price_holders.py`** — Consome APIs públicas (Binance, Coinbase, ValorPro) e normaliza para schema único
2. **`bank_decomposition.py`** — Calcula custos bancários com decomposição clara
3. **`crypto_rail.py`** — Calcula conversão via rail cripto (GBP → USDT → BRL)
4. **`comparator.py`** — Compara lado a lado e calcula delta
5. **`snapshot.py`** — Gera snapshot JSON auditável com hash SHA256

### Frontend (React + Tailwind)

- **`client/src/pages/Home.tsx`** — Página única com 5 seções (Fases 1-4)
- **`client/public/snapshot.json`** — Dados estáticos gerados pelo backend

---

## Fórmulas e Premissas

### Fase 1: Price Holders (Âncoras de Preço)

**Schema Normalizado:**
```json
{
  "pair": "GBPUSDT | USDTBRL | GBPBRL",
  "bid": number,
  "ask": number,
  "mid": (bid + ask) / 2,
  "source": "binance | coinbase | valorpro | derived",
  "timestamp": "ISO8601",
  "staleness_seconds": number,
  "spread_bps": (ask - bid) / mid * 10_000,
  "is_fallback": boolean
}
```

**Cálculos:**
- `mid = (bid + ask) / 2`
- `spread_bps = (ask - bid) / mid × 10.000`

**Cache:** 5-15 segundos (configurável)

**Fallback:** Se uma fonte falhar, tenta próxima na lista de prioridade

---

### Fase 2: Decomposição de Custos Bancários

**Inputs:**
- `amount_gbp` — Montante em GBP (padrão: 100.000)
- `bank_fx_markup_bps` — Markup FX em basis points (padrão: 80 bps)
- `bank_fee_pct` — Taxa explícita em % (padrão: 0,80%)

**Referência:**
```
reference_brl = amount_gbp × gbpbrl_mid
```

**Custo 1: FX Markup (Escondido)**
```
bank_rate = gbpbrl_mid × (1 − markup_bps / 10.000)
hidden_fx_cost_brl = reference_brl − (amount_gbp × bank_rate)
hidden_fx_cost_bps = (hidden_fx_cost_brl / reference_brl) × 10.000
```

**Custo 2: Taxa Explícita**
```
fee_cost_brl = bank_rate × amount_gbp × (bank_fee_pct / 100)
fee_cost_bps = (fee_cost_brl / reference_brl) × 10.000
```

**Resumo:**
```
bank_net_brl = reference_brl − hidden_fx_cost_brl − fee_cost_brl
total_cost_bps = hidden_fx_cost_bps + fee_cost_bps
```

---

### Fase 3: Rail Cripto (GBP → USDT → BRL)

**Inputs:**
- `amount_gbp` — Montante em GBP
- `pricing_mode` — "indicative" (mid) ou "conservative" (ask/bid)
- `network_fee_usdt` — Taxa de rede em USDT (padrão: 5 USDT)

**Passo 1: GBP → USDT**
```
rate_gbpusdt = pricing_mode == "indicative" ? gbpusdt_mid : gbpusdt_ask
usdt_received = amount_gbp × rate_gbpusdt
```

**Passo 2: Taxa de Rede**
```
usdt_after_fee = usdt_received − network_fee_usdt
```

**Passo 3: USDT → BRL**
```
rate_usdtbrl = pricing_mode == "indicative" ? usdtbrl_mid : usdtbrl_bid
brl_received = usdt_after_fee × rate_usdtbrl
```

**Resumo:**
```
effective_gbpbrl_rate = brl_received / amount_gbp
cost_brl = reference_brl − brl_received
cost_bps = (cost_brl / reference_brl) × 10.000
```

---

### Fase 4: Comparador Final

**Delta:**
```
delta_brl = coins_net − bank_net
delta_bps = (delta_brl / reference_brl) × 10.000
savings_pct = (delta_brl / bank_cost_brl) × 100
```

**Vencedor:** "Coins.xyz" se `delta_brl > 0`, senão "Banco"

---

### Fase 5: Snapshot de Prova

**Mensagem Copiável:**
```
Snapshot £{amount} → Bank: R${bank_net} | Coins: R${coins_net} | Δ: R${delta} ({bps} bps). 
Timestamp: {ts}. Sources: {sources}
```

**Integridade:**
```
integrity_hash = SHA256(JSON.stringify(snapshot, sorted_keys))
```

---

## Premissas e Limitações

### Dados Simulados

Atualmente, o projeto usa **dados simulados realistas** baseados em cotações de janeiro de 2026:
- **GBPUSDT**: 1,2745 / 1,2755 (7,84 bps spread)
- **USDTBRL**: 5,1850 / 5,1900 (9,64 bps spread)
- **GBPBRL**: Derivado (GBPUSDT × USDTBRL)

**Próximos passos:** Integrar com APIs reais (Binance, Coinbase, ValorPro) quando disponíveis.

### Parâmetros Padrão

Os valores padrão refletem cenários realistas:
- **Bank FX Markup**: 80 bps (típico para bancos brasileiros)
- **Bank Fee**: 0,80% (taxa explícita comum)
- **Network Fee**: 5 USDT (taxa de rede Tron/Polygon)

Estes podem ser ajustados na interface para diferentes cenários.

### Não Incluído

- **Slippage de execução**: Assumimos mid/ask/bid estáticos
- **Volatilidade**: Preços são snapshot, não histórico
- **Taxas de câmbio de terceiros**: Apenas pares principais (GBP, USD, BRL)
- **Custos de custódia**: Foco em conversão, não armazenamento

---

## Como Executar

### Backend

```bash
# Gerar dados de Price Holders
python3 price_holders.py

# Gerar decomposição bancária
python3 bank_decomposition.py

# Gerar rail cripto
python3 crypto_rail.py

# Gerar comparação final
python3 comparator.py

# Gerar snapshot JSON
python3 snapshot.py
```

### Frontend

```bash
# Instalar dependências
pnpm install

# Iniciar dev server
pnpm dev

# Build para produção
pnpm build
```

---

## Estrutura de Arquivos

```
coins-pricing-proof/
├── price_holders.py          # Fase 1: Price Holders
├── bank_decomposition.py     # Fase 2: Decomposição bancária
├── crypto_rail.py            # Fase 3: Rail cripto
├── comparator.py             # Fase 4: Comparador final
├── snapshot.py               # Fase 5: Snapshot de prova
├── snapshot.json             # Dados gerados
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx      # Página principal (5 seções)
│   │   ├── App.tsx
│   │   └── index.css
│   └── public/
│       └── snapshot.json     # Dados estáticos
└── README.md                 # Esta documentação
```

---

## Fluxo de Dados

```
1. Backend (Python)
   ├── price_holders.py → normaliza APIs → prices.json
   ├── bank_decomposition.py → calcula custos bancários
   ├── crypto_rail.py → calcula custos cripto
   ├── comparator.py → compara lado a lado
   └── snapshot.py → gera snapshot.json com tudo

2. Frontend (React)
   ├── fetch /snapshot.json
   ├── renderiza 5 seções (Fases 1-4)
   ├── botões de copiar para mensagens
   └── exibe hash SHA256 para auditoria
```

---

## Auditoria e Verificação

Cada snapshot inclui:
- **Timestamp ISO8601** — Quando foi gerado
- **Fontes de preço** — Quais APIs foram usadas
- **Fórmulas** — Cada cálculo é transparente
- **Hash SHA256** — Para verificar integridade

Para verificar um snapshot:
```bash
# Recalcular hash
echo -n "$(cat snapshot.json | jq -S .)" | sha256sum

# Comparar com integrity_hash no snapshot
```

---

## Próximas Melhorias

1. **Integração com APIs reais** — Binance, Coinbase, ValorPro
2. **Histórico de snapshots** — Armazenar e comparar ao longo do tempo
3. **Modo interativo** — Ajustar parâmetros na UI e recalcular
4. **Exportar para PDF** — Gerar relatório auditável
5. **Integração com Notion** — Compartilhar snapshots em Notion

---

## Contato e Suporte

Para dúvidas sobre fórmulas, premissas ou implementação, consulte:
- **Fórmulas**: Veja seção "Fórmulas e Premissas" acima
- **Código**: Cada módulo Python tem docstrings detalhadas
- **Frontend**: Componentes React estão comentados

---

## Licença

MIT — Código aberto para fins educacionais e comerciais.
