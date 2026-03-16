import { useTranslation } from "react-i18next";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";

export function ApiKeysContent() {
  const { t } = useTranslation();
  
  return (
    <div className="flex h-full items-center justify-center pt-10">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 dark:bg-black text-gray-400 dark:text-gray-500 text-2xl">
          <span>🔑</span>
        </div>
        <h2 className="text-[15px] font-medium text-gray-900 dark:text-gray-100">
          {t("apiKeysPage.emptyState.title")}
        </h2>
        <p className="max-w-sm text-[12px] text-gray-500 dark:text-gray-400">
          {t("apiKeysPage.emptyState.description")}
        </p>
        <CreateApiKeyDialog />
      </div>
    </div>
  );
}