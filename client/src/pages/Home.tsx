import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
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
  const [activePhase, setActivePhase] = useState(0);

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

  const prices = snapshot.price_holders;
  const comp = snapshot.comparison;
  const bank = comp.bank;
  const coins = comp.coins;
  const delta = comp.delta;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header com Logo */}
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
        {/* FASE 1: Estado Inicial (Ancoragem Temporal) */}
        <section className="space-y-8 animate-discover">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              £{comp.amount_gbp.toLocaleString("pt-BR")}
            </h2>
            <p className="text-lg text-muted-foreground">
              Se convertidos agora, no mercado.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Valor em BRL</p>
              <p className="text-5xl font-bold text-foreground">
                R${comp.reference_brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                Fonte: {prices.GBPBRL.source} • {prices.GBPBRL.timestamp.split("T")[1].substring(0, 5)}
              </p>
            </div>
          </div>
        </section>

        {/* Divisor Visual */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">Agora observe</span>
          </div>
        </div>

        {/* FASE 2: Primeira Transformação (Separação Causal - FX Markup) */}
        <section className="space-y-8 animate-discover" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Quando a taxa não é a de mercado
            </h3>
            <p className="text-muted-foreground">
              O mesmo valor, processado de forma diferente.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Valor recebido</p>
              <p className="text-5xl font-bold text-foreground">
                R${bank.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">Diferença</p>
                <p className="text-2xl font-bold text-red-500">
                  -R${(comp.reference_brl - bank.brl_received).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divisor Visual */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">E mais</span>
          </div>
        </div>

        {/* FASE 3: Segunda Transformação (Separação Causal - Taxa Explícita) */}
        <section className="space-y-8 animate-discover" style={{ animationDelay: "0.4s" }}>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Quando há uma taxa adicional
            </h3>
            <p className="text-muted-foreground">
              O mesmo valor, com um custo a mais.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Valor recebido</p>
              <p className="text-5xl font-bold text-foreground">
                R${bank.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">Custo total</p>
                <p className="text-2xl font-bold text-red-500">
                  -R${bank.cost_brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">{bank.cost_bps.toFixed(0)} bps</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divisor Visual */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">Existe uma alternativa</span>
          </div>
        </div>

        {/* FASE 4: Descoberta Autônoma (Comparação Silenciosa) */}
        <section className="space-y-8 animate-discover" style={{ animationDelay: "0.6s" }}>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Estruturada diferente
            </h3>
            <p className="text-muted-foreground">
              Sem alteração no preço de mercado.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Valor recebido</p>
              <p className="text-5xl font-bold text-primary">
                R${coins.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">Custo total</p>
                <p className="text-2xl font-bold text-primary">
                  -R${coins.cost_brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">{coins.cost_bps.toFixed(2)} bps</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divisor Visual */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
        </div>

        {/* Conclusão Silenciosa: Dois Números Lado a Lado */}
        <section className="space-y-8 animate-discover" style={{ animationDelay: "0.8s" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Esquerda */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">Primeira forma</p>
                <p className="text-4xl font-bold text-foreground">
                  R${bank.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {bank.time}
                </p>
              </div>
            </div>

            {/* Direita */}
            <div className="bg-card border border-border rounded-lg p-8 border-primary/50">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">Segunda forma</p>
                <p className="text-4xl font-bold text-primary">
                  R${coins.brl_received.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {coins.time}
                </p>
              </div>
            </div>
          </div>

          {/* Delta (sem ênfase emocional, só números) */}
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Diferença</p>
            <p className="text-5xl font-bold text-primary">
              +R${delta.brl.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              {delta.bps.toFixed(2)} bps
            </p>
          </div>
        </section>

        {/* Divisor Visual */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
        </div>

        {/* Dados Técnicos (Auditoria) */}
        <section className="space-y-6 animate-discover" style={{ animationDelay: "1s" }}>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
              Dados Técnicos
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price Holders */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h5 className="text-sm font-semibold text-foreground">Preços</h5>
              <div className="space-y-3 text-sm">
                {Object.entries(prices).map(([pair, data]: any) => (
                  <div key={pair} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{pair}</span>
                    <span className="font-mono text-foreground">{data.mid.toFixed(8)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Auditoria */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h5 className="text-sm font-semibold text-foreground">Auditoria</h5>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Fontes</p>
                  <p className="font-mono text-foreground text-xs">
                    {snapshot.audit_trail.sources.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Hash</p>
                  <p className="font-mono text-foreground text-xs truncate">
                    {snapshot.integrity_hash.substring(0, 16)}...
                  </p>
                  <button
                    onClick={() => copyToClipboard(snapshot.integrity_hash, "hash")}
                    className="text-primary text-xs mt-2 hover:underline flex items-center gap-1"
                  >
                    {copied === "hash" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    Copiar
                  </button>
                </div>
              </div>
            </div>
          </div>
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
