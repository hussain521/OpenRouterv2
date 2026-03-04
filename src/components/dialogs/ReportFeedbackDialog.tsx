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

interface ReportFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportFeedbackDialog({ open, onOpenChange }: ReportFeedbackDialogProps) {
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
          <DialogTitle>Report Feedback</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-5 text-[13px]">
          <p className="text-[12px] text-gray-500 dark:text-gray-400">
            Help us improve by reporting issues with this generation.
          </p>

          <form className="space-y-4" onSubmit={handleSubmitFeedback}>
            {/* Generation ID */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Generation ID
              </label>
              <Input
                placeholder="Enter generation ID"
                value={generationId}
                onChange={(e) => setGenerationId(e.target.value)}
                className="h-10 rounded-lg bg-gray-100 text-[13px] text-gray-600 placeholder:text-gray-400 dark:bg-gray-900/60 dark:text-gray-300"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <Select
                value={feedbackCategory}
                onValueChange={(value) => setFeedbackCategory(value)}
              >
                <SelectTrigger className="h-10 w-full rounded-lg text-[13px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incorrect-output">
                    Incorrect or low-quality output
                  </SelectItem>
                  <SelectItem value="safety">
                    Safety or policy concern
                  </SelectItem>
                  <SelectItem value="performance">
                    Latency or performance issue
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comment */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Comment
              </label>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-900/50">
                <textarea
                  value={feedbackComment}
                  onChange={(e) =>
                    setFeedbackComment(e.target.value.slice(0, 1000))
                  }
                  placeholder="Describe the issue..."
                  className="h-24 w-full resize-none bg-transparent text-[13px] text-gray-900 placeholder:text-gray-400 outline-none dark:text-gray-100"
                />
                <div className="mt-1 text-right text-[11px] text-gray-400">
                  {feedbackComment.length}/1000
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
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="rounded-full bg-[#a894ff] px-5 text-[13px] text-white hover:bg-[#9b86ff]"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}