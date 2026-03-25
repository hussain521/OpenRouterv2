import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const suggestionCards = [
  {
    titleKey: "chatPage.suggestions.lifestyle.title",
    descriptionKey: "chatPage.suggestions.lifestyle.description",
    suggestion: "Help me plan a healthy weekly meal prep routine"
  },
  {
    titleKey: "chatPage.suggestions.smallBusiness.title",
    descriptionKey: "chatPage.suggestions.smallBusiness.description",
    suggestion: "Create a marketing strategy for my small business"
  },
  {
    titleKey: "chatPage.suggestions.educational.title",
    descriptionKey: "chatPage.suggestions.educational.description",
    suggestion: "Explain quantum physics in simple terms"
  },
  {
    titleKey: "chatPage.suggestions.nineNine.title",
    descriptionKey: "chatPage.suggestions.nineNine.description",
    suggestion: "Solve this math problem: 9.9 x 9.9"
  },
  {
    titleKey: "chatPage.suggestions.strawberry.title",
    descriptionKey: "chatPage.suggestions.strawberry.description",
    suggestion: "Count the number of 'r' letters in the word strawberry"
  },
];

interface SuggestionsCarouselProps {
  onSuggestionClick?: (suggestion: string) => void;
}

export function SuggestionsCarousel({ onSuggestionClick }: SuggestionsCarouselProps) {
  const { t } = useTranslation();
  const suggestionsScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollSuggestions = (direction: "left" | "right") => {
    const container = suggestionsScrollRef.current;
    if (!container) return;
    const offset = direction === "left" ? -260 : 260;
    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
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
              onClick={() => handleSuggestionClick(card.suggestion)}
              className="min-w-[190px] rounded-2xl border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-800 shadow-sm cursor-pointer hover:shadow-md transition-shadow dark:border-gray-800 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-950"
            >
              <div className="truncate text-[13px] font-medium text-gray-900 dark:text-gray-100">
                {t(card.titleKey, card.titleKey.replace('chatPage.suggestions.', '').replace('.title', ''))}
              </div>
              <div className="mt-1 truncate text-[11px] text-gray-500 dark:text-gray-400">
                {t(card.descriptionKey, card.descriptionKey.replace('chatPage.suggestions.', '').replace('.description', ''))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}