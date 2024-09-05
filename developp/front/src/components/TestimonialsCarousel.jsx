// TestimonialsCarousel.jsx

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Text, Flex, Spinner } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchAllReviews } from "../api/reviewsApi";

function TestimonialsCarousel() {
  const sliderRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const fetchedReviews = await fetchAllReviews();
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
    <Flex
      justify="center"
      align="center"
      w="100%"
      p={4}
      mt={{ base: 4, md: 10, lg: 20 }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Box w={{ base: "50%", md: "80%", lg: "400px" }} // Largeur ajustée pour mobile, tablette et desktop
        maxW="400px"  // Limite la largeur maximale du carrousel
        > 
          
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <Box
                key={index}
                onClick={() => sliderRef.current.slickNext()}
                textAlign="center" /* Centrer le contenu du texte */
              >
                <Text mt={2} fontSize={{ base: "sm", md: "md", lg: "lg" }}>{testimonial.comment}</Text>
                <Flex mt={2} justifyContent="center"> {/* Centrer les étoiles */}
                  {[...Array(5)].map((_, i) => (
                    <Box
                      as="span"
                      color={i < testimonial.rating ? "gold" : "gray"}
                      key={i}
                    >
                      ★
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Slider>
        </Box>
      )}
    </Flex>
  );
}

export default TestimonialsCarousel;
