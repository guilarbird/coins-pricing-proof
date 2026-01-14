import { useTranslations } from '@/hooks/useTranslations';

export function SWIFTMazeDiagram() {
  const { t } = useTranslations();

  return (
    <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold mb-6">{t('swiftMaze')}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SWIFT Route (Left) */}
        <div className="space-y-4">
          <h4 className="font-semibold text-red-400">SWIFT Route</h4>

          {/* Sender Bank */}
          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold mb-2">1. {t('traditionalBank')}</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• {t('spreadBps')}: 80 bps</div>
              <div>• {t('fee')}: 0.8%</div>
              <div>• {t('iofTax')}: 3.5%</div>
            </div>
          </div>

          {/* Correspondent Banks */}
          <div className="flex justify-center">
            <div className="text-xs text-muted-foreground">↓ SWIFT Network</div>
          </div>

          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold mb-2">2. Correspondent Banks</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Multiple intermediaries</div>
              <div>• Hidden fees at each step</div>
              <div>• 3-5 business days</div>
            </div>
          </div>

          {/* Receiver Bank */}
          <div className="flex justify-center">
            <div className="text-xs text-muted-foreground">↓ Settlement</div>
          </div>

          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold mb-2">3. Receiver Bank (Brazil)</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Local bank receives</div>
              <div>• Funds credited to account</div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mt-4">
            <div className="text-xs text-muted-foreground mb-1">Total Cost</div>
            <div className="text-xl font-bold text-red-400">~12-15%</div>
          </div>
        </div>

        {/* Market-Based Route (Right) */}
        <div className="space-y-4">
          <h4 className="font-semibold text-green-400">Market-Based Route</h4>

          {/* Sender */}
          <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold mb-2">1. {t('coins')}</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• {t('spreadBps')}: 0 bps</div>
              <div>• {t('fee')}: $5 USD</div>
              <div>• {t('iofTax')}: Structure-dependent</div>
            </div>
          </div>

          {/* Stablecoin Rail */}
          <div className="flex justify-center">
            <div className="text-xs text-muted-foreground">↓ Stablecoin Rail</div>
          </div>

          <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold mb-2">2. Blockchain Settlement</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Direct execution</div>
              <div>• No intermediaries</div>
              <div>• &lt; 1 hour</div>
            </div>
          </div>

          {/* Receiver */}
          <div className="flex justify-center">
            <div className="text-xs text-muted-foreground">↓ Local Settlement</div>
          </div>

          <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-4">
            <div className="text-sm font-semibold mb-2">3. Receiver (Brazil)</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Local bank or wallet</div>
              <div>• Funds credited instantly</div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 mt-4">
            <div className="text-xs text-muted-foreground mb-1">Total Cost</div>
            <div className="text-xl font-bold text-green-400">~1-3%</div>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-6 pt-6 border-t border-slate-700/50 bg-blue-950/20 border border-blue-900/50 rounded-lg p-4">
        <div className="text-sm text-blue-400">
          <strong>Key Insight:</strong> Coins cuts out correspondent banks entirely, reducing layers and costs by 75-80%.
        </div>
      </div>
    </div>
  );
}
