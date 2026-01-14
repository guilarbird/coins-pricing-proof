import { useTranslations } from '@/hooks/useTranslations';

export function InstitutionalFooter() {
  const { t } = useTranslations();

  return (
    <footer className="border-t border-slate-700/50 mt-12 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-semibold mb-3">{t('about')}</h4>
            <p className="text-xs text-muted-foreground">{t('aboutDescription')}</p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3">{t('resources')}</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="https://coins.xyz/docs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  {t('documentation')}
                </a>
              </li>
              <li>
                <a href="https://coins.xyz/api" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  {t('api')}
                </a>
              </li>
              <li>
                <a href="https://coins.xyz/status" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  {t('status')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">{t('legal')}</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="https://coins.xyz/terms" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  {t('termsOfService')}
                </a>
              </li>
              <li>
                <a href="https://coins.xyz/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  {t('privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="https://coins.xyz/contact" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700/50 pt-6 text-center text-xs text-muted-foreground">
          <p>
            {t('copyright')} © 2025 Coins.xyz. {t('allRightsReserved')}
          </p>
          <p className="mt-2">{t('footerDisclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
