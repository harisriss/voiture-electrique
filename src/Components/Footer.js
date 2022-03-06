import '../Styles/Footer.scss';
import { Box, useColorMode } from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/fr';

import React from 'react';

moment.locale('fr');

let Footer = () => {

  const { colorMode } = useColorMode();

///////////////////////////////
////////// RENDU JSX //////////
///////////////////////////////
  return (

    <Box className='main'
         bg={colorMode === 'dark' ? '#151923' : '#fafafa'}
         color={colorMode === 'dark' ? 'white' : 'black'}>

      <Box className='author-box'>
        <Box className='blaze' style={{ paddingLeft: 40 }}>

          <Box style={{ fontWeight: 300 }}>
            Auteur :
          </Box>

          <Box ml={1}>
            <a href='https://github.com/harisriss'>
              <Box style={{ display: 'flex', flexDir: 'row' }}>
                <Box>Haris</Box>
                <Box style={{ fontWeight: 900, marginLeft: 5 }}>COLICHE</Box>
              </Box>
            </a>
          </Box>
        </Box>


      </Box>

      <Box className='loris-box'>
        <Box fontSize='md'>
          {colorMode === 'light' ?
            <Box className='loris'>
              <Box style={{ fontWeight: 300 }}>Le thème claire est uniquement pour </Box>
              <Box className='loris-blaze' pl={1}> Loris</Box>
            </Box> : ''}
        </Box>
      </Box>


      <Box className='date'
           pr={10}
           direction={{ base: 'column', md: 'row' }}
           spacing={4}
           justify={{ base: 'center', md: 'space-between' }}
           align={{ base: 'center', md: 'center' }}>

        <Box style={{ fontWeight: 700 }}>
          Information inutile :
        </Box>

        <Box style={{ marginLeft: 4, fontWeight: 300 }}>
          Nous sommes le {moment().format('LL')}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;


