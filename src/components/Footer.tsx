import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-lg dark:text-white">OpenRouter</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t("footer.copyright")}</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">{t("footer.product.title")}</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.product.chat")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.product.rankings")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.product.models")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.product.providers")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.product.pricing")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.product.enterprise")}</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">{t("footer.company.title")}</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.company.about")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.company.announcements")}</li>
              <li className="flex items-center gap-2 hover:text-black dark:hover:text-white cursor-pointer">
                {t("footer.company.careers")}
                <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded">
                  {t("footer.company.hiring")}
                </span>
              </li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.company.privacy")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">
                {t("footer.company.termsOfService")}
              </li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.company.support")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.company.stateOfAI")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.company.worksWithOR")}</li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">{t("footer.developer.title")}</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.developer.documentation")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.developer.apiReference")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.developer.sdk")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.developer.status")}</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">{t("footer.connect.title")}</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.connect.discord")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.connect.github")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.connect.linkedin")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.connect.x")}</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">{t("footer.connect.youtube")}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
