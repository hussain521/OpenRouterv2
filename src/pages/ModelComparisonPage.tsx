import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type Model } from "@/context/ModelsContext";
import { ModelSelectionDialog } from "@/components/model-comparison/ModelSelectionDialog";
import { ComparisonCards } from "@/components/model-comparison/ComparisonCards";

export default function ModelComparisonPage() {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleModelSelect = (model: Model) => {
    // Here you would add logic to add the selected model to comparison
    console.log("Selected model:", model);
  };

  const handleAddModel = () => {
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-foreground max-w-7xl mx-auto">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main className="pt-16 min-h-screen">
        <div className="p-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">{t('modelComparison.title')}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t('modelComparison.subtitle')}
            </p>
          </div>

          {/* Cards */}
          <ComparisonCards onAddModel={handleAddModel} />
        </div>

        <Footer />
      </main>

      {/* Add Model Dialog */}
      <ModelSelectionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onModelSelect={handleModelSelect}
      />
    </div>
  );
}
