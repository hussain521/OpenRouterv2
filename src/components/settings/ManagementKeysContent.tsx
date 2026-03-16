import { useTranslation } from "react-i18next";

export function ManagementKeysContent() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      <section>
        <p className="max-w-2xl text-[12px] text-gray-500 dark:text-gray-400">
          {t("managementKeys.contentDescription")}
        </p>
      </section>
    </div>
  );
}