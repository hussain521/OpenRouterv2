import { useTranslation } from "react-i18next";

interface SupportCardProps {
  type: 'ticket' | 'documentation';
}

export default function SupportCard({ type }: SupportCardProps) {
  const { t } = useTranslation();

  const isTicket = type === 'ticket';
  const iconPath = isTicket 
    ? "M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9 1.7 0 3.29-.48 4.65-1.31L21 21l-1.31-4.35A8.96 8.96 0 0 0 21 12a9 9 0 0 0-9-9z"
    : "M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm9 1.5V7h3.5L15 3.5zM8 11h8v2H8v-2zm0 4h8v2H8v-2z";

  const titleKey = isTicket ? 'support.raiseTicket.title' : 'support.documentation.title';
  const descriptionKey = isTicket ? 'support.raiseTicket.description' : 'support.documentation.description';
  const buttonKey = isTicket ? 'support.raiseTicket.button' : 'support.documentation.button';
  
  const href = isTicket 
    ? "https://openrouter.zendesk.com/hc/en-us/requests/new?ticket_form_id=41705079656219"
    : "https://openrouter.ai/docs/quickstart";

  const buttonClasses = isTicket
    ? "inline-flex h-9 sm:h-10 w-full items-center justify-center rounded-md border border-input bg-background px-3 sm:px-4 text-xs sm:text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
    : "inline-flex h-9 sm:h-10 w-full items-center justify-center rounded-md bg-[#643bf6] px-3 sm:px-4 text-xs sm:text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700";

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 rounded-2xl border bg-card px-6 sm:px-8 pb-5 sm:pb-6 pt-6 sm:pt-8 text-center shadow-sm md:px-10 md:pt-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-muted bg-gray-100 dark:bg-gray-800">
        <svg viewBox="0 0 24 24" className="size-6 sm:size-7 text-accent-foreground/70 text-gray-600 dark:text-gray-400" fill="currentColor" role="img" aria-labelledby={`support-${type}-title`}>
          <title id={`support-${type}-title`}>{t(titleKey)}</title>
          <path d={iconPath}></path>
        </svg>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{t(titleKey)}</h3>
        <p className="text-sm sm:text-base text-muted-foreground text-gray-600 dark:text-gray-400">
          {t(descriptionKey)}
        </p>
      </div>
      <div className="mt-auto w-full max-w-xs">
        <a
          className={buttonClasses}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(buttonKey)}
        </a>
      </div>
    </div>
  );
}