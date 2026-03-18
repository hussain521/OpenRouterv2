import { useTranslation } from "react-i18next";

export default function EnterpriseBilling() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold md:text-4xl">{t('enterprise.billing.title')}</h2>
        <p className="mx-auto max-w-3xl text-lg text-slate-11">{t('enterprise.billing.subtitle')}</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Payment Options Column */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">{t('enterprise.billing.paymentOptionsTitle')}</h3>
          <div className="space-y-4">
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg p-6">
              <div className="flex items-center gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-8 flex-shrink-0 text-[#6467f2e6]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"></path>
                </svg>
                <div>
                  <h4 className="font-semibold">{t('enterprise.billing.creditCardTitle')}</h4>
                  <p className="text-sm text-slate-11">{t('enterprise.billing.creditCardDesc')}</p>
                </div>
              </div>
            </div>
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg p-6">
              <div className="flex items-center gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-8 flex-shrink-0 text-[#6467f2e6]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path>
                </svg>
                <div>
                  <h4 className="font-semibold">{t('enterprise.billing.invoicedTitle')}</h4>
                  <p className="text-sm text-slate-11">{t('enterprise.billing.invoicedDesc')}</p>
                </div>
              </div>
            </div>
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg p-6">
              <div className="flex items-center gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-8 flex-shrink-0 text-[#6467f2e6]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"></path>
                </svg>
                <div>
                  <h4 className="font-semibold">{t('enterprise.billing.creditLinesTitle')}</h4>
                  <p className="text-sm text-slate-11">{t('enterprise.billing.creditLinesDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transparent Pricing Column */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">{t('enterprise.billing.transparentPricingTitle')}</h3>
          <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="mt-0.5 size-5 flex-shrink-0 text-green-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
                <p className="text-sm">{t('enterprise.billing.noMarkup')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="mt-0.5 size-5 flex-shrink-0 text-green-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
                <p className="text-sm">{t('enterprise.billing.configurablePayments')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="mt-0.5 size-5 flex-shrink-0 text-green-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
                <p className="text-sm">{t('enterprise.billing.noLongTermContracts')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="mt-0.5 size-5 flex-shrink-0 text-green-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
                <p className="text-sm">{t('enterprise.billing.byocSaaS')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="mt-0.5 size-5 flex-shrink-0 text-green-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
                <p className="text-sm">{t('enterprise.billing.vatCompliance')}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="mt-0.5 size-5 flex-shrink-0 text-green-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
                <p className="text-sm">{t('enterprise.billing.invoicingReporting')}</p>
              </div>
            </div>
            <div className="mt-6">
              <a className="text-sm text-[#6467f2e6] hover:underline" href="/pricing">{t('enterprise.billing.pricingLink')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}