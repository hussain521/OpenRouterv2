import { type ReactNode, useState } from "react";
import { NavLink, type NavLinkRenderProps } from "react-router-dom";
import { Activity, FileText, CreditCard, Settings, ChevronDown, CircleDot } from "lucide-react";
import { LuFocus } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardLayoutProps = {
  title: string;
  children?: ReactNode;
};

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
            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
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

function SidebarSubLink({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }: NavLinkRenderProps) =>
        [
          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors pl-7",
          isActive
            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
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

export default function DashboardLayout({ title, children }: DashboardLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-72px)] bg-white dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 border-r dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800 h-full">
        <div className="h-full px-3 py-4">
          <nav className="space-y-4 text-sm">
            <SidebarSections />
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 px-10 py-8 scrollbar-hide">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <div>
              <h1 className="text-[22px] font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs">
              
            </div>
          </header>

          {children ?? <DefaultActivityContent />}
        </div>
      </main>
    </div>
  );
}

function SidebarSections() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

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
          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
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

function DefaultActivityContent() {
  type SortColumn = "model" | "min" | "max" | "avg" | "sum";

  const [isSpendDialogOpen, setIsSpendDialogOpen] = useState(false);
  const [isRequestsDialogOpen, setIsRequestsDialogOpen] = useState(false);
  const [isTokensDialogOpen, setIsTokensDialogOpen] = useState(false);

  const [creditView, setCreditView] = useState<"credits" | "usd">("credits");
  const [isCreditMenuOpen, setIsCreditMenuOpen] = useState(false);

  const [sortColumn, setSortColumn] = useState<SortColumn>("avg");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSortClick = (column: SortColumn) => {
    setSortColumn((current) => {
      if (current === column) {
        setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));
        return current;
      }
      setSortDirection("asc");
      return column;
    });
  };

  const renderSortLabel = (label: string, column: SortColumn) => {
    const isActive = sortColumn === column;
    const arrow = isActive ? (sortDirection === "asc" ? "↑" : "↓") : "↕";

    return (
      <button
        type="button"
        onClick={() => handleSortClick(column)}
        className={[
          "flex w-full items-center justify-between rounded-full px-3 py-1 text-left text-[11px]",
          isActive ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-700/60",
        ].join(" ")}
      >
        <span>{label}</span>
        <span className="ml-2 text-[10px] text-gray-400 dark:text-gray-500">{arrow}</span>
      </button>
    );
  };

  const renderMetricDialog = (title: string, onClose: () => void) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-sm">
      <div className="relative w-[900px] max-w-[95vw] rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{title}</div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCreditMenuOpen((open) => !open)}
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-1 text-[11px] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <span>
                  {creditView === "credits" ? "OpenRouter Credits" : "USD ($)"}
                </span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {isCreditMenuOpen && (
                <div className="absolute right-0 z-50 mt-1 w-40 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 text-[11px] shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setCreditView("credits");
                      setIsCreditMenuOpen(false);
                    }}
                    className="block w-full px-3 py-1.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    OpenRouter Credits
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCreditView("usd");
                      setIsCreditMenuOpen(false);
                    }}
                    className="block w-full px-3 py-1.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    USD ($)
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span className="text-[13px] leading-none">✕</span>
            </button>
          </div>
        </div>

        <div className="px-8 pt-10 pb-6">
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 dark:border-gray-600 bg-gray-50/60 dark:bg-gray-700/40">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500">
              <div className="flex h-4 w-4 items-end gap-0.5">
                <span className="h-2 w-1 rounded-full bg-gray-300 dark:bg-gray-500" />
                <span className="h-3 w-1 rounded-full bg-gray-300 dark:bg-gray-500" />
                <span className="h-4 w-1 rounded-full bg-gray-300 dark:bg-gray-500" />
                <span className="h-3 w-1 rounded-full bg-gray-300 dark:bg-gray-500" />
              </div>
            </div>
            <p className="text-[13px] text-gray-500 dark:text-gray-400">
              Not enough data to display yet.
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-700/40">
            <div className="grid grid-cols-5 gap-px bg-transparent px-2 py-2 text-[11px] font-medium text-gray-500 dark:text-gray-400">
              <div className="rounded-full bg-white dark:bg-gray-700">
                {renderSortLabel("Model", "model")}
              </div>
              <div className="rounded-full bg-white dark:bg-gray-700">
                {renderSortLabel("Min ($)", "min")}
              </div>
              <div className="rounded-full bg-white dark:bg-gray-700">
                {renderSortLabel("Max ($)", "max")}
              </div>
              <div className="rounded-full bg-white dark:bg-gray-700">
                {renderSortLabel("Avg ($)", "avg")}
              </div>
              <div className="rounded-full bg-white dark:bg-gray-700">
                {renderSortLabel("Sum ($)", "sum")}
              </div>
            </div>
            <div className="px-4 py-6 text-center text-[12px] text-gray-400 dark:text-gray-500">
              No rows to display.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pt-4">
      <p className="text-[13px] text-gray-500 dark:text-gray-400">
        Your usage across models on OpenRouter.
      </p>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm/10 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between px-5 pt-4 pb-0">
            <CardTitle className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              Spend
            </CardTitle>
            <button
              type="button"
              onClick={() => setIsSpendDialogOpen(true)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <LuFocus className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-3">
            <div className="text-[28px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              $0
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-2">
              <div className="h-6 w-12 rounded-full bg-gray-100 dark:bg-gray-700" />
              <p className="text-[11px] text-gray-400 dark:text-gray-500">No data in this window</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm/10 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between px-5 pt-4 pb-0">
            <CardTitle className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              Requests
            </CardTitle>
            <button
              type="button"
              onClick={() => setIsRequestsDialogOpen(true)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <LuFocus className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-3">
            <div className="text-[28px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              0
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-2">
              <div className="h-6 w-12 rounded-full bg-gray-100 dark:bg-gray-700" />
              <p className="text-[11px] text-gray-400 dark:text-gray-500">No data in this window</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm/10 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between px-5 pt-4 pb-0">
            <CardTitle className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              Tokens
            </CardTitle>
            <button
              type="button"
              onClick={() => setIsTokensDialogOpen(true)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <LuFocus className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-3">
            <div className="text-[28px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              0
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-2">
              <div className="h-6 w-12 rounded-full bg-gray-100 dark:bg-gray-700" />
              <p className="text-[11px] text-gray-400 dark:text-gray-500">No data in this window</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* “Want to go deeper?” card */}
      <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl">
        <CardContent className="flex flex-col gap-3 py-4 text-[13px] text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300">
              <span className="text-lg">📡</span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Want to go deeper?</p>
              <p className="text-[13px] text-gray-500 dark:text-gray-400">
                Send your OpenRouter traces to observability tools with no code
                changes, and more destinations with no code changes.
              </p>
            </div>
          </div>
          <button className="self-start rounded-full border border-gray-300 dark:border-gray-600 px-4 py-1.5 text-[11px] font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 md:self-auto">
            Check out Broadcast
          </button>
        </CardContent>
      </Card>

      {/* “Logs have moved” card */}
      <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl">
        <CardContent className="flex items-start justify-between gap-3 py-4 text-[13px] text-gray-600 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300">
              <span className="text-lg">📄</span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Logs have moved</p>
              <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
                Your API request logs now have their own dedicated page.
              </p>
            </div>
          </div>
          <button className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <span className="text-base leading-none">✕</span>
          </button>
        </CardContent>
      </Card>

      {/* Spend / Requests / Tokens dialogs */}
      {isSpendDialogOpen &&
        renderMetricDialog("Spend By Model", () => setIsSpendDialogOpen(false))}
      {isRequestsDialogOpen &&
        renderMetricDialog("Requests By Model", () => setIsRequestsDialogOpen(false))}
      {isTokensDialogOpen &&
        renderMetricDialog("Tokens By Model", () => setIsTokensDialogOpen(false))}
    </div>
  );
}