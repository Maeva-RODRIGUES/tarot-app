// configAxios.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/tarot",
});

// Intercepteur de requêtes pour ajouter le token JWT à l'en-tête Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(
        "Intercepteur : Token trouvé et ajouté aux en-têtes :",
        token,
      );
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log(
        "Intercepteur : Aucun token trouvé, l'en-tête Authorization ne sera pas ajouté.",
      );
    }
    return config;
  },
  (error) => {
    console.error("Erreur dans l'intercepteur de requête", error);
    return Promise.reject(error);
  },
);

// Intercepteur de réponses pour gérer les erreurs 401 (Unauthorized)
api.interceptors.response.use(
  (response) => {
    // Si la réponse est correcte, la retourner
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Erreur 401 détectée, redirection vers la page de connexion.");
      // Logique de redirection vers la page de connexion ou gestion spécifique
      // window.location.href = "/login"; // Par exemple, rediriger vers la page de connexion
    }
    return Promise.reject(error);
  }
);


export default api;
