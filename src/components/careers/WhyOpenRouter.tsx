import { useTranslation } from "react-i18next";

export default function WhyOpenRouter() {
  const { t } = useTranslation();

  return (
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
              {/* Provider Icons */}
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
              {/* Additional animated icons */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="size-9 transform translate-x-9 hover:scale-110 hover:brightness-110 transition-all duration-500 ease-out animate-pulse"
                  style={{ animationDelay: `${750 + i * 150}ms` }}
                >
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-100 dark:bg-gray-800 p-1">
                    <div className={`w-4 h-4 bg-gradient-to-br rounded-full ${
                      i === 0 ? 'from-blue-500 to-purple-600' :
                      i === 1 ? 'from-green-500 to-teal-600' :
                      i === 2 ? 'from-orange-500 to-red-600' :
                      i === 3 ? 'from-pink-500 to-purple-600' :
                      'from-indigo-500 to-blue-600'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}