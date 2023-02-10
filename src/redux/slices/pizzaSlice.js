import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async () => {
    const response = await axios.get(`https://63cc509f9b72d2a88e0b89c8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data;
  }
)

const initialState = {
  items: [],
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  }
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;