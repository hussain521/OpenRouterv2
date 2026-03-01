import { useLocation } from "react-router-dom";
import { Info, Search, SquarePen } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { EmptyStateCard } from "@/components/EmptyStateCard";
import { Button } from "@/components/ui/button";
import { RoutingSettingsContent } from "@/pages/RoutingPage";
import { PluginsSettingsContent } from "@/pages/PluginsPage";
import { ObservabilitySettingsContent } from "@/pages/ObservabilityPage";
import { Switch } from "@/components/ui/switch";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";

function getSettingsTitle(pathname: string) {
  if (pathname === "/settings" || pathname.startsWith("/settings/account"))
    return "Account";
  if (pathname.startsWith("/settings/api-keys")) return "API Keys";
  if (pathname.startsWith("/settings/management-keys"))
    return "Management Keys";
  if (pathname.startsWith("/settings/privacy-guardrails"))
    return "Privacy & Guardrails";
  if (pathname.startsWith("/settings/byok")) return "BYOK";
  if (pathname.startsWith("/settings/presets")) return "Presets";
  if (pathname.startsWith("/settings/routing")) return "Routing";
  if (pathname.startsWith("/settings/plugins")) return "Plugins";
  if (pathname.startsWith("/settings/observability")) return "Observability";
  return "Settings";
}

export default function SettingsPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const title = getSettingsTitle(pathname);

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

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title={title}>
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
            title="Create your first preset"
            description={
              <>
                Presets are shortcuts for your system prompts and request
                parameters.{" "}
                <a href="#" className="text-[#6366F1] hover:underline">
                  Learn more.
                </a>
              </>
            }
            action={
              <Button
                size="default"
                className="mt-3 rounded-md bg-[#6366F1] px-6 py-2 text-[13px] font-medium text-white hover:bg-[#4F46E5]"
              >
                Create Preset
              </Button>
            }
            className="py-24"
          />
        ) : isRoutingPage ? (
          <RoutingSettingsContent />
        ) : isPluginsPage ? (
          <PluginsSettingsContent />
        ) : isObservabilityPage ? (
          <ObservabilitySettingsContent />
        ) : (
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              This is a placeholder for the{" "}
              <span className="font-medium">{title}</span> page.
            </p>
            <p>
              The sidebar on the left stays fixed, and this content area can be
              replaced with the exact UI you want for each settings section.
            </p>
          </div>
        )}
      </DashboardLayout>
    </div>
  );
}

function AccountSettingsContent() {
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      {/* Account section */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Account
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
          <Row
            title="Profile"
            description="Name, email address, and basic account details."
            actionLabel="Manage"
          />
          <Row
            title="Password"
            description="Update your password and view security recommendations."
            actionLabel="Change"
          />
          <Row
            title="Two-factor authentication"
            description="Protect your account with an extra layer of security."
            actionLabel="Set up"
            actionVariant="primary"
          />
        </div>
      </section>

      {/* Billing + team section */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Billing & team
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
          <Row
            title="Billing"
            description="Invoices, payment methods, and tax information."
            actionLabel="Open billing"
          />
          <Row
            title="Team"
            description="Invite teammates and manage permissions."
            actionLabel="Manage team"
          />
        </div>
      </section>

      {/* Notifications section */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Notifications
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
          <ToggleRow
            title="Product updates"
            description="Occasional updates about new features and improvements."
            enabled
          />
          <ToggleRow
            title="Billing alerts"
            description="Emails when invoices are created or payments fail."
            enabled
          />
          <ToggleRow
            title="Usage alerts"
            description="Get notified when usage or spend crosses thresholds."
          />
        </div>
      </section>
    </div>
  );
}

type RowProps = {
  title: string;
  description: string;
  actionLabel: string;
  actionVariant?: "default" | "primary";
};

function Row({ title, description, actionLabel, actionVariant }: RowProps) {
  const primary =
    actionVariant === "primary"
      ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600";

  return (
    <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="shrink-0">
        <button
          className={[
            "inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 px-4 py-1.5 text-[11px] font-medium",
            primary,
          ].join(" ")}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

type ToggleRowProps = {
  title: string;
  description: string;
  enabled?: boolean;
};

function ToggleRow({ title, description, enabled = false }: ToggleRowProps) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="shrink-0">
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          className="data-[state=checked]:bg-[#4F46E5]"
        />
      </div>
    </div>
  );
}

function ApiKeysContent() {
  return (
    <div className="flex h-full items-center justify-center pt-10">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 dark:bg-black text-gray-400 dark:text-gray-500 text-2xl">
          <span>🔑</span>
        </div>
        <h2 className="text-[15px] font-medium text-gray-900 dark:text-gray-100">
          No API keys yet
        </h2>
        <p className="max-w-sm text-[12px] text-gray-500 dark:text-gray-400">
          Create API keys to authenticate requests from your apps to OpenRouter.
        </p>
        <CreateApiKeyDialog />
      </div>
    </div>
  );
}

function ManagementKeysContent() {
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      <section>
        <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6 py-4 text-[13px] text-gray-700 dark:text-gray-300 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
              Management keys
            </h2>
            <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
              Create management keys to manage settings, permissions, and other
              controls for this organization. These keys are meant for admins
              only.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]">
            Create
          </button>
        </div>
      </section>
    </div>
  );
}

function PrivacyGuardrailsContent() {
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      {/* Intro */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Privacy & Guardrails
        </h2>
        <p className="max-w-2xl text-[12px] text-gray-500 dark:text-gray-400">
          Configure how OpenRouter handles your data and applies safety filters
          for requests made from this organization.
        </p>
      </section>

      {/* Data handling */}
      <section className="space-y-4">
        <h3 className="text-[12px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Data handling
        </h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
          <ToggleRow
            title="Log requests for debugging"
            description="Store logs of requests and responses so you can inspect and debug issues later."
            enabled
          />
          <ToggleRow
            title="Send data to model providers"
            description="Allow model providers to retain data for improving their models, where applicable."
          />
          <Row
            title="Retention window"
            description="How long OpenRouter will retain logs and traces before automatic deletion."
            actionLabel="30 days"
          />
        </div>
      </section>

      {/* Safety filters */}
      <section className="space-y-4">
        <h3 className="text-[12px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Safety filters
        </h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
          <ToggleRow
            title="Block unsafe content"
            description="Filter prompts and responses that violate default safety policies."
            enabled
          />
          <ToggleRow
            title="PII redaction"
            description="Automatically redact common types of personally identifiable information in logs."
          />
          <ToggleRow
            title="Strict content guardrails"
            description="Apply stricter moderation rules for high‑risk use cases."
          />
        </div>
      </section>

      {/* Footer actions */}
      <section className="flex flex-col items-stretch justify-between gap-3 border-t border-gray-200 dark:border-gray-700 pt-4 text-[12px] text-gray-600 dark:text-gray-300 md:flex-row md:items-center">
        <button className="text-[12px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          Reset to defaults
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            Changes apply to new requests only.
          </span>
          <button className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-1.5 text-[12px] font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancel
          </button>
          <button className="rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]">
            Save changes
          </button>
        </div>
      </section>
    </div>
  );
}

function BYOKSettingsContent() {
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      {/* Top: intro + search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
          <p className="text-[13px]">
            Use your own provider API keys on OpenRouter
          </p>
          <Info className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search providers..."
            className="h-9 w-full rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 pl-9 pr-4 text-[13px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Provider list */}
      <section className="space-y-3">
        <h2 className="text-[13px] font-medium text-gray-500 dark:text-gray-400">
          Available
        </h2>

        <div className="mt-1 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-[13px]">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <BYOKProviderRow
              name="AI21"
              status="Not configured"
              iconColor="bg-[#ff007a]"
              textColor="text-white"
              iconText="a"
            />
            <BYOKProviderRow
              name="AionLabs"
              status="Not configured"
              iconColor="bg-[#e5e7eb]"
              textColor="text-gray-700"
              iconText="Ai"
            />
            <BYOKProviderRow
              name="Alibaba Cloud Int."
              status="Not configured"
              iconColor="bg-[#ff7a00]"
              textColor="text-white"
              iconText="↷"
            />
            <BYOKProviderRow
              name="Amazon Bedrock"
              status="Not configured"
              iconColor="bg-[#232f3e]"
              textColor="text-white"
              iconText="aws"
            />
            <BYOKProviderRow
              name="Anthropic"
              status="Not configured"
              iconColor="bg-[#f5f5e6]"
              textColor="text-gray-900"
              iconText="A"
            />
            <BYOKProviderRow
              name="Arcee AI"
              status="Not configured"
              iconColor="bg-[#00bfa5]"
              textColor="text-white"
              iconText="A"
            />
            <BYOKProviderRow
              name="AtlasCloud"
              status="Not configured"
              iconColor="bg-[#4f46e5]"
              textColor="text-white"
              iconText="A"
            />
            <BYOKProviderRow
              name="Azure"
              status="Not configured"
              iconColor="bg-[#0078d4]"
              textColor="text-white"
              iconText="A"
            />
            <BYOKProviderRow
              name="Baseten"
              status="Not configured"
              iconColor="bg-[#00c853]"
              textColor="text-white"
              iconText="⚡"
            />
            <BYOKProviderRow
              name="Cerebras"
              status="Not configured"
              iconColor="bg-[#ff3d00]"
              textColor="text-white"
              iconText="C"
            />
          </div>

          <button
            type="button"
            className="flex h-10 w-full items-center justify-center border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            Show 44 more
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
