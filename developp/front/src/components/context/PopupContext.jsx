// PopupContext.jsx

import React, { createContext, useState, useContext } from 'react';

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [popupType, setPopupType] = useState(null);

  // Ouvrir un popup spécifique en fonction du type
  const openPopup = (type) => setPopupType(type);
  // Fermer le popup actuellement ouvert
  const closePopup = () => setPopupType(null);

  return (
    <PopupContext.Provider value={{ popupType, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  return useContext(PopupContext);
}

