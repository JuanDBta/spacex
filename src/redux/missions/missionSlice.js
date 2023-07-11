import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/missions';
const initialState = {
  missions: [],
  isloading: false,
  error: '',
};
export const fetchmissions = createAsyncThunk('missions/fetchmission', async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error.message;
    }
  });
const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
 
});
export default missionSlice.reducer;
