import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface AutoTopUpSectionProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  hasPaymentMethod: boolean;
  onAddPaymentMethod: () => void;
}

export function AutoTopUpSection({
  enabled,
  onToggle,
  hasPaymentMethod,
  onAddPaymentMethod,
}: AutoTopUpSectionProps) {
  return (
    <div className="space-y-4 px-5 py-4 ">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Auto Top-Up
          </p>
          <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
            Automatically add credits when balance is low
          </p>
        </div>
        <Switch
          id="auto-topup"
          checked={enabled}
          onCheckedChange={onToggle}
          disabled={!hasPaymentMethod}
          className={`${
            !hasPaymentMethod ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </div>

      {enabled && hasPaymentMethod && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-3">
          <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
            Auto Top-Up Active
          </p>
          <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
            Credits will be automatically added when your balance drops below
            $10.
          </p>
        </div>
      )}

      {!hasPaymentMethod && (
        <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 px-4 py-3">
          <p className="text-[11px] font-medium text-gray-800 dark:text-gray-200">
            Add a Payment Method
          </p>
          <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
            To activate auto top-up, you'll need a payment method that supports
            offline charging.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-3 h-8 rounded-md border-gray-300 dark:border-gray-600 px-3 text-[11px] font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onAddPaymentMethod}
          >
            Add a Payment Method
          </Button>
        </div>
      )}
    </div>
  );
}
