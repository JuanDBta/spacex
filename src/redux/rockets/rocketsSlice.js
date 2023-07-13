import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  rockets: [
    {
      id: 'example-id-1',
      rocket_name: 'Rocket 1',
      description: 'Rocket 1 description',
      flickr_images: ['image1.jpg'],
      isReserved: false,
    },
    {
      id: 'example-id-2',
      rocket_name: 'Rocket 2',
      description: 'Rocket 2 description',
      flickr_images: ['image2.jpg'],
      isReserved: false,
    },
  ],
  isLoading: false,
  error: null,
};

export const getRockets = createAsyncThunk('rockets/getRockets', async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/rockets');
    if (!response.ok) {
      throw new Error('Failed to fetch rockets');
    }
    const data = await response.json();
    return data.map((rocket) => ({
      id: rocket.id,
      rocket_name: rocket.rocket_name,
      description: rocket.description,
      flickr_images: rocket.flickr_images,
      isReserved: false,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const id = parseInt(action.payload, 10);
      const newRockets = state.rockets.map((rocket) => {
        if (rocket.id === id) {
          return { ...rocket, isReserved: true };
        }
        return rocket;
      });
      state.rockets = newRockets;
    },

    cancelReservation: (state, action) => {
      const id = parseInt(action.payload, 10);
      const newRockets = state.rockets.map((rocket) => {
        if (rocket.id === id) {
          return { ...rocket, isReserved: false };
        }
        return rocket;
      });
      state.rockets = newRockets;
    },
  },
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
      });
  },
});

export const { reserveRocket, cancelReservation } = rocketsSlice.actions;
export default rocketsSlice.reducer;
