 import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BalanceCardProps {
  balance: number;
  onRefresh?: () => void;
}

export function BalanceCard({ balance, onRefresh }: BalanceCardProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/70 px-5 py-4">
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Balance
        </span>
        <span className="text-3xl font-semibold text-gray-900">
          $ {balance.toFixed(2)}
        </span>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="h-7 w-7 rounded-full p-0 text-gray-300 hover:bg-gray-100"
        onClick={onRefresh}
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}