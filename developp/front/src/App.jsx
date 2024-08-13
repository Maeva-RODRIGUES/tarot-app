// App.jsx

import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/HomePage.jsx";
import TarotThemesPage from './pages/TarotThemesPage.jsx';
import TarotDrawPage from './pages/TarotDrawPage.jsx';
import LoveTarotPage from "./pages/LoveTarotPage.jsx";
import LegalMentionsPage from "./pages/LegalMentionsPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ChakraProviderWrapper from "./ChakraProviderWrapper";
import { PopupProvider } from "./components/context/PopupContext";
import AppointmentPopup from "./components/AppointmentPopup.jsx";
import LoginPopup from "./components/LoginPopup";
import SignupPopup from "./components/SignupPopup";
import DashboardUserPage from "./pages/DashboardUserPage";
import { AuthProvider } from "./components/context/AuthContext";
import UserSettingPage from "./pages/UserSettingPage.jsx";
import TarotHistoryPage from "./pages/TarotHistoryPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import AdminUserManagementPage from "./pages/AdminUserManagementPage.jsx";
import ContentManagementPage from "./pages/ContentManagementPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <ChakraProviderWrapper>
      <AuthProvider>
        <PopupProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
           
           
            {/* Route pour sélectionner les thèmes de tirage */}
            <Route
              path="/themes"
              element={
                <PrivateRoute>
                  <TarotThemesPage />
                </PrivateRoute>
              }
            />
            
            {/* Route pour afficher les tirages en fonction du thème sélectionné */}
            <Route
              path="/tarot-draw/:theme"
              element={
                <PrivateRoute>
                  <TarotDrawPage />
                </PrivateRoute>
              }
            />
            
            <Route path="/legal-mentions" element={<LegalMentionsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route
              path="/profile/:userId"
              element={
                <PrivateRoute>
                  <DashboardUserPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:userId/settings"
              element={
                <PrivateRoute>
                  <UserSettingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:userId/drawingsstory"
              element={
                <PrivateRoute>
                  <TarotHistoryPage />
                </PrivateRoute>
              }
            />

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
          <AppointmentPopup />
          <LoginPopup />
          <SignupPopup />
        </PopupProvider>
      </AuthProvider>
    </ChakraProviderWrapper>
  );
}

export default App;
