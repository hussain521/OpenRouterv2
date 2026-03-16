import { useTranslation } from "react-i18next";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { ToggleRow } from "@/components/settings/ToggleRow";

export function PrivacyGuardrailsContent() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      {/* Intro */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {t("settings.privacyGuardrails")}
        </h2>
        <p className="max-w-2xl text-[12px] text-gray-500 dark:text-gray-400">
          {t("privacyGuardrails.description")}
        </p>
      </section>

      {/* Data handling */}
      <section className="space-y-4">
        <h3 className="text-[12px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {t("privacyGuardrails.dataHandling.title")}
        </h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
          <ToggleRow
            title={t("privacyGuardrails.dataHandling.logRequests.title")}
            description={t("privacyGuardrails.dataHandling.logRequests.description")}
            defaultEnabled
          />
          <ToggleRow
            title={t("privacyGuardrails.dataHandling.sendData.title")}
            description={t("privacyGuardrails.dataHandling.sendData.description")}
          />
          <SettingsRow
            title={t("privacyGuardrails.dataHandling.retention.title")}
            description={t("privacyGuardrails.dataHandling.retention.description")}
            actionLabel={t("privacyGuardrails.dataHandling.retention.days", { days: 30 })}
          />
        </div>
      </section>

      {/* Safety filters */}
      <section className="space-y-4">
        <h3 className="text-[12px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {t("privacyGuardrails.safetyFilters.title")}
        </h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
          <ToggleRow
            title={t("privacyGuardrails.safetyFilters.blockUnsafe.title")}
            description={t("privacyGuardrails.safetyFilters.blockUnsafe.description")}
            defaultEnabled
          />
          <ToggleRow
            title={t("privacyGuardrails.safetyFilters.piiRedaction.title")}
            description={t("privacyGuardrails.safetyFilters.piiRedaction.description")}
          />
          <ToggleRow
            title={t("privacyGuardrails.safetyFilters.strictGuardrails.title")}
            description={t("privacyGuardrails.safetyFilters.strictGuardrails.description")}
          />
        </div>
      </section>

      {/* Footer actions */}
      <section className="flex flex-col items-stretch justify-between gap-3 border-t border-gray-200 dark:border-gray-700 pt-4 text-[12px] text-gray-600 dark:text-gray-300 md:flex-row md:items-center">
        <button className="text-[12px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          {t("privacyGuardrails.resetToDefaults")}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            {t("privacyGuardrails.changesApplyNote")}
          </span>
          <button className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-1.5 text-[12px] font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            {t("common.cancel")}
          </button>
          <button className="rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]">
            {t("privacyGuardrails.saveChanges")}
          </button>
        </div>
      </section>
    </div>
  );
}