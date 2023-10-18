import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clearCache as clearShoppingBagCache } from './user/shoppingBag';
import axios from 'axios';
import { clearCache as clearCheckoutCache, setPaymentMethodAndDeliveryAddress } from './user/checkout';

export const loginUser = createAsyncThunk('auth/loginStatus', async (body, thunkApi) => {
  try {
    console.log('body', body);
    const response = await axios.post('http://localhost:5000/auth/signIn', body);
    console.log('rspnse from api is, ', response.data);
    if (!response.data.user.admin === 'present') { thunkApi.dispatch(setPaymentMethodAndDeliveryAddress(response)) }
    return response.data;
  } catch (error) {
    console.log('error in thuk is, ', error);
    if (error.response) { // if response has come, with empty or invalid data
      console.log('inside rejected', error.response.data);
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
export const UserForgotPassword = createAsyncThunk('auth/userForgotPassword', async (body, thunkApi) => {
  try {
    console.log('body', body);
    const response = await axios.post('http://localhost:5000/auth/forgotPassword', body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('error in thuk is, ', error.response.data.error);
    return thunkApi.rejectWithValue({
      error: error.response.data.error
    })
  }
})

export const ResetPassword = createAsyncThunk('auth/resetPassword', async (body, thunkApi) => {
  try {
    console.log('body', body);
    const response = await axios.post('http://localhost:5000/auth/resetPassword', body, {
      headers: {
        Authorization: `Bearer ${body.token}` // Assuming your JWT token is stored in authentication.token
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('error in thuk is, ', error.response.data.error);
    return thunkApi.rejectWithValue({
      error: error.response.data.error
    })
  }
})
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkApi) => {
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
export const signupUser = createAsyncThunk('auth/signup', async (body, thunkApi) => {
  try {
    const response = await axios.post('http://localhost:5000/auth/signup', body);
    console.log('in signup asyn thunk', response);
    if (response.data.message) {
      // If there is a message in the response data, treat it as an error
      console.log('inside rejected: ', response.data.message);
      return thunkApi.rejectWithValue({
        error: response.data.error
      });
    }
    return response.data;
  } catch (error) {
    console.log('error from api is ,', error)
    if (error.response) {
      return thunkApi.rejectWithValue({
        error: error.response.data.error
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
      currentUser: {},
      passwordResetStatus: false,
      emailSentStatus: false

    },
    reducers: {
      clearCache: (state) => {
        state.token = '';
        state.error = '';
        state.isLoading = false;
        state.currentUser = {};
        state.isAdmin = false;
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
      },
      clearError: (state, action) => {
        console.log('\ninside clear error', state.error);
        state.error = '';
        state.isLoading = false;
        state.emailSentStatus = false;
        state.passwordResetStatus = false
      },
      updateCurrentUserDetails: (state, { payload }) => {
        console.log('user isssss,', payload);
        state.currentUser = payload;
      }

    },
    extraReducers: {
      [loginUser.fulfilled]: (state, { payload }) => {
        state.passwordResetStatus = false;
        state.emailSentStatus = false;
        console.log('token is, ', payload.message)
        state.token = payload.message
        localStorage.setItem('token', payload.message);
        if (payload.user.admin === 'present') {
          state.isAdmin = true;
        }
        state.currentUser = payload.user;
        console.log('current user is,  ', payload);
        localStorage.setItem('userId', payload.user._id);
        localStorage.setItem('userName', payload.user.name);

        state.error = '';
      },
      [loginUser.rejected]: (state, { payload }) => {
        console.log('message is  ', payload.error);
        state.passwordResetStatus = false;
        state.emailSentStatus = false;

        state.token = false;
        state.isLoading = false;
        state.error = payload.error.error;
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
      },
      [UserForgotPassword.pending]: (state, { payload }) => {
        state.isLoading = true;
        console.log('inside pemding');
      },
      [UserForgotPassword.fulfilled]: (state, { payload }) => {
        console.log('inside fulfilled');
        state.passwordResetStatus = true;
        state.isLoading = false;
        state.error = 'email has sent to you for verification';
      },
      [UserForgotPassword.rejected]: (state, { payload }) => {
        console.log('inside rejected', payload);
        state.isLoading = false;
        state.passwordResetStatus = false;
        state.error = payload.error;
      },
      [ResetPassword.pending]: (state, { payload }) => {
        state.isLoading = true;
        console.log('inside pemding');
      },
      [ResetPassword.fulfilled]: (state, { payload }) => {
        console.log('inside fulfilled');
        state.isLoading = false;
        state.error = '';
        state.emailSentStatus = true;
      },
      [ResetPassword.rejected]: (state, { payload }) => {
        console.log('inside rejected', payload);
        state.isLoading = false;
        state.error = payload.error;
        state.emailSentStatus = false;
      }
    }
  })

export const {
  login,
  updateCurrentUserDetails,
  logout, loginAdmin, logoutAdmin, clearCache, clearError
} = authSlice.actions;
export default authSlice.reducer;
