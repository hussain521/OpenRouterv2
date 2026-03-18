import { useTranslation } from "react-i18next";

export default function EnterpriseCTA() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold md:text-4xl">{t('enterprise.cta.title')}</h2>
        <p className="mx-auto max-w-3xl text-lg text-slate-11">{t('enterprise.cta.subtitle')}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="mx-auto mb-4 size-8 text-[#6467f2e6]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"></path>
          </svg>
          <h3 className="mb-2 font-semibold">{t('enterprise.cta.contactSalesTitle')}</h3>
          <p className="mb-4 text-sm text-slate-11">{t('enterprise.cta.contactSalesDesc')}</p>
          <a href="/enterprise/form">
            <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 bg-[#6467f2e6] text-white shadow hover:bg-[#6467f2e6]/90 hover:text-[#6467f2e6]-foreground h-8 rounded-md px-3 text-xs w-full">
              {t('enterprise.cta.contactSalesButton')}
            </button>
          </a>
        </div>
        <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="mx-auto mb-4 size-8 text-[#6467f2e6]">
            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path>
          </svg>
          <h3 className="mb-2 text-w font-semibold">{t('enterprise.cta.getStartedTitle')}</h3>
          <p className="mb-4 text-sm text-slate-11">{t('enterprise.cta.getStartedDesc')}</p>
          <a href="/settings/keys">
            <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:text-secondary-foreground h-8 rounded-md px-3 text-xs w-full">
              {t('enterprise.cta.getStartedButton')}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}