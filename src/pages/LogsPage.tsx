import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Filter, Flag, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { DatePicker } from "@/components/ui/date-picker";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
      providerModel: ["OpenAI/GPT-4", "Anthropic/Claude", "Google/Gemini"][i % 3],
      app: `App ${(i % 3) + 1}`,
      tokens: ((i + 1) * 127) % 5000 + 100,
      cost: ((i + 1) * 0.023) % 0.5 + 0.01,
      speed: ((i + 1) * 17) % 100 + 10,
      finish: ["stop", "length", "timeout"][i % 3],
      actions: "View"
    }));
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(logs.length / itemsPerPage);
  
  // Get current page data
  const currentLogs = logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // UI state
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement | null>(null);
 
  // Filters values (make dropdowns actually work)
  const [modelFilter, setModelFilter] = useState<string | undefined>();
  const [providerFilter, setProviderFilter] = useState<string | undefined>();
  const [apiKeyFilter, setApiKeyFilter] = useState<string | undefined>();

  // Feedback form state
  const [generationId, setGenerationId] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState<string | undefined>();
  const [feedbackComment, setFeedbackComment] = useState("");

  const commentCharCount = useMemo(
    () => `${feedbackComment.length}/1000`,
    [feedbackComment],
  );
 
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
      header: "Timestamp",
      accessor: "timestamp" as keyof LogEntry,
      tooltip: "The exact time when the API request was processed",
      width: 180
    },
    {
      header: "Provider / Model",
      accessor: "providerModel" as keyof LogEntry,
      tooltip: "The AI provider and model used for this request",
      width: 150
    },
    {
      header: "App",
      accessor: "app" as keyof LogEntry,
      tooltip: "The application or API key that made this request",
      width: 120
    },
    {
      header: "Tokens",
      accessor: "tokens" as keyof LogEntry,
      tooltip: "Total number of tokens processed (input + output)",
      width: 80
    },
    {
      header: "Cost",
      accessor: (log: LogEntry) => `$${log.cost.toFixed(4)}`,
      tooltip: "The total cost for this API request in USD",
      width: 90
    },
    {
      header: "Speed",
      accessor: "speed" as keyof LogEntry,
      tooltip: "Response speed in tokens per second",
      width: 80
    },
    {
      header: "Finish",
      accessor: "finish" as keyof LogEntry,
      tooltip: "How the request was completed (e.g., stop, length limit)",
      width: 100
    },
    {
      header: "Actions",
      accessor: "actions" as keyof LogEntry,
      tooltip: "Available actions for this log entry",
      width: 100
    },
  ];

  function handleExport() {
    const headers = [
      "timestamp",
      "providerModel",
      "app",
      "tokens",
      "cost",
      "speed",
      "finish",
      "actions",
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

  function handleSubmitFeedback(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Wire up to backend
    setIsFeedbackOpen(false);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Logs">
        <div className="space-y-4 pt-4">
          {/* Date range + actions row */}
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <span className="mr-1 text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  From
                </span>
                <DatePicker
                  date={fromDate}
                  onSelect={setFromDate}
                  placeholder="Select start date"
                />
              </div>
              <span className="text-gray-300 dark:text-gray-600">→</span>
              <div className="flex items-center gap-1">
                <span className="mr-1 text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  To
                </span>
                <DatePicker
                  date={toDate}
                  onSelect={setToDate}
                  placeholder="Select end date"
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
                  <span>Filters</span>
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
                          <SelectValue placeholder="Models" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-0 mt-30">
                          <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-800">
                            <div className="relative">
                              <Input
                                placeholder="Search models"
                                className="h-8 rounded-lg border-gray-200 bg-gray-50 pl-8 text-xs text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                              />
                              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                          <SelectGroup>
                            <SelectLabel className="px-3 pt-2 text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                              Models
                            </SelectLabel>
                            <SelectItem value="all-models">
                              All models
                            </SelectItem>
                            <SelectItem value="gpt-4">gpt-4</SelectItem>
                            <SelectItem value="gpt-3.5">gpt-3.5</SelectItem>
                            <SelectItem
                              value="no-models"
                              disabled
                              className="mt-1 cursor-default bg-gray-50 text-xs text-gray-400 dark:bg-gray-900/60 dark:text-gray-400"
                            >
                              No models found
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
                          <SelectValue placeholder="Providers" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-0 mt-30">
                          <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-800">
                            <div className="relative">
                              <Input
                                placeholder="Search providers"
                                className="h-8 rounded-lg border-gray-200 bg-gray-50 pl-8 text-xs text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                              />
                              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                          <SelectGroup>
                            <SelectLabel className="px-3 pt-2 text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                              Providers
                            </SelectLabel>
                            <SelectItem value="all-providers">
                              All providers
                            </SelectItem>
                            <SelectItem value="openai">OpenAI</SelectItem>
                            <SelectItem value="anthropic">Anthropic</SelectItem>
                            <SelectItem
                              value="no-providers"
                              disabled
                              className="mt-1 cursor-default bg-gray-50 text-xs text-gray-400 dark:bg-gray-900/60 dark:text-gray-400"
                            >
                              No providers found
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
                          <SelectValue placeholder="API Keys" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-0 mt-30">
                          <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-800">
                            <div className="relative">
                              <Input
                                placeholder="Search API keys"
                                className="h-8 rounded-lg border-gray-200 bg-gray-50 pl-8 text-xs text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                              />
                              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                          <SelectGroup>
                            <SelectLabel className="px-3 pt-2 text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                              API Keys
                            </SelectLabel>
                            <SelectItem value="all-api-keys">
                              All API keys
                            </SelectItem>
                            <SelectItem value="key-1">Key 1</SelectItem>
                            <SelectItem value="key-2">Key 2</SelectItem>
                            <SelectItem
                              value="no-api-keys"
                              disabled
                              className="mt-1 cursor-default bg-gray-50 text-xs text-gray-400 dark:bg-gray-900/60 dark:text-gray-400"
                            >
                              No API keys found
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
                <span>Report Feedback</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1.5 rounded-full border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500 dark:border-gray-600 dark:text-gray-400"
                onClick={handleExport}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={currentLogs}
            emptyMessage="No transactions found. Try adjusting the date range or filters to see more data."
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="rounded-2xl"
          />
        </div>
      </DashboardLayout>

      {/* Report Feedback dialog */}
      <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <DialogContent className="w-full max-w-lg rounded-3xl">
          <DialogHeader className="items-start">
            <DialogTitle>Report Feedback</DialogTitle>
          </DialogHeader>
          <DialogBody className="space-y-5 text-[13px]">
            <p className="text-[12px] text-gray-500 dark:text-gray-400">
              Help us improve by reporting issues with this generation.
            </p>

            <form className="space-y-4" onSubmit={handleSubmitFeedback}>
              {/* Generation ID */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Generation ID
                </label>
                <Input
                  placeholder="Enter generation ID"
                  value={generationId}
                  onChange={(e) => setGenerationId(e.target.value)}
                  className="h-10 rounded-lg bg-gray-100 text-[13px] text-gray-600 placeholder:text-gray-400 dark:bg-gray-900/60 dark:text-gray-300"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <Select
                  value={feedbackCategory}
                  onValueChange={(value) => setFeedbackCategory(value)}
                >
                  <SelectTrigger className="h-10 w-full rounded-lg text-[13px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="incorrect-output">
                      Incorrect or low-quality output
                    </SelectItem>
                    <SelectItem value="safety">
                      Safety or policy concern
                    </SelectItem>
                    <SelectItem value="performance">
                      Latency or performance issue
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Comment */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Comment
                </label>
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-900/50">
                  <textarea
                    value={feedbackComment}
                    onChange={(e) =>
                      setFeedbackComment(e.target.value.slice(0, 1000))
                    }
                    placeholder="Describe the issue..."
                    className="h-24 w-full resize-none bg-transparent text-[13px] text-gray-900 placeholder:text-gray-400 outline-none dark:text-gray-100"
                  />
                  <div className="mt-1 text-right text-[11px] text-gray-400">
                    {commentCharCount}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full px-5 text-[13px]"
                  onClick={() => setIsFeedbackOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-full bg-[#a894ff] px-5 text-[13px] text-white hover:bg-[#9b86ff]"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
}