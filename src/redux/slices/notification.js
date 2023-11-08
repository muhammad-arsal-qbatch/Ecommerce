import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  notifications: []
};

export const ReadNotification = createAsyncThunk('NotificationSlice/readNotification',
  async (body, thunkApi) => {
    const state = thunkApi.getState();
    try {
      console.log('body is  ', body);
      const userId = state.authentication.currentUser._id;
      body.userId = userId;
      console.log('body is ', body);
      // eslint-disable-next-line no-unused-vars
      const result = await axios.put('http://localhost:5000/notification/readNotification', body,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        })
      console.log('result is  ', result);
      return body;
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

)

export const GetNotifications = createAsyncThunk('NotificationSlice/getNotifications',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userId = state.authentication.currentUser._id || '';
      console.log('user id is , ', userId);

      const response = await axios.get('http://localhost:5000/notification/getNotifications', {
        headers: {
          Authorization: `Bearer ${state.authentication.token}`
        },
        params: {
          userId
        }
      });
      console.log('response is ', response.data);
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
  });

const NotificationSlice = createSlice({
  name: 'NotificationSlice',
  initialState,
  reducers: {
    ClearNotifications: (state) => {
      state.notifications = []
    }
  },
  extraReducers: {
    [GetNotifications.pending]: (state, { payload }) => {

    },
    [GetNotifications.fulfilled]: (state, { payload }) => {
      state.notifications = payload;
    },
    [GetNotifications.rejected]: (state, { payload }) => {
    },
    [ReadNotification.pending]: (state, { payload }) => {

    },
    [ReadNotification.fulfilled]: (state, { payload }) => {
      state.notifications = state.notifications.filter((singleNotification) => singleNotification.orderId !== payload.orderId);
      console.log('updated are ', state.notifications);
    },
    [ReadNotification.rejected]: (state, { payload }) => {
    }
  }
});

export const { ClearNotifications } = NotificationSlice.actions;
export default NotificationSlice.reducer;
