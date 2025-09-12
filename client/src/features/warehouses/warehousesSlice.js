import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

export const fetchWarehouses = createAsyncThunk('warehouses/fetch', async () => {
  const res = await api.get(ENDPOINTS.WAREHOUSES);
  return res.data;
});

const slice = createSlice({
  name: 'warehouses',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWarehouses.fulfilled, (s, a) => { s.list = a.payload; s.status = 'succeeded'; })
      .addCase(fetchWarehouses.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchWarehouses.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; });
  }
});

export default slice.reducer;
