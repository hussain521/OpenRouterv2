import { Info, Search, SquarePen } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";

export default function BYOKPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="BYOK">
        <div className="space-y-8 pt-4 text-[13px] text-gray-700">
          {/* Top: intro + search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1.5 text-gray-500">
              <p className="text-[13px]">
                Use your own provider API keys on OpenRouter
              </p>
              <Info className="h-3.5 w-3.5 text-gray-400" />
            </div>

            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search providers..."
                className="h-9 w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 text-[13px] text-gray-700 placeholder:text-gray-400 focus:border-gray-300 focus:bg-white dark:bg-black focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Provider list */}
          <section className="space-y-3">
            <h2 className="text-[13px] font-medium text-gray-500">Available</h2>

            <div className="mt-1 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-black text-[13px]">
              <div className="divide-y divide-gray-200">
                <ProviderRow
                  name="AI21"
                  status="Not configured"
                  iconColor="bg-[#ff007a]"
                  textColor="text-white"
                  iconText="a"
                />
                <ProviderRow
                  name="AionLabs"
                  status="Not configured"
                  iconColor="bg-[#e5e7eb]"
                  textColor="text-gray-700"
                  iconText="Ai"
                />
                <ProviderRow
                  name="Alibaba Cloud Int."
                  status="Not configured"
                  iconColor="bg-[#ff7a00]"
                  textColor="text-white"
                  iconText="↷"
                />
                <ProviderRow
                  name="Amazon Bedrock"
                  status="Not configured"
                  iconColor="bg-[#232f3e]"
                  textColor="text-white"
                  iconText="aws"
                />
                <ProviderRow
                  name="Anthropic"
                  status="Not configured"
                  iconColor="bg-[#f5f5e6]"
                  textColor="text-gray-900"
                  iconText="A"
                />
                <ProviderRow
                  name="Arcee AI"
                  status="Not configured"
                  iconColor="bg-[#00bfa5]"
                  textColor="text-white"
                  iconText="A"
                />
                <ProviderRow
                  name="AtlasCloud"
                  status="Not configured"
                  iconColor="bg-[#4f46e5]"
                  textColor="text-white"
                  iconText="A"
                />
                <ProviderRow
                  name="Azure"
                  status="Not configured"
                  iconColor="bg-[#0078d4]"
                  textColor="text-white"
                  iconText="A"
                />
                <ProviderRow
                  name="Baseten"
                  status="Not configured"
                  iconColor="bg-[#00c853]"
                  textColor="text-white"
                  iconText="⚡"
                />
                <ProviderRow
                  name="Cerebras"
                  status="Not configured"
                  iconColor="bg-[#ff3d00]"
                  textColor="text-white"
                  iconText="C"
                />
              </div>

              <button
                type="button"
                className="flex h-10 w-full items-center justify-center border-t border-gray-200 bg-gray-50 text-[12px] font-medium text-gray-600 hover:bg-gray-100"
              >
                Show 44 more
              </button>
            </div>
          </section>

          {/* Info footer */}
          <section className="space-y-4 pt-2 text-[13px] text-gray-600">
            <h3 className="text-[16px] font-medium text-gray-900">
              Key Priority and Fallback
            </h3>
            <div className="max-w-4xl space-y-3 leading-relaxed">
              <p>OpenRouter always prioritizes using your provider keys when available.</p>
              <p>
                By default, if your key encounters a rate limit or failure, OpenRouter will
                fall back to using shared OpenRouter credits.
              </p>
              <p>
                You can configure individual keys with "Always use this key" to
                prevent any fallback to OpenRouter credits. When this option is enabled,
                OpenRouter will only use your key for requests to that provider. This may
                result in rate limit errors if your key is exhausted, but ensures all
                requests go through your account.
              </p>
              <p>
                If you wish to never use shared OpenRouter credits for a model, you must{" "}
                <strong className="font-medium text-gray-800">
                  both specify "Always use this key" and pin the provider
                </strong>{" "}
                by specifying it as{" "}
                <a href="#" className="text-[#6366F1] hover:underline">
                  your only provider
                </a>{" "}
                when making the request.
              </p>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </div>
  );
}

type ProviderRowProps = {
  name: string;
  status: string;
  iconColor?: string;
  textColor?: string;
  iconText?: string;
};

function ProviderRow({
  name,
  status,
  iconColor = "bg-gray-100",
  textColor = "text-gray-800",
  iconText,
}: ProviderRowProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between px-5 py-3 text-left text-[13px] hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-semibold ${iconColor} ${textColor}`}
        >
          {iconText || name.charAt(0)}
        </div>
        <span className="text-[13px] text-gray-800">{name}</span>
      </div>
      <div className="flex items-center gap-3 text-[12px]">
        <span className="text-gray-400">{status}</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600">
          <SquarePen className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}