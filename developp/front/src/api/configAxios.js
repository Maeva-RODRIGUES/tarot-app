// configAxios.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/tarot",
});

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

export default api;
