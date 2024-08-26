// src/tests/SignupPopup.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignupPopup from '../components/SignupPopup'; // Mettez à jour le chemin si nécessaire
import { PopupProvider } from '../components/context/PopupContext'; // Assurez-vous d'inclure le provider du contexte
import '@testing-library/jest-dom/extend-expect'; // Pour les matchers étendus de Jest

// Mock de la fonction createUser pour éviter les appels réels à l'API
jest.mock('../api/usersApi', () => ({
  createUser: jest.fn(),
}));

test("affiche les champs du formulaire d'inscription", () => {
  // Rendre le composant avec le contexte de popup
  render(
    <PopupProvider>
      <SignupPopup />
    </PopupProvider>
  );

  // Assumer que la popup est ouverte
  const openButton = screen.getByText(/s'inscrire/i);
  fireEvent.click(openButton);

  // Vérifier la présence de chaque champ
  expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/ville de naissance/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/heure de naissance/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/confirmation du mot de passe/i)).toBeInTheDocument();
});

test("affiche une erreur si les mots de passe ne correspondent pas", () => {
  // Rendre le composant avec le contexte de popup
  render(
    <PopupProvider>
      <SignupPopup />
    </PopupProvider>
  );

  // Assumer que la popup est ouverte
  const openButton = screen.getByText(/s'inscrire/i);
  fireEvent.click(openButton);

  // Remplir les champs du formulaire
  fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/prénom/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByLabelText(/date de naissance/i), { target: { value: '1990-01-01' } });
  fireEvent.change(screen.getByLabelText(/ville de naissance/i), { target: { value: 'Paris' } });
  fireEvent.change(screen.getByLabelText(/heure de naissance/i), { target: { value: '12:00' } });
  fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText(/confirmation du mot de passe/i), { target: { value: 'differentpassword' } });

  // Soumettre le formulaire
  fireEvent.click(screen.getByText(/s'inscrire/i));

  // Vérifier l'apparition du message d'erreur
  expect(screen.getByText(/les mots de passe ne correspondent pas/i)).toBeInTheDocument();
});
