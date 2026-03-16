import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks/usePageTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle(t("about.title"));

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Hero Section */}
        <div className="text-center ">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("about.title")}
          </h2>
        </div>

        {/* Main Content Section */}
        <div className="flex justify-center mb-20 lg:mb-28">
          <div className="max-w-6xl mx-auto text-center">
            <div className="bg-white dark:bg-black rounded-xl   ">
              <p className="text-md lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.description")}
              </p>
            </div>
          </div>
  
          </div>
  
          {/* Stats Section */}
          <div className="flex flex-col gap-8 md:gap-12 mb-20 lg:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto justify-center">
            <div className="group/card rounded-xl transition-all duration-200 bg-card hover:bg-card/80 text-foreground shadow-inner hover:scale-110 hover:shadow-slate-6">
              <div className="p-4 md:p-6">
                <div className="flex flex-col items-center gap-1 md:gap-2">
                  <p className="text-3xl md:text-4xl font-bold text-[#6467f2]">5M+</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{t("about.stats.globalUsers").split(" ").slice(1).join(" ")}</p>
                </div>
              </div>
            </div>
            <div className="group/card rounded-xl transition-all duration-200 bg-card hover:bg-card/80 text-foreground shadow-inner hover:scale-110 hover:shadow-slate-6">
              <div className="p-4 md:p-6">
                <div className="flex flex-col items-center gap-1 md:gap-2">
                  <p className="text-3xl md:text-4xl font-bold text-foreground">300+</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{t("about.stats.models").split(" ").slice(1).join(" ")}</p>
                </div>
              </div>
            </div>
            <div className="group/card rounded-xl transition-all duration-200 bg-card hover:bg-card/80 text-foreground shadow-inner hover:scale-110 hover:shadow-slate-6">
              <div className="p-4 md:p-6">
                <div className="flex flex-col items-center gap-1 md:gap-2">
                  <p className="text-3xl md:text-4xl font-bold text-foreground">60+</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{t("about.stats.providers").split(" ").slice(1).join(" ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Article Section */}
        <div className="max-w-4xl mx-auto mb-20 lg:mb-28">
          <div className="group/card rounded-xl duration-200 bg-card hover:bg-card/80 text-foreground shadow-inner p-8 hover:shadow-slate-6 transition-shadow cursor-pointer">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center bg-white rounded-lg p-4 size-20 shadow-sm">
                  <img alt="The Wall Street Journal" className="max-h-full max-w-full object-contain" src="/images/icons/wsj-logo.png" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                  {t("about.news.title")}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {t("about.news.description")}
                </p>
                <div className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
                  {t("about.news.readMore")}
                </div>
              </div>
            </div>
          </div>
  
          {/* Investors Section */}
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-16 sm:mb-20 lg:mb-28">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 sm:mb-12 lg:mb-16 text-center text-gray-900 dark:text-white">
              {t("about.investors.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 items-center justify-items-center">
              <div className="flex items-center justify-center h-10 sm:h-12 w-full">
                <img
                  alt="Andreessen Horowitz logo"
                  loading="lazy"
                  width="180"
                  height="48"
                  decoding="async"
                  className="object-contain max-h-8 sm:max-h-10 lg:max-h-12 max-w-full"
                  src="/images/icons/a16z-wordmark.svg"
                  style={{color: 'transparent'}}
                />
              </div>
              <div className="flex items-center justify-center h-10 sm:h-12 w-full">
                <img
                  alt="Menlo Ventures logo"
                  loading="lazy"
                  width="180"
                  height="48"
                  decoding="async"
                  className="object-contain max-h-8 sm:max-h-10 lg:max-h-12 max-w-full"
                  src="/images/icons/menlo.png"
                  style={{color: 'transparent'}}
                />
              </div>
              <div className="flex items-center justify-center h-10 sm:h-12 w-full">
                <img
                  alt="Sequoia Capital logo"
                  loading="lazy"
                  width="180"
                  height="32"
                  decoding="async"
                  className="object-contain max-h-8 sm:max-h-10 lg:max-h-12 max-w-full"
                  src="/images/icons/sequoia.png"
                  style={{color: 'transparent'}}
                />
              </div>
            </div>
    
            {/* Call-to-Action Section */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16 lg:mb-24">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                  {t("about.callToAction.title")}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t("about.callToAction.description")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                <a href="/enterprise/form" className="flex-1 sm:flex-none">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 leading-6 bg-[#6467f2] text-primary-foreground shadow hover:bg-primary/90 hover:text-primary-foreground h-10 sm:h-11 rounded-md px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
                    {t("about.callToAction.getInTouch")}
                  </button>
                </a>
                <a href="/docs/quickstart" className="flex-1 sm:flex-none">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 leading-6 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 sm:h-11 rounded-md px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
                    {t("about.callToAction.viewDocs")}
                  </button>
                </a>
              </div>
            </div>
             
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}