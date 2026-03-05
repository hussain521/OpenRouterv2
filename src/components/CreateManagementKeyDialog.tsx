import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

export function CreateManagementKeyDialog() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button in header */}
      <Button
        type="button"
        size="sm"
        className="mt-2 rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]"
        onClick={() => setOpen(true)}
      >
        {t("common.create")}
      </Button>

      {/* Dialog, same pattern as CreateApiKeyDialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader className="mb-3">
            <DialogTitle>{t("managementKeys.createTitle")}</DialogTitle>
          </DialogHeader>

          <DialogBody className="-mt-1">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                <span>{t("common.name")}</span>
                <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
              </label>
              <Input
                placeholder={t("managementKeys.namePlaceholder")}
                className="h-10 rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700"
              />
            </div>

            {/* Actions */}
            <DialogFooter>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="mt-4 rounded-full border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                onClick={() => setOpen(false)}
              >
                {t("common.create")}
              </Button>
            </DialogFooter>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
}