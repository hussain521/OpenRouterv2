import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { CreateManagementKeyDialog } from "@/components/CreateManagementKeyDialog";

export default function ManagementKeysPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Management Keys">
        <div className="pt-6 border-b border-gray-200 dark:border-gray-800 pb-4 flex items-center justify-between gap-4">
          <div className="flex-1" />
          <CreateManagementKeyDialog />
        </div>

        <div className="pt-4 flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400">
          <span>
            Create a management API key to perform administrative actions and
            manage inference API keys programmatically
          </span>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[11px] text-gray-400 dark:border-gray-600 dark:text-gray-500">
            i
          </span>
        </div>
      </DashboardLayout>
    </div>
  );
}