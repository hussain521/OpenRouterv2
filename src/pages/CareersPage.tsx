import { useTranslation } from "react-i18next";
import { usePageTitle } from "../hooks/usePageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

export default function CareersPage() {
  const { t } = useTranslation();
  usePageTitle(t("careers.pageTitle"));

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Navbar />
      <section className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-gray-900 dark:text-foreground">
          {t("careers.hero.title")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {t("careers.hero.subtitle")}
        </p>
        <Button
          className="inline-flex items-center gap-2 bg-[#6467f2] text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-[#6467f2] /90 transition-colors"
          size="lg"
        >
          {t("careers.hero.seeOpenPositions")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Button>
      </section>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border/50 h-px w-full max-w-4xl mx-auto"
      ></div>
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-gray-900 dark:text-foreground">
          {t("careers.whyOpenRouter.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-muted-foreground mb-4">
              {t("careers.whyOpenRouter.description1")}
            </p>
            <p className="text-muted-foreground">
              {t("careers.whyOpenRouter.description2")}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden min-h-[220px] relative border border-border">
            <div className="absolute inset-0">
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-30"></div>
              </div>
              <div className="absolute inset-4 grid grid-cols-5 gap-x-0 gap-y-1 scale-105 z-10">
                {/* Provider Icons - Simplified version */}
                <div
                  className="size-9 transform hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "0ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="overflow-hidden rounded-full">
                      <img
                        width="24"
                        height="24"
                        alt="Microsoft"
                        className="h-full w-full object-cover"
                        src="/images/icons/Microsoft.svg"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="size-9 transform hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "150ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="overflow-hidden rounded-full">
                      <img
                        width="24"
                        height="24"
                        alt="Meta"
                        className="h-full w-full object-cover"
                        src="/public/Meta.png"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="size-9 transform hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "300ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="overflow-hidden rounded-full">
                      <img
                        width="24"
                        height="24"
                        alt="Google"
                        className="h-full w-full object-cover"
                        src="/public/GoogleGemini.svg"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="size-9 transform hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "450ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="overflow-hidden rounded-full dark:invert">
                      <img
                        width="24"
                        height="24"
                        alt="OpenAI"
                        className="h-full w-full object-cover"
                        src="/public/OpenAI.svg"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="size-9 transform hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "600ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="overflow-hidden rounded-full">
                      <img
                        width="24"
                        height="24"
                        alt="Google AI Studio"
                        className="h-full w-full object-cover"
                        src="/public/GoogleAIStudio.svg"
                      />
                    </div>
                  </div>
                </div>
                {/* Additional rows of icons */}
                <div
                  className="size-9 transform translate-x-9 hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "750ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div
                  className="size-9 transform translate-x-9 hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "900ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-full"></div>
                  </div>
                </div>
                <div
                  className="size-9 transform translate-x-9 hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "1050ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                  </div>
                </div>
                <div
                  className="size-9 transform translate-x-9 hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "1200ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div
                  className="size-9 transform translate-x-9 hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: "1350ms" }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border/50 h-px w-full max-w-4xl mx-auto"
      ></div>
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-foreground">
            {t("careers.benefits.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("careers.benefits.subtitle")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[#6467f2] /10 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">{t("careers.benefits.remoteFirst.title")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("careers.benefits.remoteFirst.description")}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[#6467f2] /10 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {t("careers.benefits.competitiveCompensation.title")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("careers.benefits.competitiveCompensation.description")}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[#6467f2] /10 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {t("careers.benefits.healthWellness.title")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("careers.benefits.healthWellness.description")}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[#6467f2] /10 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {t("careers.benefits.unlimitedPto.title")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("careers.benefits.unlimitedPto.description")}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[#6467f2] /10 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">{t("careers.benefits.wfhBudget.title")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("careers.benefits.wfhBudget.description")}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[#6467f2] /10 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {t("careers.benefits.quarterlyOffsites.title")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("careers.benefits.quarterlyOffsites.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border/50 h-px w-full max-w-4xl mx-auto"
      ></div>{" "}
      <section
        id="open-positions"
        className="w-full max-w-2xl mx-auto px-6 py-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-foreground">
            {t("careers.openPositions.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("careers.openPositions.subtitle")}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Partner Development Manager, Provider Ecosystem job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.partnerDevelopmentManager.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.partnerDevelopmentManager.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Senior Full-Stack Engineer job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.seniorFullStackEngineer.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.seniorFullStackEngineer.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Provider Operations & Support job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.providerOperationsSupport.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.providerOperationsSupport.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Developer Relations Lead job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.developerRelationsLead.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.developerRelationsLead.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Lifecycle Marketing Lead job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.lifecycleMarketingLead.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.lifecycleMarketingLead.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Account Executive job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.accountExecutive.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.accountExecutive.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Strategic Enterprise Account Executive job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.strategicEnterpriseAccountExecutive.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.strategicEnterpriseAccountExecutive.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Customer Engineer job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.customerEngineer.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.customerEngineer.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Finance and Business Operations Manager job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.financeBusinessOperationsManager.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.financeBusinessOperationsManager.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label="View Business Development Representative job details"
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t("careers.openPositions.positions.businessDevelopmentRepresentative.title")}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t("careers.openPositions.positions.businessDevelopmentRepresentative.department")}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
