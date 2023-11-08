import axios from 'axios';
import { notification } from 'antd';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { UpdateCurrentUserDetails } from './auth';

export const AddDeliveryAddress = createAsyncThunk(
  'ordersSlice/addDeliveryAddress',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userId = localStorage.getItem('_id');
      body.userId = userId;
      const response = await axios.post(
        'http://localhost:5000/users/addDeliveryAddress',
        body,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      // thunkApi.dispatch(UpdateCurrentUserDetails(response.data));
      console.log('response.data is   ', response.data);

      return response.data;
    } catch (error) {
      if (error.response) { // response aya, means api hit hye
        if (error.response.data.error) {
          return thunkApi.rejectWithValue({
            error: error.response.data.error
          });
        } else {
          return thunkApi.rejectWithValue({ // response aya means api hit hye, func me erro
            error: 'Network error'
          });
        }
      } else {
        return thunkApi.rejectWithValue({
          error: 'Network error'
        });
      }
    }
  }
);

export const AddPaymentMethod = createAsyncThunk(
  'ordersSlice/addPaymentMethod',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userId = localStorage.getItem('_id');
      body.userId = userId;
      const response = await axios.post(
        'http://localhost:5000/users/addPaymentMethod',
        body,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) { // response aya, means api hit hye
        if (error.response.data.error) {
          return thunkApi.rejectWithValue({
            error: error.response.data.error
          });
        } else {
          return thunkApi.rejectWithValue({ // response aya means api hit hye, func me erro
            error: 'Network error'
          });
        }
      } else {
        return thunkApi.rejectWithValue({
          error: 'Network error'
        });
      }
    }
  }
);

export const GetDeliveryAddress = createAsyncThunk(
  'ordersSlice/getDeliveryAddress',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userId = localStorage.getItem('_id');
      const response = await axios.get(
        `http://localhost:5000/users/getDelisveryAddress?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );
      console.log('all delivery persons are ', response.data);

      return response.data;
    } catch (error) {
      if (error.response) { // response aya, means api hit hye
        if (error.response.data.error) {
          return thunkApi.rejectWithValue({
            error: error.response.data.error
          });
        } else {
          return thunkApi.rejectWithValue({ // response aya means api hit hye, func me erro
            error: 'Network error'
          });
        }
      } else {
        return thunkApi.rejectWithValue({
          error: 'Network error'
        });
      }
    }
  }
);

export const GetAllDeliveryAddress = createAsyncThunk(
  'ordersSlice/getAllDeliveryAddress',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userId = localStorage.getItem('_id');
      const response = await axios.get(
        `http://localhost:5000/users/getAllDeliveryAddress?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) { // response aya, means api hit hye
        if (error.response.data.error) {
          return thunkApi.rejectWithValue({
            error: error.response.data.error
          });
        } else {
          return thunkApi.rejectWithValue({ // response aya means api hit hye, func me erro
            error: 'Network error'
          });
        }
      } else {
        return thunkApi.rejectWithValue({
          error: 'Network error'
        });
      }
    }
  }
);

export const GetAllPaymentMethods = createAsyncThunk(
  'ordersSlice/getAllPaymentMethods',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userId = localStorage.getItem('_id');
      const response = await axios.get(
        `http://localhost:5000/users/getAllPaymentMethods?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) { // response aya, means api hit hye
        if (error.response.data.error) {
          return thunkApi.rejectWithValue({
            error: error.response.data.error
          });
        } else {
          return thunkApi.rejectWithValue({ // response aya means api hit hye, func me erro
            error: 'Network error'
          });
        }
      } else {
        return thunkApi.rejectWithValue({
          error: 'Network error'
        });
      }
    }
  }
);

export const UpdateDeliveryPerson = createAsyncThunk(
  'ordersSlice/updateDeliveryPerson',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userId = localStorage.getItem('_id');
      const response = await axios.put(
        'http://localhost:5000/users/updateDeliveryPerson',
        { userId, body },
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );
      thunkApi.dispatch(UpdateCurrentUserDetails(response.data));

      return response.data;
    } catch (error) {
      if (error.response) { // response aya, means api hit hye
        if (error.response.data.error) {
          return thunkApi.rejectWithValue({
            error: error.response.data.error
          });
        } else {
          return thunkApi.rejectWithValue({ // response aya means api hit hye, func me erro
            error: 'Network error'
          });
        }
      } else {
        return thunkApi.rejectWithValue({
          error: 'Network error'
        });
      }
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
        selectedPerson: 0,
        selectedPaymentMethod: 0,
        allDeliveryPersons: [],
        allPaymentMethods: [],
        orders: [],
        isDeliveryPerson: false,
        isPaymentMethod: false,
        changeAddressOffcanvas: false
      };
    },
    AddDeliveryPerson: (state, { payload }) => {
      state.deliveryPerson = payload;
      state.isDeliveryPerson = true;
    },
    UpdateMyPaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload
    },
    NewPaymentMethod: (state, { payload }) => {
      state.selectedPaymentMethod = payload
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
    [AddDeliveryAddress.pending]: (state, action) => {
    },
    [AddDeliveryAddress.fulfilled]: (state, { payload }) => {
      console.log('payload iss   ', payload);
      state.allDeliveryPersons.push(payload);
    },
    [AddDeliveryAddress.rejected]: (state, { payload }) => {
      console.log('payload is  ', payload);
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 1
      });
    },
    [AddPaymentMethod.pending]: (state, action) => {
    },
    [AddPaymentMethod.fulfilled]: (state, { payload }) => {
      state.allPaymentMethods.push(payload);
    },
    [AddPaymentMethod.rejected]: (state, { payload }) => {
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 2
      });
    },
    [GetDeliveryAddress.pending]: (state, action) => {
    },
    [GetDeliveryAddress.fulfilled]: (state, action) => {
      state.allDeliveryPersons = action.payload;
    },
    [GetDeliveryAddress.rejected]: (state, { payload }) => {
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 2
      });
    },
    [GetAllDeliveryAddress.pending]: (state, action) => {
    },
    [GetAllDeliveryAddress.fulfilled]: (state, action) => {
      console.log('all delivery persons ', action.payload);
      state.allDeliveryPersons = action.payload;
    },
    [GetAllDeliveryAddress.rejected]: (state, { payload }) => {
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 1
      });
    },
    [GetAllPaymentMethods.pending]: (state, action) => {
    },
    [GetAllPaymentMethods.fulfilled]: (state, action) => {
      console.log('payment methods in fulfilled ', action.payload);
      state.allPaymentMethods = action.payload;
    },
    [GetAllPaymentMethods.rejected]: (state, { payload }) => {
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 1
      });
    },
    [UpdateDeliveryPerson.pending]: (state, action) => {
    },
    [UpdateDeliveryPerson.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.allDeliveryPersons = action.payload.deliveryAddress;
      state.selectedPerson = action.payload.selectedPerson;
    },
    [UpdateDeliveryPerson.rejected]: (state, { payload }) => {
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 1
      });
    }
  }
});

export const {
  clearCache,
  AddDeliveryPerson,
  AddOrder,
  HandleOffcanvas,
  UpdateMyPaymentMethod,
  SetPaymentMethodAndDeliveryAddress,
  NewPaymentMethod
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
