import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";
import { EmptyStateCard } from "@/components/EmptyStateCard";

export default function ApiKeysPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="API Keys">
        <EmptyStateCard
          icon={<span>🔑</span>}
          title="No API keys yet"
          description="Create API keys to authenticate requests from your apps to OpenRouter."
          action={<CreateApiKeyDialog />}
        />
      </DashboardLayout>
    </div>
  );
}