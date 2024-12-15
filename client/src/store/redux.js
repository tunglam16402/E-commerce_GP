import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app/appSlice';
import { productSlice } from './products/productSlice';

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        products: productSlice.reducer,
    },
});
