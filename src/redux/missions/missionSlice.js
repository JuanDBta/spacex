import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://api.spacexdata.com/v3/missions';
const initialState = {
  missions: [],
  isloading: false,
  error: '',
};

export const fetchmissions = createAsyncThunk('missions/fetchmission', async () => {
  try {
    const response = await fetch(url);
    const missions = await response.json();
    const selectedMission = missions.map((mission) => ({
      id: mission.mission_id,
      name: mission.mission_name,
      description: mission.description,
      reserved: false,
    }));
    return selectedMission;
  } catch (error) {
    return error.message;
  }
});

export const joinmission = createAsyncThunk('missions/joinmission', async (id) => {
  try {
    await fetch(`${url}/${id}`);
    return id;
  } catch (error) {
    return error.message;
  }
});

export const leavemission = createAsyncThunk('missions/leavemission', async (id) => {
  try {
    await fetch(`${url}/${id}`);
    return id;
  } catch (error) {
    return error.message;
  }
});

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchmissions.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchmissions.fulfilled, (state, action) => {
      state.isloading = false;
      state.missions = action.payload;
    });
    builder.addCase(fetchmissions.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message;
    });
    builder.addCase(joinmission.fulfilled, (state, action) => {
      const id = action.payload;
      const newState = state.missions.map((mission) => {
        if (mission.id !== id) return mission;
        return { ...mission, reserved: true };
      });
      state.missions = newState;
    });
    builder.addCase(leavemission.fulfilled, (state, action) => {
      const id = action.payload;
      const newState = state.missions.map((mission) => {
        if (mission.id !== id) return mission;
        return { ...mission, reserved: false };
      });
      state.missions = newState;
    });
  },
});

export const getMissions = (state) => state.missions.missions;
export const getLoading = (state) => state.missions.isloading;
export const getError = (state) => state.missions.error;

export default missionSlice.reducer;
