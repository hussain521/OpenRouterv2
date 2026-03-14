import { type ReactNode, useState, useEffect, useRef } from "react";
import { NavLink, type NavLinkRenderProps, useLocation } from "react-router-dom";
import {
  Activity,
  FileText,
  CreditCard,
  Settings,
  ChevronDown,
  CircleDot,
  Filter,
  Search,
} from "lucide-react";
import { LuChartNoAxesColumnIncreasing, LuFocus } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

type DashboardLayoutProps = {
  title: ReactNode;
  children?: ReactNode;
  headerActions?: ReactNode;
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
            ? "bg-gray-200 dark:bg-accent text-gray-900 dark:text-foreground font-medium border-l-2 border-l-primary pl-6"
            : "text-gray-600 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-accent/50 hover:text-gray-900 dark:hover:text-foreground border-l-2 border-l-transparent pl-6",
        ].join(" ")
      }
    >
      <span className="flex h-4 w-4 items-center justify-center text-gray-400 dark:text-muted-foreground">
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
            ? "bg-gray-200 dark:bg-accent text-gray-900 dark:text-foreground font-semibold border-l-4 border-l-primary pl-2"
            : "text-gray-600 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-accent/50 hover:text-gray-900 dark:hover:text-foreground border-l-4 border-l-transparent pl-2",
        ].join(" ")
      }
    >
      <span className="flex h-3 w-3 items-center justify-center text-gray-300 dark:text-muted-foreground">
        <CircleDot className="h-3 w-3" />
      </span>
      <span>{label}</span>
    </NavLink>
  );
}

export default function DashboardLayout({
  title,
  children,
  headerActions,
}: DashboardLayoutProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-[calc(100vh-72px)] bg-white dark:bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-60 ${
        isRTL ? 'border-l lg:border-l' : 'border-r lg:border-r'
      } border-gray-200 dark:border-border bg-gray-50/80 dark:bg-background h-full transition-transform duration-300 ease-in-out lg:transition-none`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <nav className="space-y-4 text-sm">
            <SidebarSections />
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-background px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 scrollbar-hide">
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
          <header className="flex items-center justify-between border-b border-gray-200 dark:border-border pb-4">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-muted-foreground dark:hover:text-foreground hover:bg-gray-100 dark:hover:bg-accent"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              
              <h1 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {headerActions}
            </div>
          </header>

          {children ?? <DefaultActivityContent />}
        </div>
      </main>
    </div>
  );
}

function SidebarSections() {
  const { t } = useTranslation();
  const location = useLocation();
  const isInSettingsSection = location.pathname.startsWith("/settings");
  
  // Initialize the state based on current location
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
          label={t("dashboard.logs")}
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
              ? "bg-gray-200 dark:bg-accent text-gray-900 dark:text-foreground font-semibold border-l-4 border-l-primary pl-2"
              : "text-gray-600 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-accent/50 hover:text-gray-900 dark:hover:text-foreground border-l-4 border-l-transparent pl-2",
          ].join(" ")}
        >
          <span className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center text-gray-400 dark:text-muted-foreground">
              <Settings className="h-4 w-4" />
            </span>
            <span>{t("nav.settings")}</span>
          </span>
          <span
            className={[
              "flex h-4 w-4 items-center justify-center text-gray-400 dark:text-muted-foreground transition-transform",
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

function DefaultActivityContent() {
  const { t } = useTranslation();
  type SortColumn = "model" | "min" | "max" | "avg" | "sum";

  const [isSpendDialogOpen, setIsSpendDialogOpen] = useState(false);
  const [isRequestsDialogOpen, setIsRequestsDialogOpen] = useState(false);
  const [isTokensDialogOpen, setIsTokensDialogOpen] = useState(false);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [isModelsOpen, setIsModelsOpen] = useState(true);
  const [isApiKeysOpen, setIsApiKeysOpen] = useState(true);
  const [timeRange, setTimeRange] = useState<
    "1_hour" | "1_day" | "1_week" | "1_month" | "1_year"
  >("1_month");
  const [groupBy, setGroupBy] = useState<"model" | "api_key">("model");
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  const filtersRef = useRef<HTMLDivElement | null>(null);
  const settingsMenuRef = useRef<HTMLDivElement | null>(null);

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
          isActive
            ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-700/60",
        ].join(" ")}
      >
        <span>{label}</span>
        <span className="ml-2 text-[10px] text-gray-400 dark:text-gray-500">
          {arrow}
        </span>
      </button>
    );
  };

  const renderMetricDialog = (title: string, onClose: () => void) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-background/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[95vw] sm:max-w-[600px] lg:max-w-[900px] rounded-2xl border border-gray-100 dark:border-border bg-white dark:bg-card shadow-[0_18px_45px_rgba(15,23,42,0.08)] max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-border px-4 sm:px-6 py-3 sm:py-4">
          <div className="text-sm sm:text-base font-medium text-gray-800 dark:text-card-foreground truncate pr-4">
            {title}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCreditMenuOpen((open) => !open)}
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-border bg-gray-50 dark:bg-secondary px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] text-gray-600 dark:text-secondary-foreground hover:bg-gray-100 dark:hover:bg-accent"
              >
                <span className="hidden sm:inline">
                  {creditView === "credits" ? t("dashboard.openRouterCredits") : t("dashboard.usd")}
                </span>
                <span className="sm:hidden">
                  {creditView === "credits" ? t("hardcodedStrings.credits") : t("hardcodedStrings.usd")}
                </span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {isCreditMenuOpen && (
                <div className="absolute right-0 z-50 mt-1 w-32 sm:w-40 overflow-hidden rounded-xl border border-gray-100 dark:border-border bg-white dark:bg-popover py-1 text-[10px] sm:text-[11px] shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setCreditView("credits");
                      setIsCreditMenuOpen(false);
                    }}
                    className="block w-full px-3 py-1.5 text-left text-gray-700 dark:text-popover-foreground hover:bg-gray-50 dark:hover:bg-accent"
                  >
                    {t("dashboard.openRouterCredits")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCreditView("usd");
                      setIsCreditMenuOpen(false);
                    }}
                    className="block w-full px-3 py-1.5 text-left text-gray-700 dark:text-popover-foreground hover:bg-gray-50 dark:hover:bg-accent"
                  >
                    {t("dashboard.usd")}
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-400 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-accent hover:text-gray-600 dark:hover:text-foreground"
            >
              <span className="text-[13px] leading-none">✕</span>
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-6 overflow-y-auto">
          <div className="flex min-h-[200px] sm:min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 dark:border-border bg-gray-50/60 dark:bg-muted/40">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-muted text-gray-300 dark:text-muted-foreground">
              <div className="flex h-4 w-4 items-end gap-0.5">
                <span className="h-2 w-1 rounded-full bg-gray-300 dark:bg-muted-foreground" />
                <span className="h-3 w-1 rounded-full bg-gray-300 dark:bg-muted-foreground" />
                <span className="h-4 w-1 rounded-full bg-gray-300 dark:bg-muted-foreground" />
                <span className="h-3 w-1 rounded-full bg-gray-300 dark:bg-muted-foreground" />
              </div>
            </div>
            <p className="text-[13px] text-gray-500 dark:text-gray-400">
              {t("dashboard.notEnoughData")}
            </p>
          </div>

          <div className="mt-4 sm:mt-5 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-700/40">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-px bg-transparent px-1 sm:px-2 py-1 sm:py-2 text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-muted-foreground">
              <div className="rounded-full bg-white dark:bg-card">
                {renderSortLabel(t("dashboard.model"), "model")}
              </div>
              <div className="rounded-full bg-white dark:bg-gray-700">
                {renderSortLabel(t("dashboard.minPrice"), "min")}
              </div>
              <div className="rounded-full bg-white dark:bg-gray-700">
                {renderSortLabel(t("dashboard.maxPrice"), "max")}
              </div>
              <div className="rounded-full bg-white dark:bg-gray-700">
                {renderSortLabel(t("dashboard.avgPrice"), "avg")}
              </div>
              <div className="rounded-full bg-white dark:bg-gray-700">
                {renderSortLabel(t("dashboard.sumPrice"), "sum")}
              </div>
            </div>
            <div className="px-2 sm:px-4 py-4 sm:py-6 text-center text-[11px] sm:text-[12px] text-gray-400 dark:text-gray-500">
              {t("dashboard.noRows")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFiltersDialogOpen &&
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setIsFiltersDialogOpen(false);
      }
      if (
        isSettingsMenuOpen &&
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node)
      ) {
        setIsSettingsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFiltersDialogOpen, isSettingsMenuOpen]);

  return (
    <div className="space-y-6 pt-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-gray-500 dark:text-gray-400">
          {t("dashboard.usageDescription")}
        </p>

        {/* Filters row beside description */}
        <div
          ref={filtersRef}
          className="relative grid grid-flow-col auto-cols-max items-center gap-2 text-[11px]"
        >
          {/* Filters pill */}
          <button
            type="button"
            onClick={() => setIsFiltersDialogOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-600 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Filter className="h-4 w-4" />
            <span className="text-[13px]">{t("dashboard.filters")}</span>
          </button>

          {/* 1 Month select (time range) */}
          <Select
            value={timeRange}
            onValueChange={(
              value: "1_hour" | "1_day" | "1_week" | "1_month" | "1_year",
            ) => setTimeRange(value)}
          >
            <SelectTrigger className="h-8 rounded-full border border-gray-200 bg-white px-3 text-[13px] text-gray-600 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-200 dark:hover:bg-gray-700">
              <SelectValue placeholder="1 Month" />
            </SelectTrigger>
            <SelectContent align="start" className="w-32 rounded-2xl border border-gray-200 bg-white p-0 text-[13px] shadow-lg dark:border-gray-700 dark:bg-black">
              <SelectItem value="1_hour">{t("dashboard.timeRange.1hour")}</SelectItem>
              <SelectItem value="1_day">{t("dashboard.timeRange.1day")}</SelectItem>
              <SelectItem value="1_week">{t("dashboard.timeRange.1week")}</SelectItem>
              <SelectItem value="1_month">{t("dashboard.timeRange.1month")}</SelectItem>
              <SelectItem value="1_year">{t("dashboard.timeRange.1year")}</SelectItem>
            </SelectContent>
          </Select>

          {/* By Model select (group by) */}
          <Select
            value={groupBy}
            onValueChange={(value: "model" | "api_key") => setGroupBy(value)}
          >
            <SelectTrigger className="h-8 min-w-[120px] rounded-full border border-gray-200 bg-white px-3 text-[13px] text-gray-600 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-200 dark:hover:bg-gray-700">
              <SelectValue placeholder={t("hardcodedStrings.byModel")} />
            </SelectTrigger>
            <SelectContent align="start" className="w-[140px] rounded-2xl border border-gray-200 bg-white p-0 text-[13px] shadow-lg dark:border-gray-700 dark:bg-black">
              <SelectItem value="model">{t("dashboard.byModel")}</SelectItem>
              <SelectItem value="api_key">{t("dashboard.byApiKey")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Settings circle with dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSettingsMenuOpen((open) => !open)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Settings className="h-3.5 w-3.5" />
            </button>

            {isSettingsMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-40 w-40 rounded-2xl border border-gray-200 bg-white py-2 text-[12px] text-gray-700 shadow-lg dark:border-gray-700 dark:bg-black dark:text-gray-200">
                <div className="px-3 pb-1 text-[11px] font-medium text-gray-400 dark:text-gray-500">
                  {t("dashboard.exportTo")}
                </div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <FileText className="h-3.5 w-3.5 text-gray-400" />
                  <span>{t("dashboard.csv")}</span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <FileText className="h-3.5 w-3.5 text-gray-400" />
                  <span>{t("dashboard.pdf")}</span>
                </button>
              </div>
            )}
          </div>

          {/* Filters dropdown card */}
          {isFiltersDialogOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-40 w-[360px] rounded-2xl border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] dark:border-gray-700 dark:bg-black">
              <div className="space-y-3 px-4 py-3 text-[13px] text-gray-700 dark:text-gray-200">
                {/* Models section (same style as API Keys) */}
                <div className="rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-black">
                  <button
                    type="button"
                    onClick={() => setIsModelsOpen((open) => !open)}
                    className="flex w-full items-center  justify-between rounded-2xl px-3 py-2 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    <span>{t("dashboard.models")}</span>
                    <ChevronDown
                      className={[
                        "h-3.5 w-3.5 text-gray-400 transition-transform",
                        isModelsOpen ? "rotate-0" : "-rotate-90",
                      ].join(" ")}
                    />
                  </button>

                  {isModelsOpen && (
                    <div className="border-t border-gray-200 px-3 py-2 text-[12px] text-gray-500 dark:border-gray-700 dark:text-gray-400">
                      <div className="mb-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-1.5 text-gray-500 dark:border-gray-700 dark:bg-black">
                        <Search className="h-3.5 w-3.5" />
                        <input
                          type="text"
                          placeholder={t("dashboard.searchModels")}
                          className="w-full bg-transparent text-[12px] text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-200 dark:placeholder:text-gray-500"
                        />
                      </div>
                      <div className="rounded-xl bg-white px-2 py-1.5 text-[12px] text-gray-500 dark:bg-black dark:text-gray-400">
                        {t("dashboard.noModelsFound")}
                      </div>
                    </div>
                  )}
                </div>

                {/* API Keys section */}
                <div className="rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-black">
                  <button
                    type="button"
                    onClick={() => setIsApiKeysOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    <span>{t("dashboard.apiKeys")}</span>
                    <ChevronDown
                      className={[
                        "h-3.5 w-3.5 text-gray-400 transition-transform",
                        isApiKeysOpen ? "rotate-0" : "-rotate-90",
                      ].join(" ")}
                    />
                  </button>

                  {isApiKeysOpen && (
                    <div className="border-t border-gray-200 px-3 py-2 text-[12px] text-gray-500 dark:border-gray-700 dark:text-gray-400">
                      <div className="mb-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-1.5 text-gray-500 dark:border-gray-700 dark:bg-black">
                        <Search className="h-3.5 w-3.5" />
                        <input
                          type="text"
                          placeholder={t("dashboard.searchApiKeys")}
                          className="w-full bg-transparent text-[12px] text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-200 dark:placeholder:text-gray-500"
                        />
                      </div>
                      <div className="rounded-xl bg-white px-2 py-1.5 text-[12px] text-gray-500 dark:bg-black dark:text-gray-400">
                        {t("dashboard.noApiKeysFound")}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-gray-200 dark:border-border bg-white dark:bg-card shadow-sm/10 rounded-2xl p-2 transition-shadow hover:shadow-lg dark:hover:shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between px-5 pt-1 pb-0">
            <CardTitle className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              {t("dashboard.spend")}
            </CardTitle>
            <button
              type="button"
              onClick={() => setIsSpendDialogOpen(true)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <LuFocus className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-1">
            <div className="text-[28px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              $0
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-2">
              <LuChartNoAxesColumnIncreasing className=" w-15 h-15 text-gray-400 dark:text-gray-500" />

              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                {t("dashboard.noDataInWindow")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-sm/10 rounded-2xl p-2 transition-shadow hover:shadow-lg dark:hover:shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between px-5 pt-1 pb-0">
            <CardTitle className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              {t("dashboard.requests")}
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
              <LuChartNoAxesColumnIncreasing className=" w-15 h-15 text-gray-400 dark:text-gray-500" />

              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                {t("dashboard.noDataInWindow")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-sm/10 rounded-2xl p-2 transition-shadow hover:shadow-lg dark:hover:shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
          <CardHeader className="flex flex-row items-center justify-between px-5 pt-1 pb-0">
            <CardTitle className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              {t("dashboard.tokens")}
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
              <LuChartNoAxesColumnIncreasing className=" w-15 h-15 text-gray-400 dark:text-gray-500" />

              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                {t("dashboard.noDataInWindow")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* “Want to go deeper?” card */}
      <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black rounded-2xl transition-colors hover:border-blue-500 dark:hover:border-blue-400">
        <CardContent className="flex flex-col gap-3 py-4 text-[13px] text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300">
              <span className="text-lg">📡</span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {t("dashboard.wantToGoDeeper")}
              </p>
              <p className="text-[13px] text-gray-500 dark:text-gray-400">
                {t("dashboard.observabilityDescription")}
              </p>
            </div>
          </div>
          <button className="self-start rounded-full border border-gray-300 dark:border-gray-600 px-4 py-1.5 text-[11px] font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 md:self-auto">
            {t("dashboard.checkOutBroadcast")}
          </button>
        </CardContent>
      </Card>

      {/* “Logs have moved” card */}
      <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black rounded-2xl transition-colors hover:border-blue-500 dark:hover:border-blue-400">
        <CardContent className="flex items-start justify-between gap-3 py-4 text-[13px] text-gray-600 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300">
              <span className="text-lg">📄</span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {t("dashboard.logsHaveMoved")}
              </p>
              <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
                {t("dashboard.logsDescription")}
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
        renderMetricDialog(t("dashboard.spendByModel"), () => setIsSpendDialogOpen(false))}
      {isRequestsDialogOpen &&
        renderMetricDialog(t("dashboard.requestsByModel"), () =>
          setIsRequestsDialogOpen(false),
        )}
      {isTokensDialogOpen &&
        renderMetricDialog(t("dashboard.tokensByModel"), () =>
          setIsTokensDialogOpen(false),
        )}
    </div>
  );
}
