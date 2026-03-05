import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef, ColumnResizeMode } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  balance: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export function TransactionsTable({
  transactions,
  setTransactions,
}: TransactionsTableProps) {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<"all" | "credits" | "debits">("all");
  const [columnResizeMode] = useState<ColumnResizeMode>("onChange");

  const columnHelper = {
    date: t("credits.transactions.dateTooltip"),
    description: t("credits.transactions.descriptionTooltip"),
    amount: t("credits.transactions.amountTooltip"),
    balance: t("credits.transactions.balanceTooltip"),
  };

  const filters = [
    { value: "all" as const, label: t("credits.transactions.all") },
    { value: "credits" as const, label: t("credits.transactions.credits") },
    { value: "debits" as const, label: t("credits.transactions.debits") },
  ];

  const filteredData = useMemo(() => {
    if (filterType === "all") return transactions;
    if (filterType === "credits") return transactions.filter((t) => t.amount > 0);
    if (filterType === "debits") return transactions.filter((t) => t.amount < 0);
    return transactions;
  }, [transactions, filterType]);

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        header: t("credits.transactions.date"),
        accessorKey: "date",
        size: 120,
        minSize: 80,
        maxSize: 200,
      },
      {
        header: t("credits.transactions.description"),
        accessorKey: "description",
        size: 300,
        minSize: 150,
      },
      {
        header: t("credits.transactions.amount"),
        accessorKey: "amount",
        size: 120,
        minSize: 80,
        maxSize: 200,
        cell: ({ getValue }) => {
          const amount = getValue() as number;
          return (
            <span className={amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              ${Math.abs(amount).toFixed(2)}
            </span>
          );
        },
      },
      {
        header: t("credits.transactions.balance"),
        accessorKey: "balance",
        size: 120,
        minSize: 80,
        maxSize: 200,
        cell: ({ getValue }) => {
          const balance = getValue() as number;
          return `$${balance.toFixed(2)}`;
        },
      },
    ],
    [t]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    
    if (pageCount <= maxVisible) {
      for (let i = 1; i <= pageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => table.setPageIndex(i - 1)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => table.setPageIndex(0)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(pageCount - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => table.setPageIndex(i - 1)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < pageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={pageCount}>
          <PaginationLink
            onClick={() => table.setPageIndex(pageCount - 1)}
            isActive={currentPage === pageCount}
            className="cursor-pointer"
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <TooltipProvider>
      <div>
        <div className="flex items-center justify-between pb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {t("credits.recentTransactions")}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value)}
                className={cn(
                  "rounded-full border px-3 py-1 transition-colors",
                  filterType === filter.value
                    ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="relative overflow-x-auto">
            <table
              className="w-full border-collapse text-left text-[11px] text-gray-700 dark:text-gray-300"
              style={{ width: table.getCenterTotalSize() }}
            >
              <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-black/60">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="relative border-r border-gray-200 dark:border-gray-700 px-4 py-3 font-medium text-gray-500 dark:text-gray-400 last:border-r-0"
                        style={{ width: header.getSize() }}
                      >
                        <div className="flex items-center gap-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 cursor-help text-gray-400 dark:text-gray-500 opacity-0 hover:opacity-100 transition-opacity" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">
                                {columnHelper[header.column.id as keyof typeof columnHelper]}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none hover:bg-gray-400 dark:hover:bg-gray-600",
                            header.column.getIsResizing() && "bg-gray-500 dark:bg-gray-500"
                          )}
                        />
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-8 text-center text-[11px] text-gray-400 dark:text-gray-600"
                    >
                      {t("credits.transactions.noResults")}
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 last:border-0"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="border-r border-gray-100 dark:border-gray-800 px-4 py-3 last:border-r-0"
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pageCount > 1 && (
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-black/60 px-4 py-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => table.previousPage()}
                      className={cn(
                        "cursor-pointer",
                        !table.getCanPreviousPage() && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                  {renderPaginationItems()}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => table.nextPage()}
                      className={cn(
                        "cursor-pointer",
                        !table.getCanNextPage() && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
