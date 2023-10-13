import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateShoppingBag } from './shoppingBag';
import axios from 'axios';

export const PlaceOrder = createAsyncThunk('ordersSlice/placeOrders', async (body, thunkApi) => {
  try {
    console.log('inside place ordersss', body)
    const selectedItems = body.filter((item) => item.selected === true);
    console.log('before');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const finalItems = {};
    finalItems.userName = userName;
    finalItems.userId = userId;

    finalItems.products = selectedItems;
    finalItems.totalQuantity = finalItems.products.length;

    console.log('finals items is ', finalItems);

    const response = await axios.post('http://localhost:5000/orders/placeOrder', finalItems);
    console.log('response from api iss,,,', response);
    thunkApi.dispatch(updateShoppingBag(response))
    return response;
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})

export const AddDeliveryAddress = createAsyncThunk('ordersSlice/addDeliveryAddress', async (body, thunkApi) => {
  try {
    console.log('delivery person is,', body)
    const userId = localStorage.getItem('userId');
    body.userId = userId;
    const response = await axios.post('http://localhost:5000/users/addDeliveryAddress', body);
    console.log('response is ,', response);
    return response.data;
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})
export const AddPaymentMethod = createAsyncThunk('ordersSlice/addPaymentMethod', async (body, thunkApi) => {
  try {
    console.log('payment data is,', body)
    const userId = localStorage.getItem('userId');
    body.userId = userId;
    const response = await axios.post('http://localhost:5000/users/addPaymentMethod', body);
    console.log('response is ,', response);
    return response.data;
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})
export const GetDeliveryAddress = createAsyncThunk('ordersSlice/getDeliveryAddress', async (body, thunkApi) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`http://localhost:5000/users/getDeliveryAddress?userId=${userId}`);
    console.log('response is ,', response);
    return response.data
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})
// export const GetPaymentMethod = createAsyncThunk('ordersSlice/getDeliveryAddress', async (body, thunkApi) => {
//   try {
//     const userId = localStorage.getItem('userId');
//     const response = await axios.get(`http://localhost:5000/users/getDeliveryAddress?userId=${userId}`);
//     console.log('response is ,', response);
//     return response.data
//   } catch (error) {
//     thunkApi.rejectWithValue({
//       error
//     })
//   }
// })
export const GetAllDeliveryAddress = createAsyncThunk('ordersSlice/getAllDeliveryAddress', async (body, thunkApi) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`http://localhost:5000/users/getAllDeliveryAddress?userId=${userId}`);
    console.log('response is ,', response);
    return response.data
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})

export const GetAllPaymentMethods = createAsyncThunk('ordersSlice/getAllPaymentMethods', async (body, thunkApi) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`http://localhost:5000/users/getAllPaymentMethods?userId=${userId}`);
    console.log('response is ,', response);
    return response.data
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})

export const UpdateDeliveryPerson = createAsyncThunk('ordersSlice/updateDeliveryPerson', async (body, thunkApi) => {
  try {
    console.log('iniseeee', body);
    console.log('my body is, ', body);
    const userId = localStorage.getItem('userId');
    // body.userId = userId;
    // console.log('body is ', body);
    const response = await axios.put('http://localhost:5000/users/updateDeliveryPerson', { userId, body });
    console.log('response is ,', response.data);
    return response.data
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})

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
      selectedPerson: 0,
      selectedPaymentMethod: 0,
      allDeliveryPersons: [],
      paymentMethod: {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        country: ''

      },
      allPaymentMethods: [],
      orders: [],
      isDeliveryPerson: false,
      isPaymentMethod: false,
      changeAddressOffcanvas: false

    },
    reducers: {
      setPaymentMethodAndDeliveryAddress: (state, { payload }) => {
        console.log(' payload is , ', payload);
        state.allDeliveryPersons = payload.data.user.deliveryAddress;
        state.deliveryPerson = payload.data.user.deliveryAddress[payload.data.user.selectedPerson];
        state.allPaymentMethods = payload.data.user.paymentMethods;
        state.paymentMethod = payload.data.user.paymentMethods[payload.data.user.selectedPaymentMethod];
        state.selectedPaymentMethod = payload.data.user.selectedPaymentMethod;
        state.selectedPerson = payload.data.user.selectedPerson;
      },
      clearCache: (state) => {
        // Set the state to its initial state
        return {
          deliveryPerson: {
            name: '',
            mobile: '',
            country: '',
            city: '',
            address: '',
            province: ''
          },
          selectedPerson: 0,
          selectedPaymentMethod: 0,
          allDeliveryPersons: [],
          paymentMethod: {
            cardNumber: '',
            expiryDate: '',
            cvc: '',
            country: ''
          },
          allPaymentMethods: [],
          orders: [],
          isDeliveryPerson: false,
          isPaymentMethod: false,
          changeAddressOffcanvas: false
        };
      },
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
      handleOffcanvas: (state, { payload }) => {
        state[payload.offcanvas] = !payload.value
      }
    },
    extraReducers: {
      [PlaceOrder.pending]: (state, action) => {
        console.log('inside pending');
      },
      [PlaceOrder.fulfilled]: (state, { payload }) => {
        console.log('orders that are placed are,  ', payload.data);
      },
      [PlaceOrder.rejected]: (state, action) => {
        console.log('inside rejected');
      },
      [AddDeliveryAddress.pending]: (state, action) => {
        console.log('inside rejected');
      },
      [AddDeliveryAddress.fulfilled]: (state, { payload }) => {
        console.log('ins fulfiled, ', payload);
        state.allDeliveryPersons = payload;
      },
      [AddDeliveryAddress.rejected]: (state, action) => {
        console.log('inside rejected');
      },
      [AddPaymentMethod.pending]: (state, action) => {
        console.log('inside pending');
      },
      [AddPaymentMethod.fulfilled]: (state, { payload }) => {
        console.log('inside fulfilled');
        state.allPaymentMethods = payload;
      },
      [AddPaymentMethod.rejected]: (state, action) => {
        console.log('inside rejected');
      },
      [GetDeliveryAddress.pending]: (state, action) => {
        console.log('inside pending');
      },
      [GetDeliveryAddress.fulfilled]: (state, action) => {
        console.log('inside fulfiled perso is , ', action);
        state.deliveryPerson = action.payload;
        console.log('delivery pereosn ', state.deliveryPerson)
      },
      [GetDeliveryAddress.rejected]: (state, action) => {
        console.log('inside rejected');
      },
      [GetAllDeliveryAddress.pending]: (state, action) => {
        console.log('inside pending');
      },
      [GetAllDeliveryAddress.fulfilled]: (state, action) => {
        console.log('inside fulfiled perso is , ', action);
        state.allDeliveryPersons = action.payload;
        console.log('delivery pereosn ', state.deliveryPerson)
      },
      [GetAllDeliveryAddress.rejected]: (state, action) => {
        console.log('inside rejected');
      },
      [GetAllPaymentMethods.pending]: (state, action) => {
        console.log('inside pending');
      },
      [GetAllPaymentMethods.fulfilled]: (state, action) => {
        console.log('inside fulfiled');
        state.allPaymentMethods = action.payload;
      },
      [GetAllPaymentMethods.rejected]: (state, action) => {
        console.log('inside rejected')
      },
      [UpdateDeliveryPerson.pending]: (state, action) => {
        console.log('inside pendinf');
      },
      [UpdateDeliveryPerson.fulfilled]: (state, action) => {
        console.log('in fulfilled, ', action.payload);
        state.allDeliveryPersons = action.payload.deliveryAddress;
        state.selectedPerson = action.payload.selectedPerson;
      },
      [UpdateDeliveryPerson.rejected]: (state, action) => {
        console.log('inside pendinf');
      }

    }
  }
)
export const {
  addDeliveryPerson,
  addPaymentMethod,
  addOrder,
  handleOffcanvas,
  setPaymentMethodAndDeliveryAddress,
  clearCache
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
