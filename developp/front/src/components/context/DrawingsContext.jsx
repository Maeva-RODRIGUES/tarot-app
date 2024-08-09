// src/components/context/DrawingsContext.jsx

import React, { createContext, useContext, useState } from "react";
import {
  fetchDrawings,
  createDrawing,
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

  const addDrawing = async (drawingData) => {
    try {
      const newDrawing = await createDrawing(drawingData);
      setDrawings([...drawings, newDrawing]);
    } catch (err) {
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
