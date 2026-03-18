import { useTranslation } from "react-i18next";

export default function SupportActions() {
  const { t } = useTranslation();

  return (
    <section className="w-full max-w-3xl mx-auto mt-12 sm:mt-16">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {/* Email Support Card */}
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

        {/* Discord Card */}
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
  );
}