import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rockets: [],
  isLoading: false,
  error: null,
};

export const getRockets = createAsyncThunk('rockets/getRockets', async () => {
  const response = await axios.get('https://api.spacexdata.com/v3/rockets');
  return response.data.map((rocket) => ({
    id: rocket.id,
    rocket_name: rocket.rocket_name,
    description: rocket.description,
    flickr_images: rocket.flickr_images,
  }));
});

export const reserveRocket = createAsyncThunk('rockets/reserveRocket', async (rocketId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return rocketId;
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRockets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRockets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.rockets = action.payload;
      })
      .addCase(getRockets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(reserveRocket.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reserveRocket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const reservedRocketId = action.payload;
        state.rockets = state.rockets.map((rocket) => {
          if (rocket.id !== reservedRocketId) {
            return rocket;
          }
          return { ...rocket, reserved: true };
        });
      })
      .addCase(reserveRocket.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default rocketsSlice.reducer;