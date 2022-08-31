import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { storeSlice } from './stores/storeSlice';
import { wareHouseSlice } from './warehouse/warehouseSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        warehouse: wareHouseSlice.reducer,
        store: storeSlice.reducer
    }
});
