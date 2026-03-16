import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks/usePageTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import { useState, useEffect } from "react";

export default function SupportPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle("Support - OpenRouter");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <TopBanner />
      </div>
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <section className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl text-gray-900 dark:text-white">
            {t('support.title')}
          </h1>
          <p className="text-muted-foreground max-w-[70ch] pt-4 text-gray-600 dark:text-gray-400">
            {t('support.subtitle')}
          </p>
          <div aria-hidden="true" className="h-6"></div>
        </section>

        <section className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 mx-auto">
          <div className="flex flex-col items-center gap-3 sm:gap-4 rounded-2xl border bg-card px-6 sm:px-8 pb-5 sm:pb-6 pt-6 sm:pt-8 text-center shadow-sm md:px-10 md:pt-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-muted bg-gray-100 dark:bg-gray-800">
              <svg viewBox="0 0 24 24" className="size-6 sm:size-7 text-accent-foreground/70 text-gray-600 dark:text-gray-400" fill="currentColor" role="img" aria-labelledby="support-ticket-title">
                <title id="support-ticket-title">{t('support.raiseTicket.title')}</title>
                <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9 1.7 0 3.29-.48 4.65-1.31L21 21l-1.31-4.35A8.96 8.96 0 0 0 21 12a9 9 0 0 0-9-9z"></path>
              </svg>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{t('support.raiseTicket.title')}</h3>
              <p className="text-sm sm:text-base text-muted-foreground text-gray-600 dark:text-gray-400">
                {t('support.raiseTicket.description')}
              </p>
            </div>
            <div className="mt-auto w-full max-w-xs">
              <a
                className="inline-flex h-9 sm:h-10 w-full items-center justify-center rounded-md border border-input bg-background px-3 sm:px-4 text-xs sm:text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                href="https://openrouter.zendesk.com/hc/en-us/requests/new?ticket_form_id=41705079656219"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('support.raiseTicket.button')}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:gap-4 rounded-2xl border bg-card px-6 sm:px-8 pb-5 sm:pb-6 pt-6 sm:pt-8 text-center shadow-sm md:px-10 md:pt-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-muted bg-gray-100 dark:bg-gray-800">
              <svg viewBox="0 0 24 24" className="size-6 sm:size-7 text-accent-foreground/70 text-gray-600 dark:text-gray-400" fill="currentColor" role="img" aria-labelledby="support-docs-title">
                <title id="support-docs-title">{t('support.documentation.title')}</title>
                <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm9 1.5V7h3.5L15 3.5zM8 11h8v2H8v-2zm0 4h8v2H8v-2z"></path>
              </svg>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{t('support.documentation.title')}</h3>
              <p className="text-sm sm:text-base text-muted-foreground text-gray-600 dark:text-gray-400">
                {t('support.documentation.description')}
              </p>
            </div>
            <div className="mt-auto w-full max-w-xs">
              <a
                className="inline-flex h-9 sm:h-10 w-full items-center justify-center rounded-md bg-[#643bf6] px-3 sm:px-4 text-xs sm:text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700"
                href="https://openrouter.ai/docs/quickstart"
              >
                {t('support.documentation.button')}
              </a>
            </div>
          </div>
        </section>

        <section className="w-full max-w-3xl mt-8 mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{t('support.faq.title')}</h2>
            <p className="text-muted-foreground text-gray-600 dark:text-gray-400">{t('support.faq.subtitle')}</p>
          </div>
          
          <div className="space-y-8">
            {/* Getting started */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{t('support.faq.gettingStarted.title')}</h3>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.gettingStarted.whyUse.question')}</summary>
                <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
                  {t('support.faq.gettingStarted.whyUse.answer').split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.gettingStarted.howToStart.question')}</summary>
                <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
                  <p>Create an account and add credits on the <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/settings/credits" target="_blank" rel="noopener noreferrer">Credits</a> page. Credits are used for LLM inference.</p>
                  <p>Use the chat room or create API keys and start using the API. See our <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/docs/quickstart">quickstart</a> guide.</p>
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.gettingStarted.howToGetSupport.question')}</summary>
                <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
                  <p>Join our community <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://discord.gg/openrouter" target="_blank" rel="noopener noreferrer">Discord</a> and ask in the #help forum.</p>
                  <p>For billing and account questions, email <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="mailto:support@openrouter.ai">support@openrouter.ai</a>.</p>
                </div>
              </details>
              
              <details className="rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.gettingStarted.howBilled.question')}</summary>
                <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
                  <p>Pricing is per model and may differ for prompt/completion, images, and reasoning tokens. See the model page for details.</p>
                  <p>We compute cost from provider token usage and deduct it from your credits. Review your history in <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/activity" target="_blank" rel="noopener noreferrer">Activity</a>.</p>
                  <p>Include <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">usage: {`{include: true}`}</code> in requests to receive usage data in the response. We pass through provider pricing; we charge a small fee when purchasing credits.</p>
                </div>
              </details>
            </div>

            {/* Pricing and Fees */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{t('support.faq.pricingAndFees.title')}</h3>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.pricingAndFees.whatAreFees.question')}</summary>
                <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
                  {t('support.faq.pricingAndFees.whatAreFees.answer').split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </details>
              
              <details className="rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.pricingAndFees.byokFees.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  <p>{t('support.faq.pricingAndFees.byokFees.answer')}</p>
                </div>
              </details>
            </div>

            {/* Models and Providers */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{t('support.faq.modelsAndProviders.title')}</h3>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.modelsAndProviders.whatModels.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  Access a wide variety of models, including frontier models. See the <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer">models browser</a> or the <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/api/v1/models" target="_blank" rel="noopener noreferrer">models API</a>.
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.modelsAndProviders.howFrequent.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  We add models regularly, often in partnership with labs. If something's missing, reach out on <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://discord.gg/openrouter" target="_blank" rel="noopener noreferrer">Discord</a>.
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.modelsAndProviders.whatVariants.question')}</summary>
                <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
                  <p>Variants are suffixes that modify behavior. Static variants are available on specific models, listed in the models API:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">:free</code> – free model with low rate limits</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">:extended</code> – longer context length</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">:thinking</code> – reasoning by default</li>
                  </ul>
                  <p>Dynamic variants can be used on all models:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">:online</code> – attach web results to the prompt</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">:nitro</code> – optimize for faster throughput</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">:floor</code> – prioritize lowest price</li>
                  </ul>
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.modelsAndProviders.inferenceProvider.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  See <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/docs/guides/guides/for-providers">provider requirements</a>. For contact, email is best.
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.modelsAndProviders.expectedLatency.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  Model pages show latency and throughput by provider. Use <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">:nitro</code> to route to faster providers.
                </div>
              </details>
              
              <details className="rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.modelsAndProviders.modelFallback.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  OpenRouter automatically falls back to the next provider on errors. Configure provider routing in <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/docs/guides/routing/provider-selection">documentation</a>.
                </div>
              </details>
            </div>

            {/* API Technical Specifications */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{t('support.faq.apiTechnical.title')}</h3>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.apiTechnical.authMethods.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t('support.faq.apiTechnical.authMethods.answer')}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.apiTechnical.rateLimits.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  <p>Free model rate limits depend on your purchased credits. See details in the <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/docs/api/reference/limits">rate limits documentation</a>.</p>
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.apiTechnical.apiEndpoints.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  We implement OpenAI-compatible <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">/completions</code> and <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">/chat/completions</code>, plus <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">/api/v1/models</code>. See the <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/docs/api/reference/overview">API docs</a>.
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.apiTechnical.supportedFormats.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t('support.faq.apiTechnical.supportedFormats.answer')}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.apiTechnical.howStreaming.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t('support.faq.apiTechnical.howStreaming.answer')}
                </div>
              </details>
              
              <details className="rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{t('support.faq.apiTechnical.sdkSupport.question')}</summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  OpenRouter is a drop-in replacement for OpenAI; most OpenAI SDKs work. See <a className="underline hover:no-underline text-blue-600 dark:text-blue-400" href="https://openrouter.ai/docs/guides/community/openai-sdk">SDK docs</a>.
                </div>
              </details>
            </div>

            {/* Privacy and Data Logging */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{t("support.faq.privacyAndData.title")}</h3>
              <p className="mb-3 text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
                {t("support.faq.privacyAndData.subtitle")}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://openrouter.ai/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://openrouter.ai/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </p>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.privacyAndData.whatDataLogged.question")}
                </summary>
                <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
                  {t("support.faq.privacyAndData.whatDataLogged.answer").split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.privacyAndData.chatroomData.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.privacyAndData.chatroomData.answer")}
                </div>
              </details>
              
              <details className="rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.privacyAndData.thirdPartySharing.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.privacyAndData.thirdPartySharing.answer")}
                </div>
              </details>
            </div>

            {/* Credit and Billing Systems */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                {t("support.faq.creditAndBilling.title")}
              </h3>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.creditAndBilling.purchaseOptions.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.creditAndBilling.purchaseOptions.answer")}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.creditAndBilling.creditsExpire.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.creditAndBilling.creditsExpire.answer")}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.creditAndBilling.creditsNotShowing.question")}
                </summary>
                <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
                  {t("support.faq.creditAndBilling.creditsNotShowing.answer").split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.creditAndBilling.refundPolicy.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.creditAndBilling.refundPolicy.answer")}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.creditAndBilling.monitorUsage.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.creditAndBilling.monitorUsage.answer")}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.creditAndBilling.freeTier.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.creditAndBilling.freeTier.answer")}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.creditAndBilling.volumeDiscounts.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.creditAndBilling.volumeDiscounts.answer")}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.creditAndBilling.paymentMethods.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.creditAndBilling.paymentMethods.answer")}
                </div>
              </details>
              
              <details className="rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.creditAndBilling.howMakeMoney.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.creditAndBilling.howMakeMoney.answer")}
                </div>
              </details>
            </div>

            {/* Account Management */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                {t("support.faq.accountManagement.title")}
              </h3>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.accountManagement.deleteAccount.question")}
                </summary>
                <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
                  {t("support.faq.accountManagement.deleteAccount.answer").split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.accountManagement.teamAccess.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.accountManagement.teamAccess.answer")}
                </div>
              </details>
              
              <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.accountManagement.analytics.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.accountManagement.analytics.answer")}
                </div>
              </details>
              
              <details className="rounded-lg border p-4 border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {t("support.faq.accountManagement.contactSupport.question")}
                </summary>
                <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.faq.accountManagement.contactSupport.answer")}
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="w-full max-w-3xl mx-auto mt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center gap-3 sm:gap-4 rounded-2xl border bg-card px-6 sm:px-8 pb-5 sm:pb-6 pt-6 sm:pt-8 text-center shadow-sm md:px-10 md:pt-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  {t("support.stillNeedHelp.title")}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.stillNeedHelp.description")}
                </p>
              </div>
              <div className="mt-auto w-full max-w-xs">
                <a
                  className="inline-flex h-9 sm:h-10 w-full items-center justify-center rounded-md border border-input bg-background px-3 sm:px-4 text-xs sm:text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  href="mailto:support@openrouter.ai"
                >
                  {t("support.stillNeedHelp.emailSupport")}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 sm:gap-4 rounded-2xl border bg-card px-6 sm:px-8 pb-5 sm:pb-6 pt-6 sm:pt-8 text-center shadow-sm md:px-10 md:pt-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-muted bg-gray-100 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-6 sm:size-7 text-accent-foreground/70 text-gray-600 dark:text-gray-400">
                  <title>{t("support.discord.title")}</title>
                  <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" fill="currentColor"></path>
                </svg>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  {t("support.discord.title")}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground text-gray-600 dark:text-gray-400">
                  {t("support.discord.description")}
                </p>
              </div>
              <div className="mt-auto w-full max-w-xs">
                <a
                  className="inline-flex h-9 sm:h-10 w-full items-center justify-center rounded-md bg-primary px-3 sm:px-4 text-xs sm:text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700"
                  href="https://discord.gg/openrouter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("support.discord.button")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}