import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/missions';
const initialState = {
  missions: [],
  isloading: false,
  error: '',
};

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
 
});
export default missionSlice.reducer;
