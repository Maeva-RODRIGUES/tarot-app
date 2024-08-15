/* eslint-disable import/prefer-default-export */
// src/api/uploadApi.js

import api from "./configAxios";
import { UPLOAD_ENDPOINT } from "./apiEndpoints";

// Télécharger un fichier
export const uploadFile = async (fileData) => {
  const response = await api.post(UPLOAD_ENDPOINT, fileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
