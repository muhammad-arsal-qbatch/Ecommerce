import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/loginStatus', async (body, thunkApi) => {
  try {
    console.log('body', body);
    const response = await axios.post('https://dummyjson.com/auth/login', body)
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

const authSlice = createSlice(
  {
    name: 'auth',
    initialState: {
      token: '',
      error: '',
      isLoading: false,
      isAdmin: false

    },
    reducers: {
      login: (state, { payload }) => {
        console.log('action', payload);
        state[payload.field] = payload.value;
      },
      logout: (state) => {
        localStorage.clear();
        state.token = false;
      },
      loginAdmin: (state) => {
        state.isAdmin = true;
      },
      logoutAdmin: (state) => {
        state.isAdmin = false;
      }

    },
    extraReducers: {
      [loginUser.fulfilled]: (state, action) => {
        console.log(action.meta.requestId);
        state.token = action.meta.requestId;
        localStorage.setItem('token', state.token);
      },
      [loginUser.rejected]: (state, action) => {
        console.log(action.payload.error);
        state.token = false;
        state.isLoading = false;
      },
      [loginUser.pending]: (state, action) => {
        console.log(action.payload);
        state.token = false;
        state.isLoading = true;
      }
    }
  })

export const { login, logout, loginAdmin, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
