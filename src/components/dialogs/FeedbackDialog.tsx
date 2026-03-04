import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackDialog({ open, onOpenChange }: FeedbackDialogProps) {
  const [feedbackText, setFeedbackText] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader className="mb-3 justify-between">
          <DialogTitle className="text-[15px] font-medium text-gray-900">
            Send Feedback
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-3">
          <textarea
            rows={5}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Tell us what you think..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 py-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-[#A855F7]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A855F7]/20 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-[#A855F7] dark:focus:ring-[#A855F7]/30"
          />
        </DialogBody>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-[12px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              setFeedbackText("");
            }}
            className="inline-flex items-center justify-center rounded-lg bg-[#A855F7] px-4 py-1.5 text-[12px] font-medium text-white shadow-sm hover:bg-[#9b4ae7] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!feedbackText.trim()}
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}