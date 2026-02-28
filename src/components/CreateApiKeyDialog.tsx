import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";

export function CreateApiKeyDialog() {
  const [open, setOpen] = useState(false);
 
  return (
    <>
      <Button
        type="button"
        size="sm"
        className="mt-2 rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]"
        onClick={() => setOpen(true)}
      >
        Create key
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogBody className="-mt-3">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                  <span>Name</span>
                  <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                </label>
                <Input
                  placeholder={`e.g. "Chatbot Key"`}
                  className="h-10 rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700"
                />
              </div>

              {/* Credit limit */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                  <span>Credit limit (optional)</span>
                  <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                </label>
                <Input
                  placeholder="Leave blank for unlimited"
                  className="h-10 rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700"
                />
              </div>

              {/* Reset limit every */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                  <span>Reset limit every...</span>
                  <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                </label>
                <Select defaultValue="na">
                  <SelectTrigger className="h-10 w-full rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] text-gray-700 dark:text-gray-200 shadow-xs focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700">
                    <SelectValue placeholder="Select reset frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">N/A</SelectItem>
                    <SelectItem value="day">Daily</SelectItem>
                    <SelectItem value="week">Weekly</SelectItem>
                    <SelectItem value="month">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Expiration */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                  <span>Expiration</span>
                  <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                </label>
                <Select defaultValue="none">
                  <SelectTrigger className="h-10 w-full rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] text-gray-700 dark:text-gray-200 shadow-xs focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700">
                    <SelectValue placeholder="Select expiration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No expiration</SelectItem>
                    <SelectItem value="7d">In 7 days</SelectItem>
                    <SelectItem value="30d">In 30 days</SelectItem>
                    <SelectItem value="90d">In 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            {/* Actions */}
            <DialogFooter>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                onClick={() => setOpen(false)}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
}