import { CartItem } from "../redux/cart/types";
import { updateTotalPrice } from "./updateTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = updateTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  }
}