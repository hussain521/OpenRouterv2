 
import "./App.css";
import Home from "./pages/Home";
import { ViewProvider } from "./context/ViewContext";
import { ModelsProvider } from "./context/ModelsContext";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ActivityPage from "./pages/ActivityPage";
import LogsPage from "./pages/LogsPage";
import CreditsPage from "./pages/CreditsPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import PresetsPage from "./pages/PresetsPage";
import NewPresetPage from "./pages/NewPresetPage";
import BYOKPage from "./pages/BYOKPage";
import RoutingPage from "./pages/RoutingPage";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AppPage from "./pages/AppPage";
import ModelsPage from "./pages/models-page";
import RankingsPage from "./pages/RankingsPage";
import ModelComparisonPage from "./pages/ModelComparisonPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import ProvidersPage from "./pages/ProvidersPage";
import CareersPage from "./pages/CareersPage";
import PrivacyPage from "./pages/PrivacyPage";
import SupportPage from "./pages/SupportPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import LabsPage from "./pages/LabsPage";
import WorksWithOpenRouterPage from "./pages/WorksWithOpenRouterPage";
import EnterprisePage from "./pages/EnterprisePage";
import SDKPage from "./pages/SDKPage";

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);
  
  return (
    <ModelsProvider>
      <ViewProvider>
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ScrollToTop />
      </ViewProvider>
    </ModelsProvider>
  );
}

export default App;
