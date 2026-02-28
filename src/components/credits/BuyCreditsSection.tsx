import { Button } from "@/components/ui/button";

interface BuyCreditsSectionProps {
  onAddCredits: () => void;
  onViewUsage: () => void;
}

export function BuyCreditsSection({ onAddCredits, onViewUsage }: BuyCreditsSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Buy Credits
        </p>
        <span className="text-[11px] text-gray-400">Use Stripe</span>
      </div>
      <Button 
        className="h-9 w-full rounded-full bg-[#4F46E5] text-[12px] font-medium text-white hover:bg-[#4338CA]"
        onClick={onAddCredits}
      >
        Add Credits
      </Button>
      <p className="text-[11px] text-gray-500">
        View usage & OT{" "}
        <button 
          className="text-[11px] font-medium text-[#4F46E5] underline-offset-2 hover:underline"
          onClick={onViewUsage}
        >
          See usage & OT
        </button>
      </p>
    </div>
  );
}