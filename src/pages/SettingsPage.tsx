import { useLocation, NavLink, type NavLinkRenderProps, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Info, Search, SquarePen, Activity, FileText, CreditCard, Settings, ChevronDown, CircleDot } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { EmptyStateCard } from "@/components/EmptyStateCard";
import { Button } from "@/components/ui/button";
import { RoutingSettingsContent } from "@/pages/RoutingPage";
import { PluginsSettingsContent } from "@/pages/PluginsPage";
import { ObservabilitySettingsContent } from "@/pages/ObservabilityPage";
import NewDestinationPage from "@/components/observability/NewDestinationPage";
import { AccountSettingsContent } from "@/pages/AccountSettingsPage";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { ToggleRow } from "@/components/settings/ToggleRow";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";
import { CreateManagementKeyDialog } from "@/components/dialogs";
import { usePageTitle } from "@/hooks/usePageTitle";

function getSettingsTitle(pathname: string, t: (key: string) => string) {
  if (pathname === "/settings" || pathname.startsWith("/settings/account"))
    return t("settings.account");
  if (pathname.startsWith("/settings/api-keys")) return t("settings.apiKeys");
  if (pathname.startsWith("/settings/management-keys"))
    return t("settings.managementKeys");
  if (pathname.startsWith("/settings/privacy-guardrails"))
    return t("settings.privacyGuardrails");
  if (pathname.startsWith("/settings/byok")) return t("settings.byok");
  if (pathname.startsWith("/settings/presets")) return t("settings.presets");
  if (pathname.startsWith("/settings/routing")) return t("settings.routing");
  if (pathname.startsWith("/settings/plugins")) return t("settings.plugins");
  if (pathname.startsWith("/settings/observability")) return t("settings.observability");
  return t("nav.settings");
}

type DestinationConfig = {
  name: string;
  iconBg: string;
  iconEmoji: string;
};

export default function SettingsPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const title = getSettingsTitle(pathname, t);
  const [observabilityDestination, setObservabilityDestination] = useState<DestinationConfig | null>(null);
  const [managementDialogOpen, setManagementDialogOpen] = useState(false);
  
  // Use the page title hook
  usePageTitle(title);

  const isAccountPage =
    pathname === "/settings" || pathname.startsWith("/settings/account");
  const isApiKeysPage = pathname.startsWith("/settings/api-keys");
  const isManagementKeysPage = pathname.startsWith("/settings/management-keys");
  const isByokPage = pathname.startsWith("/settings/byok");
  const isPrivacyPage = pathname.startsWith("/settings/privacy-guardrails");
  const isPresetsPage = pathname.startsWith("/settings/presets");
  const isRoutingPage = pathname.startsWith("/settings/routing");
  const isPluginsPage = pathname.startsWith("/settings/plugins");
  const isObservabilityPage = pathname.startsWith("/settings/observability");

  // If we have an observability destination selected, render without DashboardLayout
  if (isObservabilityPage && observabilityDestination) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="sticky top-0 z-50 transition-all duration-300">
          <Navbar />
        </div>
        <div className="flex h-[calc(100vh-72px)] bg-white dark:bg-black overflow-hidden">
          {/* Sidebar */}
          <aside className="w-60 border-r dark:border-gray-700 bg-gray-50/80 dark:bg-black h-full">
            <div className="h-full px-3 py-4">
              <nav className="space-y-4 text-sm">
                <SimpleSidebarSections />
              </nav>
            </div>
          </aside>
          
          {/* Main content - NewDestinationPage */}
          <main className="flex-1 overflow-y-auto bg-white dark:bg-black px-10 py-8 scrollbar-hide">
            <div className="mx-auto max-w-6xl">
              <NewDestinationPage
                destination={{
                  name: observabilityDestination.name,
                  iconEmoji: observabilityDestination.iconEmoji,
                }}
                onBack={() => setObservabilityDestination(null)}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout
        title={title}
        headerActions={
          isManagementKeysPage ? (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]"
              onClick={() => setManagementDialogOpen(true)}
            >
              {t("common.create")}
            </button>
          ) : null
        }
      >
        {isAccountPage ? (
          <AccountSettingsContent />
        ) : isApiKeysPage ? (
          <ApiKeysContent />
        ) : isManagementKeysPage ? (
          <ManagementKeysContent />
        ) : isByokPage ? (
          <BYOKSettingsContent />
        ) : isPrivacyPage ? (
          <PrivacyGuardrailsContent />
        ) : isPresetsPage ? (
          <EmptyStateCard
            title={t("presets.emptyState.title")}
            description={
              <>
                {t("presets.emptyState.description")}{" "}
                <a href="#" className="text-[#6366F1] hover:underline">
                  {t("presets.emptyState.learnMore")}
                </a>
              </>
            }
            action={
              <Button
                size="default"
                className="mt-3 rounded-md bg-[#6366F1] px-6 py-2 text-[13px] font-medium text-white hover:bg-[#4F46E5]"
                onClick={() => navigate("/presets")}
              >
                {t("presets.createPreset")}
              </Button>
            }
            className="py-24"
          />
        ) : isRoutingPage ? (
          <RoutingSettingsContent />
        ) : isPluginsPage ? (
          <PluginsSettingsContent />
        ) : isObservabilityPage ? (
          <ObservabilitySettingsContent onSelectDestination={setObservabilityDestination} />
        ) : (
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              {t("settings.placeholder", { section: title })}
            </p>
          </div>
        )}

        {isManagementKeysPage && (
          <CreateManagementKeyDialog
            open={managementDialogOpen}
            onOpenChange={setManagementDialogOpen}
          />
        )}
      </DashboardLayout>
    </div>
  );
}

function ApiKeysContent() {
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

function ManagementKeysContent() {
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

function PrivacyGuardrailsContent() {
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

function BYOKSettingsContent() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      {/* Top: intro + search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
          <p className="text-[13px]">
            {t("byok.subtitle")}
          </p>
          <Info className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder={t("byok.searchPlaceholder")}
            className="h-9 w-full rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 pl-9 pr-4 text-[13px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Provider list */}
      <section className="space-y-3">
        <h2 className="text-[13px] font-medium text-gray-500 dark:text-gray-400">
          {t("byok.available")}
        </h2>

        <div className="mt-1 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-[13px]">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <BYOKProviderRow
              name="AI21"
              status={t("byok.notConfigured")}
              iconColor="bg-[#ff007a]"
              textColor="text-white"
              iconText="a"
            />
            <BYOKProviderRow
              name="AionLabs"
              status={t("byok.notConfigured")}
              iconColor="bg-[#e5e7eb]"
              textColor="text-gray-700"
              iconText="Ai"
            />
            <BYOKProviderRow
              name="Alibaba Cloud Int."
              status={t("byok.notConfigured")}
              iconColor="bg-[#ff7a00]"
              textColor="text-white"
              iconText="↷"
            />
            <BYOKProviderRow
              name="Amazon Bedrock"
              status={t("byok.notConfigured")}
              iconColor="bg-[#232f3e]"
              textColor="text-white"
              iconText="aws"
            />
            <BYOKProviderRow
              name="Anthropic"
              status={t("byok.notConfigured")}
              iconColor="bg-[#f5f5e6]"
              textColor="text-gray-900"
              iconText="A"
            />
            <BYOKProviderRow
              name="Arcee AI"
              status={t("byok.notConfigured")}
              iconColor="bg-[#00bfa5]"
              textColor="text-white"
              iconText="A"
            />
            <BYOKProviderRow
              name="AtlasCloud"
              status={t("byok.notConfigured")}
              iconColor="bg-[#4f46e5]"
              textColor="text-white"
              iconText="A"
            />
            <BYOKProviderRow
              name="Azure"
              status={t("byok.notConfigured")}
              iconColor="bg-[#0078d4]"
              textColor="text-white"
              iconText="A"
            />
            <BYOKProviderRow
              name="Baseten"
              status={t("byok.notConfigured")}
              iconColor="bg-[#00c853]"
              textColor="text-white"
              iconText="⚡"
            />
            <BYOKProviderRow
              name="Cerebras"
              status={t("byok.notConfigured")}
              iconColor="bg-[#ff3d00]"
              textColor="text-white"
              iconText="C"
            />
          </div>

          <button
            type="button"
            className="flex h-10 w-full items-center justify-center border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {t("byok.showMore", { count: 44 })}
          </button>
        </div>
      </section>

      {/* Info footer */}
      <section className="space-y-4 pt-2 text-[13px] text-gray-600 dark:text-gray-300">
        <h3 className="text-[16px] font-medium text-gray-900 dark:text-gray-100">
          Key Priority and Fallback
        </h3>
        <div className="max-w-4xl space-y-3 leading-relaxed">
          <p>
            OpenRouter always prioritizes using your provider keys when
            available.
          </p>
          <p>
            By default, if your key encounters a rate limit or failure,
            OpenRouter will fall back to using shared OpenRouter credits.
          </p>
          <p>
            You can configure individual keys with &quot;Always use this
            key&quot; to prevent any fallback to OpenRouter credits. When this
            option is enabled, OpenRouter will only use your key for requests to
            that provider. This may result in rate limit errors if your key is
            exhausted, but ensures all requests go through your account.
          </p>
          <p>
            If you wish to never use shared OpenRouter credits for a model, you
            must{" "}
            <strong className="font-medium text-gray-800 dark:text-gray-200">
              both specify &quot;Always use this key&quot; and pin the provider
            </strong>{" "}
            by specifying it as{" "}
            <a href="#" className="text-[#6366F1] hover:underline">
              your only provider
            </a>{" "}
            when making the request.
          </p>
        </div>
      </section>
    </div>
  );
}

type BYOKProviderRowProps = {
  name: string;
  status: string;
  iconColor?: string;
  textColor?: string;
  iconText?: string;
};

function BYOKProviderRow({
  name,
  status,
  iconColor = "bg-gray-100",
  textColor = "text-gray-800",
  iconText,
}: BYOKProviderRowProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between px-5 py-3 text-left text-[13px] hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-semibold ${iconColor} ${textColor}`}
        >
          {iconText || name.charAt(0)}
        </div>
        <span className="text-[13px] text-gray-800 dark:text-gray-200">
          {name}
        </span>
      </div>
      <div className="flex items-center gap-3 text-[12px]">
        <span className="text-gray-400 dark:text-gray-500">{status}</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
          <SquarePen className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}

// Simple sidebar component for when NewDestinationPage is shown
function SimpleSidebarSections() {
  const { t } = useTranslation();
  const location = useLocation();
  const isInSettingsSection = location.pathname.startsWith("/settings");
  const [isSettingsOpen, setIsSettingsOpen] = useState(() => {
    return location.pathname.startsWith("/settings");
  });

  return (
    <>
      <div className="space-y-1">
        <SidebarLink
          to="/activity"
          label={t("nav.activity")}
          icon={<Activity className="h-4 w-4" />}
        />
        <SidebarLink
          to="/logs"
          label={t("nav.logs")}
          icon={<FileText className="h-4 w-4" />}
        />
        <SidebarLink
          to="/credits"
          label={t("nav.credits")}
          icon={<CreditCard className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-1">
        <button
          type="button"
          onClick={() => setIsSettingsOpen((prev) => !prev)}
          className={[
            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isInSettingsSection
              ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold border-l-4 border-l-[#6366F1] pl-2"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 border-l-4 border-l-transparent pl-2",
          ].join(" ")}
        >
          <span className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center text-gray-400 dark:text-gray-500">
              <Settings className="h-4 w-4" />
            </span>
            <span>{t("nav.settings")}</span>
          </span>
          <span
            className={[
              "flex h-4 w-4 items-center justify-center text-gray-400 dark:text-gray-500 transition-transform",
              isSettingsOpen ? "rotate-0" : "-rotate-90",
            ].join(" ")}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>

        {isSettingsOpen && (
          <div className="space-y-0.5">
            <SidebarSubLink to="/settings/account" label={t("settings.account")} />
            <SidebarSubLink to="/settings/api-keys" label={t("settings.apiKeys")} />
            <SidebarSubLink
              to="/settings/management-keys"
              label={t("settings.managementKeys")}
            />
            <SidebarSubLink
              to="/settings/privacy-guardrails"
              label={t("settings.privacyGuardrails")}
            />
            <SidebarSubLink to="/settings/byok" label={t("settings.byok")} />
            <SidebarSubLink to="/settings/presets" label={t("settings.presets")} />
            <SidebarSubLink to="/settings/routing" label={t("settings.routing")} />
            <SidebarSubLink to="/settings/plugins" label={t("settings.plugins")} />
            <SidebarSubLink
              to="/settings/observability"
              label={t("settings.observability")}
            />
          </div>
        )}
      </div>
    </>
  );
}

function SidebarLink({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }: NavLinkRenderProps) =>
        [
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-medium border-l-2 border-l-[#6366F1] pl-6"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 border-l-2 border-l-transparent pl-6",
        ].join(" ")
      }
    >
      <span className="flex h-4 w-4 items-center justify-center text-gray-400 dark:text-gray-500">
        {icon}
      </span>
      <span>{label}</span>
    </NavLink>
  );
}

function SidebarSubLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }: NavLinkRenderProps) =>
        [
          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors pl-7",
          isActive
            ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold border-l-4 border-l-[#6366F1] pl-2"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 border-l-4 border-l-transparent pl-2",
        ].join(" ")
      }
    >
      <span className="flex h-3 w-3 items-center justify-center text-gray-300 dark:text-gray-600">
        <CircleDot className="h-3 w-3" />
      </span>
      <span>{label}</span>
    </NavLink>
  );
}
