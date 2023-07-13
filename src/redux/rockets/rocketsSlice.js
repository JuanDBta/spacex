import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  rockets: [
    {
      id: 'example-id-1',
      rocket_name: 'Rocket 1',
      description: 'Rocket 1 description',
      flickr_images: ['image1.jpg'],
      reserved: false,
    },
    {
      id: 'example-id-2',
      rocket_name: 'Rocket 2',
      description: 'Rocket 2 description',
      flickr_images: ['image2.jpg'],
      reserved: false,
    },
    // ... Agregar más objetos de rockets si es necesario
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
      reserved: false,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
});

export const reserveRocket = createAsyncThunk('rockets/reserveRocket', async (rocketId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return rocketId;
});

export const cancelRocketReservation = createAsyncThunk('rockets/cancelRocketReservation', async (rocketId) => {
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
      })
      .addCase(cancelRocketReservation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelRocketReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const canceledRocketId = action.payload;
        state.rockets = state.rockets.map((rocket) => {
          if (rocket.id !== canceledRocketId) {
            return rocket;
          }
          return { ...rocket, reserved: false };
        });
      })
      .addCase(cancelRocketReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default rocketsSlice.reducer;
