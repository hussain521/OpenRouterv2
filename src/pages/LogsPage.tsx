import { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { DatePicker } from "@/components/ui/date-picker";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

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
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000) // 24 hours ago
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [logs] = useState<LogEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    { header: "Timestamp", accessor: "timestamp" as keyof LogEntry },
    { header: "Provider / Model", accessor: "providerModel" as keyof LogEntry },
    { header: "App", accessor: "app" as keyof LogEntry },
    { header: "Tokens", accessor: "tokens" as keyof LogEntry },
    { header: "Cost", accessor: (log: LogEntry) => `$${log.cost.toFixed(4)}` },
    { header: "Speed", accessor: "speed" as keyof LogEntry },
    { header: "Finish", accessor: "finish" as keyof LogEntry },
    { header: "Actions", accessor: "actions" as keyof LogEntry },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Logs">
        <div className="space-y-4 pt-4">
          {/* Date range + actions row */}
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <span className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 mr-1">
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
                <span className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 mr-1">
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
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-gray-200 dark:border-gray-600 px-3 py-1.5 text-[11px] font-medium"
              >
                Filters
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-gray-200 dark:border-gray-600 px-3 py-1.5 text-[11px] font-medium"
              >
                Report Feedback
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-gray-200 dark:border-gray-600 px-3 py-1.5 text-[11px] font-medium"
              >
                Export
              </Button>
            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={logs}
            emptyMessage="No transactions found. Try adjusting the date range or filters to see more data."
            currentPage={currentPage}
            totalPages={1}
            onPageChange={setCurrentPage}
            className="rounded-2xl"
          />
        </div>
      </DashboardLayout>
    </div>
  );
}