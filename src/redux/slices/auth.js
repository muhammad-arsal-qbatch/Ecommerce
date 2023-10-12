import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clearCache as clearShoppingBagCache } from './user/shoppingBag';
import axios from 'axios';
import { clearCache as clearCheckoutCache, setPaymentMethodAndDeliveryAddress } from './user/checkout';

export const loginUser = createAsyncThunk('user/loginStatus', async (body, thunkApi) => {
  try {
    console.log('body', body);
    const response = await axios.post('http://localhost:5000/users/signIn', body);
    thunkApi.dispatch(setPaymentMethodAndDeliveryAddress(response))
    return response.data;
  } catch (error) {
    if (error.response) { // if response has come, with empty or invalid data
      console.log('inside rejected', error);
      return thunkApi.rejectWithValue({
        error: error.response.data
      })
    } else { // if there is a mistake in api calling
      console.log('inside rejected 2');
      return thunkApi.rejectWithValue({
        error: error.message
      })
    }
  }
})
export const logoutUser = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    // Additional logout logic if needed

    // Dispatch the action from the shopping bag slice
    thunkApi.dispatch(clearShoppingBagCache());
    thunkApi.dispatch(clearCheckoutCache())

    // Any other logic you want to perform during logout

    // Return a result if needed
    return 'Logout successful';
  } catch (error) {
    // Handle errors if necessary
    console.error('Logout error:', error);
    throw error;
  }
});
export const signupUser = createAsyncThunk('user/signup', async (body, thunkApi) => {
  try {
    const response = await axios.post('http://localhost:5000/users/signup', body);
    console.log('in signup asyn thunk', response.data);
    if (response.data.message) {
      // If there is a message in the response data, treat it as an error
      console.log('inside rejected: ', response.data.message);
      return thunkApi.rejectWithValue({
        error: response.data.message
      });
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      return thunkApi.rejectWithValue({
        error: error.response.data
      })
    } else {
      return thunkApi.rejectWithValue({
        error: error.message
      })
    }
  }
})

const authSlice = createSlice(
  {
    name: 'auth',
    initialState: {
      token: '',
      error: '',
      isLoading: false,
      isAdmin: false,
      currentUser: {}

    },
    reducers: {
      clearCache: (state) => {
        state.token = '';
        state.error = '';
        state.isLoading = false;
        state.currentUser = {};
      },
      login: (state, { payload }) => {
        console.log('action', payload);
        state[payload.field] = payload.value;
      },
      logout: (state) => {
        localStorage.clear();
        state.token = '';
        state.error = '';
        state.isLoading = false;
        state.currentUser = {};
        clearShoppingBagCache(state);
      },
      loginAdmin: (state) => {
        state.isAdmin = true;
      },
      logoutAdmin: (state) => {
        state.isAdmin = false;
      }

    },
    extraReducers: {
      [loginUser.fulfilled]: (state, { payload }) => {
        console.log('token is, ', payload.message)
        state.token = payload.message
        localStorage.setItem('token', payload.message);
        state.currentUser = payload.user;
        console.log('current user is,  ', payload);
        localStorage.setItem('userId', payload.user._id);
        localStorage.setItem('userName', payload.user.name);

        state.error = '';
      },
      [loginUser.rejected]: (state, action) => {
        console.log('message is  ', action.payload.error.message);
        state.token = false;
        state.isLoading = false;
        state.error = action.payload.error.message;
      },
      [loginUser.pending]: (state, action) => {
        console.log(action.payload);
        state.token = false;
        state.isLoading = true;
      },
      [signupUser.fulfilled]: (state, { payload }) => {
        state.error = 'signup successful';
      },
      [signupUser.pending]: (state, { payload }) => {
        state.isLoading = true;
      },
      [signupUser.rejected]: (state, { payload }) => {
        console.log('inside rejected', payload.error);
        state.error = payload.error;
      },
      [logoutUser.fulfilled]: (state, { payload }) => {
        localStorage.clear();
        state.token = '';
        state.error = '';
        state.isLoading = false;
        state.currentUser = {};
        state.error = payload.error;
      }
    }
  })

export const { login, logout, loginAdmin, logoutAdmin, clearCache } = authSlice.actions;
export default authSlice.reducer;
