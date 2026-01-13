import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    toast.success("Copiado");
    setTimeout(() => setCopied(null), 2000);
  };

  if (!snapshot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  const prices = snapshot?.price_holders || {};
  const comp = snapshot?.comparison;
  const bank = comp?.bank;
  const coins = comp?.coins;
  const delta = comp?.delta;

  if (!comp || !bank || !coins || !delta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500">Erro ao carregar dados</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Coins" className="h-8 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Coins</h1>
              <p className="text-xs text-muted-foreground">Prova Econômica</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(comp.timestamp).toLocaleString("pt-BR")}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 space-y-16">
        {/* FASE 1: Âncoras de Preço */}
        <section className="space-y-8 animate-discover">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Fase 1: Âncoras de Preço</h2>
            <p className="text-muted-foreground">Qual é o preço do mundo antes de qualquer taxa?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(prices).map(([pair, data]: any) => (
              <Card key={pair} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{pair}</CardTitle>
                  <CardDescription className="text-xs">
                    Fonte: {data.source} • {data.staleness_seconds}s atrás
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Bid</p>
                    <p className="text-lg font-mono font-bold text-foreground">{data.bid.toFixed(8)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Ask</p>
                    <p className="text-lg font-mono font-bold text-foreground">{data.ask.toFixed(8)}</p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground">Mid</p>
                    <p className="text-lg font-mono font-bold text-primary">{data.mid.toFixed(8)}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {data.spread_bps.toFixed(2)} bps spread
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">Agora observe</span>
          </div>
        </div>

        {/* FASE 2: Decomposição Bancária */}
        <section className="space-y-8 animate-discover" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Fase 2: Decomposição Bancária</h2>
            <p className="text-muted-foreground">Como o banco constrói o preço?</p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>£{comp.amount_gbp.toLocaleString("pt-BR")} → BRL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">1. Referência (Mid)</p>
                <p className="text-2xl font-bold text-foreground">
                  R${comp.reference_brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">2. Custo FX (Markup {bank.fx_markup_bps} bps)</p>
                <p className="text-lg font-bold text-red-500">
                  -R${bank.fx_cost_brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">3. Taxa Explícita ({bank.fee_pct}%)</p>
                <p className="text-lg font-bold text-red-500">
                  -R${bank.fee_brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4 bg-muted/50 p-4 rounded">
                <p className="text-sm text-muted-foreground">Total Recebido</p>
                <p className="text-3xl font-bold text-foreground">
                  R${bank.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Custo total: {bank.cost_bps.toFixed(0)} bps
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">Existe uma alternativa</span>
          </div>
        </div>

        {/* FASE 3: Rail Cripto */}
        <section className="space-y-8 animate-discover" style={{ animationDelay: "0.4s" }}>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Fase 3: Rail Cripto</h2>
            <p className="text-muted-foreground">GBP → USDT → BRL (estruturado diferente)</p>
          </div>

          <Card className="bg-card border-border border-primary/50">
            <CardHeader>
              <CardTitle>£{comp.amount_gbp.toLocaleString("pt-BR")} → USDT → BRL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">1. Referência (Mid)</p>
                <p className="text-2xl font-bold text-foreground">
                  R${comp.reference_brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">2. Taxa de Rede ({coins.network_fee_usdt} USDT)</p>
                <p className="text-lg font-bold text-primary">
                  -R${coins.cost_brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4 bg-primary/10 p-4 rounded">
                <p className="text-sm text-muted-foreground">Total Recebido</p>
                <p className="text-3xl font-bold text-primary">
                  R${coins.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Custo total: {coins.cost_bps.toFixed(2)} bps
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
        </div>

        {/* FASE 4: Comparador */}
        <section className="space-y-8 animate-discover" style={{ animationDelay: "0.6s" }}>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Fase 4: Comparação</h2>
            <p className="text-muted-foreground">Lado a lado</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Banco Tradicional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Recebido</p>
                  <p className="text-3xl font-bold text-foreground">
                    R${bank.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">Custo</p>
                  <p className="text-2xl font-bold text-red-500">
                    {bank.cost_bps.toFixed(0)} bps
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Rail Cripto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Recebido</p>
                  <p className="text-3xl font-bold text-primary">
                    R${coins.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">Custo</p>
                  <p className="text-2xl font-bold text-primary">
                    {coins.cost_bps.toFixed(2)} bps
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/10 border-primary/50">
            <CardHeader>
              <CardTitle className="text-primary">Delta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Diferença no valor recebido</p>
              <p className="text-4xl font-bold text-primary">
                +R${delta.brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Economia: {delta.bps.toFixed(2)} bps
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
        </div>

        {/* FASE 5: Snapshot de Prova */}
        <section className="space-y-8 animate-discover" style={{ animationDelay: "0.8s" }}>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Fase 5: Prova de Integridade</h2>
            <p className="text-muted-foreground">Mensagem auditável com hash SHA256</p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Mensagem de Prova</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded font-mono text-xs text-foreground overflow-auto max-h-32">
                {snapshot.proof_message}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(snapshot.proof_message, "message")}
                className="w-full"
              >
                {copied === "message" ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" /> Copiar Mensagem
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Hash SHA256</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded font-mono text-xs text-foreground overflow-auto">
                {snapshot.integrity_hash}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(snapshot.integrity_hash, "hash")}
                className="w-full"
              >
                {copied === "hash" ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" /> Copiar Hash
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Trilha de Auditoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Fontes</p>
                <div className="flex flex-wrap gap-2">
                  {snapshot.audit_trail.sources.map((source) => (
                    <Badge key={source} variant="secondary">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Timestamp</p>
                <p className="text-sm text-foreground font-mono">
                  {snapshot.audit_trail.timestamp}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container text-center text-xs text-muted-foreground">
          <p>
            Todos os números são derivados de fontes públicas e podem ser verificados através dos hashes de integridade.
          </p>
        </div>
      </footer>
    </div>
  );
}
