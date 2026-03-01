import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SettingsRowProps {
  title: string;
  description: string;
  action?: ReactNode;
  actionLabel?: string;
  actionVariant?: "default" | "primary";
  onAction?: () => void;
}

export function SettingsRow({ 
  title, 
  description, 
  action,
  actionLabel,
  actionVariant = "default",
  onAction 
}: SettingsRowProps) {
  const buttonClasses = actionVariant === "primary"
    ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600";

  return (
    <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100">{title}</p>
        <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {(action || actionLabel) && (
        <div className="shrink-0">
          {action || (
            <Button
              size="sm"
              onClick={onAction}
              className={cn(
                "rounded-full border border-gray-200 dark:border-gray-600 px-4 py-1.5 text-[11px] font-medium",
                buttonClasses
              )}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}