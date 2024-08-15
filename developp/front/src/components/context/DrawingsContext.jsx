/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
// src/components/context/DrawingsContext.jsx

import React, { createContext, useContext, useState } from "react";
import {
  fetchDrawings,
  createDrawingForUser,
  updateDrawing,
  deleteDrawing,
} from "../../api/drawApi";

const DrawingsContext = createContext();

export function DrawingsProvider({ children }) {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDrawings = async () => {
    setLoading(true);
    try {
      const data = await fetchDrawings();
      setDrawings(data);
    } catch (err) {
      setError("Erreur de récupération des tirages.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour ajouter un tirage
  const addDrawing = async (theme, userId, selectedCards) => {
    try {
      // Appel à la fonction API pour créer un nouveau tirage pour un utilisateur spécifique avec un thème et des cartes sélectionnées.
      const newDrawing = await createDrawingForUser(
        userId,
        theme,
        selectedCards,
      );

      // Mise à jour de l'état `drawings` avec le nouveau tirage ajouté.
      setDrawings([...drawings, newDrawing]);
    } catch (err) {
      // Si une erreur survient lors de la création du tirage, elle est capturée ici.
      console.error("Erreur de création du tirage:", err);

      // Mise à jour de l'état `error` pour indiquer qu'une erreur s'est produite.
      setError("Erreur de création du tirage.");
    }
  };

  const editDrawing = async (id, drawingData) => {
    try {
      const updatedDrawing = await updateDrawing(id, drawingData);
      setDrawings(drawings.map((d) => (d.id === id ? updatedDrawing : d)));
    } catch (err) {
      setError("Erreur de mise à jour du tirage.");
    }
  };

  const removeDrawing = async (id) => {
    try {
      await deleteDrawing(id);
      setDrawings(drawings.filter((d) => d.id !== id));
    } catch (err) {
      setError("Erreur de suppression du tirage.");
    }
  };

  return (
    <DrawingsContext.Provider
      value={{
        drawings,
        loading,
        error,
        loadDrawings,
        addDrawing,
        editDrawing,
        removeDrawing,
      }}
    >
      {children}
    </DrawingsContext.Provider>
  );
}

export const useDrawings = () => useContext(DrawingsContext);
