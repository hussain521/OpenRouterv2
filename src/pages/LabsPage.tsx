import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '@/hooks/usePageTitle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TopBanner from '@/components/TopBanner';

const LabsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle(t('labs.title'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-background transition-colors duration-200">
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

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="main-content-container w-full max-w-5xl mx-auto">
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 text-primary transition-colors duration-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              />
            </svg>
            <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground transition-colors duration-200">
              {t('labs.title')}
            </h1>
          </div>
          
          <p className="text-muted-foreground mt-2 xs:mt-3 sm:mt-4 text-sm xs:text-base sm:text-lg max-w-3xl transition-colors duration-200">
            {t('labs.subtitle')}
          </p>
          
          <section className="mt-6 xs:mt-8 sm:mt-10 lg:mt-12">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-foreground transition-colors duration-200">
              {t('labs.experiments.title')}
            </h2>
            
            <div className="mt-4 xs:mt-6 grid gap-3 xs:gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <Link to="/labs/fusion" className="group">
                <div className="rounded-xl duration-200 bg-card text-card-foreground border border-border h-full p-4 xs:p-5 sm:p-6 transition-all hover:bg-muted/50 hover:shadow-md hover:border-border/80 group-hover:scale-[1.02] animate-fade-in">
                  <div className="text-primary mb-3 xs:mb-4 transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm xs:text-base sm:text-lg text-card-foreground mb-2 transition-colors duration-200">
                    {t('labs.experiments.modelFusion.title')}
                  </h3>
                  <p className="text-muted-foreground text-xs xs:text-sm sm:text-base leading-relaxed transition-colors duration-200">
                    {t('labs.experiments.modelFusion.description')}
                  </p>
                </div>
              </Link>
              
              <Link to="/spawn" className="group">
                <div className="rounded-xl duration-200 bg-card text-card-foreground border border-border h-full p-4 xs:p-5 sm:p-6 transition-all hover:bg-muted/50 hover:shadow-md hover:border-border/80 group-hover:scale-[1.02] animate-fade-in">
                  <div className="text-primary mb-3 xs:mb-4 transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm xs:text-base sm:text-lg text-card-foreground mb-2 transition-colors duration-200">
                    {t('labs.experiments.spawn.title')}
                  </h3>
                  <p className="text-muted-foreground text-xs xs:text-sm sm:text-base leading-relaxed transition-colors duration-200">
                    {t('labs.experiments.spawn.description')}
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LabsPage;