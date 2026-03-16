import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const suggestionCards = [
  { titleKey: "chatPage.suggestions.lifestyle.title", descriptionKey: "chatPage.suggestions.lifestyle.description" },
  { titleKey: "chatPage.suggestions.smallBusiness.title", descriptionKey: "chatPage.suggestions.smallBusiness.description" },
  { titleKey: "chatPage.suggestions.educational.title", descriptionKey: "chatPage.suggestions.educational.description" },
  { titleKey: "chatPage.suggestions.nineNine.title", descriptionKey: "chatPage.suggestions.nineNine.description" },
  { titleKey: "chatPage.suggestions.strawberry.title", descriptionKey: "chatPage.suggestions.strawberry.description" },
];

export function SuggestionsCarousel() {
  const { t } = useTranslation();
  const suggestionsScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollSuggestions = (direction: "left" | "right") => {
    const container = suggestionsScrollRef.current;
    if (!container) return;
    const offset = direction === "left" ? -260 : 260;
    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
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
  );
}