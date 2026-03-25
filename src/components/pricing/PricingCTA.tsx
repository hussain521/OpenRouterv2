import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

const PricingCTA = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('pricing.cta.title', 'Ready to get started?')}
        </h2>
        <p className="text-xl mb-8 opacity-90">
          {t('pricing.cta.description', 'Join thousands of developers building with OpenRouter')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            {t('pricing.cta.getStarted', 'Get Started for Free')}
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            {t('pricing.cta.contact', 'Contact Sales')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCTA;