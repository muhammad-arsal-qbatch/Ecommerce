import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';

import { ClearCache as ClearShoppingBagCache } from './shopping-bag';
import { SetPaymentMethodAndDeliveryAddress } from './checkout';

export const LoginUser = createAsyncThunk(
  'auth/loginStatus',
  async (body, thunkApi) => {
    try {
      console.log('in login body has,  ', body);
      const response = await axios.post(
        'http://localhost:5000/auth/signIn',
        body
      );
      if (!response.data.user.admin === 'present') {
        thunkApi.dispatch(SetPaymentMethodAndDeliveryAddress(response));
      }
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

export const UserForgotPassword = createAsyncThunk(
  'auth/userForgotPassword',
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/forgotPassword',
        body
      );
      console.log('token of reset token is, ', response.data);
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

export const LogoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(ClearShoppingBagCache());
      // thunkApi.dispatch(ClearOrdersCache());
      // thunkApi.dispatch(clearCache())
      // thunkApi.dispatch(ClearNotifications());

      return 'Logout successful';
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
);

export const SignupUser = createAsyncThunk(
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

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    error: '',
    isLoading: false,
    isAdmin: false,
    currentUser: {},
    passwordResetStatus: false,
    emailSentStatus: false,
    resetToken: false
  },
  reducers: {
    ClearCache: (state) => {
      state.token = '';
      state.error = '';
      state.isLoading = false;
      state.currentUser = {};
      state.isAdmin = false;
    },

    ClearError: (state, action) => {
      state.error = '';
      state.isLoading = false;
      state.emailSentStatus = false;
      state.passwordResetStatus = false;
    },

    UpdateCurrentUserDetails: (state, { payload }) => {
      state.currentUser = payload;
    }
  },

  extraReducers: {
    [LoginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.passwordResetStatus = false;
      state.emailSentStatus = false;
      state.token = payload.message;
      localStorage.setItem('token', payload.message);
      console.log('payloaf ', payload.user);

      if (payload.user.admin === true) {
        state.isAdmin = true;
      }

      state.currentUser = payload.user;
      localStorage.setItem('_id', payload.user._id);
      localStorage.setItem('userName', payload.user.name);

      state.error = '';
    },
    [LoginUser.rejected]: (state, { payload }) => {
      console.log('payload is  ', payload);
      state.passwordResetStatus = false;
      state.emailSentStatus = false;
      state.token = '';
      state.isLoading = false;
      state.error = payload.error;
    },
    [LoginUser.pending]: (state, action) => {
      state.token = '';
      state.isLoading = true;
    },
    [SignupUser.fulfilled]: (state, { payload }) => {
      state.error = 'signup successful';
    },
    [SignupUser.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [SignupUser.rejected]: (state, { payload }) => {
      state.error = payload.error;
    },
    [LogoutUser.fulfilled]: (state, { payload }) => {
      localStorage.clear();
      state.token = '';
      state.error = '';
      state.isLoading = false;
      state.isAdmin = false;
      state.currentUser = {};
      state.error = payload.error;
    },
    [LogoutUser.Pending]: (state, { payload }) => {
    },
    [LogoutUser.rejected]: (state, { payload }) => {
      notification.error({
        message: 'Error',
        description: 'Error Logging out',
        type: 'error',
        duration: 2
      });
    },
    [UserForgotPassword.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [UserForgotPassword.fulfilled]: (state, { payload }) => {
      state.passwordResetStatus = true;
      state.isLoading = false;
      state.error = 'email has sent to you for verification';
      state.resetToken = payload;
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
      state.resetToken = ''
    },
    [ResetPassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.error;
      state.emailSentStatus = false;
    }
  }
});

export const {
  UpdateCurrentUserDetails,
  LogoutAdmin,
  ClearCache,
  ClearError
} = AuthSlice.actions;

export default AuthSlice.reducer;
