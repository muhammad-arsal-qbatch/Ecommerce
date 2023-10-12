import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  orders: []
}

export const getOrders = createAsyncThunk('ordersSlice/getOrders', async (body, thunkApi) => {
  try {
    console.log(body);
    const response = await axios.get('http://localhost:5000/orders/getOrders')
    console.log({ response });
    return response.data;
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})
export const getOrdersInGroup = createAsyncThunk('ordersSlice/getOrdersInGroup', async (body, thunkApi) => {
  try {
    console.log(body);
    const response = await axios.get('http://localhost:5000/orders/getOrdersInGroup')
    console.log({ response });
    return response.data;
  } catch (error) {
    thunkApi.rejectWithValue({
      error
    })
  }
})
export const DeliverOrder = createAsyncThunk('ordersSlice/DeliverOrder', async (body, thunkApi) => {
  try {
    console.log('order is, ', body);
    const response = await axios.put('http://localhost:5000/orders/deliverOrder', body)
    console.log({ response });
    return response.data;
  } catch (error) {
    thunkApi.rejectWithValue({
      error
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
      [getOrdersInGroup.rejected]: (state, action) => {
        console.log('inside rejected');
      },
      [DeliverOrder.pending]: (state, action) => {
      },
      [DeliverOrder.fulfilled]: (state, action) => {
        console.log('in fulfilled', action.payload);
        // state.orders = action.payload.orders;
      },
      [DeliverOrder.rejected]: (state, action) => {
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
      }

    }
  }

)

export default ordersSlice.reducer;
