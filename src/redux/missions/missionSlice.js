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

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinmission: (state, action) => {
      const id = action.payload;
      const newState = state.missions.map((mission) => {
        if (mission.id !== id) return mission;
        return { ...mission, reserved: true };
      });
      state.missions = newState;
    },
    leavemission: (state, action) => {
      const id = action.payload;
      const newState = state.missions.map((mission) => {
        if (mission.id !== id) return mission;
        return { ...mission, reserved: false };
      });
      state.missions = newState;
    },
  },
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
  },
});

export const getMissions = (state) => state.missions.missions;
export const getLoading = (state) => state.missions.isloading;
export const getError = (state) => state.missions.error;
export const { joinmission, leavemission } = missionSlice.actions;

export default missionSlice.reducer;
