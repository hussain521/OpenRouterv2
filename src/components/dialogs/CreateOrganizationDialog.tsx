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
import { useTranslation } from "react-i18next";

interface CreateOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOrganizationDialog({ open, onOpenChange }: CreateOrganizationDialogProps) {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader className="mb-4">
          <DialogTitle>{t("organization.createOrganization")}</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
              {t("organization.logo")}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-gray-300 text-gray-400 dark:border-gray-700 dark:text-gray-500">
                <span className="text-lg">{t("common.uploadIcon")}</span>
              </div>
              <div className="space-y-1">
                <input
                  id="org-logo-upload"
                  type="file"
                  className="hidden"
                />
                <label htmlFor="org-logo-upload">
                  <Button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white px-3 py-1 text-[12px] font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    {t("common.upload")}
                  </Button>
                </label>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  {t("organization.logoRecommendation")}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
              {t("common.name")}
            </p>
            <Input
              placeholder={t("organization.namePlaceholder")}
              className="h-9 text-[13px]"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            type="button"
            className="ml-auto rounded-md bg-[#6366F1] px-4 py-1.5 text-[13px] font-medium text-white hover:bg-[#4F46E5]"
          >
            {t("organization.createOrganization")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}