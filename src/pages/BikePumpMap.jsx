import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';

const bikePumpStations = [
  { name: "Station 1", lat: 59.3293, lng: 18.0686 },
  { name: "Station 2", lat: 59.3326, lng: 18.0649 },
  // Add more stations as needed
];

const BikePumpMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    console.log("BikePumpMap component mounted");
    if (mapLoaded) {
      console.log("Map has loaded successfully");
    }
  }, [mapLoaded]);

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
      <MapContainer
        center={[59.3293, 18.0686]}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
        whenCreated={() => {
          console.log("Map is being created");
          setMapLoaded(true);
        }}
      >
        <MapUpdater />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {bikePumpStations.map((station, index) => (
          <Marker key={index} position={[station.lat, station.lng]}>
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default BikePumpMap;