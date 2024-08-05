// front/src/api/configAxios.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/tarot",
});

// Intercepteur pour ajouter le jeton d'authentification à chaque requête
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;

