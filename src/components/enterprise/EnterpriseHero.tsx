import { useTranslation } from "react-i18next";

export default function EnterpriseHero() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-6 md:flex-row">
      <div className="flex flex-col gap-6 text-left max-w-[75%] md:max-w-[50%] text-center md:text-left">
        <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
          {t('enterprise.hero.title')}
        </h1>
        <p className="text-slate-11 text-xl md:text-2xl">
          {t('enterprise.hero.subtitle')}
        </p>
      </div>
      <div className="flex flex-col md:max-w-[55%]">
        <div>
          <p className="text-slate-11 mb-4 text-sm font-medium uppercase tracking-wider">
            {t('enterprise.hero.oneApiLabel')}
          </p>
          <div className="group/card text-card-foreground rounded-xl transition-all duration-200 hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg from-slate-1 to-slate-2 relative min-h-48 w-full overflow-hidden bg-gradient-to-br p-8">
            <div className="absolute inset-0">
              <div className="pointer-events-none absolute inset-0 z-20">
                <div className="from-slate-1 to-slate-1 absolute inset-0 bg-gradient-to-t via-transparent opacity-50"></div>
                <div className="from-slate-1 to-slate-1 absolute inset-0 bg-gradient-to-r via-transparent opacity-50"></div>
              </div>
              <div className="absolute inset-[0.5rem] z-10 grid grid-cols-8 gap-x-1 gap-y-1">
                {/* Provider Icons Grid */}
                <div className="size-6 transform transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for microsoft" className="h-full w-full object-cover" src="/images/icons/Microsoft.svg" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for perplexity" className="h-full w-full object-cover" src="/images/icons/Perplexity.svg" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for minimax" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://minimaxi.com/&size=256" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for qwen" className="h-full w-full object-cover" src="/images/icons/Qwen.png" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for mistralai" className="h-full w-full object-cover" src="/images/icons/Mistral.png" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for deepseek" className="h-full w-full object-cover" src="/images/icons/DeepSeek.png" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for huggingface" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://huggingface.co/&size=256" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for cohere" className="h-full w-full object-cover" src="/images/icons/Cohere.png" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform translate-x-3.5 transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for meta-llama" className="h-full w-full object-cover" src="/images/icons/Meta.png" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform translate-x-3.5 transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for nvidia" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://nvidia.com/&size=256" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform translate-x-3.5 transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for nousresearch" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://nousresearch.com/&size=256" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform translate-x-3.5 transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for x-ai" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://x.ai/&size=256" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform translate-x-3.5 transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for anthropic" className="h-full w-full object-cover" src="/images/icons/Anthropic.svg" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform translate-x-3.5 transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full dark:invert">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for openai" className="h-full w-full object-cover" src="/images/icons/OpenAI.svg" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform translate-x-3.5 transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for google" className="h-full w-full object-cover" src="/images/icons/GoogleGemini.svg" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform translate-x-3.5 transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for groq" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://huggingface.co/&size=256" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="size-6 transform transition-all duration-300 ease-out hover:scale-110 hover:brightness-110">
                  <div className="flex items-center justify-center size-6 flex-shrink-0 rounded-full border shadow bg-gray-9 p-1">
                    <div className="overflow-hidden rounded-full">
                      <picture className="h-full w-full flex-shrink-0">
                        <img width="256" height="256" alt="Favicon for google ai studio" className="h-full w-full object-cover" src="/images/icons/GoogleAIStudio.svg" />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 pt-8 sm:flex-row sm:items-start">
          <a href="/enterprise/form" className="w-full">
            <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 leading-6 bg-[#6467f2e6] text-white  shadow hover:bg-[#6467f2e6]/90 hover:text-[#6467f2e6]-foreground h-10 rounded-md px-8 w-full relative group">
              {t('enterprise.hero.contactSales')}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-4 absolute right-4 transition-transform group-hover:translate-x-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
              </svg>
            </button>
          </a>
        </div>
        <div className="mt-1 flex w-full justify-center pt-2 sm:ml-0">
          <a href="/docs/use-cases/for-providers" className="w-full">
            <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-transparent h-8 rounded-md px-3 text-xs w-full relative group">
              <span>{t('enterprise.hero.providerCta')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-4 absolute right-4 transition-transform group-hover:translate-x-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}