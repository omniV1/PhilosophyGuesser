import { useState, useEffect } from 'react';
import MapComponent from './Map';
import { Box, Button, Typography, Paper } from '@mui/material';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
}

export default function Game() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Fetch locations from your API
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        if (data.data?.locations) {
          setLocations(data.data.locations);
        }
      })
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  const startGame = () => {
    if (locations.length > 0) {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      setCurrentLocation(randomLocation);
      setGameStarted(true);
    }
  };

  const handleLocationSelect = (selectedLocation: { latitude: number; longitude: number; name: string }) => {
    if (!currentLocation || !gameStarted) return;

    // Calculate distance between selected point and actual location
    const distance = calculateDistance(
      selectedLocation.latitude,
      selectedLocation.longitude,
      currentLocation.latitude,
      currentLocation.longitude
    );

    // Show result (you can implement this however you want)
    alert(`Distance from correct location: ${Math.round(distance)} km`);
    setGameStarted(false);
  };

  return (
    <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Philosophy Location Guesser
        </Typography>
        {!gameStarted ? (
          <Button variant="contained" onClick={startGame} disabled={locations.length === 0}>
            Start New Game
          </Button>
        ) : (
          <Typography variant="h6">
            Where was {currentLocation?.name} located?
          </Typography>
        )}
      </Paper>
      <MapComponent 
        locations={gameStarted ? [] : locations} 
        onLocationSelect={handleLocationSelect}
      />
    </Box>
  );
}

// Haversine formula to calculate distance between two points on Earth
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
} 