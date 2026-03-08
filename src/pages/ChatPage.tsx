import Navbar from "@/components/Navbar";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Plus,
  Search,
  Mic,
  Image,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Sparkles,
  ArrowUp,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";

const presetSections = [
  { titleKey: "chatPage.flagshipModels" },
  { titleKey: "chatPage.bestRoleplayModels" },
  { titleKey: "chatPage.bestCodingModels" },
  { titleKey: "chatPage.reasoningModels" },
];

const suggestionCards = [
  { titleKey: "chatPage.suggestions.lifestyle.title", descriptionKey: "chatPage.suggestions.lifestyle.description" },
  { titleKey: "chatPage.suggestions.smallBusiness.title", descriptionKey: "chatPage.suggestions.smallBusiness.description" },
  { titleKey: "chatPage.suggestions.educational.title", descriptionKey: "chatPage.suggestions.educational.description" },
  { titleKey: "chatPage.suggestions.nineNine.title", descriptionKey: "chatPage.suggestions.nineNine.description" },
  { titleKey: "chatPage.suggestions.strawberry.title", descriptionKey: "chatPage.suggestions.strawberry.description" },
];

export default function ChatPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.chat"));

  const suggestionsScrollRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const scrollSuggestions = (direction: "left" | "right") => {
    const container = suggestionsScrollRef.current;
    if (!container) return;
    const offset = direction === "left" ? -260 : 260;
    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Top navbar */}
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      {/* Main layout under navbar */}
      <div className="relative flex h-[calc(100vh-72px)] bg-white dark:bg-black">
        {/* Top control bar: sidebar toggle + actions, same background as aside */}
        <div className="pointer-events-auto absolute w-full border-y   z-20 flex items-center gap-2  bg-white px-3 py-3  dark:bg-black">
          <button
            type="button"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
            aria-label={
              isSidebarOpen ? t("common.closeButton") : t("common.open", "Open")
            }
          >
            {isSidebarOpen ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelRight className="h-4 w-4" />
            )}
          </button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
          >
            <MessageSquare className="mr-1 h-4 w-4" />
            {t("chatPage.newChat")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
          >
            <Plus className="mr-1 h-4 w-4" />
            {t("chatPage.addModel")}
          </Button>
        </div>

        {/* Content row under top control bar */}
        <div className="flex h-full w-full pt-12">
          {/* Left sidebar (collapsible width, icons visible when collapsed) */}
          <aside
            className={`hidden h-full shrink-0 border-r border-gray-200 bg-white pt-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-black md:flex md:flex-col transition-[width,padding] duration-200 ${
              isSidebarOpen ? "w-64 px-4" : "w-14 px-2"
            }`}
          >
            {isSidebarOpen ? (
              <>
                <div className="relative mb-4">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder={t("chatPage.searchRooms")}
                    className="h-9 rounded-lg border-gray-200 bg-gray-50 pl-8 text-xs text-gray-700 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                  />
                </div>

                <div className="mt-4 flex-1 select-none text-xs text-gray-400 dark:text-gray-600">
                  {t("chatPage.noMatchingRooms")}
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-start gap-4 pt-2 text-gray-400 dark:text-gray-500">
                <MessageSquare className="h-4 w-4" />
                <Plus className="h-4 w-4" />
              </div>
            )}
          </aside>

          {/* Main content area */}
          <main className="flex min-w-0 flex-1 flex-col items-center rounded-tl-lg bg-[#F5F5FB] shadow-sm dark:bg-neutral-900 px-3 pb-2 pt-3 md:px-6">
            {/* Preset model sections */}
            <div className="grid w-full max-w-4xl grid-cols-1 gap-2.5 md:grid-cols-2">
              {presetSections.map((section) => (
                <Card
                  key={section.titleKey}
                  className="h-24 rounded-2xl border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-black"
                >
                  <CardContent className="flex h-full flex-col justify-between px-4 py-3.5">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {t(section.titleKey)}
                    </div>
                    <div className="flex justify-end gap-1.5">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[10px] font-semibold text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                        A
                      </span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-[10px] font-semibold text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
                        M
                      </span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                        ●
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Suggestions carousel */}
            <section className="mt-4 w-full max-w-3xl">
              <div className="relative group">
                {/* Arrows overlayed above cards, hidden until hover */}
                <button
                  type="button"
                  onClick={() => scrollSuggestions("left")}
                  className="pointer-events-none absolute left-0 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 opacity-0 shadow-sm transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:border-gray-700 dark:bg-black dark:text-gray-300"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSuggestions("right")}
                  className="pointer-events-none absolute right-0 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 opacity-0 shadow-sm transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:border-gray-700 dark:bg-black dark:text-gray-300"
                  aria-label="Next"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>

                <div
                  ref={suggestionsScrollRef}
                  className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1"
                >
                  {suggestionCards.map((card) => (
                    <Card
                      key={card.titleKey}
                      className="min-w-[190px] rounded-2xl border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-800 shadow-sm dark:border-gray-800 dark:bg-black dark:text-gray-100"
                    >
                      <div className="truncate text-[13px] font-medium text-gray-900 dark:text-gray-100">
                        {t(card.titleKey)}
                      </div>
                      <div className="mt-1 truncate text-[11px] text-gray-500 dark:text-gray-400">
                        {t(card.descriptionKey)}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Chat input bar */}
            <section className="mt-auto flex w-full max-w-3xl flex-col gap-1 pb-2.5 pt-3">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 rounded-full bg-white px-3 text-[11px] font-medium text-gray-600 shadow-sm hover:bg-gray-50 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                >
                  <Sparkles className="mr-1 h-3.5 w-3.5 text-purple-500" />
                  {t("chatPage.createArtifact")}
                </Button>
              </div>

              <Card className="rounded-2xl border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-black">
                <CardContent className="px-2.5 pt-2 pb-1.5">
                  <Textarea
                    placeholder={t("chatPage.startMessage")}
                    className="min-h-[44px] resize-none border-0 bg-transparent p-0 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 dark:text-gray-100 dark:placeholder:text-gray-500"
                  />

                  <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                        <Mic className="h-3.5 w-3.5" />
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                        <Image className="h-3.5 w-3.5" />
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                        <Paperclip className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-100">
                          A
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">
                          {t("chatPage.auto")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <MessageSquare className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                        <span>8</span>
                      </div>
                      <button className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                        <Globe2 className="h-3 w-3" />
                        <span>{t("chatPage.global")}</span>
                      </button>
                      <Button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6467F2] p-0 hover:bg-indigo-600 dark:bg-[#6366F1] dark:hover:bg-indigo-500">
                        <ArrowUp className="h-3.5 w-3.5 text-white" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}