import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAll?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  viewAll = false,
}: SectionHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col sm:flex-row items-start justify-between mb-6 md:mb-8 gap-3">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold dark:text-white flex items-center gap-2">
          {title}
          <span className="text-gray-400 dark:text-gray-500">›</span>
        </h2>

        {subtitle && <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>

      {viewAll && (
        <button className="flex items-center gap-1 text-xs md:text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition whitespace-nowrap">
          {t("common.viewAll")}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
