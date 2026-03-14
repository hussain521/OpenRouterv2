import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { BalanceCard } from "@/components/credits/BalanceCard";
import { BuyCreditsSection } from "@/components/credits/BuyCreditsSection";
import { AutoTopUpSection } from "@/components/credits/AutoTopUpSection";
import { TransactionsTable } from "@/components/credits/TransactionsTable";
import { Card } from "@/components/ui/card";
import { BillingAddressDialog } from "@/components/dialogs";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function CreditsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  usePageTitle(t("nav.credits"));

  // Mock data for transactions - moved inside component to access t()
  const mockTransactions = [
    {
      date: "2024-03-01",
      description: "API Usage - GPT-4",
      amount: -5.25,
      balance: 94.75,
    },
    {
      date: "2024-02-28",
      description: t("hardcodedStrings.creditsAdded"),
      amount: 100.00,
      balance: 100.00,
    },
    {
      date: "2024-02-27",
      description: "API Usage - Claude-3",
      amount: -3.50,
      balance: 0.00,
    },
    {
      date: "2024-02-26",
      description: "API Usage - GPT-3.5",
      amount: -1.25,
      balance: 3.50,
    },
    {
      date: "2024-02-25",
      description: t("hardcodedStrings.creditsAdded"),
      amount: 50.00,
      balance: 4.75,
    },
    {
      date: "2024-02-24",
      description: "API Usage - Claude-3",
      amount: -2.10,
      balance: -45.25,
    },
    {
      date: "2024-02-23",
      description: "API Usage - GPT-4",
      amount: -4.15,
      balance: -43.15,
    },
    {
      date: "2024-02-22",
      description: "API Usage - GPT-3.5",
      amount: -0.85,
      balance: -39.00,
    },
  ];

  const [balance, setBalance] = useState(94.75);
  const [autoTopUp, setAutoTopUp] = useState(false);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isBillingDialogOpen, setIsBillingDialogOpen] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setBalance((prev) => prev + Math.random() * 10 - 5); // Random change for demo
      setIsRefreshing(false);
    }, 1000);
  };

  const handleAddCredits = () => {
    console.log("Adding credits...");
    // In real app, this would open a payment modal or redirect to payment page
  };

  const handleViewUsage = () => {
    navigate("/activity");
  };

  const handleAutoTopUpToggle = (enabled: boolean) => {
    setAutoTopUp(enabled);
    // In real app, this would save the preference via API
    console.log("Auto top-up", enabled ? "enabled" : "disabled");
  };

  const handleAddPaymentMethod = () => {
    // Open the billing address dialog
    setIsBillingDialogOpen(true);
  };

  const handleCompleteBillingAddress = () => {
    // In a real app, you'd submit this data to your backend here.
    // For this demo we just mark that a payment method exists,
    // turn on auto top-up, and close the dialog.
    setHasPaymentMethod(true);
    setAutoTopUp(true);
    setIsBillingDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout
        title={
          <div className="flex items-center gap-2">
            <span>{t("nav.credits")}</span>
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        }
      >
        <div className="space-y-6 pt-4">
          {/* Balance Card */}
             <BalanceCard
              balance={balance}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />
 
          {/* Buy Credits and Auto Top-Up Cards */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Buy Credits Card */}
            <Card className="border border-gray-200 dark:border-gray-700 rounded-2xl p-0 overflow-hidden">
              <BuyCreditsSection
                onAddCredits={handleAddCredits}
                onViewUsage={handleViewUsage}
              />
            </Card>

            {/* Auto Top-Up Card */}
            <Card className="border border-gray-200 dark:border-gray-700 rounded-2xl p-0 overflow-hidden">
              <AutoTopUpSection
                enabled={autoTopUp}
                onToggle={handleAutoTopUpToggle}
                hasPaymentMethod={hasPaymentMethod}
                onAddPaymentMethod={handleAddPaymentMethod}
              />
            </Card>
          </div>

          {/* Billing address dialog */}
          <BillingAddressDialog
            open={isBillingDialogOpen}
            onOpenChange={setIsBillingDialogOpen}
            onComplete={handleCompleteBillingAddress}
          />

          {/* Recent Transactions Card */}
          <Card className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <TransactionsTable
              transactions={transactions}
              setTransactions={setTransactions}
            />
          </Card>
        </div>
      </DashboardLayout>
    </div>
  );
}
