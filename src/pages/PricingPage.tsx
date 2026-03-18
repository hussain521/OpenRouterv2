import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks/usePageTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import { useState, useEffect } from "react";
 
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check, X } from "lucide-react"

export default function PricingPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle(t("pricing.title"));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Features array with translation keys
  const features = [
    {
      nameKey: "pricing.features.platformFees",
      free: t("pricing.plans.freeFeatures.platformFees"),
      pay: t("pricing.plans.payAsYouGoFeatures.platformFees"),
      enterprise: t("pricing.plans.enterpriseFeatures.platformFees")
    },
    {
      nameKey: "pricing.features.models",
      free: t("pricing.plans.freeFeatures.models"),
      pay: t("pricing.plans.payAsYouGoFeatures.models"),
      enterprise: t("pricing.plans.enterpriseFeatures.models")
    },
    {
      nameKey: "pricing.features.providers",
      free: t("pricing.plans.freeFeatures.providers"),
      pay: t("pricing.plans.payAsYouGoFeatures.providers"),
      enterprise: t("pricing.plans.enterpriseFeatures.providers")
    },
    { nameKey: "pricing.features.chatApiAccess", free: true, pay: true, enterprise: true },
    { nameKey: "pricing.features.activityLogsExport", free: true, pay: true, enterprise: true },
    { nameKey: "pricing.features.autoRoutingVendor", free: false, pay: true, enterprise: true },
    { nameKey: "pricing.features.budgetsSpendControls", free: false, pay: true, enterprise: true },
    { nameKey: "pricing.features.promptCaching", free: false, pay: true, enterprise: true },
    { nameKey: "pricing.features.managementApiKey", free: false, pay: true, enterprise: true },
    { nameKey: "pricing.features.adminControls", free: false, pay: true, enterprise: true },
    { nameKey: "pricing.features.dataPolicyRouting", free: false, pay: true, enterprise: true },
    { nameKey: "pricing.features.managedPolicyEnforcement", free: false, pay: false, enterprise: true },
    { nameKey: "pricing.features.providerDataExplorer", free: false, pay: false, enterprise: true },
    { nameKey: "pricing.features.ssoSaml", free: false, pay: false, enterprise: true },
    { nameKey: "pricing.features.contractualSlas", free: false, pay: false, enterprise: true },
    {
      nameKey: "pricing.features.paymentOptions",
      free: false,
      pay: t("pricing.plans.payAsYouGoFeatures.paymentOptions"),
      enterprise: t("pricing.plans.enterpriseFeatures.paymentOptions")
    },
    {
      nameKey: "pricing.features.byokLimits",
      free: false,
      pay: t("pricing.plans.payAsYouGoFeatures.byokLimits"),
      enterprise: t("pricing.plans.enterpriseFeatures.byokLimits")
    },
    {
      nameKey: "pricing.features.rateLimits",
      free: t("pricing.plans.freeFeatures.rateLimits"),
      pay: t("pricing.plans.payAsYouGoFeatures.rateLimits"),
      enterprise: t("pricing.plans.enterpriseFeatures.rateLimits")
    },
    {
      nameKey: "pricing.features.tokenPricing",
      free: t("pricing.plans.freeFeatures.tokenPricing"),
      pay: t("pricing.plans.payAsYouGoFeatures.tokenPricing"),
      enterprise: t("pricing.plans.enterpriseFeatures.tokenPricing")
    },
    {
      nameKey: "pricing.features.support",
      free: t("pricing.plans.freeFeatures.support"),
      pay: t("pricing.plans.payAsYouGoFeatures.support"),
      enterprise: t("pricing.plans.enterpriseFeatures.support")
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <TopBanner />
      </div>
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Title Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("pricing.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
            {t("pricing.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button
              className="bg-[#6467f2] hover:bg-[#5558e6] text-white transition-all duration-200"
              size="lg"
            >
              {t("pricing.getStarted")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#6467f2] text-[#6467f2] hover:bg-[#6467f2] hover:text-white dark:border-[#6467f2] dark:text-[#6467f2] transition-all duration-200"
            >
              {t("pricing.talkToSales")}
            </Button>
          </div>
        </div>

        {/* Responsive Table Section */}
        <div className="bg-white dark:bg-black rounded-xl overflow-hidden mb-8">
          {/* Mobile Card Layout */}
          <div className="block lg:hidden">
            <div className="space-y-4 p-4 sm:p-6">
              {/* Free Plan */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 sm:p-6 bg-gray-50 dark:bg-black">
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
                  {t("pricing.plans.free")}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 gap-1 sm:gap-0"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t(feature.nameKey)}
                      </span>
                      <div className="flex items-center">
                        {typeof feature.free === "boolean" ? (
                          feature.free ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          )
                        ) : (
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                            {feature.free}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pay-as-you-go Plan */}
              <div className="border-2 border-[#6467f2] rounded-lg p-4 sm:p-6 bg-blue-50 dark:bg-black relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#6467f2] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {t("common.popular", "Popular")}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white pt-2">
                  {t("pricing.plans.payAsYouGo")}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 gap-1 sm:gap-0"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t(feature.nameKey)}
                      </span>
                      <div className="flex items-center">
                        {typeof feature.pay === "boolean" ? (
                          feature.pay ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          )
                        ) : (
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                            {feature.pay}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 sm:p-6 bg-gray-50 dark:bg-black">
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
                  {t("pricing.plans.enterprise")}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 gap-1 sm:gap-0"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t(feature.nameKey)}
                      </span>
                      <div className="flex items-center">
                        {typeof feature.enterprise === "boolean" ? (
                          feature.enterprise ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          )
                        ) : (
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                            {feature.enterprise}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block overflow-x-auto">
            <Table className="">
              <TableHeader>
                <TableRow className="  bg-gray-50 dark:bg-black h-[60px]">
                  <TableHead className="w-[300px] font-semibold text-gray-900 dark:text-gray-100"></TableHead>
                  <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100">
                    {t("pricing.plans.free")}
                  </TableHead>
                  <TableHead className="text-center bg-blue-50 dark:bg-black font-semibold text-gray-900 dark:text-gray-100 relative">
                    {/* <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#6467f2] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {t("common.popular", "Popular")}
                    </div> */}
                    {t("pricing.plans.payAsYouGo")}
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100">
                    {t("pricing.plans.enterprise")}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {features.map((feature, i) => (
                  <TableRow
                    key={i}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100 py-4">
                      {t(feature.nameKey)}
                    </TableCell>

                    <TableCell className="text-center py-4">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <Check className="mx-auto text-green-600 w-5 h-5" />
                        ) : (
                          <X className="mx-auto text-gray-400 w-5 h-5" />
                        )
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">
                          {feature.free}
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-center bg-blue-50 dark:bg-black py-4">
                      {typeof feature.pay === "boolean" ? (
                        feature.pay ? (
                          <Check className="mx-auto text-green-600 w-5 h-5" />
                        ) : (
                          <X className="mx-auto text-gray-400 w-5 h-5" />
                        )
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">
                          {feature.pay}
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-center py-4">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Check className="mx-auto text-green-600 w-5 h-5" />
                        ) : (
                          <X className="mx-auto text-gray-400 w-5 h-5" />
                        )
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">
                          {feature.enterprise}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16 lg:mb-20">
          <Button
            variant="outline"
            size="lg"
            className="border-[#6467f2] text-[#6467f2] hover:bg-[#6467f2] hover:text-white dark:border-[#6467f2] dark:text-[#6467f2] transition-all duration-200"
          >
            {t("pricing.getStartedForFree")}
          </Button>
          <Button
            size="lg"
            className="bg-[#6467f2] hover:bg-[#5558e6] text-white transition-all duration-200"
          >
            {t("pricing.buyCredits")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-[#6467f2] text-[#6467f2] hover:bg-[#6467f2] hover:text-white dark:border-[#6467f2] dark:text-[#6467f2] transition-all duration-200"
          >
            {t("pricing.contactSales")}
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t("pricing.faq.title")}
          </h2>

          <div className="space-y-8">
            {[
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
            ].map((section, sectionIndex) => (
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

        {/* Call-to-Action Card */}
        <div className="rounded-xl max-w-xl mx-auto transition-all duration-200 text-foreground p-6 md:p-16 text-center mt-16" style={{ border: '1px solid rgba(100, 103, 242, 0.3)', backgroundColor: 'rgba(100, 103, 242, 0.1)' }}>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button
              size="lg"
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 leading-6 text-white shadow hover:opacity-90 h-10 rounded-md px-8"
              style={{ backgroundColor: '#6467f2' }}
            >
              {t("cta.signUpFree")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 leading-6 bg-white text-gray-900 shadow hover:bg-gray-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 h-10 rounded-md px-8 border border-gray-200 dark:border-gray-200"
            >
              {t("cta.contactSales")}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}