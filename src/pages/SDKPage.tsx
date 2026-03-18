import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SDKPage() {
  const { t } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState('TypeScript');
  const [copied, setCopied] = useState(false);
  const [activeExample, setActiveExample] = useState('Basic');
  const [exampleLanguage, setExampleLanguage] = useState('typescript');
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm i @openrouter/sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCodeCopy = () => {
    const codeContent = `import { OpenRouter } from '@openrouter/sdk';

const openrouter = new OpenRouter();

const result = openrouter.callModel({
  model: 'anthropic/claude-sonnet-4',
  input: 'Explain quantum computing in simple terms.',
});

const text = await result.getText();
console.log(text);`;
    navigator.clipboard.writeText(codeContent);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
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
          
          {/* Features Section */}
          <div className="space-y-4 md:space-y-8 max-w-7xl mx-auto w-full mt-16 md:mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
              {/* Flexible Results */}
              <div className="group/card text-card-foreground rounded-xl duration-200 bg-card hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6 hover:border-[#6467f2] transition-colors">
                <div className="flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 bg-[#6467f2]/10 rounded-lg flex items-center justify-center text-[#6467f2]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="group-hover/card:text-slate-12 transition-colors duration-200 text-xl font-semibold">{t('sdkPage.features.flexibleResults.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('sdkPage.features.flexibleResults.description')}</p>
                  </div>
                </div>
              </div>

              {/* Built-In Streaming */}
              <div className="group/card text-card-foreground rounded-xl duration-200 bg-card hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6 hover:border-[#6467f2] transition-colors">
                <div className="flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 bg-[#6467f2]/10 rounded-lg flex items-center justify-center text-[#6467f2]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="group-hover/card:text-slate-12 transition-colors duration-200 text-xl font-semibold">{t('sdkPage.features.builtInStreaming.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('sdkPage.features.builtInStreaming.description')}</p>
                  </div>
                </div>
              </div>

              {/* Isolated Tools */}
              <div className="group/card text-card-foreground rounded-xl duration-200 bg-card hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6 hover:border-[#6467f2] transition-colors">
                <div className="flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 bg-[#6467f2]/10 rounded-lg flex items-center justify-center text-[#6467f2]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="group-hover/card:text-slate-12 transition-colors duration-200 text-xl font-semibold">{t('sdkPage.features.isolatedTools.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('sdkPage.features.isolatedTools.description')}</p>
                  </div>
                </div>
              </div>

              {/* Agentic Workflows */}
              <div className="group/card text-card-foreground rounded-xl duration-200 bg-card hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6 hover:border-[#6467f2] transition-colors">
                <div className="flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 bg-[#6467f2]/10 rounded-lg flex items-center justify-center text-[#6467f2]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="group-hover/card:text-slate-12 transition-colors duration-200 text-xl font-semibold">{t('sdkPage.features.agenticWorkflows.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('sdkPage.features.agenticWorkflows.description')}</p>
                  </div>
                </div>
              </div>

              {/* Scales Linearly */}
              <div className="group/card text-card-foreground rounded-xl duration-200 bg-card hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6 hover:border-[#6467f2] transition-colors">
                <div className="flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 bg-[#6467f2]/10 rounded-lg flex items-center justify-center text-[#6467f2]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="group-hover/card:text-slate-12 transition-colors duration-200 text-xl font-semibold">{t('sdkPage.features.scalesLinearly.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('sdkPage.features.scalesLinearly.description')}</p>
                  </div>
                </div>
              </div>

              {/* Drop-In Ready */}
              <div className="group/card text-card-foreground rounded-xl duration-200 bg-card hover:text-slate-12 border shadow-sm hover:shadow-lg flex flex-col h-full p-6 hover:border-[#6467f2] transition-colors">
                <div className="flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 bg-[#6467f2]/10 rounded-lg flex items-center justify-center text-[#6467f2]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="group-hover/card:text-slate-12 transition-colors duration-200 text-xl font-semibold">{t('sdkPage.features.dropInReady.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('sdkPage.features.dropInReady.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
          
          {/* Code Examples Section */}
          <div className="w-full max-w-4xl mx-auto mt-16 md:mt-20">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">{t('sdkPage.codeExamples.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('sdkPage.codeExamples.subtitle')}</p>
            </div>
            
            {/* Example Type Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 border border-input shadow-sm h-8 rounded-md px-3 text-xs ${
                  activeExample === 'Basic'
                    ? 'bg-foreground text-background hover:bg-foreground hover:text-background'
                    : 'bg-background text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
                onClick={() => setActiveExample('Basic')}
              >
                {t('sdkPage.codeExamples.examples.basic')}
              </button>
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 border border-input shadow-sm hover:bg-accent h-8 rounded-md px-3 text-xs ${
                  activeExample === 'Streaming'
                    ? 'bg-foreground text-background hover:bg-foreground hover:text-background'
                    : 'bg-background text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveExample('Streaming')}
              >
                {t('sdkPage.codeExamples.examples.streaming')}
              </button>
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 border border-input shadow-sm hover:bg-accent h-8 rounded-md px-3 text-xs ${
                  activeExample === 'Tool Calling'
                    ? 'bg-foreground text-background hover:bg-foreground hover:text-background'
                    : 'bg-background text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveExample('Tool Calling')}
              >
                {t('sdkPage.codeExamples.examples.toolCalling')}
              </button>
            </div>

            {/* Code Block */}
            <div className="relative text-sm">
              <div className="text-slate-9 flex h-10 items-center justify-between relative">
                <span className="flex h-8 items-center gap-2 place-self-end lowercase overflow-x-auto pr-2 max-w-[80%]">
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 border border-input hover:text-accent-foreground h-6 rounded-md px-1.5 text-xs shadow-xs ${
                      exampleLanguage === 'typescript'
                        ? 'bg-slate-3 text-slate-12 shadow-inner'
                        : 'bg-background text-slate-11 hover:bg-slate-2'
                    }`}
                    onClick={() => setExampleLanguage('typescript')}
                  >
                    {t('sdkPage.codeExamples.languages.typescript')}
                  </button>
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 border border-input hover:text-accent-foreground h-6 rounded-md px-1.5 text-xs shadow-xs ${
                      exampleLanguage === 'python'
                        ? 'bg-slate-3 text-slate-12 shadow-inner'
                        : 'bg-background text-slate-11 hover:bg-slate-2'
                    }`}
                    onClick={() => setExampleLanguage('python')}
                  >
                    {t('sdkPage.codeExamples.languages.python')}
                  </button>
                </span>
                <div className="flex h-8 items-center place-self-end">
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring gap-2 border border-input hover:bg-accent hover:text-accent-foreground h-6 rounded-md px-1.5 text-xs shadow-xs bg-background"
                    onClick={handleCodeCopy}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                    </svg>
                    <span>{codeCopied ? t('sdkPage.codeExamples.copied') : t('sdkPage.codeExamples.copy')}</span>
                  </button>
                </div>
              </div>
              <pre className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-xs sm:text-sm leading-6 p-3 sm:p-4 overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
                <code className="language-typescript">
                  <span className="text-purple-600 dark:text-purple-400">import</span>{' '}
                  <span className="text-gray-800 dark:text-gray-200">{'{'}</span> OpenRouter{' '}
                  <span className="text-gray-800 dark:text-gray-200">{'}'}</span>{' '}
                  <span className="text-purple-600 dark:text-purple-400">from</span>{' '}
                  <span className="text-green-600 dark:text-green-400">'@openrouter/sdk'</span>
                  <span className="text-gray-800 dark:text-gray-200">;</span>
                  {'\n\n'}
                  <span className="text-purple-600 dark:text-purple-400">const</span> openrouter{' '}
                  <span className="text-blue-600 dark:text-blue-400">=</span>{' '}
                  <span className="text-purple-600 dark:text-purple-400">new</span>{' '}
                  <span className="text-yellow-600 dark:text-yellow-400">OpenRouter</span>
                  <span className="text-gray-800 dark:text-gray-200">{'()'}</span>
                  <span className="text-gray-800 dark:text-gray-200">;</span>
                  {'\n\n'}
                  <span className="text-purple-600 dark:text-purple-400">const</span> result{' '}
                  <span className="text-blue-600 dark:text-blue-400">=</span> openrouter
                  <span className="text-gray-800 dark:text-gray-200">.</span>
                  <span className="text-blue-600 dark:text-blue-400">callModel</span>
                  <span className="text-gray-800 dark:text-gray-200">({'{'}</span>
                  {'\n  '}model<span className="text-blue-600 dark:text-blue-400">:</span>{' '}
                  <span className="text-green-600 dark:text-green-400">'anthropic/claude-sonnet-4'</span>
                  <span className="text-gray-800 dark:text-gray-200">,</span>
                  {'\n  '}input<span className="text-blue-600 dark:text-blue-400">:</span>{' '}
                  <span className="text-green-600 dark:text-green-400">'Explain quantum computing in simple terms.'</span>
                  <span className="text-gray-800 dark:text-gray-200">,</span>
                  {'\n'}
                  <span className="text-gray-800 dark:text-gray-200">{'}'}</span>
                  <span className="text-gray-800 dark:text-gray-200">)</span>
                  <span className="text-gray-800 dark:text-gray-200">;</span>
                  {'\n\n'}
                  <span className="text-purple-600 dark:text-purple-400">const</span> text{' '}
                  <span className="text-blue-600 dark:text-blue-400">=</span>{' '}
                  <span className="text-purple-600 dark:text-purple-400">await</span> result
                  <span className="text-gray-800 dark:text-gray-200">.</span>
                  <span className="text-blue-600 dark:text-blue-400">getText</span>
                  <span className="text-gray-800 dark:text-gray-200">{'()'}</span>
                  <span className="text-gray-800 dark:text-gray-200">;</span>
                  {'\n'}
                  <span className="text-green-600 dark:text-green-400">console</span>
                  <span className="text-gray-800 dark:text-gray-200">.</span>
                  <span className="text-blue-600 dark:text-blue-400">log</span>
                  <span className="text-gray-800 dark:text-gray-200">(</span>text
                  <span className="text-gray-800 dark:text-gray-200">)</span>
                  <span className="text-gray-800 dark:text-gray-200">;</span>
                </code>
              </pre>
            </div>
          </div>
          {/* Getting Started Steps Section */}
          <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto px-6 mt-16 md:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1: Install */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#6467f2]/10 rounded-full flex items-center justify-center text-[#6467f2] text-sm font-medium">
                    1
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground">{t('sdkPage.gettingStarted.install.title')}</h3>
                </div>
                <div className="min-h-10 md:min-h-12">
                  <p className="text-sm text-muted-foreground">{t('sdkPage.gettingStarted.install.description')}</p>
                </div>
              </div>

              {/* Step 2: Call Any Model */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#6467f2]/10 rounded-full flex items-center justify-center text-[#6467f2] text-sm font-medium">
                    2
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground">{t('sdkPage.gettingStarted.callModel.title')}</h3>
                </div>
                <div className="min-h-10 md:min-h-12">
                  <p className="text-sm text-muted-foreground">{t('sdkPage.gettingStarted.callModel.description')}</p>
                </div>
              </div>

              {/* Step 3: Ship & Scale */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#6467f2]/10 rounded-full flex items-center justify-center text-[#6467f2] text-sm font-medium">
                    3
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground">{t('sdkPage.gettingStarted.shipScale.title')}</h3>
                </div>
                <div className="min-h-10 md:min-h-12">
                  <p className="text-sm text-muted-foreground">{t('sdkPage.gettingStarted.shipScale.description')}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Final CTA Section */}
          <div className="w-full max-w-4xl mx-auto my-16">
            <div className="bg-[#6467f2]/5 border border-[#6467f2]/20 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{t('sdkPage.cta.title')}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">{t('sdkPage.cta.subtitle')}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link to="/settings/keys">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring leading-6 bg-[#6467f2] text-white shadow hover:bg-[#6467f2]/90 hover:text-[#6467f2]-foreground h-11 px-10 py-4 gap-2 w-full sm:w-auto">
                    {t('sdkPage.cta.getApiKey')}
                  </button>
                </Link>
                <a href="https://openrouter.ai/docs/sdks/typescript/overview" target="openrouter-docs" rel="noreferrer">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring leading-6 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-10 py-4 gap-2 text-foreground w-full sm:w-auto">
                    {t('sdkPage.cta.viewDocs')}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}