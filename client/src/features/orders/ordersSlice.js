import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const res = await api.get(ENDPOINTS.ORDERS);
  return res.data;
});

export const createOrder = createAsyncThunk('orders/create', async (payload) => {
  const res = await api.post(ENDPOINTS.ORDERS, payload);
  return res.data;
});

export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status }) => {
  const res = await api.put(`${ENDPOINTS.ORDERS}/${id}/status`, { status });
  return res.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchOrders.fulfilled, (s, a) => { s.status = 'succeeded'; s.list = a.payload; })
      .addCase(fetchOrders.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; })
      .addCase(createOrder.fulfilled, (s, a) => { s.list.unshift(a.payload); })
      .addCase(updateOrderStatus.fulfilled, (s, a) => {
        const updated = a.payload.order || a.payload;
        s.list = s.list.map(o => (o._id === updated._id ? updated : o));
      });
  }
});

export default ordersSlice.reducer;
