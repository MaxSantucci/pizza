import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncAction';
import { PizzaItem, PizzaSliceState, Statuses } from './types';

const initialState: PizzaSliceState = {
  items: [],
  status: Statuses.LOADING,
}

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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;