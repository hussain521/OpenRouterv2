 
import "./App.css";
import Home from "./pages/Home";
import { ViewProvider } from "./context/ViewContext";
import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);
  
  return (
    <ViewProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/rankings" element={<RankingsPage />} />

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
    </ViewProvider>
  );
}

export default App;
