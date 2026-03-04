import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BillingAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function BillingAddressDialog({ open, onOpenChange, onComplete }: BillingAddressDialogProps) {
  const [billingName, setBillingName] = useState("Hussain ELsid");
  const [billingCountry, setBillingCountry] = useState("united-states");
  const [billingAddress1, setBillingAddress1] = useState("");

  const isBillingFormValid = billingName.trim() !== "" && billingAddress1.trim() !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md rounded-3xl"
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center text-sm font-medium text-gray-900 dark:text-gray-100">
            Add a Billing Address
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4 text-xs">
          {/* Full name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-gray-600 dark:text-gray-300">
              Full name
            </label>
            <Input
              value={billingName}
              onChange={(e) => setBillingName(e.target.value)}
              className="h-10 rounded-md bg-gray-100 dark:bg-gray-900/60 border-none text-[13px] text-gray-900 dark:text-gray-100"
              placeholder="Full name"
            />
          </div>

          {/* Country / region */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-gray-600 dark:text-gray-300">
              Country or region
            </label>
            <Select
              value={billingCountry}
              onValueChange={setBillingCountry}
            >
              <SelectTrigger className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-900/60 border-none text-[13px] text-gray-900 dark:text-gray-100 justify-between">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="united-states">United States</SelectItem>
                <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address line 1 */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-gray-600 dark:text-gray-300">
              Address line 1
            </label>
            <Input
              value={billingAddress1}
              onChange={(e) => setBillingAddress1(e.target.value)}
              className="h-10 rounded-md bg-gray-100 dark:bg-gray-900/60 border-none text-[13px] text-gray-900 dark:text-gray-100"
              placeholder="Street address"
            />
          </div>

          <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
            A billing address is <span className="font-semibold">required</span> to verify your identity and help prevent fraud.
          </p>
        </DialogBody>

        <DialogFooter className="mt-4">
          <Button
            type="button"
            className="h-10 w-full rounded-md bg-gray-900 text-[13px] font-medium text-white shadow-sm disabled:bg-gray-200 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
            disabled={!isBillingFormValid}
            onClick={onComplete}
          >
            Complete address details to continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}