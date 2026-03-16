import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks/usePageTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MessageSquareText,
  Image,
  AudioLines,
  Video,
  FileText,
  Binary,
  ArrowRight,
} from "lucide-react";

const ProvidersPage: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle("Providers");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <TopBanner />
      </div>
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col gap-3 md:w-2/3 mb-8">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Providers
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Browse the network of model providers available on OpenRouter.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">67</span>{" "}
            providers
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full md:w-[280px]">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="w-full appearance-none bg-input/60 px-3 py-2 text-foreground transition duration-150 ease-in-out focus:bg-input rounded-lg placeholder:text-foreground/30 shadow-border focus:shadow-inner focus:outline-none pl-9 h-10"
                placeholder="Search providers..."
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Sort by
              </span>
              <Select defaultValue="daily-tokens">
                <SelectTrigger className="relative rounded-md w-full sm:w-[180px] h-10">
                  <SelectValue placeholder="Daily Tokens" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily-tokens">Daily Tokens</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* OpenAI Provider */}
          <div className="group rounded-lg border bg-card p-6 hover:border-[#6466f273] transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-background">
                  <img src="/OpenAI.svg" alt="OpenAI" className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">OpenAI</h3>
                  <p className="text-sm text-muted-foreground">
                    GPT-4, DALL-E 3, and more
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("providersPage.dailyTokens")}</span>
                <span className="font-medium">847M</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("providersPage.models")}</span>
                <span className="font-medium">12</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageSquareText className="size-3" />
                {t("providersPage.capabilities.chat")}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Image className="size-3" />
                {t("providersPage.capabilities.vision")}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <FileText className="size-3" />
                {t("providersPage.capabilities.code")}
              </Badge>
            </div>
          </div>

          {/* Anthropic Provider */}
          <div className="group rounded-lg border bg-card p-6 hover:border-[#6466f273]  transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-background">
                  <div className="size-6 rounded bg-gradient-to-br from-orange-400 to-red-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Anthropic</h3>
                  <p className="text-sm text-muted-foreground">
                    Claude 3.5 Sonnet and more
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("providersPage.dailyTokens")}</span>
                <span className="font-medium">623M</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("providersPage.models")}</span>
                <span className="font-medium">8</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageSquareText className="size-3" />
                {t("providersPage.capabilities.chat")}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Image className="size-3" />
                {t("providersPage.capabilities.vision")}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <FileText className="size-3" />
                {t("providersPage.capabilities.analysis")}
              </Badge>
            </div>
          </div>

          {/* Google Provider */}
          <div className="group rounded-lg border bg-card p-6 hover:border-[#6466f273]  transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-background">
                  <img
                    src="/GoogleGemini.svg"
                    alt="Google"
                    className="size-6"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Google</h3>
                  <p className="text-sm text-muted-foreground">
                    Gemini Pro and Ultra
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Daily Tokens</span>
                <span className="font-medium">445M</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Models</span>
                <span className="font-medium">6</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageSquareText className="size-3" />
                Chat
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Image className="size-3" />
                Vision
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Binary className="size-3" />
                Multimodal
              </Badge>
            </div>
          </div>

          {/* Meta Provider */}
          <div className="group rounded-lg border bg-card p-6 hover:border-[#6466f273]  transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-background">
                  <img src="/Meta.png" alt="Meta" className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Meta</h3>
                  <p className="text-sm text-muted-foreground">
                    Llama 3.1 and Code Llama
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Daily Tokens</span>
                <span className="font-medium">382M</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Models</span>
                <span className="font-medium">15</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageSquareText className="size-3" />
                Chat
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <FileText className="size-3" />
                Code
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Open Source
              </Badge>
            </div>
          </div>

          {/* Cohere Provider */}
          <div className="group rounded-lg border bg-card p-6 hover:border-[#6466f273]  transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-background">
                  <div className="size-6 rounded bg-gradient-to-br from-blue-400 to-purple-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Cohere</h3>
                  <p className="text-sm text-muted-foreground">
                    Command R+ and Embed
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Daily Tokens</span>
                <span className="font-medium">156M</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Models</span>
                <span className="font-medium">5</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageSquareText className="size-3" />
                Chat
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Binary className="size-3" />
                Embeddings
              </Badge>
            </div>
          </div>

          {/* Mistral Provider */}
          <div className="group rounded-lg border bg-card p-6  hover:border-[#6466f273] transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-background">
                  <div className="size-6 rounded bg-gradient-to-br from-orange-500 to-red-600"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Mistral AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Mixtral 8x7B and 8x22B
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Daily Tokens</span>
                <span className="font-medium">234M</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Models</span>
                <span className="font-medium">7</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageSquareText className="size-3" />
                Chat
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <FileText className="size-3" />
                Code
              </Badge>
              <Badge variant="secondary" className="text-xs">
                MoE
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProvidersPage;
