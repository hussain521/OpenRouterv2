import SectionHeader from "./SectionHeader";
import ExploreCard from "./ExploreCard";
import AnnouncementCard from "./AnnouncementCard";

export default function RecentAnnouncements() {
  return (
    <section className="py-8 md:py-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {/* Left Side */}
        <div className="h-full flex flex-col gap-4 md:gap-6">
          <div className="flex-1">
            <ExploreCard
              title="Explore Models"
              description="Discover AI models across our collection, from all major labs and providers."
              linkText="View models"
            />
          </div>

          <div className="flex-1">
            <ExploreCard
              title="Model & App Rankings"
              description="Explore token usage across models, labs, and public applications."
              linkText="View rankings"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2">
          <SectionHeader title="Recent Announcements" viewAll />

          <div className="space-y-4 md:space-y-6">
            <AnnouncementCard
              title="Distillable Models and Synthetic Data Pipelines with NeMo Data Designer"
              description="How to generate license-safe synthetic data workflows for model specialization."
              date="12/24/2025"
            />

            <AnnouncementCard
              title="Response Healing: Reduce JSON Defects by 80%+"
              description="Today we're launching Response Healing, a new feature..."
              date="12/18/2025"
            />

            <AnnouncementCard
              title="The 2025 State of AI Report"
              description="Introducing the 2025 State of AI Report..."
              date="12/4/2025"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
