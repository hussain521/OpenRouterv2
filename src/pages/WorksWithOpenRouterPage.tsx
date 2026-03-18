import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WorksWithOpenRouterPage: React.FC = () => {
  const { t } = useTranslation();
  usePageTitle(t('worksWithOpenRouter.title'));

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <h1 className="text-3xl md:text-4xl font-semibold">{t('worksWithOpenRouter.title')}</h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="size-7 md:size-8 fill-[#6467f2]">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd"></path>
            </svg>
          </div>
          <p className="text-center text-slate-11 text-lg">{t('worksWithOpenRouter.subtitle')}</p>
          <p className="text-center text-slate-9 text-sm mt-2">{t('worksWithOpenRouter.addApp')} <a href="https://github.com/OpenRouterTeam/awesome-openrouter" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{t('worksWithOpenRouter.submitPR')}</a></p>
          <p className="text-center text-slate-9 text-sm mt-1">{t('worksWithOpenRouter.optimize')} <a href="/docs/guides/overview/auth/oauth" className="text-primary hover:underline">{t('worksWithOpenRouter.oauthDocs')}</a></p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Maxim AI */}
          <a className="group block" href="/works-with-openrouter/Maxim AI">
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-16 rounded-xl bg-white shadow-sm overflow-hidden">
                  <img alt="Maxim AI logo" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="object-contain" srcSet="/_next/image?url=%2Fimages%2Fawesome%2FMaxim%20AI.png&w=64&q=75 1x, /_next/image?url=%2Fimages%2Fawesome%2FMaxim%20AI.png&w=128&q=75 2x" src="/_next/image?url=%2Fimages%2Fawesome%2FMaxim%20AI.png&w=128&q=75" style={{color: 'transparent'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-foreground group-hover:text-slate-11 transition-colors truncate">{t('worksWithOpenRouter.apps.maximAI.name')}</h3>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-11 line-clamp-2">{t('worksWithOpenRouter.apps.maximAI.description')}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.coding')}</span>
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.productivity')}</span>
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.research')}</span>
              </div>
            </div>
          </a>

          {/* Agent Zero */}
          <a className="group block" href="/works-with-openrouter/agent-zero">
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-16 rounded-xl bg-white shadow-sm overflow-hidden">
                  <img alt="Agent Zero logo" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="object-contain" srcSet="/_next/image?url=%2Fimages%2Fawesome%2Fagent-zero.png&w=64&q=75 1x, /_next/image?url=%2Fimages%2Fawesome%2Fagent-zero.png&w=128&q=75 2x" src="/_next/image?url=%2Fimages%2Fawesome%2Fagent-zero.png&w=128&q=75" style={{color: 'transparent'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-foreground group-hover:text-slate-11 transition-colors truncate">{t('worksWithOpenRouter.apps.agentZero.name')}</h3>
                    <span className="flex-shrink-0 text-slate-9">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"></path>
                      </svg>
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-11 line-clamp-2">{t('worksWithOpenRouter.apps.agentZero.description')}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.chat')}</span>
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.research')}</span>
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.productivity')}</span>
              </div>
            </div>
          </a>

          {/* AiAssistWorks */}
          <a className="group block" href="/works-with-openrouter/aiassistworks">
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-16 rounded-xl bg-white shadow-sm overflow-hidden">
                  <img alt="AiAssistWorks logo" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="object-contain" srcSet="/_next/image?url=%2Fimages%2Fawesome%2Faiassistworks.png&w=64&q=75 1x, /_next/image?url=%2Fimages%2Fawesome%2Faiassistworks.png&w=128&q=75 2x" src="/_next/image?url=%2Fimages%2Fawesome%2Faiassistworks.png&w=128&q=75" style={{color: 'transparent'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-foreground group-hover:text-[#60646c] transition-colors truncate">{t('worksWithOpenRouter.apps.aiAssistWorks.name')}</h3>
                  </div>
                  <p className="mt-1.5 text-sm text-[#60646c] line-clamp-2">{t('worksWithOpenRouter.apps.aiAssistWorks.description')}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.productivity')}</span>
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.creative')}</span>
              </div>
            </div>
          </a>

          {/* Continue with other apps... I'll add a few more key ones */}
          {/* Aider */}
          <a className="group block" href="/works-with-openrouter/aider">
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-16 rounded-xl bg-white shadow-sm overflow-hidden">
                  <img alt="Aider logo" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="object-contain" srcSet="/_next/image?url=%2Fimages%2Fawesome%2Faider.png&w=64&q=75 1x, /_next/image?url=%2Fimages%2Fawesome%2Faider.png&w=128&q=75 2x" src="/_next/image?url=%2Fimages%2Fawesome%2Faider.png&w=128&q=75" style={{color: 'transparent'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-foreground group-hover:text-slate-11 transition-colors truncate">{t('worksWithOpenRouter.apps.aider.name')}</h3>
                    <span className="flex-shrink-0 text-slate-9">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"></path>
                      </svg>
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#60646c] line-clamp-2">{t('worksWithOpenRouter.apps.aider.description')}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.coding')}</span>
              </div>
            </div>
          </a>

          {/* LibreChat */}
          <a className="group block" href="/works-with-openrouter/librechat">
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-16 rounded-xl bg-white shadow-sm overflow-hidden">
                  <img alt="LibreChat logo" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="object-contain" srcSet="/_next/image?url=%2Fimages%2Fawesome%2Flibrechat.png&w=64&q=75 1x, /_next/image?url=%2Fimages%2Fawesome%2Flibrechat.png&w=128&q=75 2x" src="/_next/image?url=%2Fimages%2Fawesome%2Flibrechat.png&w=128&q=75" style={{color: 'transparent'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-foreground group-hover:text-slate-11 transition-colors truncate">{t('worksWithOpenRouter.apps.libreChat.name')}</h3>
                    <span className="flex-shrink-0 text-slate-9">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"></path>
                      </svg>
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#60646c] line-clamp-2">{t('worksWithOpenRouter.apps.libreChat.description')}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.chat')}</span>
              </div>
            </div>
          </a>

          {/* Chatbox */}
          <a className="group block" href="/works-with-openrouter/chatbox">
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-16 rounded-xl bg-white shadow-sm overflow-hidden">
                  <img alt="Chatbox logo" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="object-contain" srcSet="/_next/image?url=%2Fimages%2Fawesome%2Fchatbox.png&w=64&q=75 1x, /_next/image?url=%2Fimages%2Fawesome%2Fchatbox.png&w=128&q=75 2x" src="/_next/image?url=%2Fimages%2Fawesome%2Fchatbox.png&w=128&q=75" style={{color: 'transparent'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-foreground group-hover:text-slate-11 transition-colors truncate">{t('worksWithOpenRouter.apps.chatbox.name')}</h3>
                    <span className="flex-shrink-0 text-slate-9">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"></path>
                      </svg>
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-11 line-clamp-2">{t('worksWithOpenRouter.apps.chatbox.description')}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.chat')}</span>
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.coding')}</span>
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.productivity')}</span>
              </div>
            </div>
          </a>

          {/* Cline */}
          <a className="group block" href="/works-with-openrouter/cline">
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-16 rounded-xl bg-white shadow-sm overflow-hidden">
                  <img alt="Cline logo" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="object-contain" srcSet="/_next/image?url=%2Fimages%2Fawesome%2Fcline.png&w=64&q=75 1x, /_next/image?url=%2Fimages%2Fawesome%2Fcline.png&w=128&q=75 2x" src="/_next/image?url=%2Fimages%2Fawesome%2Fcline.png&w=128&q=75" style={{color: 'transparent'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-foreground group-hover:text-slate-11 transition-colors truncate">{t('worksWithOpenRouter.apps.cline.name')}</h3>
                    <span className="flex-shrink-0 text-slate-9">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"></path>
                      </svg>
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-11 line-clamp-2">{t('worksWithOpenRouter.apps.cline.description')}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.coding')}</span>
              </div>
            </div>
          </a>

          {/* SillyTavern */}
          <a className="group block" href="/works-with-openrouter/sillytavern">
            <div className="group/card text-card-foreground rounded-xl transition-all duration-200 bg-card hover:border-slate-7 hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-16 rounded-xl bg-white shadow-sm overflow-hidden">
                  <img alt="SillyTavern logo" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="object-contain" srcSet="/_next/image?url=%2Fimages%2Fawesome%2Fsillytavern.png&w=64&q=75 1x, /_next/image?url=%2Fimages%2Fawesome%2Fsillytavern.png&w=128&q=75 2x" src="/_next/image?url=%2Fimages%2Fawesome%2Fsillytavern.png&w=128&q=75" style={{color: 'transparent'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-foreground group-hover:text-slate-11 transition-colors truncate">{t('worksWithOpenRouter.apps.sillyTavern.name')}</h3>
                    <span className="flex-shrink-0 text-slate-9">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"></path>
                      </svg>
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#60646c] line-clamp-2">{t('worksWithOpenRouter.apps.sillyTavern.description')}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.chat')}</span>
                <span className="bg-[#F0F0F3] text-[#60646c] rounded px-1.5 py-0.5 text-xs">{t('worksWithOpenRouter.categories.creative')}</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorksWithOpenRouterPage;