import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import authenticationReducer from '../slices/auth';
import adminProductSlice from '../slices/adminProduct';
import shoppingBagSlice from '../slices/user/shoppingBag';
import checkoutSlice from '../slices/user/checkout';
import ordersSlice from '../slices/orders';

const persistConfig = {
  key: 'qbatch',
  storage,
  whitelist: [
    'authentication',
    'adminProduct',
    'shoppingBag',
    'checkout',
    'orders'
  ]
};

const reducers = combineReducers({
  authentication: authenticationReducer,
  adminProduct: adminProductSlice,
  shoppingBag: shoppingBagSlice,
  checkout: checkoutSlice,
  orders: ordersSlice
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export default configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production' // Enable DevTools only in development
});
