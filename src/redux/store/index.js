import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../slices/auth';
import adminProductSlice from '../slices/adminProduct';

const store = configureStore(
  {
    reducer: {
      authentication: authenticationReducer,
      adminProduct: adminProductSlice
    }

  }
)

export default store;
