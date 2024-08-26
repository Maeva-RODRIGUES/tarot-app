// src/tests/TarotCard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import TarotCard from '../components/TarotCard';

test('affiche le dos de la carte par défaut', () => {
  render(<TarotCard card={{ name: 'The Fool', description: 'A new beginning' }} />);
  const backOfCard = screen.getByText('Back of card');
  expect(backOfCard).toBeInTheDocument();
});

test('affiche le nom et la description lorsque la carte est retournée', () => {
  render(<TarotCard card={{ name: 'The Fool', description: 'A new beginning' }} isFlipped />);
  const cardName = screen.getByText('The Fool');
  const cardDescription = screen.getByText('A new beginning');
  expect(cardName).toBeInTheDocument();
  expect(cardDescription).toBeInTheDocument();
});
