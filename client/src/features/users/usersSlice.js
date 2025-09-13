// File: src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await api.get(ENDPOINTS.USERS);
  return res.data;
});

export const createUser = createAsyncThunk('users/create', async (payload) => {
  const res = await api.post(ENDPOINTS.USERS, payload);
  return res.data;
});

export const updateUser = createAsyncThunk('users/update', async ({ id, data }) => {
  const res = await api.put(`${ENDPOINTS.USERS}/${id}`, data);
  return res.data;
});

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await api.delete(`${ENDPOINTS.USERS}/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (s) => {
        s.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.list = a.payload;
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.error.message;
      })
      .addCase(createUser.fulfilled, (s, a) => {
        s.list.push(a.payload);
      })
      .addCase(updateUser.fulfilled, (s, a) => {
        s.list = s.list.map((u) => (u._id === a.payload._id ? a.payload : u));
      })
      .addCase(deleteUser.fulfilled, (s, a) => {
        s.list = s.list.filter((u) => u._id !== a.payload);
      });
  },
});

export default usersSlice.reducer;
