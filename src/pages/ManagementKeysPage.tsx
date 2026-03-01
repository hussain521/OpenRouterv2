import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { InfoActionCard } from "@/components/InfoActionCard";
import { Button } from "@/components/ui/button";

export default function ManagementKeysPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Management Keys">
        <div className="pt-6">
          <InfoActionCard
            title="Management keys"
            description="Create management keys to manage settings, permissions, and other controls for this organization. These keys are meant for admins only."
            action={
              <Button
                size="sm"
                className="rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]"
              >
                Create
              </Button>
            }
          />
        </div>
      </DashboardLayout>
    </div>
  );
}