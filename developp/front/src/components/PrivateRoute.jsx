// PrivateRoute.jsx

import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Vérification de l'authentification
  const location = useLocation();

  if (!isAuthenticated()) {
    // Rediriger vers la page de connexion si non authentifié
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children || <Outlet />;
}

export default PrivateRoute;
