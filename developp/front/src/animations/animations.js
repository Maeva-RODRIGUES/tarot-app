/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
// src/animations/animations.js
import anime from 'animejs';

// Mélange de cartes
export const shuffleAnimation = (cards) => {
    anime({
        targets: cards,
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        rotate: () => anime.random(-180, 180),
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => regroupCards(cards) // Regroupement après mélange
    });
};

// Coupe de cartes
export const cutAnimation = (cards) => {
    const half = Math.floor(cards.length / 2);

    console.log('Cards:', cards);  // Vérifie ce que contient 'cards'
    console.log('Left cards:', cards.slice(0, half));  // Vérifie les cartes de gauche
    console.log('Right cards:', cards.slice(half));  // Vérifie les cartes de droite

    anime({
        targets: cards.slice(0, half),
        translateX: -300, // Déplacement plus marqué
        duration: 1000,
        easing: 'easeInOutQuad'
    });

    anime({
        targets: cards.slice(half),
        translateX: 300, // Déplacement plus marqué
        duration: 1000,
        easing: 'easeInOutQuad'
    });

    setTimeout(() => {
        regroupCards(cards);
    }, 1200);
};

const regroupCards = (cards) => {
    anime({
        targets: cards,
        translateX: 0,
        translateY: 0,
        rotate: 0,
        duration: 800,
        easing: 'easeInOutQuad'
    });
};
