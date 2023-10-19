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

export const GetData = createAsyncThunk(
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
            filterObj: body.filterObj ? body.filterObj : {},
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

export const AddProduct = createAsyncThunk(
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
      return thunkApi.rejectWithValue({
        error: 'Api Not found, please check your api url'
      });
    }
  }
);

export const GetOrder = createAsyncThunk(
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

export const EditProduct = createAsyncThunk(
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
      return thunkApi.rejectWithValue({
        error: 'there is some error while calling the api'
      });
    }
  }
);

export const DeleteProduct = createAsyncThunk(
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
    HandleNext: (state) => {
      state.offset = state.offset + 1;
    },
    HandlePrevious: (state) => {
      state.offset = state.offset - 1;
    },
    HandleOffset: (state, { payload }) => {
      state.offset = payload;
    },
    HideOffcanvas: (state) => {
      state.offcanvas = false;
      state.addProductCanvas = false;
      state.product = {};
    },
    HideModal: (state) => {
      state.modal = false;
    },
    DisplayModal: (state, { payload }) => {
      state.modal = true;
      state.product = payload;
    },
    ShowOffcanvas: (state, { payload }) => {
      state.offcanvas = true;
      state.product = payload;
    },
    ShowAddProductCanvas: (state, { payload }) => {
      state.addProductCanvas = true;
    },
    EditProductAction: (state, { payload }) => {
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
    ClearError: (state, { payload }) => {
      state.error = '';
      state.loader = false;
    }
  },
  extraReducers: {
    [GetData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loader = false;
      state.status = true;
      state.error = false;
    },
    [GetData.pending]: (state) => {
      state.loader = true;
      state.status = false;
      state.error = false;
    },
    [GetData.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.tableDataError = action.payload.error;
      state.status = false;
      state.loader = false;
    },
    [GetOrder.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loader = false;
      state.status = true;
    },

    [GetOrder.pending]: (state, action) => {
      state.loader = true;
      state.status = false;
    },
    [GetOrder.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loader = false;
      state.status = false;
    },
    [AddProduct.pending]: (state, action) => {
      state.loader = true;
    },
    [AddProduct.fulfilled]: (state, action) => {
      state.data.push(action.payload.product);
      state.addProductCanvas = false;
      state.loader = false;
      state.error = 'product has been addedd';
    },
    [AddProduct.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.addProductCanvas = false;
      state.loader = false;
    },
    [DeleteProduct.fulfilled]: (state, action) => {
      state.modal = false;
      state.data = state.data.filter(
        (d) => d._id !== action.meta.arg.product._id
      );
      state.product = {};
      state.loader = false;
    },
    [DeleteProduct.pending]: (state, action) => {
    },
    [DeleteProduct.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
    [EditProduct.fulfilled]: (state, action) => {
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
    [EditProduct.pending]: (state, action) => {
    },
    [EditProduct.rejected]: (state, action) => {
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
  HandleNext,
  HandleOffset,
  HandlePrevious,
  HideOffcanvas,
  ShowOffcanvas,
  DisplayModal,
  HideModal,
  ShowAddProductCanvas,
  ClearError
} = AdminProductSlice.actions;

export default AdminProductSlice.reducer;
