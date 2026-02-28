import { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { BalanceCard } from "@/components/credits/BalanceCard";
import { BuyCreditsSection } from "@/components/credits/BuyCreditsSection";
import { AutoTopUpSection } from "@/components/credits/AutoTopUpSection";
import { TransactionsTable } from "@/components/credits/TransactionsTable";

export default function CreditsPage() {
  const [balance] = useState(0.00);
  const [autoTopUp, setAutoTopUp] = useState(false);
  const [hasPaymentMethod] = useState(false);
  const [transactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<"all" | "credits" | "debits">("all");

  const handleRefresh = () => {
    console.log("Refreshing balance...");
  };

  const handleAddCredits = () => {
    console.log("Adding credits...");
  };

  const handleViewUsage = () => {
    console.log("Viewing usage...");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="Credits">
        <div className="space-y-5 pt-4">
          {/* Balance + actions card */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <BalanceCard
              balance={balance}
              onRefresh={handleRefresh}
            />

            {/* Buy Credits + Auto Top-Up section */}
            <div className="grid gap-4 border-b border-gray-200 dark:border-gray-700 px-5 py-4 md:grid-cols-[2fr_minmax(0,1.6fr)]">
              <BuyCreditsSection
                onAddCredits={handleAddCredits}
                onViewUsage={handleViewUsage}
              />
              
              <AutoTopUpSection
                enabled={autoTopUp}
                onToggle={setAutoTopUp}
                hasPaymentMethod={hasPaymentMethod}
              />
            </div>

            {/* Recent transactions */}
            <div className="px-5 py-4">
              <TransactionsTable
                transactions={transactions}
                currentPage={currentPage}
                totalPages={1}
                onPageChange={setCurrentPage}
                filterType={filterType}
                onFilterChange={setFilterType}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}