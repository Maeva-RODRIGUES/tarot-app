// DashboardUserPage.test.js : Test de scénario d'erreur

import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardUserPage from '../pages/DashboardUserPage'; // Remplace par le chemin correct
import { useAuth } from '../components/context/AuthContext';

// Mock du contexte d'authentification pour fournir un utilisateur connecté
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('DashboardUserPage', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: {
        id: 1,
        name: 'Jean',
        surname: 'Dupont',
        email: 'jean.dupont@example.com',
        role: { role_name: 'User' },
      },
      isAuthenticated: true,
    });
  });

  it('doit afficher les informations de l\'utilisateur connecté', () => {
    render(<DashboardUserPage />);
    
    // Vérifier que le nom de l'utilisateur est affiché
    expect(screen.getByText(/Jean Dupont/i)).toBeInTheDocument();
    
    // Vérifier que l'adresse email est affichée
    expect(screen.getByText(/jean.dupont@example.com/i)).toBeInTheDocument();
  });

  it('doit afficher les options spécifiques à l\'utilisateur', () => {
    render(<DashboardUserPage />);
    
    // Vérifier que certaines options spécifiques à l'utilisateur sont présentes
    expect(screen.getByText(/Mon profil/i)).toBeInTheDocument();
    expect(screen.getByText(/Mes tirages/i)).toBeInTheDocument();
  });

  it('doit rediriger si l\'utilisateur n\'est pas authentifié', () => {
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
    });

    render(<DashboardUserPage />);
    
    // Vérifier que la page de connexion ou un message d'erreur est affiché
    expect(screen.getByText(/Veuillez vous connecter/i)).toBeInTheDocument();
  });
});
