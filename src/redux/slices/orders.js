import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
      console.log('EROROROR', error);
      return thunkApi.rejectWithValue({
        error: error.message
      });
    }
  }
);

export const GetStats = createAsyncThunk(
  'orders/getStats',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const response = await axios.get(
        'http://localhost:5000/orders/getStats',
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error
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
    [GetOrders.pending]: (state, action) => {
      state.loader = true;
    },
    [GetOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
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
    },
    [GetStats.pending]: (state, { payload }) => {
      state.statsLoader = true;
    },
    [GetStats.fulfilled]: (state, { payload }) => {
      state.statsLoader = false;
      state.stats = payload[0];
    },
    [GetStats.rejected]: (state, { payload }) => {
      state.statsLoader = false;
      state.statsError = 'Error fetching stats';
    }
  }
});

export const { ClearError, ClearCache } = ordersSlice.actions;

export default ordersSlice.reducer;
