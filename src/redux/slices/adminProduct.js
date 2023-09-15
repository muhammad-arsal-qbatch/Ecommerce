import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  loader: false,
  data: [],
  error: '',
  offset: 0,
  status: true,
  offcanvas: false,
  modal: false,
  addProductCanvas: false,
  product: {}

};
export const getData = createAsyncThunk('adminProductSlice/getProducts',
  async (body, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${state.adminProduct.offset * 10}`);
      if (response.data.products.length === 0) { // if api is correct but no data is returned
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
export const addProduct = createAsyncThunk(
  'adminProductSlice/addProducts',
  async (body, thunkApi) => {
    body.thumbnail = 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'
    body.images = 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'

    const response = await axios.post('https://dummyjson.com/products/add', body);
    console.log(response.data);
    return response.data
  }
)
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
      deleteProduct: (state, { payload }) => {
        const filteredProduct = state.data.filter((d) => d.id !== payload);
        state.data = filteredProduct;
        state.modal = false
      },
      hideOffcanvas: (state) => {
        state.offcanvas = false;
        state.addProductCanvas = false
      },
      hideModal: (state) => {
        state.modal = false
      },
      displayModal: (state, { payload }) => {
        state.modal = true
        console.log(state.data);
        state.product = payload
      },
      showOffcanvas: (state, { payload }) => {
        state.offcanvas = true;
        state.product = payload
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
      }

    },
    extraReducers: {
      [getData.fulfilled]: (state, action) => {
        state.data = action.payload;
        console.log('in fulfilleed', state.data);

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
        state.error = action.payload.error;
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
      [addProduct.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.data.push(action.payload);
        state.addProductCanvas = false
      },

      [addProduct.pending]: (state, action) => {

      },
      [addProduct.rejected]: (state, action) => {

      }

    }

  }
)

export const { handleNext, handleOffset, handlePrevious, hideOffcanvas, showOffcanvas, deleteProduct, displayModal, hideModal, editProduct, showAddProductCanvas } = adminProductSlice.actions
export default adminProductSlice.reducer;
