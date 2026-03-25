import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

const SDKCTA = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('sdk.cta.title', 'Start Building Today')}
        </h2>
        <p className="text-xl mb-8 opacity-90">
          {t('sdk.cta.description', 'Get started with OpenRouter SDKs and build amazing AI applications')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            <ExternalLink className="w-4 h-4 mr-2" />
            {t('sdk.cta.documentation', 'View Documentation')}
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            {t('sdk.cta.examples', 'See Examples')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SDKCTA;