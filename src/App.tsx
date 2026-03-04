 
import "./App.css";
import Home from "./pages/Home";
import { ViewProvider } from "./context/ViewContext";
import { Routes, Route, Navigate } from "react-router-dom";
import ActivityPage from "./pages/ActivityPage";
import LogsPage from "./pages/LogsPage";
import CreditsPage from "./pages/CreditsPage";
import SettingsPage from "./pages/SettingsPage";
import PresetsPage from "./pages/PresetsPage";
import NewPresetPage from "./pages/NewPresetPage";
import BYOKPage from "./pages/BYOKPage";
import RoutingPage from "./pages/RoutingPage";

function App() {
 return (
   <ViewProvider>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/activity" element={<ActivityPage />} />
       <Route path="/logs" element={<LogsPage />} />
       <Route path="/credits" element={<CreditsPage />} />
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
