import axios from 'axios';
//import store from '../app/store';
import { logout } from '../features/auth/authSlice';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // using bearer token via localStorage in this scaffold
});

// request interceptor to attach token
instance.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) { /* ignore */ }
  return config;
});

// response interceptor for 401
instance.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response && error.response.status === 401) {
      // dispatch logout to clear auth state
      try {
        store.dispatch(logout());
      } catch (e) {}
    }
    return Promise.reject(error);
  }
);

export default instance;
