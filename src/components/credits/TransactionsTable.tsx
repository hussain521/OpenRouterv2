import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  balance: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  filterType: "all" | "credits" | "debits";
  onFilterChange: (type: "all" | "credits" | "debits") => void;
}

export function TransactionsTable({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
  filterType,
  onFilterChange,
}: TransactionsTableProps) {
  const filters = [
    { value: "all" as const, label: "All" },
    { value: "credits" as const, label: "Credits" },
    { value: "debits" as const, label: "Debits" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between pb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Recent Transactions
        </p>
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                "rounded-full border px-2.5 py-1",
                filterType === filter.value
                  ? "border-gray-300 bg-white text-gray-700"
                  : "border-gray-200 bg-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-[11px] text-gray-700">
            <thead className="border-b border-gray-200 bg-gray-50/60">
              <tr>
                <th className="px-4 py-2 font-medium text-gray-500">Date</th>
                <th className="px-4 py-2 font-medium text-gray-500">
                  Description
                </th>
                <th className="px-4 py-2 font-medium text-gray-500">Amount</th>
                <th className="px-4 py-2 font-medium text-gray-500">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-[11px] text-gray-400"
                  >
                    No results
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="px-4 py-3">{transaction.date}</td>
                    <td className="px-4 py-3">{transaction.description}</td>
                    <td className="px-4 py-3">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      ${transaction.balance.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-gray-200 bg-gray-50/60 px-4 py-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-7 w-7 rounded-full p-0 text-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-gray-800 border border-gray-200">
            {currentPage} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-7 w-7 rounded-full p-0 text-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}