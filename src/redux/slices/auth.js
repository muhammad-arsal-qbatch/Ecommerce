import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ClearCache as ClearShoppingBagCache } from './shopping-bag';
import { ClearCache as ClearOrdersCache } from './orders';
import { SetPaymentMethodAndDeliveryAddress, clearCache } from './checkout';

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
      console.log('token of reset token is, ', response.data);
      return response.data;
    } catch (error) {
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

export const LogoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(ClearShoppingBagCache());
      thunkApi.dispatch(ClearOrdersCache());
      thunkApi.dispatch(clearCache())

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
    Login: (state, { payload }) => {
      state[payload.field] = payload.value;
    },
    Logout: (state) => {
      localStorage.clear();
      state.token = '';
      state.error = '';
      state.isLoading = false;
      state.currentUser = {};
      ClearShoppingBagCache(state);
    },
    LoginAdmin: (state) => {
      state.isAdmin = true;
    },
    LogoutAdmin: (state) => {
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
    [LoginUser.rejected]: (state, { payload }) => {
      state.passwordResetStatus = false;
      state.emailSentStatus = false;
      state.token = false;
      state.isLoading = false;
      state.error = payload.error.error;
    },
    [LoginUser.pending]: (state, action) => {
      state.token = false;
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
  Login,
  UpdateCurrentUserDetails,
  Logout,
  LoginAdmin,
  LogoutAdmin,
  ClearCache,
  ClearError
} = AuthSlice.actions;

export default AuthSlice.reducer;
