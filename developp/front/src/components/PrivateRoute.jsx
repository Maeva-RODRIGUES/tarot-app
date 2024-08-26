// PrivateRoute.jsx

import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { usePopup } from "./context/PopupContext"; // Importation du contexte de la popup
import { useToast } from "@chakra-ui/react";

function PrivateRoute({ children, requiredRole }) {
  const { isAuthenticated, hasRole, user, logout} = useAuth(); // Vérification de l'authentification
  const { openPopup } = usePopup(); // Accéder à la fonction pour ouvrir la popup
  const toast = useToast();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      openPopup("login"); // Ouvre la modal de connexion
    } else if (requiredRole) {
      console.log("Required role:", requiredRole);
      console.log("User roles:", user?.role); // Assuming you have user roles available
      console.log("Has required role:", hasRole(requiredRole));
      
      if (!hasRole(requiredRole)) {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les droits pour accéder à cet espace.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });


        setTimeout(() => {
          logout(); // Déconnexion de l'utilisateur et suppression du token
          setShouldRedirect(true); 
        }, 10000); // Délai de 3 secondes avant la déconnexion et la redirection
      }
    }
  }, [isAuthenticated, requiredRole, hasRole, user, openPopup, toast, logout]);

  if (shouldRedirect) {
    return <Navigate to="/" replace />; // Redirige vers la page d'accueil après la déconnexion
  }


  if (!isAuthenticated()) {
    return null; // Retourne null pour éviter une redirection vers une route inexistante
  }


  if (requiredRole && !hasRole(requiredRole)) {
    return null; // Évite de rendre le contenu non autorisé pendant l'attente de la redirection
  }

  return children || <Outlet />;
}

export default PrivateRoute;
