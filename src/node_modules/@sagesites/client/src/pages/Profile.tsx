import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { RootState, AppDispatch } from '../store';
import { updateProfile } from '../store/slices/authSlice';

interface FormData {
  displayName: string;
  email: string;
}

interface UpdateStatus {
  success: boolean;
  message: string | null;
}

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<FormData>({
    displayName: user?.displayName || '',
    email: user?.email || '',
  });
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({
    success: false,
    message: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateStatus({ success: false, message: null });

    try {
      await dispatch(updateProfile({ displayName: formData.displayName })).unwrap();
      setUpdateStatus({
        success: true,
        message: 'Profile updated successfully!',
      });
    } catch (err) {
      setUpdateStatus({
        success: false,
        message: err instanceof Error ? err.message : 'Failed to update profile',
      });
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container>
        <Alert severity="error">Please log in to view your profile.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Profile
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              {updateStatus.message && (
                <Alert
                  severity={updateStatus.success ? 'success' : 'error'}
                  sx={{ mb: 2 }}
                >
                  {updateStatus.message}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="displayName"
                  label="Display Name"
                  value={formData.displayName}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  helperText="Email cannot be changed"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Game Statistics
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  Games Played: {user.gamesPlayed || 0}
                </Typography>
                <Typography variant="body1">
                  Correct Guesses: {user.correctGuesses || 0}
                </Typography>
                <Typography variant="body1">
                  Accuracy:{' '}
                  {user.gamesPlayed
                    ? Math.round((user.correctGuesses || 0) / user.gamesPlayed * 100)
                    : 0}
                  %
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile; 