import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;
export const selectCartItem = (state: RootState) => state.cart.items;