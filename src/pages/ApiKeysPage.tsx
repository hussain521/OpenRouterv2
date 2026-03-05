import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";
import { EmptyStateCard } from "@/components/EmptyStateCard";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ApiKeysPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.apiKeys"));
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title={t("nav.apiKeys")}>
        <EmptyStateCard
          icon={<span>🔑</span>}
          title={t("apiKeysPage.emptyState.title")}
          description={t("apiKeysPage.emptyState.description")}
          action={<CreateApiKeyDialog />}
        />
      </DashboardLayout>
    </div>
  );
}