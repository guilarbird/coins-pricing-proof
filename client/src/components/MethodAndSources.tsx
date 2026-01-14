import { useTranslations } from '@/hooks/useTranslations';

interface MethodAndSourcesProps {
  timestamp: string;
  locale: string;
}

export function MethodAndSources({ timestamp, locale }: MethodAndSourcesProps) {
  const { t } = useTranslations();

  // Format timestamp with locale awareness
  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    const formatter = new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
    });
    return formatter.format(date);
  };

  return (
    <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('method')}</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>{t('marketReference')}:</strong> {t('methodDescription1')}
          </p>
          <p>
            <strong>{t('spread')}:</strong> {t('methodDescription2')}
          </p>
          <p>
            <strong>{t('iofTax')}:</strong> {t('methodDescription3')}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700/50 pt-6">
        <h3 className="text-lg font-semibold mb-4">{t('sourcesLabel')}</h3>
        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded p-4 border border-slate-700/50">
            <div className="text-sm font-semibold mb-2">1. {t('wiseMarketRate')}</div>
            <div className="text-xs text-muted-foreground">
              <a href="https://wise.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                wise.com/rates
              </a>
              <div className="mt-1">{t('sourceDescription1')}</div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded p-4 border border-slate-700/50">
            <div className="text-sm font-semibold mb-2">2. {t('binanceUSDTBRL')}</div>
            <div className="text-xs text-muted-foreground">
              <a href="https://binance.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                binance.com/USDT-BRL
              </a>
              <div className="mt-1">{t('sourceDescription2')}</div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded p-4 border border-slate-700/50">
            <div className="text-sm font-semibold mb-2">3. {t('coinsOrderbook')}</div>
            <div className="text-xs text-muted-foreground">
              <a href="https://coins.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                coins.xyz/orderbook
              </a>
              <div className="mt-1">{t('sourceDescription3')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700/50 pt-6">
        <div className="text-xs text-muted-foreground">
          <div className="mb-2">
            <strong>{t('timestamp')}:</strong> {formatTimestamp(timestamp)}
          </div>
          <div>
            <strong>{t('disclaimer')}:</strong> {t('disclaimerText')}
          </div>
        </div>
      </div>
    </div>
  );
}
