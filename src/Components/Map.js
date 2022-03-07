import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { Component } from 'react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

mapboxgl.accessToken = 'pk.eyJ1IjoibWVpbGxldXJzYmllbnNpbW1vIiwiYSI6ImNrYnJva3N0OTJ5NnMyeWw5czEyNGF4cWkifQ.5PHBkbj4G7DEnSLN221TJA';

export default class Map extends Component {

  map;

  /**
   * initialise le component au moment du chargement de la page
   */
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [5.917781, 45.564601],
      zoom: 12,
      attributionControl: false,
      paint: {
        'text-color': '#000',
      },
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      interactive: false,
      language: 'fr',

    });

    directions.on('destination ', (e) => {
      console.log('destination', e);
    });

    this.map.addControl(directions, 'top-right');
  }

  /**
   * mets à jour le component lorsque les coordonnées changent
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.bornes !== this.props.bornes) {
      for (let i in this.props.bornes) {
        let borne = this.props.bornes[i];
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el).setLngLat(borne.geometry.coordinates).addTo(this.map);
      }
    }

    if (prevProps.bornes.lat !== this.props.lat || prevProps.bornes.lon !== this.props.lon) {
      this.map.setCenter([this.props.lon, this.props.lat]);
    }
  }

///////////////////////////////
////////// RENDU JSX //////////
///////////////////////////////

  render() {
    return (
      <>
        <div
          ref={el => (this.mapWrapper = el)}
          className='mapWrapper'
        />
        <Box ml={3} mt={3} style={{ display: 'flex', flexDir: 'row' }}>
          <Box>
            <Box>Il y a {this.props.bornes.length} bornes dans un rayon de 8km autour de
              vous</Box>
          </Box>
          <Box color={'gray.500'} ml={3} style={{ display: 'flex', flexDir: 'row', alignItems: 'center' }}
               fontSize={11}>
            <WarningTwoIcon />
            <Box style={{ padding: 5 }}>(Si il n'y a pas autant de marker que de borne, c'est qu'il a
              plusieurs bornes au même endroit)</Box>
          </Box>
        </Box>
      </>
    );
  }
}
