import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { UpdateShoppingBag } from './shopping-bag';
import { UpdateCurrentUserDetails } from '../auth';

export const PlaceOrder = createAsyncThunk(
  'ordersSlice/placeOrders',
  async (body, thunkApi) => {
    try {
      const selectedItems = body.filter((item) => item.selected === true);
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      const finalItems = {};
      finalItems.userName = userName;
      finalItems.userId = userId;
      finalItems.products = selectedItems;
      finalItems.totalQuantity = finalItems.products.length;

      const state = thunkApi.getState();

      const response = await axios.post(
        'http://localhost:5000/orders/placeOrder',
        finalItems,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      thunkApi.dispatch(UpdateShoppingBag(response));

      return response;
    } catch (error) {
      thunkApi.rejectWithValue({
        error
      });
    }
  }
);

export const AddDeliveryAddress = createAsyncThunk(
  'ordersSlice/addDeliveryAddress',
  async (body, thunkApi) => {
    try {
      const userId = localStorage.getItem('userId');
      body.userId = userId;
      const response = await axios.post(
        'http://localhost:5000/users/addDeliveryAddress',
        body
      );

      thunkApi.dispatch(UpdateCurrentUserDetails(response.data));

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue({
        error
      });
    }
  }
);

export const AddPaymentMethod = createAsyncThunk(
  'ordersSlice/addPaymentMethod',
  async (body, thunkApi) => {
    try {
      const userId = localStorage.getItem('userId');
      body.userId = userId;
      const response = await axios.post(
        'http://localhost:5000/users/addPaymentMethod',
        body
      );

      thunkApi.dispatch(UpdateCurrentUserDetails(response.data));

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue({
        error
      });
    }
  }
);

export const GetDeliveryAddress = createAsyncThunk(
  'ordersSlice/getDeliveryAddress',
  async (body, thunkApi) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(
        `http://localhost:5000/users/getDeliveryAddress?userId=${userId}`
      );

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue({
        error
      });
    }
  }
);

export const GetAllDeliveryAddress = createAsyncThunk(
  'ordersSlice/getAllDeliveryAddress',
  async (body, thunkApi) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(
        `http://localhost:5000/users/getAllDeliveryAddress?userId=${userId}`
      );

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue({
        error
      });
    }
  }
);

export const GetAllPaymentMethods = createAsyncThunk(
  'ordersSlice/getAllPaymentMethods',
  async (body, thunkApi) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(
        `http://localhost:5000/users/getAllPaymentMethods?userId=${userId}`
      );

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue({
        error
      });
    }
  }
);

export const UpdateDeliveryPerson = createAsyncThunk(
  'ordersSlice/updateDeliveryPerson',
  async (body, thunkApi) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(
        'http://localhost:5000/users/updateDeliveryPerson',
        { userId, body }
      );
      thunkApi.dispatch(UpdateCurrentUserDetails(response.data));

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue({
        error
      });
    }
  }
);

export const UpdatePaymentMethod = createAsyncThunk(
  'ordersSlice/updatePaymentMethod',
  async (body, thunkApi) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(
        'http://localhost:5000/users/updatePaymentMethod',
        { userId, body }
      );
      thunkApi.dispatch(UpdateCurrentUserDetails(response.data));

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue({
        error
      });
    }
  }
);

const CheckoutSlice = createSlice({
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
    SetPaymentMethodAndDeliveryAddress: (state, { payload }) => {
      state.allDeliveryPersons = payload.data.user.deliveryAddress;
      state.deliveryPerson = payload.data.user.deliveryAddress[payload.data.user.selectedPerson];
      state.allPaymentMethods = payload.data.user.paymentMethods;
      state.paymentMethod = payload.data.user.paymentMethods[payload.data.user.selectedPaymentMethod];
      state.selectedPaymentMethod = payload.data.user.selectedPaymentMethod;
      state.selectedPerson = payload.data.user.selectedPerson;
    },
    clearCache: (state) => {
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
    ClearMyCheckoutCache: (state) => {
      state.deliveryPerson = {
        name: '',
        mobile: '',
        country: '',
        city: '',
        address: '',
        province: ''
      };
      state.selectedPerson = 0;
      state.selectedPaymentMethod = 0;
      state.allDeliveryPersons = [];
      state.paymentMethod = {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        country: ''
      };
      state.allPaymentMethods = [];
      state.orders = [];
      state.isDeliveryPerson = false;
      state.isPaymentMethod = false;
      state.changeAddressOffcanvas = false;
    },
    AddDeliveryPerson: (state, { payload }) => {
      state.deliveryPerson = payload;
      state.isDeliveryPerson = true;
    },
    AddPaymentMethodAction: (state, { payload }) => {
      state.paymentMethod = payload;
      state.isPaymentMethod = true;
    },
    AddOrder: (state, { payload }) => {
      const selectedItems = payload.filter((item) => item.selected === true);
      state.orders = selectedItems;
    },
    HandleOffcanvas: (state, { payload }) => {
      state[payload.offcanvas] = !payload.value;
    }
  },
  extraReducers: {
    [PlaceOrder.pending]: (state, action) => {
    },
    [PlaceOrder.fulfilled]: (state, { payload }) => {
    },
    [PlaceOrder.rejected]: (state, action) => {
    },
    [AddDeliveryAddress.pending]: (state, action) => {
    },
    [AddDeliveryAddress.fulfilled]: (state, { payload }) => {
      state.allDeliveryPersons = payload;
    },
    [AddDeliveryAddress.rejected]: (state, action) => {
    },
    [AddPaymentMethod.pending]: (state, action) => {
    },
    [AddPaymentMethod.fulfilled]: (state, { payload }) => {
      state.allPaymentMethods = payload;
    },
    [AddPaymentMethod.rejected]: (state, action) => {
    },
    [GetDeliveryAddress.pending]: (state, action) => {
    },
    [GetDeliveryAddress.fulfilled]: (state, action) => {
      state.deliveryPerson = action.payload;
    },
    [GetDeliveryAddress.rejected]: (state, action) => {
    },
    [GetAllDeliveryAddress.pending]: (state, action) => {
    },
    [GetAllDeliveryAddress.fulfilled]: (state, action) => {
      state.allDeliveryPersons = action.payload;
    },
    [GetAllDeliveryAddress.rejected]: (state, action) => {
    },
    [GetAllPaymentMethods.pending]: (state, action) => {
    },
    [GetAllPaymentMethods.fulfilled]: (state, action) => {
      state.allPaymentMethods = action.payload;
    },
    [GetAllPaymentMethods.rejected]: (state, action) => {
    },
    [UpdateDeliveryPerson.pending]: (state, action) => {
    },
    [UpdateDeliveryPerson.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.allDeliveryPersons = action.payload.deliveryAddress;
      state.selectedPerson = action.payload.selectedPerson;
    },
    [UpdateDeliveryPerson.rejected]: (state, action) => {
    },
    [UpdatePaymentMethod.pending]: (state, action) => {
    },
    [UpdatePaymentMethod.fulfilled]: (state, action) => {
      state.allPaymentMethods = action.payload.paymentMethods;
      state.selectedPaymentMethod = action.payload.selectedPaymentMethod;
    },
    [UpdatePaymentMethod.rejected]: (state, action) => {
    }
  }
});
export const {
  clearCache,
  AddDeliveryPerson,
  AddPaymentMethodAction,
  AddOrder,
  HandleOffcanvas,
  SetPaymentMethodAndDeliveryAddress,
  ClearMyCheckoutCache
} = CheckoutSlice;

export default CheckoutSlice.reducer;
