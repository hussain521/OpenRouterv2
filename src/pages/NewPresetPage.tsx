import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { usePageTitle } from "@/hooks/usePageTitle";
import PresetHeader from "@/components/presets/PresetHeader";
import BasicInfoSection from "@/components/presets/BasicInfoSection";
import SystemPromptSection from "@/components/presets/SystemPromptSection";
import ModelsSection from "@/components/presets/ModelsSection";
import ProviderRoutingSection from "@/components/presets/ProviderRoutingSection";
import ParametersSection from "@/components/presets/ParametersSection";
import ReasoningSection from "@/components/presets/ReasoningSection";

export default function NewPresetPage() {
  const { t } = useTranslation();
  usePageTitle(t("presets.new.pageTitle"));

  const handleSave = () => {
    // Save logic here
    console.log('Saving preset...');
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      
      <DashboardLayout title="">
        {/* Custom Header */}
        <PresetHeader onSave={handleSave} />
        
        <div className="space-y-8 mt-8">
          {/* Basic Info */}
          <BasicInfoSection />
          
          <Separator />
          
          {/* System Prompt */}
          <SystemPromptSection />
          
          <Separator />
          
          {/* Models */}
          <ModelsSection />
          
          <Separator />
          
          {/* Provider Routing */}
          <ProviderRoutingSection />
          
          <Separator />
          
          {/* Parameters */}
          <ParametersSection />
          
          <Separator />
          
          {/* Reasoning */}
          <ReasoningSection />
        </div>
      </DashboardLayout>
    </div>
  );
}