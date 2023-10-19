import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loader: true,
  data: [],
  topSellingProducts: [],
  error: '',
  tableDataError: '',
  offset: 0,
  status: true,
  offcanvas: false,
  modal: false,
  addProductCanvas: false,
  product: {}
};

export const getData = createAsyncThunk(
  'adminProductSlice/getProducts',
  async (body, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const response = await axios.get(
        'http://localhost:5000/products/getProducts',
        {
          params: {
            offset: body * 10 || 0,
            limit: body.limit ? body.limit : 10,
            search: body.search ? body.search : '',
            filterObj: body.filterObj || {},
            sortingObj: body.sortingObj || {}
          }
        }
      );
      state.offset = body * 10 || 0;

      if (response.data.response.myProducts.length === 0) {
        return rejectWithValue({
          error: 'no data found'
        });
      }

      if (response.data.error) {
        return rejectWithValue({ error: 'no data found' });
      }

      return response.data.response.myProducts;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const addProduct = createAsyncThunk(
  'adminProductSlice/addProduct',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();

      const response = await axios.post(
        'http://localhost:5000/products/addProduct',
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      if (response.data.message) {
        return thunkApi.rejectWithValue({
          error: response.data.message
        });
      }

      return response.data;
    } catch (error) {
      console.log('error in admin is, ', error);
      return thunkApi.rejectWithValue({
        error: 'Api Not found, please check your api url'
      });
    }
  }
);
export const getOrder = createAsyncThunk(
  'adminProductSlice/getOrder',
  async (body, thunkApi) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${body.order}`
      );
      if (response.data.products.length === 0) {
        return thunkApi.rejectWithValue({ error: 'no data found' });
      }

      return response.data.products;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const editProduct = createAsyncThunk(
  'adminProductSlice/editProduct',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();

      const response = await axios.put(
        'http://localhost:5000/products/editProduct',
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',

            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      return response.data.updatedObject;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue({
        error: 'there is some error while calling the api'
      });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'adminProductSlice/deleteProduct',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const response = await axios.delete(
        'http://localhost:5000/products/deleteProduct',
        {
          data: body,
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      if (response.data.error) {
        return thunkApi.rejectWithValue({
          error: response.data.error
        });
      }
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message
      });
    }
  }
);
export const GetTopSellingProducts = createAsyncThunk(
  'adminProductSlice/getTopSellingProducts',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const response = await axios.get(
        'http://localhost:5000/products/getTopSellingProducts',
        {
          headers: {
            Authorization: `Bearer ${state.authentication.token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message
      });
    }
  }
);

const AdminProductSlice = createSlice({
  name: 'adminProductSlice',
  initialState,
  reducers: {
    handleNext: (state) => {
      state.offset = state.offset + 1;
    },
    handlePrevious: (state) => {
      state.offset = state.offset - 1;
    },
    handleOffset: (state, { payload }) => {
      state.offset = payload;
    },
    hideOffcanvas: (state) => {
      state.offcanvas = false;
      state.addProductCanvas = false;
      state.product = {};
    },
    hideModal: (state) => {
      state.modal = false;
    },
    displayModal: (state, { payload }) => {
      state.modal = true;
      console.log(state.data);
      state.product = payload;
    },
    showOffcanvas: (state, { payload }) => {
      state.offcanvas = true;
      state.product = payload;
    },
    showAddProductCanvas: (state, { payload }) => {
      state.addProductCanvas = true;
    },
    editProduct: (state, { payload }) => {
      const updatedData = state.data.map((product) => {
        if (product.id === payload.id) {
          return payload;
        } else {
          return product;
        }
      });
      state.offcanvas = false;
      state.data = updatedData;
    },
    clearError: (state, { payload }) => {
      state.error = '';
      state.loader = false;
    }
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loader = false;
      state.status = true;
      state.error = false;
    },
    [getData.pending]: (state) => {
      state.loader = true;
      state.status = false;
      state.error = false;
    },
    [getData.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.tableDataError = action.payload.error;
      state.status = false;
      state.loader = false;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loader = false;
      state.status = true;
    },

    [getOrder.pending]: (state, action) => {
      state.loader = true;
      state.status = false;
    },
    [getOrder.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loader = false;
      state.status = false;
    },
    [addProduct.pending]: (state, action) => {
      state.loader = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.data.push(action.payload.product);
      state.addProductCanvas = false;
      state.loader = false;
      state.error = 'product has been addedd';
    },
    [addProduct.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.addProductCanvas = false;
      state.loader = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.modal = false;
      state.data = state.data.filter(
        (d) => d._id !== action.meta.arg.product._id
      );
      state.product = {};
      state.loader = false;
    },
    [deleteProduct.pending]: (state, action) => {
    },
    [deleteProduct.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
    [editProduct.fulfilled]: (state, action) => {
      state.error = 'Product has been updated ';
      state.offcanvas = false;
      const updatedData = state.data.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        } else {
          return product;
        }
      });
      state.offcanvas = false;
      state.data = updatedData;
      state.product = {};
    },
    [editProduct.pending]: (state, action) => {
    },
    [editProduct.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.product = {};
      state.offcanvas = false;
    },
    [GetTopSellingProducts.pending]: (state) => {
      state.loader = true;
    },
    [GetTopSellingProducts.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.topSellingProducts = payload;
    },
    [GetTopSellingProducts.rejected]: (state, { payload }) => {
      state.loader = false;
      state.topSellingProducts = [];
      state.tableDataError = payload.error;
    }
  }
});

export const {
  handleNext,
  handleOffset,
  handlePrevious,
  hideOffcanvas,
  showOffcanvas,
  displayModal,
  hideModal,
  showAddProductCanvas,
  clearError
} = AdminProductSlice.actions;

export default AdminProductSlice.reducer;
