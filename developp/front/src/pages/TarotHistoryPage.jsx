// TarotHistoryPage.jsx : Historique des tirages de tarot de l'utilisateur

import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { FaUser, FaRegFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { mockTarotDrawings } from '../utils/mockData';
import Header from '../components/HeaderDashboard';
import Footer from '../components/Footer';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

function TarotHistoryPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige vers la page d'accueil après la déconnexion
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />

      <Flex
        as="nav"
        p="4"
        bg="customBlue"
        color="white"
        direction="column"
        height="calc(100vh - 60px)"
        width="250px"
        position="fixed"
        top="100px"
        left="0"
        boxShadow="md"
      >
        <VStack align="start" spacing="4" w="full">
          <RouterLink to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
            <HStack>
              <Icon as={FaUser} />
              <Text>Mon profil</Text>
            </HStack>
          </RouterLink>
          <RouterLink to="/drawingsstory" style={{ textDecoration: 'none', color: 'white' }}>
            <HStack>
              <Icon as={FaRegFileAlt} />
              <Text>Mes tirages</Text>
            </HStack>
          </RouterLink>
          <RouterLink to="/settings" style={{ textDecoration: 'none', color: 'white' }}>
            <HStack>
              <Icon as={FaCog} />
              <Text>Paramètres</Text>
            </HStack>
          </RouterLink>

          <Spacer />

          <Button
            onClick={handleLogout}
            variant="link"
            color="white"
            _hover={{ textDecoration: 'none', color: 'blue.400' }}
          >
            <HStack>
              <Icon as={FaSignOutAlt} />
              <Text>Déconnexion</Text>
            </HStack>
          </Button>
        </VStack>
      </Flex>

      <Box ml="250px" p="8" pt="8" flex="1">
        <Heading mb="4">Historique des Tirages de Tarot</Heading>
        {mockTarotDrawings.map((draw, index) => (
          <Box
            key={index}
            mb="8"
            p="4"
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
            bg="white"
            boxShadow="md"
          >
            <Heading size="md" mb="4">Tirage {index + 1}</Heading>
            <Text fontSize="lg" mb="4" fontWeight="bold">Thème : {draw.theme}</Text>
            <VStack spacing="4" align="start">
              {draw.cards.map((card, cardIndex) => (
                <Box key={cardIndex} mb="4">
                  <Image src={card.image} alt={`Card ${cardIndex + 1}`} boxSize="100px" objectFit="contain" mb="2" />
                  <Text fontSize="md">{card.interpretation}</Text>
                </Box>
              ))}
              <Box mt="4">
                <Heading size="sm">Interprétation Générale :</Heading>
                <Text fontSize="md" mt="2">{draw.generalInterpretation}</Text>
              </Box>
            </VStack>
          </Box>
        ))}
      </Box>

      <Footer />
    </Box>
  );
}

export default TarotHistoryPage;

