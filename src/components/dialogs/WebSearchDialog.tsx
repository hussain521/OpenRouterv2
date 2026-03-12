import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface WebSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WebSearchDialog({ open, onOpenChange }: WebSearchDialogProps) {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl" onClose={() => onOpenChange(false)}>
        <div className="space-y-6">
          {/* Header */}
          <DialogHeader className="space-y-2">
            <div>
              <DialogTitle className="text-xl font-semibold">
                {t("webSearch.configureTitle")}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {t("webSearch.description")}
                <span className="text-primary ml-1 cursor-pointer">
                  {t("webSearch.learnMore")}
                </span>
              </p>
            </div>
          </DialogHeader>

          {/* Search Engine */}
          <div className="space-y-2">
            <Label>{t("webSearch.searchEngine")}</Label>
            <Select defaultValue="native">
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder={t("webSearch.selectEngine")} />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectItem value="native">{t("webSearch.native")}</SelectItem>
                <SelectItem value="exa">{t("webSearch.exa")}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {t("webSearch.engineDescription")}
            </p>
          </div>

          {/* Max Results */}
          <div className="space-y-2">
            <Label>{t("webSearch.maxResults")}</Label>
            <Input placeholder={t("common.default")} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">
              {t("webSearch.maxResultsDescription")}
            </p>
          </div>

          {/* Search Prompt */}
          <div className="space-y-2">
            <Label>{t("webSearch.searchPrompt")}</Label>
            <textarea
              placeholder={t("common.default")}
              disabled
              className="w-full min-h-[100px] rounded-xl border bg-muted px-3 py-2 text-sm resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {t("webSearch.searchPromptDescription")}
            </p>
          </div>

          <div className="border-t pt-4" />

          {/* Prevent Overrides */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="font-medium">{t("webSearch.preventOverrides")}</Label>
            </div>
            <Switch />
          </div>

          {/* Footer */}
          <DialogFooter className="pt-4 flex justify-end gap-3">
            <Button
              variant="outline"
              className="rounded-xl px-6"
              onClick={() => onOpenChange(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button className="rounded-xl px-6">{t("common.save")}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}