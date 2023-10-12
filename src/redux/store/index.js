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
  whitelist: ['authentication', 'adminProduct', 'shoppingBag', 'checkout'] // Slices to persist
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

// const store = configureStore(
//   {
//     reducer: {
//       authentication: authenticationReducer,
//       adminProduct: adminProductSlice,
//       shoppingBag: shoppingBagSlice,
//       checkout: checkoutSlice,
//       orders: ordersSlice
//     }

//   }
// )

// export default store;

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';

// import authSlice from '../slice/authSlice';
// import addressSlice from '../slice/addressSlice';
// import cartSlice from '../slice/cartClice';
// import orderSlice from '../slice/orderSlice';
// import productSlice from '../slice/productSlice';
// import paymentSlice from '../slice/payment-slice';
// import sideNavSlice from '../slice/sideNavSlice';

// const persistConfig = {
//     key: 'qbatch',
//     storage
// };

// const reducers = combineReducers({
//     auth: authSlice,
//     sideNav: sideNavSlice,
//     AllProducts: productSlice,
//     adminOrder: orderSlice,
//     userCart: cartSlice,
//     userAddress : addressSlice,
//     userPayments : paymentSlice
// });

// const rootReducer = (state, action) => {
//     return reducers(state, action);
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default configureStore({
//     reducer: persistedReducer,
//     middleware: [thunk, logger],
//     devTools: true
// });
