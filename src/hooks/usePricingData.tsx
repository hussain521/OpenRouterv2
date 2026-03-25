import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface PricingFeature {
  nameKey: string;
  free: string | boolean;
  pay: string | boolean;
  enterprise: string | boolean;
}

export function usePricingData(): PricingFeature[] {
  const { t } = useTranslation();

  return useMemo(() => [
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
  ], [t]);
}

export type { PricingFeature };