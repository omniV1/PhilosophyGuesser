import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Alert,
} from '@mui/material';
import { AppDispatch, RootState } from '../store';
import {
  startNewGame,
  getGameSession,
  submitGuess,
  requestHint,
} from '../store/slices/gameSlice';
import type { GameSession } from '../store/slices/gameSlice';
import MapComponent from '../components/Map';
import Navbar from '../components/Navbar';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
}

const Game = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  const { currentSession, loading, error } = useSelector((state: RootState) => state.game as {
    currentSession: GameSession | null;
    loading: boolean;
    error: string | null;
  });
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameId) {
      dispatch(getGameSession(gameId));
    } else {
      dispatch(startNewGame());
    }
  }, [dispatch, gameId]);

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

  const handleLocationSelect = (selectedLocation: Location) => {
    if (!currentLocation || !gameStarted) return;

    // Calculate distance between selected point and actual location
    const distance = calculateDistance(
      selectedLocation.latitude,
      selectedLocation.longitude,
      currentLocation.latitude,
      currentLocation.longitude
    );

    // Calculate score (max 1000 points, decreasing with distance)
    const newScore = Math.max(0, Math.round(1000 * Math.exp(-distance / 1000)));
    setScore(prevScore => prevScore + newScore);

    // Show result
    alert(`Distance: ${Math.round(distance)} km\nPoints earned: ${newScore}`);
    setGameStarted(false);
  };

  const startGame = () => {
    if (locations.length > 0) {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      setCurrentLocation(randomLocation);
      setGameStarted(true);
    }
  };

  const handleSubmitGuess = async () => {
    if (!currentSession || !selectedLocation) return;

    try {
      await dispatch(submitGuess({
        gameId: currentSession.id,
        guess: selectedLocation,
      })).unwrap();
      setSelectedLocation(null);
    } catch (err) {
      // Error is handled by the slice
    }
  };

  const handleRequestHint = async () => {
    if (!currentSession) return;

    try {
      await dispatch(requestHint(currentSession.id)).unwrap();
    } catch (err) {
      // Error is handled by the slice
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!currentSession) {
    return (
      <Container maxWidth="sm">
        <Box mt={4}>
          <Alert severity="error">
            {error || 'Failed to load game session'}
          </Alert>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Return Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Philosophy Location Guesser
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                {!gameStarted ? (
                  <Button variant="contained" onClick={startGame} disabled={locations.length === 0}>
                    {locations.length === 0 ? 'Loading...' : 'Start New Round'}
                  </Button>
                ) : (
                  <Typography variant="h6">
                    Where was {currentLocation?.name} located?
                  </Typography>
                )}
              </Box>
              <Typography variant="h6">
                Score: {score}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <MapComponent 
              locations={gameStarted ? [] : locations} 
              onLocationSelect={handleLocationSelect}
            />
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Game;

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