import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { Settings as SettingsIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  WebSearchDialog,
  PdfInputsDialog,
  ResponseHealingDialog,
} from "@/components/dialogs";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function PluginsPage() {
  const { t } = useTranslation();
  usePageTitle(t("settings.plugins"));
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title={t("settings.plugins")}>
        <PluginsSettingsContent />
      </DashboardLayout>
    </div>
  );
}

export function PluginsSettingsContent() {
  const { t } = useTranslation();
  const [isWebSearchDialogOpen, setIsWebSearchDialogOpen] = useState(false);
  const [isPdfInputsDialogOpen, setIsPdfInputsDialogOpen] = useState(false);
  const [isResponseHealingDialogOpen, setIsResponseHealingDialogOpen] =
    useState(false);

  return (
    <div className="space-y-6 pt-6 text-[13px] text-gray-700 dark:text-gray-300">
      {/* Intro */}
      <section className="space-y-1">
        <h2 className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
          {t("plugins.defaultSettings.title")}
        </h2>
        <div className="flex items-center gap-1.5 text-[12px] text-gray-500 dark:text-gray-400">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-[10px] text-gray-400 dark:text-gray-500">
            i
          </span>
          <span>{t("plugins.defaultSettings.description")}</span>
        </div>
      </section>

      {/* Plugins list card */}
      <section>
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-[13px]">
          <PluginRow
            name={t("plugins.webSearch.title")}
            description={t("plugins.webSearch.description")}
            hasToggle={false}
            onSettingsClick={() => setIsWebSearchDialogOpen(true)}
          />
          <PluginRow
            name={t("plugins.pdfInputs.title")}
            description={t("plugins.pdfInputs.description")}
            hasToggle={false}
            onSettingsClick={() => setIsPdfInputsDialogOpen(true)}
          />
          <PluginRow
            name={t("plugins.responseHealing.title")}
            description={t("plugins.responseHealing.description")}
            hasToggle
            onSettingsClick={() => setIsResponseHealingDialogOpen(true)}
          />
        </div>
      </section>

      {/* Web Search configuration dialog */}
      <WebSearchDialog
        open={isWebSearchDialogOpen}
        onOpenChange={setIsWebSearchDialogOpen}
      />

      {/* PDF Inputs configuration dialog */}
      <PdfInputsDialog
        open={isPdfInputsDialogOpen}
        onOpenChange={setIsPdfInputsDialogOpen}
      />

      {/* Response Healing configuration dialog */}
      <ResponseHealingDialog
        open={isResponseHealingDialogOpen}
        onOpenChange={setIsResponseHealingDialogOpen}
      />
    </div>
  );
}

type PluginRowProps = {
  name: string;
  description: string;
  hasToggle?: boolean;
  onSettingsClick?: () => void;
};

function PluginRow({
  name,
  description,
  hasToggle,
  onSettingsClick,
}: PluginRowProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t first:border-t-0 border-gray-200 dark:border-gray-700">
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
          {name}
        </span>
        <span className="mt-0.5 text-[12px] text-gray-500 dark:text-gray-400">
          {description}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {hasToggle && (
          <Switch
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
            className="data-[state=checked]:bg-[#4F46E5]"
          />
        )}
        <button
          type="button"
          onClick={onSettingsClick}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <SettingsIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}