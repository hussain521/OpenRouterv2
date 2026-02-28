import { type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
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

export function DataTable<T>({
  columns,
  data,
  emptyMessage = "No results",
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className,
}: DataTableProps<T>) {
  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(item);
    }
    return String(item[column.accessor] ?? "");
  };

  return (
    <div className={cn("overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900", className)}>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-[11px] text-gray-700 dark:text-gray-300">
          <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className={cn("px-4 py-2 font-medium text-gray-500 dark:text-gray-400", column.className)}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-[11px] text-gray-400 dark:text-gray-600"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={cn("px-4 py-3", column.className)}
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {onPageChange && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60 px-4 py-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-7 w-7 rounded-full p-0 text-gray-300 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="rounded-full bg-white dark:bg-gray-800 px-3 py-1 text-[11px] font-medium text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
            {currentPage} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-7 w-7 rounded-full p-0 text-gray-300 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}