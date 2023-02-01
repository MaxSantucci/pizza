import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/fiterSlice';

export const store = configureStore({
  reducer: {
    filter
  }
})