import { useEffect, useRef, useState } from "react";
import { Download, Filter, Flag, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { DatePicker } from "@/components/ui/date-picker";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ReportFeedbackDialog } from "@/components/dialogs";
import { usePageTitle } from "@/hooks/usePageTitle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LogEntry {
  timestamp: string;
  providerModel: string;
  app: string;
  tokens: number;
  cost: number;
  speed: number;
  finish: string;
  actions?: string;
}

export default function LogsPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.logs"));
  // Initialize with default dates (24 hours range)
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 24 hours ago
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());

  // Mock data for demonstration
  const [logs] = useState<LogEntry[]>(() => {
    const baseTime = Date.now();
    return Array.from({ length: 50 }, (_, i) => ({
      timestamp: new Date(baseTime - i * 3600000).toLocaleString(),
      providerModel: ["OpenAI/GPT-4", "Anthropic/Claude", "Google/Gemini"][
        i % 3
      ],
      app: `${t("logsPage.app")} ${(i % 3) + 1}`,
      tokens: (((i + 1) * 127) % 5000) + 100,
      cost: (((i + 1) * 0.023) % 0.5) + 0.01,
      speed: (((i + 1) * 17) % 100) + 10,
      finish: [
        t("logsPage.finish.stop"),
        t("logsPage.finish.length"),
        t("logsPage.finish.timeout"),
      ][i % 3],
      actions: t("logsPage.actions.view"),
    }));
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(logs.length / itemsPerPage);

  // Get current page data
  const currentLogs = logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // UI state
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement | null>(null);

  // Filters values (make dropdowns actually work)
  const [modelFilter, setModelFilter] = useState<string | undefined>();
  const [providerFilter, setProviderFilter] = useState<string | undefined>();
  const [apiKeyFilter, setApiKeyFilter] = useState<string | undefined>();

  // Close Filters dropdown when clicking anywhere outside the Filters area
  useEffect(() => {
    if (!isFiltersOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFiltersOpen]);

  const columns = [
    {
      header: t("logsPage.columns.timestamp"),
      accessor: "timestamp" as keyof LogEntry,
      tooltip: t("logsPage.columns.timestampTooltip"),
      width: 180,
    },
    {
      header: t("logsPage.columns.providerModel"),
      accessor: "providerModel" as keyof LogEntry,
      tooltip: t("logsPage.columns.providerModelTooltip"),
      width: 150,
    },
    {
      header: t("logsPage.columns.app"),
      accessor: "app" as keyof LogEntry,
      tooltip: t("logsPage.columns.appTooltip"),
      width: 120,
    },
    {
      header: t("logsPage.columns.tokens"),
      accessor: "tokens" as keyof LogEntry,
      tooltip: t("logsPage.columns.tokensTooltip"),
      width: 80,
    },
    {
      header: t("logsPage.columns.cost"),
      accessor: (log: LogEntry) => `$${log.cost.toFixed(4)}`,
      tooltip: t("logsPage.columns.costTooltip"),
      width: 90,
    },
    {
      header: t("logsPage.columns.speed"),
      accessor: "speed" as keyof LogEntry,
      tooltip: t("logsPage.columns.speedTooltip"),
      width: 80,
    },
    {
      header: t("logsPage.columns.finish"),
      accessor: "finish" as keyof LogEntry,
      tooltip: t("logsPage.columns.finishTooltip"),
      width: 100,
    },
    {
      header: t("logsPage.columns.actions"),
      accessor: "actions" as keyof LogEntry,
      tooltip: t("logsPage.columns.actionsTooltip"),
      width: 100,
    },
  ];

  function handleExport() {
    const headers = [
      t("logsPage.columns.timestamp"),
      t("logsPage.columns.providerModel"),
      t("logsPage.columns.app"),
      t("logsPage.columns.tokens"),
      t("logsPage.columns.cost"),
      t("logsPage.columns.speed"),
      t("logsPage.columns.finish"),
      t("logsPage.columns.actions"),
    ];

    const csvRows = [
      headers.join(","),
      ...logs.map((log) =>
        [
          log.timestamp,
          log.providerModel,
          log.app,
          log.tokens,
          log.cost,
          log.speed,
          log.finish,
          log.actions ?? "",
        ]
          .map((value) =>
            typeof value === "string"
              ? `"${value.replace(/"/g, '""')}"`
              : String(value),
          )
          .join(","),
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "logs.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title={t("nav.logs")}>
        <div className="space-y-4 pt-4">
          {/* Date range + actions row */}
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-2  text-[11px] text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <span className="mr-1 text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  {t("logsPage.from")}
                </span>
                <DatePicker
                  date={fromDate}
                  onSelect={setFromDate}
                  placeholder={t("logsPage.selectStartDate")}
                />
              </div>
              <span className="text-gray-300 dark:text-gray-600">→</span>
              <div className="flex items-center gap-1">
                <span className="mr-1 text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  {t("logsPage.to")}
                </span>
                <DatePicker
                  date={toDate}
                  onSelect={setToDate}
                  placeholder={t("logsPage.selectEndDate")}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              {/* Filters dropdown (3 stacked selects like screenshot) */}
              <div className="relative" ref={filtersRef}>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1.5 rounded-full border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500 dark:border-gray-600 dark:text-gray-400"
                  onClick={() => setIsFiltersOpen((open) => !open)}
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>{t("logsPage.filters")}</span>
                </Button>

                {isFiltersOpen && (
                  <div className="absolute right-0 z-40 mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_18px_55px_rgba(15,23,42,0.12)] dark:border-gray-700 dark:bg-black">
                    <div className="flex flex-col gap-2">
                      {/* Models select with search + empty state */}
                      <Select
                        value={modelFilter}
                        onValueChange={setModelFilter}
                      >
                        <SelectTrigger className="h-10 w-full rounded-xl border-gray-200 bg-white text-[12px] font-medium text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
                          <SelectValue placeholder={t("logsPage.models")} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-0 mt-30">
                          <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-800">
                            <div className="relative">
                              <Input
                                placeholder={t("logsPage.searchModels")}
                                className="h-8 rounded-lg border-gray-200 bg-gray-50 pl-8 text-xs text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                              />
                              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                          <SelectGroup>
                            <SelectLabel className="px-3 pt-2 text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                              {t("logsPage.models")}
                            </SelectLabel>
                            <SelectItem value="all-models">
                              {t("logsPage.allModels")}
                            </SelectItem>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                            <SelectItem
                              value="no-models"
                              disabled
                              className="mt-1 cursor-default bg-gray-50 text-xs text-gray-400 dark:bg-gray-900/60 dark:text-gray-400"
                            >
                              {t("logsPage.noModelsFound")}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {/* Providers select with search + empty state */}
                      <Select
                        value={providerFilter}
                        onValueChange={setProviderFilter}
                      >
                        <SelectTrigger className="h-10 w-full rounded-xl border-gray-200 bg-white text-[12px] font-medium text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
                          <SelectValue placeholder={t("logsPage.providers")} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-0 mt-30">
                          <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-800">
                            <div className="relative">
                              <Input
                                placeholder={t("logsPage.searchProviders")}
                                className="h-8 rounded-lg border-gray-200 bg-gray-50 pl-8 text-xs text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                              />
                              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                          <SelectGroup>
                            <SelectLabel className="px-3 pt-2 text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                              {t("logsPage.providers")}
                            </SelectLabel>
                            <SelectItem value="all-providers">
                              {t("logsPage.allProviders")}
                            </SelectItem>
                            <SelectItem value="openai">OpenAI</SelectItem>
                            <SelectItem value="anthropic">Anthropic</SelectItem>
                            <SelectItem
                              value="no-providers"
                              disabled
                              className="mt-1 cursor-default bg-gray-50 text-xs text-gray-400 dark:bg-gray-900/60 dark:text-gray-400"
                            >
                              {t("logsPage.noProvidersFound")}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {/* API Keys select with search + empty state */}
                      <Select
                        value={apiKeyFilter}
                        onValueChange={setApiKeyFilter}
                      >
                        <SelectTrigger className="h-10 w-full rounded-xl border-gray-200 bg-white text-[12px] font-medium text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
                          <SelectValue placeholder={t("logsPage.apiKeys")} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-0 mt-30">
                          <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-800">
                            <div className="relative">
                              <Input
                                placeholder={t("logsPage.searchApiKeys")}
                                className="h-8 rounded-lg border-gray-200 bg-gray-50 pl-8 text-xs text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                              />
                              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                          <SelectGroup>
                            <SelectLabel className="px-3 pt-2 text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                              {t("logsPage.apiKeys")}
                            </SelectLabel>
                            <SelectItem value="all-api-keys">
                              {t("logsPage.allApiKeys")}
                            </SelectItem>
                            <SelectItem value="key-1">
                              {t("logsPage.key")} 1
                            </SelectItem>
                            <SelectItem value="key-2">
                              {t("logsPage.key")} 2
                            </SelectItem>
                            <SelectItem
                              value="no-api-keys"
                              disabled
                              className="mt-1 cursor-default bg-gray-50 text-xs text-gray-400 dark:bg-gray-900/60 dark:text-gray-400"
                            >
                              {t("logsPage.noApiKeysFound")}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1.5 rounded-full border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500 dark:border-gray-600 dark:text-gray-400"
                onClick={() => setIsFeedbackOpen(true)}
              >
                <Flag className="h-3.5 w-3.5" />
                <span>{t("logsPage.reportFeedback")}</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1.5 rounded-full border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500 dark:border-gray-600 dark:text-gray-400"
                onClick={handleExport}
              >
                <Download className="h-3.5 w-3.5" />
                <span>{t("logsPage.export")}</span>
              </Button>
            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={currentLogs}
            emptyMessage={t("logsPage.emptyMessage")}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="rounded-2xl"
          />
        </div>
      </DashboardLayout>

      {/* Report Feedback dialog */}
      <ReportFeedbackDialog
        open={isFeedbackOpen}
        onOpenChange={setIsFeedbackOpen}
      />
    </div>
  );
}
