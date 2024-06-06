import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const bikePumpStations = [
  { name: "Station 1", lat: 59.3293, lng: 18.0686 },
  { name: "Station 2", lat: 59.3326, lng: 18.0649 },
  // Add more stations as needed
];

const BikePumpMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapContainerDimensions, setMapContainerDimensions] = useState({ width: '100%', height: '80vh' });

  useEffect(() => {
    console.log("BikePumpMap component mounted");
    if (mapLoaded) {
      console.log("Map has loaded successfully");
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (mapInstance) {
      console.log("Map instance:", mapInstance);
      console.log("Map center:", mapInstance.getCenter());
      console.log("Map zoom level:", mapInstance.getZoom());
    }
  }, [mapInstance]);

  useEffect(() => {
    const mapContainer = document.querySelector('.leaflet-container');
    if (mapContainer) {
      console.log("Map container dimensions:", mapContainer.clientWidth, mapContainer.clientHeight);
      setMapContainerDimensions({ width: mapContainer.clientWidth, height: mapContainer.clientHeight });
    }
  }, []);

  useEffect(() => {
    if (mapInstance) {
      const handleMoveEnd = () => {
        console.log("Map center:", mapInstance.getCenter());
        console.log("Map zoom level:", mapInstance.getZoom());
      };
      mapInstance.on('moveend', handleMoveEnd);
      return () => {
        mapInstance.off('moveend', handleMoveEnd);
      };
    }
  }, [mapInstance]);

  useEffect(() => {
    if (mapError) {
      console.error("Map error:", mapError);
    }
  }, [mapError]);

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
      console.log("Map size invalidated");
    }, [map]);

    useMapEvent('resize', () => {
      map.invalidateSize();
      console.log("Map resized");
    });

    return null;
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        Bike Pump Stations in Stockholm
      </Heading>
      {mapError && (
        <Box color="red.500" textAlign="center" mt={4}>
          <Text>Failed to load the map. Please try again later.</Text>
        </Box>
      )}
      <Box style={{ height: '80vh', width: '100%' }}>
        <MapContainer
          center={[59.3293, 18.0686]}
          zoom={13}
          style={{ height: mapContainerDimensions.height, width: mapContainerDimensions.width }}
          whenCreated={(mapInstance) => {
            console.log("Map is being created");
            setMapLoaded(true);
            setMapInstance(mapInstance);
          }}
          whenReady={(mapInstance) => {
            console.log("Map is ready");
            setMapInstance(mapInstance);
          }}
          onError={(error) => {
            console.error("Map loading error:", error);
            setMapError(error);
          }}
        >
          <MapUpdater />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            onError={(error) => {
              console.error("TileLayer loading error:", error);
              setMapError(error);
            }}
          />
          {bikePumpStations.map((station, index) => (
            <Marker key={index} position={[station.lat, station.lng]}>
              <Popup>{station.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default BikePumpMap;