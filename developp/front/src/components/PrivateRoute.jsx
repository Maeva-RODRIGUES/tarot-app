// PrivateRoute.jsx

import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { usePopup } from "./context/PopupContext"; // Importation du contexte de la popup

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Vérification de l'authentification
  const location = useLocation();
  const { openPopup } = usePopup(); // Accéder à la fonction pour ouvrir la popup

  useEffect(() => {
    if (!isAuthenticated()) {
      // ---------------- Mise à jour : Ouvre la popup de connexion si l'utilisateur n'est pas authentifié ----------------
      openPopup("login"); // Ouvre la modal de connexion
      // -----------------------------------------------------------------------------------------------------------------
    }
  }, [isAuthenticated, openPopup]);

  if (!isAuthenticated()) {
    // Afficher une page d'attente ou un composant vide si nécessaire
    return null; // Retourne null pour éviter une redirection vers une route inexistante
  }

  return children || <Outlet />;
}

export default PrivateRoute;
