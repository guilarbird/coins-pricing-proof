# Design Brainstorm — Coins.xyz Pricing Proof Page

## Objetivo
Página institucional de prova econômica que educa, decompõe e compara custos de forma auditável. Sem marketing language, sem gamificação. Foco em clareza, precisão e confiança.

---

## <response>
### Ideia 1: Modernismo Corporativo com Ênfase em Dados

**Design Movement:** Modernismo corporativo + data visualization design  
**Probabilidade:** 0.08

**Core Principles:**
- Hierarquia clara através de tipografia e espaçamento
- Dados como protagonista visual (não decoração)
- Paleta neutra com acentos estratégicos para destacar diferenças
- Estrutura simétrica com grid bem definido

**Color Philosophy:**
- **Background:** Branco puro (confiança, clareza)
- **Primary:** Azul corporativo profundo (#1e40af)
- **Accent:** Verde para "economia" / Vermelho para "custo"
- **Neutral:** Cinzas para hierarquia (texto, borders, backgrounds secundários)
- **Reasoning:** Cores corporativas transmitem seriedade; verde/vermelho são universais para ganho/perda

**Layout Paradigm:**
- Header minimalista com logo + navegação discreta
- Seções empilhadas verticalmente com separadores sutis
- Cards lado a lado (Banco vs Coins) com alinhamento central
- Tabelas com tipografia monoespacial para dados numéricos

**Signature Elements:**
- Ícones de comparação (setas, scales) em azul corporativo
- Linhas horizontais sutis como divisores de seção
- Badges de "fonte" e "timestamp" em cinza claro

**Interaction Philosophy:**
- Hover effects sutis (mudança de cor, elevação leve)
- Botões de "copiar" aparecem ao hover em snippets
- Transições suaves entre seções (scroll reveal)

**Animation:**
- Fade-in ao scroll para cards de comparação
- Número contador animado para valores BRL (0 → valor final em 1s)
- Pulse suave em deltas para chamar atenção

**Typography System:**
- **Display:** Poppins Bold 32px (títulos de seção)
- **Heading:** Inter SemiBold 20px (subtítulos)
- **Body:** Inter Regular 14px (texto)
- **Mono:** IBM Plex Mono 12px (valores numéricos)

</response>

---

## <response>
### Ideia 2: Minimalismo Suíço com Foco em Legibilidade

**Design Movement:** Swiss Style + Information Design  
**Probabilidade:** 0.07

**Core Principles:**
- Máxima legibilidade através de espaçamento generoso
- Tipografia como único elemento decorativo
- Estrutura de grid rigorosa (12 colunas)
- Sem cor desnecessária; apenas funcional

**Color Philosophy:**
- **Background:** Cinza muito claro (#f9fafb)
- **Primary:** Preto puro para texto
- **Accent:** Azul único para links e CTAs
- **Reasoning:** Minimalismo suíço rejeita cor desnecessária; confiança vem de clareza, não de paleta

**Layout Paradigm:**
- Coluna central única (max-width: 900px)
- Muito whitespace (padding: 4rem entre seções)
- Números em tamanho grande (48px) para destaque
- Comparação vertical (Banco acima, Coins abaixo) em vez de lado a lado

**Signature Elements:**
- Linhas horizontais em cinza claro como separadores
- Números em preto bold e muito grandes
- Pequenas anotações em cinza médio explicando cada métrica

**Interaction Philosophy:**
- Interações mínimas; foco em leitura
- Botão "copiar" discreto em canto de cada bloco
- Sem hover effects; apenas mudança de cor em links

**Animation:**
- Nenhuma animação automática; apenas ao clique
- Fade-in lento ao scroll (duração: 800ms)

**Typography System:**
- **Display:** Garamond Bold 48px (números principais)
- **Heading:** Helvetica Neue 24px (títulos)
- **Body:** Helvetica Neue 14px (texto)
- **Mono:** Courier 12px (dados técnicos)

</response>

---

## <response>
### Ideia 3: Design Científico com Ênfase em Auditoria

**Design Movement:** Scientific/Academic + Audit Trail Design  
**Probabilidade:** 0.06

**Core Principles:**
- Estrutura de "laboratório": inputs → processamento → outputs
- Transparência total: mostrar fórmulas, fontes, timestamps
- Paleta baseada em espectro científico (azul → verde → laranja)
- Grid de 3 colunas: Entrada | Processamento | Saída

**Color Philosophy:**
- **Background:** Branco com padrão de grade muito sutil
- **Primary:** Azul científico (#0369a1)
- **Secondary:** Verde para "verificado" (#16a34a)
- **Accent:** Laranja para "atenção" (#ea580c)
- **Reasoning:** Espectro científico comunica rigor; grid transmite estrutura

**Layout Paradigm:**
- 3 colunas: Inputs (esquerda) → Fórmulas (centro) → Outputs (direita)
- Cada métrica tem "origem" explícita (fonte + timestamp)
- Cards com border esquerda colorida por tipo (FX, taxa, rede)

**Signature Elements:**
- Ícone de "verificação" (checkmark) em verde para cada passo
- Fórmulas em caixa cinza com tipografia mono
- "Audit trail" visual mostrando fluxo de dados

**Interaction Philosophy:**
- Clique em qualquer número para expandir fórmula
- Hover em "fonte" mostra timestamp e staleness
- Botão "verificar integridade" calcula hash SHA256

**Animation:**
- Linha animada conectando inputs → outputs
- Número contador com easing científico (ease-out)
- Pulse em valores que mudaram desde último snapshot

**Typography System:**
- **Display:** IBM Plex Serif Bold 36px (títulos)
- **Heading:** IBM Plex Sans SemiBold 18px (subtítulos)
- **Body:** IBM Plex Sans 14px (texto)
- **Mono:** IBM Plex Mono 11px (fórmulas e dados)

</response>

---

## Decisão Final

**Escolhido: Ideia 1 — Modernismo Corporativo com Ênfase em Dados**

### Justificativa
- **Confiança:** Paleta corporativa comunica seriedade e auditabilidade
- **Clareza:** Hierarquia tipográfica clara facilita leitura de dados complexos
- **Funcionalidade:** Comparação lado a lado (Banco vs Coins) é mais intuitiva que vertical
- **Escalabilidade:** Fácil adicionar mais pares de comparação ou cenários
- **Auditabilidade:** Badges de fonte/timestamp mantêm rastreabilidade sem poluir design

### Aplicação Prática
- **Tipografia:** Poppins para títulos (bold, impacto), Inter para corpo (legibilidade)
- **Cores:** Azul corporativo (#1e40af) + verde/vermelho para economia/custo
- **Espaçamento:** Generoso (1.5rem entre seções, 2rem entre cards)
- **Componentes:** Cards com shadow sutil, badges de fonte, tabelas com mono font
- **Interações:** Hover effects sutis, botões de copiar ao hover, scroll reveal

---

## Estrutura de Página

1. **Header:** Logo + Navegação discreta
2. **Hero:** Título + Descrição breve (sem marketing)
3. **Seção 1 — Price Holders:** Tabela de pares GBPUSDT, USDTBRL, GBPBRL
4. **Seção 2 — Decomposição Bancária:** 3 cards (Referência, FX Markup, Taxa Explícita)
5. **Seção 3 — Rail Cripto:** Timeline 3 passos (GBP → USDT → BRL)
6. **Seção 4 — Comparador:** Lado a lado (Banco vs Coins) com delta
7. **Seção 5 — Snapshot:** Botão para gerar prova + mensagem copiável
8. **Footer:** Links de auditoria, fontes, disclaimer

---

## Próximos Passos
1. Implementar componentes React com Tailwind 4
2. Integrar dados Python como JSON estático
3. Adicionar animações e interações
4. Testar responsividade e acessibilidade
