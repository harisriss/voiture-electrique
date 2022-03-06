import '../Styles/CarList.scss';
import { useCallback, useEffect, useState } from 'react';
import { Box, Button, HStack, Input, InputGroup, Select, Text } from '@chakra-ui/react';
import CarTile from './CarTile';
import Map from './Map';


const CarList = () => {


  /**
   * permet de mettre a jour  l'affichage en fonction des données récuperées par les appels API
   */
  const [cars, setCars] = useState([]);
  const [bornes, setBornes] = useState([]);
  const [travelDataDistance, setTravelDataDistance] = useState(0);
  const [travelDataDuration, setTravelDataDuartion] = useState(0);

  const [selectedValue, setSelectedValue] = useState(-1);
  const [latitudeBorne, setLatitudeBorne] = useState(45.564601);
  const [longitudeBorne, setLongitudeBorne] = useState(5.917781);


  let heureTempsREST = Math.round(travelDataDuration / 3600);
  let minuteTempsREST = Math.round(travelDataDuration % 60);
  let distanceKM = Math.round(travelDataDistance);
  distanceKM /= 1000;


  /**
   *  recupère les données du service SOAP et les formate en JSON
   */
  const fetchDataSOAP = () => {
    fetch('https://client-js.herokuapp.com/')
      .then(res => {
        return res.json();
      })
      .then(data => setCars(data));
  };
  /**
   * recupère les données de l'API REST qui fournit un emplacement de prise de rechargement et les formate en JSON
   */
  const fetchCoordsBornes = () => {
    fetch(`https://opendata.reseaux-energies.fr/api/records/1.0/search/?dataset=bornes-irve&q=&sort=-dist&facet=region&geofilter.distance=${latitudeBorne}%2C${longitudeBorne}%2C+8000`)
      .then(res => res.json())
      .then((data) => {
        console.log(latitudeBorne);
        console.log(longitudeBorne);
        setBornes(data.records);
        console.log(data.records);

      });
  };

  /**
   *  recupère les données du service REST et les formate en JSON
   */
  const fetchDataREST = () => {
    fetch('http://localhost:3079')
      .then(res => {
        return res.json();
      })
      .then((data) => {
        setTravelDataDuartion(data.duration);
        setTravelDataDistance(data.distance);
        alert('Mon API REST renvoie la distance et le temps entre 2 coordonnées fixes (celles de Chambéry et celles de Lyon rentrées en dure dans mon service REST');
      });

  };


  /**
   * appel la fonction qui effectue l'appel API (fetchDataSOAP)
   */
  useEffect(() => {
    fetchCoordsBornes();
    fetchDataSOAP();
  }, []);


  /**
   * recupere la valeur de l'element selectionner dans le dropdown
   * @param e
   */
  const handleChange = useCallback((e) => {
    setSelectedValue(Number(e.target.value));
  }, []);


///////////////////////////////
////////// RENDU JSX //////////
///////////////////////////////

  return (
    <Box>
      <Select
        m={3}
        maxW={487}
        placeholder='Veuillez selectionner un bolide'
        minW={4}
        onChange={handleChange}
        focusBorderColor='none'
      >

        {cars && cars.map((element, key) => {
          return <option key={key} value={element.id}>{element.marque} {element.modele}</option>;
        })}

      </Select>


      <div className='carInfo'>
        {cars && cars.map((element, key) => {
          if (key === selectedValue) {
            return (
              <Box>
                <CarTile
                  marque={element.marque}
                  modele={element.modele}
                  autonomy={element.autonomie}
                  power={element.puissance}
                  image={element.image}
                  fastCharge={element.fastCharge}
                  recharge={element.recharge} />
              </Box>
            );
          }
        })}
      </div>

      <Box className='borne-div'>
        <HStack spacing={4} m={3}>

          <InputGroup variant='filled' maxWidth={235}>
            <Input type='number' max='0' placeholder='Latitude' focusBorderColor='none'
                   onChange={(e) => {
                     setLatitudeBorne(e.target.value);
                     console.log(e.target.value);
                   }} />
          </InputGroup>

          <InputGroup variant='filled' maxWidth={235}>
            <Input type='number' placeholder='Longitude' focusBorderColor='none'
                   onChange={(e) => {
                     setLongitudeBorne(e.target.value);
                     console.log(e.target.value);
                   }} />
          </InputGroup>
          <Button onClick={() => fetchCoordsBornes()}>Trouver une borne !</Button>

        </HStack>

      </Box>

      <Map bornes={bornes} lat={latitudeBorne} lon={longitudeBorne} />
      <Button m={3} onClick={() => fetchDataREST()}>Test API REST</Button>
      {heureTempsREST || distanceKM !== 0 ?
        <Box mb={5}>
          <Text mx={3}>
            temps : {heureTempsREST}h{minuteTempsREST}
          </Text>
          <Text mx={3}>
            distance : {distanceKM} km
          </Text>
        </Box> :
        <Text> </Text>}


    </Box>
  );
};
export default CarList;


