import { useTranslation } from "react-i18next";
import FAQItem from "./FAQItem";

interface FAQSectionProps {
  titleKey: string;
  subtitleKey?: string;
  items: Array<{
    questionKey: string;
    answerKey?: string;
    isMultiParagraph?: boolean;
    customContent?: React.ReactNode;
  }>;
}

export default function FAQSection({ titleKey, subtitleKey, items }: FAQSectionProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{t(titleKey)}</h3>
      {subtitleKey && (
        <p className="mb-3 text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
          {t(subtitleKey)}{" "}
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
      )}
      
      {items.map((item, index) => (
        <div key={index} className={index === items.length - 1 ? "" : "mb-3"}>
          <FAQItem
            questionKey={item.questionKey}
            answerKey={item.answerKey || ''}
            isMultiParagraph={item.isMultiParagraph}
            customContent={item.customContent}
          />
        </div>
      ))}
    </div>
  );
}