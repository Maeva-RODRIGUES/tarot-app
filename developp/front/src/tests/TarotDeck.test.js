// TarotDeck.test.js : Test de rendu du composant  

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TarotDeck from '../TarotDeck';
import useCards from '../../src/hooks/useCards';
import useTarotDeck from '../../src/hooks/useTarotDeck';
import { fetchThemes } from '../../src/api/themesApi';

// Mock des hooks personnalisés
jest.mock('../../hooks/useCards');
jest.mock('../../hooks/useTarotDeck');
jest.mock('../../api/themesApi');

describe('TarotDeck', () => {
  const mockCards = [
    { id: 1, keyword1: 'Courage', keyword2: 'Force', keyword3: 'Confiance' },
    { id: 2, keyword1: 'Amour', keyword2: 'Relation', keyword3: 'Union' },
    { id: 3, keyword1: 'Équilibre', keyword2: 'Harmonie', keyword3: 'Paix' },
  ];

  beforeEach(() => {
    useCards.mockReturnValue({
      cards: mockCards,
      isLoading: false,
      isError: false,
      error: null,
    });

    useTarotDeck.mockReturnValue({
      shuffleCards: jest.fn(),
      backImage: 'backImage.png',
    });
  });

  it('doit afficher un bouton de mélange au début', () => {
    render(<TarotDeck theme="love" onDrawComplete={jest.fn()} />);
    expect(screen.getByText(/Mélangez/i)).toBeInTheDocument();
  });

  it('doit afficher les cartes après avoir cliqué sur "Mélangez"', async () => {
    render(<TarotDeck theme="love" onDrawComplete={jest.fn()} />);

    fireEvent.click(screen.getByText(/Mélangez/i));

    await waitFor(() => {
      expect(screen.queryByText(/Mélangez/i)).not.toBeInTheDocument();
    });

    const cards = screen.getAllByText(/Courage|Amour|Équilibre/i);
    expect(cards.length).toBe(3);
  });

  it('doit permettre à l\'utilisateur de sélectionner trois cartes', async () => {
    render(<TarotDeck theme="love" onDrawComplete={jest.fn()} />);

    fireEvent.click(screen.getByText(/Mélangez/i));

    await waitFor(() => {
      const firstCard = screen.getByText(/Courage/i);
      fireEvent.click(firstCard);
      fireEvent.click(firstCard); // On essaie de cliquer deux fois pour vérifier que la carte ne peut être sélectionnée qu'une seule fois
      expect(firstCard).toBeInTheDocument();
    });

    expect(screen.getByText(/Équilibre/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Équilibre/i));

    expect(screen.getByText(/Amour/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Amour/i));

    expect(screen.queryByText(/Amour/i)).toBeInTheDocument();
  });

  it('doit afficher une interprétation après la sélection de trois cartes', async () => {
    const mockThemeInterpretation = 'Votre relation sera équilibrée et harmonieuse.';

    fetchThemes.mockResolvedValueOnce([
      {
        id: 1,
        title_theme: 'Amour',
        meaning_theme: JSON.stringify([mockThemeInterpretation]),
      },
    ]);

    const onDrawComplete = jest.fn();

    render(<TarotDeck theme="love" onDrawComplete={onDrawComplete} />);

    fireEvent.click(screen.getByText(/Mélangez/i));

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Courage/i));
      fireEvent.click(screen.getByText(/Amour/i));
      fireEvent.click(screen.getByText(/Équilibre/i));
    });

    await waitFor(() => {
      expect(screen.getByText(/VOTRE AVENIR EN DÉTAIL/i)).toBeInTheDocument();
      expect(screen.getByText(mockThemeInterpretation)).toBeInTheDocument();
    });

    expect(onDrawComplete).toHaveBeenCalledWith(
      expect.arrayContaining([mockCards[0], mockCards[1], mockCards[2]]),
      mockThemeInterpretation,
    );
  });

  it('doit afficher un message d\'erreur en cas d\'erreur de chargement des cartes', () => {
    useCards.mockReturnValue({
      cards: [],
      isLoading: false,
      isError: true,
      error: { message: 'Erreur lors du chargement des cartes' },
    });

    render(<TarotDeck theme="love" onDrawComplete={jest.fn()} />);

    expect(screen.getByText(/Erreur: Erreur lors du chargement des cartes/i)).toBeInTheDocument();
  });
});
