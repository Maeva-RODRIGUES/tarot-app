// Header.test.js : Test de rendu d'un composant

import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  it('devrait rendre le titre correctement', () => {
    render(<Header />);
    const titleElement = screen.getByText(/La Roue du Destin/i);
    expect(titleElement).toBeInTheDocument();
  });
});
