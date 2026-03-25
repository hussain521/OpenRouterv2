import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function SDKHero() {
  const { t } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState('TypeScript');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm i @openrouter/sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 text-center">
      <div className="flex flex-col gap-2 md:gap-4">
        <h1 className="my-0 w-full text-3xl sm:text-4xl md:text-5xl font-semibold">
          {t('sdkPage.hero.title')}
        </h1>
        <p className="text-slate-11 text-md md:pt-2 md:text-xl max-w-3xl mx-auto">
          {t('sdkPage.hero.subtitle')}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 items-center">
        <Link to="/settings/keys">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring leading-6 bg-[#6467f2] text-white shadow hover:bg-[#6467f2]/90 hover:text-[#6467f2]-foreground h-11 px-10 py-4 gap-2 w-full sm:w-auto">
            {t('sdkPage.hero.getApiKey')}
          </button>
        </Link>
        <a href="https://openrouter.ai/docs/sdks/typescript/overview" target="openrouter-docs" rel="noreferrer">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring leading-6 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-10 py-4 gap-2 text-foreground w-full sm:w-auto">
            {t('sdkPage.hero.viewDocs')}
          </button>
        </a>
      </div>
      
      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="flex gap-1">
          <button 
            type="button" 
            onClick={() => setActiveLanguage('TypeScript')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeLanguage === 'TypeScript' 
                ? 'bg-foreground text-background' 
                : 'bg-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('sdkPage.languages.typescript')}
          </button>
          <button 
            type="button" 
            onClick={() => setActiveLanguage('Python')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeLanguage === 'Python' 
                ? 'bg-foreground text-background' 
                : 'bg-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('sdkPage.languages.python')}
          </button>
          <button 
            type="button" 
            disabled 
            className="px-3 py-1 text-xs font-medium rounded-md transition-colors bg-transparent text-muted-foreground/30 cursor-not-allowed"
          >
            {t('sdkPage.languages.go')}
          </button>
          <button 
            type="button" 
            disabled 
            className="px-3 py-1 text-xs font-medium rounded-md transition-colors bg-transparent text-muted-foreground/30 cursor-not-allowed"
          >
            {t('sdkPage.languages.java')}
          </button>
        </div>
        
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 sm:gap-3 bg-secondary hover:bg-secondary/80 border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-xs sm:text-sm transition-colors cursor-pointer w-full max-w-sm mx-auto overflow-hidden"
        >
          <span className="text-muted-foreground">$</span>
          <span className="text-foreground flex-1 text-left min-w-0 truncate">
            npm i @openrouter/sdk
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-muted-foreground flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
            />
          </svg>
        </button>
        {copied && (
          <span className="text-xs text-green-600 mt-1">{t('sdkPage.copyFeedback')}</span>
        )}
      </div>
    </div>
  );
}