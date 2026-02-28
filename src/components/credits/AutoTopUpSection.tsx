import { Switch } from "@/components/ui/switch";

interface AutoTopUpSectionProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  hasPaymentMethod: boolean;
}

export function AutoTopUpSection({ 
  enabled, 
  onToggle, 
  hasPaymentMethod 
}: AutoTopUpSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Auto Top-Up
        </p>
        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
          disabled={!hasPaymentMethod}
          className="data-[state=unchecked]:bg-gray-200"
        />
      </div>
      {!hasPaymentMethod && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-[11px] text-gray-600">
          <p className="font-medium text-gray-800">Add a Payment Method</p>
          <p className="mt-1 text-[11px] text-gray-500">
            To activate auto top-up, you'll need a payment method that
            supports offline charging.
          </p>
        </div>
      )}
    </div>
  );
}