import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PricingFAQ() {
  const { t } = useTranslation();

  const faqSections = [
    {
      category: "general",
      questions: [
        "tokenBilling",
        "markupPricing",
        "billingStructure",
        "creditExpiration",
        "autoTopUp",
      ],
    },
    {
      category: "apiLimits",
      questions: [
        "apiLimits",
        "tokenLimits",
        "concurrentRequests",
        "apiCompatibility",
        "apiVersioning",
      ],
    },
    {
      category: "modelsAccess",
      questions: [
        "modelAccess",
        "customModels",
        "modelVersioning",
        "modelUpdates",
        "experimentalFeatures",
      ],
    },
    {
      category: "securityPrivacy",
      questions: [
        "dataPrivacy",
        "dataRetention",
        "securityAudits",
        "compliance",
        "dataProcessing",
      ],
    },
    {
      category: "enterpriseFeatures",
      questions: [
        "enterpriseFeatures",
        "slaGuarantees",
        "bulkDiscounts",
        "regionalDeployment",
        "multiRegionSupport",
      ],
    },
    {
      category: "supportCommunity",
      questions: [
        "supportChannels",
        "emergencySupport",
        "communitySupport",
        "featureRequests",
        "academicPricing",
      ],
    },
    {
      category: "technicalFeatures",
      questions: [
        "promptCaching",
        "fallbackProviders",
        "websocketSupport",
        "batchProcessing",
        "loadBalancing",
      ],
    },
    {
      category: "optimizationCost",
      questions: [
        "costOptimization",
        "costPrediction",
        "modelComparison",
        "customRouting",
        "usageAnalytics",
      ],
    },
    {
      category: "integrationTools",
      questions: [
        "integrations",
        "developerTools",
        "webhookSupport",
        "apiKeyManagement",
        "testingEnvironment",
      ],
    },
    {
      category: "advancedFeatures",
      questions: [
        "multipleOrgs",
        "dataExport",
        "backupRecovery",
        "performanceMonitoring",
        "scalability",
        "troubleshooting",
        "errorHandling",
        "partnerProgram",
        "migrationSupport",
        "customTraining",
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        {t("pricing.faq.title")}
      </h2>

      <div className="space-y-8">
        {faqSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white pb-2">
              {t(`pricing.faq.categories.${section.category}`)}
            </h3>
            <Accordion type="single" collapsible className="space-y-2">
              {section.questions.map((questionKey, questionIndex) => (
                <AccordionItem
                  key={questionIndex}
                  value={`${sectionIndex}-${questionIndex}`}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg px-6 py-2 bg-white dark:bg-black shadow-sm"
                >
                  <AccordionTrigger className="text-left text-gray-900 dark:text-gray-100 hover:text-[#6467f2] dark:hover:text-[#6467f2] transition-colors">
                    {t(`pricing.faq.questions.${questionKey}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                    {t(`pricing.faq.questions.${questionKey}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}