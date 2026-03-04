import { useState } from "react";
import { NavLink, type NavLinkRenderProps, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { FeedbackDialog } from "@/components/dialogs";
import {
  Activity,
  FileText,
  CreditCard,
  Settings,
  ChevronDown,
  CircleDot,
} from "lucide-react";
import NewDestinationPage from "@/components/observability/NewDestinationPage";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ObservabilityPage() {
  const [activeDestination, setActiveDestination] = useState<DestinationConfig | null>(null);
  usePageTitle("Observability");

  // When a destination is selected, render the NewDestinationPage without DashboardLayout
  if (activeDestination) {
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
                  name: activeDestination.name,
                  iconEmoji: activeDestination.iconEmoji,
                }}
                onBack={() => setActiveDestination(null)}
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
      <DashboardLayout title="Observability">
        <ObservabilitySettingsContent onSelectDestination={setActiveDestination} />
      </DashboardLayout>
    </div>
  );
}

export function ObservabilitySettingsContent({ onSelectDestination }: { onSelectDestination?: (destination: DestinationConfig | null) => void }) {
  const [isBroadcastEnabled, setIsBroadcastEnabled] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [localActiveDestination, setLocalActiveDestination] = useState<DestinationConfig | null>(null);

  // If we have a local destination selected and no onSelectDestination prop, render NewDestinationPage
  if (!onSelectDestination && localActiveDestination) {
    return (
      <NewDestinationPage
        destination={{
          name: localActiveDestination.name,
          iconEmoji: localActiveDestination.iconEmoji,
        }}
        onBack={() => setLocalActiveDestination(null)}
      />
    );
  }

  // Default observability overview view
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      {/* Broadcast header */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">Broadcast</h2>
          <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500">
            <span>{isBroadcastEnabled ? "Enabled" : "Disabled"}</span>
            <Switch
              checked={isBroadcastEnabled}
              onCheckedChange={setIsBroadcastEnabled}
              className="h-4 w-7 data-[state=checked]:bg-[#6366F1]"
            />
          </div>
        </div>
        <p className="max-w-2xl text-[12px] text-gray-500 dark:text-gray-400">
          Automatically send traces from your requests to external observability
          platforms without additional instrumentation.&nbsp;
          <button
            type="button"
            className="text-[12px] font-medium text-[#6366F1] hover:underline"
          >
            Learn more
          </button>
        </p>
      </section>

      {/* Available destinations list */}
      <section className="space-y-3 transition-opacity duration-300 opacity-100">
        <h3 className="text-[12px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Available
        </h3>

        <div
          className={`overflow-hidden rounded-2xl border bg-white dark:bg-black transition-all duration-300 ${
            isBroadcastEnabled
              ? "border-gray-200 dark:border-gray-700"
              : "border-gray-100 dark:border-gray-800"
          }`}
        >
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {DESTINATIONS.map((d) => (
              <DestinationRow
                key={d.name}
                name={d.name}
                iconBg={d.iconBg}
                iconEmoji={d.iconEmoji}
                disabled={false}
                onAdd={() => {
                  if (onSelectDestination) {
                    onSelectDestination(d);
                  } else {
                    setLocalActiveDestination(d);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer feedback */}
      <section className="flex items-center justify-between pt-4 text-[12px] text-gray-500 dark:text-gray-400">
        <div className="space-y-0.5">
          <p className="font-medium text-gray-700 dark:text-gray-300">Send Feedback</p>
          <p>Let us know how we can improve!</p>
        </div>
        <button
          type="button"
          onClick={() => setIsFeedbackOpen(true)}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-1.5 text-[11px] font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Open
        </button>
      </section>

      {/* Feedback dialog */}
      <FeedbackDialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen} />
    </div>
  );
}

type DestinationConfig = {
  name: string;
  iconBg: string;
  iconEmoji: string;
};

const DESTINATIONS: DestinationConfig[] = [
  { name: "Arize AI", iconBg: "bg-pink-100", iconEmoji: "🟣" },
  { name: "Braintrust", iconBg: "bg-sky-100", iconEmoji: "🧠" },
  { name: "ClickHouse", iconBg: "bg-yellow-100", iconEmoji: "📊" },
  { name: "Comet Opik", iconBg: "bg-indigo-100", iconEmoji: "☄️" },
  { name: "Datadog", iconBg: "bg-purple-100", iconEmoji: "🐶" },
  { name: "Grafana Cloud", iconBg: "bg-orange-100", iconEmoji: "📈" },
  { name: "Langfuse", iconBg: "bg-emerald-100", iconEmoji: "🧬" },
  { name: "LangSmith", iconBg: "bg-slate-100", iconEmoji: "🧩" },
  { name: "New Relic AI", iconBg: "bg-teal-100", iconEmoji: "🧿" },
  { name: "OpenTelemetry Collector", iconBg: "bg-amber-100", iconEmoji: "📡" },
  { name: "PostHog", iconBg: "bg-rose-100", iconEmoji: "🐷" },
  { name: "S3 / S3‑Compatible", iconBg: "bg-gray-100", iconEmoji: "🗄️" },
  { name: "Sentry", iconBg: "bg-red-100", iconEmoji: "🛟" },
  { name: "Snowflake", iconBg: "bg-blue-50", iconEmoji: "❄️" },
  { name: "W&B Weave", iconBg: "bg-yellow-50", iconEmoji: "🧶" },
  { name: "Webhook", iconBg: "bg-gray-50", iconEmoji: "🪝" },
];

type DestinationRowProps = {
  name: string;
  iconBg: string;
  iconEmoji: string;
  disabled?: boolean;
  onAdd?: () => void;
};

function DestinationRow({ name, iconBg, iconEmoji, disabled, onAdd }: DestinationRowProps) {
  const handleClick = () => {
    if (disabled) return;
    onAdd?.();
  };

  return (
    <div
      className={`flex items-center justify-between px-5 py-3 text-[13px] transition-all duration-300 ${
        disabled ? "pointer-events-none" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex h-7 w-7 items-center justify-center rounded-md text-[13px] transition-opacity duration-300",
            iconBg,
            disabled ? "opacity-50" : "",
          ].join(" ")}
        >
          <span className="leading-none">{iconEmoji}</span>
        </div>
        <span
          className={`text-[13px] transition-colors duration-300 ${
            disabled ? "text-gray-500 dark:text-gray-600" : "text-gray-800 dark:text-gray-200"
          }`}
        >
          {name}
        </span>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-300 ${
          disabled
            ? "border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
        }`}
      >
        <span>Add Destination</span>
        <span className="text-base leading-none">+</span>
      </button>
    </div>
  );
}

// Simple sidebar component for when NewDestinationPage is shown
function SimpleSidebarSections() {
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
          label="Activity"
          icon={<Activity className="h-4 w-4" />}
        />
        <SidebarLink
          to="/logs"
          label="Logs"
          icon={<FileText className="h-4 w-4" />}
        />
        <SidebarLink
          to="/credits"
          label="Credits"
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
            <span>Settings</span>
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
            <SidebarSubLink to="/settings/account" label="Account" />
            <SidebarSubLink to="/settings/api-keys" label="API Keys" />
            <SidebarSubLink
              to="/settings/management-keys"
              label="Management Keys"
            />
            <SidebarSubLink
              to="/settings/privacy-guardrails"
              label="Privacy & Guardrails"
            />
            <SidebarSubLink to="/settings/byok" label="BYOK" />
            <SidebarSubLink to="/settings/presets" label="Presets" />
            <SidebarSubLink to="/settings/routing" label="Routing" />
            <SidebarSubLink to="/settings/plugins" label="Plugins" />
            <SidebarSubLink
              to="/settings/observability"
              label="Observability"
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
  icon: React.ReactNode;
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