import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { API_BASE_URL } from "../lib/utils";
import { useAuth } from "./AuthContext";

// Define the Model interface (ensure it matches backend structure if possible)
export interface Model {
  id: number;
  name: string;
  modelId: string;
  provider: string;
  weeklyTokens: string;
  inputPrice: number;
  outputPrice: number;
  context: number;
  released: string; // API might return string, handle parsing if needed
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
  loading: boolean; // Add loading state
  error: string | null; // Add error state
}

const PLACEHOLDER_TOKENS = new Set([
  "placeholder-token",
  "mock-token",
  "fake-token",
  "dummy-token",
  "undefined",
  "null",
]);

const normalizeAuthToken = (token: string | null | undefined): string | null => {
  if (typeof token !== "string") {
    return null;
  }

  const normalizedToken = token.trim();

  if (!normalizedToken) {
    return null;
  }

  if (PLACEHOLDER_TOKENS.has(normalizedToken.toLowerCase())) {
    return null;
  }

  return normalizedToken;
};

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
  const { authToken, isAuthenticated, onSignedOut } = useAuth();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState("most-popular");

  useEffect(() => {
    const normalizedToken = normalizeAuthToken(authToken);

    if (!isAuthenticated || !normalizedToken) {
      setModels([]);
      setError(null);
      setLoading(false);
      return;
    }

    const abortController = new AbortController();

    const fetchModels = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/models`, {
          headers: {
            Authorization: `Bearer ${normalizedToken}`,
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          if (response.status === 401) {
            setModels([]);
            onSignedOut();
            throw new Error("Authentication failed. Please log in again.");
          }

          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Model[] = await response.json();
        const processedData = data.map((model) => ({
          ...model,
          released:
            typeof model.released === "string"
              ? model.released
              : new Date(model.released).toISOString().split("T")[0],
        }));

        setModels(processedData);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch models:", err);
        setModels([]);

        if (err instanceof Error && err.message.includes("Authentication failed")) {
          setError("Authentication failed. Please log in again.");
        } else {
          setError("Failed to load models. Please try again later.");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchModels();

    return () => {
      abortController.abort();
    };
  }, [authToken, isAuthenticated, onSignedOut]);

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
          // Assuming 'released' is a string 'YYYY-MM-DD', parse it for comparison
          return new Date(b.released).getTime() - new Date(a.released).getTime();
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
    toggleFilter,
    loading,
    error
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