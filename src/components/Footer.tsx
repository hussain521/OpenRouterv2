import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 dark:border-border mt-12 xs:mt-16 sm:mt-20 lg:mt-24 bg-white dark:bg-background transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 xs:gap-8 sm:gap-10 lg:gap-12 text-sm">
          {/* Logo Section */}
          <div className="col-span-1 xs:col-span-2 sm:col-span-3 lg:col-span-1 mb-6 xs:mb-8 lg:mb-0">
            <div className="flex items-center gap-2 mb-3 xs:mb-4">
              <span className="font-semibold text-lg xs:text-xl sm:text-2xl lg:text-xl dark:text-foreground transition-colors duration-200">
                OpenRouter
              </span>
            </div>
            <p className="text-gray-500 dark:text-muted-foreground text-sm xs:text-base max-w-sm transition-colors duration-200">
              {t("footer.copyright")}
            </p>
          </div>

          {/* Product */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 xs:mb-4 text-gray-900 dark:text-foreground text-sm xs:text-base transition-colors duration-200">
              {t("footer.product.title")}
            </h3>
            <ul className="space-y-2 xs:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.product.chat")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.product.rankings")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.product.models")}
              </li>
              <li>
                <Link
                  to="/providers"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.product.providers")}
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.product.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  to="/enterprise"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.product.enterprise")}
                </Link>
              </li>
              <li>
                <Link
                  to="/labs"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.product.labs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 xs:mb-4 text-gray-900 dark:text-foreground text-sm xs:text-base transition-colors duration-200">
              {t("footer.company.title")}
            </h3>
            <ul className="space-y-2 xs:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.company.about")}
                </Link>
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.company.announcements")}
              </li>
              <li>
                <Link
                  to="/careers"
                  className="flex items-center gap-2 hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm"
                >
                  <span className="truncate">
                    {t("footer.company.careers")}
                  </span>
                  <span className="text-xs bg-indigo-100 dark:bg-primary/20 text-indigo-600 dark:text-primary px-1.5 xs:px-2 py-0.5 rounded whitespace-nowrap transition-colors duration-200">
                    {t("footer.company.hiring")}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.company.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.company.termsOfService")}
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.company.support")}
                </Link>
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.company.stateOfAI")}
              </li>
              <li>
                <Link
                  to="/works-with-openrouter"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.company.worksWithOR")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 xs:mb-4 text-gray-900 dark:text-foreground text-sm xs:text-base transition-colors duration-200">
              {t("footer.developer.title")}
            </h3>
            <ul className="space-y-2 xs:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.developer.documentation")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.developer.apiReference")}
              </li>
              <li>
                <Link
                  to="/sdk"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm block"
                >
                  {t("footer.developer.sdk")}
                </Link>
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.developer.status")}
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 xs:mb-4 text-gray-900 dark:text-foreground text-sm xs:text-base transition-colors duration-200">
              {t("footer.connect.title")}
            </h3>
            <ul className="space-y-2 xs:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.connect.discord")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.connect.github")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.connect.linkedin")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.connect.x")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors duration-200 text-sm">
                {t("footer.connect.youtube")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
