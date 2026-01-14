import { useTranslations } from '@/hooks/useTranslations';
import { PricingModel } from '@/lib/pricing-model';

interface SimulatorProps {
  models: PricingModel[];
  gbpAmount: number;
  midRate: number;
}

// Format basis points
function formatBps(bps: number): string {
  return `${bps} bps`;
}

// Format percentage
function formatPercent(percent: number): string {
  return `${(percent * 100).toFixed(2)}%`;
}

export function Simulator({ models, gbpAmount, midRate }: SimulatorProps) {
  const { t } = useTranslations();

  // Calculate cost breakdown for each model
  const costBreakdown = models.map(model => {
    const baseAmount = gbpAmount * midRate;
    
    // Spread cost
    const spreadCost = (baseAmount * model.fxSpreadBps) / 10000;
    
    // Fee cost
    const feeCost = model.feeType === 'fixed' ? model.feeValue : (baseAmount * model.feeValue) / 100;
    
    // IOF cost (simplified)
    const iofCost = (baseAmount * model.iofPercent) / 100;
    
    return {
      name: model.name,
      spread: model.fxSpreadBps,
      fee: model.feeValue,
      iof: model.iofPercent,
      spreadCost,
      feeCost,
      iofCost,
      totalCost: spreadCost + feeCost + iofCost,
    };
  });

  return (
    <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold mb-6">{t('costBreakdown')}</h3>

      <div className="space-y-6">
        {costBreakdown.map((breakdown, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-sm">{breakdown.name}</span>
              <span className="text-xs text-muted-foreground">
                {t('totalCost')}: R$ {breakdown.totalCost.toFixed(2)}
              </span>
            </div>

            {/* Cost Stack Visualization */}
            <div className="space-y-2">
              {/* Spread */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-red-500/20 border border-red-500/50 rounded flex items-center px-2">
                  <div className="text-xs font-semibold text-red-400">
                    {t('spread')}: {formatBps(breakdown.spread)}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground w-20 text-right">
                  R$ {breakdown.spreadCost.toFixed(2)}
                </span>
              </div>

              {/* Fee */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-yellow-500/20 border border-yellow-500/50 rounded flex items-center px-2">
                  <div className="text-xs font-semibold text-yellow-400">
                    {t('fee')}: {formatPercent(breakdown.fee / 100)}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground w-20 text-right">
                  R$ {breakdown.feeCost.toFixed(2)}
                </span>
              </div>

              {/* IOF */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-orange-500/20 border border-orange-500/50 rounded flex items-center px-2">
                  <div className="text-xs font-semibold text-orange-400">
                    {t('iofTax')}: {formatPercent(breakdown.iof / 100)}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground w-20 text-right">
                  R$ {breakdown.iofCost.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="text-xs text-muted-foreground bg-slate-800/50 rounded p-2 mt-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-red-400">■</span> {t('spread')}: {formatBps(breakdown.spread)}
                </div>
                <div>
                  <span className="text-yellow-400">■</span> {t('fee')}: {formatPercent(breakdown.fee / 100)}
                </div>
                <div>
                  <span className="text-orange-400">■</span> {t('iofTax')}: {formatPercent(breakdown.iof / 100)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
