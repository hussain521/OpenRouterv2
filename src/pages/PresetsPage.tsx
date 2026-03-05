import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { EmptyStateCard } from "@/components/EmptyStateCard";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function PresetsPage() {
  const { t } = useTranslation();
  usePageTitle(t("settings.presets"));
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleCreatePreset = () => {
    // Check if we're in settings path
    if (location.pathname.includes('/settings/')) {
      navigate('/settings/new-preset');
    } else {
      navigate('/new-preset');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title={t("settings.presets")}>
        <EmptyStateCard
          title={t("presets.emptyState.title")}
          description={
            <>
              {t("presets.emptyState.description")}{" "}
              <a href="#" className="text-[#6366F1] hover:underline">
                {t("presets.emptyState.learnMore")}
              </a>
            </>
          }
          action={
            <Button
              size="default"
              className="mt-3 rounded-md bg-[#6366F1] px-6 py-2 text-[13px] font-medium text-white hover:bg-[#4F46E5]"
              onClick={handleCreatePreset}
            >
              {t("presets.createPreset")}
            </Button>
          }
          className="py-24"
        />
      </DashboardLayout>
    </div>
  );
}
