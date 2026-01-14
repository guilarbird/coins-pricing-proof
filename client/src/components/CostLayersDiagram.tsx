import { useTranslations } from '@/hooks/useTranslations';
import { PricingModel, calculateFinalAmount } from '@/lib/pricing-model';

interface CostLayersDiagramProps {
  gbpAmount: number;
  marketMidRate: number;
  models: PricingModel[];
  selectedModel: PricingModel;
  iofRegime?: 'standard' | 'optimized';
}

export function CostLayersDiagram({
  gbpAmount,
  marketMidRate,
  models,
  selectedModel,
  iofRegime,
}: CostLayersDiagramProps) {
  const { t } = useTranslations();

  const calc = calculateFinalAmount(gbpAmount, marketMidRate, selectedModel, undefined, iofRegime);
  const marketRef = calc?.marketReferenceAmount ?? (gbpAmount * marketMidRate) ?? 0;

  // Calculate percentages for visualization (with division by zero protection)
  const spreadPct = marketRef > 0 ? (calc.fxSpreadCost / marketRef) * 100 : 0;
  const feePct = marketRef > 0 ? (calc.explicitFeeCost / marketRef) * 100 : 0;
  const iofPct = marketRef > 0 ? (calc.iofTaxCost / marketRef) * 100 : 0;
  const receivedPct = marketRef > 0 ? (calc.finalAmount / marketRef) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold mb-6">{t('breakdown')}</h3>

        {/* Stacked bar visualization */}
        <div className="space-y-4">
          {/* Market Reference */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">{t('marketReferenceLabel')}</span>
              <span className="font-mono">R${marketRef.toFixed(2)}</span>
            </div>
            <div className="h-8 bg-blue-500/20 border border-blue-500/50 rounded flex items-center px-3">
              <span className="text-xs font-semibold text-blue-400">100%</span>
            </div>
          </div>

          {/* Spread */}
          {calc.fxSpreadCost > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{t('fxSpreadApplied')}</span>
                <span className="font-mono">-R${calc.fxSpreadCost.toFixed(2)} ({spreadPct.toFixed(2)}%)</span>
              </div>
              <div className="h-8 bg-red-500/20 border border-red-500/50 rounded flex items-center px-3">
                <span className="text-xs font-semibold text-red-400">{spreadPct.toFixed(1)}%</span>
              </div>
            </div>
          )}

          {/* Fee */}
          {calc.explicitFeeCost > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{t('explicitFee')}</span>
                <span className="font-mono">-R${calc.explicitFeeCost.toFixed(2)} ({feePct.toFixed(2)}%)</span>
              </div>
              <div className="h-8 bg-yellow-500/20 border border-yellow-500/50 rounded flex items-center px-3">
                <span className="text-xs font-semibold text-yellow-400">{feePct.toFixed(1)}%</span>
              </div>
            </div>
          )}

          {/* IOF Tax */}
          {calc.iofTaxCost > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{t('iofTax')}</span>
                <span className="font-mono">-R${calc.iofTaxCost.toFixed(2)} ({iofPct.toFixed(2)}%)</span>
              </div>
              <div className="h-8 bg-orange-500/20 border border-orange-500/50 rounded flex items-center px-3">
                <span className="text-xs font-semibold text-orange-400">{iofPct.toFixed(1)}%</span>
              </div>
            </div>
          )}

          {/* Final Amount */}
          <div className="pt-2 border-t border-slate-700/50">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground font-semibold">{t('youReceive')}</span>
              <span className="font-mono font-semibold">R${calc.finalAmount.toFixed(2)}</span>
            </div>
            <div className="h-8 bg-green-500/20 border border-green-500/50 rounded flex items-center px-3">
              <span className="text-xs font-semibold text-green-400">{receivedPct.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-slate-700/50 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">{t('totalCost')}</span>
            <div className="text-lg font-semibold text-red-400">
              R${calc.totalCostBrl.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {calc.totalCostPct.toFixed(2)}% {t('cost')}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">{t('youReceive')}</span>
            <div className="text-lg font-semibold text-green-400">
              R${calc.finalAmount.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {receivedPct.toFixed(2)}% {t('marketReferenceLabel')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
