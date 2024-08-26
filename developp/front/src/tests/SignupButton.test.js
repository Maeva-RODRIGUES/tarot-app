// SignupButton.test.js : Test d'affichage conditionnel  

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPopup from '../components/SignupPopup'; // Assurez-vous de remplacer le chemin par le bon
import { createUser } from '../api/usersApi';

// Mock de l'API createUser
jest.mock('../api/usersApi', () => ({
  createUser: jest.fn(),
}));

describe('SignupPopup Button', () => {
  beforeEach(() => {
    createUser.mockReset();
  });

  it('doit afficher une erreur si les mots de passe ne correspondent pas', async () => {
    render(<SignupPopup />);

    // Saisir les informations d'inscription
    fireEvent.change(screen.getByPlaceholderText(/Votre prénom/i), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre nom/i), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre email/i), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre mot de passe/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirmez votre mot de passe/i), { target: { value: 'password456' } });

    // Cliquer sur le bouton d'inscription
    fireEvent.click(screen.getByText(/S'inscrire/i));

    // Vérifier que le toast d'erreur est affiché
    await waitFor(() => {
      expect(screen.getByText(/Les mots de passe ne correspondent pas/i)).toBeInTheDocument();
    });
  });

  it('doit afficher un message de succès après une inscription réussie', async () => {
    createUser.mockResolvedValueOnce({ message: 'Utilisateur créé avec succès' });

    render(<SignupPopup />);

    // Saisir les informations d'inscription
    fireEvent.change(screen.getByPlaceholderText(/Votre prénom/i), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre nom/i), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre email/i), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre mot de passe/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirmez votre mot de passe/i), { target: { value: 'password123' } });

    // Cliquer sur le bouton d'inscription
    fireEvent.click(screen.getByText(/S'inscrire/i));

    // Vérifier que le toast de succès est affiché
    await waitFor(() => {
      expect(screen.getByText(/Votre compte a été créé avec succès/i)).toBeInTheDocument();
    });
  });

  it('doit afficher un message d\'erreur en cas d\'échec de l\'inscription', async () => {
    createUser.mockRejectedValueOnce(new Error('Erreur lors de la création de l\'utilisateur'));

    render(<SignupPopup />);

    // Saisir les informations d'inscription
    fireEvent.change(screen.getByPlaceholderText(/Votre prénom/i), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre nom/i), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre email/i), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre mot de passe/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirmez votre mot de passe/i), { target: { value: 'password123' } });

    // Cliquer sur le bouton d'inscription
    fireEvent.click(screen.getByText(/S'inscrire/i));

    // Vérifier que le toast d'erreur est affiché
    await waitFor(() => {
      expect(screen.getByText(/Une erreur est survenue lors de la création de votre compte/i)).toBeInTheDocument();
    });
  });
});
