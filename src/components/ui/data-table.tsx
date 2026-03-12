import { type ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
  tooltip?: string;
  width?: number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

import { useTranslation } from "react-i18next";

export function DataTable<T>({
  columns,
  data,
  emptyMessage,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className,
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const defaultEmptyMessage = emptyMessage || t("common.noResults");
  // Convert columns to react-table format
  const tableColumns: ColumnDef<T>[] = columns.map((column) => ({
    id: column.header,
    header: () => (
      <div className="relative flex items-center gap-1 group py-1">
        <span className="truncate">{column.header}</span>
        {column.tooltip && (
          <div className="relative flex-shrink-0 group/tooltip">
            <Info className="h-3 w-3 text-gray-400 dark:text-gray-500 cursor-help hover:text-gray-600 dark:hover:text-gray-400 transition-colors" />
            <div className="absolute left-0 top-full mt-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 whitespace-normal pointer-events-none shadow-lg">
              {column.tooltip}
              <div className="absolute -top-1 left-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
            </div>
          </div>
        )}
      </div>
    ),
    accessorFn: (row) => {
      if (typeof column.accessor === "function") {
        return column.accessor(row);
      }
      return String(row[column.accessor] ?? "");
    },
    cell: ({ getValue }) => getValue(),
    size: column.width || 150,
    minSize: 50,
    maxSize: 500,
    enableResizing: true,
  }));

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    initialState: {
      columnSizing: {},
    },
  });

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisThreshold = 5;

    if (totalPages <= showEllipsisThreshold + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis1");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis2");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black",
        className,
      )}
    >
      <div className="w-full overflow-hidden">
        <style>{`
          /* Hide scrollbars */
          .table-container {
            overflow-x: auto;
            overflow-y: hidden;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }
          
          .table-container::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
          
          .resizer {
            position: absolute;
            right: -1px;
            top: 0;
            height: 100%;
            width: 3px;
            cursor: col-resize;
            user-select: none;
            touch-action: none;
            border-right: 1px solid rgba(229, 231, 235, 0.8);
            transition: all 0.2s ease;
          }
          
          .resizer:hover {
            width: 5px;
            border-right: 2px solid rgb(59, 130, 246);
            background: rgba(59, 130, 246, 0.1);
          }
          
          .resizer.isResizing {
            width: 5px;
            border-right: 2px solid rgb(59, 130, 246);
            background: rgba(59, 130, 246, 0.2);
          }
          
          /* Dark mode styles */
          .dark .resizer {
            border-right: 1px solid rgba(55, 65, 81, 0.8);
          }
          
          .dark .resizer:hover,
          .dark .resizer.isResizing {
            border-right: 2px solid rgb(59, 130, 246);
          }
        `}</style>
        <div className="table-container overflow-x-auto">
          <table
            className="relative w-full border-collapse text-left text-[11px] text-gray-700 dark:text-gray-300"
            style={{
              minWidth: table.getCenterTotalSize(),
            }}
          >
            <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-black/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400 relative group border-r border-gray-200 dark:border-gray-700 last:border-r-0"
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={cn(
                          "resizer",
                          header.column.getIsResizing() && "isResizing",
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
                    {defaultEmptyMessage}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 border-r border-gray-100 dark:border-gray-800 last:border-r-0"
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {onPageChange && totalPages > 1 && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-black/60 px-4 py-3">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && onPageChange(currentPage - 1)
                  }
                  className={cn(
                    "cursor-pointer text-[11px] h-8 px-3",
                    currentPage === 1 && "pointer-events-none opacity-50",
                  )}
                />
              </PaginationItem>

              {generatePageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {typeof page === "number" ? (
                    <PaginationLink
                      onClick={() => page !== currentPage && onPageChange(page)}
                      isActive={page === currentPage}
                      className={cn(
                        "cursor-pointer h-8 w-8 text-[11px]",
                        page === currentPage && "pointer-events-none",
                      )}
                    >
                      {page}
                    </PaginationLink>
                  ) : (
                    <PaginationEllipsis className="h-8 w-8" />
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                  }
                  className={cn(
                    "cursor-pointer text-[11px] h-8 px-3",
                    currentPage === totalPages &&
                      "pointer-events-none opacity-50",
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
