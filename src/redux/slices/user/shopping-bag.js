import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};

const ShoppingBagSlice = createSlice({
  name: 'ShoppingBagSlice',
  initialState,
  reducers: {
    clearCache: (state) => {
      state.cart = [];
    },
    addToCart: (state, { payload }) => {
      const payloadCopy = { ...payload, selected: true };
      const existingItem = state.cart.find((item) => item._id === payload._id);

      if (existingItem) { /* empty */ } else {
        state.cart.push(payloadCopy);
      }
    },
    updateCartItem: (state, { payload }) => {
      const { _id } = payload;
      const indexOfItem = state.cart.findIndex((item) => item._id === _id);
      if (indexOfItem !== -1) {
        state.cart = state.cart.map((item, index) => {
          if (index === indexOfItem) {
            item.selected = !item.selected;
          }
          return item;
        });
      }
    },
    updateCart: (state, { payload }) => {
      const selectedItems = payload.filter((item) => item.selected === true);
      state.cart = selectedItems;
    },
    updateShoppingBag: (state, { payload }) => {
      state.cart = state.cart.filter(
        (item) => !payload.data.some((p) => p._id === item._id)
      );
    },
    deleteFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((c) => c._id !== payload._id);
    }
  }
});

export const {
  addToCart,
  deleteFromCart,
  updateCartItem,
  updateCart,
  clearCache,
  updateShoppingBag
} = ShoppingBagSlice.actions;

export default ShoppingBagSlice.reducer;
