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
        "fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/80 backdrop-blur-md",
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
        "relative z-10 w-full max-w-md rounded-3xl border border-gray-100 dark:border-gray-700 bg-white/98 dark:bg-black/98 pt-10 pb-7 px-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]",
        className,
      )}
    >
      {showCloseButton && onClose && (
        <button
          type="button"
          aria-label={t("common.close")}
          className="absolute right-4 top-4 z-20 inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 bg-white/90 dark:bg-gray-700/90 text-gray-400 dark:text-gray-500 shadow-sm hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          onClick={onClose}
        >
          <X className="h-3.5 w-3.5" />
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
  return <div className={cn("flex justify-center pr-6", className)}>{children}</div>;
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <h2
      className={cn(
        "text-[15px] font-medium text-gray-900 dark:text-gray-100",
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
        "space-y-4 text-[12px] text-gray-700 dark:text-gray-300",
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
    <div className={cn("flex justify-end pt-4", className)}>{children}</div>
  );
}
