import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { clearCache as clearShoppingBagCache } from './user/shoppingBag';
import { clearCache as clearOrdersCache } from './orders';
import {
  clearCache as clearCheckoutCache,
  setPaymentMethodAndDeliveryAddress
} from './user/checkout';

export const loginUser = createAsyncThunk(
  'auth/loginStatus',
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/signIn',
        body
      );
      if (!response.data.user.admin === 'present') {
        thunkApi.dispatch(setPaymentMethodAndDeliveryAddress(response));
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue({
          error: error.response.data
        });
      } else {
        return thunkApi.rejectWithValue({
          error: error.message
        });
      }
    }
  }
);

export const UserForgotPassword = createAsyncThunk(
  'auth/userForgotPassword',
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/forgotPassword',
        body
      );
      return response.data;
    } catch (error) {
      console.log('error in thuk is, ', error.response.data.error);
      return thunkApi.rejectWithValue({
        error: error.response.data.error
      });
    }
  }
);

export const ResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/resetPassword',
        body,
        {
          headers: {
            Authorization: `Bearer ${body.token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.response.data.error
      });
    }
  }
);
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(clearShoppingBagCache());
      thunkApi.dispatch(clearCheckoutCache());
      thunkApi.dispatch(clearOrdersCache());

      return 'Logout successful';
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
);
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/signup',
        body
      );
      if (response.data.message) {
        return thunkApi.rejectWithValue({
          error: response.data.error
        });
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue({
          error: error.response.data.error
        });
      } else {
        return thunkApi.rejectWithValue({
          error: error.message
        });
      }
    }
  }
);

const authSlice = createSlice({
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
      state.error = '';
      state.isLoading = false;
      state.emailSentStatus = false;
      state.passwordResetStatus = false;
    },
    updateCurrentUserDetails: (state, { payload }) => {
      state.currentUser = payload;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.passwordResetStatus = false;
      state.emailSentStatus = false;
      state.token = payload.message;
      localStorage.setItem('token', payload.message);

      if (payload.user.admin === 'present') {
        state.isAdmin = true;
      }

      state.currentUser = payload.user;
      localStorage.setItem('userId', payload.user._id);
      localStorage.setItem('userName', payload.user.name);

      state.error = '';
    },
    [loginUser.rejected]: (state, { payload }) => {
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
    },
    [UserForgotPassword.fulfilled]: (state, { payload }) => {
      state.passwordResetStatus = true;
      state.isLoading = false;
      state.error = 'email has sent to you for verification';
    },
    [UserForgotPassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.passwordResetStatus = false;
      state.error = payload.error;
    },
    [ResetPassword.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [ResetPassword.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = '';
      state.emailSentStatus = true;
    },
    [ResetPassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.error;
      state.emailSentStatus = false;
    }
  }
});

export const {
  login,
  updateCurrentUserDetails,
  logout,
  loginAdmin,
  logoutAdmin,
  clearCache,
  clearError
} = authSlice.actions;

export default authSlice.reducer;
