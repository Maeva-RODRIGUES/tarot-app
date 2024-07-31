// front/src/api/configAxios.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/tarot",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Vérifier le stockage du token
  },
});

export default api;
