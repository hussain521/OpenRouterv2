import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface ReportFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportFeedbackDialog({ open, onOpenChange }: ReportFeedbackDialogProps) {
  const { t } = useTranslation();
  const [generationId, setGenerationId] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState<string | undefined>();
  const [feedbackComment, setFeedbackComment] = useState("");

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to backend
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg rounded-3xl" onClose={() => onOpenChange(false)}>
        <DialogHeader className="items-start">
          <DialogTitle>{t("feedback.reportFeedback.title")}</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-5 text-[13px]">
          <p className="text-[12px] text-gray-500 dark:text-gray-400">
            {t("feedback.reportFeedback.description")}
          </p>

          <form className="space-y-4" onSubmit={handleSubmitFeedback}>
            {/* Generation ID */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                {t("feedback.reportFeedback.generationId")}
              </label>
              <Input
                placeholder={t("feedback.reportFeedback.generationIdPlaceholder")}
                value={generationId}
                onChange={(e) => setGenerationId(e.target.value)}
                className="h-10 rounded-lg bg-gray-100 text-[13px] text-gray-600 placeholder:text-gray-400 dark:bg-gray-900/60 dark:text-gray-300"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                {t("feedback.reportFeedback.category")}
              </label>
              <Select
                value={feedbackCategory}
                onValueChange={(value) => setFeedbackCategory(value)}
              >
                <SelectTrigger className="h-10 w-full rounded-lg text-[13px]">
                  <SelectValue placeholder={t("feedback.reportFeedback.categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="incorrect-output">
                    {t("feedback.reportFeedback.categories.incorrectOutput")}
                  </SelectItem>
                  <SelectItem value="safety">
                    {t("feedback.reportFeedback.categories.safety")}
                  </SelectItem>
                  <SelectItem value="performance">
                    {t("feedback.reportFeedback.categories.performance")}
                  </SelectItem>
                  <SelectItem value="other">{t("feedback.reportFeedback.categories.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comment */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                {t("feedback.reportFeedback.comment")}
              </label>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-900/50">
                <textarea
                  value={feedbackComment}
                  onChange={(e) =>
                    setFeedbackComment(e.target.value.slice(0, 1000))
                  }
                  placeholder={t("feedback.reportFeedback.commentPlaceholder")}
                  className="h-24 w-full resize-none bg-transparent text-[13px] text-gray-900 placeholder:text-gray-400 outline-none dark:text-gray-100"
                />
                <div className="mt-1 text-right text-[11px] text-gray-400">
                  {feedbackComment.length}/{t("common.maxChars", { max: 1000 })}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full px-5 text-[13px]"
                onClick={() => onOpenChange(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                size="sm"
                className="rounded-full bg-[#a894ff] px-5 text-[13px] text-white hover:bg-[#9b86ff]"
              >
                {t("common.submit")}
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}