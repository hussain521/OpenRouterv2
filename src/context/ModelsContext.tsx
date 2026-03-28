import { createContext, useContext, useState, useMemo } from "react";

// Mock model data - in a real app this would come from an API
const mockModels: Model[] = [
  {
    id: 1,
    name: "GPT-4o",
    modelId: "openai/gpt-4o",
    provider: "OpenAI",
    weeklyTokens: "1.2B",
    inputPrice: 5.00,
    outputPrice: 15.00,
    context: 128000,
    released: new Date("2024-05-13"),
    favicon: "openai",
    inputModalities: ["text", "image"],
    outputModalities: ["text"],
    series: "gpt4",
    categories: ["coding", "academia"],
    parameters: ["temperature", "topP", "maxTokens"],
    pricingTier: "premium",
    distillable: true,
    throughput: 150,
    latency: 250
  },
  {
    id: 2,
    name: "Claude 3.5 Sonnet",
    modelId: "anthropic/claude-3.5-sonnet",
    provider: "Anthropic",
    weeklyTokens: "2.8B",
    inputPrice: 3.00,
    outputPrice: 15.00,
    context: 200000,
    released: new Date("2024-06-20"),
    favicon: "anthropic",
    inputModalities: ["text", "image"],
    outputModalities: ["text"],
    series: "claude3",
    categories: ["academia", "legal"],
    parameters: ["temperature", "topP", "maxTokens"],
    pricingTier: "premium",
    distillable: true,
    throughput: 120,
    latency: 300
  },
  {
    id: 3,
    name: "Gemini 2.0 Flash",
    modelId: "google/gemini-2.0-flash",
    provider: "Google",
    weeklyTokens: "1.5B",
    inputPrice: 0.10,
    outputPrice: 0.40,
    context: 1048576,
    released: new Date("2024-12-11"),
    favicon: "google",
    inputModalities: ["text", "image", "video"],
    outputModalities: ["text"],
    series: "geminiPro",
    categories: ["coding", "marketing"],
    parameters: ["temperature", "topK", "maxTokens"],
    pricingTier: "affordable",
    distillable: false,
    throughput: 300,
    latency: 150
  },
  {
    id: 4,
    name: "Llama 3.1 405B",
    modelId: "meta/llama-3.1-405b",
    provider: "Meta",
    weeklyTokens: "850M",
    inputPrice: 0.80,
    outputPrice: 0.80,
    context: 131072,
    released: new Date("2024-07-23"),
    favicon: "meta",
    inputModalities: ["text"],
    outputModalities: ["text"],
    series: "llama3",
    categories: ["coding", "academia"],
    parameters: ["temperature", "topP", "topK"],
    pricingTier: "affordable",
    distillable: true,
    throughput: 100,
    latency: 400
  },
  {
    id: 5,
    name: "Mistral Large 2",
    modelId: "mistral/mistral-large-2",
    provider: "Mistral",
    weeklyTokens: "420M",
    inputPrice: 2.00,
    outputPrice: 6.00,
    context: 131072,
    released: new Date("2024-07-24"),
    favicon: "mistral",
    inputModalities: ["text"],
    outputModalities: ["text"],
    series: "mistral",
    categories: ["coding", "finance"],
    parameters: ["temperature", "topP"],
    pricingTier: "mid-range",
    distillable: false,
    throughput: 80,
    latency: 500
  },
  {
    id: 6,
    name: "DeepSeek V3",
    modelId: "deepseek/deepseek-v3",
    provider: "DeepSeek",
    weeklyTokens: "1.1B",
    inputPrice: 0.27,
    outputPrice: 1.10,
    context: 64000,
    released: new Date("2024-12-26"),
    favicon: "deepseek",
    inputModalities: ["text"],
    outputModalities: ["text"],
    series: "deepseek",
    categories: ["coding", "academia"],
    parameters: ["temperature", "topP", "maxTokens"],
    pricingTier: "affordable",
    distillable: false,
    throughput: 200,
    latency: 200
  },
  {
    id: 7,
    name: "Qwen3.5-9B",
    modelId: "qwen/qwen3.5-9b",
    provider: "Qwen",
    weeklyTokens: "906M",
    inputPrice: 0.10,
    outputPrice: 0.15,
    context: 262144,
    released: new Date("2026-03-10"),
    favicon: "qwen",
    inputModalities: ["text"],
    outputModalities: ["text"],
    series: "qwen",
    categories: ["coding", "academia"],
    parameters: ["temperature", "topP", "topK"],
    pricingTier: "free",
    distillable: true,
    throughput: 250,
    latency: 180
  },
  {
    id: 8,
    name: "Command R+",
    modelId: "cohere/command-r-plus",
    provider: "Cohere",
    weeklyTokens: "380M",
    inputPrice: 2.50,
    outputPrice: 10.00,
    context: 128000,
    released: new Date("2024-03-27"),
    favicon: "cohere",
    inputModalities: ["text"],
    outputModalities: ["text"],
    series: "command",
    categories: ["marketing", "finance"],
    parameters: ["temperature", "maxTokens"],
    pricingTier: "premium",
    distillable: false,
    throughput: 90,
    latency: 450
  }
];

export interface Model {
  id: number;
  name: string;
  modelId: string;
  provider: string;
  weeklyTokens: string;
  inputPrice: number;
  outputPrice: number;
  context: number;
  released: Date;
  favicon: string;
  inputModalities: string[];
  outputModalities: string[];
  series: string;
  categories: string[];
  parameters: string[];
  pricingTier: "free" | "affordable" | "mid-range" | "premium";
  distillable: boolean;
  throughput: number;
  latency: number;
}

export interface FilterState {
  searchQuery: string;
  inputModalities: string[];
  outputModalities: string[];
  contextRange: [number, number];
  pricingTiers: string[];
  series: string[];
  categories: string[];
  parameters: string[];
  distillable: boolean;
  providers: string[];
}

export interface ModelsContextType {
  models: Model[];
  filteredModels: Model[];
  filters: FilterState;
  sortBy: string;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  updateFilter: (key: keyof FilterState, value: string[] | [number, number] | string | boolean) => void;
  resetFilters: () => void;
  toggleFilter: (key: keyof FilterState, value: string) => void;
}

const defaultFilters: FilterState = {
  searchQuery: "",
  inputModalities: [],
  outputModalities: [],
  contextRange: [4000, 1048576],
  pricingTiers: [],
  series: [],
  categories: [],
  parameters: [],
  distillable: false,
  providers: []
};

const ModelsContext = createContext<ModelsContextType | undefined>(undefined);

export function ModelsProvider({ children }: { children: React.ReactNode }) {
  const [models] = useState<Model[]>(mockModels);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState("most-popular");

  // Filter and sort models using useMemo for better performance
  const filteredModels = useMemo(() => {
    let filtered = models;

    // Apply search filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(model =>
        model.name.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query) ||
        model.modelId.toLowerCase().includes(query)
      );
    }

    // Apply modality filters
    if (filters.inputModalities.length > 0) {
      filtered = filtered.filter(model =>
        filters.inputModalities.some(modality => model.inputModalities.includes(modality))
      );
    }

    if (filters.outputModalities.length > 0) {
      filtered = filtered.filter(model =>
        filters.outputModalities.some(modality => model.outputModalities.includes(modality))
      );
    }

    // Apply context filter
    filtered = filtered.filter(model =>
      model.context >= filters.contextRange[0] && model.context <= filters.contextRange[1]
    );

    // Apply pricing tier filter
    if (filters.pricingTiers.length > 0) {
      filtered = filtered.filter(model =>
        filters.pricingTiers.includes(model.pricingTier)
      );
    }

    // Apply series filter
    if (filters.series.length > 0) {
      filtered = filtered.filter(model =>
        filters.series.includes(model.series)
      );
    }

    // Apply categories filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(model =>
        filters.categories.some(category => model.categories.includes(category))
      );
    }

    // Apply parameters filter
    if (filters.parameters.length > 0) {
      filtered = filtered.filter(model =>
        filters.parameters.some(param => model.parameters.includes(param))
      );
    }

    // Apply providers filter
    if (filters.providers.length > 0) {
      filtered = filtered.filter(model =>
        filters.providers.includes(model.provider)
      );
    }

    // Apply distillable filter
    if (filters.distillable) {
      filtered = filtered.filter(model => model.distillable);
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.released.getTime() - a.released.getTime();
        case "pricing-low-high":
          return (a.inputPrice + a.outputPrice) - (b.inputPrice + b.outputPrice);
        case "pricing-high-low":
          return (b.inputPrice + b.outputPrice) - (a.inputPrice + a.outputPrice);
        case "context-high-low":
          return b.context - a.context;
        case "throughput-high-low":
          return b.throughput - a.throughput;
        case "latency-low-high":
          return a.latency - b.latency;
        case "top-weekly": {
          const aTokens = parseFloat(a.weeklyTokens.replace(/[BM]/g, '')) * (a.weeklyTokens.includes('B') ? 1000 : 1);
          const bTokens = parseFloat(b.weeklyTokens.replace(/[BM]/g, '')) * (b.weeklyTokens.includes('B') ? 1000 : 1);
          return bTokens - aTokens;
        }
        case "most-popular":
        default: {
          // Sort by weekly tokens (popularity)
          const aPopular = parseFloat(a.weeklyTokens.replace(/[BM]/g, '')) * (a.weeklyTokens.includes('B') ? 1000 : 1);
          const bPopular = parseFloat(b.weeklyTokens.replace(/[BM]/g, '')) * (b.weeklyTokens.includes('B') ? 1000 : 1);
          return bPopular - aPopular;
        }
      }
    });
  }, [models, filters, sortBy]);

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const updateFilter = (key: keyof FilterState, value: string[] | [number, number] | string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const contextValue: ModelsContextType = {
    models,
    filteredModels,
    filters,
    sortBy,
    setSearchQuery,
    setSortBy,
    updateFilter,
    resetFilters,
    toggleFilter
  };

  return (
    <ModelsContext.Provider value={contextValue}>
      {children}
    </ModelsContext.Provider>
  );
}

export function useModels() {
  const context = useContext(ModelsContext);
  if (context === undefined) {
    throw new Error('useModels must be used within a ModelsProvider');
  }
  return context;
}