import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { API_BASE_URL } from "../lib/utils"; // Corrected path

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
  const [models, setModels] = useState<Model[]>([]); // Initialize with empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState("most-popular");

  // Fetch models from API on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        setError(null);
        // Get token from local storage
        let token = localStorage.getItem('authToken'); // Corrected key to match AuthContext

        // If no token is found, use a placeholder or attempt to log in.
        // For now, we'll use a placeholder to allow fetching models, but a real login is needed.
        if (!token) {
            console.warn("Auth token not found. Using placeholder token. Please log in to fetch models.");
            // In a real application, you would redirect to login or handle this more robustly.
            // For demonstration purposes, we'll use a dummy token.
            token = "dummy-auth-token-for-development";
        }

        const response = await fetch(`${API_BASE_URL}/api/models`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Use Bearer token for authorization
            },
        });
        if (!response.ok) {
            // If unauthorized, clear token and potentially redirect to login
            if (response.status === 401) {
                localStorage.removeItem('authToken'); // Corrected key to match AuthContext
                // Optionally redirect to login page here
                // window.location.href = '/login';
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Model[] = await response.json();
        // Ensure released date is parsed correctly if it's a string from API
        const processedData = data.map(model => ({
          ...model,
          released: typeof model.released === 'string' ? model.released : new Date(model.released).toISOString().split('T')[0] // Keep as string or parse to Date if needed
        }));
        setModels(processedData);
      } catch (err: unknown) { // Changed 'any' to 'unknown' for better type safety
        console.error("Failed to fetch models:", err);
        // Provide a more specific error message if the error is related to authentication
        if (err instanceof Error && err.message.includes('401')) {
            setError("Authentication failed. Please log in again.");
        } else {
            setError("Failed to load models. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []); // Empty dependency array means this runs once on mount

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
    loading, // Include loading state
    error // Include error state
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