import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Plus,
  Search,
  PanelLeft,
  PanelRight,
} from "lucide-react";

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat?: () => void;
  onAddModel?: () => void;
  isAddingModel?: boolean;
}

export function ChatSidebar({
  isOpen,
  onToggle,
  onNewChat,
  onAddModel,
  isAddingModel = false,
}: ChatSidebarProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Top control bar */}
      <div className="pointer-events-auto absolute w-full border-y z-20 flex items-center gap-2 bg-white px-3 py-3 dark:bg-black">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
          aria-label={
            isOpen ? t("common.closeButton") : t("common.open", "Open")
          }
        >
          {isOpen ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelRight className="h-4 w-4" />
          )}
        </button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNewChat}
          className="h-8 rounded-full border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
        >
          <MessageSquare className="mr-1 h-4 w-4" />
          {t("chatPage.newChat", "New Chat")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddModel}
          disabled={isAddingModel}
          className="h-8 rounded-full border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
        >
          <Plus className="mr-1 h-4 w-4" />
          {isAddingModel
            ? t("chatPage.addingModel", "Adding...")
            : t("chatPage.addModel", "Add Model")}
        </Button>
      </div>

      {/* Sidebar content */}
      <aside
        className={`hidden h-full shrink-0 border-r border-gray-200 bg-white pt-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-black md:flex md:flex-col transition-[width,padding] duration-200 ${
          isOpen ? "w-64 px-4" : "w-14 px-2"
        }`}
      >
        {isOpen ? (
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
    </>
  );
}