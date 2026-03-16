import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="border-t border-gray-200 dark:border-border mt-12 sm:mt-16 lg:mt-20 bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 text-sm">
          {/* Logo Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 mb-6 sm:mb-0">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-semibold text-lg sm:text-xl dark:text-foreground">OpenRouter</span>
            </div>
            <p className="text-gray-500 dark:text-muted-foreground text-sm sm:text-base">{t("footer.copyright")}</p>
          </div>

          {/* Product */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-foreground">{t("footer.product.title")}</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.product.chat")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.product.rankings")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.product.models")}</li>
              <li>
                <Link
                  to="/providers"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("footer.product.providers")}
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("footer.product.pricing")}
                </Link>
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.product.enterprise")}</li>
            </ul>
          </div>

          {/* Company */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-foreground">{t("footer.company.title")}</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("footer.company.about")}
                </Link>
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.company.announcements")}</li>
              <li>
                <Link
                  to="/careers"
                  className="flex items-center gap-2 hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  <span className="truncate">{t("footer.company.careers")}</span>
                  <span className="text-xs bg-indigo-100 dark:bg-primary/20 text-indigo-600 dark:text-primary px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
                    {t("footer.company.hiring")}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("footer.company.privacy")}
                </Link>
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("footer.company.termsOfService")}
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("footer.company.support")}
                </Link>
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.company.stateOfAI")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.company.worksWithOR")}</li>
            </ul>
          </div>

          {/* Developer */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-foreground">{t("footer.developer.title")}</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.developer.documentation")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.developer.apiReference")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.developer.sdk")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.developer.status")}</li>
            </ul>
          </div>

          {/* Connect */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-foreground">{t("footer.connect.title")}</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.connect.discord")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.connect.github")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.connect.linkedin")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.connect.x")}</li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">{t("footer.connect.youtube")}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
