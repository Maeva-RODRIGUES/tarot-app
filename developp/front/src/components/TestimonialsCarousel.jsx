/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
// TestimonialsCarousel.jsx

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Text, Flex, Spinner } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchAllReviews } from "../api/reviewsApi"; // Importation de la fonction pour récupérer les commentaires

function TestimonialsCarousel() {
  const sliderRef = useRef(null); // Référence pour le slider
  const [testimonials, setTestimonials] = useState([]); // État pour stocker les témoignages
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Afficher les flèches de navigation
    autoplay: true, // Activer le défilement automatique
    autoplaySpeed: 5000, // Vitesse du défilement automatique (en millisecondes)
  };

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const fetchedReviews = await fetchAllReviews(); // Récupère tous les commentaires
        setTestimonials(fetchedReviews);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des témoignages:", error);
        setLoading(false);
      }
    };

    getTestimonials();
  }, []);

  return (
    <Box
      p={4}
      w={{ base: "100%", md: "75%", lg: "50%" }} // Largeur responsive
      ml={{ base: 0, md: "auto" }} // Marge à gauche responsive, centrée sur mobile
      mt={{ base: 4, md: 10, lg: 20 }} // Marge en haut responsive
    >
      {loading ? (
        <Spinner /> // Afficher un spinner pendant le chargement
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, index) => (
            <Box
              key={index} // Utiliser l'index comme clé (pas idéal, mais acceptable ici)
              onClick={() => sliderRef.current.slickNext()} // Passer au témoignage suivant au clic
            >
              <Text mt={2}>{testimonial.comment}</Text>{" "}
              {/* Affichage du commentaire */}
              <Flex mt={2}>
                {[...Array(5)].map((_, i) => (
                  <Box
                    as="span"
                    color={i < testimonial.rating ? "gold" : "gray"} // Couleur des étoiles en fonction de la note
                    key={i} // Clé pour chaque étoile
                  >
                    ★
                  </Box>
                ))}
              </Flex>
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
}

export default TestimonialsCarousel;
