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
        const payloadCopy = { ...payload, selected: true };
        state.cart.push(payloadCopy);
        console.log(state.cart);
      },
      updateCartItem: (state, { payload }) => {
        const { id } = payload;

        const indexOfItem = state.cart.findIndex(item => item.id === id);

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
        console.log(payload);
        const selectedItems = payload.filter((item) => item.selected === true);

        state.cart = selectedItems;
        // console.log('insdei add orders', selectedItems)
      }
    }
  }
)
export const { addToCart, updateCartItem, updateCart } = shoppingBagSlice.actions
export default shoppingBagSlice.reducer;
