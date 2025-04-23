import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Location {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
}

export interface GameSession {
  id: string;
  currentLocation: Location;
  score: number;
  hintsUsed: number;
  guessesRemaining: number;
  status: 'active' | 'completed';
}

interface GameState {
  currentSession: GameSession | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  currentSession: null,
  loading: false,
  error: null,
};

export const startNewGame = createAsyncThunk(
  'game/startNew',
  async () => {
    const response = await api.post('/api/games');
    return response.data.data;
  }
);

export const getGameSession = createAsyncThunk(
  'game/getSession',
  async (gameId: string) => {
    const response = await api.get(`/api/games/${gameId}`);
    return response.data.data;
  }
);

export const submitGuess = createAsyncThunk(
  'game/submitGuess',
  async ({ gameId, guess }: { gameId: string; guess: { latitude: number; longitude: number } }) => {
    const response = await api.post(`/api/games/${gameId}/guesses`, guess);
    return response.data.data;
  }
);

export const requestHint = createAsyncThunk(
  'game/requestHint',
  async (gameId: string) => {
    const response = await api.get(`/api/games/${gameId}/hints`);
    return response.data.data;
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startNewGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startNewGame.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(startNewGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to start new game';
      })
      .addCase(getGameSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGameSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(getGameSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch game session';
      })
      .addCase(submitGuess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitGuess.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(submitGuess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to submit guess';
      })
      .addCase(requestHint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestHint.fulfilled, (state) => {
        state.loading = false;
        if (state.currentSession) {
          state.currentSession.hintsUsed += 1;
        }
      })
      .addCase(requestHint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get hint';
      });
  },
});

export default gameSlice.reducer; 