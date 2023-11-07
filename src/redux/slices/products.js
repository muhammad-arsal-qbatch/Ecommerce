import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';

const initialState = {
  loader: true,
  productsLength: 0,
  data: [],
  topSellingProducts: [],
  error: '',
  tableDataError: '',
  status: true,
  offcanvas: false,
  modal: false,
  addProductCanvas: false,
  product: {}
};

export const GetData = createAsyncThunk(
  'adminProductSlice/getProducts',
  async (body, { rejectWithValue, getState }) => {
    try {
      console.log('body is  ', body);
      const response = await axios.get(
        'http://localhost:5000/products/getProducts',
        {
          params: {
            offset: body.offset * body.limit || 0,
            limit: body?.limit ? body.limit : 10,
            search: body.search ? body.search : '',
            filterObj: body.filterObj ? body.filterObj : {},
            sortingObj: body.sortingObj || {}
          }
        }
      );

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
      if (error.response) { // response aya, means api hit hye
        if (error.response.data.error) {
          return rejectWithValue({
            error: error.response.data.error
          });
        } else {
          return rejectWithValue({ // response aya means api hit hye, func me erro
            error: 'Network error'
          });
        }
      } else {
        return rejectWithValue({
          error: 'Network error'
        });
      }
    }
  }
);

export const GetDataLength = createAsyncThunk(
  'adminProductSlice/getProductsLength',
  async (body, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/products/getProducts',
        {
          params: {
            offset: 0,
            limit: null
          }
        }
      );

      if (response.data.response.myProducts.length === 0) {
        return rejectWithValue({
          error: 'no data found'
        });
      }

      if (response.data.error) {
        return rejectWithValue({ error: 'no data found' });
      }
      console.log('length is  ', response.data.response.myProducts.length);

      return response.data.response.myProducts.length;
    } catch (error) {
      if (error.response) { // response aya, means api hit hye
        if (error.response.data.error) {
          return rejectWithValue({
            error: error.response.data.error
          });
        } else {
          return rejectWithValue({ // response aya means api hit hye, func me erro
            error: 'Network error'
          });
        }
      } else {
        return rejectWithValue({
          error: 'Network error'
        });
      }
    }
  }
);

export const AddProduct = createAsyncThunk(
  'adminProductSlice/addProduct',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      console.log('new product to add is, ', body);

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
);

export const ImportBulkProducts = createAsyncThunk(
  'adminProductSlice/importBulkProducts',
  async (body, thunkApi) => {
    try {
      console.log('new product to add is, ', body);
      const response = await axios.post(
        'http://localhost:5000/products/importBulkProducts',
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
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
);

export const DeleteProduct = createAsyncThunk(
  'adminProductSlice/deleteProduct',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      console.log('product id to delete is, ', body);
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
      console.log('before calling  ', response.data);
      return response.data
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
    [GetDataLength.fulfilled]: (state, action) => {
      state.loader = false;
      state.productsLength = action.payload;
    },
    [GetDataLength.pending]: (state) => {
      state.loader = true;
    },
    [GetDataLength.rejected]: (state, { payload }) => {
      state.loader = false;

      state.productsLength = 0;
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

    [GetOrder.rejected]: (state, { payload }) => {
      state.error = payload.error;
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
      notification.success({
        message: 'Success',
        description: 'product has been addedd',
        type: 'success',
        duration: 2
      });
    },

    [AddProduct.rejected]: (state, { payload }) => {
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 2
      });
      state.error = payload.error;
      state.addProductCanvas = false;
      state.loader = false;
    },
    [ImportBulkProducts.pending]: (state, action) => {
    },

    [ImportBulkProducts.fulfilled]: (state, action) => {
    },

    [ImportBulkProducts.rejected]: (state, { payload }) => {
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 2
      });
    },

    [DeleteProduct.fulfilled]: (state, action) => {
      state.modal = false;
      state.data = state.data.filter(
        (d) => d._id !== action.meta.arg._id
      );
      state.product = {};
      state.loader = false;
      notification.success({
        message: 'Success',
        description: 'product has been Deleted',
        type: 'success',
        duration: 2
      });
    },

    [DeleteProduct.pending]: (state, action) => {
      state.loader = true;
    },

    [DeleteProduct.rejected]: (state, { payload }) => {
      state.error = payload.error;
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 2
      });
      state.loader = true;
    },

    [EditProduct.fulfilled]: (state, action) => {
      state.error = 'Product has been updated ';
      state.offcanvas = false;
      const updatedData = state.data.map((product) => {
        console.log('action.payload is ,', action.payload);
        if (product._id === action.payload._id) {
          return action.payload;
        } else {
          return product;
        }
      });
      state.offcanvas = false;
      state.data = updatedData;
      state.product = {};
      state.loader = false;
      notification.success({
        message: 'Success',
        description: 'product has been Edited',
        type: 'success',
        duration: 2
      });
    },

    [EditProduct.pending]: (state, action) => {
      state.loader = true;
    },

    [EditProduct.rejected]: (state, { payload }) => {
      notification.error({
        message: payload.error,
        description: payload.error,
        type: 'error',
        duration: 2
      });
      state.error = payload.error;
      state.product = {};
      state.offcanvas = false;
      state.loader = false;
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
