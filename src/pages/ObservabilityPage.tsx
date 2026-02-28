import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";

export default function ObservabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Observability">
        <ObservabilitySettingsContent />
      </DashboardLayout>
    </div>
  );
}

export function ObservabilitySettingsContent() {
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700">
      {/* Broadcast header */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Broadcast</h2>
          <div className="flex items-center gap-2 text-[12px] text-gray-400">
            <span>Disabled</span>
            <button
              type="button"
              className="relative inline-flex h-4 w-7 items-center rounded-full border border-transparent bg-gray-200"
            >
              <span className="absolute h-3 w-3 translate-x-[2px] rounded-full bg-white shadow transition-transform" />
            </button>
          </div>
        </div>
        <p className="max-w-2xl text-[12px] text-gray-500">
          Automatically send traces from your requests to external observability
          platforms without additional instrumentation.&nbsp;
          <button
            type="button"
            className="text-[12px] font-medium text-[#6366F1] hover:underline"
          >
            Learn more
          </button>
        </p>
      </section>

      {/* Available destinations list */}
      <section className="space-y-3">
        <h3 className="text-[12px] font-semibold uppercase tracking-wide text-gray-400">
          Available
        </h3>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="divide-y divide-gray-100">
            {DESTINATIONS.map((d) => (
              <DestinationRow
                key={d.name}
                name={d.name}
                iconBg={d.iconBg}
                iconEmoji={d.iconEmoji}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer feedback */}
      <section className="flex items-center justify-between pt-4 text-[12px] text-gray-500">
        <div className="space-y-0.5">
          <p className="font-medium text-gray-700">Send Feedback</p>
          <p>Let us know how we can improve!</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[11px] font-medium text-gray-700 hover:bg-gray-50">
          Open
        </button>
      </section>
    </div>
  );
}

type DestinationConfig = {
  name: string;
  iconBg: string;
  iconEmoji: string;
};

const DESTINATIONS: DestinationConfig[] = [
  { name: "Arize AI", iconBg: "bg-pink-100", iconEmoji: "🟣" },
  { name: "Braintrust", iconBg: "bg-sky-100", iconEmoji: "🧠" },
  { name: "ClickHouse", iconBg: "bg-yellow-100", iconEmoji: "📊" },
  { name: "Comet Opik", iconBg: "bg-indigo-100", iconEmoji: "☄️" },
  { name: "Datadog", iconBg: "bg-purple-100", iconEmoji: "🐶" },
  { name: "Grafana Cloud", iconBg: "bg-orange-100", iconEmoji: "📈" },
  { name: "Langfuse", iconBg: "bg-emerald-100", iconEmoji: "🧬" },
  { name: "LangSmith", iconBg: "bg-slate-100", iconEmoji: "🧩" },
  { name: "New Relic AI", iconBg: "bg-teal-100", iconEmoji: "🧿" },
  { name: "OpenTelemetry Collector", iconBg: "bg-amber-100", iconEmoji: "📡" },
  { name: "PostHog", iconBg: "bg-rose-100", iconEmoji: "🐷" },
  { name: "S3 / S3‑Compatible", iconBg: "bg-gray-100", iconEmoji: "🗄️" },
  { name: "Sentry", iconBg: "bg-red-100", iconEmoji: "🛟" },
  { name: "Snowflake", iconBg: "bg-blue-50", iconEmoji: "❄️" },
  { name: "W&B Weave", iconBg: "bg-yellow-50", iconEmoji: "🧶" },
  { name: "Webhook", iconBg: "bg-gray-50", iconEmoji: "🪝" },
];

type DestinationRowProps = {
  name: string;
  iconBg: string;
  iconEmoji: string;
};

function DestinationRow({ name, iconBg, iconEmoji }: DestinationRowProps) {
  return (
    <div className="flex items-center justify-between px-5 py-3 text-[13px] text-gray-700">
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex h-7 w-7 items-center justify-center rounded-md text-[13px]",
            iconBg,
          ].join(" ")}
        >
          <span className="leading-none">{iconEmoji}</span>
        </div>
        <span className="text-[13px] text-gray-800">{name}</span>
      </div>
      <button className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-medium text-gray-500 hover:bg-gray-50">
        <span>Add Destination</span>
        <span className="text-base leading-none">+</span>
      </button>
    </div>
  );
}