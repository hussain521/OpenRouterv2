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
import { useTranslation } from "react-i18next";

export function CreateApiKeyDialog() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
 
  return (
    <>
      <Button
        type="button"
        size="sm"
        className="mt-2 rounded-full bg-[#4F46E5] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#4338CA]"
        onClick={() => setOpen(true)}
      >
        {t("apiKeys.createKey")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogBody className="-mt-3">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                  <span>{t("common.name")}</span>
                  <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                </label>
                <Input
                  placeholder={t("apiKeys.namePlaceholder")}
                  className="h-10 rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700"
                />
              </div>

              {/* Credit limit */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                  <span>{t("apiKeys.creditLimit")}</span>
                  <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                </label>
                <Input
                  placeholder={t("apiKeys.creditLimitPlaceholder")}
                  className="h-10 rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700"
                />
              </div>

              {/* Reset limit every */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                  <span>{t("apiKeys.resetLimit")}</span>
                  <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                </label>
                <Select defaultValue="na">
                  <SelectTrigger className="h-10 w-full rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] text-gray-700 dark:text-gray-200 shadow-xs focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700">
                    <SelectValue placeholder={t("apiKeys.selectResetFrequency")} />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="na">{t("common.na")}</SelectItem>
                    <SelectItem value="day">{t("common.daily")}</SelectItem>
                    <SelectItem value="week">{t("common.weekly")}</SelectItem>
                    <SelectItem value="month">{t("common.monthly")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Expiration */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-medium text-gray-600 dark:text-gray-300">
                  <span>{t("apiKeys.expiration")}</span>
                  <Info className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                </label>
                <Select defaultValue="none">
                  <SelectTrigger className="h-10 w-full rounded-xl border-transparent bg-[#F5F5F7] dark:bg-gray-700 text-[12px] text-gray-700 dark:text-gray-200 shadow-xs focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-700">
                    <SelectValue placeholder={t("apiKeys.selectExpiration")} />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="none">{t("apiKeys.noExpiration")}</SelectItem>
                    <SelectItem value="7d">{t("apiKeys.in7Days")}</SelectItem>
                    <SelectItem value="30d">{t("apiKeys.in30Days")}</SelectItem>
                    <SelectItem value="90d">{t("apiKeys.in90Days")}</SelectItem>
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
                {t("common.create")}
              </Button>
            </DialogFooter>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
}