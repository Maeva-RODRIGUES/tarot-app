// App.jsx

import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage.jsx";
import LoveTarotPage from "./pages/LoveTarotPage.jsx";
import LegalMentionsPage from "./pages/LegalMentionsPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import AboutPage from "./pages/AboutPage.jsx"; // Importer AboutPage
import ChakraProviderWrapper from "./ChakraProviderWrapper";
import { PopupProvider } from "./components/context/PopupContext"; // Importation du PopupProvider
import AppointmentPopup from "./components/AppointmentPopup.jsx"; // Importation du composant AppointmentPopup
import LoginPopup from "./components/LoginPopup"; // Importer LoginPopup
import SignupPopup from "./components/SignupPopup"; // Importer SignupPopup
import DashboardUserPage from "./pages/DashboardUserPage";
import "./styles/index.css";
import UserSettingPage from "./pages/UserSettingPage.jsx";
import TarotHistoryPage from "./pages/TarotHistoryPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import AdminUserManagementPage from "./pages/AdminUserManagementPage.jsx";
import ContentManagementPage from "./pages/ContentManagementPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <ChakraProviderWrapper>
      <PopupProvider>
        <Routes>
          {/* Routes principales */}
          <Route path="/" element={<Homepage />} />
          <Route path="/love" element={<LoveTarotPage />} />
          <Route path="/legal-mentions" element={<LegalMentionsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Route pour l'espace utilisateur avec Outlet pour les routes enfants */}
          <Route
            path="/profile/:userId/*"
            element={
              <PrivateRoute>
                <DashboardUserPage />
              </PrivateRoute>
            }
          >
            <Route path="settings" element={<UserSettingPage />} />
            <Route path="drawingsstory" element={<TarotHistoryPage />} />
          </Route>

          {/* Routes administrateurs */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <AdminUserManagementPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/content"
            element={
              <PrivateRoute>
                <ContentManagementPage />
              </PrivateRoute>
            }
          />
        </Routes>
        {/* Composants de popup */}
        <AppointmentPopup />
        <LoginPopup />
        <SignupPopup />
      </PopupProvider>
    </ChakraProviderWrapper>
  );
}

export default App;
