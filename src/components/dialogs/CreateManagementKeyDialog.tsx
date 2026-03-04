import { Info } from "lucide-react";
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

interface CreateManagementKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateManagementKeyDialog({
  open,
  onOpenChange,
}: CreateManagementKeyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader className="mb-3">
          <DialogTitle>Create a Management Key</DialogTitle>
        </DialogHeader>

        <DialogBody className="-mt-1 space-y-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
              <span>Name</span>
              <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
            </label>
            <Input
              placeholder={`e.g. "Management Key"`}
              className="h-10 rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700"
            />
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-2 rounded-full border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}