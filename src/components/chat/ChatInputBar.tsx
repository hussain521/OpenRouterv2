import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Mic,
  Image,
  Paperclip,
  MessageSquare,
  Globe2,
  Sparkles,
  ArrowUp,
} from "lucide-react";

export function ChatInputBar() {
  const { t } = useTranslation();

  return (
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
  );
}