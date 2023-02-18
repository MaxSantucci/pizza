import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from '../store';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
}

function updateTotalPrice(state: WritableDraft<CartSliceState>) {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}

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
      updateTotalPrice(state)
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

      updateTotalPrice(state)
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const {id, type, size} = action.payload;
      const findItem = state.items.find(obj => obj.id === id && obj.type === type && obj.size === size);
    
      if (findItem) {
        const index = state.items.indexOf(findItem);
        state.items.splice(index, 1);
      }

      updateTotalPrice(state)
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  }
})



export const selectCart = (state: RootState) => state.cart;
export const selectCartItem = (state: RootState) => state.cart.items;

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;