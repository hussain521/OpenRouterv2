import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AboutFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 dark:border-border mt-12 sm:mt-16 lg:mt-20 bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 text-sm">
          {/* Logo Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 mb-6 sm:mb-0">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-semibold text-lg sm:text-xl dark:text-foreground">
                OpenRouter
              </span>
            </div>
            <p className="text-gray-500 dark:text-muted-foreground text-sm sm:text-base">
              {t("aboutFooter.copyright")}
            </p>
          </div>

          {/* Company Section */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-foreground">
              {t("aboutFooter.company.title")}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("aboutFooter.company.aboutUs")}
                </Link>
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.company.careers")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.company.contact")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.company.privacyPolicy")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.company.termsOfService")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.company.blog")}
              </li>
            </ul>
          </div>

          {/* Product Section */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-foreground">
              {t("aboutFooter.product.title")}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.product.api")}
              </li>
              <li>
                <Link
                  to="/models"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("aboutFooter.product.models")}
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("aboutFooter.product.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("aboutFooter.product.chat")}
                </Link>
              </li>
              <li>
                <Link
                  to="/compare"
                  className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors"
                >
                  {t("aboutFooter.product.compare")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-foreground">
              {t("aboutFooter.resources.title")}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.resources.documentation")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.resources.apiReference")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.resources.tutorials")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.resources.support")}
              </li>
              <li className="hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                {t("aboutFooter.resources.community")}
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-foreground">
              {t("aboutFooter.connect.title")}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-muted-foreground">
              <li className="flex items-center gap-2 hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                {t("aboutFooter.connect.twitter")}
              </li>
              <li className="flex items-center gap-2 hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {t("aboutFooter.connect.github")}
              </li>
              <li className="flex items-center gap-2 hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z" />
                </svg>
                {t("aboutFooter.connect.discord")}
              </li>
              <li className="flex items-center gap-2 hover:text-black dark:hover:text-foreground cursor-pointer transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {t("aboutFooter.connect.linkedin")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
