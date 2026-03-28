import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TranslationTestPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  usePageTitle(t('translationTest.title'));

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const newTranslationKeys = [
    {
      key: 'common.and',
      description: 'Connector word "and"',
      expectedEN: 'and',
      expectedAR: 'و'
    },
    {
      key: 'common.free',
      description: 'Free pricing indicator',
      expectedEN: 'Free',
      expectedAR: 'مجاني'
    },
    {
      key: 'common.closeBanner',
      description: 'Close banner accessibility label',
      expectedEN: 'Close banner',
      expectedAR: 'إغلاق اللافتة'
    },
    {
      key: 'common.copyModelId',
      description: 'Copy model ID tooltip/button text',
      expectedEN: 'Copy model id',
      expectedAR: 'نسخ معرف النموذج'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            🌐 Translation Test Page
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Testing new translation keys in both English and Arabic
          </p>
        </CardHeader>
        
        <CardContent>
          {/* Language Switcher */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={i18n.language === 'en' ? 'default' : 'outline'}
              onClick={() => changeLanguage('en')}
              className="min-w-[100px]"
            >
              English
            </Button>
            <Button
              variant={i18n.language === 'ar' ? 'default' : 'outline'}
              onClick={() => changeLanguage('ar')}
              className="min-w-[100px]"
            >
              العربية
            </Button>
          </div>

          {/* Current Language Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Current Language: <strong>{i18n.language === 'en' ? 'English' : 'Arabic (العربية)'}</strong>
            </p>
            <p className="text-xs text-blue-500 dark:text-blue-300 mt-1">
              Text Direction: {document.documentElement.dir === 'rtl' ? 'Right-to-Left (RTL)' : 'Left-to-Right (LTR)'}
            </p>
          </div>

          {/* Translation Keys Test */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">New Translation Keys Test:</h3>
            
            {newTranslationKeys.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                        Translation Key:
                      </h4>
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                        {item.key}
                      </code>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                        Description:
                      </h4>
                      <p className="text-sm">{item.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                        Current Translation:
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                          "{t(item.key)}"
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({i18n.language === 'en' ? 'EN' : 'AR'})
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Usage Examples */}
          <div className="mt-12 space-y-6">
            <h3 className="text-lg font-semibold mb-4">Usage Examples:</h3>
            
            {/* Example 1: Free model indicator */}
            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Model Pricing Example:</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Model Price:</span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-sm">
                    {t('common.free')}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Example 2: Terms and Privacy Policy */}
            <Card className="bg-purple-50 dark:bg-purple-900/20">
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Legal Links Example:</h4>
                <p className="text-sm">
                  By using this service, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                  {t('common.and')}{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </p>
              </CardContent>
            </Card>

            {/* Example 3: Close button */}
            <Card className="bg-orange-50 dark:bg-orange-900/20">
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Accessibility Label Example:</h4>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={t('common.closeBanner')}
                  className="flex items-center gap-2"
                >
                  ✕ <span>{t('common.closeBanner')}</span>
                </Button>
              </CardContent>
            </Card>

            {/* Example 4: Copy Model ID */}
            <Card className="bg-teal-50 dark:bg-teal-900/20">
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Copy Model ID Example:</h4>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                    openai/gpt-4
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    title={t('common.copyModelId')}
                    className="flex items-center gap-1"
                  >
                    📋 <span className="text-xs">{t('common.copyModelId')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Results Summary */}
          <Card className="mt-8 border-2 border-dashed border-gray-300">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-center mb-4">✅ Test Results Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>English (EN):</strong>
                  <ul className="mt-2 space-y-1 text-xs">
                    {newTranslationKeys.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="truncate">{item.key}:</span>
                        <span className="font-mono ml-2">"{item.expectedEN}"</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Arabic (AR):</strong>
                  <ul className="mt-2 space-y-1 text-xs">
                    {newTranslationKeys.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="truncate">{item.key}:</span>
                        <span className="font-mono ml-2">"{item.expectedAR}"</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslationTestPage;