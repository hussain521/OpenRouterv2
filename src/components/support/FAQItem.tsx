import { useTranslation } from "react-i18next";

interface FAQItemProps {
  questionKey: string;
  answerKey: string;
  isMultiParagraph?: boolean;
  customContent?: React.ReactNode;
}

export default function FAQItem({ questionKey, answerKey, isMultiParagraph = false, customContent }: FAQItemProps) {
  const { t } = useTranslation();

  const renderAnswer = () => {
    if (customContent) {
      return <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">{customContent}</div>;
    }

    if (isMultiParagraph) {
      return (
        <div className="mt-2 text-muted-foreground space-y-2 text-gray-600 dark:text-gray-400">
          {t(answerKey).split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      );
    }

    return (
      <div className="mt-2 text-muted-foreground text-gray-600 dark:text-gray-400">
        <p>{t(answerKey)}</p>
      </div>
    );
  };

  return (
    <details className="mb-3 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
      <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
        {t(questionKey)}
      </summary>
      {renderAnswer()}
    </details>
  );
}