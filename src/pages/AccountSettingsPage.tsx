import { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { ToggleRow } from "@/components/settings/ToggleRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AccountSettingsContent() {
  const [isOrgDialogOpen, setIsOrgDialogOpen] = useState(false);

  return (
    <div className="space-y-8 text-[14px] text-gray-500 dark:text-gray-300">
      <section className="space-y-4">
         
        <div className="divide-y divide-gray-200 dark:divide-gray-700 ">
          <SettingsRow
            title="User"
            description="Manage your login credentials, security settings, or delete your account."
            actionLabel="Manage"
          />
          <SettingsRow
            title="Organization"
            description="Create and manage your organization."
            actionLabel="Create"
            onAction={() => setIsOrgDialogOpen(true)}
          />
          <SettingsRow
            title="Account Type"
            description={
              <>
                Your current account tier.{" "}
                <a href="#" className="text-[#6366F1] hover:underline">
                  Learn more
                </a>
                .
              </>
            }
            action={
              <button className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white px-4 py-1.5 text-[11px] font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
                <span>Self Serve</span>
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500">
                  ☺
                </span>
              </button>
            }
          />
          <SettingsRow
            title="Chatroom Color"
            description="Custom bubble color for this device."
            action={
              <Select defaultValue="default">
                <SelectTrigger
                  size="sm"
                  className="min-w-[120px] justify-between rounded-full px-3"
                >
                  <SelectValue>
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                      <span>Default</span>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                      <span>Default</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="purple">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
                      <span>Purple</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="green">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
                      <span>Green</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            }
          />
          <SettingsRow
            title="Default Preset"
            description="Default preset for new characters in the chatroom."
            action={
              <Select defaultValue="none">
                <SelectTrigger
                  size="sm"
                  className="min-w-[140px] justify-between rounded-full px-3"
                >
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="focused">Focused</SelectItem>
                </SelectContent>
              </Select>
            }
          />
          <ToggleRow
            title="Enable analytics cookies"
            description="Allow analytics cookies to help us improve the user experience and site performance."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Notifications
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <ToggleRow
            title="Low Balance Alerts"
            description="Emails sent to hussaineisd990@gmail.com"
            defaultEnabled
          />
          <SettingsRow
            title="Credit threshold"
            description="Alert when balance drops below this value"
            action={
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                  $
                </span>
                <Input
                  type="number"
                  defaultValue={0}
                  className="h-8 w-20 rounded-md border-gray-200 bg-white px-2 text-[12px] text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
            }
          />
          <ToggleRow
            title="Chat Completion Notifications"
            description="Browser notifications when chat responses complete (only when tab is not focused)"
          />
          <SettingsRow
            title="Ignored / Allowed Providers"
            description="These settings have moved to the Privacy & Guardrails section."
            actionLabel="Open"
          />
          <SettingsRow
            title="Default Provider Sort / Default Model"
            description="These settings have moved to the Routing section."
            actionLabel="Open"
          />
        </div>
      </section>

      <Dialog open={isOrgDialogOpen} onOpenChange={setIsOrgDialogOpen}>
        <DialogContent onClose={() => setIsOrgDialogOpen(false)}>
          <DialogHeader className="mb-4">
            <DialogTitle>Create organization</DialogTitle>
          </DialogHeader>
          <DialogBody className="space-y-6">
            <div className="space-y-2">
              <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
                Logo
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-gray-300 text-gray-400 dark:border-gray-700 dark:text-gray-500">
                  ⬆
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
                      Upload
                    </Button>
                  </label>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Recommended size 1:1, up to 10MB.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
                Name
              </p>
              <Input
                placeholder="Organization name"
                className="h-9 text-[13px]"
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              type="button"
              className="ml-auto rounded-md bg-[#6366F1] px-4 py-1.5 text-[13px] font-medium text-white hover:bg-[#4F46E5]"
            >
              Create organization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AccountSettingsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Account">
        <AccountSettingsContent />
      </DashboardLayout>
    </div>
  );
}