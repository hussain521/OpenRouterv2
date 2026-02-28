import { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { Settings as SettingsIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function PluginsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Plugins">
        <PluginsSettingsContent />
      </DashboardLayout>
    </div>
  );
}

export function PluginsSettingsContent() {
  return (
    <div className="space-y-6 pt-6 text-[13px] text-gray-700">
      {/* Intro */}
      <section className="space-y-1">
        <h2 className="text-[13px] font-medium text-gray-900">
          Default Plugin Settings
        </h2>
        <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400">
            i
          </span>
          <span>Configure default plugin behavior for your API requests.</span>
        </div>
      </section>

      {/* Plugins list card */}
      <section>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white text-[13px]">
          <PluginRow
            name="Web Search"
            description="Augment LLM responses with real-time web search results"
            hasToggle={false}
          />
          <PluginRow
            name="PDF Inputs"
            description="Parse and extract content from uploaded PDF files"
            hasToggle={false}
          />
          <PluginRow
            name="Response Healing"
            description="Automatically fix malformed JSON responses from LLMs"
            hasToggle
          />
        </div>
      </section>
    </div>
  );
}

type PluginRowProps = {
  name: string;
  description: string;
  hasToggle?: boolean;
};

function PluginRow({ name, description, hasToggle }: PluginRowProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t first:border-t-0 border-gray-200">
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-gray-900">{name}</span>
        <span className="mt-0.5 text-[12px] text-gray-500">{description}</span>
      </div>
      <div className="flex items-center gap-4">
        {hasToggle && (
          <Switch
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
            className="data-[state=checked]:bg-[#4F46E5]"
          />
        )}
        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          <SettingsIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}