import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SDKCodeExamples() {
  const { t } = useTranslation();
  const [activeExample, setActiveExample] = useState('Basic');
  const [exampleLanguage, setExampleLanguage] = useState('typescript');
  const [codeCopied, setCodeCopied] = useState(false);

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
  );
}