import "./App.css";
import { lazy, Suspense } from "react";
import { ViewProvider } from "./context/ViewContext";
import { ModelsProvider } from "./context/ModelsContext";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getBackendStatus } from "./lib/utils"; // Import the function
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider and useAuth

const Home = lazy(() => import("./pages/Home"));
const ActivityPage = lazy(() => import("./pages/ActivityPage"));
const LogsPage = lazy(() => import("./pages/LogsPage"));
const CreditsPage = lazy(() => import("./pages/CreditsPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const PresetsPage = lazy(() => import("./pages/PresetsPage"));
const NewPresetPage = lazy(() => import("./pages/NewPresetPage"));
const BYOKPage = lazy(() => import("./pages/BYOKPage"));
const RoutingPage = lazy(() => import("./pages/RoutingPage"));
const AppPage = lazy(() => import("./pages/AppPage"));
const ModelsPage = lazy(() => import("./pages/models-page"));
const RankingsPage = lazy(() => import("./pages/RankingsPage"));
const ModelComparisonPage = lazy(() => import("./pages/ModelComparisonPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProvidersPage = lazy(() => import("./pages/ProvidersPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const LabsPage = lazy(() => import("./pages/LabsPage"));
const WorksWithOpenRouterPage = lazy(() => import("./pages/WorksWithOpenRouterPage"));
const EnterprisePage = lazy(() => import("./pages/EnterprisePage"));
const SDKPage = lazy(() => import("./pages/SDKPage"));
const TranslationTestPage = lazy(() => import("./pages/TranslationTestPage"));

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    // Test backend connection
    getBackendStatus();
  }, [i18n.language]);
  
  return (
    <AuthProvider>
      <ModelsProvider>
        <ViewProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/models" element={<ModelsPage />} />
              <Route path="/compare" element={<ModelComparisonPage />} />
              <Route path="/rankings" element={<RankingsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/providers" element={<ProvidersPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/labs" element={<LabsPage />} />
              <Route path="/works-with-openrouter" element={<WorksWithOpenRouterPage />} />
              <Route path="/enterprise" element={<EnterprisePage />} />
              <Route path="/sdk" element={<SDKPage />} />

              <Route path="/app" element={<AppPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/logs" element={<LogsPage />} />
              <Route path="/credits" element={<CreditsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/settings/*" element={<SettingsPage />} />
              <Route path="/presets" element={<PresetsPage />} />
              <Route path="/settings/presets" element={<PresetsPage />} />
              <Route path="/new-preset" element={<NewPresetPage />} />
              <Route path="/settings/new-preset" element={<NewPresetPage />} />
              <Route path="/byok" element={<BYOKPage />} />
              <Route path="/settings/byok" element={<BYOKPage />} />
              <Route path="/routing" element={<RoutingPage />} />
              <Route path="/settings/routing" element={<RoutingPage />} />
              <Route path="/translation-test" element={<TranslationTestPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <ScrollToTop />
        </ViewProvider>
      </ModelsProvider>
    </AuthProvider>
  );
}

// Component to handle social login callbacks
const AuthCallback = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { onSignedIn, onSignedOut } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token?.trim()) {
      onSignedIn(token);
      navigate("/", { replace: true });
      return;
    }

    onSignedOut();
    console.error("Authentication token not found.");
    navigate("/", { replace: true });
  }, [location.search, navigate, onSignedIn, onSignedOut]);

  return <div>{t("auth.processing")}...</div>;
};

export default App;
