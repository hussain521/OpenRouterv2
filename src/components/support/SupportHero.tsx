import { useTranslation } from "react-i18next";

export default function SupportHero() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold leading-tight md:text-5xl text-gray-900 dark:text-white">
        {t("support.title")}
      </h1>
      <p className="text-muted-foreground max-w-[70ch] pt-4 text-gray-600 dark:text-gray-400">
        {t("support.subtitle")}
      </p>
      <div aria-hidden="true" className="h-6"></div>
    </section>
  );
}