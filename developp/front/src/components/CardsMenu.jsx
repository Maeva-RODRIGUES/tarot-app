// CardsMenu.jsx

import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionBox = motion(Box);

function ImageRow() {
  return (
    <Box as="main" p={20}>
      <Flex justify="center" align="center">
        <Link to="/love">
          <MotionBox
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            m={2}
          >
            <Image src="/src/assets/icons/cardiconlove.png" alt="Love" boxSize="400px" objectFit="cover" />
          </MotionBox>
        </Link>
        <Link to="/work">
          <MotionBox
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            m={2}
          >
            <Image src="/src/assets/icons/cardiconwork.png" alt="Work" boxSize="400px" objectFit="cover" />
          </MotionBox>
        </Link>
        <Link to="/spirit">
          <MotionBox
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            m={2}
          >
            <Image src="/src/assets/icons/cardiconspirituel.png" alt="Spirit" boxSize="400px" objectFit="cover" />
          </MotionBox>
        </Link>
      </Flex>
    </Box>
  );
}

export default ImageRow;
