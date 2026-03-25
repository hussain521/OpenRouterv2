import { useTranslation } from "react-i18next";
import { useFAQData } from "@/hooks/useFAQData";
import FAQSection from "./FAQSection";

export default function FAQContainer() {
  const { t } = useTranslation();
  const faqSections = useFAQData();

  return (
    <section className="w-full max-w-3xl mt-8 mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          {t("support.faq.title")}
        </h2>
        <p className="text-muted-foreground text-gray-600 dark:text-gray-400">
          {t("support.faq.subtitle")}
        </p>
      </div>

      <div className="space-y-8">
        {faqSections.map((section, index) => (
          <FAQSection
            key={index}
            titleKey={section.titleKey}
            subtitleKey={section.subtitleKey}
            items={section.items}
          />
        ))}
      </div>
    </section>
  );
}