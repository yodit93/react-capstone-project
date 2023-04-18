import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './devicesSlices';

const store = configureStore({
  reducer: {
    devices: devicesReducer,
  },
});

export default store;
