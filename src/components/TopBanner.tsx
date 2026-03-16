import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function TopBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="hidden sm:block"></div>
        <p className="text-center flex-1 sm:flex-none">
          {t("banner.observabilityMessage")}
        </p>

        <button
          onClick={() => setIsVisible(false)}
          className="hover:text-green-900 dark:hover:text-green-100 p-1 flex-shrink-0"
          aria-label="Close banner"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
