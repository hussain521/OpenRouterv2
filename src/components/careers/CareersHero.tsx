import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function CareersHero() {
  const { t } = useTranslation();

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-gray-900 dark:text-foreground">
        {t("careers.hero.title")}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        {t("careers.hero.subtitle")}
      </p>
      <Button
        className="inline-flex items-center gap-2 bg-[#6467f2] text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-[#6467f2]/90 transition-colors"
        size="lg"
      >
        {t("careers.hero.seeOpenPositions")}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </section>
  );
}