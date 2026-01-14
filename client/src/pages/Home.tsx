import { useState, useContext } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { LanguageContext } from '@/contexts/LanguageContext';
import { DEFAULT_PRICING_MODELS, calculateFinalAmount } from '@/lib/pricing-model';

export default function Home() {
  const { t, language } = useTranslations();
  const { setLanguage } = useContext(LanguageContext);

  // ============================================================================
  // MARKET REFERENCE (FIXED FOR THIS EXAMPLE)
  // ============================================================================
  const MARKET_MID_GBPBRL = 7.21137;
  const MARKET_MID_TIMESTAMP = '13 Jan 2026, 20:00 GMT';

  // ============================================================================
  // USER INPUTS (ADJUSTABLE)
  // ============================================================================
  const [gbpAmount, setGbpAmount] = useState(1000);
  const [bankSpreadBpsOverride, setBankSpreadBpsOverride] = useState<number | undefined>(undefined);
  
  // Use default pricing models
  const pricingModels = DEFAULT_PRICING_MODELS;

  // ============================================================================
  // CALCULATIONS USING PRICING MODELS
  // ============================================================================
  const bankModel = pricingModels[0];
  const wiseModel = pricingModels[1];
  const coinsModel = pricingModels[2];
  
  const bankCalc = calculateFinalAmount(gbpAmount, MARKET_MID_GBPBRL, bankModel, bankSpreadBpsOverride);
  const wiseCalc = calculateFinalAmount(gbpAmount, MARKET_MID_GBPBRL, wiseModel);
  const coinsCalc = calculateFinalAmount(gbpAmount, MARKET_MID_GBPBRL, coinsModel);
  
  // COMPARISONS
  const coinsVsBankSavings = bankCalc.finalAmount - coinsCalc.finalAmount;
  const coinsVsWiseSavings = wiseCalc.finalAmount - coinsCalc.finalAmount;

  // Locale formatting helper
  const formatCurrency = (amount: number) => {
    const locale = language === 'pt' ? 'pt-BR' : 'en-US';
    return amount.toLocaleString(locale, { maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={t('coinsXyz')}
              >
                <path
                  d="M12 2L18 6V12L12 16L6 12V6L12 2Z"
                  fill="currentColor"
                  className="text-purple-600"
                />
                <path
                  d="M12 8L15 10V14L12 16L9 14V10L12 8Z"
                  fill="currentColor"
                  className="text-red-500"
                />
              </svg>
              <span className="font-bold text-lg">{t('coinsXyz')}</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="flex gap-2 bg-slate-800/50 p-1 rounded">
                {(['en', 'pt', 'zh'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded text-sm font-medium transition ${
                      language === lang
                        ? 'bg-slate-600 text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-label={`Switch to ${lang.toUpperCase()}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="px-3 py-1 rounded text-sm font-medium bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {t('live')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Market Reference Section */}
        <div className="mb-12 p-6 bg-slate-900/50 dark:bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">{t('marketReference')}</h2>
            <p className="text-sm text-muted-foreground">{t('marketRefDescription')}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-xs text-muted-foreground mb-1">{t('midMarketRate')}</div>
              <div className="text-2xl font-bold">7.21137 BRL/GBP</div>
              <div className="text-xs text-muted-foreground mt-1">
                {t('source')}: Wise
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">{t('timestamp')}</div>
              <div className="text-2xl font-bold">13 Jan 2026</div>
              <div className="text-xs text-muted-foreground mt-1">20:00 GMT</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">{t('referenceAmount')}</div>
              <div className="text-2xl font-bold">
                R${formatCurrency(marketReferenceAmount)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                £{gbpAmount.toLocaleString()} × 7.21137
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">{t('adjustAmount')}</label>
            <input
              type="number"
              value={gbpAmount}
              onChange={(e) => setGbpAmount(Number(e.target.value))}
              className="w-32 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-foreground"
              min="100"
              max="1000000"
              step="100"
              aria-label={t('adjustAmount')}
            />
            <span className="text-sm text-muted-foreground">{t('gbp')}</span>
          </div>
        </div>

        {/* Three-Way Comparison */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('howMuchYouReceive')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bank Transfer */}
            <div className="border border-red-900/50 bg-red-950/20 rounded-lg p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">{t('traditionalBank')}</h3>
                <p className="text-xs text-muted-foreground">{t('bankDescription')}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('spreadBps')}:</span>
                  <span className="font-mono">{bankSpreadBpsOverride ?? bankModel.fxSpreadBps} {t('bps')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('fee')}:</span>
                  <span className="font-mono">{bankModel.explicitFeeValue}{bankModel.explicitFeeType === 'percentage' ? '%' : ''}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('iofTax')}:</span>
                  <span className="font-mono">{typeof bankModel.iofTaxPct === 'number' ? `${bankModel.iofTaxPct}%` : t('structureDependent')}</span>
                </div>
              </div>

              <div className="border-t border-red-900/30 pt-4">
                <div className="text-xs text-muted-foreground mb-1">{t('youReceive')}</div>
                <div className="text-2xl font-bold text-red-400 mb-2">
                  R${formatCurrency(bankCalc.finalAmount)}
                </div>
                <div className="text-xs text-red-400">
                  {t('cost')}: R${formatCurrency(bankCalc.totalCostBrl)} ({bankCalc.totalCostPct.toFixed(2)}%)
                </div>
              </div>

              {/* Adjustable Parameters */}
              <div className="mt-6 pt-6 border-t border-red-900/30 space-y-4">
                <div>
                  <label className="text-xs font-medium mb-2 block">{t('adjustSpread')}:</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="10"
                    value={bankSpreadBpsOverride ?? bankModel.fxSpreadBps}
                    onChange={(e) => setBankSpreadBpsOverride(Number(e.target.value))}
                    className="w-full"
                    aria-label={t('adjustSpread')}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {bankSpreadBpsOverride ?? bankModel.fxSpreadBps} {t('bps')} = {((bankSpreadBpsOverride ?? bankModel.fxSpreadBps) / 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Wise */}
            <div className="border border-yellow-900/50 bg-yellow-950/20 rounded-lg p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">{t('wise')}</h3>
                <p className="text-xs text-muted-foreground">{t('wiseDescription')}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('spreadBps')}</span>
                  <span className="font-mono">{wiseModel.fxSpreadBps} {t('bps')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('fee')}</span>
                  <span className="font-mono">£{wiseModel.explicitFeeValue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('iofTax')}</span>
                  <span className="font-mono">{typeof wiseModel.iofTaxPct === 'number' ? `${wiseModel.iofTaxPct}%` : t('structureDependent')}</span>
                </div>
              </div>

              <div className="border-t border-yellow-900/30 pt-4">
                <div className="text-xs text-muted-foreground mb-1">{t('youReceive')}</div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">
                  R${formatCurrency(wiseCalc.finalAmount)}
                </div>
                <div className="text-xs text-yellow-400">
                  {t('cost')}: R${formatCurrency(wiseCalc.totalCostBrl)} ({wiseCalc.totalCostPct.toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* Coins */}
            <div className="border border-green-900/50 bg-green-950/20 rounded-lg p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">{t('coins')}</h3>
                <p className="text-xs text-muted-foreground">{t('coinsDescription')}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('spreadBps')}</span>
                  <span className="font-mono">{coinsModel.fxSpreadBps} {t('bps')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('fee')}</span>
                  <span className="font-mono">${coinsModel.explicitFeeValue} USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('iofTax')}</span>
                  <span className="font-mono">{typeof coinsModel.iofTaxPct === 'number' ? `${coinsModel.iofTaxPct}%` : t('structureDependent')}</span>
                </div>
              </div>

              <div className="border-t border-green-900/30 pt-4">
                <div className="text-xs text-muted-foreground mb-1">{t('youReceive')}</div>
                <div className="text-2xl font-bold text-green-400 mb-2">
                  R${formatCurrency(coinsCalc.finalAmount)}
                </div>
                <div className="text-xs text-green-400">
                  {t('cost')}: R${formatCurrency(coinsCalc.totalCostBrl)} ({coinsCalc.totalCostPct.toFixed(2)}%)
                </div>
              </div>

              {/* Savings */}
              <div className="mt-6 pt-6 border-t border-green-900/30 space-y-2">
                <div className="text-xs font-semibold text-green-400">
                  {coinsVsBankSavings > 0
                    ? `+R$${formatCurrency(coinsVsBankSavings)} ${t('vsBankShort')}`
                    : `${t('costsMore')} ${t('traditionalBank')}`}
                </div>
                <div className="text-xs font-semibold text-green-400">
                  {coinsVsWiseSavings > 0
                    ? `+R$${formatCurrency(coinsVsWiseSavings)} ${t('vsWiseShort')}`
                    : `${t('costsMore')} Wise`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanations Section */}
        <div className="mb-12 p-6 bg-slate-900/50 dark:bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <h2 className="text-lg font-semibold mb-6">{t('explanations')}</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong>{t('iofTax')}:</strong> {t('iofTaxExplanation')}
            </p>
            <p>
              <strong>{t('spread')}:</strong> {t('spreadExplanation')}
            </p>
            <p>
              <strong>{t('fee')}:</strong> {t('feeExplanation')}
            </p>
            <p>
              <strong>{t('sourcesLabel')}:</strong> {t('sourcesDescription')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>{t('ratesUpdated')}</p>
        </div>
      </div>
    </div>
  );
}
