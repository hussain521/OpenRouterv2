import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ActivityPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.activity"));
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title={t("nav.activity")} />
    </div>
  );
}