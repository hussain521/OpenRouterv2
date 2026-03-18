import { useTranslation } from "react-i18next";

export default function EnterpriseFromPocToProd() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold md:text-4xl">{t('enterprise.fromPocToProd.title')}</h2>
      </div>
      <div className="space-y-6">
        {/* Enterprise Grade Performance Card */}
        <div className="group/card rounded-xl transition-all duration-200 text-foreground border p-6 bg-gradient-to-br from-green-1 to-green-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-green-11">{t('enterprise.fromPocToProd.enterprisePerformanceTitle')}</h4>
              <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.enterprisePerformanceDesc')}</p>
            </div>
            <div className="flex gap-1">
              {Array.from({length: 20}, (_, i) => {
                const heights = [25, 35, 30, 22, 38, 28, 32, 24, 36, 34, 31, 35, 40, 26, 23, 35, 33, 39, 36, 32];
                const opacities = [0.8, 0.6, 0.9, 0.7, 0.85, 0.75, 0.9, 0.65, 0.8, 0.75, 0.95, 0.7, 0.85, 0.6, 0.9, 0.8, 0.75, 0.85, 0.9, 0.7];
                return (
                  <div
                    key={i}
                    className="h-8 w-1 rounded-full bg-green-9"
                    style={{
                      height: `${heights[i]}px`,
                      opacity: opacities[i]
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* First Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="group/card rounded-xl transition-all duration-200 bg-card text-foreground border p-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-6 text-[#6467f2e6] flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"></path>
              </svg>
              <div>
                <h4 className="font-semibold">{t('enterprise.fromPocToProd.highRateLimitsTitle')}</h4>
                <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.highRateLimitsDesc')}</p>
                <a className="block text-xs text-[#6467f2e6] hover:underline" href="/rankings">{t('enterprise.fromPocToProd.highRateLimitsLink')}</a>
              </div>
            </div>
          </div>
          <div className="group/card rounded-xl transition-all duration-200 bg-card text-foreground border p-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-6 text-[#6467f2e6] flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"></path>
              </svg>
              <div>
                <h4 className="font-semibold">{t('enterprise.fromPocToProd.automaticFailoverTitle')}</h4>
                <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.automaticFailoverDesc')}</p>
                <a href="/docs/guides/best-practices/uptime-optimization" className="block text-xs text-[#6467f2e6] hover:underline">{t('enterprise.fromPocToProd.automaticFailoverLink')}</a>
              </div>
            </div>
          </div>
          <div className="group/card rounded-xl transition-all duration-200 bg-card text-foreground border p-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-6 text-[#6467f2e6] flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path>
              </svg>
              <div>
                <h4 className="font-semibold">{t('enterprise.fromPocToProd.enterprisePerfCardTitle')}</h4>
                <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.enterprisePerfCardDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="group/card rounded-xl transition-all duration-200 bg-card text-foreground border p-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-6 text-[#6467f2e6] flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
              </svg>
              <div>
                <h4 className="font-semibold">{t('enterprise.fromPocToProd.unifiedBillingTitle')}</h4>
                <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.unifiedBillingDesc')}</p>
              </div>
            </div>
          </div>
          <div className="group/card rounded-xl transition-all duration-200 bg-card text-foreground border p-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-6 text-[#6467f2e6] flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"></path>
              </svg>
              <div>
                <h4 className="font-semibold">{t('enterprise.fromPocToProd.compliancePrivacyTitle')}</h4>
                <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.compliancePrivacyDesc')}</p>
                <a className="block text-xs text-[#6467f2e6] hover:underline" href="https://openrouter.ai/docs/guides/features/zdr">{t('enterprise.fromPocToProd.compliancePrivacyLink')}</a>
              </div>
            </div>
          </div>
          <div className="group/card rounded-xl transition-all duration-200 bg-card text-foreground border p-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-6 text-[#6467f2e6] flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"></path>
              </svg>
              <div>
                <h4 className="font-semibold">{t('enterprise.fromPocToProd.zeroLoggingTitle')}</h4>
                <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.zeroLoggingDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Third Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="group/card rounded-xl transition-all duration-200 bg-card text-foreground border p-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-6 text-[#6467f2e6] flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path>
              </svg>
              <div>
                <h4 className="font-semibold">{t('enterprise.fromPocToProd.unifiedReportingTitle')}</h4>
                <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.unifiedReportingDesc')}</p>
              </div>
            </div>
          </div>
          <div className="group/card rounded-xl transition-all duration-200 bg-card text-foreground border p-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-6 text-[#6467f2e6] flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"></path>
              </svg>
              <div>
                <h4 className="font-semibold">{t('enterprise.fromPocToProd.orgSsoTitle')}</h4>
                <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.orgSsoDesc')}</p>
              </div>
            </div>
          </div>
          <div className="group/card rounded-xl transition-all duration-200 bg-card text-foreground border p-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-6 text-[#6467f2e6] flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"></path>
              </svg>
              <div>
                <h4 className="font-semibold">{t('enterprise.fromPocToProd.spendMgmtTitle')}</h4>
                <p className="text-sm text-slate-11">{t('enterprise.fromPocToProd.spendMgmtDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BYOC Card */}
        <div className="group/card rounded-xl transition-all duration-200 text-foreground border p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center gap-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-8 text-[#6467f2e6]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"></path>
            </svg>
            <h4 className="text-xl font-bold">{t('enterprise.fromPocToProd.byocTitle')}</h4>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-sm">{t('enterprise.fromPocToProd.byocUseCreditsTitle')}</p>
              <p className="text-xs text-slate-11">{t('enterprise.fromPocToProd.byocUseCreditsDesc')}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">{t('enterprise.fromPocToProd.byocRateLimitTitle')}</p>
              <p className="text-xs text-slate-11">{t('enterprise.fromPocToProd.byocRateLimitDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}