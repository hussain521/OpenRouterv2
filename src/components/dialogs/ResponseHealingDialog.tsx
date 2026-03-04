import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface ResponseHealingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResponseHealingDialog({ open, onOpenChange }: ResponseHealingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" onClose={() => onOpenChange(false)}>
        <DialogHeader className="justify-between gap-3 sm:flex-row sm:items-start">
          <div className="space-y-1 text-left">
            <DialogTitle>Configure Response Healing</DialogTitle>
            <p className="text-[12px] text-gray-500 dark:text-gray-400">
              Automatically fix malformed JSON responses from LLMs
            </p>
          </div>
          <a
            href="https://docs.openrouter.ai"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Learn more
          </a>
        </DialogHeader>

        <DialogBody className="mt-4 space-y-4">
          {/* Prevent overrides */}
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-[12px] dark:border-gray-800 dark:bg-gray-900/60">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  Prevent overrides
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400 dark:border-gray-600 dark:text-gray-500">
                  i
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Disable per-request changes to these response healing settings.
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-[#4F46E5]" />
          </div>
        </DialogBody>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" size="sm" className="px-4">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}