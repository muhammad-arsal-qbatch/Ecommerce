import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice(
  {
    name: 'Checkout slice',
    initialState: {
      deliveryPerson: {

        name: '',
        mobile: '',
        country: '',
        city: '',
        address: '',
        province: ''
      },
      paymentMethod: {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        country: ''

      },
      orders: [],
      isDeliveryPerson: false,
      isPaymentMethod: false

    },
    reducers: {
      addDeliveryPerson: (state, { payload }) => {
        state.deliveryPerson = payload;
        console.log(state.deliveryPerson);
        state.isDeliveryPerson = true;
      },
      addPaymentMethod: (state, { payload }) => {
        state.paymentMethod = payload;
        state.isPaymentMethod = true;
      },
      addOrder: (state, { payload }) => {
        console.log(payload);
        const selectedItems = payload.filter((item) => item.selected === true);

        state.orders = selectedItems;
        console.log('insdei add orders', selectedItems)
      },
      getOrders: (state) => {

      }

    }
  }
)
export const { addDeliveryPerson, addPaymentMethod, addOrder, getOrders } = checkoutSlice.actions;
export default checkoutSlice.reducer;
