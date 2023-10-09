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
      const response = await axios.get('http://localhost:5000/products/getProducts', {
        params: {
          offset: state.adminProduct.offset * 10,
          limit: 10
        }
      });
      console.log('respose send from api is, ', response.data.response.myProducts);
      if (response.data.error) { // if api is correct but no data is returned
        console.log('sdsdds');
        return thunkApi.rejectWithValue(
          { error: 'no data found' }
        )
      }

      return response.data.response.myProducts;
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
    // body.thumbnail = 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'
    // body.images = 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'
    try {
      console.log('product in api is,', body);

      const response = await axios.post('http://localhost:5000/products/addProduct', body);
      console.log('response is, ', response);
      if (response.data.error) {
        console.log('inisde error');
        return thunkApi.rejectWithValue({
          error: response.data.error
        })
      }
      console.log(response.data);
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: 'Api Not found , please check your api url'
      })
    }
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
  })

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
      // deleteProduct: (state, { payload }) => {
      //   console.log('inside delete product', payload)
      //   const filteredProduct = state.data.filter((d) => d._id !== payload._id);
      //   state.data = filteredProduct;
      //   state.modal = false
      // },
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
        console.log(action);
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
        console.log('inside fulfiled', action.payload);
        state.data.push(action.payload.product);
        console.log(state.data);
        state.addProductCanvas = false
      },

      [addProduct.pending]: (state, action) => {

      },
      [addProduct.rejected]: (state, action) => {
        console.log('inside rejected ,', action.payload.error);
        state.error = action.payload.error;
        state.addProductCanvas = false
      },
      [deleteProduct.fulfilled]: (state, action) => {
        console.log('inisde fulfilled', action.meta.arg.product);
        state.modal = false;
        state.data = state.data.filter((d) => d._id !== action.meta.arg.product._id)
        state.product = {};
      },
      [deleteProduct.pending]: (state, action) => {
        console.log('inisde pending', action)
      },
      [deleteProduct.rejected]: (state, action) => {
        console.log('inisde rejected', action);
      }

    }

  }
)

export const { handleNext, handleOffset, handlePrevious, hideOffcanvas, showOffcanvas, displayModal, hideModal, editProduct, showAddProductCanvas } = adminProductSlice.actions
export default adminProductSlice.reducer;
