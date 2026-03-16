import { useLocation, NavLink, type NavLinkRenderProps, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Activity, FileText, CreditCard, Settings, ChevronDown, CircleDot } from "lucide-react";
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
import { CreateManagementKeyDialog } from "@/components/dialogs";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ApiKeysContent } from "@/components/settings/ApiKeysContent";
import { ManagementKeysContent } from "@/components/settings/ManagementKeysContent";
import { PrivacyGuardrailsContent } from "@/components/settings/PrivacyGuardrailsContent";
import { BYOKSettingsContent } from "@/components/settings/BYOKSettingsContent";

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
          <ObservabilitySettingsContent onSelectDestination={(destination) => setObservabilityDestination(destination)} />
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
