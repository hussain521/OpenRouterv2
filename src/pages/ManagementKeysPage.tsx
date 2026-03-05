import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { CreateManagementKeyDialog } from "@/components/dialogs";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ManagementKeysPage() {
  const { t } = useTranslation();
  usePageTitle(t("settings.managementKeys"));
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
     setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title={t("settings.managementKeys")}>
        <div className="pt-6 border-b border-gray-200 dark:border-gray-800 pb-4 flex items-center justify-between gap-4">
          <div className="flex-1" />
          <Button
            type="button"
            size="sm"
            className="mt-2 rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]"
            onClick={handleOpenDialog}
          >
            {t("common.create")}
          </Button>
        </div>

        <div className="pt-4 flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400">
          <span>
            {t("managementKeys.description")}
          </span>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[11px] text-gray-400 dark:border-gray-600 dark:text-gray-500">
            i
          </span>
        </div>

        <CreateManagementKeyDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </DashboardLayout>
    </div>
  );
}