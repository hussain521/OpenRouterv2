import { useState, useEffect, useRef, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiGithub,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiMonitor,
  FiGlobe,
  FiCpu,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import {
  Activity,
  FileText,
  CreditCard,
  Settings,
  Home,
  FileCode,
  Shield,
  Key,
  Layers,
  Route,
  Puzzle,
  Eye,
  Database,
  BarChart3,
  DollarSign,
  Info,
  Server,
  Briefcase,
  Lock,
  HelpCircle,
  Beaker,
  MessageSquare,
  Grid3X3,
  Zap,
  BarChart,
  Calendar,
  AppWindow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";
import { useModels } from "@/context/ModelsContext";

type AuthMode = "signin" | "signup";

function SignInCard({
  onClose,
  onSignedIn,
  onSwitchToSignUp,
}: {
  onClose: () => void;
  onSignedIn: () => void;
  onSwitchToSignUp: () => void;
}) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem('isSignedIn', 'true');
    onSignedIn();
    onClose();
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-border bg-white dark:bg-card shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t("common.closeButton")}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-muted-foreground dark:hover:text-foreground"
      >
        <FiX className="h-5 w-5" />
      </button>

      <div className="px-8 pt-8 pb-6">
        <h2 className="text-center text-[20px] font-semibold dark:text-foreground">
          {t("signIn.title")}
        </h2>
        <p className="mt-1 text-center text-[13px] text-gray-500 dark:text-muted-foreground">
          {t("signIn.subtitle")}
        </p>

        {/* Social buttons */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-border bg-white dark:bg-secondary text-[13px] text-gray-700 dark:text-secondary-foreground hover:bg-gray-50 dark:hover:bg-accent">
            <FiGithub className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-border bg-white dark:bg-secondary text-[13px] text-gray-700 dark:text-secondary-foreground hover:bg-gray-50 dark:hover:bg-accent">
            <FcGoogle className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-border bg-white dark:bg-secondary text-[13px] text-gray-700 dark:text-secondary-foreground hover:bg-gray-50 dark:hover:bg-accent">
            <span className="text-base">🦊</span>
          </button>
        </div>

        {/* Or divider */}
        <div className="mt-6 flex items-center gap-3 text-[11px] text-gray-400 dark:text-muted-foreground">
          <div className="h-px flex-1 bg-gray-200 dark:bg-border" />
          <span>{t("common.or")}</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700 dark:text-foreground">
              {t("signIn.emailLabel")}
            </label>
            <Input
              type="email"
              placeholder={t("signIn.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 dark:border-border bg-[#F9FAFB] dark:bg-input text-[13px] dark:text-foreground placeholder:text-gray-400 dark:placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          <Button
            type="submit"
            className="mt-1.5 h-11 w-full rounded-full bg-[#4F46E5] text-[14px] font-medium hover:bg-[#4338CA]"
          >
            {t("common.continue")}
            <span className="ml-2 text-[15px] leading-none">▸</span>
          </Button>
        </form>

        <button
          type="button"
          className="mt-3 w-full text-center text-[12px] font-medium text-[#6366F1] hover:underline"
        >
          {t("signIn.usePasskey")}
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-4 text-center text-[13px] text-gray-500 dark:text-gray-400">
        {t("signIn.dontHaveAccount")}{" "}
        <button
          type="button"
          className="font-medium text-[#6366F1] hover:underline"
          onClick={onSwitchToSignUp}
        >
          {t("signIn.signUpLink")}
        </button>
      </div>
    </div>
  );
}

function SignUpCard({
  onClose,
  onSignedUp,
  onSwitchToSignIn,
}: {
  onClose: () => void;
  onSignedUp: () => void;
  onSwitchToSignIn: () => void;
}) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 8 || !acceptedTerms) return;
    localStorage.setItem('isSignedIn', 'true');
    onSignedUp();
    onClose();
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-border bg-white dark:bg-card shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t("common.closeButton")}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <FiX className="h-5 w-5" />
      </button>

      <div className="px-8 pt-8 pb-6">
        <h2 className="text-center text-[20px] font-semibold dark:text-white">
          {t("signUp.title")}
        </h2>
        <p className="mt-1 text-center text-[13px] text-gray-500 dark:text-gray-400">
          {t("signUp.subtitle")}
        </p>

        {/* Social buttons */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <FiGithub className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <FcGoogle className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <span className="text-base">🦊</span>
          </button>
        </div>

        {/* Or divider */}
        <div className="mt-6 flex items-center gap-3 text-[11px] text-gray-400 dark:text-gray-500">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
          <span>{t("common.or")}</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700 dark:text-gray-200">
              {t("signUp.emailLabel")}
            </label>
            <Input
              type="email"
              placeholder={t("signUp.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 dark:border-gray-600 bg-[#F9FAFB] dark:bg-gray-700 text-[13px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#6366F1]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700 dark:text-gray-200">
              {t("signUp.passwordLabel")}
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={t("signUp.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg border border-gray-200 dark:border-gray-600 bg-[#F9FAFB] dark:bg-gray-700 text-[13px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#6366F1] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label={showPassword ? t("signUp.hidePassword") : t("signUp.showPassword")}
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4" />
                ) : (
                  <FiEye className="h-4 w-4" />
                )}
              </button>
            </div>
            {password.length > 0 && password.length < 8 && (
              <div className="flex items-center gap-1.5 text-[11px] text-red-500">
                <FiAlertCircle className="h-3.5 w-3.5" />
                <span>{t("signUp.passwordError")}</span>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              id="signup-terms"
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#6366F1] focus:ring-[#6366F1]"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label
              htmlFor="signup-terms"
              className="text-[12px] leading-snug text-gray-500 dark:text-gray-400"
            >
              {t("signUp.agreeText")}{" "}
              <button
                type="button"
                className="text-[#6366F1] underline-offset-2 hover:underline"
              >
                {t("signUp.termsOfService")}
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="text-[#6366F1] underline-offset-2 hover:underline"
              >
                {t("signUp.privacyPolicy")}
              </button>
              .
            </label>
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 w-full rounded-full bg-[#4F46E5] text-[14px] font-medium hover:bg-[#4338CA]"
          >
            {t("common.continue")}
            <span className="ml-2 text-[15px] leading-none">▸</span>
          </Button>
        </form>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-4 text-center text-[13px] text-gray-500 dark:text-gray-400">
        {t("signUp.alreadyHaveAccount")}{" "}
        <button
          type="button"
          className="font-medium text-[#6366F1] hover:underline"
          onClick={onSwitchToSignIn}
        >
          {t("signUp.signInLink")}
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { themePreference, isSystemDarkMode, setThemePreference } = useTheme();
  const { models, setSearchQuery: setModelsSearchQuery, filters } = useModels();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(() => {
    // Check if user is signed in from localStorage
    return localStorage.getItem('isSignedIn') === 'true';
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Use actual models data for search results
  const filteredResults = searchQuery.trim()
    ? models.filter(model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.modelId.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) // Show top 5 results
    : models.slice(0, 5); // Show first 5 models when no search query

  // Handle language change
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update document direction for RTL/LTR
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  // Set initial direction based on current language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  // Map routes to icons
  const getPageIcon = () => {
    const pathname = location.pathname;
    
    // Home page
    if (pathname === '/') return <Home className="h-4 w-4" />;
    
    // Main navigation pages
    if (pathname === '/models') return <Database className="h-4 w-4" />;
    if (pathname === '/chat') return <MessageSquare className="h-4 w-4" />;
    if (pathname === '/rankings') return <BarChart3 className="h-4 w-4" />;
    if (pathname === '/pricing') return <DollarSign className="h-4 w-4" />;
    if (pathname === '/app') return <AppWindow className="h-4 w-4" />;
    if (pathname === '/compare') return <Grid3X3 className="h-4 w-4" />;
    
    // User activity pages
    if (pathname === '/activity') return <Activity className="h-4 w-4" />;
    if (pathname === '/logs') return <FileText className="h-4 w-4" />;
    if (pathname === '/credits') return <CreditCard className="h-4 w-4" />;
    
    // Settings pages
    if (pathname.includes('/settings/account')) return <Settings className="h-4 w-4" />;
    if (pathname.includes('/settings/api-keys')) return <Key className="h-4 w-4" />;
    if (pathname.includes('/settings/management-keys')) return <Key className="h-4 w-4" />;
    if (pathname.includes('/settings/privacy-guardrails')) return <Shield className="h-4 w-4" />;
    if (pathname.includes('/settings/byok') || pathname === '/byok') return <FileCode className="h-4 w-4" />;
    if (pathname.includes('/settings/presets') || pathname === '/presets' || pathname === '/new-preset') return <Layers className="h-4 w-4" />;
    if (pathname.includes('/settings/routing') || pathname === '/routing') return <Route className="h-4 w-4" />;
    if (pathname.includes('/settings/plugins')) return <Puzzle className="h-4 w-4" />;
    if (pathname.includes('/settings/observability')) return <Eye className="h-4 w-4" />;
    if (pathname.includes('/settings')) return <Settings className="h-4 w-4" />;
    
    // Company/info pages
    if (pathname === '/about') return <Info className="h-4 w-4" />;
    if (pathname === '/providers') return <Server className="h-4 w-4" />;
    if (pathname === '/careers') return <Briefcase className="h-4 w-4" />;
    if (pathname === '/privacy') return <Lock className="h-4 w-4" />;
    if (pathname === '/terms') return <FileText className="h-4 w-4" />;
    if (pathname === '/support') return <HelpCircle className="h-4 w-4" />;
    if (pathname === '/labs') return <Beaker className="h-4 w-4" />;
    
    return <Home className="h-4 w-4" />; // Default icon
  };

  // Disable body scroll when auth dialog is open
  useEffect(() => {
    if (!authOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [authOpen]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isProfileOpen]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    if (isSearchFocused) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isSearchFocused]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearchFocused(true);
    
    // If on models page, update the search immediately
    if (location.pathname === '/models') {
      setModelsSearchQuery(query);
    }
  };

  // Handle search focus
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchFocused(false);
    if (location.pathname === '/models') {
      setModelsSearchQuery("");
    }
  };

  // Handle search submit (Enter key)
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setModelsSearchQuery(searchQuery);
      navigate('/models');
      setIsSearchFocused(false);
    }
  };

  // Get current date in Arabic
  const getCurrentDate = () => {
    const now = new Date();
    const months = {
      en: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      ar: [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
      ]
    };
    
    const month = months[i18n.language as 'en' | 'ar'] || months.en;
    return `${month[now.getMonth()]} ${now.getFullYear()}`;
  };

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  return (
    <>
      <div className="relative z-20 w-full bg-white dark:bg-background border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-3 xs:px-4 py-3 xs:py-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Logo + Search */}
          <div className="flex flex-1 items-center gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
            <h1
              className="text-base xs:text-lg font-semibold sm:text-xl lg:text-xl dark:text-foreground cursor-pointer whitespace-nowrap hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              OpenRouter
            </h1>

            <div className="relative w-full max-w-[120px] xs:max-w-[150px] sm:max-w-[200px] lg:max-w-[300px] xl:max-w-[350px]" ref={searchDropdownRef}>
              <FiSearch className="absolute left-2 xs:left-3 top-1/2 -translate-y-1/2 text-xs xs:text-sm text-gray-400 dark:text-muted-foreground lg:text-base z-10" />
              <Input
                placeholder={t("nav.search", "Search models...")}
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onKeyDown={handleSearchSubmit}
                className="h-7 xs:h-8 sm:h-9 lg:h-10 w-full bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border dark:text-foreground pl-6 xs:pl-7 sm:pl-8 lg:pl-10 text-xs xs:text-sm lg:text-base focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors duration-200"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 xs:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-muted-foreground dark:hover:text-foreground transition-colors duration-200"
                >
                  <FiX className="h-3 w-3 xs:h-3.5 xs:w-3.5 lg:h-4 lg:w-4" />
                </button>
              )}

              {/* Search Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto animate-slide-in">
                  {/* Current Date Header */}
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-border">
                    <div className="text-xs text-gray-500 dark:text-muted-foreground font-medium">
                      {getCurrentDate()}
                    </div>
                  </div>

                  {/* Search Results */}
                  {/* Search Results */}
                  <div className="py-1">
                    {filteredResults.map((item) => (
                      <button
                        key={item.id}
                        className="w-full px-3 py-2 hover:bg-gray-50 dark:hover:bg-muted text-left flex items-center gap-3 transition-colors duration-200"
                        onClick={() => {
                          // Set the search query in models context and navigate to models page
                          setModelsSearchQuery(searchQuery);
                          navigate('/models');
                          clearSearch();
                        }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6 rounded">
                          <img
                            src={`/${item.favicon}.png`}
                            alt={item.provider}
                            className="w-full h-full rounded object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/vite.svg";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs xs:text-sm text-gray-900 dark:text-foreground truncate">
                            {item.provider}: {item.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-muted-foreground truncate">
                            {item.modelId}
                          </div>
                        </div>
                       </button>
                    ))}
                  </div>

                  {searchQuery && filteredResults.length === 0 && (
                    <div className="px-3 py-6 text-center text-sm text-gray-500 dark:text-muted-foreground">
                      <FiSearch className="h-6 w-6 xs:h-8 xs:w-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                      <div className="font-medium">{t("nav.searchResults.noResults", { query: searchQuery })}</div>
                      <div className="text-xs mt-1 opacity-75">{t("nav.searchResults.tryAnother")}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 xl:gap-2 text-sm text-gray-600 dark:text-muted-foreground lg:flex">
            <a
              href="/models"
              className="rounded-lg px-2 xl:px-3 py-1.5 xl:py-2 font-medium hover:bg-gray-100 dark:hover:bg-muted hover:text-black dark:hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/models");
              }}
            >
              {t("features.models", "Models")}
            </a>
            <a
              href="/chat"
              className="rounded-lg px-2 xl:px-3 py-1.5 xl:py-2 font-medium hover:bg-gray-100 dark:hover:bg-muted hover:text-black dark:hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/chat");
              }}
            >
              {t("nav.chat")}
            </a>
            <a
              href="/rankings"
              className="rounded-lg px-2 xl:px-3 py-1.5 xl:py-2 font-medium hover:bg-gray-100 dark:hover:bg-muted hover:text-black dark:hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/rankings");
              }}
            >
              {t("nav.rankings")}
            </a>
            <a
              href="/app"
              className="rounded-lg px-2 xl:px-3 py-1.5 xl:py-2 font-medium hover:bg-gray-100 dark:hover:bg-muted hover:text-black dark:hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/app");
              }}
            >
              {t("nav.app")}
            </a>
            <a
              href="/pricing"
              className="rounded-lg px-2 xl:px-3 py-1.5 xl:py-2 font-medium hover:bg-gray-100 dark:hover:bg-muted hover:text-black dark:hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/pricing");
              }}
            >
              {t("nav.pricing")}
            </a>
            <a
              href="#"
              className="rounded-lg px-2 xl:px-3 py-1.5 xl:py-2 font-medium hover:bg-gray-100 dark:hover:bg-muted hover:text-black dark:hover:text-foreground transition-colors duration-200"
            >
              {t("nav.docs")}
            </a>

            {!isSignedIn ? (
              <Button
                className="rounded-full bg-primary px-4 xl:px-6 text-primary-foreground hover:bg-primary/90 transition-colors duration-200 ml-2"
                onClick={() => openAuth("signin")}
              >
                {t("nav.signIn", "Sign in")}
              </Button>
            ) : (
              <div className="relative ml-2 xl:ml-4" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-1 xl:gap-1.5 rounded-full border border-border bg-background px-1.5 xl:px-2 py-1 shadow-sm hover:bg-muted transition-colors duration-200"
                >
                  {/* Dropdown Arrow in the middle */}
                  <div className="flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {isProfileOpen ? (
                      <FiChevronDown className="h-3 xl:h-3.5 w-3 xl:w-3.5" />
                    ) : (
                      <FiMenu className="h-3 xl:h-3.5 w-3 xl:w-3.5" />
                    )}
                  </div>
                  {/* Current Page Icon - hidden on very small screens */}
                  <div className="hidden sm:flex items-center justify-center text-muted-foreground">
                    {getPageIcon()}
                  </div>

                  {/* User Avatar on the right */}
                  <img
                    src="./Meta.png"
                    alt=""
                    className="inline-flex h-6 xl:h-7 w-6 xl:w-7 items-center justify-center rounded-full bg-muted object-cover"
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 rounded-xl border border-border bg-card py-2 text-sm text-card-foreground shadow-lg animate-fade-in">
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-muted transition-colors duration-200"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/activity");
                      }}
                    >
                      {t("nav.activity", "Activity")}
                    </button>
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-muted transition-colors duration-200"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/logs");
                      }}
                    >
                      {t("nav.logs")}
                    </button>
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-muted transition-colors duration-200"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/credits");
                      }}
                    >
                      {t("nav.credits", "Credits")}
                    </button>
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-muted transition-colors duration-200"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/settings");
                      }}
                    >
                      {t("nav.settings", "Settings")}
                    </button>
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-destructive/10 text-destructive transition-colors duration-200"
                      onClick={() => {
                        setIsSignedIn(false);
                        setIsProfileOpen(false);
                        localStorage.removeItem("isSignedIn");
                      }}
                    >
                      {t("nav.signOut", "Sign Out")}
                    </button>
                    <div className="mt-1 flex flex-col gap-2 border-t border-border px-4 pb-1 pt-2">
                      {/* Language Toggle */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground pb-2">
                        <span className="flex items-center gap-1">
                          <FiGlobe className="h-3.5 w-3.5" />
                          <span>{t("nav.language", "Language")}</span>
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => changeLanguage("en")}
                            className={`px-2 py-0.5 text-xs rounded transition-colors duration-200 ${
                              i18n.language === "en"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            EN
                          </button>
                          <button
                            type="button"
                            onClick={() => changeLanguage("ar")}
                            className={`px-2 py-0.5 text-xs rounded transition-colors duration-200 ${
                              i18n.language === "ar"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            AR
                          </button>
                        </div>
                      </div>
                      {/* Theme Toggle */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{t("nav.theme")}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setThemePreference("light")}
                            className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors duration-200 ${
                              themePreference === "light"
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                            title={t("nav.lightMode")}
                          >
                            <FiSun className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setThemePreference("system")}
                            className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors duration-200 ${
                              themePreference === "system"
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-border bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                            }`}
                            title={t("nav.systemDefault")}
                          >
                            <FiMonitor className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setThemePreference("dark")}
                            className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors duration-200 ${
                              themePreference === "dark"
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-border bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                            }`}
                            title={t("nav.darkMode")}
                          >
                            <FiMoon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      {themePreference === "system" && (
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground opacity-75">
                          <span>{t("nav.systemStatus")}</span>
                          <span className="flex items-center gap-1">
                            {isSystemDarkMode ? (
                              <>
                                <FiMoon className="h-3 w-3" />
                                <span>{t("nav.dark")}</span>
                              </>
                            ) : (
                              <>
                                <FiSun className="h-3 w-3" />
                                <span>{t("nav.light")}</span>
                              </>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-2 rounded-lg bg-primary p-1.5 xs:p-2 text-primary-foreground transition-colors duration-200 hover:bg-primary/90 lg:hidden"
            aria-label={t("common.toggleMenu")}
          >
            {isMenuOpen ? (
              <FiX className="h-4 xs:h-5 w-4 xs:w-5" />
            ) : (
              <FiMenu className="h-4 xs:h-5 w-4 xs:w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col gap-1 border-t border-border bg-background px-3 xs:px-4 pb-4 pt-2 lg:hidden animate-slide-in">
            <a
              href="/models"
              className="rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/models");
                setIsMenuOpen(false);
              }}
            >
              {t("features.models", "Models")}
            </a>
            <a
              href="/chat"
              className="rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/chat");
                setIsMenuOpen(false);
              }}
            >
              {t("nav.chat")}
            </a>
            <a
              href="/rankings"
              className="rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/rankings");
                setIsMenuOpen(false);
              }}
            >
              {t("nav.rankings")}
            </a>
            <a
              href="/app"
              className="rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/app");
                setIsMenuOpen(false);
              }}
            >
              {t("nav.app")}
            </a>
            <a
              href="/pricing"
              className="rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate("/pricing");
                setIsMenuOpen(false);
              }}
            >
              {t("nav.pricing")}
            </a>
            <a
              href="#"
              className="rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
            >
              {t("nav.docs")}
            </a>
            
            {!isSignedIn ? (
              <Button
                className="mt-3 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                onClick={() => openAuth("signin")}
              >
                {t("nav.signIn", "Sign in")}
              </Button>
            ) : (
              <div className="mt-3 border-t border-border pt-3">
                <div className="flex items-center gap-3 mb-3 px-3">
                  <img
                    src="./Meta.png"
                    alt=""
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted object-cover"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {t("nav.userMenu", "User Menu")}
                  </span>
                </div>
                
                <button
                  className="block w-full rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 text-left"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/activity");
                  }}
                >
                  {t("nav.activity", "Activity")}
                </button>
                <button
                  className="block w-full rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 text-left"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/logs");
                  }}
                >
                  {t("nav.logs")}
                </button>
                <button
                  className="block w-full rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 text-left"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/credits");
                  }}
                >
                  {t("nav.credits", "Credits")}
                </button>
                <button
                  className="block w-full rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 text-left"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/settings");
                  }}
                >
                  {t("nav.settings", "Settings")}
                </button>
                <button
                  className="block w-full rounded-lg px-3 py-2.5 font-medium text-destructive hover:bg-destructive/10 transition-colors duration-200 text-left"
                  onClick={() => {
                    setIsSignedIn(false);
                    setIsMenuOpen(false);
                    localStorage.removeItem("isSignedIn");
                  }}
                >
                  {t("nav.signOut", "Sign Out")}
                </button>

                {/* Theme and Language Controls for Mobile */}
                <div className="mt-3 space-y-3 border-t border-border pt-3">
                  {/* Language Toggle */}
                  <div className="flex items-center justify-between px-3">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FiGlobe className="h-4 w-4" />
                      <span>{t("nav.language", "Language")}</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => changeLanguage("en")}
                        className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                          i18n.language === "en"
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        EN
                      </button>
                      <button
                        type="button"
                        onClick={() => changeLanguage("ar")}
                        className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                          i18n.language === "ar"
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        AR
                      </button>
                    </div>
                  </div>
                  
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between px-3">
                    <span className="text-sm text-muted-foreground">{t("nav.theme")}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setThemePreference("light")}
                        className={`flex h-7 w-7 items-center justify-center rounded-md border transition-colors duration-200 ${
                          themePreference === "light"
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        title={t("nav.lightMode")}
                      >
                        <FiSun className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setThemePreference("system")}
                        className={`flex h-7 w-7 items-center justify-center rounded-md border transition-colors duration-200 ${
                          themePreference === "system"
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        }`}
                        title={t("nav.systemDefault")}
                      >
                        <FiMonitor className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setThemePreference("dark")}
                        className={`flex h-7 w-7 items-center justify-center rounded-md border transition-colors duration-200 ${
                          themePreference === "dark"
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        }`}
                        title={t("nav.darkMode")}
                      >
                        <FiMoon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {themePreference === "system" && (
                    <div className="flex items-center justify-between px-3 text-xs text-muted-foreground opacity-75">
                      <span>{t("nav.systemStatus")}</span>
                      <span className="flex items-center gap-1">
                        {isSystemDarkMode ? (
                          <>
                            <FiMoon className="h-3 w-3" />
                            <span>{t("nav.dark")}</span>
                          </>
                        ) : (
                          <>
                            <FiSun className="h-3 w-3" />
                            <span>{t("nav.light")}</span>
                          </>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Auth Dialog with blurred background */}
      {authOpen && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-16 sm:pt-24">
          {/* backdrop click to close */}
          <button
            type="button"
            aria-label={t("common.closeButton")}
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={closeAuth}
          />

          <div className="relative z-10 flex w-full items-start justify-center">
            {authMode === "signin" ? (
              <SignInCard
                onClose={closeAuth}
                onSignedIn={() => setIsSignedIn(true)}
                onSwitchToSignUp={() => setAuthMode("signup")}
              />
            ) : (
              <SignUpCard
                onClose={closeAuth}
                onSignedUp={() => setIsSignedIn(true)}
                onSwitchToSignIn={() => setAuthMode("signin")}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
