import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import filter from 'redux-persist-transform-filter';

import authenticationReducer from '../slices/auth';
import AdminProductSlice from '../slices/products';
import ShoppingBagSlice from '../slices/shopping-bag';
import CheckoutSlice from '../slices/checkout';
import ordersSlice from '../slices/orders';
import DashboardSlice from '../slices/dashboard';
import NotificationSlice from '../slices/notification';

const authFilter = filter('authentication', ['token', 'isAdmin']);

const authPersistConfig = {
  key: 'authentication',
  storage,
  transforms: [authFilter]
};

const persistConfig = {
  key: 'qbatch',
  storage,
  whitelist: [
    'authentication',
    // 'token',
    //  'isAdmin',
    'shoppingBag'
  ]
};

const persistedAuthReducer = persistReducer(authPersistConfig, authenticationReducer);

const reducers = combineReducers({
  authentication: persistedAuthReducer,
  adminProduct: AdminProductSlice,
  adminDashboard: DashboardSlice,
  shoppingBag: ShoppingBagSlice,
  checkout: CheckoutSlice,
  orders: ordersSlice,
  notification: NotificationSlice
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
