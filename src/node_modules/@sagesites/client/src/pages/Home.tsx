import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography
          variant="h1"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            fontWeight: 700,
          }}
        >
          Where Philosophy Meets Geography
        </Typography>
        <Typography
          variant="h2"
          align="center"
          color="text.secondary"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            mb: 6,
          }}
        >
          Explore the world's most significant philosophical landmarks
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Test Your Knowledge
              </Typography>
              <Typography align="center" paragraph>
                Challenge yourself by guessing the locations of important philosophical sites around the world.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/game')}
                sx={{ mt: 'auto' }}
              >
                Start Playing
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Learn Philosophy
              </Typography>
              <Typography align="center" paragraph>
                Discover the geographical context of philosophical ideas and how location influenced great thinkers.
              </Typography>
              {user ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/profile')}
                  sx={{ mt: 'auto' }}
                >
                  View Progress
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ mt: 'auto' }}
                >
                  Sign Up
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 