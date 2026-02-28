 
import "./App.css";
import Home from "./pages/Home";
import { ViewProvider } from "./context/ViewContext";
import { Routes, Route, Navigate } from "react-router-dom";
import ActivityPage from "./pages/ActivityPage";
import LogsPage from "./pages/LogsPage";
import CreditsPage from "./pages/CreditsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
 return (
   <ViewProvider>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/activity" element={<ActivityPage />} />
       <Route path="/logs" element={<LogsPage />} />
       <Route path="/credits" element={<CreditsPage />} />
       <Route path="/settings/*" element={<SettingsPage />} />
       <Route path="*" element={<Navigate to="/" replace />} />
     </Routes>
   </ViewProvider>
 );
}

export default App;
