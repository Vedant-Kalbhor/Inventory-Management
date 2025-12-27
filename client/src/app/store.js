import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import suppliersReducer from '../features/suppliers/suppliersSlice';
import warehousesReducer from '../features/warehouses/warehousesSlice';
import usersReducer from '../features/users/usersSlice';
import ordersReducer from '../features/orders/ordersSlice'; // ✅ ADD THIS

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    suppliers: suppliersReducer,
    warehouses: warehousesReducer,
    users: usersReducer,
    orders: ordersReducer, // ✅ REQUIRED
  },
});

export default store;
