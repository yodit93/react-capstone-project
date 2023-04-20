import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  devices: [],
  isLoading: false,
  error: null,
};
const url = 'https://api.fda.gov/device/classification.json?search=Imaging&limit=6';
export const fetchDevices = createAsyncThunk('devices/fetchDevices', async (_, { rejectWithValue }) => {
  try {
    const response = await axios(url);
    console.log(response.data);
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
          code: device.product_code,
          speciality_area: device.review_panel,
          submission_type: device.submission_type_id,
          speciality_description: device.medical_specialty_description,
          id: uuidv4(),
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
