import SectionHeader from "./SectionHeader";
import ExploreCard from "./ExploreCard";
import AnnouncementCard from "./AnnouncementCard";
import { useTranslation } from "react-i18next";

export default function RecentAnnouncements() {
  const { t } = useTranslation();
  
  return (
    <section className="py-8 md:py-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {/* Left Side */}
        <div className="h-full flex flex-col gap-4 md:gap-6">
          <div className="flex-1">
            <ExploreCard
              title={t("explore.models.title")}
              description={t("explore.models.description")}
              linkText={t("explore.models.linkText")}
            />
          </div>

          <div className="flex-1">
            <ExploreCard
              title={t("explore.rankings.title")}
              description={t("explore.rankings.description")}
              linkText={t("explore.rankings.linkText")}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2">
          <SectionHeader title={t("announcements.title")} viewAll />

          <div className="space-y-4 md:space-y-6">
            <AnnouncementCard
              title={t("announcements.items.nemo.title")}
              description={t("announcements.items.nemo.description")}
              date="12/24/2025"
            />

            <AnnouncementCard
              title={t("announcements.items.responseHealing.title")}
              description={t("announcements.items.responseHealing.description")}
              date="12/18/2025"
            />

            <AnnouncementCard
              title={t("announcements.items.aiReport.title")}
              description={t("announcements.items.aiReport.description")}
              date="12/4/2025"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
