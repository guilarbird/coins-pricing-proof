import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface SnapshotData {
  price_holders: Record<string, any>;
  comparison: any;
  proof_message: string;
  integrity_hash: string;
  audit_trail: {
    sources: string[];
    timestamp: string;
  };
}

export default function Home() {
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch("/snapshot.json")
      .then((res) => res.json())
      .then((data) => setSnapshot(data))
      .catch((err) => console.error("Failed to load snapshot:", err));
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copiado para área de transferência");
    setTimeout(() => setCopied(null), 2000);
  };

  if (!snapshot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const prices = snapshot.price_holders;
  const comp = snapshot.comparison;
  const bank = comp.bank;
  const coins = comp.coins;
  const delta = comp.delta;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Coins.xyz</h1>
              <p className="text-sm text-slate-600">Prova Econômica de Conversão</p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p>Gerado: {new Date(comp.timestamp).toLocaleString("pt-BR")}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8">
          <h2 className="text-4xl font-bold text-slate-900">
            Comparação de Custos: Banco vs Coins.xyz
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Análise auditável e decomponível da diferença econômica entre conversão bancária tradicional
            e rail cripto para transferência de GBP para BRL.
          </p>
          <div className="pt-4 text-2xl font-bold text-slate-900">
            £{comp.amount_gbp.toLocaleString("pt-BR")}
          </div>
        </section>

        {/* PHASE 1: Price Holders */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Fase 1: Âncoras de Preço</h3>
            <p className="text-slate-600">Qual é o preço do mundo antes de qualquer taxa?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(prices).map(([pair, data]: any) => (
              <Card key={pair} className="border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{pair}</CardTitle>
                  <CardDescription className="text-xs">
                    Fonte: {data.source} • {data.staleness_seconds}s atrás
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-slate-500">Bid</p>
                      <p className="font-mono font-bold text-slate-900">{data.bid.toFixed(8)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Ask</p>
                      <p className="font-mono font-bold text-slate-900">{data.ask.toFixed(8)}</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <p className="text-slate-500 text-xs">Mid</p>
                    <p className="font-mono font-bold text-lg text-slate-900">{data.mid.toFixed(8)}</p>
                  </div>
                  <div className="text-xs text-slate-500">
                    Spread: {data.spread_bps.toFixed(2)} bps
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* PHASE 2: Bank Decomposition */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Fase 2: Decomposição Bancária</h3>
            <p className="text-slate-600">Como o banco cobra: FX markup + taxa explícita</p>
          </div>

          <div className="space-y-4">
            {/* Reference */}
            <Card className="border-slate-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-base">📍 Referência (Preço do Mundo)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">GBPBRL Mid</p>
                    <p className="font-mono font-bold text-lg">
                      {prices.GBPBRL.mid.toFixed(8)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">BRL @ Mid</p>
                    <p className="font-mono font-bold text-lg">
                      R${comp.reference_brl.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FX Markup */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">💰 Custo 1: FX Markup (Escondido)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Markup aplicado</p>
                    <p className="font-mono font-bold text-lg">{bank.fx_markup_bps.toFixed(0)} bps</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Custo em BRL</p>
                    <p className="font-mono font-bold text-lg text-red-600">
                      R${bank.breakdown.hidden_fx_cost_brl.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Explicit Fee */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">💳 Custo 2: Taxa Explícita</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Taxa</p>
                    <p className="font-mono font-bold text-lg">{bank.fee_pct.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Custo em BRL</p>
                    <p className="font-mono font-bold text-lg text-red-600">
                      R${bank.breakdown.explicit_fee_brl.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* PHASE 3: Crypto Rail */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Fase 3: Rail Cripto (GBP → USDT → BRL)</h3>
            <p className="text-slate-600">Conversão via rail cripto com custos transparentes</p>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <Card className="border-l-4 border-l-blue-500 border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">1️⃣ GBP → USDT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600">Taxa (Mid)</p>
                    <p className="font-mono font-bold">{prices.GBPUSDT.mid.toFixed(8)}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">USDT recebido</p>
                    <p className="font-mono font-bold">{coins.breakdown.gbpusdt_slippage_bps}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-l-4 border-l-green-500 border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">2️⃣ Taxa de Rede</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600">Taxa USDT</p>
                    <p className="font-mono font-bold">{coins.network_fee_usdt.toFixed(2)} USDT</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Custo em BRL</p>
                    <p className="font-mono font-bold">
                      R${coins.breakdown.network_fee_brl.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-l-4 border-l-purple-500 border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">3️⃣ USDT → BRL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600">Taxa (Mid)</p>
                    <p className="font-mono font-bold">{prices.USDTBRL.mid.toFixed(8)}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">BRL recebido</p>
                    <p className="font-mono font-bold">
                      R${coins.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* PHASE 4: Final Comparator */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Fase 4: Comparador Final</h3>
            <p className="text-slate-600">Lado a lado: Banco vs Coins.xyz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bank Column */}
            <Card className="border-slate-200 bg-slate-50">
              <CardHeader className="border-b border-slate-200">
                <CardTitle className="text-lg">{bank.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">BRL Recebido</p>
                  <p className="text-3xl font-bold text-slate-900">
                    R${bank.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-600 mb-1">Custo Total</p>
                  <p className="text-2xl font-bold text-red-600">
                    R${bank.cost_brl.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">{bank.cost_bps.toFixed(2)} bps</p>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-600 mb-1">Tempo</p>
                  <p className="font-semibold text-slate-900">{bank.time}</p>
                </div>
              </CardContent>
            </Card>

            {/* Coins Column */}
            <Card className="border-slate-200 border-2 border-green-200 bg-green-50">
              <CardHeader className="border-b border-green-200">
                <CardTitle className="text-lg">{coins.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">BRL Recebido</p>
                  <p className="text-3xl font-bold text-green-600">
                    R${coins.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="border-t border-green-200 pt-4">
                  <p className="text-sm text-slate-600 mb-1">Custo Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    R${coins.cost_brl.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">{coins.cost_bps.toFixed(2)} bps</p>
                </div>
                <div className="border-t border-green-200 pt-4">
                  <p className="text-sm text-slate-600 mb-1">Tempo</p>
                  <p className="font-semibold text-slate-900">{coins.time}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delta */}
          <Card className="border-slate-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">🏆 Delta (Diferença)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Vencedor</p>
                  <p className="text-2xl font-bold text-green-600">{delta.winner}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Δ BRL</p>
                  <p className="text-2xl font-bold text-green-600">
                    R${delta.brl.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Economia</p>
                  <p className="text-2xl font-bold text-green-600">
                    {delta.savings_pct.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* PHASE 5: Proof Snapshot */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Fase 5: Snapshot de Prova</h3>
            <p className="text-slate-600">Mensagem auditável para compartilhamento</p>
          </div>

          <Card className="border-slate-200 bg-slate-50">
            <CardHeader>
              <CardTitle className="text-base">📋 Mensagem Copiável</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded border border-slate-200 font-mono text-sm break-words">
                {snapshot.proof_message}
              </div>
              <Button
                onClick={() => copyToClipboard(snapshot.proof_message, "proof")}
                variant="outline"
                size="sm"
                className="w-full"
              >
                {copied === "proof" ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Mensagem
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50">
            <CardHeader>
              <CardTitle className="text-base">🔐 Integridade (Hash SHA256)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded border border-slate-200 font-mono text-xs break-all">
                {snapshot.integrity_hash}
              </div>
              <Button
                onClick={() => copyToClipboard(snapshot.integrity_hash, "hash")}
                variant="outline"
                size="sm"
                className="w-full"
              >
                {copied === "hash" ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Hash
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Audit Trail */}
        <section className="space-y-6 pb-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">📊 Trilha de Auditoria</h3>
            <p className="text-slate-600">Fontes e timestamps para verificação</p>
          </div>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Fontes de Preço</p>
                  <p className="font-mono font-bold text-slate-900">
                    {snapshot.audit_trail.sources.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Timestamp</p>
                  <p className="font-mono font-bold text-slate-900">
                    {new Date(snapshot.audit_trail.timestamp).toISOString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="container py-8 text-center text-sm text-slate-600">
          <p>
            Esta página é uma prova econômica auditável. Todos os números são derivados de fontes públicas
            e podem ser verificados através dos hashes de integridade fornecidos.
          </p>
        </div>
      </footer>
    </div>
  );
}
