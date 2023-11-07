import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetStats = createAsyncThunk('adminDashboard/getStats',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const response = await axios.get(
        'http://localhost:5000/getStats',
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
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
  })

const DashboardSlice = createSlice({
  name: 'AdminDashboard',
  initialState: {
    stats: {},
    statsLoader: true,
    loader: false,
    statsError: ''
  },
  reducers: {},
  extraReducers: {
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

export default DashboardSlice.reducer;
