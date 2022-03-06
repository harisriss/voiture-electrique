import '../Styles/Header.scss';
import { Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

///////////////////////////////
////////// RENDU JSX //////////
///////////////////////////////

  return (
    <Heading className='head' minW='515px'>
      <Flex
        padding={6}
        bg={colorMode === 'dark' ? '#151923FF' : '#fafafa'}
        color={colorMode === 'dark' ? 'white' : 'black'}
        justify='space-between'>

        <Flex align='center' mr={5}>
          <Heading as='h1' size='lg' letterSpacing={'tighter'}>
            TP INFO802
          </Heading>
        </Flex>
        <IconButton
          type='link'
          icon={colorMode === 'dark' ? <SunIcon color='white' /> : <MoonIcon color='black' />}
          onClick={toggleColorMode}>
        </IconButton>
      </Flex>
    </Heading>
  );
};

export default Header;
