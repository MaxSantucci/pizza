import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
}

function updateTotalPrice(state) {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const {id, type, size} = action.payload;
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
    minusItem(state, action) {
      const {id, type, size} = action.payload;
      const findItem = state.items.find(obj => obj.id === id && obj.type === type && obj.size === size);

      if (findItem) {
        findItem.count--;
      }

      if (findItem.count === 0) {
        const index = state.items.indexOf(findItem);
        state.items.splice(index, 1)
      }

      updateTotalPrice(state)
    },
    removeItem(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload);

      updateTotalPrice(state)
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  }
})

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;