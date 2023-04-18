import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  devices: [],
  isLoading: false,
  error: null,
};
const url = 'https://api.fda.gov/device/classification.json?search=Imaging&limit=6';
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
        const data = action.payload.results;
        console.log(data);
        const newData = data.map((device) => ({
          name: device.device_name,
          class: device.device_class,
          id: device.submission_type_id,
          code: device.product_code,
          speciality_area: device.review_panel,
        }));
        return {
          ...state,
          devices: newData,
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
