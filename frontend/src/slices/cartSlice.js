import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      toast.success("Item added successfully");
      return updateCart(state);
    },
    updateCartItemQty(state, action) {
      const { itemId, qty } = action.payload;
      const itemToUpdate = state.cartItems.find((x) => x._id === itemId);
      if (itemToUpdate) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === itemId ? { ...item, qty: qty } : item
        );
      }
      return updateCart(state);
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      return updateCart(state);
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems(state, action) {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  updateCartItemQty,
  removeCartItem,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
