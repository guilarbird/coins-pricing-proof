import { useTranslations } from '@/hooks/useTranslations';

interface BidAskSpreadDiagramProps {
  midRate: number;
  spreadBps: number;
}

export function BidAskSpreadDiagram({ midRate, spreadBps }: BidAskSpreadDiagramProps) {
  const { t } = useTranslations();

  const spreadAmount = (midRate * spreadBps) / 10000;
  const bidRate = midRate - spreadAmount / 2;
  const askRate = midRate + spreadAmount / 2;

  return (
    <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold mb-6">Bid / Ask / Spread</h3>

      <div className="space-y-6">
        {/* Visual representation */}
        <div className="relative h-32 bg-gradient-to-r from-red-950/30 via-slate-900 to-green-950/30 rounded-lg border border-slate-700/50 flex items-center justify-center">
          {/* Bid line */}
          <div className="absolute left-0 top-0 bottom-0 w-1/3 border-r-2 border-red-500/50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Bid</div>
              <div className="font-mono font-bold text-red-400">{bidRate.toFixed(4)}</div>
            </div>
          </div>

          {/* Mid-market line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500/50 transform -translate-x-1/2" />

          {/* Ask line */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 border-l-2 border-green-500/50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Ask</div>
              <div className="font-mono font-bold text-green-400">{askRate.toFixed(4)}</div>
            </div>
          </div>

          {/* Mid-market label */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="text-center">
              <div className="text-xs text-blue-400 font-semibold mb-1">Mid-Market</div>
              <div className="font-mono font-bold text-blue-300">{midRate.toFixed(4)}</div>
            </div>
          </div>
        </div>

        {/* Spread explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-2">Bid (Compra)</div>
            <div className="font-mono font-bold text-red-400 mb-1">{bidRate.toFixed(4)}</div>
            <div className="text-xs text-muted-foreground">
              O que você recebe ao vender GBP
            </div>
          </div>

          <div className="bg-blue-950/20 border border-blue-900/50 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-2">{t('spread')}</div>
            <div className="font-mono font-bold text-blue-400 mb-1">{spreadBps} {t('bps')}</div>
            <div className="text-xs text-muted-foreground">
              Diferença entre bid e ask
            </div>
          </div>

          <div className="bg-green-950/20 border border-green-900/50 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-2">Ask (Venda)</div>
            <div className="font-mono font-bold text-green-400 mb-1">{askRate.toFixed(4)}</div>
            <div className="text-xs text-muted-foreground">
              O que você paga ao comprar GBP
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <div className="text-sm text-muted-foreground">
            <strong>Spread Impact:</strong> Um spread de {spreadBps} bps significa que em uma transferência de £1,000, você perde aproximadamente R${(1000 * spreadAmount).toFixed(2)} apenas no spread.
          </div>
        </div>
      </div>
    </div>
  );
}
