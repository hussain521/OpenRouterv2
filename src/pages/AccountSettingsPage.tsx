import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { ToggleRow } from "@/components/settings/ToggleRow";

function AccountSettingsContent() {
  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700">
      {/* Account section */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Account
        </h2>
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white dark:bg-black">
          <SettingsRow
            title="Profile"
            description="Name, email address, and basic account details."
            actionLabel="Manage"
          />
          <SettingsRow
            title="Password"
            description="Update your password and view security recommendations."
            actionLabel="Change"
          />
          <SettingsRow
            title="Two-factor authentication"
            description="Protect your account with an extra layer of security."
            actionLabel="Set up"
            actionVariant="primary"
          />
        </div>
      </section>

      {/* Billing + team section */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Billing & team
        </h2>
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white dark:bg-black">
          <SettingsRow
            title="Billing"
            description="Invoices, payment methods, and tax information."
            actionLabel="Open billing"
          />
          <SettingsRow
            title="Team"
            description="Invite teammates and manage permissions."
            actionLabel="Manage team"
          />
        </div>
      </section>

      {/* Notifications section */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Notifications
        </h2>
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white dark:bg-black">
          <ToggleRow
            title="Product updates"
            description="Occasional updates about new features and improvements."
            defaultEnabled
          />
          <ToggleRow
            title="Billing alerts"
            description="Emails when invoices are created or payments fail."
            defaultEnabled
          />
          <ToggleRow
            title="Usage alerts"
            description="Get notified when usage or spend crosses thresholds."
          />
        </div>
      </section>
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