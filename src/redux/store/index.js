import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../slices/auth';
import adminProductSlice from '../slices/adminProduct';
import shoppingBagSlice from '../slices/user/shoppingBag'

const store = configureStore(
  {
    reducer: {
      authentication: authenticationReducer,
      adminProduct: adminProductSlice,
      shoppingBag: shoppingBagSlice
    }

  }
)

export default store;
