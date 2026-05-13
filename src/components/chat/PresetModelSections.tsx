import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

interface Model {
  _id: string;
  name: string;
  provider: {
    _id: string;
    name: string;
  };
  pricing: {
    prompt: number;
    completion: number;
  };
}

interface PresetModelSectionsProps {
  onModelSelect?: (model: string) => void;
  models?: Model[]; // Add models prop
}

export function PresetModelSections({ onModelSelect, models }: PresetModelSectionsProps) {
  const { t } = useTranslation();

  const handleCardClick = (modelName: string) => {
    if (onModelSelect) {
      onModelSelect(modelName);
    }
  };

  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-2.5 md:grid-cols-2">
      {/* Display fetched models */}
      {models && models.length > 0 && (
        <div className="col-span-full mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t("chatPage.availableModels", "Available Models")}
          </h3>
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {models.map((model) => (
              <Card
                key={model._id}
                onClick={() => handleCardClick(model.name)} // Use model.name for selection
                className="h-24 rounded-2xl border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer dark:border-gray-800 dark:bg-black dark:hover:bg-gray-950"
              >
                <CardContent className="flex h-full flex-col justify-between px-4 py-3.5">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {model.name} {/* Display model name */}
                  </div>
                  <div className="flex justify-end gap-1.5">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {model.provider.name} {/* Display provider name */}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}