import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  children,
  className,
}: DialogProps) {
  const { t } = useTranslation();
  
  // Lock body scroll while dialog is open
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center sm:items-center justify-center bg-white/40 dark:bg-background/80 backdrop-blur-md p-4 sm:p-6",
        className,
      )}
    >
      {/* backdrop click to close */}
      <button
        type="button"
        aria-label={t("common.close")}
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>
  );
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export function DialogContent({
  children,
  className,
  showCloseButton = true,
  onClose,
}: DialogContentProps) {
  const { t } = useTranslation();
  
  return (
    <div
      className={cn(
        "relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-border bg-white/98 dark:bg-card/98 pt-8 sm:pt-10 pb-6 sm:pb-7 px-4 sm:px-6 lg:px-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)] max-h-[90vh] overflow-y-auto",
        className,
      )}
    >
      {showCloseButton && onClose && (
        <button
          type="button"
          aria-label={t("common.close")}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 z-20 inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-gray-200 dark:border-border bg-white/90 dark:bg-secondary/90 text-gray-400 dark:text-muted-foreground shadow-sm hover:text-gray-600 dark:hover:text-foreground focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
          onClick={onClose}
        >
          <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </button>
      )}
      {children}
    </div>
  );
}

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={cn("flex justify-center pr-4 sm:pr-6", className)}>{children}</div>;
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <h2
      className={cn(
        "text-sm sm:text-[15px] lg:text-base font-medium text-gray-900 dark:text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}

interface DialogBodyProps {
  children: ReactNode;
  className?: string;
}

export function DialogBody({ children, className }: DialogBodyProps) {
  return (
    <div
      className={cn(
        "space-y-3 sm:space-y-4 text-xs sm:text-[12px] lg:text-sm text-gray-700 dark:text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4", className)}>{children}</div>
  );
}
