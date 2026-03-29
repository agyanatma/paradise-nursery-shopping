import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items[plant.id];

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items[plant.id] = {
        ...plant,
        quantity: 1,
      };
    },
    increaseQuantity: (state, action) => {
      const item = state.items[action.payload];

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items[action.payload];

      if (!item) {
        return;
      }

      if (item.quantity <= 1) {
        delete state.items[action.payload];
        return;
      }

      item.quantity -= 1;
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export const selectCartItems = (state) => Object.values(state.cart.items);
export const selectCartCount = (state) =>
  Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state) =>
  Object.values(state.cart.items).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

export default cartSlice.reducer;
