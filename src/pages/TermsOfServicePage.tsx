import { usePageTitle } from "../hooks/usePageTitle";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopBanner from "../components/TopBanner";

export default function TermsOfServicePage() {
  const { t } = useTranslation();
  usePageTitle(t("termsOfService.title"));
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-background transition-colors duration-200">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <TopBanner />
      </div>
      <div className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm">
        <Navbar />
      </div>

      <main className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 lg:py-16 xl:py-20">
        <header className="text-center mb-6 xs:mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-foreground transition-colors duration-200 leading-tight">
            {t("termsOfService.title")}
          </h1>
        </header>
        
        <article className="prose prose-sm xs:prose-base sm:prose-lg lg:prose-xl max-w-none
          prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground
          dark:prose-invert prose-headings:font-semibold prose-headings:leading-tight
          prose-p:leading-relaxed prose-p:mb-4 xs:prose-p:mb-5 sm:prose-p:mb-6
          prose-h2:text-lg xs:prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl
          prose-h3:text-base xs:prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl
          prose-h2:mb-4 xs:prose-h2:mb-5 sm:prose-h2:mb-6 lg:prose-h2:mb-8
          prose-h3:mb-3 xs:prose-h3:mb-4 sm:prose-h3:mb-5 lg:prose-h3:mb-6
          prose-h2:mt-8 xs:prose-h2:mt-10 sm:prose-h2:mt-12 lg:prose-h2:mt-16
          prose-h3:mt-6 xs:prose-h3:mt-8 sm:prose-h3:mt-10 lg:prose-h3:mt-12
          animate-fade-in">
          
          <p className="text-muted-foreground italic text-sm xs:text-base mb-4 xs:mb-6 sm:mb-8">
            <em>{t("termsOfService.lastUpdated")}</em>
          </p>
          
          <div className="space-y-4 xs:space-y-5 sm:space-y-6 mb-6 xs:mb-8 sm:mb-10 lg:mb-12">
            <p dangerouslySetInnerHTML={{ __html: t("termsOfService.introduction") }} className="text-muted-foreground leading-relaxed" />
            <p dangerouslySetInnerHTML={{ __html: t("termsOfService.readCarefully") }} className="text-muted-foreground leading-relaxed" />
            <p dangerouslySetInnerHTML={{ __html: t("termsOfService.bindingArbitration") }} className="text-muted-foreground leading-relaxed" />
          </div>
          
          <section className="space-y-6 xs:space-y-8 sm:space-y-10 lg:space-y-12">
            <div>
              <h3 className="relative flex items-center justify-start gap-2 xs:gap-3 group w-full font-semibold text-foreground mb-3 xs:mb-4 sm:mb-5 transition-colors duration-200">
                <span id="_1_-__object-object_" className="absolute -top-24"></span>
                <span className="text-primary font-bold">1.</span>
                <strong>{t("termsOfService.sections.serviceOverview.title")}</strong>
                <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary gap-1 xs:gap-2 border border-border bg-background hover:bg-muted hover:text-foreground h-5 xs:h-6 rounded-md px-1 xs:px-1.5 text-xs shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 touch-target">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-2 xs:size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
                </button>
              </h3>
              <p dangerouslySetInnerHTML={{ __html: t("termsOfService.sections.serviceOverview.content") }} className="text-muted-foreground leading-relaxed" />
            </div>

            <div>
              <h3 className="relative flex items-center justify-start gap-2 xs:gap-3 group w-full font-semibold text-foreground mb-3 xs:mb-4 sm:mb-5 transition-colors duration-200">
                <span id="_2_-__object-object_" className="absolute -top-24"></span>
                <span className="text-primary font-bold">2.</span>
                <strong>{t("termsOfService.sections.eligibility.title")}</strong>
                <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary gap-1 xs:gap-2 border border-border bg-background hover:bg-muted hover:text-foreground h-5 xs:h-6 rounded-md px-1 xs:px-1.5 text-xs shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 touch-target">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-2 xs:size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
                </button>
              </h3>
              <p dangerouslySetInnerHTML={{ __html: t("termsOfService.sections.eligibility.content") }} className="text-muted-foreground leading-relaxed" />
            </div>

            <div>
              <h3 className="relative flex items-center justify-start gap-2 xs:gap-3 group w-full font-semibold text-foreground mb-3 xs:mb-4 sm:mb-5 transition-colors duration-200">
                <span id="_3_-__object-object_" className="absolute -top-24"></span>
                <span className="text-primary font-bold">3.</span>
                <strong>{t("termsOfService.sections.accounts.title")}</strong>
                <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary gap-1 xs:gap-2 border border-border bg-background hover:bg-muted hover:text-foreground h-5 xs:h-6 rounded-md px-1 xs:px-1.5 text-xs shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 touch-target">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-2 xs:size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
                </button>
              </h3>
              <div className="space-y-3 xs:space-y-4">
                <p dangerouslySetInnerHTML={{ __html: t("termsOfService.sections.accounts.content1") }} className="text-muted-foreground leading-relaxed" />
                <p dangerouslySetInnerHTML={{ __html: t("termsOfService.sections.accounts.content2") }} className="text-muted-foreground leading-relaxed" />
              </div>
            </div>

            <div>
              <h3 className="relative flex items-center justify-start gap-2 xs:gap-3 group w-full font-semibold text-foreground mb-3 xs:mb-4 sm:mb-5 transition-colors duration-200">
                <span id="_4_-__object-object_" className="absolute -top-24"></span>
                <span className="text-primary font-bold">4.</span>
                <strong>{t("termsOfService.sections.payment.title")}</strong>
                <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary gap-1 xs:gap-2 border border-border bg-background hover:bg-muted hover:text-foreground h-5 xs:h-6 rounded-md px-1 xs:px-1.5 text-xs shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 touch-target">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-2 xs:size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
                </button>
              </h3>

              <div className="ml-4 xs:ml-6 space-y-4 xs:space-y-6 sm:space-y-8">
                <div>
                  <h2 className="relative flex items-center justify-start gap-2 xs:gap-3 group mt-3 w-full text-foreground font-medium mb-2 xs:mb-3 sm:mb-4 transition-colors duration-200">
                    <span id="_4_1-pre-paid-credits_-refunds" className="absolute -top-24"></span>
                    <span className="text-primary text-sm xs:text-base">4.1</span>
                    {t("termsOfService.sections.payment.prepaidCredits.title")}
                    <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary gap-1 xs:gap-2 border border-border bg-background hover:bg-muted hover:text-foreground h-5 xs:h-6 rounded-md px-1 xs:px-1.5 text-xs shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 touch-target">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-2 xs:size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
                    </button>
                  </h2>
                  <p dangerouslySetInnerHTML={{ __html: t("termsOfService.sections.payment.prepaidCredits.content") }} className="text-muted-foreground leading-relaxed" />
                </div>

                <div>
                  <h2 className="relative flex items-center justify-start gap-2 xs:gap-3 group mt-3 w-full text-foreground font-medium mb-2 xs:mb-3 sm:mb-4 transition-colors duration-200">
                    <span id="_4_2-credit-expiration_-auto-recharge" className="absolute -top-24"></span>
                    <span className="text-primary text-sm xs:text-base">4.2</span>
                    {t("termsOfService.sections.payment.creditExpiration.title")}
                    <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary gap-1 xs:gap-2 border border-border bg-background hover:bg-muted hover:text-foreground h-5 xs:h-6 rounded-md px-1 xs:px-1.5 text-xs shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 touch-target">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-2 xs:size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
                    </button>
                  </h2>
                  <p dangerouslySetInnerHTML={{ __html: t("termsOfService.sections.payment.creditExpiration.content") }} className="text-muted-foreground leading-relaxed" />
                </div>

                <div>
                  <h2 className="relative flex items-center justify-start gap-2 xs:gap-3 group mt-3 w-full text-foreground font-medium mb-2 xs:mb-3 sm:mb-4 transition-colors duration-200">
                    <span id="_4_3-currency_-payment-processing" className="absolute -top-24"></span>
                    <span className="text-primary text-sm xs:text-base">4.3</span>
                    {t("termsOfService.sections.payment.currency.title")}
                    <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary gap-1 xs:gap-2 border border-border bg-background hover:bg-muted hover:text-foreground h-5 xs:h-6 rounded-md px-1 xs:px-1.5 text-xs shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 touch-target">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-2 xs:size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
                    </button>
                  </h2>
                  <p dangerouslySetInnerHTML={{ __html: t("termsOfService.sections.payment.currency.content") }} className="text-muted-foreground leading-relaxed" />
                </div>

                <div>
                  <h2 className="relative flex items-center justify-start gap-2 xs:gap-3 group mt-3 w-full text-foreground font-medium mb-2 xs:mb-3 sm:mb-4 transition-colors duration-200">
                    <span id="_4_4-changes-to-fees" className="absolute -top-24"></span>
                    <span className="text-primary text-sm xs:text-base">4.4</span>
                    {t("termsOfService.sections.payment.feeChanges.title")}
                    <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary gap-1 xs:gap-2 border border-border bg-background hover:bg-muted hover:text-foreground h-5 xs:h-6 rounded-md px-1 xs:px-1.5 text-xs shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 touch-target">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-2 xs:size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
                    </button>
                  </h2>
                  <p dangerouslySetInnerHTML={{ __html: t("termsOfService.sections.payment.feeChanges.content") }} className="text-muted-foreground leading-relaxed" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="relative flex items-center justify-start gap-2 xs:gap-3 group w-full font-semibold text-foreground mb-3 xs:mb-4 sm:mb-5 transition-colors duration-200">
                <span id="_21_-contact-information_" className="absolute -top-24"></span>
                <span className="text-primary font-bold">21.</span>
                <strong>{t("termsOfService.sections.contact.title")}</strong>
                <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary gap-1 xs:gap-2 border border-border bg-background hover:bg-muted hover:text-foreground h-5 xs:h-6 rounded-md px-1 xs:px-1.5 text-xs shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 touch-target">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-2 xs:size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
                </button>
              </h3>
              <p dangerouslySetInnerHTML={{ __html: t("termsOfService.sections.contact.content") }} className="text-muted-foreground leading-relaxed" />
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}