import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateShoppingBag } from './shopping-bag';

const initialState = {
  orders: [],
  allOrders: [],
  error: '',
  stats: {},
  statsLoader: true,
  loader: false,
  statsError: '',
  status: false
};

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
      const paymentCard = state.checkout.allPaymentMethods[state.checkout.selectedPaymentMethod];
      console.log('final items and payment card iss   ', finalItems, paymentCard);
      const data = { finalItems, paymentCard }
      console.log('data iss   ', data);

      const response = await axios.post(
        'http://localhost:5000/orders/placeOrder',
        data,
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

export const GetOrders = createAsyncThunk(
  'ordersSlice/getOrders',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userIdObject = { userId: body.userId || null };

      const response = await axios.get(
        'http://localhost:5000/orders/getOrders',
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          },
          params: {
            userId: userIdObject || null,
            sortingObj: body.sortingObj || {}
          }
        }
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message
      });
    }
  }
);

export const DeliverOrder = createAsyncThunk(
  'ordersSlice/DeliverOrder',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const response = await axios.put(
        'http://localhost:5000/orders/deliverOrder',
        body,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      if (response.data.error) {
        return thunkApi.rejectWithValue({
          error: response.data.error
        });
      }

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message
      });
    }
  }
);

export const GetOrdersByUserId = createAsyncThunk(
  'ordersSlice/GetOrders',
  async (body, thunkApi) => {
    try {
      body = localStorage.getItem('userId');
      const state = thunkApi.getState();
      const response = await axios.get(
        `http://localhost:5000/orders/getOrders?userId=${body}`,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue({
        error
      });
    }
  }
);

const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {
    ClearError: (state) => {
      state.error = '';
    },
    ClearCache: (state) => {
      return {
        orders: [],
        allOrders: [],
        error: '',
        stats: {},
        statsLoader: true,
        loader: false,
        statsError: '',
        status: false
      }
    }
  },
  extraReducers: {
    [PlaceOrder.pending]: (state, action) => {
    },
    [PlaceOrder.fulfilled]: (state, { payload }) => {
    },
    [PlaceOrder.rejected]: (state, action) => {
    },
    [GetOrders.pending]: (state, action) => {
      state.loader = true;
    },
    [GetOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      console.log('in fulfilled', action.payload);
      state.loader = false;
    },
    [GetOrders.rejected]: (state, action) => {
      state.loader = false;
    },
    [DeliverOrder.pending]: (state, action) => {
      state.loader = true;
    },
    [DeliverOrder.fulfilled]: (state, action) => {
      state.error = 'Order has been delivered successfully';
      state.status = true;
      state.loader = true;
    },
    [DeliverOrder.rejected]: (state, { payload }) => {
      state.error = payload.error;
      state.loader = false;
    },
    [GetOrdersByUserId.pending]: (state, action) => {
    },
    [GetOrdersByUserId.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [GetOrdersByUserId.rejected]: (state, action) => {
    }
  }
});

export const { ClearError, ClearCache } = ordersSlice.actions;

export default ordersSlice.reducer;
