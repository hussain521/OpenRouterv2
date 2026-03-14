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

const features = [
  { name: "Platform Fees", free: "N/A", pay: "5.5%", enterprise: "Bulk discounts available" },
  { name: "Models", free: "25+ free models", pay: "300+ models", enterprise: "300+ models" },
  { name: "Providers", free: "4 free providers", pay: "60+ providers", enterprise: "60+ providers" },
  { name: "Chat and API Access", free: true, pay: true, enterprise: true },
  { name: "Activity Logs & Export", free: true, pay: true, enterprise: true },
  { name: "Auto-routing vendor selections", free: false, pay: true, enterprise: true },
  { name: "Budgets & Spend Controls", free: false, pay: true, enterprise: true },
  { name: "Prompt Caching", free: false, pay: true, enterprise: true },
  { name: "Management API key", free: false, pay: true, enterprise: true },
  { name: "Admin Controls", free: false, pay: true, enterprise: true },
  { name: "Data Policy-Based Routing", free: false, pay: true, enterprise: true },
  { name: "Managed Policy Enforcement", free: false, pay: false, enterprise: true },
  { name: "Provider Data Explorer", free: false, pay: false, enterprise: true },
  { name: "SSO/SAML", free: false, pay: false, enterprise: true },
  { name: "Contractual SLAs", free: false, pay: false, enterprise: true },
  { name: "Payment options", free: false, pay: "Credit card, crypto & more", enterprise: "Invoicing options" },
  { name: "BYOK Limits", free: false, pay: "1M free reqs/month", enterprise: "5M free reqs/month" },
  { name: "Rate limits", free: "50 reqs/day", pay: "High global limits", enterprise: "Optional dedicated limits" },
  { name: "Token Pricing", free: "Free models only", pay: "No minimum spend", enterprise: "Volume commitments" },
  { name: "Support", free: "Community Support", pay: "Email Support", enterprise: "Slack Channel Support" },
]

export default function PricingPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle(t("pricing.title", "Pricing"));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const plans = [
    {
      name: t("pricing.plans.indie.name", "Indie Hacker"),
      price: t("pricing.plans.indie.price", "$9"),
      period: t("pricing.plans.indie.period", "/month"),
      description: t("pricing.plans.indie.description", "Perfect for individual developers and small projects"),
      features: [
        t("pricing.plans.indie.features.requests", "10,000 requests/month"),
        t("pricing.plans.indie.features.models", "Access to 50+ AI models"),
        t("pricing.plans.indie.features.support", "Community support"),
        t("pricing.plans.indie.features.analytics", "Basic analytics"),
        t("pricing.plans.indie.features.api", "API access")
      ],
      popular: false
    },
    {
      name: t("pricing.plans.startup.name", "AI Native Startup"),
      price: t("pricing.plans.startup.price", "$49"),
      period: t("pricing.plans.startup.period", "/month"),
      description: t("pricing.plans.startup.description", "Ideal for AI-first startups and growing teams"),
      features: [
        t("pricing.plans.startup.features.requests", "100,000 requests/month"),
        t("pricing.plans.startup.features.models", "Access to all AI models"),
        t("pricing.plans.startup.features.support", "Priority support"),
        t("pricing.plans.startup.features.analytics", "Advanced analytics"),
        t("pricing.plans.startup.features.team", "Team collaboration"),
        t("pricing.plans.startup.features.webhooks", "Webhooks & integrations")
      ],
      popular: true
    },
    {
      name: t("pricing.plans.enterprise.name", "Enterprise"),
      price: t("pricing.plans.enterprise.price", "Custom"),
      period: "",
      description: t("pricing.plans.enterprise.description", "For large organizations with custom requirements"),
      features: [
        t("pricing.plans.enterprise.features.requests", "Unlimited requests"),
        t("pricing.plans.enterprise.features.models", "All models + custom deployments"),
        t("pricing.plans.enterprise.features.support", "Dedicated support"),
        t("pricing.plans.enterprise.features.sla", "99.9% SLA guarantee"),
        t("pricing.plans.enterprise.features.security", "Enhanced security"),
        t("pricing.plans.enterprise.features.onboarding", "Custom onboarding")
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
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

      <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Pricing</h1>
        <p className="text-muted-foreground mt-2">
          Plans for indie hackers, AI native startups, and enterprises
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            style={{
              backgroundColor: '#6467f2',
              boxShadow: 'none'
            }}
          >
            Get Started
          </Button>
          <Button variant="outline">Talk To Sales</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]"></TableHead>
              <TableHead className="text-center">Free</TableHead>
              <TableHead className="text-center bg-muted">Pay-as-you-go</TableHead>
              <TableHead className="text-center">Enterprise</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {features.map((feature, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{feature.name}</TableCell>

                <TableCell className="text-center">
                  {typeof feature.free === "boolean" ? (
                    feature.free ? (
                      <Check className="mx-auto text-green-600" />
                    ) : (
                      <X className="mx-auto text-muted-foreground" />
                    )
                  ) : (
                    feature.free
                  )}
                </TableCell>

                <TableCell className="text-center bg-muted">
                  {typeof feature.pay === "boolean" ? (
                    feature.pay ? (
                      <Check className="mx-auto text-green-600" />
                    ) : (
                      <X className="mx-auto text-muted-foreground" />
                    )
                  ) : (
                    feature.pay
                  )}
                </TableCell>

                <TableCell className="text-center">
                  {typeof feature.enterprise === "boolean" ? (
                    feature.enterprise ? (
                      <Check className="mx-auto text-green-600" />
                    ) : (
                      <X className="mx-auto text-muted-foreground" />
                    )
                  ) : (
                    feature.enterprise
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Buttons under table */}
      <div className="flex justify-center gap-6 mt-8">
        <Button
          variant="outline"
          style={{ color: '#6467f2' }}
        >
          Get Started For Free
        </Button>
        <Button
          style={{
            backgroundColor: '#6467f2',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          Buy Credits
        </Button>
        <Button
          variant="outline"
          style={{ color: '#6467f2' }}
        >
          Contact Sales
        </Button>
      </div>

      {/* FAQ */}
      <div className="mt-20 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible >
          <AccordionItem value="1" className="border border-gray-200 mb-1 p-1 dark:border-gray-700 rounded-lg">
            <AccordionTrigger>How are tokens billed?</AccordionTrigger>
            <AccordionContent>
              Tokens are billed based on model usage and API calls.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="2" className="border border-gray-200 mb-1 p-1 dark:border-gray-700 rounded-lg">
            <AccordionTrigger>Do you mark up provider pricing?</AccordionTrigger>
            <AccordionContent>
              Pricing depends on provider rates and usage tiers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="3" className="border border-gray-200 mb-1 p-1 dark:border-gray-700 rounded-lg">
            <AccordionTrigger>
              How is billing structured for BYOK, Pay-As-You-Go vs Enterprise?
            </AccordionTrigger>
            <AccordionContent>
              Enterprise plans offer volume pricing and custom agreements.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

     </div>

      <Footer />
    </div>
  );
}