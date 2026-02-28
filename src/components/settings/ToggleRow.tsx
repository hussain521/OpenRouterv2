import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface ToggleRowProps {
  title: string;
  description: string;
  defaultEnabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

export function ToggleRow({ 
  title, 
  description, 
  defaultEnabled = false,
  onToggle 
}: ToggleRowProps) {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  
  const handleToggle = (enabled: boolean) => {
    setIsEnabled(enabled);
    onToggle?.(enabled);
  };
  
  return (
    <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <p className="text-[13px] font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-[12px] text-gray-500">{description}</p>
      </div>
      <div className="shrink-0">
        <Switch
          checked={isEnabled}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-[#4F46E5]"
        />
      </div>
    </div>
  );
}