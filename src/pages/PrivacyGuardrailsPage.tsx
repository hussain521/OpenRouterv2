import { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { Switch } from "@/components/ui/switch";

type RowProps = {
  title: string;
  description: string;
  actionLabel: string;
};

type ToggleRowProps = {
  title: string;
  description: string;
  enabled?: boolean;
};

function Row({ title, description, actionLabel }: RowProps) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100">{title}</p>
        <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div className="shrink-0">
        <button className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 px-4 py-1.5 text-[11px] font-medium bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ title, description, enabled = false }: ToggleRowProps) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  
  return (
    <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100">{title}</p>
        <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div className="shrink-0">
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          className="data-[state=checked]:bg-[#4F46E5]"
        />
      </div>
    </div>
  );
}

function PrivacyGuardrailsContent() {
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      {/* Intro */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Privacy & Guardrails
        </h2>
        <p className="max-w-2xl text-[12px] text-gray-500 dark:text-gray-400">
          Configure how OpenRouter handles your data and applies safety filters for
          requests made from this organization.
        </p>
      </section>

      {/* Data handling */}
      <section className="space-y-4">
        <h3 className="text-[12px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Data handling
        </h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
          <ToggleRow
            title="Log requests for debugging"
            description="Store logs of requests and responses so you can inspect and debug issues later."
            enabled
          />
          <ToggleRow
            title="Send data to model providers"
            description="Allow model providers to retain data for improving their models, where applicable."
          />
          <Row
            title="Retention window"
            description="How long OpenRouter will retain logs and traces before automatic deletion."
            actionLabel="30 days"
          />
        </div>
      </section>

      {/* Safety filters */}
      <section className="space-y-4">
        <h3 className="text-[12px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Safety filters
        </h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
          <ToggleRow
            title="Block unsafe content"
            description="Filter prompts and responses that violate default safety policies."
            enabled
          />
          <ToggleRow
            title="PII redaction"
            description="Automatically redact common types of personally identifiable information in logs."
          />
          <ToggleRow
            title="Strict content guardrails"
            description="Apply stricter moderation rules for high‑risk use cases."
          />
        </div>
      </section>

      {/* Footer actions */}
      <section className="flex flex-col items-stretch justify-between gap-3 border-t border-gray-200 dark:border-gray-700 pt-4 text-[12px] text-gray-600 dark:text-gray-300 md:flex-row md:items-center">
        <button className="text-[12px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          Reset to defaults
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            Changes apply to new requests only.
          </span>
          <button className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-1.5 text-[12px] font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancel
          </button>
          <button className="rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]">
            Save changes
          </button>
        </div>
      </section>
    </div>
  );
}

export default function PrivacyGuardrailsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Privacy & Guardrails">
        <PrivacyGuardrailsContent />
      </DashboardLayout>
    </div>
  );
}