import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  coins: [],
  isLoading: false,
  error: null,
};
const url = 'https://api.coincap.io/v2/assets#';
export const fetchCoins = createAsyncThunk('coins/fetchCoins', async (_, { rejectWithValue }) => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (err) {
    return rejectWithValue('Unable to fetch data');
  }
});

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchCoins.fulfilled, (state, action) => {
        const data = action.payload;
        return {
          ...state,
          coins: data.data,
          isLoading: false,
        };
      })
      .addCase(fetchCoins.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }));
  },
});

export default coinsSlice.reducer;
