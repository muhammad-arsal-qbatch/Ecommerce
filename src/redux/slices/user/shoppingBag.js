import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
}

const shoppingBagSlice = createSlice(
  {
    name: 'ShoppingBagSlice',
    initialState,
    reducers: {
      addToCart: (state, { payload }) => {
        console.log('inside slicce')
        state.cart.push(payload);
        console.log(state.cart);
      }
    }
  }
)
export const { addToCart } = shoppingBagSlice.actions
export default shoppingBagSlice.reducer;
