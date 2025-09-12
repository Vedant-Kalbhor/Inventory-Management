import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

const initialState = {
  list: [],
  status: 'idle',
  error: null
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await api.get(ENDPOINTS.PRODUCTS);
  return res.data;
});

export const createProduct = createAsyncThunk('products/create', async (payload) => {
  const res = await api.post(ENDPOINTS.PRODUCTS, payload);
  return res.data;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  const res = await api.put(`${ENDPOINTS.PRODUCTS}/${id}`, data);
  return res.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await api.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (s) => { s.status = 'loading'; })//s=state ,a=action
      .addCase(fetchProducts.fulfilled, (s, a) => { s.status = 'succeeded'; s.list = a.payload; })
      .addCase(fetchProducts.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; })
      .addCase(createProduct.fulfilled, (s, a) => { s.list.push(a.payload); })
      .addCase(updateProduct.fulfilled, (s, a) => {
        s.list = s.list.map((p) => (p._id === a.payload._id ? a.payload : p));
      })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.list = s.list.filter((p) => p._id !== a.payload);
      });
  }
});

export default productsSlice.reducer;
