import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

const presetSections = [
  { titleKey: "chatPage.flagshipModels" },
  { titleKey: "chatPage.bestRoleplayModels" },
  { titleKey: "chatPage.bestCodingModels" },
  { titleKey: "chatPage.reasoningModels" },
];

export function PresetModelSections() {
  const { t } = useTranslation();

  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-2.5 md:grid-cols-2">
      {presetSections.map((section) => (
        <Card
          key={section.titleKey}
          className="h-24 rounded-2xl border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-black"
        >
          <CardContent className="flex h-full flex-col justify-between px-4 py-3.5">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {t(section.titleKey)}
            </div>
            <div className="flex justify-end gap-1.5">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[10px] font-semibold text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                A
              </span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-[10px] font-semibold text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
                M
              </span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                ●
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}