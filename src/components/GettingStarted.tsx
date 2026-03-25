import { User, CreditCard, Key, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GettingStarted() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 md:space-y-12 max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step 1: Signup */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-medium">1</div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">{t('gettingStarted.step1.title')}</h3>
          </div>
          <div className="min-h-10 md:min-h-12">
            <p className="text-sm text-muted-foreground">{t('gettingStarted.step1.description')}</p>
          </div>
          <div className="w-full max-w-56 pt-4 md:px-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <div className="h-4 w-6 flex flex-col justify-center">
                <div className="h-1 bg-primary/20 rounded"></div>
                <div className="h-0.5 bg-primary/10 rounded mt-0.5"></div>
              </div>
              <div className="h-4 w-12 flex flex-col justify-center">
                <div className="h-1 bg-primary/20 rounded"></div>
                <div className="h-0.5 bg-primary/10 rounded mt-0.5"></div>
              </div>
            </div>
            <div className="flex flex-row gap-2 max-w-56">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <title>Google</title>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <title>GitHub</title>
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.017C9.521 20.782 9.512 20.082 9.508 19.272C6.726 19.859 6.139 17.967 6.139 17.967C5.685 16.812 5.029 16.51 5.029 16.51C4.121 15.889 5.098 15.901 5.098 15.901C6.101 15.971 6.629 16.926 6.629 16.926C7.521 18.455 8.97 18.013 9.539 17.762C9.631 17.129 9.889 16.689 10.175 16.419C7.954 16.146 5.62 15.319 5.62 11.534C5.62 10.42 6.01 9.513 6.649 8.809C6.546 8.559 6.203 7.58 6.747 6.189C6.747 6.189 7.586 5.925 9.497 7.234C10.3 7.014 11.15 6.904 12 6.9C12.85 6.904 13.7 7.014 14.503 7.234C16.414 5.925 17.253 6.189 17.253 6.189C17.797 7.58 17.454 8.559 17.351 8.809C17.99 9.513 18.38 10.42 18.38 11.534C18.38 15.329 16.046 16.143 13.825 16.416C14.171 16.75 14.509 17.429 14.509 18.458C14.509 19.92 14.499 20.692 14.499 21.017C14.499 21.278 14.681 21.581 15.181 21.489C19.155 20.166 22.02 16.418 22.02 12C22.02 6.477 17.523 2 12 2Z" fill="currentColor"></path>
                </svg>
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <title>MetaMask</title>
                  <path d="M19.2 3.54 13.1 8.1l1.3-2.93 4.8-1.62Z" fill="#E17726"></path>
                  <path d="m4.8 3.54 6.05 4.6-1.24-2.98L4.8 3.54ZM16.83 15.9l-1.78 3.08 3.8 1.18 1.07-4.22-3.1-.05Zm-12.74.04 1.07 4.22 3.8-1.18-1.79-3.09-3.08.05Zm4.63-5.39-1.13 1.78 3.75.19-.14-4.06-2.48 2.09Zm6.56 0L12.75 8.4l-.1 4.1 3.76-.18-1.13-1.78Z" fill="#E27625"></path>
                  <path d="m8.95 18.98 2.16-1.26-1.88-1.74-.28 3Zm3.95-1.26 2.15 1.26-.28-3-1.88 1.74Z" fill="#E27625"></path>
                  <path d="m15.05 18.98-2.16-1.26.19 1.69-.03.7 2-1.13Zm-6.1 0 2 1.13-.03-.7.19-1.7-2.16 1.27Z" fill="#D5BFB2"></path>
                  <path d="m11 14.95-1.81-.6 1.26-.7.55 1.3Zm2 0 .55-1.3 1.26.7-1.81.6Z" fill="#233447"></path>
                  <path d="m8.95 18.98.3-3.09-2.08.05 1.78 3.04Zm5.8-3.08.3 3.08 1.78-3.04-2.08-.05Zm1.65-3.57-3.74.19.34 2.43.55-1.3 1.26.7 1.6-2.02Zm-7.21 2.01 1.26-.7.55 1.31.34-2.43-3.75-.2 1.6 2.02Z" fill="#CC6228"></path>
                  <path d="m7.6 12.33 1.63 3.65-.04-1.64-1.6-2.01Zm7.21 2.01-.04 1.64 1.64-3.65-1.6 2.01Zm-3.47-1.82L11 14.95l.44 2.08.1-3.2-.2-1.31Zm1.32 0-.2 1.3.1 3.21.44-2.08-.34-2.43Z" fill="#E27525"></path>
                  <path d="m13 14.95-.44 2.08.33.69 1.88-1.74.04-1.64-1.81.61Zm-3.81-.61.04 1.64 1.88 1.74.33-.69-.44-2.08-1.81-.6Z" fill="#F5841F"></path>
                  <path d="m13.05 20.1.03-.7-.17-.13h-1.82l-.17.14.03.7-2-1.13.9.75 1.22.9h1.86l1.23-.9.89-.75-2 1.13Z" fill="#C0AC9D"></path>
                  <path d="m12.9 17.72-.34-.69h-1.12l-.33.69-.19 1.69.17-.14h1.82l.17.14-.19-1.7Z" fill="#161616"></path>
                  <path d="m19.6 9.1.56-3-.96-2.56-6.3 4.92 2.38 2.09 3.47 1.07.75-.89-.33-.23.56-.47-.4-.28.57-.38-.3-.28Zm-15.76-3 .57 3-.3.28.55.37-.4.28.57.47-.33.23.75.9 3.47-1.08 2.39-2.09L4.8 3.54 3.84 6.1Z" fill="#763E1A"></path>
                  <path d="m18.75 11.63-3.47-1.08 1.13 1.78-1.64 3.65 2.06-.04h3.1l-1.18-4.31ZM8.72 10.55l-3.47 1.07-1.16 4.32h3.08l2.06.04-1.64-3.65 1.13-1.78Zm3.94 1.97.23-4.06 1.5-3.3H9.61l1.5 3.3.23 4.06.1 1.3v3.21h1.12v-3.2l.1-1.31Z" fill="#F5841F"></path>
                </svg>
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Buy Credits */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-medium">2</div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">{t('gettingStarted.step2.title')}</h3>
          </div>
          <div className="min-h-10 md:min-h-12">
            <p className="text-sm text-muted-foreground">{t('gettingStarted.step2.description')}</p>
          </div>
          <div className="w-full max-w-56 pt-4 md:px-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <div className="h-4 w-6 flex flex-col justify-center">
                <div className="h-1 bg-primary/20 rounded"></div>
                <div className="h-0.5 bg-primary/10 rounded mt-0.5"></div>
              </div>
              <div className="h-4 w-6 flex flex-col justify-center">
                <div className="h-1 bg-primary/20 rounded"></div>
                <div className="h-0.5 bg-primary/10 rounded mt-0.5"></div>
              </div>
              <div className="h-4 w-6 flex flex-col justify-center">
                <div className="h-1 bg-primary/20 rounded"></div>
                <div className="h-0.5 bg-primary/10 rounded mt-0.5"></div>
              </div>
              <div className="h-4 w-6 flex flex-col justify-center">
                <div className="h-1 bg-primary/20 rounded"></div>
                <div className="h-0.5 bg-primary/10 rounded mt-0.5"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-primary/5 rounded flex items-center px-2">
                <span className="text-xs text-muted-foreground">Apr 1</span>
                <div className="flex-1 flex items-center gap-2 mx-2">
                  <div className="h-2 flex-1 bg-primary/10 rounded"></div>
                  <div className="h-2 flex-1 bg-primary/10 rounded"></div>
                </div>
                <span className="text-sm font-medium">$99</span>
              </div>
              <div className="h-6 bg-primary/5 rounded flex items-center px-2">
                <span className="text-xs text-muted-foreground">Mar 30</span>
                <div className="flex-1 flex items-center gap-2 mx-2">
                  <div className="h-2 flex-1 bg-primary/10 rounded"></div>
                  <div className="h-2 flex-1 bg-primary/10 rounded"></div>
                </div>
                <span className="text-sm font-medium">$10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Get API Key */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-medium">3</div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">{t('gettingStarted.step3.title')}</h3>
          </div>
          <div className="min-h-10 md:min-h-12">
            <p className="text-sm text-muted-foreground">{t('gettingStarted.step3.description')}</p>
          </div>
          <div className="w-full max-w-56 pt-4 md:px-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              <div className="h-6 flex-1 bg-primary/5 rounded flex items-center px-2">
                <span className="text-xs text-muted-foreground tracking-wide">OPENROUTER_API_KEY</span>
              </div>
            </div>
            <div className="h-6 bg-primary/5 rounded flex items-center px-2">
              <span className="text-xs tracking-wider">••••••••••••••••</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
