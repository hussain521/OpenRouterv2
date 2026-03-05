import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { ToggleRow } from "@/components/settings/ToggleRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CreateOrganizationDialog } from "@/components/dialogs";
import { usePageTitle } from "@/hooks/usePageTitle";

export function AccountSettingsContent() {
  const { t } = useTranslation();
  const [isOrgDialogOpen, setIsOrgDialogOpen] = useState(false);

  return (
    <div className="space-y-8 text-[14px] text-gray-500 dark:text-gray-300">
      <section className="space-y-4">
         
        <div className="divide-y divide-gray-200 dark:divide-gray-700 ">
          <SettingsRow
            title={t("accountSettings.user.title")}
            description={t("accountSettings.user.description")}
            actionLabel={t("accountSettings.user.action")}
          />
          <SettingsRow
            title={t("accountSettings.organization.title")}
            description={t("accountSettings.organization.description")}
            actionLabel={t("accountSettings.organization.action")}
            onAction={() => setIsOrgDialogOpen(true)}
          />
          <SettingsRow
            title={t("accountSettings.accountType.title")}
            description={
              <>
                {t("accountSettings.accountType.description")}{" "}
                <a href="#" className="text-[#6366F1] hover:underline">
                  {t("accountSettings.accountType.learnMore")}
                </a>
                .
              </>
            }
            action={
              <button className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white px-4 py-1.5 text-[11px] font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
                <span>{t("accountSettings.accountType.selfServe")}</span>
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500">
                  ☺
                </span>
              </button>
            }
          />
          <SettingsRow
            title={t("accountSettings.chatroomColor.title")}
            description={t("accountSettings.chatroomColor.description")}
            action={
              <Select defaultValue="default">
                <SelectTrigger
                  size="sm"
                  className="min-w-[120px] justify-between rounded-full px-3"
                >
                  <SelectValue>
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                      <span>{t("accountSettings.chatroomColor.default")}</span>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                      <span>{t("accountSettings.chatroomColor.default")}</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="purple">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
                      <span>{t("accountSettings.chatroomColor.purple")}</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="green">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
                      <span>{t("accountSettings.chatroomColor.green")}</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            }
          />
          <SettingsRow
            title={t("accountSettings.defaultPreset.title")}
            description={t("accountSettings.defaultPreset.description")}
            action={
              <Select defaultValue="none">
                <SelectTrigger
                  size="sm"
                  className="min-w-[140px] justify-between rounded-full px-3"
                >
                  <SelectValue placeholder={t("accountSettings.defaultPreset.none")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("accountSettings.defaultPreset.none")}</SelectItem>
                  <SelectItem value="creative">{t("accountSettings.defaultPreset.creative")}</SelectItem>
                  <SelectItem value="balanced">{t("accountSettings.defaultPreset.balanced")}</SelectItem>
                  <SelectItem value="focused">{t("accountSettings.defaultPreset.focused")}</SelectItem>
                </SelectContent>
              </Select>
            }
          />
          <ToggleRow
            title={t("accountSettings.analyticsToggle.title")}
            description={t("accountSettings.analyticsToggle.description")}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {t("accountSettings.notifications.title")}
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <ToggleRow
            title={t("accountSettings.lowBalanceAlerts.title")}
            description={t("accountSettings.lowBalanceAlerts.description")}
            defaultEnabled
          />
          <SettingsRow
            title={t("accountSettings.creditThreshold.title")}
            description={t("accountSettings.creditThreshold.description")}
            action={
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                  $
                </span>
                <Input
                  type="number"
                  defaultValue={0}
                  className="h-8 w-20 rounded-md border-gray-200 bg-white px-2 text-[12px] text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
            }
          />
          <ToggleRow
            title={t("accountSettings.chatCompletionNotifications.title")}
            description={t("accountSettings.chatCompletionNotifications.description")}
          />
          <SettingsRow
            title={t("accountSettings.ignoredProviders.title")}
            description={t("accountSettings.ignoredProviders.description")}
            actionLabel={t("accountSettings.ignoredProviders.action")}
          />
          <SettingsRow
            title={t("accountSettings.defaultProviderSort.title")}
            description={t("accountSettings.defaultProviderSort.description")}
            actionLabel={t("accountSettings.defaultProviderSort.action")}
          />
        </div>
      </section>

      <CreateOrganizationDialog open={isOrgDialogOpen} onOpenChange={setIsOrgDialogOpen} />
    </div>
  );
}

export default function AccountSettingsPage() {
  const { t } = useTranslation();
  usePageTitle(t("settings.account"));
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title={t("settings.account")}>
        <AccountSettingsContent />
      </DashboardLayout>
    </div>
  );
}