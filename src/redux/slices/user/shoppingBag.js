import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
}

const shoppingBagSlice = createSlice(
  {
    name: 'ShoppingBagSlice',
    initialState,
    reducers: {
      clearCache: (state) => {
        console.log(' shpping bag cache is called');
        state.cart = [];
      },
      addToCart: (state, { payload }) => {
        const payloadCopy = { ...payload, selected: true };
        state.cart.push(payloadCopy);
        console.log(state.cart);
      },
      updateCartItem: (state, { payload }) => {
        const { _id } = payload;
        console.log(' update cart item is called', payload);
        console.log(state.cart);

        const indexOfItem = state.cart.findIndex(item => item._id === _id);

        if (indexOfItem !== -1) {
          state.cart = state.cart.map((item, index) => {
            if (index === indexOfItem) {
              item.selected = !item.selected;
            }
            return item;
          });
        }
        console.log('cart now updated is, ', state.cart);
      },
      updateCart: (state, { payload }) => {
        console.log(payload);
        // state.cart = state.cart.filter(item => !payload.includes(item.id));
        const selectedItems = payload.filter((item) => item.selected === true);
        console.log('selected items are, ', selectedItems);

        state.cart = selectedItems;
        // console.log('insdei add orders', selectedItems)
      },
      updateShoppingBag: (state, { payload }) => {
        console.log(' orderred product is , ', payload);
        console.log(' cart is , ', state.cart);
        state.cart = state.cart.filter(item => !payload.data.some(p => p._id === item._id));
      }
    }
  }
)
export const { addToCart, updateCartItem, updateCart, clearCache, updateShoppingBag } = shoppingBagSlice.actions
export default shoppingBagSlice.reducer;
