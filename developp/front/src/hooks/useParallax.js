// useParallax.js

import { useScroll, useTransform } from "framer-motion";

export const useParallax = (inputRange, outputRange) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, inputRange, outputRange);
  return y;
};
