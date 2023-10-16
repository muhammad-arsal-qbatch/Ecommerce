import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  error: '',
  stats: {},
  statsLoader: true,
  statsError: ''

}

export const getOrders = createAsyncThunk('ordersSlice/getOrders', async (body, thunkApi) => {
  try {
    console.log(body);
    const response = await axios.get('http://localhost:5000/orders/getOrders')
    console.log({ response });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      error
    })
  }
})

export const GetStats = createAsyncThunk('orders/getStats',
  async (body, thunkApi) => {
    console.log('insiisasa');
    try {
      console.log('product is, ')
      const response = await axios.get('http://localhost:5000/orders/getStats', body);
      console.log('response stats is, ', response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error
      })
    }
  }
)
export const getOrdersInGroup = createAsyncThunk('ordersSlice/getOrdersInGroup', async (body, thunkApi) => {
  try {
    console.log(body);
    const response = await axios.get('http://localhost:5000/orders/getOrdersInGroup')
    console.log('sdfsdff', response);
    if (!response) { throw new Error('network error'); }
    return response.data;
  } catch (error) {
    console.log('cataaacch', error);
    return thunkApi.rejectWithValue({
      error: error.message
    })
  }
})
export const DeliverOrder = createAsyncThunk('ordersSlice/DeliverOrder', async (body, thunkApi) => {
  try {
    console.log('order is, ', body);
    const response = await axios.put('http://localhost:5000/orders/deliverOrder', body);
    if (response.data.error) {
      return thunkApi.rejectWithValue({
        error: response.data.error
      })
    };
    console.log({ response });
    return response.data;
  } catch (error) {
    console.log('in errorrorois , ', error)
    return thunkApi.rejectWithValue({
      error: error.message
    })
  }
})
export const GetOrdersByUserId = createAsyncThunk('ordersSlice/GetOrders', async (body, thunkApi) => {
  try {
    body = localStorage.getItem('userId');
    console.log('huihiuh', body);
    const response = await axios.get(`http://localhost:5000/orders/getOrders?userId=${body}`)
    console.log({ response });
    return response.data;
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})
const ordersSlice = createSlice(
  {
    name: 'ordersSlice',
    initialState,
    reducers: {
      clearError: (state) => {
        console.log('inside clear');
        state.error = ''
      }
    },
    extraReducers: {
      [getOrders.pending]: (state, action) => {
        console.log('inside pendign');
      },
      [getOrders.fulfilled]: (state, action) => {
        console.log(action);
        state.orders = action.payload;
      },
      [getOrders.rejected]: (state, action) => {
        console.log('inside rejected');
      },
      [getOrdersInGroup.pending]: (state, action) => {
      },
      [getOrdersInGroup.fulfilled]: (state, action) => {
        console.log('in fulfilled', action.payload);
        state.orders = action.payload.orders;
      },
      [getOrdersInGroup.rejected]: (state, { payload }) => {
        console.log('inside rejected');
        state.error = payload.error
      },
      [DeliverOrder.pending]: (state, action) => {
      },
      [DeliverOrder.fulfilled]: (state, action) => {
        console.log('in fulfilled', action.payload);
        state.error = 'Order has been delivered successfully';

        // state.orders = action.payload.orders;
      },
      [DeliverOrder.rejected]: (state, { payload }) => {
        console.log('inside rejected, ', payload);
        state.error = payload.error;
        console.log('inside rejected');
      },
      [GetOrdersByUserId.pending]: (state, action) => {
        console.log('inside pending');
      },
      [GetOrdersByUserId.fulfilled]: (state, action) => {
        console.log({ action })
        state.orders = action.payload;
        console.log('inside fulfilled');
      },
      [GetOrdersByUserId.rejected]: (state, action) => {
        console.log('inside rejected');
      },
      [GetStats.pending]: (state, { payload }) => {
        state.statsLoader = true;
      },
      [GetStats.fulfilled]: (state, { payload }) => {
        console.log('in fulfilled , ', payload);
        state.statsLoader = false;
        state.stats = payload[0];
      },
      [GetStats.rejected]: (state, { payload }) => {
        console.log('inside rejected , ', payload.error.message);
        state.statsLoader = false;
        state.statsError = 'Error fetching stats';
      }

    }
  }

)

export const { clearError } = ordersSlice.actions;
export default ordersSlice.reducer;
