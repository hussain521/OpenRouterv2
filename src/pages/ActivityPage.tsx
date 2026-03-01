import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Activity" />
    </div>
  );
}