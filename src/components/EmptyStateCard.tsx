import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateCardProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyStateCard({ 
  icon, 
  title, 
  description, 
  action,
  className 
}: EmptyStateCardProps) {
  return (
    <div className={cn("flex h-full items-center justify-center pt-10", className)}>
      <div className="flex flex-col items-center space-y-3 text-center">
        {icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-2xl text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <h2 className="text-[15px] font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {description && (
          <p className="max-w-sm text-[12px] text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
        {action && action}
      </div>
    </div>
  );
}