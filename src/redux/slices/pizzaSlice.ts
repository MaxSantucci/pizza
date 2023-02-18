import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}

export enum Statuses {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Statuses;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Statuses.LOADING,
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get<PizzaItem[]>(`https://63cc509f9b72d2a88e0b89c8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

  return data;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Statuses.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Statuses.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Statuses.ERROR;
      state.items = [];
    });
  }
})

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;