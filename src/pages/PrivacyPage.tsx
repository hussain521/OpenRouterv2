import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks/usePageTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import { useState, useEffect } from "react";

export default function PrivacyPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle(t("privacy.title"));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <article className="main-content-container prose-h1:text-center prose-h2:text-center prose-h2:text-base prose-h3:text-xl prose-p:text-base prose-h1:py-3 prose-h2:pb-6 prose-h3:pb-4 prose-h3:pt-2 prose-p:pb-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center py-3">
            {t("privacy.title")}
          </h1>
          
          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            <em>{t("privacy.lastUpdated")}</em>
          </p>
          
          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.intro.paragraph1")}
          </p>
          
          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.intro.paragraph2")}
          </p>
          
          <ul className="ml-8 list-disc pb-2 text-gray-700 dark:text-gray-300">
            {Array.isArray(t("privacy.intro.listItems", { returnObjects: true }))
              ? (t("privacy.intro.listItems", { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="pb-2" dangerouslySetInnerHTML={{ __html: item }} />
                ))
              : null
            }
          </ul>
          
          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.intro.paragraph3")} <a href="https://openrouter.ai/terms" className="underline underline-offset-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer">here
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="ml-1 inline-block w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
              </svg>
            </a>
          </p>

          <h3 className="relative flex items-center justify-start gap-2 group w-full font-medium text-accent-foreground text-xl pb-4 pt-2 text-gray-900 dark:text-white">
            <span id="_1_-collection-of-personal-data" className="absolute -top-24"></span>
            {t("privacy.sections.collection.title")}
            <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-6 rounded-md px-1.5 text-xs shadow-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path>
              </svg>
            </button>
          </h3>

          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.sections.collection.content")}
          </p>

          <h2 className="relative flex items-center justify-start gap-2 group mt-3 w-full text-accent-foreground text-base pb-6 text-center text-gray-900 dark:text-white">
            <span id="personal-data-you-voluntarily-provide-to-us" className="absolute -top-24"></span>
            {t("privacy.sections.voluntaryData.title")}
            <button className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-6 rounded-md px-1.5 text-xs shadow-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path>
              </svg>
            </button>
          </h2>

          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.sections.voluntaryData.content")}
          </p>

          <ul className="ml-8 list-disc pb-2 text-gray-700 dark:text-gray-300">
            {Array.isArray(t("privacy.sections.voluntaryData.items", { returnObjects: true }))
              ? (t("privacy.sections.voluntaryData.items", { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="pb-2">{item}</li>
                ))
              : null
            }
          </ul>

          <h2 className="relative flex items-center justify-start gap-2 group mt-3 w-full text-accent-foreground text-base pb-6 text-center text-gray-900 dark:text-white">
            <span id="personal-data-collected-automatically" className="absolute -top-24"></span>
            {t("privacy.sections.automaticData.title")}
          </h2>

          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.sections.automaticData.content")}
          </p>

          <h3 className="relative flex items-center justify-start gap-2 group w-full font-medium text-accent-foreground text-xl pb-4 pt-2 text-gray-900 dark:text-white">
            <span id="_2_-how-we-use-your-personal-data" className="absolute -top-24"></span>
            {t("privacy.sections.howWeUse.title")}
          </h3>

          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.sections.howWeUse.content")}
          </p>

          <h3 className="relative flex items-center justify-start gap-2 group w-full font-medium text-accent-foreground text-xl pb-4 pt-2 text-gray-900 dark:text-white">
            <span id="_3_-how-we-share-and-disclose-your-personal-data" className="absolute -top-24"></span>
            {t("privacy.sections.sharing.title")}
          </h3>

          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.sections.sharing.content")}
          </p>

          <h3 className="relative flex items-center justify-start gap-2 group w-full font-medium text-accent-foreground text-xl pb-4 pt-2 text-gray-900 dark:text-white">
            <span id="_4_-your-rights-and-choices" className="absolute -top-24"></span>
            {t("privacy.sections.rights.title")}
          </h3>

          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.sections.rights.content")} <a href="mailto:privacy@openrouter.ai" className="underline underline-offset-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">privacy@openrouter.ai</a>.
          </p>

          <h3 className="relative flex items-center justify-start gap-2 group w-full font-medium text-accent-foreground text-xl pb-4 pt-2 text-gray-900 dark:text-white">
            <span id="_5_-data-security" className="absolute -top-24"></span>
            {t("privacy.sections.security.title")}
          </h3>

          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.sections.security.content")}
          </p>

          <h3 className="relative flex items-center justify-start gap-2 group w-full font-medium text-accent-foreground text-xl pb-4 pt-2 text-gray-900 dark:text-white">
            <span id="_6_-contact-information" className="absolute -top-24"></span>
            {t("privacy.sections.contact.title")}
          </h3>

          <p className="text-base pb-4 text-gray-700 dark:text-gray-300">
            {t("privacy.sections.contact.content")}
          </p>
        </article>
      </div>

      <Footer />
    </div>
  );
}