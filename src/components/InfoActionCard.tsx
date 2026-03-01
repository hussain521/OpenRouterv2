import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoActionCardProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function InfoActionCard({
  title,
  description,
  action,
  className,
}: InfoActionCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6 py-4 text-[13px] text-gray-700 dark:text-gray-300 md:flex-row md:items-center cursor-pointer",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2 className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
}
