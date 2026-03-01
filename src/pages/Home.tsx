import { useState, useEffect } from "react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedModels from "@/components/FeaturedModels";
import FeaturedAgents from "@/components/FeaturedAgents";
import RecentAnnouncements from "@/components/RecentAnnouncements";
import GettingStarted from "@/components/GettingStarted";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { useView } from "@/context/ViewContext";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { view } = useView();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <TopBanner />
      </div>
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      {view === "home" ? (
        <>
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <FeaturedModels />
          <FeaturedAgents />
          {/* Top Steps Section */}
          <GettingStarted />
          {/* Explore + Announcements */}
          <RecentAnnouncements />
          <Footer />
        </>
      ) : (
        <DashboardLayout title="Activity" />
      )}
    </div>
  );
}
