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
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const loadSnapshot = async () => {
      try {
        const res = await fetch("/snapshot.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSnapshot(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading data");
        console.error("Failed to load snapshot:", err);
      }
    };
    loadSnapshot();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied");
    setTimeout(() => setCopied(null), 2000);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </div>
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const prices = snapshot.price_holders;
  const comp = snapshot.comparison;

  if (!comp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-red-500">Comparison data not found</p>
      </div>
    );
  }

  const bank = comp.bank || {};
  const coins = comp.coins || {};
  const delta = comp.delta || {};

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Coins" className="h-8 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Understanding GBP → BRL Transfers</h1>
              <p className="text-xs text-muted-foreground">How international transfers are priced</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {comp.timestamp ? new Date(comp.timestamp).toLocaleString("en-GB") : ""}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 space-y-16">
        {/* STEP 1: Market Reference */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Step 1 — The market price</h2>
            <p className="text-muted-foreground max-w-2xl">
              This is the market reference for converting GBP to BRL at this moment.
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              It represents the price before any bank is involved, any fee is applied, or any commercial adjustment is made.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(prices).map(([pair, data]: any) => (
              <Card key={pair} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-mono">{pair}</CardTitle>
                  <CardDescription className="text-xs">
                    Source: {data.source} • {data.staleness_seconds}s ago
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Bid</p>
                    <p className="text-sm font-mono font-bold text-foreground">{data.bid.toFixed(8)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Ask</p>
                    <p className="text-sm font-mono font-bold text-foreground">{data.ask.toFixed(8)}</p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground">Mid (Reference)</p>
                    <p className="text-lg font-mono font-bold text-primary">{data.mid.toFixed(8)}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {data.spread_bps.toFixed(2)} bps spread
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground">
              <strong>For this example:</strong> £{(comp.amount_gbp || 0).toLocaleString("en-GB")} at market reference = <strong>R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</strong>
            </p>
          </div>
        </section>

        {/* Divisor */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-muted-foreground text-sm">Now observe</span>
          </div>
        </div>

        {/* STEP 2: Execution Rate */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Step 2 — The execution rate</h2>
            <p className="text-muted-foreground max-w-2xl">
              Banks do not execute transfers using the market reference directly.
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Instead, the exchange rate applied to a transfer is adjusted before the conversion takes place. This adjustment changes the rate used to convert your funds.
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Bank transfer: £{(comp.amount_gbp || 0).toLocaleString("en-GB")} → BRL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Market reference (Mid)</p>
                <p className="text-2xl font-bold text-foreground">
                  R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Applied adjustment (FX markup: {bank.fx_markup_bps || 0} bps)</p>
                <p className="text-lg font-bold text-red-500">
                  −R${(bank.fx_cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Execution rate now uses an adjusted reference
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4 bg-muted/50 p-4 rounded">
                <p className="text-sm text-muted-foreground">Amount after rate adjustment</p>
                <p className="text-2xl font-bold text-foreground">
                  R${(bank.brl_after_fx || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
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
            <span className="bg-background px-4 text-muted-foreground text-sm">And then</span>
          </div>
        </div>

        {/* STEP 3: Explicit Fee */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Step 3 — The explicit transfer fee</h2>
            <p className="text-muted-foreground max-w-2xl">
              After the exchange rate is applied, banks typically charge an explicit transfer fee.
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              In this example, the fee is {bank.fee_pct || 0}%. This fee is applied on top of a conversion that has already used an adjusted exchange rate.
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Total cost breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">After rate adjustment</p>
                <p className="text-2xl font-bold text-foreground">
                  R${(bank.brl_after_fx || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Explicit fee ({bank.fee_pct || 0}%)</p>
                <p className="text-lg font-bold text-red-500">
                  −R${(bank.fee_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4 bg-red-50 dark:bg-red-950/20 p-4 rounded">
                <p className="text-sm text-muted-foreground">You receive</p>
                <p className="text-3xl font-bold text-foreground">
                  R${(bank.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Total cost: {(bank.cost_bps || 0).toFixed(0)} basis points
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
            <span className="bg-background px-4 text-muted-foreground text-sm">An alternative structure</span>
          </div>
        </div>

        {/* STEP 4: Alternative Structure */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Step 4 — Using the market price directly</h2>
            <p className="text-muted-foreground max-w-2xl">
              It is possible to structure a conversion where the market reference rate is used directly, all costs are explicit and visible, and no adjustment is applied to the exchange rate itself.
            </p>
          </div>

          <Card className="bg-card border-border border-primary/50">
            <CardHeader>
              <CardTitle>Alternative structure: £{(comp.amount_gbp || 0).toLocaleString("en-GB")} → USDT → BRL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Market reference (Mid)</p>
                <p className="text-2xl font-bold text-foreground">
                  R${(comp.reference_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Network cost ({coins.network_fee_usdt || 0} USDT)</p>
                <p className="text-lg font-bold text-primary">
                  −R${(coins.cost_brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  No adjustment to exchange rate
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4 bg-primary/10 p-4 rounded">
                <p className="text-sm text-muted-foreground">You receive</p>
                <p className="text-3xl font-bold text-primary">
                  R${(coins.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Total cost: {(coins.cost_bps || 0).toFixed(2)} basis points
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

        {/* COMPARISON */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Comparison</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Bank structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">You receive</p>
                  <p className="text-3xl font-bold text-foreground">
                    R${(bank.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <p className="text-2xl font-bold text-red-500">
                    {(bank.cost_bps || 0).toFixed(0)} bps
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Alternative structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">You receive</p>
                  <p className="text-3xl font-bold text-primary">
                    R${(coins.brl_received || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <p className="text-2xl font-bold text-primary">
                    {(coins.cost_bps || 0).toFixed(2)} bps
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/10 border-primary/50">
            <CardHeader>
              <CardTitle className="text-primary">Difference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Additional amount received</p>
              <p className="text-4xl font-bold text-primary">
                +R${(delta.brl || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Cost difference: {(delta.bps || 0).toFixed(2)} basis points
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

        {/* AUDIT & VERIFICATION */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Verification & Sources</h2>
            <p className="text-muted-foreground">
              All numbers are derived from public market data and can be verified through the integrity hash below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Proof Message</CardTitle>
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
                      <Check className="w-4 h-4 mr-2" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" /> Copy Message
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">SHA256 Hash</CardTitle>
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
                      <Check className="w-4 h-4 mr-2" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" /> Copy Hash
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Data Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Market data sources</p>
                <div className="flex flex-wrap gap-2">
                  {snapshot.audit_trail.sources.map((source) => (
                    <Badge key={source} variant="secondary">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground mb-2">Generated</p>
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
            This page demonstrates how international transfers are structured and priced.
            All calculations are based on public market data with verifiable integrity.
          </p>
        </div>
      </footer>
    </div>
  );
}
