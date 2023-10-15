import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

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

export const getData = createAsyncThunk('adminProductSlice/getProducts',
  async (body, { rejectWithValue, getState }) => {
    console.log('body offset is, ', body);
    const state = getState();
    try {
      const response = await axios.get('http://localhost:5000/products/getProducts', {
        params: {
          offset: body * 10 || 0,
          limit: 10
        }
      });
      state.offset = body * 10 || 0
      console.log('respose send from api is, ', response.data.response.myProducts);
      if (response.data.error) { // if api is correct but no data is returned
        console.log('sdsdds');
        return rejectWithValue(
          { error: 'no data found' }
        )
      }

      return response.data.response.myProducts;
    } catch (error) {
      return rejectWithValue(
        { error: error.message }
      )
    }
  }
)

export const addProduct = createAsyncThunk(
  'adminProductSlice/addProduct',
  async (body, thunkApi) => {
    try {
      console.log('Product in API:', body.newProduct.images);

      const response = await axios.post('http://localhost:5000/products/addProduct', body);

      console.log('Response is:', response);

      if (response.data.message) {
        console.log('Inside error');
        return thunkApi.rejectWithValue({
          error: response.data.message
        });
      }

      console.log('Data successfully added:', response.data);
      return response.data;
    } catch (error) {
      console.error('API call error:', error);
      return thunkApi.rejectWithValue({
        error: 'Api Not found, please check your api url'
      });
    }
  }
);
export const getOrder = createAsyncThunk('adminProductSlice/getOrder',
  async (body, thunkApi) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${body.order}`);
      if (response.data.products.length === 0) { // if api is current but no data is returned
        return thunkApi.rejectWithValue(
          { error: 'no data found' }
        )
      }

      return response.data.products;
    } catch (error) {
      return thunkApi.rejectWithValue(
        { error: error.message }
      )
    }
  }
)

export const editProduct = createAsyncThunk('adminProductSlice/editProduct',
  async (body, thunkApi) => {
    try {
      console.log(body);
      const response = await axios.put('http://localhost:5000/products/editProduct', body);
      console.log('response from api is, ', response);
      if (response.data.error) {
        return thunkApi.rejectWithValue({
          error: response.data.error
        })
      }
      return response.data.response.updatedObject;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        { error: 'there is some error while calling the api' }
      )
    }
  }
)

export const deleteProduct = createAsyncThunk('adminProductSlice/deleteProduct',
  async (body, thunkApi) => {
    try {
      console.log('product is, ', body)
      const response = await axios.delete('http://localhost:5000/products/deleteProduct', { data: body });
      if (response.data.error) {
        return thunkApi.rejectWithValue({
          error: response.data.error
        })
      }
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message
      })
    }
  }
)
export const GetTopSellingProducts = createAsyncThunk('adminProductSlice/getTopSellingProducts',
  async (body, thunkApi) => {
    console.log('insiisasa');
    try {
      console.log('product is, ')
      const response = await axios.get('http://localhost:5000/products/getTopSellingProducts', body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error
      })
    }
  }
)

const adminProductSlice = createSlice(
  {
    name: 'adminProductSlice',
    initialState,
    reducers: {
      handleNext: (state) => {
        console.log('inside handle next, ', state.data);
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
        state.addProductCanvas = false
        state.product = {};
      },
      hideModal: (state) => {
        state.modal = false
      },
      displayModal: (state, { payload }) => {
        state.modal = true
        console.log(state.data);
        console.log('inisde payload is, ', payload);
        state.product = payload;
      },
      showOffcanvas: (state, { payload }) => {
        console.log('inside off canvas', { payload });
        state.offcanvas = true;
        state.product = payload
        console.log(state.product);
      },
      showAddProductCanvas: (state, { payload }) => {
        state.addProductCanvas = true;
      },
      editProduct: (state, { payload }) => {
        console.log(payload);
        const updatedData = state.data.map(product => {
          if (product.id === payload.id) {
            console.log('inside true', payload);
            // If the product's id matches the updated product's id, update it
            return payload;
          } else {
            // Otherwise, leave the product as it is
            return product;
          }
        });
        state.offcanvas = false;
        state.data = updatedData;
        console.log(state.data);
        // console.log('inside edit product', { state: JSON.stringify(state, null, 2), keys: Object.keys(state), value: JSON.stringify(Object.values(state)) }, { payload });
      },
      clearError: (state, { payload }) => {
        state.error = '';
        state.loader = false
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
        state.error = false
      },
      [getData.rejected]: (state, action) => {
        console.log(action);
        state.tableDataError = action.payload.error;
        state.status = false;
        state.loader = false;
      },
      [getOrder.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.loader = false;
        state.status = true
      },

      [getOrder.pending]: (state, action) => {
        state.loader = true;
        state.status = false
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
        console.log('inside fulfiled', action.payload);
        state.data.push(action.payload.product);
        console.log(state.data);
        state.addProductCanvas = false
        state.loader = false;
        state.error = 'product has been addedd';
      },
      [addProduct.rejected]: (state, action) => {
        console.log('inside rejected ,', action.payload.error);
        state.error = action.payload.error;
        state.addProductCanvas = false;
        state.loader = false;
      },
      [deleteProduct.fulfilled]: (state, action) => {
        console.log('inisde fulfilled', action.meta.arg.product);
        state.modal = false;
        state.data = state.data.filter((d) => d._id !== action.meta.arg.product._id)
        state.product = {};
        state.loader = false;
      },
      [deleteProduct.pending]: (state, action) => {
        console.log('inisde pending', action)
      },
      [deleteProduct.rejected]: (state, action) => {
        console.log('inisde rejected', action);
        state.error = action.payload.error;
      },
      [editProduct.fulfilled]: (state, action) => {
        state.error = 'Product has been updated ';
        state.offcanvas = false;
        const updatedData = state.data.map(product => {
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
        console.log('inisde pending', action)
      },
      [editProduct.rejected]: (state, action) => {
        console.log('inisde rejected', action.payload.error);
        state.error = action.payload.error;
        state.product = {};
        state.offcanvas = false;
      },
      [GetTopSellingProducts.pending]: (state) => {
        console.log('isnide pending');
        state.loader = true;
      },
      [GetTopSellingProducts.fulfilled]: (state, { payload }) => {
        state.loader = false;
        console.log('in fultilled of top selling, ');
        console.log(payload);
        state.topSellingProducts = payload
      },
      [GetTopSellingProducts.rejected]: (state, { payload }) => {
        console.log('inside rejected , ', payload.error.message);
        state.loader = false;
        state.topSellingProducts = []
        state.tableDataError = payload.error;
      }

    }

  }
)

export const { handleNext, handleOffset, handlePrevious, hideOffcanvas, showOffcanvas, displayModal, hideModal, showAddProductCanvas, clearError } = adminProductSlice.actions
export default adminProductSlice.reducer;
