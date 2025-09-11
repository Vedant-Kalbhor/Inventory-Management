// File: src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import suppliersReducer from '../features/suppliers/suppliersSlice';
import warehousesReducer from '../features/warehouses/warehousesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    suppliers: suppliersReducer,
    warehouses: warehousesReducer
  }
});

export default store;
