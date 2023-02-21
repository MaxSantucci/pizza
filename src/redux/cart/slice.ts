import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { updateTotalPrice } from '../../utils/updateTotalPrice';
import { CartSliceState, CartItem } from './types';


const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState, 
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const { id, type, size } = action.payload;
      const findItem = state.items.find(obj => obj.id === id && obj.type === type && obj.size === size);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = updateTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const { id, type, size } = action.payload;
      const findItem = state.items.find(obj => obj.id === id && obj.type === type && obj.size === size);

      if (findItem) {
        findItem.count--;
      }

      if (findItem && findItem.count === 0) {
        const index = state.items.indexOf(findItem);
        state.items.splice(index, 1)
      }

      state.totalPrice = updateTotalPrice(state.items)
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const {id, type, size} = action.payload;
      const findItem = state.items.find(obj => obj.id === id && obj.type === type && obj.size === size);
    
      if (findItem) {
        const index = state.items.indexOf(findItem);
        state.items.splice(index, 1);
      }

      state.totalPrice =  updateTotalPrice(state.items)
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0; 
    },
  }
})

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;