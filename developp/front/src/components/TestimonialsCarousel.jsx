// TestimonialsCarousel.jsx

import React, { useRef } from "react";
import Slider from "react-slick";
import { Box, Text, Flex } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialsCarousel() {
  const sliderRef = useRef(null);

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

  const testimonials = [
    {
      text: "Review 1 : Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
      rating: 5,
    },
    {
      text: "Review 2 :Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
      rating: 5,
    },
    {
      text: "Review 3 : Lorem Ipsum Dolor Sit Amet.",
      rating: 5,
    },
  ];

  return (
    <Box p={4} w="50%" ml="260" mt="100">
      {" "}
      {/* Ajustement de la largeur et centrage */}
      <Slider ref={sliderRef} {...settings}>
        {testimonials.map((testimonial, index) => (
          <Box key={index} onClick={() => sliderRef.current.slickNext()}>
            <Text mt={2}>{testimonial.text}</Text>
            <Flex mt={2}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <Box as="span" color="gold" key={i}>
                  ★
                </Box>
              ))}
            </Flex>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default TestimonialsCarousel;
