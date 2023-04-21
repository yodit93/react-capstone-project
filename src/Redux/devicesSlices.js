import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  devices: [],
  isLoading: false,
  error: null,
};
const url = 'https://api.coincap.io/v2/assets#';
export const fetchDevices = createAsyncThunk('devices/fetchDevices', async (_, { rejectWithValue }) => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to fetch data');
  }
});

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchDevices.fulfilled, (state, action) => {
        const data = action.payload;
        return {
          ...state,
          devices: data.data,
          isLoading: false,
        };
      })
      .addCase(fetchDevices.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }));
  },
});

export default devicesSlice.reducer;
