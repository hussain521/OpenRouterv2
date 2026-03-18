import { useTranslation } from "react-i18next";

export default function EnterpriseInfrastructure() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 md:space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold md:text-4xl text-foreground">{t('enterprise.infrastructure.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t('enterprise.infrastructure.subtitle')}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {/* LLM Observability Card */}
        <a href="/docs/guides/features/broadcast" className="h-full group/card">
          <div className="group/card text-card-foreground rounded-xl duration-200 bg-card hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full overflow-hidden hover:border-primary transition-colors">
            <div className="bg-background shadow-none transition-transform group-hover/card:scale-105 group-hover/card:-translate-y-1 relative h-48 overflow-hidden rounded-t-xl border-b p-4 flex-shrink-0">
              <div className="h-full flex flex-col items-center pt-2">
                <div className="bg-muted px-2 py-1 rounded text-xs text-foreground flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                  </svg>
                  <span>Traces</span>
                </div>
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="relative w-full max-w-52 flex flex-col items-center gap-y-3">
                    <svg width="100%" height="60" viewBox="0 0 200 60" fill="none" xmlns="https://www.w3.org/2000/svg" className="text-muted-foreground/60" aria-labelledby="observability-diagram-title">
                      <title id="observability-diagram-title">Observability broadcast visualization</title>
                      <path d="M96 0 C100 35, 25 25, 14 55" stroke="currentColor" strokeWidth="0.75"></path>
                      <path d="M99 0 C100 35, 70 30, 70 55" stroke="currentColor" strokeWidth="0.75"></path>
                      <path d="M101 0 C100 35, 130 30, 130 55" stroke="currentColor" strokeWidth="0.75"></path>
                      <path d="M104 0 C100 35, 175 25, 186 55" stroke="currentColor" strokeWidth="0.75"></path>
                    </svg>
                    <div className="flex justify-between w-full px-1">
                      <div className="flex flex-col items-center gap-1">
                        <div className="size-7 rounded bg-muted/40 shadow-inner p-1 flex items-center justify-center">
                          <div className="overflow-hidden rounded">
                            <picture className="h-full w-full flex-shrink-0">
                              <img width="256" height="256" alt="Favicon for https://datadoghq.com" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://datadoghq.com&size=256" />
                            </picture>
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground">Datadog</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="size-7 rounded bg-muted/40 shadow-inner p-1 flex items-center justify-center">
                          <div className="overflow-hidden rounded">
                            <picture className="h-full w-full flex-shrink-0">
                              <img width="256" height="256" alt="Favicon for https://langfuse.com" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://langfuse.com&size=256" />
                            </picture>
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground">Langfuse</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="size-7 rounded bg-muted/40 shadow-inner p-1 flex items-center justify-center">
                          <div className="overflow-hidden rounded">
                            <picture className="h-full w-full flex-shrink-0">
                              <img width="256" height="256" alt="Favicon for https://wandb.ai" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://wandb.ai&size=256" />
                            </picture>
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground">Weave</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="size-7 rounded bg-muted/40 shadow-inner p-1 flex items-center justify-center">
                          <div className="overflow-hidden rounded">
                            <picture className="h-full w-full flex-shrink-0">
                              <img width="256" height="256" alt="Favicon for https://aws.amazon.com/s3/" className="h-full w-full object-cover" src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://aws.amazon.com/s3/&size=256" />
                            </picture>
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground">S3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-6 py-4 h-full">
              <h3 className="group-hover/card:text-slate-12 transition-colors duration-200 text-xl font-semibold">{t('enterprise.infrastructure.observabilityTitle')}</h3>
              <p className="text-muted-foreground text-sm flex-1">{t('enterprise.infrastructure.observabilityDesc')}</p>
            </div>
          </div>
        </a>

        {/* Cost Management Card */}
        <a href="/docs/auth/management-api-keys" className="h-full group/card">
          <div className="group/card text-card-foreground rounded-xl duration-200 bg-card hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full overflow-hidden hover:border-primary transition-colors">
            <div className="bg-background shadow-none transition-transform group-hover/card:scale-105 group-hover/card:-translate-y-1 relative h-48 overflow-hidden rounded-t-xl border-b p-4 flex-shrink-0">
              <div className="h-full flex flex-col items-center pt-2">
                <div className="bg-muted px-2 py-1 rounded text-xs text-foreground flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"></path>
                  </svg>
                  <span>Credit Limits</span>
                </div>
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="relative w-full max-w-64 flex flex-col items-center">
                    <div className="w-full bg-muted/30 border border-border rounded-lg p-3 space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-muted-foreground">Monthly Limit</span>
                          <span className="text-foreground font-medium">$750 / $1,000</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-[#6467f2e6] rounded-full"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1 pt-1">
                        <div className="text-center">
                          <div className="text-[9px] text-muted-foreground">Today</div>
                          <div className="text-[10px] font-medium text-foreground">$24</div>
                        </div>
                        <div className="text-center border-x border-border">
                          <div className="text-[9px] text-muted-foreground">This Week</div>
                          <div className="text-[10px] font-medium text-foreground">$168</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[9px] text-muted-foreground">This Month</div>
                          <div className="text-[10px] font-medium text-foreground">$750</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-6 py-4 h-full">
              <h3 className="group-hover/card:text-slate-12 transition-colors duration-200 text-xl font-semibold">{t('enterprise.infrastructure.costMgmtTitle')}</h3>
              <p className="text-muted-foreground text-sm flex-1">{t('enterprise.infrastructure.costMgmtDesc')}</p>
            </div>
          </div>
        </a>

        {/* Zero Data Retention Card */}
        <a href="/docs/guides/features/zdr" className="h-full group/card">
          <div className="group/card text-card-foreground rounded-xl duration-200 bg-card hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full overflow-hidden hover:border-primary transition-colors">
            <div className="bg-background shadow-none transition-transform group-hover/card:scale-105 group-hover/card:-translate-y-1 relative h-48 overflow-hidden rounded-t-xl border-b p-4 flex-shrink-0">
              <div className="h-full flex flex-col items-center pt-2">
                <div className="bg-muted px-2 py-1 rounded text-xs text-foreground flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"></path>
                  </svg>
                  <span>Zero Retention</span>
                </div>
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="relative w-full max-w-52 flex flex-col items-center gap-y-3">
                    <div className="flex items-center justify-center gap-2 w-full">
                      <div className="bg-muted/50 border border-border rounded px-2 py-1.5">
                        <code className="text-[10px] text-muted-foreground font-mono">prompt</code>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-muted-foreground/40" aria-hidden="true">
                          <path d="M0 4H14M14 4L10 1M14 4L10 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <div className="size-10 rounded-lg bg-green-3 border border-green-6 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-5 text-green-11">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"></path>
                          </svg>
                        </div>
                        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-muted-foreground/40" aria-hidden="true">
                          <path d="M0 4H14M14 4L10 1M14 4L10 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                      <div className="bg-muted/50 border border-border rounded px-2 py-1.5">
                        <code className="text-[10px] text-muted-foreground font-mono">model</code>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="size-5 rounded-full bg-green-3 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-3 text-green-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                          </svg>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">No logging</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="size-5 rounded-full bg-green-3 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-3 text-green-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                          </svg>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">No training</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="size-5 rounded-full bg-green-3 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="size-3 text-green-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                          </svg>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">Auto-delete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-6 py-4 h-full">
              <h3 className="group-hover/card:text-slate-12 transition-colors duration-200 text-xl font-semibold">{t('enterprise.infrastructure.zdrTitle')}</h3>
              <p className="text-muted-foreground text-sm flex-1">{t('enterprise.infrastructure.zdrDesc')}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}