// src/api/uploadApi.js

import api from "./configAxios";

// Télécharger un fichier
export const uploadFile = async (fileData) => {
  try {
    const response = await api.post("/upload", fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier :", error);
    throw error;
  }
};

// Obtenir la liste des fichiers téléchargés
export const fetchUploadedFiles = async () => {
  try {
    const response = await api.get("/upload");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers téléchargés :", error);
    throw error;
  }
};
