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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface PdfInputsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PdfInputsDialog({ open, onOpenChange }: PdfInputsDialogProps) {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" onClose={() => onOpenChange(false)}>
        <DialogHeader className="justify-between gap-3 sm:flex-row sm:items-start">
          <div className="space-y-1 text-left">
            <DialogTitle>{t("pdfInputs.title")}</DialogTitle>
            <p className="text-[12px] text-gray-500 dark:text-gray-400">
              {t("pdfInputs.description")}
            </p>
          </div>
          <a
            href="https://docs.openrouter.ai"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {t("common.learnMore")}
          </a>
        </DialogHeader>

        <DialogBody className="mt-4 space-y-4">
          {/* PDF Parser Engine */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
              {t("pdfInputs.pdfParserEngine")}
            </label>
            <Select defaultValue="mistral-ocr">
              <SelectTrigger className="h-8 rounded-lg border-gray-200 text-[12px] dark:border-gray-700">
                <SelectValue placeholder={t("pdfInputs.selectParserEngine")} />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectItem value="mistral-ocr">
                  {t("pdfInputs.defaultMistralOcr")}
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              {t("pdfInputs.parserEngineDescription")}
            </p>
          </div>

          {/* Prevent overrides */}
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-[12px] dark:border-gray-800 dark:bg-gray-900/60">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {t("pdfInputs.preventOverrides")}
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400 dark:border-gray-600 dark:text-gray-500">
                  {t("common.info")}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {t("pdfInputs.preventOverridesDescription")}
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
            {t("common.cancel")}
          </Button>
          <Button type="button" size="sm" className="px-4">
            {t("common.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}