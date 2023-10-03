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
      }
    }
  }
)
export const { addDeliveryPerson, addPaymentMethod } = checkoutSlice.actions;
export default checkoutSlice.reducer;
