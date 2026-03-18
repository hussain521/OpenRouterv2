import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks/usePageTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import SupportCard from "@/components/support/SupportCard";
import FAQSection from "@/components/support/FAQSection";
import SupportActions from "@/components/support/SupportActions";
import { useState, useEffect } from "react";

export default function SupportPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle(t('support.pageTitle'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FAQ Sections Data
  const faqSections = [
    {
      titleKey: "support.faq.gettingStarted.title",
      items: [
        {
          questionKey: "support.faq.gettingStarted.whyUse.question",
          answerKey: "support.faq.gettingStarted.whyUse.answer",
          isMultiParagraph: true,
        },
        {
          questionKey: "support.faq.gettingStarted.howToStart.question",
          customContent: (
            <div className="space-y-2">
              <p>
                {t(
                  "support.faq.gettingStarted.howToStart.customContent.paragraph1",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://openrouter.ai/settings/credits"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    "support.faq.gettingStarted.howToStart.customContent.creditPageLink",
                  )}
                </a>{" "}
                {t(
                  "support.faq.gettingStarted.howToStart.customContent.paragraph2",
                )}
              </p>
              <p>
                {t(
                  "support.faq.gettingStarted.howToStart.customContent.paragraph3",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://openrouter.ai/docs/quickstart"
                >
                  {t(
                    "support.faq.gettingStarted.howToStart.customContent.quickstartLink",
                  )}
                </a>
                {t(
                  "support.faq.gettingStarted.howToStart.customContent.period",
                )}
              </p>
            </div>
          ),
        },
        {
          questionKey: "support.faq.gettingStarted.howToGetSupport.question",
          customContent: (
            <div className="space-y-2">
              <p>
                {t(
                  "support.faq.gettingStarted.howToGetSupport.customContent.paragraph1",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://discord.gg/openrouter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    "support.faq.gettingStarted.howToGetSupport.customContent.discordLink",
                  )}
                </a>{" "}
                {t(
                  "support.faq.gettingStarted.howToGetSupport.customContent.paragraph2",
                )}
              </p>
              <p>
                {t(
                  "support.faq.gettingStarted.howToGetSupport.customContent.paragraph3",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="mailto:support@openrouter.ai"
                >
                  {t(
                    "support.faq.gettingStarted.howToGetSupport.customContent.supportEmail",
                  )}
                </a>
                {t(
                  "support.faq.gettingStarted.howToGetSupport.customContent.period",
                )}
              </p>
            </div>
          ),
        },
        {
          questionKey: "support.faq.gettingStarted.howBilled.question",
          customContent: (
            <div className="space-y-2">
              <p>
                {t(
                  "support.faq.gettingStarted.howBilled.customContent.paragraph1",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://openrouter.ai/models"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    "support.faq.gettingStarted.howBilled.customContent.modelPageLink",
                  )}
                </a>{" "}
                {t(
                  "support.faq.gettingStarted.howBilled.customContent.paragraph2",
                )}
              </p>
              <p>
                {t(
                  "support.faq.gettingStarted.howBilled.customContent.paragraph3",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://openrouter.ai/activity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    "support.faq.gettingStarted.howBilled.customContent.activityPageLink",
                  )}
                </a>
                {t(
                  "support.faq.gettingStarted.howBilled.customContent.period1",
                )}
              </p>
              <p>
                {t(
                  "support.faq.gettingStarted.howBilled.customContent.paragraph4",
                )}{" "}
                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                  {t(
                    "support.faq.gettingStarted.howBilled.customContent.usageCode",
                  )}
                </code>{" "}
                {t(
                  "support.faq.gettingStarted.howBilled.customContent.paragraph5",
                )}
              </p>
            </div>
          ),
        },
      ],
    },
    {
      titleKey: "support.faq.pricingAndFees.title",
      items: [
        {
          questionKey: "support.faq.pricingAndFees.whatAreFees.question",
          answerKey: "support.faq.pricingAndFees.whatAreFees.answer",
          isMultiParagraph: true,
        },
        {
          questionKey: "support.faq.pricingAndFees.byokFees.question",
          answerKey: "support.faq.pricingAndFees.byokFees.answer",
        },
      ],
    },
    {
      titleKey: "support.faq.modelsAndProviders.title",
      items: [
        {
          questionKey: "support.faq.modelsAndProviders.whatModels.question",
          customContent: (
            <p>
              {t(
                "support.faq.modelsAndProviders.whatModels.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/models"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "support.faq.modelsAndProviders.whatModels.customContent.modelBrowserLink",
                )}
              </a>{" "}
              {t(
                "support.faq.modelsAndProviders.whatModels.customContent.paragraph2",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/api/v1/models"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "support.faq.modelsAndProviders.whatModels.customContent.modelsApiLink",
                )}
              </a>
              {t(
                "support.faq.modelsAndProviders.whatModels.customContent.period",
              )}
            </p>
          ),
        },
        {
          questionKey: "support.faq.modelsAndProviders.howFrequent.question",
          customContent: (
            <p>
              {t(
                "support.faq.modelsAndProviders.howFrequent.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://discord.gg/openrouter"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "support.faq.modelsAndProviders.howFrequent.customContent.discordLink",
                )}
              </a>
              {t(
                "support.faq.modelsAndProviders.howFrequent.customContent.period",
              )}
            </p>
          ),
        },
        {
          questionKey: "support.faq.modelsAndProviders.whatVariants.question",
          customContent: (
            <div className="space-y-2">
              <p>
                {t(
                  "support.faq.modelsAndProviders.whatVariants.customContent.paragraph1",
                )}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                    {t(
                      "support.faq.modelsAndProviders.whatVariants.customContent.staticVariants.free.code",
                    )}
                  </code>{" "}
                  {t(
                    "support.faq.modelsAndProviders.whatVariants.customContent.staticVariants.free.description",
                  )}
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                    {t(
                      "support.faq.modelsAndProviders.whatVariants.customContent.staticVariants.extended.code",
                    )}
                  </code>{" "}
                  {t(
                    "support.faq.modelsAndProviders.whatVariants.customContent.staticVariants.extended.description",
                  )}
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                    {t(
                      "support.faq.modelsAndProviders.whatVariants.customContent.staticVariants.thinking.code",
                    )}
                  </code>{" "}
                  {t(
                    "support.faq.modelsAndProviders.whatVariants.customContent.staticVariants.thinking.description",
                  )}
                </li>
              </ul>
              <p>
                {t(
                  "support.faq.modelsAndProviders.whatVariants.customContent.paragraph2",
                )}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                    {t(
                      "support.faq.modelsAndProviders.whatVariants.customContent.dynamicVariants.online.code",
                    )}
                  </code>{" "}
                  {t(
                    "support.faq.modelsAndProviders.whatVariants.customContent.dynamicVariants.online.description",
                  )}
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                    {t(
                      "support.faq.modelsAndProviders.whatVariants.customContent.dynamicVariants.nitro.code",
                    )}
                  </code>{" "}
                  {t(
                    "support.faq.modelsAndProviders.whatVariants.customContent.dynamicVariants.nitro.description",
                  )}
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                    {t(
                      "support.faq.modelsAndProviders.whatVariants.customContent.dynamicVariants.floor.code",
                    )}
                  </code>{" "}
                  {t(
                    "support.faq.modelsAndProviders.whatVariants.customContent.dynamicVariants.floor.description",
                  )}
                </li>
              </ul>
            </div>
          ),
        },
        {
          questionKey:
            "support.faq.modelsAndProviders.inferenceProvider.question",
          customContent: (
            <p>
              {t(
                "support.faq.modelsAndProviders.inferenceProvider.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/docs/guides/guides/for-providers"
              >
                {t(
                  "support.faq.modelsAndProviders.inferenceProvider.customContent.providerRequirementsLink",
                )}
              </a>
              {t(
                "support.faq.modelsAndProviders.inferenceProvider.customContent.paragraph2",
              )}
            </p>
          ),
        },
        {
          questionKey:
            "support.faq.modelsAndProviders.expectedLatency.question",
          customContent: (
            <p>
              {t(
                "support.faq.modelsAndProviders.expectedLatency.customContent.paragraph1",
              )}{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                {t(
                  "support.faq.modelsAndProviders.expectedLatency.customContent.nitroVariant",
                )}
              </code>{" "}
              {t(
                "support.faq.modelsAndProviders.expectedLatency.customContent.paragraph2",
              )}
            </p>
          ),
        },
        {
          questionKey: "support.faq.modelsAndProviders.modelFallback.question",
          customContent: (
            <p>
              {t(
                "support.faq.modelsAndProviders.modelFallback.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/docs/guides/routing/provider-selection"
              >
                {t(
                  "support.faq.modelsAndProviders.modelFallback.customContent.documentationLink",
                )}
              </a>
              {t(
                "support.faq.modelsAndProviders.modelFallback.customContent.period",
              )}
            </p>
          ),
        },
      ],
    },
    {
      titleKey: "support.faq.apiTechnical.title",
      items: [
        {
          questionKey: "support.faq.apiTechnical.authMethods.question",
          answerKey: "support.faq.apiTechnical.authMethods.answer",
        },
        {
          questionKey: "support.faq.apiTechnical.rateLimits.question",
          customContent: (
            <p>
              {t(
                "support.faq.apiTechnical.rateLimits.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/docs/api/reference/limits"
              >
                {t(
                  "support.faq.apiTechnical.rateLimits.customContent.rateLimitsDocsLink",
                )}
              </a>
              {t("support.faq.apiTechnical.rateLimits.customContent.period")}
            </p>
          ),
        },
        {
          questionKey: "support.faq.apiTechnical.apiEndpoints.question",
          customContent: (
            <p>
              {t(
                "support.faq.apiTechnical.apiEndpoints.customContent.paragraph1",
              )}{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                {t(
                  "support.faq.apiTechnical.apiEndpoints.customContent.completionsEndpoint",
                )}
              </code>{" "}
              {t(
                "support.faq.apiTechnical.apiEndpoints.customContent.paragraph2",
              )}{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                {t(
                  "support.faq.apiTechnical.apiEndpoints.customContent.chatCompletionsEndpoint",
                )}
              </code>{" "}
              {t(
                "support.faq.apiTechnical.apiEndpoints.customContent.paragraph3",
              )}{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                {t(
                  "support.faq.apiTechnical.apiEndpoints.customContent.modelsEndpoint",
                )}
              </code>
              {t(
                "support.faq.apiTechnical.apiEndpoints.customContent.paragraph4",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/docs/api/reference/overview"
              >
                {t(
                  "support.faq.apiTechnical.apiEndpoints.customContent.apiDocsLink",
                )}
              </a>
              {t("support.faq.apiTechnical.apiEndpoints.customContent.period")}
            </p>
          ),
        },
        {
          questionKey: "support.faq.apiTechnical.supportedFormats.question",
          customContent: (
            <p>
              {t(
                "support.faq.apiTechnical.supportedFormats.customContent.paragraph1",
              )}{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                {t(
                  "support.faq.apiTechnical.supportedFormats.customContent.base64Text",
                )}
              </code>
              {t(
                "support.faq.apiTechnical.supportedFormats.customContent.paragraph2",
              )}
            </p>
          ),
        },
        {
          questionKey: "support.faq.apiTechnical.howStreaming.question",
          answerKey: "support.faq.apiTechnical.howStreaming.answer",
        },
        {
          questionKey: "support.faq.apiTechnical.sdkSupport.question",
          customContent: (
            <p>
              {t(
                "support.faq.apiTechnical.sdkSupport.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/docs/guides/community/openai-sdk"
              >
                {t(
                  "support.faq.apiTechnical.sdkSupport.customContent.sdkDocsLink",
                )}
              </a>
              {t("support.faq.apiTechnical.sdkSupport.customContent.period")}
            </p>
          ),
        },
      ],
    },
    {
      titleKey: "support.faq.privacyAndData.title",
      subtitleKey: "support.faq.privacyAndData.subtitle",
      items: [
        {
          questionKey: "support.faq.privacyAndData.whatDataLogged.question",
          customContent: (
            <div className="space-y-2">
              <p>
                {t(
                  "support.faq.privacyAndData.whatDataLogged.customContent.paragraph1",
                )}
              </p>
              <p>
                {t(
                  "support.faq.privacyAndData.whatDataLogged.customContent.paragraph2",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://openrouter.ai/settings/privacy-guardrails"
                >
                  {t(
                    "support.faq.privacyAndData.whatDataLogged.customContent.privacySettingsLink",
                  )}
                </a>
                {t(
                  "support.faq.privacyAndData.whatDataLogged.customContent.period",
                )}
              </p>
            </div>
          ),
        },
        {
          questionKey: "support.faq.privacyAndData.chatroomData.question",
          answerKey: "support.faq.privacyAndData.chatroomData.answer",
        },
        {
          questionKey: "support.faq.privacyAndData.thirdPartySharing.question",
          answerKey: "support.faq.privacyAndData.thirdPartySharing.answer",
        },
      ],
    },
    {
      titleKey: "support.faq.creditAndBilling.title",
      items: [
        {
          questionKey: "support.faq.creditAndBilling.purchaseOptions.question",
          answerKey: "support.faq.creditAndBilling.purchaseOptions.answer",
        },
        {
          questionKey: "support.faq.creditAndBilling.creditsExpire.question",
          answerKey: "support.faq.creditAndBilling.creditsExpire.answer",
        },
        {
          questionKey:
            "support.faq.creditAndBilling.creditsNotShowing.question",
          customContent: (
            <div className="space-y-2">
              <p>
                {t(
                  "support.faq.creditAndBilling.creditsNotShowing.customContent.paragraph1",
                )}
              </p>
              <p>
                {t(
                  "support.faq.creditAndBilling.creditsNotShowing.customContent.paragraph2",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="mailto:support@openrouter.ai"
                >
                  {t(
                    "support.faq.creditAndBilling.creditsNotShowing.customContent.supportEmail",
                  )}
                </a>{" "}
                {t(
                  "support.faq.creditAndBilling.creditsNotShowing.customContent.paragraph3",
                )}
              </p>
            </div>
          ),
        },
        {
          questionKey: "support.faq.creditAndBilling.refundPolicy.question",
          customContent: (
            <p>
              {t(
                "support.faq.creditAndBilling.refundPolicy.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/settings/credits"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "support.faq.creditAndBilling.refundPolicy.customContent.creditsPageLink",
                )}
              </a>
              {t(
                "support.faq.creditAndBilling.refundPolicy.customContent.paragraph2",
              )}
            </p>
          ),
        },
        {
          questionKey: "support.faq.creditAndBilling.monitorUsage.question",
          customContent: (
            <p>
              {t(
                "support.faq.creditAndBilling.monitorUsage.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/activity"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "support.faq.creditAndBilling.monitorUsage.customContent.activityPageLink",
                )}
              </a>{" "}
              {t(
                "support.faq.creditAndBilling.monitorUsage.customContent.paragraph2",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/docs/api/reference/credits"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "support.faq.creditAndBilling.monitorUsage.customContent.creditsApiLink",
                )}
              </a>{" "}
              {t(
                "support.faq.creditAndBilling.monitorUsage.customContent.paragraph3",
              )}
            </p>
          ),
        },
        {
          questionKey: "support.faq.creditAndBilling.freeTier.question",
          answerKey: "support.faq.creditAndBilling.freeTier.answer",
        },
        {
          questionKey: "support.faq.creditAndBilling.volumeDiscounts.question",
          answerKey: "support.faq.creditAndBilling.volumeDiscounts.answer",
        },
        {
          questionKey: "support.faq.creditAndBilling.paymentMethods.question",
          customContent: (
            <p>
              {t(
                "support.faq.creditAndBilling.paymentMethods.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://discord.gg/openrouter"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "support.faq.creditAndBilling.paymentMethods.customContent.discordLink",
                )}
              </a>
              {t(
                "support.faq.creditAndBilling.paymentMethods.customContent.period",
              )}
            </p>
          ),
        },
        {
          questionKey: "support.faq.creditAndBilling.howMakeMoney.question",
          answerKey: "support.faq.creditAndBilling.howMakeMoney.answer",
        },
      ],
    },
    {
      titleKey: "support.faq.accountManagement.title",
      items: [
        {
          questionKey: "support.faq.accountManagement.deleteAccount.question",
          customContent: (
            <div className="space-y-2">
              <p>
                {t(
                  "support.faq.accountManagement.deleteAccount.customContent.paragraph1",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://openrouter.ai/settings/account"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    "support.faq.accountManagement.deleteAccount.customContent.settingsLink",
                  )}
                </a>{" "}
                {t(
                  "support.faq.accountManagement.deleteAccount.customContent.arrow1",
                )}{" "}
                <a
                  className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                  href="https://openrouter.ai/settings/account"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    "support.faq.accountManagement.deleteAccount.customContent.accountManagementLink",
                  )}
                </a>{" "}
                {t(
                  "support.faq.accountManagement.deleteAccount.customContent.arrow2",
                )}{" "}
                {t(
                  "support.faq.accountManagement.deleteAccount.customContent.paragraph2",
                )}
              </p>
              <p>
                <strong>
                  {t(
                    "support.faq.accountManagement.deleteAccount.customContent.noteLabel",
                  )}
                </strong>{" "}
                {t(
                  "support.faq.accountManagement.deleteAccount.customContent.paragraph3",
                )}
              </p>
            </div>
          ),
        },
        {
          questionKey: "support.faq.accountManagement.teamAccess.question",
          customContent: (
            <p>
              {t(
                "support.faq.accountManagement.teamAccess.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="https://openrouter.ai/docs/guides/organization-management"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "support.faq.accountManagement.teamAccess.customContent.orgManagementDocsLink",
                )}
              </a>
              {t(
                "support.faq.accountManagement.teamAccess.customContent.period",
              )}
            </p>
          ),
        },
        {
          questionKey: "support.faq.accountManagement.analytics.question",
          answerKey: "support.faq.accountManagement.analytics.answer",
        },
        {
          questionKey: "support.faq.accountManagement.contactSupport.question",
          customContent: (
            <p>
              {t(
                "support.faq.accountManagement.contactSupport.customContent.paragraph1",
              )}{" "}
              <a
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
                href="mailto:support@openrouter.ai"
              >
                {t(
                  "support.faq.accountManagement.contactSupport.customContent.supportEmail",
                )}
              </a>
              {t(
                "support.faq.accountManagement.contactSupport.customContent.period",
              )}
            </p>
          ),
        },
      ],
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <section className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl text-gray-900 dark:text-white">
            {t("support.title")}
          </h1>
          <p className="text-muted-foreground max-w-[70ch] pt-4 text-gray-600 dark:text-gray-400">
            {t("support.subtitle")}
          </p>
          <div aria-hidden="true" className="h-6"></div>
        </section>

        <section className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 mx-auto">
          <SupportCard type="ticket" />
          <SupportCard type="documentation" />
        </section>

        <section className="w-full max-w-3xl mt-8 mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              {t("support.faq.title")}
            </h2>
            <p className="text-muted-foreground text-gray-600 dark:text-gray-400">
              {t("support.faq.subtitle")}
            </p>
          </div>

          <div className="space-y-8">
            {faqSections.map((section, index) => (
              <FAQSection
                key={index}
                titleKey={section.titleKey}
                subtitleKey={section.subtitleKey}
                items={section.items}
              />
            ))}
          </div>
        </section>

        <SupportActions />
      </div>

      <Footer />
    </div>
  );
}
