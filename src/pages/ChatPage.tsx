import { useState } from "react";
import Navbar from "@/components/Navbar";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useTranslation } from "react-i18next";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { PresetModelSections } from "@/components/chat/PresetModelSections";
import { SuggestionsCarousel } from "@/components/chat/SuggestionsCarousel";
import { ChatInputBar } from "@/components/chat/ChatInputBar";

export default function ChatPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.chat"));

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Top navbar */}
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      {/* Main layout under navbar */}
      <div className="relative flex h-[calc(100vh-72px)] bg-white dark:bg-black overflow-hidden">
        {/* Content row under top control bar */}
        <div className="flex h-full w-full pt-8 sm:pt-12">
          {/* Sidebar */}
          <ChatSidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />

          {/* Main content area */}
          <main className="flex min-w-0 flex-1 flex-col items-center rounded-tl-lg bg-[#F5F5FB] shadow-sm dark:bg-neutral-900 px-2 sm:px-3 pb-2 pt-2 sm:pt-3 md:px-6">
            {/* Preset model sections */}
            <div className="w-full max-w-4xl">
              <PresetModelSections />
            </div>

            {/* Suggestions carousel */}
            <div className="w-full max-w-4xl">
              <SuggestionsCarousel />
            </div>

            {/* Chat input bar */}
            <div className="w-full max-w-4xl">
              <ChatInputBar />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}