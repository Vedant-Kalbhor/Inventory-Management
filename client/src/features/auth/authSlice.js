import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, fetchProfile } from './authAPI';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

export const login = createAsyncThunk('auth/login', async (creds, thunkAPI) => {
  const data = await loginApi(creds);
  // store token in localStorage
  if (data.token) localStorage.setItem('token', data.token);
  return data.user;
});

export const loadProfile = createAsyncThunk('auth/loadProfile', async (_, thunkAPI) => {
  const data = await fetchProfile();
  return data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.user = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
