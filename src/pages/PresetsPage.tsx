import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { EmptyStateCard } from "@/components/EmptyStateCard";
import { Button } from "@/components/ui/button";

export default function PresetsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Presets">
        <EmptyStateCard
          title="Create your first preset"
          description={
            <>
              Presets are shortcuts for your system prompts and request parameters.{" "}
              <a href="#" className="text-[#6366F1] hover:underline">
                Learn more.
              </a>
            </>
          }
          action={
            <Button
              size="default"
              className="mt-3 rounded-md bg-[#6366F1] px-6 py-2 text-[13px] font-medium text-white hover:bg-[#4F46E5]"
            >
              Create Preset
            </Button>
          }
          className="py-24"
        />
      </DashboardLayout>
    </div>
  );
}