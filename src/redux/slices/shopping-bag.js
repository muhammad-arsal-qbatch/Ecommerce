import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};

const ShoppingBagSlice = createSlice({
  name: 'ShoppingBagSlice',
  initialState,
  reducers: {
    ClearCache: (state) => {
      state.cart = [];
    },
    AddToCart: (state, { payload }) => {
      const payloadCopy = { ...payload, selected: true };
      const existingItem = state.cart.find((item) => item._id === payload._id);

      if (existingItem) { /* empty */ } else {
        state.cart.push(payloadCopy);
      }
    },
    UpdateCartItem: (state, { payload }) => {
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
    UpdateCart: (state, { payload }) => {
      const selectedItems = payload.filter((item) => item.selected === true);
      state.cart = selectedItems;
    },
    UpdateShoppingBag: (state, { payload }) => {
      state.cart = state.cart.filter(
        (item) => !payload.data.some((p) => p._id === item._id)
      );
    },
    DeleteFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((c) => c._id !== payload._id);
    }
  }
});

export const {
  AddToCart,
  DeleteFromCart,
  UpdateCartItem,
  UpdateCart,
  ClearCache,
  UpdateShoppingBag
} = ShoppingBagSlice.actions;

export default ShoppingBagSlice.reducer;
