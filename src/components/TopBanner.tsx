import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function TopBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm">
      <div className="  px-6 py-2 flex items-center justify-between">
        <div className=""></div>
        <p>
          {t("banner.observabilityMessage")}
        </p>

        <button
          onClick={() => setIsVisible(false)}
          className="hover:text-green-900 dark:hover:text-green-100"
        >
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}
