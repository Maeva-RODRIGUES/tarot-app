// CardList.jsx

import React from 'react';
import TarotCard from './TarotCard';

const CardList = ({ cards }) => {
  return (
    <div>
      <h2>Liste des Cartes</h2>
      <ul>
        {cards.map(card => (
          <TarotCard
            key={card.id}
            card={card}
            frontColor="white"
            backImage="/path/to/back-image.jpg"
            height="200px"
            width="150px"
            isFlipped={true} // Changez cette valeur en fonction de votre logique
            animateProps={{ rotateY: 180 }} // Exemple d'animation
          />
        ))}
      </ul>
    </div>
  );
};

export default CardList;
