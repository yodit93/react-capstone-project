import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from './coinsSlices';

const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});

export default store;
