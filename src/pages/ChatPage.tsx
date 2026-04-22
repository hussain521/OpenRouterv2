import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useTranslation } from "react-i18next";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { PresetModelSections } from "@/components/chat/PresetModelSections";
import { SuggestionsCarousel } from "@/components/chat/SuggestionsCarousel";
import { ChatInputBar } from "@/components/chat/ChatInputBar";
import { API_BASE_URL } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatModel {
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

interface ChatProvider {
  _id: string;
  name: string;
  baseUrl?: string;
  models?: Array<{
    _id: string;
    name: string;
  }>;
}

interface ProviderModelFormState {
  providerId: string;
  providerName: string;
  providerBaseUrl: string;
  providerApiKey: string;
  modelName: string;
  promptPrice: string;
  completionPrice: string;
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

export default function ChatPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.chat"));
  const { authToken, isAuthenticated, onSignedOut } = useAuth();
  const normalizedToken = normalizeAuthToken(authToken);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("auto");
  const [models, setModels] = useState<ChatModel[]>([]);
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [isAddModelDialogOpen, setIsAddModelDialogOpen] = useState(false);
  const [providers, setProviders] = useState<ChatProvider[]>([]);
  const [providersError, setProvidersError] = useState<string | null>(null);
  const [providerModelForm, setProviderModelForm] = useState<ProviderModelFormState>({
    providerId: "",
    providerName: "",
    providerBaseUrl: "",
    providerApiKey: "",
    modelName: "",
    promptPrice: "",
    completionPrice: "",
  });
  const [isCreatingProviderInline, setIsCreatingProviderInline] = useState(false);
  const [isAddingProvider, setIsAddingProvider] = useState(false);
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [isSyncingProvider, setIsSyncingProvider] = useState(false);
  const hasAvailableModels = models.length > 0;
  const selectedProvider = providers.find(
    (provider) => provider._id === providerModelForm.providerId,
  ) ?? null;
  const selectedModelExists = models.some((model) => model.name === selectedModel);
  const resolvedModel =
    selectedModel !== "auto" && selectedModel !== "manual" && selectedModelExists
      ? selectedModel
      : models[0]?.name ?? null;
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const fetchModels = async (signal?: AbortSignal) => {
    if (!isAuthenticated || !normalizedToken) {
      setModels([]);
      setModelsError("Sign in to load available chat models.");
      return [] as ChatModel[];
    }

    try {
      setModelsError(null);

      const response = await fetch(`${API_BASE_URL}/api/models`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${normalizedToken}`,
        },
        signal,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          onSignedOut();
        }

        throw new Error(data.msg || data.message || `HTTP error! status: ${response.status}`);
      }

      const fetchedModels = Array.isArray(data) ? data : [];
      setModels(fetchedModels);
      setModelsError(
        fetchedModels.length === 0
          ? "No chat models are configured yet. Add or sync at least one model in the backend to start chatting."
          : null
      );
      return fetchedModels;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return [];
      }

      console.error("Error fetching models:", error);
      setModels([]);
      setModelsError(
        error instanceof Error
          ? error.message
          : "Failed to load available chat models."
      );
      return [];
    }
  };

  const fetchProviders = async (signal?: AbortSignal) => {
    if (!isAuthenticated || !normalizedToken) {
      setProviders([]);
      setProvidersError("Sign in to load available providers.");
      return [] as ChatProvider[];
    }

    try {
      setProvidersError(null);

      const response = await fetch(`${API_BASE_URL}/api/providers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${normalizedToken}`,
        },
        signal,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          onSignedOut();
        }

        throw new Error(data.msg || data.message || `HTTP error! status: ${response.status}`);
      }

      const fetchedProviders = Array.isArray(data) ? (data as ChatProvider[]) : [];
      setProviders(fetchedProviders);
      setProviderModelForm((currentState) => {
        const providerStillExists = fetchedProviders.some(
          (provider) => provider._id === currentState.providerId,
        );
        const nextProviderId = providerStillExists
          ? currentState.providerId
          : fetchedProviders[0]?._id ?? "";

        return {
          ...currentState,
          providerId: nextProviderId,
        };
      });
      setIsCreatingProviderInline(fetchedProviders.length === 0);
      setProvidersError(
        fetchedProviders.length === 0
          ? "No providers are configured yet. Create one below to add or sync models."
          : null,
      );
      return fetchedProviders;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return [];
      }

      console.error("Error fetching providers:", error);
      setProviders([]);
      setProvidersError(
        error instanceof Error
          ? error.message
          : "Failed to load available providers.",
      );
      return [];
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchModels(abortController.signal);
    fetchProviders(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [isAuthenticated, normalizedToken, onSignedOut]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (models.length === 0) {
      if (selectedModel !== "auto") {
        setSelectedModel("auto");
      }
      return;
    }

    const shouldResetSelectedModel =
      selectedModel === "auto" ||
      selectedModel === "manual" ||
      !models.some((model) => model.name === selectedModel);

    if (shouldResetSelectedModel) {
      setSelectedModel(models[0].name);
    }
  }, [models, selectedModel]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = async () => {
    const trimmedMessage = inputMessage.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    if (!normalizedToken || !isAuthenticated) {
      const authErrorMessage: Message = {
        id: Date.now().toString(),
        content: "Error: Please sign in before sending messages.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, authErrorMessage]);
      return;
    }

    if (!resolvedModel) {
      const modelErrorMessage: Message = {
        id: Date.now().toString(),
        content: `Error: ${
          modelsError ||
          "No chat model is available. Please select or configure a model first."
        }`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelErrorMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: trimmedMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${normalizedToken}`,
        },
        body: JSON.stringify({
          model: resolvedModel,
          messages: [{ role: "user", content: trimmedMessage }],
        }),
      });

      let data: Record<string, unknown> | null = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        if (response.status === 401) {
          onSignedOut();
        }

        const errorMessage =
          (typeof data?.msg === "string" && data.msg) ||
          (typeof data?.message === "string" && data.message) ||
          `HTTP error! status: ${response.status}`;

        throw new Error(errorMessage);
      }

      const choices = Array.isArray(data?.choices) ? data.choices : [];
      const firstChoice = choices[0];
      const firstChoiceContent =
        typeof firstChoice === "object" &&
        firstChoice !== null &&
        "message" in firstChoice &&
        typeof firstChoice.message === "object" &&
        firstChoice.message !== null &&
        "content" in firstChoice.message &&
        typeof firstChoice.message.content === "string"
          ? firstChoice.message.content
          : null;

      const assistantContent =
        (typeof data?.response === "string" && data.response) ||
        firstChoiceContent ||
        "No response content.";

      const aiMessage: Message = {
        id: (typeof data?.id === "string" && data.id) || Date.now().toString(),
        content: assistantContent,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `Error: ${error instanceof Error ? error.message : 'Failed to send message.'}`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputMessage("");
  };

  const resetProviderModelForm = (providerId?: string) => {
    const resolvedProviderId = providerId ?? providers[0]?._id ?? "";
    const matchedProvider =
      providers.find((provider) => provider._id === resolvedProviderId) ?? null;

    setProviderModelForm({
      providerId: resolvedProviderId,
      providerName: "",
      providerBaseUrl: matchedProvider?.baseUrl ?? "",
      providerApiKey: "",
      modelName: "",
      promptPrice: "",
      completionPrice: "",
    });
    setIsCreatingProviderInline(!resolvedProviderId);
  };

  const handleOpenAddModelDialog = async () => {
    if (
      !isAuthenticated ||
      !normalizedToken ||
      isAddingProvider ||
      isAddingModel ||
      isSyncingProvider
    ) {
      return;
    }

    setModelsError(null);
    setProvidersError(null);
    const fetchedProviders = await fetchProviders();
    const defaultProviderId = fetchedProviders[0]?._id ?? "";

    resetProviderModelForm(defaultProviderId);
    setIsCreatingProviderInline(fetchedProviders.length === 0);
    setIsAddModelDialogOpen(true);
  };

  const handleCreateProvider = async () => {
    if (
      !isAuthenticated ||
      !normalizedToken ||
      isAddingProvider ||
      isAddingModel ||
      isSyncingProvider
    ) {
      return;
    }

    const trimmedProviderName = providerModelForm.providerName.trim();
    const trimmedProviderBaseUrl = providerModelForm.providerBaseUrl.trim();
    const trimmedProviderApiKey = providerModelForm.providerApiKey.trim();

    if (!trimmedProviderName) {
      setProvidersError("Enter a provider name before saving.");
      return;
    }

    if (!trimmedProviderBaseUrl) {
      setProvidersError("Enter a provider base URL before saving.");
      return;
    }

    if (!trimmedProviderApiKey) {
      setProvidersError("Enter a provider API key before saving.");
      return;
    }

    setIsAddingProvider(true);
    setProvidersError(null);
    setModelsError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/providers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${normalizedToken}`,
        },
        body: JSON.stringify({
          name: trimmedProviderName,
          baseUrl: trimmedProviderBaseUrl,
          apiKey: trimmedProviderApiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          onSignedOut();
        }

        throw new Error(data.msg || data.message || `HTTP error! status: ${response.status}`);
      }

      const fetchedProviders = await fetchProviders();
      const createdProviderId =
        typeof data?._id === "string" && data._id
          ? data._id
          : fetchedProviders.find((provider) => provider.name === trimmedProviderName)?._id ?? "";

      setProviderModelForm((currentState) => ({
        ...currentState,
        providerId: createdProviderId,
        providerName: "",
        providerBaseUrl: "",
        providerApiKey: "",
      }));
      setIsCreatingProviderInline(false);
      setProvidersError(null);
    } catch (error) {
      console.error("Error adding provider:", error);
      setProvidersError(
        error instanceof Error ? error.message : "Failed to add provider.",
      );
    } finally {
      setIsAddingProvider(false);
    }
  };

  const handleSyncProviderModels = async () => {
    if (
      !isAuthenticated ||
      !normalizedToken ||
      !providerModelForm.providerId ||
      isAddingProvider ||
      isAddingModel ||
      isSyncingProvider
    ) {
      return;
    }

    setIsSyncingProvider(true);
    setModelsError(null);
    setProvidersError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/models/sync/${providerModelForm.providerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${normalizedToken}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          onSignedOut();
        }

        throw new Error(data.msg || data.message || `HTTP error! status: ${response.status}`);
      }

      await Promise.all([fetchModels(), fetchProviders()]);
      setIsAddModelDialogOpen(false);
      resetProviderModelForm(providerModelForm.providerId);
    } catch (error) {
      console.error("Error syncing models:", error);
      setModelsError(
        error instanceof Error ? error.message : "Failed to sync provider models.",
      );
    } finally {
      setIsSyncingProvider(false);
    }
  };

  const handleCreateModel = async () => {
    if (
      !isAuthenticated ||
      !normalizedToken ||
      isAddingProvider ||
      isAddingModel ||
      isSyncingProvider
    ) {
      return;
    }

    const trimmedModelName = providerModelForm.modelName.trim();

    if (!providerModelForm.providerId) {
      setProvidersError("Choose a provider before adding a model.");
      return;
    }

    if (!trimmedModelName) {
      setModelsError("Enter a model name before saving.");
      return;
    }

    const promptPrice = Number(providerModelForm.promptPrice);
    const completionPrice = Number(providerModelForm.completionPrice);

    if (
      Number.isNaN(promptPrice) ||
      Number.isNaN(completionPrice) ||
      promptPrice < 0 ||
      completionPrice < 0
    ) {
      setModelsError("Prompt and completion pricing must be valid non-negative numbers.");
      return;
    }

    setIsAddingModel(true);
    setModelsError(null);
    setProvidersError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/models`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${normalizedToken}`,
        },
        body: JSON.stringify({
          providerId: providerModelForm.providerId,
          name: trimmedModelName,
          pricing: {
            prompt: promptPrice,
            completion: completionPrice,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          onSignedOut();
        }

        throw new Error(data.msg || data.message || `HTTP error! status: ${response.status}`);
      }

      await Promise.all([fetchModels(), fetchProviders()]);
      setSelectedModel(trimmedModelName);
      setIsAddModelDialogOpen(false);
      resetProviderModelForm(providerModelForm.providerId);
    } catch (error) {
      console.error("Error adding model:", error);
      setModelsError(
        error instanceof Error ? error.message : "Failed to add chat model.",
      );
    } finally {
      setIsAddingModel(false);
    }
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <>
      <Dialog
        open={isAddModelDialogOpen}
          className="mt-15"
        onOpenChange={(open) => {
          setIsAddModelDialogOpen(open);

          if (!open) {
            setModelsError((currentError) =>
              currentError ===
              "No chat models are configured yet. Add or sync at least one model in the backend to start chatting."
                ? currentError
                : models.length === 0
                  ? "No chat models are configured yet. Add or sync at least one model in the backend to start chatting."
                  : null,
            );
            resetProviderModelForm(selectedProvider?._id);
            setProvidersError(null);
            setIsCreatingProviderInline(false);
          }
        }}
      >
        <DialogContent
          className="w-full max-w-4xl sm:max-w-4xl lg:max-w-4xl rounded-2xl"
          onClose={() => setIsAddModelDialogOpen(false)}
        >
          <DialogHeader className="items-start gap-2 mb-2">
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-xl font-bold">Add chat model</DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">Configure a new model for your chat environment.</p>
            </div>
          </DialogHeader>

          <DialogBody className="space-y-6">
            <div className="space-y-5 rounded-xl border border-gray-200 p-5 dark:border-gray-800 bg-white dark:bg-neutral-950">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  1. Select or create provider
                </label>
                <select
                  value={providerModelForm.providerId}
                  onChange={(event) => {
                    const nextProviderId = event.target.value;
                    const matchedProvider =
                      providers.find((provider) => provider._id === nextProviderId) ?? null;

                    setProviderModelForm((currentState) => ({
                      ...currentState,
                      providerId: nextProviderId,
                      providerBaseUrl: matchedProvider?.baseUrl ?? "",
                    }));
                    setIsCreatingProviderInline(false);
                    setProvidersError(null);
                  }}
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-neutral-950 dark:text-gray-100"
                  disabled={providers.length === 0 || isAddingProvider || isAddingModel || isSyncingProvider}
                >
                  {providers.length === 0 ? (
                    <option value="">No providers available</option>
                  ) : (
                    providers.map((provider) => (
                      <option key={provider._id} value={provider._id}>
                        {provider.name}
                      </option>
                    ))
                  )}
                </select>
                {selectedProvider?.baseUrl ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedProvider.baseUrl}
                  </p>
                ) : null}
              </div>

              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-5 dark:border-gray-700 dark:bg-neutral-900/50">
                <div className="mb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Create new provider
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Don't see your provider? Add it here.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (isCreatingProviderInline) {
                        handleCreateProvider();
                        return;
                      }

                      setIsCreatingProviderInline(true);
                      setProviderModelForm((currentState) => ({
                        ...currentState,
                        providerId: "",
                        providerName: "",
                        providerBaseUrl: "",
                        providerApiKey: "",
                      }));
                      setProvidersError(null);
                    }}
                    disabled={isAddingProvider || isAddingModel || isSyncingProvider}
                  >
                    {isAddingProvider
                      ? "Creating..."
                      : isCreatingProviderInline
                        ? "Save Provider"
                        : "Create Provider"}
                  </Button>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                      Provider name
                    </label>
                    <Input
                      value={providerModelForm.providerName}
                      onChange={(event) =>
                        setProviderModelForm((currentState) => ({
                          ...currentState,
                          providerName: event.target.value,
                        }))
                      }
                      placeholder="OpenAI"
                      disabled={isAddingProvider || isAddingModel || isSyncingProvider}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                      Base URL
                    </label>
                    <Input
                      value={providerModelForm.providerBaseUrl}
                      onChange={(event) =>
                        setProviderModelForm((currentState) => ({
                          ...currentState,
                          providerBaseUrl: event.target.value,
                        }))
                      }
                      placeholder="https://api.openai.com/v1"
                      disabled={isAddingProvider || isAddingModel || isSyncingProvider}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                      API key
                    </label>
                    <Input
                      type="password"
                      value={providerModelForm.providerApiKey}
                      onChange={(event) =>
                        setProviderModelForm((currentState) => ({
                          ...currentState,
                          providerApiKey: event.target.value,
                        }))
                      }
                      placeholder="sk-..."
                      disabled={isAddingProvider || isAddingModel || isSyncingProvider}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-neutral-950">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    2. Add models
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Sync default models from the provider.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSyncProviderModels}
                  disabled={
                    !providerModelForm.providerId ||
                    isAddingProvider ||
                    isAddingModel ||
                    isSyncingProvider
                  }
                >
                  {isSyncingProvider ? "Syncing..." : "Sync Models"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Existing models on the selected provider:{" "}
                {selectedProvider?.models?.length
                  ? selectedProvider.models.map((model) => model.name).join(", ")
                  : "None yet"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-neutral-950">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Or add a model manually
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Specify details for a custom model.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Model name
                  </label>
                  <Input
                    value={providerModelForm.modelName}
                    onChange={(event) =>
                      setProviderModelForm((currentState) => ({
                        ...currentState,
                        modelName: event.target.value,
                      }))
                    }
                    placeholder="gpt-4.1-mini"
                    disabled={isAddingProvider || isAddingModel || isSyncingProvider}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Prompt price
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.000001"
                    value={providerModelForm.promptPrice}
                    onChange={(event) =>
                      setProviderModelForm((currentState) => ({
                        ...currentState,
                        promptPrice: event.target.value,
                      }))
                    }
                    placeholder="0.0000015"
                    disabled={isAddingProvider || isAddingModel || isSyncingProvider}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Completion price
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.000001"
                    value={providerModelForm.completionPrice}
                    onChange={(event) =>
                      setProviderModelForm((currentState) => ({
                        ...currentState,
                        completionPrice: event.target.value,
                      }))
                    }
                    placeholder="0.000002"
                    disabled={isAddingProvider || isAddingModel || isSyncingProvider}
                  />
                </div>
              </div>
            </div>

            {(providersError || modelsError) && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
                {providersError || modelsError}
              </div>
            )}
          </DialogBody>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModelDialogOpen(false)}
              disabled={isAddingProvider || isAddingModel || isSyncingProvider}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateModel}
              disabled={
                !providerModelForm.providerId ||
                isAddingProvider ||
                isAddingModel ||
                isSyncingProvider
              }
            >
              {isAddingModel ? "Adding..." : "Save Model"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="h-screen w-screen bg-white dark:bg-black overflow-hidden">
        <div className="sticky top-0 z-50 transition-all duration-300">
          <Navbar />
        </div>

        <div className="relative flex h-[calc(100vh-72px)] bg-white dark:bg-black">
          <ChatSidebar
            isOpen={isSidebarOpen}
            onToggle={handleToggleSidebar}
            onNewChat={handleNewChat}
            onAddModel={handleOpenAddModelDialog}
            isAddingModel={isAddingModel || isSyncingProvider}
          />

          <main className="flex min-w-0 flex-1 flex-col bg-[#F5F5FB] dark:bg-neutral-900">
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 scroll-smooth"
              id="messages-container"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {t("chat.welcome", "Welcome to OpenRouter Chat")}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("chat.startConversation", "Choose a model and start chatting")}
                    </p>
                  </div>

                  {!hasAvailableModels && (
                    <div className="w-full max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
                      {modelsError || "No chat models are configured yet."}
                    </div>
                  )}

                  <div className="w-full max-w-4xl">
                    <PresetModelSections
                      onModelSelect={handleModelSelect}
                      models={models}
                    />
                  </div>

                  <div className="w-full max-w-3xl">
                    <SuggestionsCarousel onSuggestionClick={handleSuggestionClick} />
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto space-y-4 min-h-full flex flex-col justify-end">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 ${
                            message.role === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="max-w-3xl mx-auto">
                <ChatInputBar
                  value={inputMessage}
                  onChange={setInputMessage}
                  onSend={handleSendMessage}
                  disabled={isLoading || !hasAvailableModels}
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}