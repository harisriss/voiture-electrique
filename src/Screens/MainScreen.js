import { ChakraProvider, theme } from '@chakra-ui/react';
import Header from '../Components/Header';
import CarList from '../Components/CarList';
import Footer from '../Components/Footer';
import React from 'react';

const MainScreen = () => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <CarList />
      <Footer />
    </ChakraProvider>
  );
};

export default MainScreen;
