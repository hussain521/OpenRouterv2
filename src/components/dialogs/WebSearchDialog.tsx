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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface WebSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WebSearchDialog({ open, onOpenChange }: WebSearchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl" onClose={() => onOpenChange(false)}>
        <div className="space-y-6">
          {/* Header */}
          <DialogHeader className="space-y-2">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Configure Web Search
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Augment LLM responses with real-time web search results
                <span className="text-primary ml-1 cursor-pointer">
                  Learn more
                </span>
              </p>
            </div>
          </DialogHeader>

          {/* Search Engine */}
          <div className="space-y-2">
            <Label>Search Engine</Label>
            <Select defaultValue="native">
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Select engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="native">Native</SelectItem>
                <SelectItem value="exa">Exa</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose the search engine to use. Native uses the provider's
              built-in search when available.
            </p>
          </div>

          {/* Max Results */}
          <div className="space-y-2">
            <Label>Max Results</Label>
            <Input placeholder="Default" disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">
              Maximum number of search results to include (1-20). See docs
              for default.
            </p>
          </div>

          {/* Search Prompt */}
          <div className="space-y-2">
            <Label>Search Prompt</Label>
            <textarea
              placeholder="Default"
              disabled
              className="w-full min-h-[100px] rounded-xl border bg-muted px-3 py-2 text-sm resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Custom prompt injected with search results. Default instructs
              the model to incorporate results and cite sources using
              markdown links.
            </p>
          </div>

          <div className="border-t pt-4" />

          {/* Prevent Overrides */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="font-medium">Prevent overrides</Label>
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
              Cancel
            </Button>
            <Button className="rounded-xl px-6">Save</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}