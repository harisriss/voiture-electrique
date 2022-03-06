import { Badge, Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';


let CarTile = ({ marque, modele, autonomy, image, power, fastCharge, recharge }) => {

///////////////////////////////
////////// RENDU JSX //////////
///////////////////////////////

  return (
    <Flex p={50} w='lg'>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW='3xs'
        borderWidth='2px'
        rounded='lg'
        shadow='lg'
        position='relative'
      >
        <Image
          src={image}
          alt={`Picture of ${modele}`}
          roundedTop='lg'
        />

        {fastCharge ?
          <Badge rounded='full' mx='4' mb='1' mt='4' px='2' fontSize='0.8em' colorScheme='green'>
            Charge rapide
          </Badge>
          :
          <Badge rounded='full' mx='4' mb='1' mt='4' px='2' fontSize='0.8em' colorScheme='red'>
            Pas de charge rapide
          </Badge>
        }
        <Box px='6' pb='6'>
          <Box d='flex' alignItems='baseline' fontSize='xs'>
            {autonomy}km - {power}cv - {recharge >= 60 ? recharge / 60 : 0}h{recharge % 60 == 0 ? '' : recharge % 60}
          </Box>
          <Flex mt='1' justifyContent='space-between' alignContent='center' flexDir='column'>
            <Box
              fontSize='xl'
              fontWeight='semibold'
              lineHeight='tight'
              isTruncated>
              <Box as='span' color={'gray.600'} fontSize='medium' mr={1}>
                Marque :
              </Box>
              {marque}
            </Box>
            <Box fontSize='small'>
              <Box as='span' color={'gray.600'} mr={1}>
                Modele :
              </Box>
              {modele}
            </Box>
          </Flex>

        </Box>
      </Box>
    </Flex>
  );
};

export default CarTile;
